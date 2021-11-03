import { Module } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { PrismaModule } from '../prisma/prisma.module';
import { TeachersController } from './teachers.controller';

@Module({
  providers: [TeachersService],
  imports: [PrismaModule],
  controllers: [TeachersController],
})
export class TeachersModule {}
