import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material';
import {MatInputModule} from '@angular/material/input'
import {MatSelectModule} from '@angular/material/select';
import { IQAClayoutRoutes } from './iqac-layout.routing'
import { CreateDepartmentComponent } from 'src/app/create-department/create-department.component';
import { IqacLayoutComponent, IQAClayoutRoutes_dept } from './iqac-layout.component';
import { CreateCommitteeComponent } from 'src/app/create-committee/create-committee.component';
import { CertificateCourcesComponent } from 'src/app/certificate-cources/certificate-cources.component';
import { ListOfProgrammesComponent } from 'src/app/list-of-programmes/list-of-programmes.component';
import { ProgramDetailsComponent } from 'src/app/program-details/program-details.component';
import { IqacMeetingsComponent } from 'src/app/iqac-meetings/iqac-meetings.component';
import { ReportOfIqacActivitiesComponent } from 'src/app/report-of-iqac-activities/report-of-iqac-activities.component';
import { ProfessionalDevelopmentProgrammesComponent } from 'src/app/professional-development-programmes/professional-development-programmes.component';
import { CreateCriteriaComponent } from 'src/app/create-criteria/create-criteria.component';


@NgModule({
  declarations: [

    CreateDepartmentComponent,
    CreateCommitteeComponent,
    IqacLayoutComponent,
    CertificateCourcesComponent,
    ListOfProgrammesComponent,
    ProgramDetailsComponent,
    IqacMeetingsComponent,
    ReportOfIqacActivitiesComponent,
    ProfessionalDevelopmentProgrammesComponent,
   

  ],

  imports: [

    CommonModule,
    MatInputModule,
    MatSelectModule,
    MaterialModule,
    MatInputModule,
    MatSelectModule,
    RouterModule.forChild(IQAClayoutRoutes),

  ]
})

export class IqacLayoutModule {}
