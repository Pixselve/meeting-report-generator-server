import { Grade, MeetingBy, Objective, PeoplePresent } from '@prisma/client';
import { IsIn, IsNotEmpty } from 'class-validator';

export class NewReportInput {
  @IsNotEmpty()
  studentFullName: string;

  @IsNotEmpty()
  teacherFullName: string;

  @IsNotEmpty()
  details: string;

  @IsNotEmpty()
  importantInformation: string;

  @IsIn(['CP', 'CE1', 'CE2', 'CM1', 'CM2'])
  grade: Grade;

  @IsIn(['PARENTS', 'TEACHER'], { each: true })
  meetingByDefault: MeetingBy[];

  meetingByCustom: string[];

  peoplePresentCustom: string[];

  @IsIn(['FATHER', 'STUDENT', 'MOTHER', 'PRINCIPAL'], { each: true })
  peoplePresentDefault: PeoplePresent[];

  @IsIn(['LEARNING', 'JOBS', 'RELATIONSHIPS', 'ADAPTATIONS', 'PROJECTS'], {
    each: true,
  })
  objectives: Objective[];
}
