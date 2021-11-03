import { Injectable } from '@nestjs/common';
import { Teacher } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TeachersService {
  constructor(private prisma: PrismaService) {}

  async getAll(): Promise<Teacher[]> {
    return this.prisma.teacher.findMany();
  }
}
