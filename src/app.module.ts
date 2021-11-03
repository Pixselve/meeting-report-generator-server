import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { TeachersModule } from './teachers/teachers.module';
import { StudentsService } from './students/students.service';
import { StudentsModule } from './students/students.module';
import { ReportsModule } from './reports/reports.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    PrismaModule,
    TeachersModule,
    StudentsModule,
    ReportsModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, StudentsService],
})
export class AppModule {}
