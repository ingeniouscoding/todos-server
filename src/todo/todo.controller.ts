import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { AuthGuard } from '@nestjs/passport';

import { UserPayload } from 'src/auth/decorators';
import { JwtPayload } from 'src/auth/interfaces';
import { CreateTodoCommand, RemoveTodoCommand } from './commands';
import { CreateTodoDto, UpdateTodoDto } from './dto';
import { TodoReadModel } from './dto';
import { AllTodosQuery, FindTodoQuery } from './queries';

@Controller('todos')
@UseGuards(AuthGuard('jwt'))
export class TodoController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus
  ) { }

  @Get()
  index(@UserPayload() user: JwtPayload): Promise<TodoReadModel[]> {
    return this.queryBus.execute<AllTodosQuery, TodoReadModel[]>(
      new AllTodosQuery(user.sub)
    );
  }

  @Post()
  store(
    @UserPayload() user: JwtPayload,
    @Body() dto: CreateTodoDto
  ): Promise<void> {
    return this.commandBus.execute<CreateTodoCommand, void>(
      new CreateTodoCommand(user.sub, dto)
    );
  }

  @Get(':guid')
  show(
    @UserPayload() user: JwtPayload,
    @Param('guid') guid: string
  ): Promise<TodoReadModel> {
    return this.queryBus.execute<FindTodoQuery, TodoReadModel>(
      new FindTodoQuery(user.sub, guid)
    );
  }

  // @Patch(':uuid')
  // async update(
  //   @UserPayload() user: JwtPayload,
  //   @Param('guid') guid: string,
  //   @Body() dto: UpdateTodoDto
  // ): Promise<TodoReadModel> {

  // }

  @Delete(':guid')
  @HttpCode(HttpStatus.NO_CONTENT)
  destroy(
    @UserPayload() user: JwtPayload,
    @Param('guid') guid: string
  ): Promise<void> {
    return this.commandBus.execute<RemoveTodoCommand, void>(
      new RemoveTodoCommand(user.sub, guid)
    );
  }
}
