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
export const CommitteeLayoutRoutes: RouteInfo[] = [

 // {path: '/committee-layout/commitee-member', title: 'Committee Members', icon: 'star_rate', class:'', children:[]},
    { path: '/committee-layout/committee-details', title: 'Committee Details',  icon: 'group', class: '' , children:[]},
    { path: '/committee-layout/recognition', title: 'Awards/Recognition', icon: 'emoji_events', class:'', children:[]},
    { path: '/committee-layout/student-award', title: 'Student Achievements', icon: 'star_rate', class:'', children:[]},
    

  ];

@Component({
  selector: 'app-committee-layout',
  templateUrl: './committee-layout.component.html',
  styleUrls: ['./committee-layout.component.scss']
})
export class CommitteeLayoutComponent implements OnInit {
  menuItems: any[] = [] ;
  committeename;
  username;
  showFiller = true;
  college;
  association;
  constructor(
    private router: Router,
    public service: ServiceService
  ) { }

  ngOnInit(): void {

     this.menuItems = CommitteeLayoutRoutes;
     this.service.getUserWithUserId().subscribe((res:any) =>
     { console.log(res)
      this.college =  res.college.name;
      this.association=res.college.association;
       //console.log(this.college)
       console.log(res.firstName)
       this.username = res.firstName
      this.service.getData("/committee/user/" + res.userId).subscribe((result:any)=> {
        console.log(result);
        this.committeename = result.name
      })
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
