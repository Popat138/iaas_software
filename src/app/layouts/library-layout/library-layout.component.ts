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


export const LibrarylayoutRoutes: RouteInfo[] = [


  { path: '/library-layout/ilms-info', title: 'ILMS Information',  icon: 'holiday_village', class: '' , children:[]},
  { path: '/library-layout/screen-shot', title: 'ScreenShots',  icon: 'camera', class: '' , children:[]},
  { path: '/library-layout/book-purchased', title: 'Purchased Books',  icon: 'inventory', class: '' , children:[]},
  { path: '/library-layout/journal-subscription', title: 'Journals',  icon: 'subscriptions', class: '' , children:[]},
  { path: '/library-layout/online-resources', title: 'Online Resources',  icon: 'tap_and_play', class: '' , children:[]},
  { path: '/library-layout/online-resources-visual', title: 'Resources(Visually impared)',  icon: 'remove_red_eye', class: '' , children:[]},
  { path: '/library-layout/rare-books', title: 'Rare Books',  icon: 'folder_special', class: '' , children:[]},
  { path: '/library-layout/book-bank', title: 'Book Bank',  icon: 'account_balance', class: '' , children:[]},
  { path: '/library-layout/annual-report-online', title: 'Report Online Resources',  icon: 'summarize', class: '' , children:[]},
  // { path: '/iqac-layout/list-of-programmes', title: 'List of Programmes',  icon: 'auto_awesome_motion', class: '' , children:[]},
  // { path: '/iqac-layout/program-details', title: 'Program Details',  icon: 'settings_suggest', class: '' , children:[]},
  // { path: '/iqac-layout/certificate-cources', title: 'Certificate-Course',  icon: 'military_tech', class: '' , children:[]},
  // { path: '/iqac-layout/create-committee', title: 'Create-Committee',  icon: 'people', class: '' , children:[]},
  // { path: '/iqac-layout/iqac-meetings', title: 'IQAC Meetings',  icon: 'groups', class: '' , children:[]},
  // { path: '/iqac-layout/report-of-iqac-activities', title: 'IQAC Report',  icon: 'summarize', class: '' , children:[]},
  // { path: '/iqac-layout/professional-development-programmes', title: 'Development Programmes',  icon: 'developer_board', class: '' , children:[]},


];



@Component({
  selector: 'app-library-layout',
  templateUrl: './library-layout.component.html',
  styleUrls: ['./library-layout.component.scss']
})
export class LibraryLayoutComponent implements OnInit {

  college;
  association;
  constructor(
    public router: Router,
    public service: ServiceService
  ) { }

  menuItems: any[] = [] ;

  ngOnInit(): void {

    this.menuItems = LibrarylayoutRoutes;

 this.service.getUserWithUserId().subscribe((res:any) =>
 {
  this.college =  res.college.name;
  this.association=res.college.association;
   //console.log(this.college)
   console.log(this.college)

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

}
