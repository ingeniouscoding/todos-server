import { IsBoolean, IsString } from "class-validator";

export class UpdateTodoDto {
  @IsString()
  content?: string;

  @IsBoolean()
  isCompleted?: boolean;
}
