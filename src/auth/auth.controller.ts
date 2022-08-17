import {
  Body,
  Controller,
  ForbiddenException,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { UserPayload } from './decorators';
import { CreateUserDto, LoginUserDto } from './dto';
import { JwtPayload, JwtTokens } from './interfaces';
import { TokenService } from './token.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokenService
  ) { }

  @Post('register')
  async register(@Body() dto: CreateUserDto): Promise<JwtTokens> {
    const user = await this.authService.register(dto);
    const tokens = await this.tokenService.signUser(user);
    return tokens;
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: LoginUserDto): Promise<JwtTokens> {
    const user = await this.authService.login(dto);
    if (!user) {
      throw new ForbiddenException('Email or password is incorrect.');
    }
    const tokens = await this.tokenService.signUser(user);
    return tokens;
  }

  @Post('logout')
  @UseGuards(AuthGuard('refresh-jwt'))
  @HttpCode(HttpStatus.NO_CONTENT)
  logout(@UserPayload() user: JwtPayload): Promise<void> {
    return this.tokenService.deleteToken(user);
  }

  @Post('token')
  @UseGuards(AuthGuard('refresh-jwt'))
  @HttpCode(HttpStatus.OK)
  async refresh(@UserPayload() user: JwtPayload): Promise<JwtTokens> {
    const tokens = await this.tokenService.refresh(user);

    if (!tokens) {
      throw new ForbiddenException('Access denied. Try login again.');
    }

    return tokens;
  }
}
