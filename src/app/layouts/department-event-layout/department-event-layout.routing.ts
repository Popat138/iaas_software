import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DepartmentAwardComponent } from 'src/app/department-award/department-award.component';
import { ReportOfEventComponent } from 'src/app/report-of-event/report-of-event.component';
import { ReportOfSummerWinterSchoolComponent } from 'src/app/report-of-summer-winter-school/report-of-summer-winter-school.component';
import { DepartmentDetailsComponent } from '../../department-details/department-details.component';
import { UgCoursesComponent } from '../../ug-courses/ug-courses.component';
import { PgCoursesComponent } from '../../pg-courses/pg-courses.component';
import { DiplomaAndOtherCoursesComponent } from '../../diploma-and-other-courses/diploma-and-other-courses.component';
import { ResearchProgramsComponent } from '../../research-programs/research-programs.component';
import { AdmittedStudentsComponent } from '../../admitted-students/admitted-students.component';
import { PassoutStudentsComponent } from '../../passout-students/passout-students.component';
import { AddTeachersComponent } from 'src/app/Addnew/Department/add-teachers/add-teachers.component';
import { CreateTeachersComponent } from 'src/app/create-teachers/create-teachers.component';
import { DepartmentTeacherComponent } from 'src/app/department-teacher/department-teacher.component';
import { ProgramDetailsComponent } from 'src/app/program-details/program-details.component';
import { ProgramOutcomeComponent } from 'src/app/program-outcome/program-outcome.component';
import { GetAttainmentDetailComponent } from 'src/app/get-attainment-detail/get-attainment-detail.component';
import { GetAttainmentDepartmentComponent } from 'src/app/get-attainment-department/get-attainment-department.component';
import { GetRollCallDepartmentComponent } from 'src/app/get-roll-call-department/get-roll-call-department.component';
import { BestPracticeComponent } from 'src/app/best-practice/best-practice.component';
export const DepartmentAwardRoutes: Routes = [

  {path:'report-of-event',component:ReportOfEventComponent},
  {path:'report-of-summer-winter-school',component:ReportOfSummerWinterSchoolComponent},
  {path:'department-award',component:DepartmentAwardComponent},
  {path:'department-details',component:DepartmentDetailsComponent},
  {path:'ug-courses',component:UgCoursesComponent},
  {path:'pg-courses',component:PgCoursesComponent},
  {path:'diploma-and-other-courses',component:DiplomaAndOtherCoursesComponent},
  {path:'research-programs',component:ResearchProgramsComponent},
  {path:'admitted-students',component:AdmittedStudentsComponent},
  {path:'passout-students',component:PassoutStudentsComponent},
  {path:'add-teachers',component:CreateTeachersComponent},
 {path:'department-teacher',component:DepartmentTeacherComponent},
 {path:'program-outcome',component:ProgramOutcomeComponent},
 {path:'calculate-attainment-level', component: GetAttainmentDepartmentComponent},
 {path:'student-list',component:GetRollCallDepartmentComponent},
 {path:'best-practice',component:BestPracticeComponent}

];

