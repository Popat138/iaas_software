import { Component, OnInit } from '@angular/core';
import {RouterModule, Router } from '@angular/router';
import { ServiceService } from 'src/app/service.service';
import { Criteria1Component } from 'src/app/IqacAccess/Criteria/criteria1/criteria1.component';

  declare const $: any;
  declare interface RouteInfo {

      path: string;
      title: string;
      icon: string;
      class: string;

      children: {
        path: string;
        title: string;
        icon: string;
        class: string;

    }[]
  }
  export const CritrialayoutRoutes: RouteInfo[] = [
  { path: '/critria-layout/criteria-one', title: 'Criteria I',  icon: '', class: '' , children:[]},
  { path: '/critria-layout/criteria-two', title: 'Criteria II',  icon: '', class: '' , children:[]},
  { path: '/critria-layout/criteria-three', title: 'Criteria III',  icon: '', class: '' , children:[]},
  { path: '/critria-layout/criteria-four', title: 'Criteria IV',  icon: '', class: '' , children:[]},
  { path: '/critria-layout/criteria-five', title: 'Criteria V',  icon: '', class: '' , children:[]},
  { path: '/critria-layout/criteria-six', title: 'Criteria VI',  icon: '', class: '' , children:[]},
  { path: '/critria-layout/criteria-seven', title: 'Criteria VII',  icon: '', class: '' , children:[]},
  { path: '/critria-layout/criteria-report', title: 'Criteria VII',  icon: '', class: '' , children:[]},
  { path: '/critria-layout/criteria-quantitative', title: 'Criteria VII',  icon: '', class: '' , children:[]},
  // { path: '/critria-layout/criteria3', title: 'Criteria 3',  icon: '', class: '' , children:[]},
  // { path: '/critria-layout/criteria4', title: 'Criteria 4',  icon: '', class: '' , children:[]},
  // { path: '/critria-layout/criteria5', title: 'Criteria 5',  icon: '', class: '' , children:[]},
  // { path: '/critria-layout/criteria6', title: 'Criteria 6',  icon: '', class: '' , children:[]},
  // { path: '/critria-layout/criteria7', title: 'Criteria 7',  icon: '', class: '' , children:[]},
    ];


@Component({
  selector: 'app-critria-layout',
  templateUrl: './critria-layout.component.html',
  styleUrls: ['./critria-layout.component.scss']
})
export class CritriaLayoutComponent implements OnInit {
  association;
  college;
  username;
  criterion;
  showFiller = false;
  constructor(
    public router: Router,
      public service: ServiceService
  ) { }

  menuItems: any[] = [] ;
  ngOnInit(): void {
    
    // this.menuItems=CritrialayoutRoutes;
    this.service.getUserWithUserId().subscribe(res => {
      this.loadItems(res);
    }, (err: any) => {
      alert("Error try again later");
    });

    this.service.getUserWithUserId().subscribe((res:any) =>
      { console.log("THIS",res);
      console.log("NAME",res.firstName);
      console.log("NAME",res.crh.criteriaName);

       this.college =  res.college.name;
       this.association=res.college.association;
       this.username = res.firstName;
       this.criterion=res.crh.criteriaName;
        //console.log(this.college)
        console.log(this.college)
        console.log(this.association)

        

      })

      
  }

  logout(){
    // console.log('hell');
    this.router.navigateByUrl('');
  localStorage.clear();
  if(localStorage.length==0){
    //   console.log('0');
       this.router.navigate([""], { replaceUrl: true });
    //   console.log('f');
      // window.location.reload();


  }else{
    //   console.log('1');

  }
  }

  loadItems(user: any) {
    if (user.role.roleName == "Crh" && user.crh.criteriaName=="Criterion-I") {
      this.menuItems.push(
            {
        path: '/critria-layout/criteria-one',
        title: 'Criteria I : Input data',
        icon: '',
        class:'',
        children:[]
      },
      {
        path: '/critria-layout/criteria-report',
        title: 'Criteria I Qualitative',
        icon: '',
        class:'',
        children:[]
      },
      {
        path: '/critria-layout/criteria-quantitative',
        title: 'Criteria I Quantitative',
        icon: '',
        class:'',
        children:[]
      },
      )
    } else if (user.role.roleName == "Crh" && user.crh.criteriaName=="Criterion-II") {
      this.menuItems.push({
        path: '/critria-layout/criteria-two',
        title: 'Criteria II : Input data',
        icon: '',
        class:'',
        children:[]
      },
      {
        path: '/critria-layout/criteria-report',
        title: 'Criteria II Qualitative',
        icon: '',
        class:'',
        children:[]
      },
      {
        path: '/critria-layout/criteria-quantitative',
        title: 'Criteria II Quantitative',
        icon: '',
        class:'',
        children:[]
      },
      )
    } else if (user.role.roleName == "Crh" && user.crh.criteriaName=="Criterion-III") {
      this.menuItems.push({
        path: '/critria-layout/criteria-three',
        title: 'Criteria III: Input data',
        icon: '',
        class:'',
        children:[]
      },
      {
        path: '/critria-layout/criteria-report',
        title: 'Criteria III Qualitative',
        icon: '',
        class:'',
        children:[]
      },
      {
        path: '/critria-layout/criteria-quantitative',
        title: 'Criteria III Quantitative',
        icon: '',
        class:'',
        children:[]
      },)
    }else if (user.role.roleName == "Crh" && user.crh.criteriaName=="Criterion-IV") {
      this.menuItems.push({
        path: '/critria-layout/criteria-four',
        title: 'Criteria IV : Input data',
        icon: '',
        class:'',
        children:[]
      },
      {
        path: '/critria-layout/criteria-report',
        title: 'Criteria IV Qualitative',
        icon: '',
        class:'',
        children:[]
      },
      {
        path: '/critria-layout/criteria-quantitative',
        title: 'Criteria IV Quantitative',
        icon: '',
        class:'',
        children:[]
      },)
    }else if (user.role.roleName == "Crh" && user.crh.criteriaName=="Criterion-V") {
      this.menuItems.push({
        path: '/critria-layout/criteria-five',
        title: 'Criteria V: Input data',
        icon: '',
        class:'',
        children:[]
      },
      {
        path: '/critria-layout/criteria-report',
        title: 'Criteria V Qualitative',
        icon: '',
        class:'',
        children:[]
      },
      {
        path: '/critria-layout/criteria-quantitative',
        title: 'Criteria V Quantitative',
        icon: '',
        class:'',
        children:[]
      },)
    }else if (user.role.roleName == "Crh" && user.crh.criteriaName=="Criterion-VI") {
      this.menuItems.push({
        path: '/critria-layout/criteria-six',
        title: 'Criteria VI: Input data',
        icon: '',
        class:'',
        children:[]
      },
      {
        path: '/critria-layout/criteria-report',
        title: 'Criteria VI Qualitative',
        icon: '',
        class:'',
        children:[]
      },
      {
        path: '/critria-layout/criteria-quantitative',
        title: 'Criteria VI Quantitative',
        icon: '',
        class:'',
        children:[]
      },)
    }else if (user.role.roleName == "Crh" && user.crh.criteriaName=="Criterion-VII") {
      this.menuItems.push({
        path: '/critria-layout/criteria-seven/',
        title: 'Criteria VII: Input data',
        icon: '',
        class:'',
        children:[]
      },
      {
        path: '/critria-layout/criteria-report',
        title: 'Criteria VII Qualitative',
        icon: '',
        class:'',
        children:[]
      },{
        path: '/critria-layout/criteria-quantitative',
        title: 'Criteria VII Quantitative',
        icon: '',
        class:'',
        children:[]
      },)
    }else {
      this.router.navigateByUrl("")
    }
  }



}
