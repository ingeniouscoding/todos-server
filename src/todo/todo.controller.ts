import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { UserPayload } from 'src/auth/decorators';
import { JwtPayload } from 'src/auth/interfaces';
import { CreateTodoDto, TodoDto, UpdateTodoDto } from './dto';
import { TodoService } from './todo.service';

@Controller('todos')
@UseGuards(AuthGuard('jwt'))
export class TodoController {
  constructor(private readonly todoService: TodoService) { }

  @Get()
  async index(@UserPayload() user: JwtPayload): Promise<TodoDto[]> {
    const todos = await this.todoService.findAll(user.sub);
    return todos.map((t) => new TodoDto(t));
  }

  @Post()
  async store(
    @UserPayload() user: JwtPayload,
    @Body() dto: CreateTodoDto
  ): Promise<TodoDto> {
    const todo = await this.todoService.save(user.sub, dto);
    return new TodoDto(todo);
  }

  @Get(':id')
  async show(
    @UserPayload() user: JwtPayload,
    @Param('id') id: string
  ): Promise<TodoDto> {
    const todo = await this.todoService.findById(+id);
    if (!todo) {
      throw new NotFoundException('Item not found.');
    }
    if (user.sub !== todo.userId) {
      throw new ForbiddenException('You are not allowed to view this item.');
    }
    return new TodoDto(todo);
  }

  @Patch(':id')
  async update(
    @UserPayload() user: JwtPayload,
    @Param('id') id: string,
    @Body() dto: UpdateTodoDto
  ): Promise<TodoDto> {
    const todo = await this.todoService.findById(+id);
    if (!todo) {
      throw new NotFoundException('Item to update not found.');
    }
    if (user.sub !== todo.userId) {
      throw new ForbiddenException('You are not allowed to update this item.');
    }
    const updatedTodo = await this.todoService.update(todo.id, dto);
    return new TodoDto(updatedTodo);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(
    @UserPayload() user: JwtPayload,
    @Param('id') id: string
  ): Promise<void> {
    const todo = await this.todoService.findById(+id);
    if (!todo) {
      throw new NotFoundException('Item to delete not found.');
    }
    if (user.sub !== todo.userId) {
      throw new ForbiddenException('You are not allowed to delete this item.');
    }
    return this.todoService.remove(+id);
  }
}
