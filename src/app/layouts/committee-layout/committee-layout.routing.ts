import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommiteeMemberComponent } from 'src/app/commitee-member/commitee-member.component';
import { CommitteeDetailsComponent } from 'src/app/committee-details/committee-details.component';
import { RecognitionsAchievementsComponent } from 'src/app/recognitions-achievements/recognitions-achievements.component';
import { StudentAwardComponent } from 'src/app/student-award/student-award.component';


export const CommitteeLayoutRoutes: Routes = [

  // {path:'committee-layout',component:CommitteeLayoutComponent},
  {path:'commitee-member',component:CommiteeMemberComponent},
  {path:'student-award',component:StudentAwardComponent},
  {path:'committee-details',component:CommitteeDetailsComponent},
  {path:'recognition', component:RecognitionsAchievementsComponent},
  


]
