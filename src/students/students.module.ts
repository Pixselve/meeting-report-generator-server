import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { PrismaModule } from '../prisma/prisma.module';
import { StudentsController } from './students.controller';

@Module({
  providers: [StudentsService],
  imports: [PrismaModule],
  controllers: [StudentsController],
})
export class StudentsModule {}
