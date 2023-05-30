import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuditFinanaceDataComponent } from 'src/app/audit-finanace-data/audit-finanace-data.component';
import { RollCallDataComponent } from 'src/app/roll-call-data/roll-call-data.component';
import { ScholarshipDataComponent } from 'src/app/scholarship-data/scholarship-data.component';
import { StudentDataByAcademicDetailComponent } from 'src/app/student-data-by-academic-detail/student-data-by-academic-detail.component';
import { StudentDataComponent } from '../../student-data/student-data.component';
import { GetRollCallDepartmentComponent } from 'src/app/get-roll-call-department/get-roll-call-department.component';
import { RollCallCollegeComponent } from 'src/app/roll-call-college/roll-call-college.component';
export const OfficeLayoutRoutes: Routes = [

  {path:'student-data',component:StudentDataComponent},
  {path: 'rollcall-data', component: RollCallDataComponent},
  {path:'scholarship-data',component:ScholarshipDataComponent},
  {path:'audit-finanace-data',component:AuditFinanaceDataComponent},
  {path: 'student-data-academic-detail', component: StudentDataByAcademicDetailComponent},
  {path:'student-list',component:RollCallCollegeComponent},
];





// import { CommitteeDetailsComponent } from 'src/app/committee-details/committee-details.component';
// import { RecognitionsAchievementsComponent } from 'src/app/recognitions-achievements/recognitions-achievements.component';
// import { StudentAwardComponent } from 'src/app/student-award/student-award.component';


// export const CommitteeLayoutRoutes: Routes = [

//   // {path:'committee-layout',component:CommitteeLayoutComponent},
//   {path:'student-award',component:StudentAwardComponent},
//   {path:'committee-details',component:CommitteeDetailsComponent},
//   {path:'recognition', component:RecognitionsAchievementsComponent}
//]
