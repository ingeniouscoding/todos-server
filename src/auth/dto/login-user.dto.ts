import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";

export class LoginUserDto {
  @IsString()
  @IsEmail()
  @MaxLength(50)
  email: string;

  @IsString()
  @MaxLength(30)
  password: string;
}
