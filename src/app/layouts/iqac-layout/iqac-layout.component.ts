// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-iqac-layout',
//   templateUrl: './iqac-layout.component.html',
//   styleUrls: ['./iqac-layout.component.scss']
// })
// export class IqacLayoutComponent implements OnInit {

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

  export const IQAClayoutRoutes: RouteInfo[] = [

     { path: '/iqac-layout/create-stream', title: 'Create-Stream/Faculty',  icon: 'holiday_village', class: '' , children:[]},
     { path: '/iqac-layout/stream-details', title: 'Stream/Faculty Details',  icon: 'settings_suggest', class: '' , children:[]},
     { path: '/iqac-layout/create-department', title: 'Create-Department',  icon: 'holiday_village', class: '' , children:[]},
     { path: '/iqac-layout/list-of-programmes', title: 'List of Programmes',  icon: 'auto_awesome_motion', class: '' , children:[]},
     { path: '/iqac-layout/program-details', title: 'Program Details',  icon: 'settings_suggest', class: '' , children:[]},
     { path: '/iqac-layout/certificate-cources', title: 'Certificate-Course',  icon: 'military_tech', class: '' , children:[]},
     { path: '/iqac-layout/create-committee', title: 'Create-Committee',  icon: 'people', class: '' , children:[]},
     { path: '/iqac-layout/iqac-meetings', title: 'IQAC Meetings',  icon: 'groups', class: '' , children:[]},
     { path: '/iqac-layout/report-of-iqac-activities', title: 'IQAC Report',  icon: 'summarize', class: '' , children:[]},
     { path: '/iqac-layout/professional-development-programmes', title: 'Development Programmes',  icon: 'developer_board', class: '' , children:[]},
     { path: '/iqac-layout/create-criteria', title: 'Create-Criteria',  icon: 'holiday_village', class: '' , children:[]},
      // {path:'/iqac-layout/help', title: 'Instructions',  icon: 'help', class: '' , children:[]}

  ];

  export const IQAClayoutRoutes_dept: RouteInfo[] = [

    // {path:'list-of-events', component:ListOfEventsComponent},
    // {path:'ug-courses', component:ListOfUgCoursesComponent},
    // {path:'pg-courses', component:ListOfPgCoursesComponent},
    // {path:'ug-results', component:ListOfUgResultsComponent},
    // {path:'pg-results', component:ListOfPgResultsComponent},
    // {path:'competative', component:ListOfCompetativeExamsComponent},
    // {path:'higher-education', component:ListOfUgToPgComponent},
    // {path:'summer-winter', component:ListOfSummerWinterSchoolComponent},
    // {path:'research-students', component:ListOfResearchStudentsComponent},
    // {path:'research-students-declaerd', component:ListOfResearchStudentsDeclaredComponent},
    // {path:'placement', component:ListOfPlacementComponent},
    // {path:'research-program', component:ListOfResearchProgramComponent},
    // {path:'award', component:ListOfStudentAchievementsComponent}



    { path: '/iqac-layout/list-of-events', title: 'List Of Events',  icon: '', class: '' , children:[]},
    { path: '/iqac-layout/ug-courses', title: 'List Of Ug Courses',  icon: '', class: '' , children:[]},
    { path: '/iqac-layout/pg-courses', title: 'List Of Pg Courses',  icon: '', class: '' , children:[]},
    { path: '/iqac-layout/ug-results', title: 'List Of Ug Results',  icon: '', class: '' , children:[]},
    { path: '/iqac-layout/pg-results', title: 'List Of Pg Results',  icon: '', class: '' , children:[]},
    { path: '/iqac-layout/competative', title: 'List Of Competative Exams',  icon: '', class: '' , children:[]},
    { path: '/iqac-layout/higher-education', title: 'List Of Higer Education',  icon: '', class: '' , children:[]},
    { path: '/iqac-layout/summer-winter', title: 'List Of Capacity Building /    Skill Development programs',  icon: '', class: '' , children:[]},
    { path: '/iqac-layout/research-students', title: 'List Of Research Students',  icon: '', class: '' , children:[]},
    { path: '/iqac-layout/research-students-declaerd', title: 'List Of Research Students Declared',  icon: '', class: '' , children:[]},
    {path:'/iqac-layout/diploma-students',title:'Diploma/Certificate/Ad-on courses',icon:'',class:'',children:[]},
    { path: '/iqac-layout/placement', title: 'List Of Placement',  icon: '', class: '' , children:[]},
    { path: '/iqac-layout/research-program', title: 'List Of Research Program',  icon: '', class: '' , children:[]},
    { path: '/iqac-layout/student-award', title: 'List Of Award',  icon: '', class: '' , children:[]},
    { path: '/iqac-layout/internship',title:'List of Internships',icon:'',class:'',children:[]},
    { path: '/iqac-layout/best-practices',title:'Best Practices',icon:'',class:'',children:[]},
    



 ];
 export const IQAClayoutRoutes_teacher: RouteInfo[] = [

  // {path:'teacher-info',component:ListOfTeacherInfoComponent},
  // {path:'approval',component:ListOfApprovalComponent},
  // {path:'appointment',component:ListOfAppointmentComponent},
  // {path:'researchpaper',component:ListOfResearchPapersComponent},
  // {path:'bookpublication',component:ListOfBookPublicationsComponent},
  // {path:'conferencepaper',component:ListOfConferencePapersComponent},
  // {path:'conferenceattended',component:ListOfConferenceAttendedComponent},
  // {path:'projectwork',component:ListOfProjectWorkComponent},
  // {path:'fdp',component:ListOfFacultyDevelopmentProgramComponent},O

  { path: '/iqac-layout/teacher-info', title: 'List Of Tecachers',  icon: '', class: '' , children:[]},
  { path: '/iqac-layout/approval', title: 'List Of Approval',  icon: '', class: '' , children:[]},
  { path: '/iqac-layout/appointment', title: 'List Of Appointment',  icon: '', class: '' , children:[]},
  { path: '/iqac-layout/researchpaper', title: 'List Of Research Paper',  icon: '', class: '' , children:[]},
  { path: '/iqac-layout/bookpublication', title: 'List Of Books Published',  icon: '', class: '' , children:[]},
  { path: '/iqac-layout/conferencepaper', title: 'List Of Conference Paper',  icon: '', class: '' , children:[]},
  { path: '/iqac-layout/conferenceattended', title: 'List Of Conference Attended',  icon: '', class: '' , children:[]},
  { path: '/iqac-layout/projectwork', title: 'List Of Project Work',  icon: '', class: '' , children:[]},
  { path: '/iqac-layout/fdp', title: 'List Of Faculty Development Programme',  icon: '', class: '' , children:[]},
  {path:'/iqac-layout/researchproject',title:'Research Project',icon:'',class:'',children:[]},
  {path:'/iqac-layout/researchstudent',title:'Research Students',icon:'',class:'',children:[]},
  {path:'/iqac-layout/academicparticipation',title:'Academic Bodies Participation',icon:'',class:'',children:[]},
  {path:'/iqac-layout/teachingmethods',title:'Innovative Teaching Methods',icon:'',class:'',children:[]},
];

export const IQAClayoutRoutes_committee: RouteInfo[] = [


  // {path:'meeting',component:ListOfMeetingsComponent},
  // {path:'activityreport',component:ListOfActivityReportsComponent},

  { path: '/iqac-layout/meeting', title: 'List Of Meetings',  icon: '', class: '' , children:[]},
  { path: '/iqac-layout/activityreport', title: 'List Of Activity Report',  icon: '', class: '' , children:[]},
  { path: '/iqac-layout/award', title: 'List Of Student Awards',  icon: '', class: '' , children:[]},
  { path: '/iqac-layout/recognitions', title: 'List Of Awards/Recognitions',  icon: '', class: '' , children:[]},
 

];
export const IQAClayoutRoutes_office: RouteInfo[] = [


  { path: '/iqac-layout/scholarship', title: 'List Of Scholarship',  icon: '', class: '' , children:[]},

  { path: '/iqac-layout/auditfinance', title: 'List Of Audit/finance',  icon: '', class: '' , children:[]},


];
export const IQAClayoutRoutes_library: RouteInfo[] = [


  // {path:'details',component:ListOfDetailsIlmsSoftwareComponent},
  // {path:'bookbank',component:ListOfBookBankSchemeComponent},
  // {path:'purchase',component:ListOfPurchaseOfBooksComponent},
  // {path:'rarebooks',component:ListOfRareBooksComponent},
  // {path:'resourses',component:ListOfOnlineResourcesComponent},
  // {path:'resource-visually',component:ListOfResourcesVisuallyImparedComponent},
  // {path:'journals',component:ListOfSubscriptionOfJournalsComponent},
  // {path:'usage',component:ListOfUsage

  { path: '/iqac-layout/details', title: 'List Of ILMS Details',  icon: '', class: '' , children:[]},
  { path: '/iqac-layout/bookbank', title: 'List Of Book Bank',  icon: '', class: '' , children:[]},
  { path: '/iqac-layout/purchase', title: 'List Of Purchases',  icon: '', class: '' , children:[]},
  { path: '/iqac-layout/rarebooks', title: 'List Of Rare Books',  icon: '', class: '' , children:[]},
  { path: '/iqac-layout/resourses', title: 'List Of Resources',  icon: '', class: '' , children:[]},
  { path: '/iqac-layout/resource-visually', title: 'List Of Resources Visually Impared',  icon: '', class: '' , children:[]},
  { path: '/iqac-layout/journals', title: 'List Of Journals',  icon: '', class: '' , children:[]},
  { path: '/iqac-layout/usage', title: 'List Of Usage Report',  icon: '', class: '' , children:[]},



];
export const IQAClayoutRoutes_feedback: RouteInfo[] = [


  { path: '/iqac-layout/create-department', title: 'Create-Department',  icon: 'holiday_village', class: '' , children:[]},
  { path: '/iqac-layout/list-of-programmes', title: 'List of Programmes',  icon: 'auto_awesome_motion', class: '' , children:[]},



];
export const IQAClayoutRoutes_criteria: RouteInfo[] = [


  { path: '/iqac-layout/criteria1', title: 'Criteria 1',  icon: '', class: '' , children:[]},
  { path: '/iqac-layout/criteria2', title: 'Criteria 2',  icon: '', class: '' , children:[]},
  { path: '/iqac-layout/criteria3', title: 'Criteria 3',  icon: '', class: '' , children:[]},
  { path: '/iqac-layout/criteria4', title: 'Criteria 4',  icon: '', class: '' , children:[]},
  { path: '/iqac-layout/criteria5', title: 'Criteria 5',  icon: '', class: '' , children:[]},
  { path: '/iqac-layout/criteria6', title: 'Criteria 6',  icon: '', class: '' , children:[]},
  { path: '/iqac-layout/criteria7', title: 'Criteria 7',  icon: '', class: '' , children:[]},



];
export const IQAClayoutRoutes_help: RouteInfo[] = [
  {path:'/iqac-layout/help', title: 'HELP',  icon: 'help', class: '' , children:[]}

];

export const IQAClayoutRoutes_grade: RouteInfo[] = [
  // {path:'/iqac-layout/grade-sheet', title: 'Grade Calculation',  icon: 'help', class: '' , children:[]}

];

  

  @Component({
    selector: 'app-iqac-layout',
    templateUrl: './iqac-layout.component.html',
    styleUrls: ['./iqac-layout.component.scss']
  })
  export class IqacLayoutComponent implements OnInit {
    association;
    college;
    constructor(
      public router: Router,
      public service: ServiceService
    ) { }

    menuItems: any[] = [] ;
    menuItems_dept: any[] = [] ;
    menuItems_teacher: any[] = [] ;
    menuItems_committee: any[] = [] ;
    menuItems_office: any[] = [] ;
    menuItems_library: any[] = [] ;
    menuItems_feedback: any[] = [] ;
    menuItems_criteria: any[] = [] ;
    menuItems_help:any[]=[];
    menuItems_grade:any[]=[];
    
    ngOnInit(): void {

      this.menuItems = IQAClayoutRoutes;
      this.menuItems_dept = IQAClayoutRoutes_dept;
      this.menuItems_teacher = IQAClayoutRoutes_teacher;
      this.menuItems_committee = IQAClayoutRoutes_committee;
      this.menuItems_office = IQAClayoutRoutes_office;
      this.menuItems_library = IQAClayoutRoutes_library;
      this.menuItems_feedback = IQAClayoutRoutes_feedback;
      this.menuItems_criteria=IQAClayoutRoutes_criteria;
    this. menuItems_help=IQAClayoutRoutes_help;
    this. menuItems_grade=IQAClayoutRoutes_grade;
      this.service.getUserWithUserId().subscribe((res:any) =>
      {
       this.college =  res.college.name;
       this.association=res.college.association;
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

  }
