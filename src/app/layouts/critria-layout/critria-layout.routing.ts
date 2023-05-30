import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Criterion1Component } from 'src/app/iqaccriteria/criterion1/criterion1.component';
import { Criteria1Component } from 'src/app/IqacAccess/Criteria/criteria1/criteria1.component';
import { Criterion2Component } from 'src/app/iqaccriteria/criterion2/criterion2.component';
import { Criteria2Component } from 'src/app/IqacAccess/Criteria/criteria2/criteria2.component';
import { Criteria3Component } from 'src/app/IqacAccess/Criteria/criteria3/criteria3.component';
import { Criteria4Component } from 'src/app/IqacAccess/Criteria/criteria4/criteria4.component';
import { Criteria5Component } from 'src/app/IqacAccess/Criteria/criteria5/criteria5.component';
import { Criteria6Component } from 'src/app/IqacAccess/Criteria/criteria6/criteria6.component';
import { Criteria7Component } from 'src/app/IqacAccess/Criteria/criteria7/criteria7.component';
import { CriteriaReportComponent } from 'src/app/criteria-report/criteria-report.component';
import { CriteriaQuantitativeReportComponent } from 'src/app/criteria-quantitative-report/criteria-quantitative-report.component';
export const CritrialayoutRoutes: Routes = [
    {path:'criteria-one',component:Criteria1Component},
    {path:'criteria-two',component:Criteria2Component},
    {path:'criteria-three',component:Criteria3Component},
    {path:'criteria-four',component:Criteria4Component},
    {path:'criteria-five',component:Criteria5Component},
    {path:'criteria-six',component:Criteria6Component},
    {path:'criteria-seven',component:Criteria7Component},
    {path:'criteria-report',component:CriteriaReportComponent},
    {path:'criteria-quantitative',component:CriteriaQuantitativeReportComponent},
  ];