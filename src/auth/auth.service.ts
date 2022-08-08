import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto';
import { LoginUserDto } from './dto';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) { }

  async register(dto: CreateUserDto) {
    const password = await bcrypt.hash(dto.password, 10);
    const user = await this.prisma.user
      .create({
        data: {
          ...dto,
          password,
        },
      });

    return user;
  }

  async login(dto: LoginUserDto) {
    const user = await this.prisma.user
      .findFirst({
        where: {
          email: dto.email,
        },
      });
    if (!user) {
      return null;
    }

    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch) {
      return null;
    }

    return user;
  }
}
