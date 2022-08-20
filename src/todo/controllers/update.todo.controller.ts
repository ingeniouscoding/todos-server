import {
  Body,
  Controller,
  Delete, HttpCode,
  HttpStatus,
  Param, Post,
  UseGuards
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { AuthGuard } from '@nestjs/passport';

import { UserPayload } from 'src/auth/decorators';
import { JwtPayload } from 'src/auth/interfaces';
import { CreateTodoCommand, RemoveTodoCommand } from '../commands';
import { CreateTodoDto } from '../dto';

@Controller('todos')
@UseGuards(AuthGuard('jwt'))
export class UpdateTodoController {
  constructor(private readonly commandBus: CommandBus) { }

  @Post()
  store(
    @UserPayload() user: JwtPayload,
    @Body() dto: CreateTodoDto
  ): Promise<void> {
    return this.commandBus.execute<CreateTodoCommand, void>(
      new CreateTodoCommand(user.sub, dto)
    );
  }

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
