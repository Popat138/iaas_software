import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {MatInputModule} from '@angular/material/input'
import{ MaterialModule } from '../../material'
import {MatSelectModule} from '@angular/material/select';
import { librarylayoutRoutes } from './library-layout.routing';
import { IlmsInformationComponent } from 'src/app/ilms-information/ilms-information.component';
import { LibraryLayoutComponent } from './library-layout.component';
import { AnnualusagereportOnlineresourceComponent } from 'src/app/annualusagereport-onlineresource/annualusagereport-onlineresource.component';
import { BookbankComponent } from 'src/app/bookbank/bookbank.component';
import { JournalsubscriptionComponent } from 'src/app/journalsubscription/journalsubscription.component';
import { OnlineresourcesComponent } from 'src/app/onlineresources/onlineresources.component';
import { OnlineresourcesforVisualComponent } from 'src/app/onlineresourcesfor-visual/onlineresourcesfor-visual.component';
import { PurchasesbookComponent } from 'src/app/purchasesbook/purchasesbook.component';
import { RarebooksComponent } from 'src/app/rarebooks/rarebooks.component';
import { ScreenshotComponent } from 'src/app/screenshot/screenshot.component';
import { MatSort, MatSortHeader, MatSortModule } from '@angular/material/sort';



@NgModule({
  declarations: [

     IlmsInformationComponent,
     LibraryLayoutComponent,
     ScreenshotComponent,
     PurchasesbookComponent,
     JournalsubscriptionComponent,
     OnlineresourcesComponent,
     OnlineresourcesforVisualComponent,
     RarebooksComponent,
     BookbankComponent,
     AnnualusagereportOnlineresourceComponent,
    // CreateCommitteeComponent,
    // IqacLayoutComponent,
    // CertificateCourcesComponent,
    // ListOfProgrammesComponent,
    // ProgramDetailsComponent,
    // IqacMeetingsComponent,
    // ReportOfIqacActivitiesComponent,
    // ProfessionalDevelopmentProgrammesComponent

  ],

  imports: [

    CommonModule,
    MatInputModule,
    MatSelectModule,
    MaterialModule,
    MatInputModule,
    MatSelectModule,
    // MatSort,
    // MatSortHeader,
     MatSortModule,
    RouterModule.forChild(librarylayoutRoutes),

  ]
})

export class LibraryLayoutModule {}
