import { IsEmail } from 'class-validator';

export default class DeleteUserInput {
  @IsEmail()
  email: string;
}
