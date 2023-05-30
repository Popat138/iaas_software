import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material';
import { StudentAwardComponent } from 'src/app/student-award/student-award.component';
import { RecognitionsAchievementsComponent } from 'src/app/recognitions-achievements/recognitions-achievements.component';
import { CommitteeDetailsComponent } from 'src/app/committee-details/committee-details.component';
import { RouterModule } from '@angular/router';
import {MatInputModule} from '@angular/material/input'
import {MatSelectModule} from '@angular/material/select';
import { OfficeLayoutComponent } from './office-layout.component';
import { OfficeLayoutRoutes} from './office-layout.routing'



@NgModule({
  declarations: [
    OfficeLayoutComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatSelectModule,
    MaterialModule,
    RouterModule.forChild(OfficeLayoutRoutes),
  ]
})
export class OfficeLayoutModule { }
