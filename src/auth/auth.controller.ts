import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseFilters,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { CreateUserDto } from './dto';
import { LoginUserDto } from './dto';
import { PrismaExceptionFilter } from './filters';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  @UseFilters(PrismaExceptionFilter)
  async register(@Body() dto: CreateUserDto) {
    const user = await this.authService.register(dto);

    return user;
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: LoginUserDto) {
    const user = await this.authService.login(dto);
    if (!user) {
      throw new BadRequestException('Email or password do not match');
    }
    return user;
  }
}
