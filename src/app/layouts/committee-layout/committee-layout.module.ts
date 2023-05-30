import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material';
import { StudentAwardComponent } from 'src/app/student-award/student-award.component';
import { RecognitionsAchievementsComponent } from 'src/app/recognitions-achievements/recognitions-achievements.component';
import { CommitteeDetailsComponent } from 'src/app/committee-details/committee-details.component';
import { RouterModule } from '@angular/router';
import { CommitteeLayoutRoutes } from './committee-layout.routing';
import {MatInputModule} from '@angular/material/input'
import {MatSelectModule} from '@angular/material/select';
import { CommiteeMemberComponent } from 'src/app/commitee-member/commitee-member.component';

@NgModule({

  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(CommitteeLayoutRoutes),
    MatInputModule,
    MatSelectModule
  ],

  declarations: [

    StudentAwardComponent,
    RecognitionsAchievementsComponent,
    CommitteeDetailsComponent,
    // CommiteeMemberComponent,

  ],


  exports:[
    RouterModule
  ]
})
export class CommitteeLayoutModule {}
