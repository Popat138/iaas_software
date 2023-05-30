
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
export const TeacherLayoutRoutes: RouteInfo[] = [

    { path: '/teacher-layout/teachingplan', title: 'Teaching-plan',  icon: 'edit_note', class: '' , children:[]},
    { path: '/teacher-layout/lesson-plan', title: 'Lesson Plans',  icon: 'edit_note', class: '' , children:[]},
   // { path: '/teacher-layout/roll-list', title: 'Roll Call List', icon: 'local_library', class:'', children:[]},
    { path: '/teacher-layout/student-list', title: 'Student List', icon: 'local_library', class:'', children:[]},
    { path: '/teacher-layout/attendance', title: 'Attendance', icon: 'person_add', class:'', children:[]},
   // { path: '/teacher-layout/i_assesment', title: 'Assesment', icon: 'assessment', class:'', children:[]},
    { path: '/teacher-layout/project', title: 'Project Work', icon: 'folder_special', class:'', children:[]},
    { path: '/teacher-layout/research', title: 'Research Student ', icon: 'inventory', class:'', children:[]},
    { path: '/teacher-layout/result', title: 'Result', icon: 'equalizer', class:'', children:[]},
    // { path: '/teacher-layout/program_o', title: 'Program-Outcome', icon: 'developer_board', class:'', children:[]},
    //{ path: '/teacher-layout/project', title: 'Internship Form', icon: 'perm_identity', class:'', children:[]},
    { path: '/teacher-layout/uploads', title: 'Uploads', icon: 'upload', class:'', children:[]},
    { path: '/teacher-layout/course-outcome-mapping', title: 'CO - PO Mapping', icon: 'upload', class:'', children:[]},
    { path: '/teacher-layout/i_assesment', title: 'Assesment', icon: 'assessment', class:'', children:[]},
    { path: '/teacher-layout/calculate-attainment-level', title: 'Calculate-attainment', icon: 'upload', class:'', children:[]},
    
    { path: '/teacher-layout/teach-feedback', title: 'Teacher Feedback', icon: 'upload', class:'', children:[]},
    { path: '/teacher-layout/teaching-methods', title: 'Teaching Methods', icon: 'upload', class:'', children:[]},

  ];

@Component({
  selector: 'app-teacher-layout',
  templateUrl: './teacher-layout.component.html',
  styleUrls: ['./teacher-layout.component.scss']
})
export class TeacherLayoutComponent implements OnInit {
  menuItems: any[] = [] ;
  teachername;
  dept_name;
  image;
  teacherphoto;
  showFiller = false;
  college;
  association;
  constructor(
    private router: Router,
    public service: ServiceService
  ) { }

  ngOnInit(): void {

     this.menuItems = TeacherLayoutRoutes;
     this.service.getUserWithUserId().subscribe((res:any) =>
     {
      this.college =  res.college.name;
      this.image=res.college.image;
      this.association=res.college.association;
       //console.log(this.college)
       console.log(this.college,res)
       this.teachername = res.firstName + " " +res.lastName
       console.log(this.teachername)
       this.teacherphoto=res.teacher.teacherPhoto
       console.log(this.teacherphoto)
       this.dept_name = res.teacher.department.departmentName
       console.log(this.dept_name)

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
