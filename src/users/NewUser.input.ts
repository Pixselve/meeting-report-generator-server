import { IsEmail, IsNotEmpty } from 'class-validator';

export default class NewUserInput {
  @IsEmail()
  email: string;
  @IsNotEmpty()
  password: string;
}
