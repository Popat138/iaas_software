import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material';
import { RouterModule } from '@angular/router';
import {MatInputModule} from '@angular/material/input'
import {MatSelectModule} from '@angular/material/select';
import { DepartmentAwardRoutes } from './department-event-layout.routing';
import { DepartmentEventLayoutComponent } from './department-event-layout.component';
import { ReportOfSummerWinterSchoolComponent } from 'src/app/report-of-summer-winter-school/report-of-summer-winter-school.component';
import { ReportOfEventComponent } from 'src/app/report-of-event/report-of-event.component';
import { DepartmentAwardComponent } from 'src/app/department-award/department-award.component';
import { DepartmentDetailsComponent } from 'src/app/department-details/department-details.component';
import { UgCoursesComponent } from 'src/app/ug-courses/ug-courses.component';
import { PgCoursesComponent } from 'src/app/pg-courses/pg-courses.component';
import { DiplomaAndOtherCoursesComponent } from 'src/app/diploma-and-other-courses/diploma-and-other-courses.component';
import { ResearchProgramsComponent } from 'src/app/research-programs/research-programs.component';
import { AdmittedStudentsComponent } from 'src/app/admitted-students/admitted-students.component';
import { PassoutStudentsComponent } from 'src/app/passout-students/passout-students.component';
import { DepartmentTeacherComponent } from 'src/app/department-teacher/department-teacher.component';
@NgModule({
  declarations: [

      ReportOfEventComponent,
      DepartmentEventLayoutComponent,
      ReportOfSummerWinterSchoolComponent,
      DepartmentAwardComponent,
      DepartmentDetailsComponent,
      UgCoursesComponent,
      PgCoursesComponent,
      DiplomaAndOtherCoursesComponent,
      ResearchProgramsComponent,
      AdmittedStudentsComponent,
      PassoutStudentsComponent
     

  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatSelectModule,
    MaterialModule,
    MatInputModule,
    MatSelectModule,
    RouterModule.forChild(DepartmentAwardRoutes),
  ]
})
export class DepartmentEventLayoutModule { }
