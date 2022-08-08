import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  name: string;

  @IsString()
  @IsEmail()
  @MaxLength(50)
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(30)
  password: string;
}
