import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class HomeController {
  @UseGuards(AuthGuard('jwt'))
  @Get()
  index() {
    return {
      hello: 'Welcome to home page!',
    };
  }
}
