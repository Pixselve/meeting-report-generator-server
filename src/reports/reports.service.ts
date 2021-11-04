import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Report } from '@prisma/client';
import { PDFDocument } from 'pdf-lib';
import * as fs from 'fs';
import type { NewReportInput } from './NewReport.input';

export type SchoolYear = {
  from: number;
  to: number;
};

type SchoolYearReports = {
  schoolYear: SchoolYear;
  reports: Report[];
};

@Injectable()
export class ReportsService {
  constructor(private prisma: PrismaService) {}

  async getPDF(studentFullName: string, schoolYear: SchoolYear) {
    // Fetch the student's reports

    const reports = await this.prisma.report.findMany({
      where: {
        studentFullName,
        date: {
          gte: new Date(schoolYear.from, 9),
          lte: new Date(schoolYear.to, 8),
        },
      },
    });
    const formFieldIDs = {
      date: 'DATE',
      grade: 'classes',
      studentName: 'ELEVE',
      teacherName: 'Champ texte0',
      meetingBy: {
        parents: 'parents',
        teacher: 'enseignant',
        other: 'autre',
      },
      peoplePresent: {
        father: 'PAPA',
        mother: 'MAMAN',
        student: 'ELEVEB',
        principal: 'DIRECTEUR',
        other: 'AUTRES',
        otherText: 'PARTENAIRE',
      },
      objectives: {
        learning: 'aprentissage',
        jobs: 'metier',
        relationships: 'relations',
        adaptations: 'adapattion',
        projects: 'preojet',
      },
      details: 'POINTS ABORDES',
      importantInfos: 'INFOS',
    };
    const existingPdfBytes = fs.readFileSync(
      'assets/rendez-vous-de-parents.pdf',
    );
    const resultPDF = await PDFDocument.create();

    for (const report of reports) {
      const pdfDoc = await PDFDocument.load(existingPdfBytes);
      const form = pdfDoc.getForm();
      const formFields = {
        date: form.getTextField(formFieldIDs.date),
        grade: form.getTextField(formFieldIDs.grade),
        studentName: form.getTextField(formFieldIDs.studentName),
        teacherName: form.getTextField(formFieldIDs.teacherName),
        meetingBy: {
          parents: form.getCheckBox(formFieldIDs.meetingBy.parents),
          teacher: form.getCheckBox(formFieldIDs.meetingBy.teacher),
          other: form.getCheckBox(formFieldIDs.meetingBy.other),
        },
        peoplePresent: {
          father: form.getCheckBox(formFieldIDs.peoplePresent.father),
          mother: form.getCheckBox(formFieldIDs.peoplePresent.mother),
          student: form.getCheckBox(formFieldIDs.peoplePresent.student),
          principal: form.getCheckBox(formFieldIDs.peoplePresent.principal),
          other: form.getCheckBox(formFieldIDs.peoplePresent.other),
          otherText: form.getTextField(formFieldIDs.peoplePresent.otherText),
        },
        objectives: {
          learning: form.getCheckBox(formFieldIDs.objectives.learning),
          jobs: form.getCheckBox(formFieldIDs.objectives.jobs),
          relationships: form.getCheckBox(
            formFieldIDs.objectives.relationships,
          ),
          adaptations: form.getCheckBox(formFieldIDs.objectives.adaptations),
          projects: form.getCheckBox(formFieldIDs.objectives.projects),
        },
        details: form.getTextField(formFieldIDs.details),
        importantInfos: form.getTextField(formFieldIDs.importantInfos),
      };
      formFields.date.setText(report.date.toLocaleDateString('fr-FR'));
      formFields.grade.setText(report.grade);
      formFields.studentName.setText(report.studentFullName);
      formFields.details.setText(report.details);
      formFields.importantInfos.setText(report.importantInformation);
      formFields.teacherName.setText(report.teacherFullName);
      report.meetingByDefault.forEach((el) => {
        switch (el) {
          case 'TEACHER':
            formFields.meetingBy.teacher.check();
            break;
          case 'PARENTS':
            formFields.meetingBy.parents.check();
            break;
          default:
            formFields.meetingBy.other.check();
            break;
        }
      });

      report.peoplePresentDefault.forEach((el) => {
        switch (el) {
          case 'STUDENT':
            formFields.peoplePresent.student.check();
            break;
          case 'FATHER':
            formFields.peoplePresent.father.check();
            break;
          case 'MOTHER':
            formFields.peoplePresent.mother.check();
            break;
          case 'PRINCIPAL':
            formFields.peoplePresent.principal.check();
            break;
          default:
            break;
        }
      });

      if (report.peoplePresentCustom.length > 0) {
        formFields.peoplePresent.other.check();
        formFields.peoplePresent.otherText.setText(
          report.peoplePresentCustom.join(', '),
        );
      }

      report.objectives.forEach((el) => {
        switch (el) {
          case 'LEARNING':
            formFields.objectives.learning.check();
            break;
          case 'JOBS':
            formFields.objectives.jobs.check();
            break;
          case 'RELATIONSHIPS':
            formFields.objectives.relationships.check();
            break;
          case 'ADAPTATIONS':
            formFields.objectives.adaptations.check();
            break;
          case 'PROJECTS':
            formFields.objectives.projects.check();
            break;
          default:
            break;
        }
      });
      form.flatten();
      const [copiedPage] = await resultPDF.copyPages(pdfDoc, [0]);
      resultPDF.addPage(copiedPage);
    }
    return await resultPDF.save();
  }

  async getAllOfStudent(
    studentFullName: string,
  ): Promise<{ from: number; to: number; reports: Report[] }[]> {
    const reports = await this.prisma.report.findMany({
      where: { studentFullName },
    });

    const yearToReport = new Map<string, SchoolYearReports>();

    for (const report of reports) {
      let schoolYear: SchoolYear;
      if (report.date.getMonth() < 7) {
        schoolYear = {
          from: report.date.getFullYear() - 1,
          to: report.date.getFullYear() - 1,
        };
      } else {
        schoolYear = {
          from: report.date.getFullYear(),
          to: report.date.getFullYear() + 1,
        };
      }
      let newSchoolYearReport: SchoolYearReports;

      if (yearToReport.has(`${schoolYear.from}${schoolYear.to}`)) {
        newSchoolYearReport = yearToReport.get(
          `${schoolYear.from}${schoolYear.to}`,
        );
        newSchoolYearReport.reports.push(report);
      } else {
        newSchoolYearReport = {
          reports: [report],
          schoolYear,
        };
      }

      yearToReport.set(
        `${schoolYear.from}${schoolYear.to}`,
        newSchoolYearReport,
      );
    }

    let result: { from: number; to: number; reports: Report[] }[] = [];

    for (const yearToReportElement of yearToReport) {
      const [
        _,
        {
          reports,
          schoolYear: { from, to },
        },
      ] = yearToReportElement;
      result = [...result, { to, from, reports: reports }];
    }

    console.log({ yearToReport });

    return result;
  }

  async createOneReport({ date, ...data }: NewReportInput) {
    await this.prisma.teacher.upsert({
      where: { fullName: data.teacherFullName },
      create: { fullName: data.teacherFullName },
      update: {},
    });
    await this.prisma.student.upsert({
      where: { fullName: data.studentFullName },
      create: { fullName: data.studentFullName },
      update: {},
    });

    return this.prisma.report.create({
      data: {
        ...data,
        date: new Date(date),
      },
    });
  }
}
