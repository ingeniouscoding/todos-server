import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post
} from '@nestjs/common';

import { CreateTodoDto, TodoDto, UpdateTodoDto } from './dto';
import { TodoService } from './todo.service';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) { }

  @Get()
  async index(): Promise<TodoDto[]> {
    const todos = await this.todoService.findAll();
    return todos.map((t) => new TodoDto(t));
  }

  @Post()
  async store(@Body() dto: CreateTodoDto): Promise<TodoDto> {
    const todo = await this.todoService.save(dto);
    return new TodoDto(todo);
  }

  @Get(':id')
  async show(@Param('id') id: string) {
    const todo = await this.todoService.findById(+id);
    if (!todo) {
      throw new NotFoundException('Todo not found.');
    }
    return new TodoDto(todo);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateTodoDto)
    : Promise<TodoDto> {
    const todo = await this.todoService.findById(+id);
    if (!todo) {
      throw new NotFoundException('Todo to update not found.');
    }
    const updatedTodo = await this.todoService.update(todo.id, dto);
    return new TodoDto(updatedTodo);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  destroy(@Param('id') id: string) {
    return this.todoService.remove(+id);
  }
}
