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

export const DepartmentAwardRoutes: RouteInfo[] = [

  { path: '/department-event-layout/add-teachers', title: 'Add Teachers', icon: 'person_add', class:'', children:[]},
  // { path: '/department-event-layout/department-details', title: 'Department Details', icon: 'domain_add', class:'', children:[]},
  { path: '/department-event-layout/ug-courses', title: 'UG Courses', icon: 'school', class:'', children:[]},
  { path: '/department-event-layout/pg-courses', title: 'PG Courses', icon: 'school', class:'', children:[]},
  { path: '/department-event-layout/diploma-and-other-courses', title: 'Diploma/Certificate', icon: 'card_membership', class:'', children:[]},
  { path: '/department-event-layout/research-programs', title: 'Research Guides', icon: 'biotech', class:'', children:[]},
  { path: '/department-event-layout/admitted-students', title: 'Research Students', icon: 'person_add', class:'', children:[]},
  { path: '/department-event-layout/passout-students', title: 'Research Student Declared', icon: 'done_all', class:'', children:[]},
  { path: '/department-event-layout/report-of-event', title: 'Event',  icon: 'event', class: '' , children:[]},
  { path: '/department-event-layout/report-of-summer-winter-school', title: 'Capacity Building  / Skill Development Program', icon: 'school', class:'', children:[]},
  { path: '/department-event-layout/department-award', title: 'Results & Achievements', icon: 'emoji_events', class:'', children:[]},
  { path: '/department-event-layout/department-teacher', title: 'Teacher Information', icon: 'emoji_events', class:'', children:[]},
  { path: '/department-event-layout/program-outcome', title: 'PO-CO attainment', icon: 'emoji_events', class:'', children:[]},
  { path: '/department-event-layout/student-list', title: 'Roll call List', icon: 'upload', class:'', children:[]},
  { path: '/department-event-layout/best-practice', title: 'Best Practice', icon: 'upload', class:'', children:[]},
];

@Component({
  selector: 'app-department-event-layout',
  templateUrl: './department-event-layout.component.html',
  styleUrls: ['./department-event-layout.component.scss']
})
export class DepartmentEventLayoutComponent implements OnInit {
  name;
  college;
  association;
  constructor(
    private router: Router,
    public service: ServiceService
  ) { }
  menuItems: any[] = [] ;
  ngOnInit(): void {

    this.menuItems = DepartmentAwardRoutes;
    this.service.getUserWithUserId().subscribe((res:any) =>
    {
     this.college =  res.college.name;
      //console.log(this.college)
      console.log(this.college)
      this.association=res.college.association;
      this.name = res.hod.department.departmentName
      console.log(this.name);

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

}
