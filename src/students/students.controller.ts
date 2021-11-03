import { Controller, Get, UseGuards } from "@nestjs/common";
import { StudentsService } from './students.service';
import { Student } from '@prisma/client';
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@Controller('students')
export class StudentsController {
  constructor(private students: StudentsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<Student[]> {
    return this.students.getAll();
  }
}
