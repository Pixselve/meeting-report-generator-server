import { Controller, Get, UseGuards } from "@nestjs/common";
import { Student } from '@prisma/client';
import { TeachersService } from './teachers.service';
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@Controller('teachers')
export class TeachersController {
  constructor(private teachers: TeachersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<Student[]> {
    return this.teachers.getAll();
  }
}
