import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Student } from '@prisma/client';

@Injectable()
export class StudentsService {
  constructor(private prisma: PrismaService) {}

  async getAll(): Promise<Student[]> {
    return this.prisma.student.findMany();
  }

  async deleteOne(fullName: string): Promise<Student> {
    return this.prisma.student.delete({
      where: {
        fullName,
      },
    });
  }
}
