import {
  Body,
  Controller,
  Get,
  Header,
  Param,
  Post,
  StreamableFile,
  UseGuards,
} from '@nestjs/common';
import { ReportsService } from './reports.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { NewReportInput } from './NewReport.input';

@Controller('reports')
export class ReportsController {
  constructor(private reports: ReportsService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':studentFullName')
  async findMany(@Param() { studentFullName }) {
    return this.reports.getAllOfStudent(studentFullName);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':studentFullName/:from/:to')
  @Header('Content-type', 'application/pdf')
  @Header('Content-Disposition', 'attachment; filename=test.pdf')
  async getPDF(@Param() { studentFullName, from, to }) {
    const buffer = await this.reports.getPDF(studentFullName, { from, to });
    return new StreamableFile(Buffer.from(buffer));
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createOneReport(@Body() newReportInput: NewReportInput) {
    return this.reports.createOneReport(newReportInput);
  }
}
