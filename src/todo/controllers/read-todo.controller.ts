import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { AuthGuard } from '@nestjs/passport';

import { UserPayload } from 'src/auth/decorators';
import { TodoReadModel } from '../dto';
import { AllTodosQuery, FindTodoQuery } from '../queries';

@Controller('todos')
@UseGuards(AuthGuard('jwt'))
export class ReadTodoController {
  constructor(private readonly queryBus: QueryBus) { }

  @Get()
  index(@UserPayload('sub') userId: number): Promise<TodoReadModel[]> {
    return this.queryBus.execute<AllTodosQuery, TodoReadModel[]>(
      new AllTodosQuery(userId)
    );
  }

  @Get(':guid')
  show(
    @UserPayload('sub') userId: number,
    @Param('guid') guid: string
  ): Promise<TodoReadModel> {
    return this.queryBus.execute<FindTodoQuery, TodoReadModel>(
      new FindTodoQuery(userId, guid)
    );
  }
}
