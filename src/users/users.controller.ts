import { Body, Controller, Delete, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '@prisma/client';
import { UsersService } from './users.service';
import NewUserInput from './NewUser.input';
import DeleteUserInput from './DeleteUser.input';

@Controller('users')
export class UsersController {
  constructor(private users: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createOne(@Body() { email, password }: NewUserInput): Promise<User> {
    return this.users.createOne(email, password);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  async deleteOne(@Body() { email }: DeleteUserInput): Promise<User> {
    return this.users.deleteOne(email);
  }
}
