import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { MaterialModule } from "src/app/material";
import { LibraryComponent } from "../../library/library.component";
import { TeachingplanComponent } from "../../teachingplan/teachingplan.component";
import { TeacherLayoutComponent } from "./teacher-layout.component";
import { TeacherLayoutRoutes } from "./teacher-layout.routing";
import { InternalAssesmentComponent } from '../../internal-assesment/internal-assesment.component';
import { ProjectWorkComponent } from '../../project-work/project-work.component';
import { UploadsComponent } from '../../uploads/uploads.component';
import { ResultComponent } from '../../result/result.component';
import { AttendanceComponent } from "src/app/attendance/attendance.component";
import { CourseOutcomeComponent } from "src/app/course-outcome/course-outcome.component";
import { ProgramOutcomeComponent } from "src/app/program-outcome/program-outcome.component";
import { ProjectInternshipComponent } from "src/app/project-internship/project-internship.component";

import { OneTimeFormComponent } from '../../one-time-form/one-time-form.component';
import { ServiceDetailsComponent } from '../../service-details/service-details.component';
import { BooksPublicationsComponent } from '../../books-publications/books-publications.component';
import { FacultyDevelopmentProgramComponent } from '../../faculty-development-program/faculty-development-program.component';
import { TeachingDetailsComponent } from '../../teaching-details/teaching-details.component';
import { OtherCoursesComponent } from '../../other-courses/other-courses.component';
import { PapersPresentedConferenceComponent } from '../../papers-presented-conference/papers-presented-conference.component';
import { ResearchPaperComponent } from '../../research-paper/research-paper.component';
import { SeminarsAttendedComponent } from '../../seminars-attended/seminars-attended.component';
import { ApprovalDetailsComponent } from '../../approval-details/approval-details.component';
import { TransferDetailsComponent } from '../../transfer-details/transfer-details.component';
import { TeachFeedbackComponent } from "src/app/teach-feedback/teach-feedback.component";
import { ResearchProjectsComponent } from "src/app/research-projects/research-projects.component";
import { TeachingMethodsComponent } from "src/app/teaching-methods/teaching-methods.component";
import { RollCallListComponent } from "src/app/roll-call-list/roll-call-list.component";
@NgModule({

  imports:[
    CommonModule,
    RouterModule.forChild(TeacherLayoutRoutes),
    MaterialModule
  ],
  declarations:[
    InternalAssesmentComponent,
    ProjectWorkComponent,
    UploadsComponent,
    ResultComponent,
    LibraryComponent,
    AttendanceComponent,
    CourseOutcomeComponent,
    ProgramOutcomeComponent,
    ProjectInternshipComponent,
    TeachingplanComponent,
    TeacherLayoutComponent,
   TeachingMethodsComponent,

    OneTimeFormComponent,
    ServiceDetailsComponent,
    BooksPublicationsComponent,
    FacultyDevelopmentProgramComponent,
    TeachingDetailsComponent,
    OtherCoursesComponent,
    PapersPresentedConferenceComponent,
    ResearchPaperComponent,
    SeminarsAttendedComponent,
    ApprovalDetailsComponent,
    TransferDetailsComponent,
    TeachFeedbackComponent,
    //RollCallListComponent,
    

  ],
  exports:[
    RouterModule
  ]
})

export class TeacherLayoutModule {}