import { ForbiddenException } from "@nestjs/common";

export class NotOwnerException extends ForbiddenException {
  constructor() {
    super('You are not the owner of this Todo');
  }
}
