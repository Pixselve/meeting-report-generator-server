import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { hash } from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOne(email: string): Promise<User | undefined> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async createOne(email: string, password: string): Promise<User> {
    const hashedPassword = await hash(password, 10);

    return this.prisma.user.create({
      data: { email, password: hashedPassword },
    });
  }

  async deleteOne(email: string): Promise<User> {
    return this.prisma.user.delete({ where: { email } });
  }
}
