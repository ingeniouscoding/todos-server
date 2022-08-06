import { Controller, Get } from '@nestjs/common';

@Controller()
export class HomeController {
  @Get()
  index() {
    return {
      hello: 'Welcome to home page!',
    };
  }
}
