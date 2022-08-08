import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

import { PrismaService } from 'src/prisma/prisma.service';
import { JwtPayload } from './interfaces';

@Injectable()
export class TokenService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService
  ) { }


  async signUser(user: User) {
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

    await this.prisma.refreshToken
      .create({
        data: {
          userId: user.id,
          token: refreshToken.split('.')[2],
        },
      });

    return {
      accessToken,
      refreshToken,
    };
  }

  async deleteToken(user: JwtPayload) {
    await this.prisma.refreshToken
      .deleteMany({
        where: {
          userId: user.sub,
          token: user.refreshToken?.split('.')[2],
        },
      });
  }
}
