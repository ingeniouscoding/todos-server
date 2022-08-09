import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';

import { CreateTodoDto } from './dto/create-todo.dto';
import { TodoService } from './todo.service';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) { }

  @Get()
  index() {
    return this.todoService.findAll();
  }

  @Post()
  store(@Body() dto: CreateTodoDto) {
    return this.todoService.save(dto);
  }

  @Delete(':id')
  destroy(@Param('id') id: string) {
    return { test: +id };
  }
}
