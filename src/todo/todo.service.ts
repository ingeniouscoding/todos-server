import { Injectable } from '@nestjs/common';
import { Todo } from '@prisma/client';

import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateTodoDto, CreateTodoDto } from './dto';

@Injectable()
export class TodoService {
  constructor(private readonly prisma: PrismaService) { }

  async findAll(userId: number): Promise<Todo[]> {
    const todos = await this.prisma.todo
      .findMany({
        where: {
          userId,
        },
      });
    return todos;
  }

  async findById(id: number) {
    const todo = await this.prisma.todo
      .findUnique({
        where: {
          id,
        },
      });
    return todo;
  }

  async save(userId: number, dto: CreateTodoDto): Promise<Todo> {
    const todo = await this.prisma.todo
      .create({
        data: {
          ...dto,
          userId,
        },
      });
    return todo;
  }

  async update(id: number, dto: UpdateTodoDto): Promise<Todo> {
    const todo = await this.prisma.todo
      .update({
        where: {
          id,
        },
        data: {
          ...dto,
        },
      });
    return todo;
  }

  async remove(id: number): Promise<void> {
    await this.prisma.todo
      .delete({
        where: {
          id,
        },
      });
  }
}
