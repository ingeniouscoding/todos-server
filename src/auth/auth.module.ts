import { Module } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TokenService } from './token.service';

@Module({
  providers: [
    AuthService,
    TokenService,
  ],
  controllers: [AuthController],
})
export class AuthModule { }
