import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DownloadService } from 'src/app/download.service';
import { EditRecognitionsComponent } from 'src/app/edit/Committee/edit-recognitions/edit-recognitions.component';
import { EditPaasoutStudentsComponent } from 'src/app/edit/Department/edit-paasout-students/edit-paasout-students.component';
import { EditReportOfEventComponent } from 'src/app/edit/Department/edit-report-of-event/edit-report-of-event.component';
import { EditResearchProgramComponent } from 'src/app/edit/Department/edit-research-program/edit-research-program.component';
import { EditSummerWinterComponent } from 'src/app/edit/Department/edit-summer-winter/edit-summer-winter.component';
import { ServiceService } from 'src/app/service.service';
import { TestreportComponent } from 'src/app/testreport/testreport.component';
import { NewDetailsComponent } from 'src/app/View/new-details/new-details.component';
import { ViewResearchPaperComponent } from 'src/app/View/view-research-paper/view-research-paper.component';
import { NewStudentAwardComponent } from 'src/app/View/new-student-award/new-student-award.component';
import { MatPaginator } from '@angular/material/paginator';
import { EditCriteriaReportComponent } from 'src/app/edit/edit-criteria-report/edit-criteria-report.component';
import { ViewCriteriaReportsComponent } from 'src/app/View/view-criteria-reports/view-criteria-reports.component';
import { ViewCriteriaQuantitativeComponent } from 'src/app/View/view-criteria-quantitative/view-criteria-quantitative.component';
import { EditCriquantitativeReportComponent } from 'src/app/edit/edit-criquantitative-report/edit-criquantitative-report.component';
import { ViewActivityReportComponent } from 'src/app/View/view-activity-report/view-activity-report.component';
@Component({
  selector: 'app-criteria3',
  templateUrl: './criteria3.component.html',
  styleUrls: ['./criteria3.component.scss']
})
export class Criteria3Component implements OnInit {

  department: any = null;


  year_detail:any = null;
  committee: any = null;
  displayedColumns: string[] =['academic_year',
  'Department','title','duration','n_teachers','n_students','s_agency',
  //'photograph',
  'newsReport','participants',
 // 'edit','delete'
];
  displayedColumns_event: string[] =['academic_year','Department','title','duration','n_teachers','n_students','s_agency','newsReport', 'participants',
  //'edit','delete'
];
  displayedColumns_activity: string[] = ['year','committee',
  'title',
  'fromDate',
  'toDate',
  'details',
'participants'];
  displayedColumns_researchstudents: string[] = ['year','Programme','name_of_student','name_of_guide','date_of_registration','category','title',
 // 'edit','delete'
];
  displayedColumns_declared: string[] = ['year','Programme','name_of_student','name_of_guide','category','title_of_topic','date_of_registration','date_of_declaration','upload_cert',
 //, 'edit','delete'
];
  displayedColumns_conferenceattended: string[] = ['academic_year','teacher','level','type','workshop_title','course_place','duration','role','upload_cert',
 // 'edit','delete'
];
  displayedColumns_paperpresented: string[] = ['academic_year','teacher','level','type','workshop_title','paper_title','duration','upload_cert'];
  displayedColumns_researchpapers: string[] = ['academic_year','authors','type','paper_title','journal_name','volume', 'issn','view'];
  displayedColumns_book: string[] = ['academic_year','teacher','level','title_of_book','title_of_paper','title_of_proceeding','title_of_conferce','publisher','edition','upload_cert'];
  displayedColumns_award: string[] = ['a_year','name_of_award','awarding_agency', 'level', 'certificate',
 // 'edit','delete'
];
displayedColumns_awards: string[] = ['a_year','title','name_of_award','award_name','awarding_agency', 'level' ,'nature', 'certificate',
// 'edit','delete'
];

displayedColumns_rproject: string[] = ['academic_year','award_year','level','dept','title_of_book','authors','year_award','publisher','edition','agency','upload_cert'];
displayedColumns_qualN: string[] = [
  'year',
  'name',
  'type',
  'number',
  'title',
  'view',
  'edit',
  // 'delete'
    ];
    displayedColumns_quanT: string[] = [
      'year',
      'name',
      'type',
      'number',
      'title',
      'view',
      'edit',
      // 'delete'
        ];
  dataSource!:MatTableDataSource<Criteria3Component>;
  dataSource_events!:MatTableDataSource<Criteria3Component>;
  dataSource_activity!:MatTableDataSource<Criteria3Component>;
  dataSource_researchstudents!:MatTableDataSource<Criteria3Component>;
  dataSource_declared!:MatTableDataSource<Criteria3Component>;
  dataSource_conferenceattended!:MatTableDataSource<Criteria3Component>;
  dataSource_paperpresented!:MatTableDataSource<Criteria3Component>;
  dataSource_researchpapers!:MatTableDataSource<Criteria3Component>;
  dataSource_book!:MatTableDataSource<Criteria3Component>;
  dataSource_award!:MatTableDataSource<Criteria3Component>;
  dataSource_rproject:MatTableDataSource<Criteria3Component>;
  dataSource_awards!:MatTableDataSource<Criteria3Component>;
  dataSource_qualN!:MatTableDataSource<Criteria3Component>;
  dataSource_qual!:MatTableDataSource<Criteria3Component>;
  dataSource_quanT!:MatTableDataSource<Criteria3Component>;
  @ViewChild('paginator1') paginator1: MatPaginator;
  @ViewChild('paginator2') paginator2: MatPaginator;
  @ViewChild('paginator3') paginator3: MatPaginator;
  @ViewChild('paginator4') paginator4: MatPaginator;
  @ViewChild('paginator5') paginator5: MatPaginator;
  @ViewChild('paginator6') paginator6: MatPaginator;
  @ViewChild('paginator7') paginator7: MatPaginator;
  @ViewChild('paginator8') paginator8: MatPaginator;
  @ViewChild('paginator9') paginator9: MatPaginator;
  @ViewChild('paginator10') paginator10: MatPaginator;
  @ViewChild('paginator11') paginator11: MatPaginator;
  @ViewChild('paginator12') paginator12: MatPaginator;
  constructor(

    public dialog : MatDialog,
    public service : ServiceService,
    public router: Router,
    public download: DownloadService
  ) {



  }
  types: any[] = [
    {value: 'Reference_Book', title: 'Reference book', },
    {value: 'Text_Book', title: 'Text book', },
    {value: 'Chapter', title: 'Chapter', },
    {value: 'Proceeding', title: 'Proceeding', },
  ];
  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.fetchdata();
    this.fetchdata_event();
    this.fetchactivity();
    this.fetchresearchstudents();
    this.fetchData_conferenceattended();
    this.fetchData_paperpresented();
    this.fetch_declared();
    this.fetchData_researchpapers();
    this.fetchData_book();
    this.fetch_award();
    this.fetch_rprojects();
    this.fetch_awards();
    this.fetchCriQual();
    this.fetchCriQualN();
    this.fetchCriQuanT();

  }


///////////////////////////////////EXPORT EXCEL/////////////////////////////////
formatDate(date) {
  const options:any = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  };

  date = new Date(date).toLocaleString("en-IN", options);
  // console.log("gg", date);

  return date;
}

export_summer(){

  var fileName = "Report Of Summer/Winter School  Criteria 3";
  // let data = this.download_data;
  let data: any = null;
  if(this.dataSource.filter != ""){
    data = this.dataSource.filteredData;
  }else{
    data = this.dataSource.data;
  }
  data = data.map((e)=>{
      return {
        'Academic Year':e.year,
        'Department':e.department.departmentName,
'Title':e.title,
'Duration':this.formatDate(e.fromDate),
'Teacher Count':e.noOfTeachers,
'Students Count':e.noOfStudent,
'Supporting agency':e.supportingAgency,

      }
  });
  this.download.exportAsExcelFile(data,fileName);

}
export_event(){
  var fileName = "Report Of Event  Criteria 3";
  // let data = this.download_data;
  let data: any = null;
  if(this.dataSource_events.filter != ""){
    data = this.dataSource_events.filteredData;
  }else{
    data = this.dataSource_events.data;
  }
  data = data.map((e)=>{
      return {
        'Academic Year':e.year,
        'Department':e.department.departmentName,
'Title':e.title,
'Duration':this.formatDate(e.fromDate),
'Teacher Count':e.noOfTeachers,
'Students Count':e.noOfStudent,
'Supporting agency':e.supportingAgency,

      }
  });
  this.download.exportAsExcelFile(data,fileName);


}
export_activity(){
  var fileName = "Report Of Activity Criteria 3";
  // let data = this.download_data;
  let data: any = null;
  if(this.dataSource_activity.filter != ""){
    data = this.dataSource_activity.filteredData;
  }else{
    data = this.dataSource_activity.data;
  }
  data = data.map((e)=>{
      return {
'Year':e.year,
'Title':e.titleOfActivity,
'From Date':this.formatDate(e.fromDate),
'To Date':this.formatDate(e.toDate),
'Students Count':e.noOfStudent,
// 'Supporting agency':e.supportingAgency,

      }
  });
  this.download.exportAsExcelFile(data,fileName);

}

export_researchstudents(){
  var fileName = "Report Of Research Students";
  // let data = this.download_data;
  let data: any = null;
  if(this.dataSource_researchstudents.filter != ""){
    data = this.dataSource_researchstudents.filteredData;
  }else{
    data = this.dataSource_researchstudents.data;
  }
  data = data.map((e)=>{
      return {
'Year':e.year,
'Programme':e.program.programName,
'Name of Student'	:e.guide.guideName,
'Name of Guide	':e.studentName,
'Date of Registration':this.formatDate(e.registrationDate),
'Title of Research Work':e.topicTitle,
'Category':e.category,

// 'Supporting agency':e.supportingAgency,

      }
  });
  this.download.exportAsExcelFile(data,fileName);

}
export_studentsdeclared(){
  var fileName = "Report Of Research Students Declared";
  // let data = this.download_data;
  let data: any = null;
  if(this.dataSource_declared.filter != ""){
    data = this.dataSource_declared.filteredData;
  }else{
    data = this.dataSource_declared.data;
  }
  data = data.map((e)=>{
      return {
'year':e.year,
'Programme':e.program.programName,
'Name of guide'	:e.guide.guideName,
'Name of Student	':e.studentName,
'Category':e.category,
'Title':e.topicTitle,
'Date of Registration':this.formatDate(e.registrationDate),
'Date of Declaration':this.formatDate(e.declarationDate)

// 'Supporting agency':e.supportingAgency,

      }
  });
  this.download.exportAsExcelFile(data,fileName);
}
export_conferenceattended(){
  var fileName = "Report Of Conference Attended";
  // let data = this.download_data;
  let data: any = null;
  if(this.dataSource_conferenceattended.filter != ""){
    data = this.dataSource_conferenceattended.filteredData;
  }else{
    data = this.dataSource_conferenceattended.data;
  }
  data = data.map((e)=>{
      return {
'Academic Year':e.academicYear,
'Name of the teacher':e.user.firstName + " " + e.user.middleName +" "+e.user.lastName,
'Level':e.facultySeminarLevel,
'Type'	:e.facultySeminarType,
'Conferences/workshops Title':e.title,
'Place':e.place,
'Duration':this.formatDate(e.startDate) +" To "+ this.formatDate(e.endDate),
'Role':e.role
// 'Supporting agency':e.supportingAgency,

      }
  });
  this.download.exportAsExcelFile(data,fileName);


}
export_paperspresented(){

  var fileName = "Report Of Papers Presented";
  // let data = this.download_data;
  let data: any = null;
  if(this.dataSource_paperpresented.filter != ""){
    data = this.dataSource_paperpresented.filteredData;
  }else{
    data = this.dataSource_paperpresented.data;
  }
  data = data.map((e)=>{
      return {
'Academic Year':e.academicYear,
'Name of the teacher':e.user.firstName + " " + e.user.middleName +" "+e.user.lastName,
'Level':e.facultySeminarLevel,
'Type'	:e.facultySeminarType,
'Conferences/workshops Title':e.title,
'Paper Title':e.titleOfPaper,
'Duration':this.formatDate(e.startDate) +" To "+ this.formatDate(e.endDate),
// 'Supporting agency':e.supportingAgency,

      }
  });
  this.download.exportAsExcelFile(data,fileName);

}
export_researchpaper(){

  var fileName = "Report Of Research Paper";
  // let data = this.download_data;
  let data: any = null;
  if(this.dataSource_researchpapers.filter != ""){
    data = this.dataSource_researchpapers.filteredData;
  }else{
    data = this.dataSource_researchpapers.data;
  }
  data = data.map((e)=>{
      return {
'Academic Year':e.academicYear,
'Authors':e.author,
'Type'	:e.researchPublicationType,
'Paper Title':e.titleOfPaper,
'Journal Name':e.journalName,
'Volume, Issue & Page No.':e.volume + "("+e.issue+")"+","+e.pageNo,
'ISSN':e.issnNo,
'Year of Publication':e.year,
'Resear Paper Link':e.linkOfResearchPaper,
'Is listed in UGC CAre/Scopus/':e.approvedByUGS,
//'Duration':this.formatDate(e.startDate) +" To "+ this.formatDate(e.endDate),
// 'Supporting agency':e.supportingAgency,

      }
  });
  this.download.exportAsExcelFile(data,fileName);

}
export_books(){
  var fileName = "Report Of Book Publication";
  // let data = this.download_data;
  let data: any = null;
  if(this.dataSource_book.filter != ""){
    data = this.dataSource_book.filteredData;
  }else{
    data = this.dataSource_book.data;
  }
  data = data.map((e)=>{
    console.log("e",e)
    let i = this.types.findIndex((data)=>e.bookType===data.value)
    console.log("eii",i)
      return {
'Academic Year':e.academicYear,
'Name of the teacher':e.user.firstName + " " + e.user.middleName +" "+e.user.lastName,
'Level'	: i!==-1?this.types[i].title:"",
'Title of the book/chapters published':e.titleOfBook,
'Title of Paper':e.procPaper,
'Title of the proceedings of the conference':e.procTitle,
'Name of the conference':e.procConference,
'National / International':e.publicationType,
'Year of publication':e.yearOfPublication,
'ISBN/ISSN No.':e.edition,
'Affiliating Institute at the time of publication ':e.afflInstitute,
'Name of the publisher':e.publishers,


//'Volume':e.volume,
//'Duration':this.formatDate(e.startDate) +" To "+ this.formatDate(e.endDate),
// 'Supporting agency':e.supportingAgency,

      }
  });
  this.download.exportAsExcelFile(data,fileName);
}
export_award(){

  var fileName = "Report Of Award / Recognition";
  // let data = this.download_data;
  let data: any = null;
  if(this.dataSource_award.filter != ""){
    data = this.dataSource_award.filteredData;
  }else{
    data = this.dataSource_award.data;
  }
  data = data.map((e)=>{
      return {
'Year':e.year,
'Name of Award'	:e.nameOfAward,
'Awarding Agency':e.awardingAgency,
'Level':e.achievementLevel,
// 'Publisher':e.publishers,
// 'Edition':e.edition,
//'Volume':e.volume,
//'Duration':this.formatDate(e.startDate) +" To "+ this.formatDate(e.endDate),
// 'Supporting agency':e.supportingAgency,

      }
  });
  this.download.exportAsExcelFile(data,fileName);

}

export_awards(){

  var fileName = "Report of Award ";
  // let data = this.download_data;
  let data: any = null;

  if(this.dataSource_awards.filter != ""){
    data = this.dataSource_awards.filteredData;
  }else{
    data = this.dataSource_awards.data;
  }
  data = data.map((e)=>{
      return {
'Year':e.year,
'Title':e.title,
'Name of Student	':e.nameOfStudent,
'Award Name':e.awardName,
'Awarding agency':e.awardingAgency,
'Level':e.achievementLevel,
'Nature of Award':e.achievementNature.replace("_" , " "),

// 'Name of Institute':e.nameOfInstitute
      }
  });
  this.download.exportAsExcelFile(data,fileName);

}

export_rproject(){
  var fileName = "List of Faculty research Projects";
  // let data = this.download_data;
  let data: any = null;
  if(this.dataSource_rproject.filter != ""){
    data = this.dataSource_rproject.filteredData;
  }else{
    data = this.dataSource_rproject.data;
  }
  data = data.map((e)=>{
      return {
'Academic Year':e.academicYear,
'Year of Award':e.yearOfPublication,
'Project'	:e.projectType,
'Department of Investigator':e.departments.departmentName,
'Title of Project':e.titleOfBook,
'Name of Principal/Co-investigator':e.author,
'Awarding Agency':e.publishers,
'Amount Sanctioned':e.edition,
'Type of Agency':e.agencyType,
//'Agency Type':
// 'Publisher':e.publishers,
// 'Edition':e.edition,
//'Volume':e.volume,
//'Duration':this.formatDate(e.startDate) +" To "+ this.formatDate(e.endDate),
// 'Supporting agency':e.supportingAgency,

      }
  });
  this.download.exportAsExcelFile(data,fileName);



}




/////////////////////for Summer winter school ////////////////

  edit(row){
    const dialogRef = this.dialog.open(EditSummerWinterComponent,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data: row});
  }

  delete(row){ }


  applyFilter(event: any) {
    this.dataSource.filterPredicate = (data: any, filter) => {
      const dataStr =JSON.stringify(data).toLowerCase();
      return dataStr.indexOf(filter) != -1;
    }
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  fetchdata(){

    this.service.getData("/school-report/criteriaName/criteria3").subscribe((res: any) =>  {
      const getPos:any = this.compute(res);
      getPos.then((response: any) => {
                this.dataSource = new MatTableDataSource(
                          JSON.parse(
                                    JSON.stringify(
                                              response
                                    )
                          )

                );
                console.table(this.dataSource.data)

                this.dataSource.paginator = this.paginator1;
            // this.dataSource.sort = this.sort;
      });
    }, (err: any) => {
      alert("User detail not available!");
      this.router.navigateByUrl("");
    });

  }
  async compute(data: any) {
    return new Promise(resolve => {
              for (var i = 0; i < data.length; i++) {
                        data[i].pos = i + 1;
                        if (i == data.length - 1) {
                                  resolve(data);
                        }
              }
    });
}

viewreport(element){
  console.log(element)
  const dialogRef = this.dialog.open(ViewActivityReportComponent ,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data:element});
  dialogRef.afterOpened().subscribe((result : any) => {
    //  result = this.test;
    //  console.log(result)
  });


}


///////////////////////for events ///////////////////////////////////

edit_event(row){
  const dialogRef = this.dialog.open(EditReportOfEventComponent,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data: row});
}


delete_event(row){
//   console.log(row);
//   if(confirm("Do you want to delete this user ?")) {


//     Swal.fire({
//       title: 'Are you sure?',
//       text: "You won't be able to revert this!",
//       icon: 'info',
//       showCancelButton: true,
//       confirmButtonColor: '#3085d6',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'Yes, delete it!'
//     }).then((result) => {
//       if (result.isConfirmed) {
//     this.service.deleteData('/supplier/'+row['id']).subscribe(response => {
//       location.reload();
//   },err => {
//     // console.log(err);
//     if(err.status == 409){
//       Swal.fire({
//         title: "Supplier cannot be deleted",
//         text: "Stock In entry has been made against this supplier",
//         icon: 'warning'
//       });
//     }
//   });
// }
// });


}

applyFilter_event(event: any) {
  this.dataSource_events.filterPredicate = (data: any, filter) => {
    const dataStr =JSON.stringify(data).toLowerCase();
    return dataStr.indexOf(filter) != -1;
  }
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource_events.filter = filterValue.trim().toLowerCase();
  if (this.dataSource_events.paginator) {
    this.dataSource_events.paginator.firstPage();
  }
}


viewactivity1(element){
  console.log(element)
  const dialogRef = this.dialog.open(ViewActivityReportComponent ,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data:element});
  dialogRef.afterOpened().subscribe((result : any) => {
    //  result = this.test;
    //  console.log(result)
  });


}

fetchdata_event(){

  this.service.getData("/event-report/criteriaName/criteria3").subscribe((reports: any) => {
    const getPos:any = this.compute_event(reports);
    getPos.then((response: any) => {
              this.dataSource_events = new MatTableDataSource(
                        JSON.parse(
                                  JSON.stringify(
                                            response
                                  )
                        )

              );
              console.table(this.dataSource_events.data)

              this.dataSource_events.paginator = this.paginator2;
          // this.dataSource.sort = this.sort;
    });
    });

}
async compute_event(data: any) {
  return new Promise(resolve => {
            for (var i = 0; i < data.length; i++) {
                      data[i].pos = i + 1;
                      if (i == data.length - 1) {
                                resolve(data);
                      }
            }
  });
}

//////////////////////////////FOR ACTIVITY REPORT ////////////////////////////


viewactivity(element){

  console.log(element)
  const dialogRef = this.dialog.open(ViewActivityReportComponent ,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data:element});
  dialogRef.afterOpened().subscribe((result : any) => {
    //  result = this.test;
    //  console.log(result)
  });


}

editactivity(row){
 // const dialogRef = this.dialog.open(EditCommitteeDetailsComponent,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data: row});
}


deleteactivity(row){
//   console.log(row);
//   if(confirm("Do you want to delete this user ?")) {


//     Swal.fire({
//       title: 'Are you sure?',
//       text: "You won't be able to revert this!",
//       icon: 'info',
//       showCancelButton: true,
//       confirmButtonColor: '#3085d6',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'Yes, delete it!'
//     }).then((result) => {
//       if (result.isConfirmed) {
//     this.service.deleteData('/supplier/'+row['id']).subscribe(response => {
//       location.reload();
//   },err => {
//     // console.log(err);
//     if(err.status == 409){
//       Swal.fire({
//         title: "Supplier cannot be deleted",
//         text: "Stock In entry has been made against this supplier",
//         icon: 'warning'
//       });
//     }
//   });
// }
// });


}

fetchactivity() {
  this.service.getData("/activity-report/criteriaName/criteria3").subscribe((res: any) => {
    const getPos:any = this.compute_activity(res);
    getPos.then((response: any) => {
              this.dataSource_activity = new MatTableDataSource(
                        JSON.parse(
                                  JSON.stringify(
                                            response
                                  )
                        )

              );console.table(this.dataSource_activity.data)

              this.dataSource_activity.paginator = this.paginator3;
          //  this.dataSource.sort = this.sort;
    });
  }, (err: any) => {
    console.warn("No committee available!!");
  })
}

async compute_activity(data: any) {
  return new Promise(resolve => {
            for (var i = 0; i < data.length; i++) {
                      data[i].pos = i + 1;
                      if (i == data.length - 1) {
                                resolve(data);
                      }
            }
  });
}

applyFilter_activity(event: any) {
  this.dataSource_activity.filterPredicate = (data: any, filter) => {
    const dataStr =JSON.stringify(data).toLowerCase();
    return dataStr.indexOf(filter) != -1;
  }
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource_activity.filter = filterValue.trim().toLowerCase();
  if (this.dataSource_activity.paginator) {
    this.dataSource_activity.paginator.firstPage();
  }
}




////////////////////////////// For REsearch students /////////////////////////

applyFilter_researchstudents(event: any) {
  this.dataSource_researchstudents.filterPredicate = (data: any, filter) => {
    const dataStr =JSON.stringify(data).toLowerCase();
    return dataStr.indexOf(filter) != -1;
  }
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource_researchstudents.filter = filterValue.trim().toLowerCase();
  if (this.dataSource_researchstudents.paginator) {
    this.dataSource_researchstudents.paginator.firstPage();
  }
}


fetchresearchstudents() {
  this.service.getUserWithUserId().subscribe((user:any)=> {
    this.service.getData("/admitted-research-student/college/"+user.college.id).subscribe((res: any) => {
      const getPos:any = this.compute_researchstudents(res);
      getPos.then((response: any) => {
                this.dataSource_researchstudents = new MatTableDataSource(
                          JSON.parse(
                                    JSON.stringify(
                                              response
                                    )
                          )

                );console.table(this.dataSource_researchstudents.data)

                this.dataSource_researchstudents.paginator = this.paginator4;
            //  this.dataSource.sort = this.sort;
      });
    }, (err: any) => {
      console.warn("No committee available!!");
    })
  }, (err: any) => {
    console.warn(err);
  })
}

edit_researchstudents(row){
  const dialogRef = this.dialog.open(EditResearchProgramComponent,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data: row});
}


delete_researchstudents(row){
  // console.log(row);
  // if(confirm("Do you want to delete this user ?")) {


//     Swal.fire({
//       title: 'Are you sure?',
//       text: "You won't be able to revert this!",
//       icon: 'info',
//       showCancelButton: true,
//       confirmButtonColor: '#3085d6',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'Yes, delete it!'
//     }).then((result) => {
//       if (result.isConfirmed) {
//     this.service.deleteData('/supplier/'+row['id']).subscribe(response => {
//       location.reload();
//   },err => {
//     // console.log(err);
//     if(err.status == 409){
//       Swal.fire({
//         title: "Supplier cannot be deleted",
//         text: "Stock In entry has been made against this supplier",
//         icon: 'warning'
//       });
//     }
//   });
// }
// });


}



async compute_researchstudents(data: any) {
  return new Promise(resolve => {
            for (var i = 0; i < data.length; i++) {
                      data[i].pos = i + 1;
                      if (i == data.length - 1) {
                                resolve(data);
                      }
            }
  });
}



////////////////////////////// For REsearch students Declared /////////////////////////

edit_declared(row){
  const dialogRef = this.dialog.open(EditPaasoutStudentsComponent,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data: row});
}


delete_declared(row){
  // console.log(row);
  // if(confirm("Do you want to delete this user ?")) {


//     Swal.fire({
//       title: 'Are you sure?',
//       text: "You won't be able to revert this!",
//       icon: 'info',
//       showCancelButton: true,
//       confirmButtonColor: '#3085d6',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'Yes, delete it!'
//     }).then((result) => {
//       if (result.isConfirmed) {
//     this.service.deleteData('/supplier/'+row['id']).subscribe(response => {
//       location.reload();
//   },err => {
//     // console.log(err);
//     if(err.status == 409){
//       Swal.fire({
//         title: "Supplier cannot be deleted",
//         text: "Stock In entry has been made against this supplier",
//         icon: 'warning'
//       });
//     }
//   });
// }
// });


}



applyFilter_declared(event: any) {
  this.dataSource_declared.filterPredicate = (data: any, filter) => {
    const dataStr =JSON.stringify(data).toLowerCase();
    return dataStr.indexOf(filter) != -1;
  }
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource_declared.filter = filterValue.trim().toLowerCase();
  if (this.dataSource_declared.paginator) {
    this.dataSource_declared.paginator.firstPage();
  }
}


fetch_declared() {
  this.service.getUserWithUserId().subscribe((user:any) => {
      this.service.getData("/admitted-research-declaration/college/"+user.college.id).subscribe((res: any) => {
        const getPos:any = this.compute_declared(res);
        getPos.then((response: any) => {
                  this.dataSource_declared = new MatTableDataSource(
                            JSON.parse(
                                      JSON.stringify(
                                                response
                                      )
                            )

                  );console.table(this.dataSource_declared.data)

                  this.dataSource_declared.paginator = this.paginator5;
              //  this.dataSource.sort = this.sort;
        });
      }, (err: any) => {
        console.warn("No committee available!!");
      })
    }, (err:any) => {
      console.log(err);
    })
}

async compute_declared(data: any) {
  return new Promise(resolve => {
            for (var i = 0; i < data.length; i++) {
                      data[i].pos = i + 1;
                      if (i == data.length - 1) {
                                resolve(data);
                      }
            }
  });
}

// viewAchievements(){
//   const dialogRef = this.dialog.open(NewDetailsComponent ,{width: "70%",height: "86vh",panelClass: 'full-width-dialog'});
// }


////////////////////////////// Conference  /////////////////////////


fetchData_conferenceattended() {
  this.service.getUserWithUserId().subscribe((user: any) => {
    this.service.getData("/faculty-seminar/college/" + user.college.id).subscribe((res: any) => {
      console.log(res);
      res.forEach((element,key) => {
         this.service.getData("/user/teacher/"+element.teacher?.teacherId).subscribe((data:any)=>{

          res[key].user=data
          if(!(key < res.length-1)) {
            this.processconferenceattended(res);
          }           })
      });
    }, (err: any) => {
      alert(err.error?.message);
    });

  }, (err: any) => {
    console.warn(err);
  });
}
processconferenceattended(data) {
  const getPos:any = this.compute_conferenceattended(data);
      getPos.then((response: any) => {
        this.dataSource_conferenceattended = new MatTableDataSource(
          response
          // JSON.parse(
          //   JSON.stringify(response)
          // )
        );
        console.log(this.dataSource_conferenceattended.data)
                this.dataSource_conferenceattended.paginator = this.paginator6;
            //  this.dataSource.sort = this.sort;
      });
}
async compute_conferenceattended(data: any) {
  return new Promise(resolve => {
            for (var i = 0; i < data.length; i++) {
                      data[i].pos = i + 1;
                      if (i == data.length - 1) {
                                resolve(data);
                      }
            }
  });
}

edit_conferenceattended(element){}
delete_conferenceattended(element){}

applyFilter_conferenceattended(event: any) {
  this.dataSource_conferenceattended.filterPredicate = (data: any, filter) => {
    const dataStr =JSON.stringify(data).toLowerCase();
    return dataStr.indexOf(filter) != -1;
  }
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource_conferenceattended.filter = filterValue.trim().toLowerCase();
  if (this.dataSource_conferenceattended.paginator) {
    this.dataSource_conferenceattended.paginator.firstPage();
  }
}

////////////////////////////// Paper presented /////////////////////////

fetchData_paperpresented() {
  this.service.getUserWithUserId().subscribe((user: any) => {
    this.service.getData("/paper-presented/college/" + user.college.id).subscribe((res: any) => {
      console.log(res);
      res.forEach((element,key) => {
         this.service.getData("/user/teacher/"+element.teacher.teacherId).subscribe((data:any)=>{

          res[key].user=data
          if(!(key < res.length-1)) {
            this.processpaperpresented(res);
          }           })
      });
    }, (err: any) => {
      alert(err.error?.message);
    });

  }, (err: any) => {
    console.warn(err);
  });
}
processpaperpresented(data) {
  const getPos:any = this.compute(data);
      getPos.then((response: any) => {
        this.dataSource_paperpresented = new MatTableDataSource(
          response
          // JSON.parse(
          //   JSON.stringify(response)
          // )
        );
        console.log(this.dataSource_paperpresented.data)
                this.dataSource_paperpresented.paginator = this.paginator7;
      });
}
async compute_paperpresented(data: any) {
  return new Promise(resolve => {
            for (var i = 0; i < data.length; i++) {
                      data[i].pos = i + 1;
                      if (i == data.length - 1) {
                                resolve(data);
                      }
            }
  });
}

applyFilter_paperpresented(event: any) {
  this.dataSource_paperpresented.filterPredicate = (data: any, filter) => {
    const dataStr =JSON.stringify(data).toLowerCase();
    return dataStr.indexOf(filter) != -1;
  }
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource_paperpresented.filter = filterValue.trim().toLowerCase();
  if (this.dataSource_paperpresented.paginator) {
    this.dataSource_paperpresented.paginator.firstPage();
  }
}


//////////////////////////////Research Paper /////////////////////////
viewDetail_researchpapers(element : any) {
  const dialogRef1 = this.dialog.open(ViewResearchPaperComponent ,{width: "85%",height: "86vh",panelClass: 'full-width-dialog', data: element});
  dialogRef1.afterClosed().subscribe((result : any) => {
     this.fetchData_researchpapers();
  });
}

fetchData_researchpapers() {
  this.service.getUserWithUserId().subscribe((user: any) => {
    this.service.getData("/research-publication/college/" + user.college.id).subscribe((res: any) => {
      console.log(res);
      const getPos:any = this.compute(res);
      getPos.then((response: any) => {
        this.dataSource_researchpapers = new MatTableDataSource(
          JSON.parse(
            JSON.stringify(response)
          )
        );
        console.log(this.dataSource_researchpapers.data)
                this.dataSource_researchpapers.paginator = this.paginator8;
            //  this.dataSource.sort = this.sort;
      });
    }, (err: any) => {
      alert(err.error?.message);
    });

  }, (err: any) => {
    console.warn(err);
  });
}

async compute_researchpapers(data: any) {
  return new Promise(resolve => {
            for (var i = 0; i < data.length; i++) {
                      data[i].pos = i + 1;
                      if (i == data.length - 1) {
                                resolve(data);
                      }
            }
  });
}

applyFilter_researchpapers(event: any) {
  this.dataSource_researchpapers.filterPredicate = (data: any, filter) => {
    const dataStr =JSON.stringify(data).toLowerCase();
    return dataStr.indexOf(filter) != -1;
  }
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource_researchpapers.filter = filterValue.trim().toLowerCase();
  if (this.dataSource_researchpapers.paginator) {
    this.dataSource_researchpapers.paginator.firstPage();
  }
}


////////////////////////////// Books publication /////////////////////////


fetchData_book() {
  this.service.getUserWithUserId().subscribe((user: any) => {
    this.service.getData("/book-publication/college/" + user.college.id).subscribe((res: any) => {
      console.log(res);
      res.forEach((element,key) => {
        this.service.getData("/user/teacher/"+element.teacher.teacherId).subscribe((data:any)=>{

         res[key].user=data
         if(!(key < res.length-1)) {
           this.process_book(res);
         }           })
     });
     console.log("final teachet",res)
    }, (err: any) => {
      alert(err.error?.message);
    });

  }, (err: any) => {
    console.warn(err);
  });
}

process_book(data) {
  const getPos:any = this.compute_book(data);
      getPos.then((response: any) => {
        this.dataSource_book = new MatTableDataSource(
          JSON.parse(
            JSON.stringify(response)
          )
        );
        console.log(this.dataSource_book.data)
                this.dataSource_book.paginator = this.paginator9;
            //  this.dataSource.sort = this.sort;
      });
}

async compute_book(data: any) {
  return new Promise(resolve => {
            for (var i = 0; i < data.length; i++) {
                      data[i].pos = i + 1;
                      if (i == data.length - 1) {
                                resolve(data);
                      }
            }
  });
}

applyFilter_book(event: any) {
  this.dataSource_book.filterPredicate = (data: any, filter) => {
    const dataStr =JSON.stringify(data).toLowerCase();
    return dataStr.indexOf(filter) != -1;
  }
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource_book.filter = filterValue.trim().toLowerCase();
  if (this.dataSource_book.paginator) {
    this.dataSource_book.paginator.firstPage();
  }
}


////////////////////////////// Award / Recognition ( commmittee ) /////////////////////////



edit_award(row){
  const dialogRef = this.dialog.open(EditRecognitionsComponent,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data: row});
}


delete_award(row){
  // console.log(row);
  // if(confirm("Do you want to delete this user ?")) {


//     Swal.fire({
//       title: 'Are you sure?',
//       text: "You won't be able to revert this!",
//       icon: 'info',
//       showCancelButton: true,
//       confirmButtonColor: '#3085d6',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'Yes, delete it!'
//     }).then((result) => {
//       if (result.isConfirmed) {
//     this.service.deleteData('/supplier/'+row['id']).subscribe(response => {
//       location.reload();
//   },err => {
//     // console.log(err);
//     if(err.status == 409){
//       Swal.fire({
//         title: "Supplier cannot be deleted",
//         text: "Stock In entry has been made against this supplier",
//         icon: 'warning'
//       });
//     }
//   });
// }
// });


}


applyFilter_award(event: any) {
  this.dataSource_award.filterPredicate = (data: any, filter) => {
    const dataStr =JSON.stringify(data).toLowerCase();
    return dataStr.indexOf(filter) != -1;
  }
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource_award.filter = filterValue.trim().toLowerCase();
  if (this.dataSource_award.paginator) {
    this.dataSource_award.paginator.firstPage();
  }
}


fetch_award() {
  this.service.getUserWithUserId().subscribe((user: any) => {
    this.service.getData("/achievement/committee/college/"+user.college.id).subscribe((res: any) => {
      const getPos:any = this.compute(res);
      getPos.then((response: any) => {
                this.dataSource_award = new MatTableDataSource(
                          JSON.parse(
                                    JSON.stringify(
                                              response
                                    )
                          )

                );console.table(this.dataSource_award.data)

                this.dataSource_award.paginator = this.paginator10;
            //  this.dataSource.sort = this.sort;
      });
    }, (err: any) => {
      console.warn("No committee available!!");
    })
  })
}

async compute_award(data: any) {
  return new Promise(resolve => {
            for (var i = 0; i < data.length; i++) {
                      data[i].pos = i + 1;
                      if (i == data.length - 1) {
                                resolve(data);
                      }
            }
  });
}
///Research Project
fetch_rprojects(){
  this.service.getUserWithUserId().subscribe((user: any) => {
    this.service.getData("/research-project/college/" + user.college.id).subscribe((res: any) => {
      console.log(res);
      const getPos:any = this.compute(res);
      getPos.then((response: any) => {
        this.dataSource_rproject = new MatTableDataSource(
          JSON.parse(JSON.stringify(response)            )
        );
        console.log(this.dataSource_rproject.data)
                this.dataSource_rproject.paginator = this.paginator11;
            //  this.dataSource.sort = this.sort;
      });
    }, (err: any) => {
      alert(err.error?.message);
    });
    
  }, (err: any) => {
    console.warn(err);
  });

}

async compute_rproject(data: any) {
  return new Promise(resolve => {
            for (var i = 0; i < data.length; i++) {
                      data[i].pos = i + 1;
                      if (i == data.length - 1) {
                                resolve(data);
                      }
            }
  });
}

applyFilter_rproject(event: any) {
  this.dataSource.filterPredicate = (data: any, filter) => {
    const dataStr =JSON.stringify(data).toLowerCase();
    return dataStr.indexOf(filter) != -1;
  }
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource_rproject.filter = filterValue.trim().toLowerCase();
  if (this.dataSource_rproject.paginator) {
    this.dataSource_rproject.paginator.firstPage();
  }
}




/// Research Project End


viewAchievements(){
  const dialogRef = this.dialog.open(NewDetailsComponent ,{width: "70%",height: "86vh",panelClass: 'full-width-dialog'});
}

applyFilter_awards(event: any) {
  this.dataSource_awards.filterPredicate = (data: any, filter) => {
    const dataStr =JSON.stringify(data).toLowerCase();
    return dataStr.indexOf(filter) != -1;
  }
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource_awards.filter = filterValue.trim().toLowerCase();
  if (this.dataSource_awards.paginator) {
    this.dataSource_awards.paginator.firstPage();
  }
}


fetch_awards() {
  this.service.getUserWithUserId().subscribe((user: any) => {
    this.service.getData("/student-achievement/criteriaName/criteria3").subscribe((res: any) => {
      const getPos:any = this.compute_awards(res);
      getPos.then((response: any) => {
                this.dataSource_awards = new MatTableDataSource(
                          JSON.parse(
                                    JSON.stringify(
                                              response
                                    )
                          )

                );console.table(this.dataSource_awards.data)

                this.dataSource_awards.paginator = this.paginator12;
            //  this.dataSource.sort = this.sort;
      });
    }, (err: any) => {
      console.warn("No committee available!!");
    })
  })
}

async compute_awards(data: any) {
  return new Promise(resolve => {
            for (var i = 0; i < data.length; i++) {
                      data[i].pos = i + 1;
                      if (i == data.length - 1) {
                                resolve(data);
                      }
            }
  });
}

viewStudentAward(){
  const dialogRef = this.dialog.open(NewStudentAwardComponent ,{width: "70%",height: "86vh",panelClass: 'full-width-dialog'});
}


fetchCriQual(){
  this.service.getUserWithUserId().subscribe((user: any) => {
    console.log("THIS USER",user);
    this.service.getData(`/cri-qual`).subscribe((res : any) => {
      console.log("DATA NEW",res)
      const getPos:any = this.compute_qual(res);
      getPos.then((response: any) => {
        this.dataSource_qual = new MatTableDataSource(
          JSON.parse(
            JSON.stringify(response)
          )
        );

        console.log(this.dataSource_qual.data)
        // this.college = this.dataSource_qual.data;
        // console.log(this.college[0].college.name)
            //     this.dataSource.paginator = this.paginator;
            //  this.dataSource.sort = this.sort;
      });
    }, (err: any) => {
      console.warn(err);
    });
  }, (err: any) => {
    console.warn(err);
  });

}

fetchCriQualN(){
  this.service.getUserWithUserId().subscribe((user: any) => {
    this.service.getData(`/cri-qual`).subscribe((res: any) => {
      console.log(res);
      let finaldata: any[] = [];
      for (let i = 0; i < res.length; i++) {

        this.service.getData("/crh/" + res[i].crh.id).subscribe((result: any) => {
          if(res[i].crh.criteriaName=="Criterion-III")
          {finaldata.push(
            {
              
              // user: result,
              approval: res[i]
            }
          );
          }
          if(!(i < res.length-1)) {
            this.process_appr(finaldata);
          }
        })
      
      }
    }, (err: any) => {
      alert(err.error?.message);
    });

  }, (err: any) => {
    console.warn(err);
  });

}
process_appr(data) {
  console.log("PP",data);
  const getPos:any = this.compute_qual(data);
      getPos.then((response: any) => {
        this.dataSource_qualN = new MatTableDataSource(
          JSON.parse(
            JSON.stringify(response)
          )
        );
        console.log(this.dataSource_qualN.data)
                // this.dataSource_approval.paginator = this.paginator3;
            //  this.dataSource.sort = this.sort;
      });
}
async compute_qual(data: any) {
  return new Promise(resolve => {
            for (var i = 0; i < data.length; i++) {
                      data[i].pos = i + 1;
                      if (i == data.length - 1) {
                                resolve(data);
                      }
            }
  });
}

viewdetailsN(element: any){const dialogRef = this.dialog.open(ViewCriteriaReportsComponent ,{width: "85%",height: "86vh",panelClass: 'full-width-dialog', data: element.approval});
    dialogRef.afterClosed().subscribe((result : any) => {
       this.fetchCriQualN();
    });

    }

    editN(row){
      const dialogRef = this.dialog.open(EditCriteriaReportComponent,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data: row.approval});
      dialogRef.afterClosed().subscribe((result : any) => {
        this.fetchCriQual();
     });
    }

//Quantitative
fetchCriQuanT(){
  this.service.getUserWithUserId().subscribe((user: any) => {
    this.service.getData(`/cri-quant`).subscribe((res: any) => {
      console.log(res);
      let finaldata: any[] = [];
      for (let i = 0; i < res.length; i++) {

        this.service.getData("/crh/" + res[i].crh.id).subscribe((result: any) => {
          if(res[i].crh.criteriaName=="Criterion-III")
          {finaldata.push(
            {
              
              // user: result,
              approval: res[i]
            }
          );
          }
          if(!(i < res.length-1)) {
            this.process_quant(finaldata);
          }
        })
      
      }
    }, (err: any) => {
      alert(err.error?.message);
    });

  }, (err: any) => {
    console.warn(err);
  });

}
process_quant(data) {
  console.log("PP",data);
  const getPos:any = this.compute_quant(data);
      getPos.then((response: any) => {
        this.dataSource_quanT = new MatTableDataSource(
          JSON.parse(
            JSON.stringify(response)
          )
        );
        console.log(this.dataSource_quanT.data)
                // this.dataSource_approval.paginator = this.paginator3;
            //  this.dataSource.sort = this.sort;
      });
}
async compute_quant(data: any) {
  return new Promise(resolve => {
            for (var i = 0; i < data.length; i++) {
                      data[i].pos = i + 1;
                      if (i == data.length - 1) {
                                resolve(data);
                      }
            }
  });
}

viewdetailsL(element: any){const dialogRef = this.dialog.open(ViewCriteriaQuantitativeComponent ,{width: "85%",height: "86vh",panelClass: 'full-width-dialog', data: element.approval});
    dialogRef.afterClosed().subscribe((result : any) => {
       this.fetchCriQualN();
    });

    }

    editL(row){
      const dialogRef = this.dialog.open(EditCriquantitativeReportComponent,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data: row.approval});
      dialogRef.afterClosed().subscribe((result : any) => {
        this.fetchCriQual();
     });
    }

}





