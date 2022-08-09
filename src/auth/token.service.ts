import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

import { PrismaService } from 'src/prisma/prisma.service';
import { JwtPayload, JwtTokens } from './interfaces';

@Injectable()
export class TokenService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService
  ) { }


  async signUser(user: User): Promise<JwtTokens> {
    const tokens = await this.generateTokens(user);

    await this.prisma.refreshToken
      .create({
        data: {
          userId: user.id,
          token: tokens.refreshToken.split('.')[2],
        },
      });

    return tokens;
  }

  async deleteToken(userPayload: JwtPayload) {
    await this.prisma.refreshToken
      .deleteMany({
        where: {
          userId: userPayload.sub,
          token: userPayload.refreshToken?.split('.')[2],
        },
      });
  }

  async refresh(userPayload: JwtPayload) {
    const refreshToken = await this.prisma.refreshToken
      .findFirst({
        where: {
          userId: userPayload.sub,
          token: userPayload.refreshToken?.split('.')[2] ?? '',
        },
      });
    if (!refreshToken) {
      return null;
    }

    const user = await this.prisma.user
      .findUnique({
        where: {
          id: userPayload.sub,
        },
      });
    if (!user) {
      return null;
    }

    const tokens = await this.generateTokens(user);
    await this.prisma.refreshToken
      .update({
        where: {
          id: refreshToken.id,
        },
        data: {
          token: tokens.refreshToken.split('.')[2],
        },
      });

    return tokens;
  }

  private async generateTokens(user: User): Promise<JwtTokens> {
    const payload = {
      sub: user.id,
      email: user.email,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.config.get('ACCESS_TOKEN_SECRET'),
        expiresIn: '5m',
      }),
      this.jwtService.signAsync(payload, {
        secret: this.config.get('REFRESH_TOKEN_SECRET'),
        expiresIn: '5d',
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
