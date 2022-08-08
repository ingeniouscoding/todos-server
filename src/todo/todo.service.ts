import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTodoDto } from './dto/create-todo.dto';

@Injectable()
export class TodoService {
  constructor(private readonly prisma: PrismaService) { }

  findAll() {
    return this.prisma.todo.findMany();
  }

  async save(dto: CreateTodoDto) {
    const todo = await this.prisma.todo
      .create({
        data: {
          content: dto.content,
        },
      });
    return todo;
  }
}
