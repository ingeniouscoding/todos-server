import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateTodoDto {
  @IsUUID()
  guid: string;

  @IsNotEmpty()
  @IsString()
  content: string;
}
