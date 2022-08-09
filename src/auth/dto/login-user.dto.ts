import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";

export class LoginUserDto {
  @IsString()
  @IsEmail()
  @MaxLength(50)
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(30)
  password: string;
}
