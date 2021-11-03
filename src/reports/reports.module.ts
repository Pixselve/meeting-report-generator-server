import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { PrismaModule } from '../prisma/prisma.module';
import { ReportsController } from './reports.controller';

@Module({
  providers: [ReportsService],
  imports: [PrismaModule],
  controllers: [ReportsController],
})
export class ReportsModule {}
