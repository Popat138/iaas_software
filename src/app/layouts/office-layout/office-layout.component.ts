import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/service.service';

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

export const OfficeLayoutRoutes: RouteInfo[] = [


  { path: '/office-layout/student-data', title: 'Student Data',  icon: 'description', class: '' , children:[]},
  // { path: '/office-layout/rollcall-data', title: 'Rollcall Data',  icon: 'description', class: '' , children:[]},
  { path: '/office-layout/scholarship-data', title: 'Scholarship Data', icon: 'school', class:'', children:[]},
  { path: '/office-layout/audit-finanace-data', title: 'Audit / Finance Data', icon: 'monetization_on', class:'', children:[]},
  {path: '/office-layout/student-data-academic-detail', title: 'Student data with academic detail', icon: 'school', class:'', children:[]},
  {path: '/office-layout/student-list', title: 'View Division wise Student', icon: 'school', class:'', children:[]}


];

@Component({
  selector: 'app-office-layout',
  templateUrl: './office-layout.component.html',
  styleUrls: ['./office-layout.component.scss']
})
export class OfficeLayoutComponent implements OnInit {

  // private user : any;
  college;
  association;
  constructor(
    private router : Router,
    private service : ServiceService
  ) { }
  menuItems: any[] = [] ;
  ngOnInit(): void {
    // this.menuItems = OfficeLayoutRoutes;
    this.service.getUserWithUserId().subscribe(res => {
      this.loadItems(res);
    }, (err: any) => {
      alert("Error try again later");
    });


 this.service.getUserWithUserId().subscribe((res:any) =>
 {
  this.college =  res.college.name;
  this.association=res.college.association;
   //console.log(this.college)
   console.log(this.college);
   console.log(this.association)

 })

  }

  logout(){
    this.router.navigateByUrl('');
    localStorage.clear();
    if(localStorage.length==0){
        this.router.navigate(
          [""],
          {
            replaceUrl: true
          });
    }
  }

  loadItems(user: any) {
    if (user.role.roleName == "OfficeClerk") {
      this.menuItems.push(
      //   {
      //   path: '/office-layout/student-data',
      //   title: 'Student Data',
      //   icon: 'description',
      //   class: '',
      //   children:[]
      // },
      {
        path: '/office-layout/student-data-academic-detail',
        title: 'Student data with academic detail',
        icon: 'school',
        class:'',
        children:[]
      },
      {
        path: '/office-layout/student-list',
        title: 'View Division wise Student',
        icon: 'school',
        class:'',
        children:[]
      }

      // {
      //   path: '/office-layout/rollcall-data',
      //   title: 'Rollcall Data',
      //   icon: 'description',
      //   class: '' ,
      //   children:[]
      // }
      )
    } else if (user.role.roleName == "ScholarshipClerk") {
      this.menuItems.push({
        path: '/office-layout/scholarship-data',
        title: 'Scholarship Data',
        icon: 'school',
        class:'',
        children:[]
      })
    } else if (user.role.roleName == "Accountant") {
      this.menuItems.push({
        path: '/office-layout/audit-finanace-data',
        title: 'Audit / Finance Data',
        icon: 'monetization_on',
        class:'',
        children:[]
      })
    } else {
      this.router.navigateByUrl("")
    }
  }

}
