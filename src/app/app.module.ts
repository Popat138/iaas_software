import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule} from '@angular/material/card';
import { LoginComponent } from './login/login.component'
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field'
import {MatButtonModule} from '@angular/material/button'
import {MatInputModule} from '@angular/material/input';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
// import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
// import { TeacherLayoutComponent } from './layouts/teacher-layout/teacher-layout.component';
import { MatIconModule } from '@angular/material/icon'
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { AdminLayoutModule } from './layouts/admin-layout/admin-layout.module';
import { TeacherLayoutModule } from './layouts/teacher-layout/teacher-layout.module';
import { MatPaginatorModule } from '@angular/material/paginator';

// import { AddOneTimeFormComponent } from './Addnew/add-one-time-form/add-one-time-form.component';
//import { AddServiceDetailsComponent } from './Addnew/add-service-details/add-service-details.component';
import { CommitteeLayoutComponent } from './layouts/committee-layout/committee-layout.component';

import { CommitteeLayoutModule } from './layouts/committee-layout/committee-layout.module';
import { AddNewDetailsComponent } from './Addnew/add-new-details/add-new-details.component';
import { MaterialModule } from './material';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AddNewStudentAwardComponent } from './Addnew/add-new-student-award/add-new-student-award.component';
import { AddNewRecognitionsComponent } from './Addnew/add-new-recognitions/add-new-recognitions.component';
import { NewDetailsComponent } from './View/new-details/new-details.component';

import { NewStudentAwardComponent } from './View/new-student-award/new-student-award.component';
import { NewRecognitionsComponent } from './View/new-recognitions/new-recognitions.component';
import { HttpClientModule } from '@angular/common/http';
import { NewYearDetailsComponent } from './View/new-year-details/new-year-details.component';

import { OfficeLayoutModule } from './layouts/office-layout/office-layout.module';
import { StudentDataComponent } from './student-data/student-data.component';
import { ScholarshipDataComponent } from './scholarship-data/scholarship-data.component';
import { AuditFinanaceDataComponent } from './audit-finanace-data/audit-finanace-data.component';
import { AddNewStudentDataComponent } from './Addnew/add-new-student-data/add-new-student-data.component';
import { AddNewScholarshipDataComponent } from './Addnew/add-new-scholarship-data/add-new-scholarship-data.component';
import { AddNewAuditAndFinanceDataComponent } from './Addnew/add-new-audit-and-finance-data/add-new-audit-and-finance-data.component';
// import { DepartmentAwardComponent } from './department-award/department-award.component';
import { AddNewDepartmentAwardComponent } from './Addnew/add-new-department-award/add-new-department-award.component';
import { DepartmentEventLayoutModule } from './layouts/department-event-layout/department-event-layout.module';
import { AddNewDepartmentEventComponent } from './Addnew/add-new-department-event/add-new-department-event.component';
import { AddNewSchoolComponent } from './Addnew/add-new-school/add-new-school.component';
import { SuperAdminLayoutComponent } from './layouts/super-admin-layout/super-admin-layout.component';
import { SuperAdminAddNewCollegeComponent } from './Addnew/super-admin-add-new-college/super-admin-add-new-college.component';
import { ViewScholarshipDetailComponent } from './View/view-scholarship-detail/view-scholarship-detail.component';
import { ViewRollCallListComponent } from './View/view-roll-call-list/view-roll-call-list.component';
import { ViewExpenditureDetailComponent } from './View/view-expenditure-detail/view-expenditure-detail.component';
import { ViewMaintenanceExpenditureDetailComponent } from './View/view-maintenance-expenditure-detail/view-maintenance-expenditure-detail.component';
import { IqacLayoutModule } from './layouts/iqac-layout/iqac-layout.module';
import { AddNewDepartmentComponent } from './Addnew/add-new-department/add-new-department.component';
import { AddNewCommitteeComponent } from './Addnew/add-new-committee/add-new-committee.component';
import { AddNewCertificateCourseComponent } from './Addnew/add-new-certificate-course/add-new-certificate-course.component';
import { AddNewListOfProgrammesComponent } from './Addnew/add-new-list-of-programmes/add-new-list-of-programmes.component';
import { AddNewProgramDetailsComponent } from './Addnew/add-new-program-details/add-new-program-details.component';
import { AddNewIqacMeetingsComponent } from './Addnew/add-new-iqac-meetings/add-new-iqac-meetings.component';
import { AddNewIqacReportComponent } from './Addnew/add-new-iqac-report/add-new-iqac-report.component';
import { AddNewDevelopmentProgramComponent } from './Addnew/add-new-development-program/add-new-development-program.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { EditCommitteeDetailsComponent } from './edit/edit-committee-details/edit-committee-details.component';
import { RollCallDataComponent } from './roll-call-data/roll-call-data.component';
import { AddNewRollCallDataComponent } from './Addnew/add-new-roll-call-data/add-new-roll-call-data.component';
import { ViewIQACMeetingDetailComponent } from './View/view-iqacmeeting-detail/view-iqacmeeting-detail.component';
import { AddTeachingDetailsComponent } from './Addnew/Teachers/add-teaching-details/add-teaching-details.component';
import { AddOtherCoursesComponent } from './Addnew/Teachers/add-other-courses/add-other-courses.component';
import { AddFacultyDevelopmentProgramsComponent } from './Addnew/Teachers/add-faculty-development-programs/add-faculty-development-programs.component';
import { AddSeminarsAttendedComponent } from './Addnew/Teachers/add-seminars-attended/add-seminars-attended.component';
import { AddPapersPresentedComponent } from './Addnew/Teachers/add-papers-presented/add-papers-presented.component';
import { AddResearchPapersComponent } from './Addnew/Teachers/add-research-papers/add-research-papers.component';
import { AddBookPublishedComponent } from './Addnew/Teachers/add-book-published/add-book-published.component';
import { AddOneTimeFormComponent } from './Addnew/Teachers/add-one-time-form/add-one-time-form.component';
import { AddTransferDetailsComponent } from './Addnew/Teachers/add-transfer-details/add-transfer-details.component';
import { AddApprovalDetailsComponent } from './Addnew/Teachers/add-approval-details/add-approval-details.component';
import { AddServiceDetailsComponent } from './Addnew/Teachers/add-service-details/add-service-details.component';
import { ViewOneTimeFormComponent } from './View/view-one-time-form/view-one-time-form.component';
import { ViewResearchPaperComponent } from './View/view-research-paper/view-research-paper.component';
import { AddDepartmenetDetailsComponent } from './Addnew/Department/add-departmenet-details/add-departmenet-details.component';
import { AddUgCoursesComponent } from './Addnew/Department/add-ug-courses/add-ug-courses.component';
import { AddPgCoursesComponent } from './Addnew/Department/add-pg-courses/add-pg-courses.component';
import { AddDiplomaComponent } from './Addnew/Department/add-diploma/add-diploma.component';
import { AddResearchProgramsComponent } from './Addnew/Department/add-research-programs/add-research-programs.component';
import { AddAdmittedStudentsComponent } from './Addnew/Department/add-admitted-students/add-admitted-students.component';
import { AddPassOutStudentsComponent } from './Addnew/Department/add-pass-out-students/add-pass-out-students.component';
import { SelectProgramByDepartmentIdComponent } from './common/select-program-by-department-id/select-program-by-department-id.component';
import { AddTeachingPlanComponent } from './Addnew/Teachers/add-teaching-plan/add-teaching-plan.component';
import { AddAttandanceRecordComponent } from './Addnew/Teachers/add-attandance-record/add-attandance-record.component';
import { AddProjectWorkComponent } from './Addnew/Teachers/add-project-work/add-project-work.component';
import { AddResearchStudentsComponent } from './Addnew/Teachers/add-research-students/add-research-students.component';
import { AddResultsComponent } from './Addnew/Teachers/add-results/add-results.component';
import { ResearchStudentInformationComponent } from './research-student-information/research-student-information.component';
import { AddTeachersComponent } from './Addnew/Department/add-teachers/add-teachers.component';
import { CreateTeachersComponent } from './create-teachers/create-teachers.component';
import { AddResultsUgComponent } from './Addnew/Department/add-results-ug/add-results-ug.component';
import { AddResultsPgComponent } from './Addnew/Department/add-results-pg/add-results-pg.component';
import { AddHigherEducationComponent } from './Addnew/Department/add-higher-education/add-higher-education.component';
import { AddPlacementDetailsComponent } from './Addnew/Department/add-placement-details/add-placement-details.component';
import { AddCompetativeExamsComponent } from './Addnew/Department/add-competative-exams/add-competative-exams.component';
import { AddInternalAssesmentComponent } from './Addnew/add-internal-assesment/add-internal-assesment.component';
import { SelectCourseByProgramIdComponent } from './common/select-course-by-program-id/select-course-by-program-id.component';
import { ViewTeachingPlanComponent } from './View/view-teaching-plan/view-teaching-plan.component';
import { SelectStudentByDivisionComponent } from './common/select-student-by-division/select-student-by-division.component';
import { SelectStudentByCollegeComponent } from './common/select-student-by-college/select-student-by-college.component';
import { ViewProjectWorkComponent } from './View/view-project-work/view-project-work.component';
import { ViewPHDResearchStudentDetailsComponent } from './View/view-phdresearch-student-details/view-phdresearch-student-details.component';
import { ViewPHDDeclaredStudentDetailsComponent } from './View/view-phddeclared-student-details/view-phddeclared-student-details.component';
import { LibraryLayoutModule } from './layouts/library-layout/library-layout.module';
import { AddIlmsInfoComponent } from './Addnew/library/add-ilms-info/add-ilms-info.component';
import { AddscreenshotComponent } from './Addnew/library/addscreenshot/addscreenshot.component';
import { AddPurchasedBooksComponent } from './Addnew/library/add-purchased-books/add-purchased-books.component';
import { AddJournalScubscriptionComponent } from './Addnew/library/add-journal-scubscription/add-journal-scubscription.component';
import { AddOnlineResourcesComponent } from './Addnew/library/add-online-resources/add-online-resources.component';
import { AddOnlineResourcesVisuallyImparedComponent } from './Addnew/library/add-online-resources-visually-impared/add-online-resources-visually-impared.component';
import { AddRareBooksComponent } from './Addnew/library/add-rare-books/add-rare-books.component';
import { AddBookBankComponent } from './Addnew/library/add-book-bank/add-book-bank.component';
import { AddAnnualReportOnlineResourcesComponent } from './Addnew/library/add-annual-report-online-resources/add-annual-report-online-resources.component';
import { AddInternshipDetailsComponent } from './Addnew/Department/add-internship-details/add-internship-details';
import { ListOfUgCoursesComponent } from './IqacAccess/Department/list-of-ug-courses/list-of-ug-courses.component';
import { ListOfPgCoursesComponent } from './IqacAccess/Department/list-of-pg-courses/list-of-pg-courses.component';
import { ListOfUgResultsComponent } from './IqacAccess/Department/list-of-ug-results/list-of-ug-results.component';
import { ListOfPgResultsComponent } from './IqacAccess/Department/list-of-pg-results/list-of-pg-results.component';
import { ListOfStudentAchievementsComponent } from './IqacAccess/Department/list-of-student-achievements/list-of-student-achievements.component';
import { ListOfSummerWinterSchoolComponent } from './IqacAccess/Department/list-of-summer-winter-school/list-of-summer-winter-school.component';
import { ListOfPlacementComponent } from './IqacAccess/Department/list-of-placement/list-of-placement.component';
import { ListOfUgToPgComponent } from './IqacAccess/Department/list-of-ug-to-pg/list-of-ug-to-pg.component';
import { ListOfCompetativeExamsComponent } from './IqacAccess/Department/list-of-competative-exams/list-of-competative-exams.component';
import { ListOfResearchStudentsComponent } from './IqacAccess/Department/list-of-research-students/list-of-research-students.component';
import { ListOfResearchStudentsDeclaredComponent } from './IqacAccess/Department/list-of-research-students-declared/list-of-research-students-declared.component';
import { ListOfResearchProgramComponent } from './IqacAccess/Department/list-of-research-program/list-of-research-program.component';
import { ListOfEventsComponent } from './IqacAccess/Department/list-of-events/list-of-events.component';
import { ListOfMeetingsComponent } from './IqacAccess/Committee/list-of-meetings/list-of-meetings.component';
import { ListOfActivityReportsComponent } from './IqacAccess/Committee/list-of-activity-reports/list-of-activity-reports.component';
import { ListOfAppointmentComponent } from './IqacAccess/Teacher/list-of-appointment/list-of-appointment.component';
import { ListOfApprovalComponent } from './IqacAccess/Teacher/list-of-approval/list-of-approval.component';
import { ListOfTeacherInfoComponent } from './IqacAccess/Teacher/list-of-teacher-info/list-of-teacher-info.component';
import { ListOfResearchPapersComponent } from './IqacAccess/Teacher/list-of-research-papers/list-of-research-papers.component';
import { ListOfBookPublicationsComponent } from './IqacAccess/Teacher/list-of-book-publications/list-of-book-publications.component';
import { ListOfConferencePapersComponent } from './IqacAccess/Teacher/list-of-conference-papers/list-of-conference-papers.component';
import { ListOfConferenceAttendedComponent } from './IqacAccess/Teacher/list-of-conference-attended/list-of-conference-attended.component';
import { ListOfFacultyDevelopmentProgramComponent } from './IqacAccess/Teacher/list-of-faculty-development-program/list-of-faculty-development-program.component';
import { ListOfProjectWorkComponent } from './IqacAccess/Teacher/list-of-project-work/list-of-project-work.component';
import { ListOfScholarshipComponent } from './IqacAccess/Office/list-of-scholarship/list-of-scholarship.component';
import { ListOfDetailsIlmsSoftwareComponent } from './IqacAccess/Library/list-of-details-ilms-software/list-of-details-ilms-software.component';
import { ListOfPurchaseOfBooksComponent } from './IqacAccess/Library/list-of-purchase-of-books/list-of-purchase-of-books.component';
import { ListOfSubscriptionOfJournalsComponent } from './IqacAccess/Library/list-of-subscription-of-journals/list-of-subscription-of-journals.component';
import { ListOfOnlineResourcesComponent } from './IqacAccess/Library/list-of-online-resources/list-of-online-resources.component';
import { ListOfRareBooksComponent } from './IqacAccess/Library/list-of-rare-books/list-of-rare-books.component';
import { ListOfResourcesVisuallyImparedComponent } from './IqacAccess/Library/list-of-resources-visually-impared/list-of-resources-visually-impared.component';
import { ListOfBookBankSchemeComponent } from './IqacAccess/Library/list-of-book-bank-scheme/list-of-book-bank-scheme.component';
import { ListOfUsageReportComponent } from './IqacAccess/Library/list-of-usage-report/list-of-usage-report.component';
import { ListOfInternshipComponent } from './IqacAccess/Department/list-of-internship/list-of-internship.component';
import { AddCourseOutcomeMappingComponent } from './Addnew/add-course-outcome-mapping/add-course-outcome-mapping.component';
import { CourseOutcomeMappingComponent } from './course-outcome-mapping/course-outcome-mapping.component';
import { GetAttainmentDetailComponent } from './get-attainment-detail/get-attainment-detail.component';
import { GetFinalAttainmentChartComponent } from './get-final-attainment-chart/get-final-attainment-chart.component';
import { ViewCourseOutcomeMappingComponent } from './View/view-course-outcome-mapping/view-course-outcome-mapping.component';
import { ViewInternalAssessmentComponent } from './View/view-internal-assessment/view-internal-assessment.component';
import { SelectResearchProgramByDepartmentIdComponent } from './common/select-research-program-by-department-id/select-research-program-by-department-id.component';
import { SelectResearchProgramListByDepartmentComponent } from './common/select-research-program-list-by-department/select-research-program-list-by-department.component';
import { SelectUserByDepartmentIdComponent } from './common/select-user-by-department-id/select-user-by-department-id.component';
import { SelectStudentByDepartmentIdComponent } from './common/select-student-by-department-id/select-student-by-department-id.component';
import { SelectStudentByProgramIdComponent } from './common/select-student-by-program-id/select-student-by-program-id.component';
import { SelectCertificationCourseByProgramIdComponent } from './common/select-certification-course-by-program-id/select-certification-course-by-program-id.component';
import { Criteria1Component } from './IqacAccess/Criteria/criteria1/criteria1.component';
import { AddNewCommitteeReportComponent } from './Addnew/add-new-committee-report/add-new-committee-report.component';
import { AddNewMeetingComponent } from './Addnew/add-new-meeting/add-new-meeting.component';
import { Criteria2Component } from './IqacAccess/Criteria/criteria2/criteria2.component';
import { Criteria3Component } from './IqacAccess/Criteria/criteria3/criteria3.component';
import { Criteria4Component } from './IqacAccess/Criteria/criteria4/criteria4.component';
import { Criteria5Component } from './IqacAccess/Criteria/criteria5/criteria5.component';
import { Criteria6Component } from './IqacAccess/Criteria/criteria6/criteria6.component';
import { Criteria7Component } from './IqacAccess/Criteria/criteria7/criteria7.component';
import { ListOfAwardComponent } from './IqacAccess/Committee/list-of-award/list-of-award.component';
import { ViewResourceListComponent } from './View/view-resource-list/view-resource-list.component';
import { EditCreateDepartmentComponent } from './edit/iqac/edit-create-department/edit-create-department.component';
import { EditListOfProgrammesComponent } from './edit/iqac/edit-list-of-programmes/edit-list-of-programmes.component';
import { EditProgramDetailsComponent } from './edit/iqac/edit-program-details/edit-program-details.component';
import { EditCertificateCoursesComponent } from './edit/iqac/edit-certificate-courses/edit-certificate-courses.component';
import { EditCreateCommitteeComponent } from './edit/iqac/edit-create-committee/edit-create-committee.component';
import { EditIqacMeetingsComponent } from './edit/iqac/edit-iqac-meetings/edit-iqac-meetings.component';
import { EditIqacReportComponent } from './edit/iqac/edit-iqac-report/edit-iqac-report.component';
import { EditDevelopmentProgrammeComponent } from './edit/iqac/edit-development-programme/edit-development-programme.component';
import { EditReportOfEventComponent } from './edit/Department/edit-report-of-event/edit-report-of-event.component';
import { EditSummerWinterComponent } from './edit/Department/edit-summer-winter/edit-summer-winter.component';
import { EditCreateTeacherComponent } from './edit/Department/edit-create-teacher/edit-create-teacher.component';
import { EditUgCoursesComponent } from './edit/Department/edit-ug-courses/edit-ug-courses.component';
import { EditPgCoursesComponent } from './edit/Department/edit-pg-courses/edit-pg-courses.component';
import { EditDiplomaAndOtherCoursesComponent } from './edit/Department/edit-diploma-and-other-courses/edit-diploma-and-other-courses.component';
import { EditResearchProgramComponent } from './edit/Department/edit-research-program/edit-research-program.component';
import { EditAdmittedStudentComponent } from './edit/Department/edit-admitted-student/edit-admitted-student.component';
import { EditPaasoutStudentsComponent } from './edit/Department/edit-paasout-students/edit-paasout-students.component';
import { EditAwardComponent } from './edit/Department/edit-award/edit-award.component';
import { EditResultUgComponent } from './edit/Department/edit-result-ug/edit-result-ug.component';
import { EditResultPgComponent } from './edit/Department/edit-result-pg/edit-result-pg.component';
import { EditHigherEduComponent } from './edit/Department/edit-higher-edu/edit-higher-edu.component';
import { EditPlacementComponent } from './edit/Department/edit-placement/edit-placement.component';
import { EditInternshipComponent } from './edit/Department/edit-internship/edit-internship.component';
import { EditComponentComponent } from './edit/Department/edit-component/edit-component.component';
import { EditAcademicCalenderComponent } from './edit/edit-academic-calender/edit-academic-calender.component';
import { EditActivityReportComponent } from './edit/Committee/edit-activity-report/edit-activity-report.component';
import { EditCommitteeMeetingDetailsComponent } from './edit/Committee/edit-committee-meeting-details/edit-committee-meeting-details.component';
import { EditFacultyDevelopmentProgramComponent } from './edit/teacher/edit-faculty-development-program/edit-faculty-development-program.component';
import { EditTeachingPlanComponent } from './edit/teacher/edit-teaching-plan/edit-teaching-plan.component';
import { EditAttendanceComponent } from './edit/teacher/edit-attendance/edit-attendance.component';
import { EditInternalAssesmentComponent } from './edit/teacher/edit-internal-assesment/edit-internal-assesment.component';
import { CoPoAttainmentComponent } from './edit/teacher/co-po-attainment/co-po-attainment.component';
import { EditProjectWorkComponent } from './edit/teacher/edit-project-work/edit-project-work.component';
import { EditResultComponent } from './edit/teacher/edit-result/edit-result.component';
import { EditResearchStudentComponent } from './edit/teacher/edit-research-student/edit-research-student.component';
import { EditIlmsInfoComponent } from './edit/library/edit-ilms-info/edit-ilms-info.component';
import { EditPurchasedBooksComponent } from './edit/library/edit-purchased-books/edit-purchased-books.component';
import { EditJournalSubscriptionComponent } from './edit/library/edit-journal-subscription/edit-journal-subscription.component';
import { EditOnlineResourcesComponent } from './edit/library/edit-online-resources/edit-online-resources.component';
import { EditResourcesVisuallyComponent } from './edit/library/edit-resources-visually/edit-resources-visually.component';
import { EditRareBooksComponent } from './edit/library/edit-rare-books/edit-rare-books.component';
import { EditBookBankComponent } from './edit/library/edit-book-bank/edit-book-bank.component';
import { EditAnnualUsageReportComponent } from './edit/library/edit-annual-usage-report/edit-annual-usage-report.component';
import { SelectOnlineResourceByCollegeIdComponent } from './common/select-online-resource-by-college-id/select-online-resource-by-college-id.component';
import { TestreportComponent } from './testreport/testreport.component';
// import { StudentSurveyComponent } from './Addnew/Feedback/student-survey/student-survey.component';
// import { TeacherFeedbackComponent } from './Addnew/Feedback/teacher-feedback/teacher-feedback.component';
// import { ParentsFeedbackComponent } from './Addnew/Feedback/parents-feedback/parents-feedback.component';
import { AluminiFeedbackComponent } from './Addnew/Feedback/alumini-feedback/alumini-feedback.component';
import { StudentSurveyComponent } from './Addnew/Feedback/student-survey/student-survey.component';
import { TeacherFeedbackComponent } from './Addnew/Feedback/teacher-feedback/teacher-feedback.component';
import { ParentsFeedbackComponent } from './Addnew/Feedback/parents-feedback/parents-feedback.component';
import { SelectProgramByCollegeIdComponent } from './common/select-program-by-college-id/select-program-by-college-id.component';
import { SelectTeacherByCollegeComponent } from './common/select-teacher-by-college/select-teacher-by-college.component';
import { StudentDataByAcademicDetailComponent } from './student-data-by-academic-detail/student-data-by-academic-detail.component';
import { AddStudentDataByAcademicDetailComponent } from './Addnew/add-student-data-by-academic-detail/add-student-data-by-academic-detail.component';
import { EditStudentDataByAcademicDetailComponent } from './edit/edit-student-data-by-academic-detail/edit-student-data-by-academic-detail.component';
import { ListOfFdpComponent } from './IqacAccess/Teacher/list-of-fdp-program/list-of-fdp-program.component';
import { ListOfAuditFinanceComponent } from './IqacAccess/Office/list-of-audit-finance/list-of-audit-finance.component';
import { ViewDiplomaStudentDetailsComponent } from './View/view-diploma-student-details/view-diploma-student-details.component';
import { CreateStreamComponent } from './create-stream/create-stream.component';
import { AddNewStreamComponent } from './Addnew/add-new-stream/add-new-stream.component';
import { StreamDetailsComponent } from './stream-details/stream-details.component';
import { AddNewStreamDetailsComponent } from './Addnew/add-new-stream-details/add-new-stream-details.component';
import { ResearchProjectsComponent } from './research-projects/research-projects.component';
import { AddNewResearchProjectsComponent } from './Addnew/Teachers/add-new-research-projects/add-new-research-projects.component';
import { ListOfResearchProjectsComponent } from './IqacAccess/Teacher/list-of-research-projects/list-of-research-projects.component';
import { ListResearchStudentsComponent } from './IqacAccess/Teacher/list-research-students/list-research-students.component';
import { ListOfRecognitionsComponent } from './IqacAccess/Committee/list-of-recognitions/list-of-recognitions.component';
import { AddAcademicParticipationComponent } from './Addnew/Teachers/add-academic-participation/add-academic-participation.component';
import { AcademicParticipationComponent } from './academic-participation/academic-participation.component';
import { ListOfAcademicParticipationComponent } from './IqacAccess/Teacher/list-of-academic-participation/list-of-academic-participation.component';
import { AddNewTeachingMethodsComponent } from './Addnew/Teachers/add-new-teaching-methods/add-new-teaching-methods.component';
import { TeachingMethodsComponent } from './teaching-methods/teaching-methods.component';
import { ViewTeachingMethodsComponent } from './View/view-teaching-methods/view-teaching-methods.component';
import { TeachingmethodreportComponent } from './teachingmethodreport/teachingmethodreport.component';
import { ListOfTeachingMethodsComponent } from './IqacAccess/Teacher/list-of-teaching-methods/list-of-teaching-methods.component';
import { EditTeachingMethodsComponent } from './edit/teacher/edit-teaching-methods/edit-teaching-methods.component';
import { ListOfCompetitiveexamsComponent } from './IqacAccess/Department/list-of-competitiveexams/list-of-competitiveexams.component';
import { EditOneTimeFormComponent } from './edit/teacher/edit-one-time-form/edit-one-time-form.component';
import { EditAppointme4ntDetailsComponent } from './edit/teacher/edit-appointme4nt-details/edit-appointme4nt-details.component';
import { EditApprovalDetailsComponent } from './edit/teacher/edit-approval-details/edit-approval-details.component';
import { EditTransferDetailComponent } from './edit/teacher/edit-transfer-detail/edit-transfer-detail.component';
import { EditConferenceAttendedComponent } from './edit/teacher/edit-conference-attended/edit-conference-attended.component';
import { EditPaperPresentedComponent } from './edit/teacher/edit-paper-presented/edit-paper-presented.component';
import { EditResearchPapersComponent } from './edit/teacher/edit-research-papers/edit-research-papers.component';
import { EditBookPublicationsComponent } from './edit/teacher/edit-book-publications/edit-book-publications.component';
import { EditResrearchProjectDetailsComponent } from './edit/teacher/edit-resrearch-project-details/edit-resrearch-project-details.component';
import { EditAcademicBodyParticipationComponent } from './edit/teacher/edit-academic-body-participation/edit-academic-body-participation.component';
import { EditStreamDetailComponent } from './edit/iqac/edit-stream-detail/edit-stream-detail.component';
import { IqacHelpComponent } from './iqac-help/iqac-help.component';
import { DepartmentTeacherComponent } from './department-teacher/department-teacher.component';
import { GetAttainmentDepartmentComponent } from './get-attainment-department/get-attainment-department.component';
import { ViewCoPoMappingComponent } from './View/view-co-po-mapping/view-co-po-mapping.component';
import { ViewTeachingDetailsComponent } from './View/view-teaching-details/view-teaching-details.component';
import { AddStudentRollListComponent } from './Addnew/Teachers/add-student-roll-list/add-student-roll-list.component';
import { RollCallListComponent } from './roll-call-list/roll-call-list.component';
import { SelectStudentForRollComponent } from './common/select-student-for-roll/select-student-for-roll.component';
import { GetRollCallListComponent } from './get-roll-call-list/get-roll-call-list.component';
import { GetRollCallDepartmentComponent } from './get-roll-call-department/get-roll-call-department.component';
import { EditAdminCollegeComponent } from './edit/edit-admin-college/edit-admin-college.component';
import { AddLessonPlanComponent } from './Addnew/Teachers/add-lesson-plan/add-lesson-plan.component';
import { LessonPlanComponent } from './lesson-plan/lesson-plan.component';
import { EditLessonPlanComponent } from './edit/teacher/edit-lesson-plan/edit-lesson-plan.component';
import { ViewLessonPlanComponent } from './View/view-lesson-plan/view-lesson-plan.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NgxPrintModule } from 'ngx-print';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NgxSummernoteModule } from 'ngx-summernote';
import { IqactestreportComponent } from './iqactestreport/iqactestreport.component';
import { AddBestPracticeComponent } from './Addnew/Department/add-best-practice/add-best-practice.component';
import { BestPracticeComponent } from './best-practice/best-practice.component';
import { EditBestPracticeComponent } from './edit/Department/edit-best-practice/edit-best-practice.component';
import { ReportbestpracticeComponent } from './reportbestpractice/reportbestpractice.component';
import { ListOfBestPracticesComponent } from './IqacAccess/Department/list-of-best-practices/list-of-best-practices.component';
import { AddGoodPracticeComponent } from './Addnew/add-good-practice/add-good-practice.component';
import { GoodPracticeComponent } from './good-practice/good-practice.component';
import { EditGoodPracticeComponent } from './edit/Committee/edit-good-practice/edit-good-practice.component';
import { ViewDiplomaStudentsComponent } from './View/view-diploma-students/view-diploma-students.component';
import { ListOfDiplomaStudentsComponent } from './IqacAccess/Department/list-of-diploma-students/list-of-diploma-students.component';
import { CritriaLayoutComponent } from './layouts/critria-layout/critria-layout.component';
import { CreateCriteriaComponent } from './create-criteria/create-criteria.component';
import { AddNewCriteriaComponent } from './Addnew/add-new-criteria/add-new-criteria.component';
import { AddImagesComponent } from './Addnew/add-images/add-images.component';
import { Criterion1Component } from './iqaccriteria/criterion1/criterion1.component';
import { Criterion2Component } from './iqaccriteria/criterion2/criterion2.component';
import { Criterion3Component } from './iqaccriteria/criterion3/criterion3.component';
import { Criterion4Component } from './iqaccriteria/criterion4/criterion4.component';
import { Criterion5Component } from './iqaccriteria/criterion5/criterion5.component';
import { Criterion6Component } from './iqaccriteria/criterion6/criterion6.component';
import { Criterion7Component } from './iqaccriteria/criterion7/criterion7.component';
import { EditImagesReportComponent } from './edit/Committee/edit-images-report/edit-images-report.component';
import { RollCallCollegeComponent } from './roll-call-college/roll-call-college.component';
import { StudentForProjectComponent } from './common/student-for-project/student-for-project.component';
import { CritriaLayoutModule } from './layouts/critria-layout/critria-layout.module';
import { EditCreateCriteriaComponent } from './edit/iqac/edit-create-criteria/edit-create-criteria.component';
import { TestnewreportComponent } from './testnewreport/testnewreport.component';
import { EditAuditFinanceComponent } from './edit/Office/edit-audit-finance/edit-audit-finance.component';
import { EditTeachingDetailsComponent } from './edit/teacher/edit-teaching-details/edit-teaching-details.component';
import { CommiteeMemberComponent } from './commitee-member/commitee-member.component';
import { AddCommitteeMembersComponent } from './Addnew/add-committee-members/add-committee-members.component';
import { CriteriaReportComponent } from './criteria-report/criteria-report.component';
import { AddCriteriaReportComponent } from './Addnew/add-criteria-report/add-criteria-report.component';
import { ViewCriteriaReportsComponent } from './View/view-criteria-reports/view-criteria-reports.component';
import { EditCriteriaReportComponent } from './edit/edit-criteria-report/edit-criteria-report.component';
import { ViewActivityReportComponent } from './View/view-activity-report/view-activity-report.component';
import { AddCriquantitativeReportComponent } from './Addnew/add-criquantitative-report/add-criquantitative-report.component';
import { EditCriquantitativeReportComponent } from './edit/edit-criquantitative-report/edit-criquantitative-report.component';
import { CriteriaQuantitativeReportComponent } from './criteria-quantitative-report/criteria-quantitative-report.component';
import { ViewCriteriaQuantitativeComponent } from './View/view-criteria-quantitative/view-criteria-quantitative.component';
import { ViewBiodataComponent } from './View/view-biodata/view-biodata.component';
import { AddGradeSheetComponent } from './Addnew/add-grade-sheet/add-grade-sheet.component';
import { EditGradeSheetComponent } from './edit/edit-grade-sheet/edit-grade-sheet.component';
import { GradesSheetComponent } from './grades-sheet/grades-sheet.component';
import { ViewBiodataiqacComponent } from './View/view-biodataiqac/view-biodataiqac.component';
import { ViewNewinternalAssessmentComponent } from './View/view-newinternal-assessment/view-newinternal-assessment.component';
// import { CritriaLayoutModule } from './layouts/critria-layout/critria-layout.module';
// import { EditAuditFinanceComponent } from './Edit/Office/edit-audit-finance/edit-audit-finance.component';
// import { EditScholarshipComponent } from './Edit/Office/edit-scholarship/edit-scholarship.component';
// import { EditRollCallDataComponent } from './Edit/Office/edit-roll-call-data/edit-roll-call-data.component';
// import { EditStudentDataComponent } from './Edit/Office/edit-student-data/edit-student-data.component';
// import { EditStudentAwardComponent } from './Edit/Committee/edit-student-award/edit-student-award.component';
// import { EditRecognitionsComponent } from './Edit/Committee/edit-recognitions/edit-recognitions.component';
// import { EditResultUgComponent } from './Edit/Department/edit-result-ug/edit-result-ug.component';
// import { EditResultPgComponent } from './Edit/Department/edit-result-pg/edit-result-pg.component';
// import { EditHigherEduComponent } from './Edit/Department/edit-higher-edu/edit-higher-edu.component';
// import { EditPlacementComponent } from './Edit/Department/edit-placement/edit-placement.component';
// import { EditComponentComponent } from './Edit/Department/edit-component/edit-component.component';
// import { EditAwardComponent } from './Edit/Department/edit-award/edit-award.component';
// import { EditSummerWinterComponent } from './Edit/Department/edit-summer-winter/edit-summer-winter.component';
// import { EditReportOfEventComponent } from './Edit/Department/edit-report-of-event/edit-report-of-event.component';
// import { EditPaasoutStudentsComponent } from './Edit/Department/edit-paasout-students/edit-paasout-students.component';
// import { EditResearchProgramComponent } from './Edit/Department/edit-research-program/edit-research-program.component';
// import { EditDiplomaAndOtherCoursesComponent } from './Edit/Department/edit-diploma-and-oit-diploma-and-other-courses.component';
// import { EditPgCoursesComponent } from './Edit/Department/edit-pg-courses/editther-courses/ed-pg-courses.component';
// import { EditUgCoursesComponent } from './Edit/Department/edit-ug-courses/edit-ug-courses.component';
// import { EditDepartmentDetailsComponent } from './Edit/Department/edit-department-details/edit-department-details.component';
// import { EditCreateTeacherComponent } from './Edit/Department/edit-create-teacher/edit-create-teacher.component';
// import { EditDevelopmentProgrammeComponent } from './Edit/Department/edit-development-programme/edit-development-programme.component';
// import { EditIqacMeetingsComponent } from './Edit/Department/edit-iqac-meetings/edit-iqac-meetings.component';
// import { EditCreateCommitteeComponent } from './Edit/Department/edit-create-committee/edit-create-committee.component';
// import { EditCertificateCoursesComponent } from './Edit/Department/edit-certificate-courses/edit-certificate-courses.component';
// import { EditProgramDetailsComponent } from './Edit/Department/edit-program-details/edit-program-details.component';
// import { EditListOfProgrammesComponent } from './Edit/Department/edit-list-of-programmes/edit-list-of-programmes.component';

// import { EditResearchStudentComponent } from './Edit/teacher/edit-research-student/edit-research-student.component';



// import { EditAnnualUsageReportComponent } from './Edit/library/edit-annual-usage-report/edit-annual-usage-report.component';
// import { EditBookBankComponent } from './Edit/library/edit-book-bank/edit-book-bank.component';
// import { EditRareBooksComponent } from './Edit/library/edit-rare-books/edit-rare-books.component';
// import { EditResourcesVisuallyComponent } from './Edit/library/edit-resources-visually/edit-resources-visually.component';
// import { EditOnlineResourcesComponent } from './Edit/library/edit-online-resources/edit-online-resources.component';
// import { EditJournalSubscriptionComponent } from './Edit/library/edit-journal-subscription/edit-journal-subscription.component';
// import { EditPurchasedBooksComponent } from './Edit/library/edit-purchased-books/edit-purchased-books.component';
// import { EditIlmsInfoComponent } from './Edit/library/edit-ilms-info/edit-ilms-info.component';

// import { AddTestComponenetComponent } from './Addnew/add-test-componenet/add-test-componenet.component';

// import { CertificateCourcesComponent } from './certificate-cources/certificate-cources.component';
// import { ListOfProgrammesComponent } from './list-of-programmes/list-of-programmes.component';
// import { ProgramDetailsComponent } from './program-details/program-details.component';
// import { IqacMeetingsComponent } from './iqac-meetings/iqac-meetings.component';
// import { ReportOfIqacActivitiesComponent } from './report-of-iqac-activities/report-of-iqac-activities.component';
// import { ProfessionalDevelopmentProgrammesComponent } from './professional-development-programmes/professional-development-programmes.component';
// import { IqacLayoutComponent } from './layouts/iqac-layout/iqac-layout.component';
// import { CreateDepartmentComponent } from './create-department/create-department.component';
// import { CreateCommitteeComponent } from './create-committee/create-committee.component';
// import { IqacLayoutModule } from './layouts/iqac-layout/iqac-layout.module';
// import { LogoutComponent } from './logout/logout.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    // AddOneTimeFormComponent,
   // AddServiceDetailsComponent,
    CommitteeLayoutComponent,
    AddNewDetailsComponent,
    AddNewStudentAwardComponent,
    AddNewRecognitionsComponent,
    NewDetailsComponent,
    NewStudentAwardComponent,
    NewRecognitionsComponent,
    NewYearDetailsComponent,
    StudentDataComponent,
    ScholarshipDataComponent,
    AuditFinanaceDataComponent,
    AddNewStudentDataComponent,
    AddNewScholarshipDataComponent,
    AddNewAuditAndFinanceDataComponent,
    AddNewDepartmentAwardComponent,
    AddNewDepartmentEventComponent,
    AddNewSchoolComponent,
    SuperAdminLayoutComponent,
    SuperAdminAddNewCollegeComponent,
    //DepartmentEventLayoutComponent,
    ViewScholarshipDetailComponent,
    ViewRollCallListComponent,
    ViewExpenditureDetailComponent,
    ViewMaintenanceExpenditureDetailComponent,
    EditCommitteeDetailsComponent,
    AddNewDepartmentComponent,
    AddNewCommitteeComponent,
    AddNewCertificateCourseComponent,
    AddNewListOfProgrammesComponent,
    AddNewProgramDetailsComponent,
    AddNewIqacMeetingsComponent,
    AddNewIqacReportComponent,
    AddNewDevelopmentProgramComponent,
    AddNewRollCallDataComponent,
    RollCallDataComponent,
    ViewIQACMeetingDetailComponent,
    AddTeachingDetailsComponent,
    AddOtherCoursesComponent,
    AddFacultyDevelopmentProgramsComponent,
    AddSeminarsAttendedComponent,
    AddPapersPresentedComponent,
    AddResearchPapersComponent,
    AddBookPublishedComponent,
    AddOneTimeFormComponent,
    AddTransferDetailsComponent,
    AddApprovalDetailsComponent,
    AddServiceDetailsComponent,
    ViewOneTimeFormComponent,
    ViewResearchPaperComponent,
    AddDepartmenetDetailsComponent,
    AddUgCoursesComponent,
    AddPgCoursesComponent,
    AddDiplomaComponent,
    AddResearchProgramsComponent,
    AddAdmittedStudentsComponent,
    AddPassOutStudentsComponent,
    SelectProgramByDepartmentIdComponent,
    AddTeachingPlanComponent,
    AddAttandanceRecordComponent,
    AddProjectWorkComponent,
    AddResearchStudentsComponent,
    AddResultsComponent,
    ResearchStudentInformationComponent,
    AddTeachersComponent,
    CreateTeachersComponent,
    AddResultsUgComponent,
    AddResultsPgComponent,
    AddHigherEducationComponent,
    AddPlacementDetailsComponent,
    AddCompetativeExamsComponent,
    AddInternalAssesmentComponent,
    SelectCourseByProgramIdComponent,
    ViewTeachingPlanComponent,
    SelectStudentByDivisionComponent,
    SelectStudentByCollegeComponent,
    ViewProjectWorkComponent,
    ViewPHDResearchStudentDetailsComponent,
    ViewPHDDeclaredStudentDetailsComponent,
    AddIlmsInfoComponent,
    AddscreenshotComponent,
    AddPurchasedBooksComponent,
    AddJournalScubscriptionComponent,
    AddOnlineResourcesComponent,
    AddOnlineResourcesVisuallyImparedComponent,
    AddRareBooksComponent,
    AddBookBankComponent,
    AddAnnualReportOnlineResourcesComponent,
    AddInternshipDetailsComponent,
    AddNewTeachingMethodsComponent,
    ListOfUgCoursesComponent,
    ListOfPgCoursesComponent,
    ListOfUgResultsComponent,
    ListOfPgResultsComponent,
    ListOfStudentAchievementsComponent,
    ListOfSummerWinterSchoolComponent,
    ListOfPlacementComponent,
    ListOfInternshipComponent,
    ListOfUgToPgComponent,
    ListOfCompetativeExamsComponent,
    ListOfResearchStudentsComponent,
    ListOfResearchStudentsDeclaredComponent,
    ListOfResearchProgramComponent,
    ListOfEventsComponent,
    ListOfMeetingsComponent,
    ListOfActivityReportsComponent,
    ListOfAppointmentComponent,
    ListOfApprovalComponent,
    ListOfTeacherInfoComponent,
    ListOfResearchPapersComponent,
    ListOfBookPublicationsComponent,
    ListOfConferencePapersComponent,
    ListOfConferenceAttendedComponent,
    ListOfFacultyDevelopmentProgramComponent,
    ListOfProjectWorkComponent,
    ListOfScholarshipComponent,
    ListOfDetailsIlmsSoftwareComponent,
    ListOfPurchaseOfBooksComponent,
    ListOfSubscriptionOfJournalsComponent,
    ListOfOnlineResourcesComponent,
    ListOfRareBooksComponent,
    ListOfResourcesVisuallyImparedComponent,
    ListOfBookBankSchemeComponent,
    ListOfUsageReportComponent,
    ListOfFdpComponent,
    CourseOutcomeMappingComponent,
    AddCourseOutcomeMappingComponent,
    ViewCourseOutcomeMappingComponent,
    GetAttainmentDetailComponent,
    GetFinalAttainmentChartComponent,
    ViewInternalAssessmentComponent,
    SelectResearchProgramByDepartmentIdComponent,
    SelectResearchProgramListByDepartmentComponent,
    SelectUserByDepartmentIdComponent,
    SelectStudentByDepartmentIdComponent,
    SelectStudentByProgramIdComponent,
    SelectCertificationCourseByProgramIdComponent,
    SelectProgramByCollegeIdComponent,
    SelectTeacherByCollegeComponent,
    TestreportComponent,
    AddNewMeetingComponent,
    AddNewCommitteeReportComponent,
    Criteria1Component,
    CritriaLayoutComponent,
    Criteria2Component,
    Criteria3Component,
    Criteria4Component,
    Criteria5Component,
    Criteria6Component,
    Criteria7Component,
    ListOfAwardComponent,
    ViewResourceListComponent,
    EditAuditFinanceComponent,
    // EditScholarshipComponent,
    // // EditRollCallDataComponent,
    // EditStudentDataComponent,
    // EditStudentAwardComponent,
    // EditRecognitionsComponent,
    EditResultUgComponent,
    EditResultPgComponent,
    EditHigherEduComponent,
    EditPlacementComponent,
    EditInternshipComponent,
    EditComponentComponent,
    EditAwardComponent,
    EditSummerWinterComponent,
    EditReportOfEventComponent,
    EditPaasoutStudentsComponent,
    EditResearchProgramComponent,
    EditDiplomaAndOtherCoursesComponent,
    EditPgCoursesComponent,
    EditUgCoursesComponent,
    // EditDepartmentDetailsComponent,
    EditCreateTeacherComponent,
    EditDevelopmentProgrammeComponent,
    EditIqacMeetingsComponent,
    EditCreateCommitteeComponent,
    EditCertificateCoursesComponent,
    EditProgramDetailsComponent,
    EditListOfProgrammesComponent,
    EditCreateDepartmentComponent,
    EditIqacReportComponent,
    EditAdmittedStudentComponent,
    EditAcademicCalenderComponent,
    EditActivityReportComponent,
    EditCommitteeMeetingDetailsComponent,
    EditFacultyDevelopmentProgramComponent,
    EditTeachingPlanComponent,
    EditAttendanceComponent,
    EditInternalAssesmentComponent,
    CoPoAttainmentComponent,
    EditProjectWorkComponent,
    EditResultComponent,
    EditResearchStudentComponent,

    EditAnnualUsageReportComponent,
    EditBookBankComponent,
    EditRareBooksComponent,
    EditResourcesVisuallyComponent,
    EditOnlineResourcesComponent,
    EditJournalSubscriptionComponent,
    EditPurchasedBooksComponent,
    EditIlmsInfoComponent,
    SelectOnlineResourceByCollegeIdComponent,
    StudentSurveyComponent,
    TeacherFeedbackComponent,
    ParentsFeedbackComponent,
    AluminiFeedbackComponent,
    StudentDataByAcademicDetailComponent,
    AddStudentDataByAcademicDetailComponent,
    EditStudentDataByAcademicDetailComponent,
    ListOfAuditFinanceComponent,
    ViewDiplomaStudentDetailsComponent,
    CreateStreamComponent,
    AddNewStreamComponent,
    StreamDetailsComponent,
    AddNewStreamDetailsComponent,
    ResearchProjectsComponent,
    AddNewResearchProjectsComponent,
    ListOfResearchProjectsComponent,
    ListResearchStudentsComponent,
    ListOfRecognitionsComponent,
    AddAcademicParticipationComponent,
    AcademicParticipationComponent,
    ListOfAcademicParticipationComponent,
    ViewTeachingMethodsComponent,
    TeachingmethodreportComponent,
    ListOfTeachingMethodsComponent,
    EditTeachingMethodsComponent,
    ListOfCompetitiveexamsComponent,
    EditOneTimeFormComponent,
    EditAppointme4ntDetailsComponent,
    EditApprovalDetailsComponent,
    EditTransferDetailComponent,
    EditConferenceAttendedComponent,
    EditPaperPresentedComponent,
    EditResearchPapersComponent,
    EditBookPublicationsComponent,
    EditResrearchProjectDetailsComponent,
    EditAcademicBodyParticipationComponent,
    EditStreamDetailComponent,
    IqacHelpComponent,
    DepartmentTeacherComponent,
    GetAttainmentDepartmentComponent,
    ViewCoPoMappingComponent,
    ViewTeachingDetailsComponent,
    AddStudentRollListComponent,
    RollCallListComponent,
    SelectStudentForRollComponent,
    GetRollCallListComponent,
    GetRollCallDepartmentComponent,
    EditAdminCollegeComponent,
    AddLessonPlanComponent,
    LessonPlanComponent,
    EditLessonPlanComponent,
    ViewLessonPlanComponent,
    IqactestreportComponent,
    AddBestPracticeComponent,
    BestPracticeComponent,
    EditBestPracticeComponent,
    ReportbestpracticeComponent,
    ListOfBestPracticesComponent,
    AddGoodPracticeComponent,
    GoodPracticeComponent,
    EditGoodPracticeComponent,
    ViewDiplomaStudentsComponent,
    ListOfDiplomaStudentsComponent,
    // CritriaLayoutComponent,
    CreateCriteriaComponent,
    AddNewCriteriaComponent,
    AddImagesComponent,
    Criterion1Component,
    Criterion2Component,
    Criterion3Component,
    Criterion4Component,
    Criterion5Component,
    Criterion6Component,
    Criterion7Component,
    EditImagesReportComponent,
    RollCallCollegeComponent,
    StudentForProjectComponent,
    EditCreateCriteriaComponent,
    TestnewreportComponent,
    EditTeachingDetailsComponent,
    CommiteeMemberComponent,
    AddCommitteeMembersComponent,
    CriteriaReportComponent,
    AddCriteriaReportComponent,
    ViewCriteriaReportsComponent,
    EditCriteriaReportComponent,
    ViewActivityReportComponent,
    AddCriquantitativeReportComponent,
    EditCriquantitativeReportComponent,
    CriteriaQuantitativeReportComponent,
    ViewCriteriaQuantitativeComponent,
    ViewBiodataComponent,
    AddGradeSheetComponent,
    EditGradeSheetComponent,
    GradesSheetComponent,
    ViewBiodataiqacComponent,
    ViewNewinternalAssessmentComponent,
    //AddNewTeachingMethodsComponent,

   // IlmsInformationComponent,
    // LibraryLayoutComponent,
    //  AddTestComponenetComponent,
    // ApprovalDetailsComponent,
    // TransferDetailsComponent,
    // CertificateCourcesComponent,
    // ListOfProgrammesComponent,
    // ProgramDetailsComponent,
    // IqacMeetingsComponent,
    // ReportOfIqacActivitiesComponent,
    // ProfessionalDevelopmentProgrammesComponent,
    // IqacLayoutComponent,
    //CreateDepartmentComponent,
    //CreateCommitteeComponent,
    // LogoutComponent,

    // StudentDataComponent,


    // AdminLayoutComponent,
    // TeacherLayoutComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatSidenavModule,
    MatDividerModule,
    AdminLayoutModule,
    TeacherLayoutModule,
    CommitteeLayoutModule,
    OfficeLayoutModule,
    CritriaLayoutModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DepartmentEventLayoutModule,
    IqacLayoutModule,
    LibraryLayoutModule,
    MatDatepickerModule,
    MatFormFieldModule,
    AngularEditorModule,
    NgxPrintModule,
    CKEditorModule,
    NgxSummernoteModule,
    MatPaginatorModule,
 
    // IqacLayoutModule


  ],
  providers: [{provide:LocationStrategy,useClass:HashLocationStrategy}],

  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
