import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnnualusagereportOnlineresourceComponent } from 'src/app/annualusagereport-onlineresource/annualusagereport-onlineresource.component';
import { BookbankComponent } from 'src/app/bookbank/bookbank.component';
// import { CertificateCourcesComponent } from 'src/app/certificate-cources/certificate-cources.component';
// import { CommitteeDetailsComponent } from 'src/app/committee-details/committee-details.component';
import { IlmsInformationComponent } from 'src/app/ilms-information/ilms-information.component';
import { JournalsubscriptionComponent } from 'src/app/journalsubscription/journalsubscription.component';
import { OnlineresourcesComponent } from 'src/app/onlineresources/onlineresources.component';
import { OnlineresourcesforVisualComponent } from 'src/app/onlineresourcesfor-visual/onlineresourcesfor-visual.component';
import { PurchasesbookComponent } from 'src/app/purchasesbook/purchasesbook.component';
import { RarebooksComponent } from 'src/app/rarebooks/rarebooks.component';
import { ScreenshotComponent } from 'src/app/screenshot/screenshot.component';
// import { IqacMeetingsComponent } from 'src/app/iqac-meetings/iqac-meetings.component';
// import { ListOfProgrammesComponent } from 'src/app/list-of-programmes/list-of-programmes.component';
// import { ProfessionalDevelopmentProgrammesComponent } from 'src/app/professional-development-programmes/professional-development-programmes.component';
// import { ProgramDetailsComponent } from 'src/app/program-details/program-details.component';
// import { RecognitionsAchievementsComponent } from 'src/app/recognitions-achievements/recognitions-achievements.component';
// import { ReportOfIqacActivitiesComponent } from 'src/app/report-of-iqac-activities/report-of-iqac-activities.component';
// import { StudentAwardComponent } from 'src/app/student-award/student-award.component';


export const librarylayoutRoutes: Routes = [



   {path:'ilms-info',component:IlmsInformationComponent},
   {path:'screen-shot',component:ScreenshotComponent},
    {path:'book-purchased',component:PurchasesbookComponent},
    {path:'journal-subscription',component:JournalsubscriptionComponent},
    {path:'online-resources',component:OnlineresourcesComponent},
    {path:'online-resources-visual',component:OnlineresourcesforVisualComponent},
    {path:'rare-books',component:RarebooksComponent},
    {path:'book-bank',component:BookbankComponent},
   {path:'annual-report-online',component:AnnualusagereportOnlineresourceComponent},
  // {path:'committee-details',component:CommitteeDetailsComponent},
  // {path:'recognition', component:RecognitionsAchievementsComponent}

]
