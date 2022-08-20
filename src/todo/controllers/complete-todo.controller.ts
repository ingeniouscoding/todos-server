import {
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { AuthGuard } from '@nestjs/passport';

import { UserPayload } from 'src/auth/decorators';
import { CompleteTodoCommand, UncompleteTodoCommand } from '../commands';

@Controller('todos/:guid')
@UseGuards(AuthGuard('jwt'))
export class CompleteTodoController {
  constructor(private readonly commandBus: CommandBus) { }

  @Post('complete')
  @HttpCode(HttpStatus.OK)
  complete(
    @UserPayload('sub') userId: number,
    @Param('guid') guid: string,
  ): Promise<void> {
    return this.commandBus.execute(
      new CompleteTodoCommand(userId, guid)
    );
  }

  @Post('uncomplete')
  @HttpCode(HttpStatus.OK)
  uncomplete(
    @UserPayload('sub') userId: number,
    @Param('guid') guid: string,
  ): Promise<void> {
    return this.commandBus.execute(
      new UncompleteTodoCommand(userId, guid)
    );
  }
}
