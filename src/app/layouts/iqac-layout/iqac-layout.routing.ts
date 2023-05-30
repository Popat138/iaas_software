import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CertificateCourcesComponent } from 'src/app/certificate-cources/certificate-cources.component';
import { CommitteeDetailsComponent } from 'src/app/committee-details/committee-details.component';
import { CreateCommitteeComponent } from 'src/app/create-committee/create-committee.component';
import { CreateDepartmentComponent } from 'src/app/create-department/create-department.component';
import { IqacMeetingsComponent } from 'src/app/iqac-meetings/iqac-meetings.component';
import { ListOfActivityReportsComponent } from 'src/app/IqacAccess/Committee/list-of-activity-reports/list-of-activity-reports.component';
import { ListOfAwardComponent } from 'src/app/IqacAccess/Committee/list-of-award/list-of-award.component';
import { ListOfMeetingsComponent } from 'src/app/IqacAccess/Committee/list-of-meetings/list-of-meetings.component';
import { Criteria1Component } from 'src/app/IqacAccess/Criteria/criteria1/criteria1.component';
import { Criteria2Component } from 'src/app/IqacAccess/Criteria/criteria2/criteria2.component';
import { Criteria3Component } from 'src/app/IqacAccess/Criteria/criteria3/criteria3.component';
import { Criteria4Component } from 'src/app/IqacAccess/Criteria/criteria4/criteria4.component';
import { Criteria5Component } from 'src/app/IqacAccess/Criteria/criteria5/criteria5.component';
import { Criteria6Component } from 'src/app/IqacAccess/Criteria/criteria6/criteria6.component';
import { Criteria7Component } from 'src/app/IqacAccess/Criteria/criteria7/criteria7.component';
import { ListOfCompetativeExamsComponent } from 'src/app/IqacAccess/Department/list-of-competative-exams/list-of-competative-exams.component';
import { ListOfEventsComponent } from 'src/app/IqacAccess/Department/list-of-events/list-of-events.component';
import { ListOfPgCoursesComponent } from 'src/app/IqacAccess/Department/list-of-pg-courses/list-of-pg-courses.component';
import { ListOfPgResultsComponent } from 'src/app/IqacAccess/Department/list-of-pg-results/list-of-pg-results.component';
import { ListOfPlacementComponent } from 'src/app/IqacAccess/Department/list-of-placement/list-of-placement.component';
import { ListOfResearchProgramComponent } from 'src/app/IqacAccess/Department/list-of-research-program/list-of-research-program.component';
import { ListOfResearchStudentsDeclaredComponent } from 'src/app/IqacAccess/Department/list-of-research-students-declared/list-of-research-students-declared.component';
import { ListOfResearchStudentsComponent } from 'src/app/IqacAccess/Department/list-of-research-students/list-of-research-students.component';
import { ListOfStudentAchievementsComponent } from 'src/app/IqacAccess/Department/list-of-student-achievements/list-of-student-achievements.component';
import { ListOfSummerWinterSchoolComponent } from 'src/app/IqacAccess/Department/list-of-summer-winter-school/list-of-summer-winter-school.component';
import { ListOfUgCoursesComponent } from 'src/app/IqacAccess/Department/list-of-ug-courses/list-of-ug-courses.component';
import { ListOfUgResultsComponent } from 'src/app/IqacAccess/Department/list-of-ug-results/list-of-ug-results.component';
import { ListOfUgToPgComponent } from 'src/app/IqacAccess/Department/list-of-ug-to-pg/list-of-ug-to-pg.component';
import { ListOfBookBankSchemeComponent } from 'src/app/IqacAccess/Library/list-of-book-bank-scheme/list-of-book-bank-scheme.component';
import { ListOfDetailsIlmsSoftwareComponent } from 'src/app/IqacAccess/Library/list-of-details-ilms-software/list-of-details-ilms-software.component';
import { ListOfOnlineResourcesComponent } from 'src/app/IqacAccess/Library/list-of-online-resources/list-of-online-resources.component';
import { ListOfPurchaseOfBooksComponent } from 'src/app/IqacAccess/Library/list-of-purchase-of-books/list-of-purchase-of-books.component';
import { ListOfRareBooksComponent } from 'src/app/IqacAccess/Library/list-of-rare-books/list-of-rare-books.component';
import { ListOfResourcesVisuallyImparedComponent } from 'src/app/IqacAccess/Library/list-of-resources-visually-impared/list-of-resources-visually-impared.component';
import { ListOfSubscriptionOfJournalsComponent } from 'src/app/IqacAccess/Library/list-of-subscription-of-journals/list-of-subscription-of-journals.component';
import { ListOfUsageReportComponent } from 'src/app/IqacAccess/Library/list-of-usage-report/list-of-usage-report.component';
import { ListOfScholarshipComponent } from 'src/app/IqacAccess/Office/list-of-scholarship/list-of-scholarship.component';
import { ListOfAppointmentComponent } from 'src/app/IqacAccess/Teacher/list-of-appointment/list-of-appointment.component';
import { ListOfApprovalComponent } from 'src/app/IqacAccess/Teacher/list-of-approval/list-of-approval.component';
import { ListOfBookPublicationsComponent } from 'src/app/IqacAccess/Teacher/list-of-book-publications/list-of-book-publications.component';
import { ListOfConferenceAttendedComponent } from 'src/app/IqacAccess/Teacher/list-of-conference-attended/list-of-conference-attended.component';
import { ListOfConferencePapersComponent } from 'src/app/IqacAccess/Teacher/list-of-conference-papers/list-of-conference-papers.component';
import { ListOfFacultyDevelopmentProgramComponent } from 'src/app/IqacAccess/Teacher/list-of-faculty-development-program/list-of-faculty-development-program.component';
import { ListOfProjectWorkComponent } from 'src/app/IqacAccess/Teacher/list-of-project-work/list-of-project-work.component';
import { ListOfResearchPapersComponent } from 'src/app/IqacAccess/Teacher/list-of-research-papers/list-of-research-papers.component';
import { ListOfTeacherInfoComponent } from 'src/app/IqacAccess/Teacher/list-of-teacher-info/list-of-teacher-info.component';
import { ListOfProgrammesComponent } from 'src/app/list-of-programmes/list-of-programmes.component';
import { ProfessionalDevelopmentProgrammesComponent } from 'src/app/professional-development-programmes/professional-development-programmes.component';
import { ProgramDetailsComponent } from 'src/app/program-details/program-details.component';
import { RecognitionsAchievementsComponent } from 'src/app/recognitions-achievements/recognitions-achievements.component';
import { ReportOfIqacActivitiesComponent } from 'src/app/report-of-iqac-activities/report-of-iqac-activities.component';
import { StudentAwardComponent } from 'src/app/student-award/student-award.component';
import { ListOfInternshipComponent } from 'src/app/IqacAccess/Department/list-of-internship/list-of-internship.component';
import { ListOfFdpComponent } from 'src/app/IqacAccess/Teacher/list-of-fdp-program/list-of-fdp-program.component';
import { ListOfAuditFinanceComponent } from 'src/app/IqacAccess/Office/list-of-audit-finance/list-of-audit-finance.component';
import { CreateStreamComponent } from 'src/app/create-stream/create-stream.component';
import { StreamDetailsComponent } from 'src/app/stream-details/stream-details.component';
import { ListOfResearchProjectsComponent } from 'src/app/IqacAccess/Teacher/list-of-research-projects/list-of-research-projects.component';
import { ListResearchStudentsComponent } from 'src/app/IqacAccess/Teacher/list-research-students/list-research-students.component';
import { ListOfRecognitionsComponent } from 'src/app/IqacAccess/Committee/list-of-recognitions/list-of-recognitions.component';
import { ListOfAcademicParticipationComponent } from 'src/app/IqacAccess/Teacher/list-of-academic-participation/list-of-academic-participation.component';
import { ListOfTeachingMethodsComponent } from 'src/app/IqacAccess/Teacher/list-of-teaching-methods/list-of-teaching-methods.component';
import { IqacHelpComponent } from 'src/app/iqac-help/iqac-help.component';
import { ListOfBestPracticesComponent } from 'src/app/IqacAccess/Department/list-of-best-practices/list-of-best-practices.component';
import { ListOfDiplomaStudentsComponent } from 'src/app/IqacAccess/Department/list-of-diploma-students/list-of-diploma-students.component';
import { CreateCriteriaComponent } from 'src/app/create-criteria/create-criteria.component';
import { GradesSheetComponent } from 'src/app/grades-sheet/grades-sheet.component';
export const IQAClayoutRoutes: Routes = [
  {path:'create-stream',component:CreateStreamComponent},
  {path:'stream-details',component:StreamDetailsComponent},
   {path:'create-department',component:CreateDepartmentComponent},
   {path:'create-committee',component:CreateCommitteeComponent},
   {path:'certificate-cources',component:CertificateCourcesComponent},
   {path:'list-of-programmes',component:ListOfProgrammesComponent},
   {path:'program-details',component:ProgramDetailsComponent},
   {path:'iqac-meetings',component:IqacMeetingsComponent},
   {path:'report-of-iqac-activities',component:ReportOfIqacActivitiesComponent},
   {path:'professional-development-programmes',component:ProfessionalDevelopmentProgrammesComponent},
   {path:'create-criteria',component:CreateCriteriaComponent},

   {path:'list-of-events', component:ListOfEventsComponent},
   {path:'ug-courses', component:ListOfUgCoursesComponent},
   {path:'pg-courses', component:ListOfPgCoursesComponent},
   {path:'ug-results', component:ListOfUgResultsComponent},
   {path:'pg-results', component:ListOfPgResultsComponent},
   {path:'competative', component:ListOfCompetativeExamsComponent},
   {path:'higher-education', component:ListOfUgToPgComponent},
   {path:'summer-winter', component:ListOfSummerWinterSchoolComponent},
   {path:'research-students', component:ListOfResearchStudentsComponent},
   {path:'research-students-declaerd', component:ListOfResearchStudentsDeclaredComponent},
   {path:'diploma-students',component:ListOfDiplomaStudentsComponent},
   {path:'placement', component:ListOfPlacementComponent},
   {path:'internship',component:ListOfInternshipComponent},
   {path:'best-practices',component:ListOfBestPracticesComponent},
   {path:'research-program', component:ListOfResearchProgramComponent},
   {path:'student-award', component:ListOfStudentAchievementsComponent},
   {path:'scholarship',component:ListOfScholarshipComponent},
   {path:'auditfinance',component:ListOfAuditFinanceComponent},
   {path:'teacher-info',component:ListOfTeacherInfoComponent},
   {path:'approval',component:ListOfApprovalComponent},
   {path:'appointment',component:ListOfAppointmentComponent},
   {path:'researchpaper',component:ListOfResearchPapersComponent},
   {path:'bookpublication',component:ListOfBookPublicationsComponent},
   {path:'conferencepaper',component:ListOfConferencePapersComponent},
   {path:'conferenceattended',component:ListOfConferenceAttendedComponent},
   {path:'projectwork',component:ListOfProjectWorkComponent},
   {path:'fdp',component:ListOfFacultyDevelopmentProgramComponent},
   {path:'researchproject',component:ListOfResearchProjectsComponent },
   {path:'researchstudent',component:ListResearchStudentsComponent },
   {path:'academicparticipation',component:ListOfAcademicParticipationComponent },
   {path:'teachingmethods',component:ListOfTeachingMethodsComponent },
   {path:'meeting',component:ListOfMeetingsComponent},
   {path:'activityreport',component:ListOfActivityReportsComponent},
   {path:'award',component:ListOfAwardComponent},
   {path:'recognitions',component:ListOfRecognitionsComponent},

   {path:'details',component:ListOfDetailsIlmsSoftwareComponent},
   {path:'bookbank',component:ListOfBookBankSchemeComponent},
   {path:'purchase',component:ListOfPurchaseOfBooksComponent},
   {path:'rarebooks',component:ListOfRareBooksComponent},
   {path:'resourses',component:ListOfOnlineResourcesComponent},
   {path:'resource-visually',component:ListOfResourcesVisuallyImparedComponent},
   {path:'journals',component:ListOfSubscriptionOfJournalsComponent},
   {path:'usage',component:ListOfUsageReportComponent},

   {path:'criteria1',component:Criteria1Component},
   {path:'criteria2',component:Criteria2Component},
   {path:'criteria3',component:Criteria3Component},
   {path:'criteria4',component:Criteria4Component},
   {path:'criteria5',component:Criteria5Component},
   {path:'criteria6',component:Criteria6Component},
   {path:'criteria7',component:Criteria7Component},
   {path:'help',component:IqacHelpComponent},
  //  {path:'grade-sheet',component:GradesSheetComponent},
   // {path:'student-award',component:StudentAwardComponent},
  // {path:'committee-details',component:CommitteeDetailsComponent},
  // {path:'recognition', component:RecognitionsAchievementsComponent}

]
