import { Routes } from '@angular/router';
import { InternalAssesmentComponent } from 'src/app/internal-assesment/internal-assesment.component';
import { ProjectWorkComponent } from 'src/app/project-work/project-work.component';
import { ResultComponent } from 'src/app/result/result.component';
import { UploadsComponent } from 'src/app/uploads/uploads.component';
import { LibraryComponent } from '../../library/library.component';
import { TeachingplanComponent } from '../../teachingplan/teachingplan.component';
import { AttendanceComponent } from '../../attendance/attendance.component';
import { CourseOutcomeComponent } from '../../course-outcome/course-outcome.component';
import { ProgramOutcomeComponent } from '../../program-outcome/program-outcome.component';
import { ProjectInternshipComponent } from '../../project-internship/project-internship.component';
import { OneTimeFormComponent } from '../../one-time-form/one-time-form.component';
import { ServiceDetailsComponent } from '../../service-details/service-details.component';
import { BooksPublicationsComponent } from '../../books-publications/books-publications.component';
import { FacultyDevelopmentProgramComponent } from '../../faculty-development-program/faculty-development-program.component';
import { TeachingDetailsComponent } from '../../teaching-details/teaching-details.component';
import { OtherCoursesComponent } from '../../other-courses/other-courses.component';
import { PapersPresentedConferenceComponent } from '../../papers-presented-conference/papers-presented-conference.component';
import { ResearchPaperComponent } from '../../research-paper/research-paper.component';
import { SeminarsAttendedComponent } from '../../seminars-attended/seminars-attended.component';
import { TeacherLayoutComponent } from './teacher-layout.component';
import { ApprovalDetailsComponent } from 'src/app/approval-details/approval-details.component';
import { TransferDetailsComponent } from 'src/app/transfer-details/transfer-details.component';
import { ResearchStudentInformationComponent } from 'src/app/research-student-information/research-student-information.component';
import { CourseOutcomeMappingComponent } from 'src/app/course-outcome-mapping/course-outcome-mapping.component';
import { GetAttainmentDetailComponent } from 'src/app/get-attainment-detail/get-attainment-detail.component';
import { TeachFeedbackComponent } from 'src/app/teach-feedback/teach-feedback.component';
import { ResearchProjectsComponent } from 'src/app/research-projects/research-projects.component';
import { AcademicParticipationComponent } from 'src/app/academic-participation/academic-participation.component';
import { TeachingMethodsComponent } from 'src/app/teaching-methods/teaching-methods.component';
import { RollCallListComponent } from 'src/app/roll-call-list/roll-call-list.component';
import { AddStudentRollListComponent } from 'src/app/Addnew/Teachers/add-student-roll-list/add-student-roll-list.component';
import { GetRollCallListComponent } from 'src/app/get-roll-call-list/get-roll-call-list.component';
import { LessonPlanComponent } from 'src/app/lesson-plan/lesson-plan.component';
export const TeacherLayoutRoutes: Routes = [

  {path:'', component:TeachingplanComponent},
  {path:'library', component:LibraryComponent},
  {path:'teachingplan', component:TeachingplanComponent},
  {path:'uploads',component:UploadsComponent},
  {path:'project',component:ProjectWorkComponent},
  {path:'i_assesment',component:InternalAssesmentComponent},
  {path:'result',component:ResultComponent},
  {path:'attendance',component:AttendanceComponent},
  {path:'research',component:ResearchStudentInformationComponent},
  {path:'course_o',component:CourseOutcomeComponent},
  {path:'program_o',component:ProgramOutcomeComponent},
  {path:'project',component:ProjectInternshipComponent},
  {path:'onetimeform',component:OneTimeFormComponent},
  {path:'servicedetails',component:ServiceDetailsComponent},
  {path:'bookspublished',component:BooksPublicationsComponent},
  {path:'faculty',component:FacultyDevelopmentProgramComponent},
  {path:'teachingdetails',component:TeachingDetailsComponent},
  {path:'othercourses',component:OtherCoursesComponent},
  {path:'paperspresented',component:PapersPresentedConferenceComponent},
  {path:'researchpaper',component:ResearchPaperComponent},
  {path:'onetimeform',component:OneTimeFormComponent},
  {path:'seminar',component:SeminarsAttendedComponent},
  {path:'teacher-layout',component:TeacherLayoutComponent},
  {path:'approvaldetails',component:ApprovalDetailsComponent},
  {path:'transferdetails',component:TransferDetailsComponent},
  {path:'course-outcome-mapping', component: CourseOutcomeMappingComponent},
  {path:'calculate-attainment-level', component: GetAttainmentDetailComponent},
  {path:'teach-feedback', component: TeachFeedbackComponent},
  {path:'research-project',component:ResearchProjectsComponent},
  {path:'academic-participation',component:AcademicParticipationComponent},
  {path:'teaching-methods',component:TeachingMethodsComponent},
 // {path:'roll-list',component:RollCallListComponent},
  {path:'student-list',component:GetRollCallListComponent},
  {path:'lesson-plan',component:LessonPlanComponent}
  
]
