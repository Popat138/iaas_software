import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material';
import { StudentAwardComponent } from 'src/app/student-award/student-award.component';
import { RecognitionsAchievementsComponent } from 'src/app/recognitions-achievements/recognitions-achievements.component';
import { CommitteeDetailsComponent } from 'src/app/committee-details/committee-details.component';
import { RouterModule } from '@angular/router';
import {MatInputModule} from '@angular/material/input'
import {MatSelectModule} from '@angular/material/select';
import { CritriaLayoutComponent } from './critria-layout.component';
import { CritrialayoutRoutes } from './critria-layout.routing';
import { Criterion1Component } from 'src/app/iqaccriteria/criterion1/criterion1.component';


@NgModule({
    declarations: [
      // CritriaLayoutComponent
    // Criterion1Component
    ],
    imports: [
      CommonModule,
      MatInputModule,
      MatSelectModule,
      MaterialModule,
      RouterModule.forChild(CritrialayoutRoutes),
    ]
  })
  export class CritriaLayoutModule { }
  