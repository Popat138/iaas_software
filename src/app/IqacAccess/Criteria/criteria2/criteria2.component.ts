import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DownloadService } from 'src/app/download.service';
import { EditReportOfEventComponent } from 'src/app/edit/Department/edit-report-of-event/edit-report-of-event.component';
import { EditSummerWinterComponent } from 'src/app/edit/Department/edit-summer-winter/edit-summer-winter.component';
import { EditDevelopmentProgrammeComponent } from 'src/app/edit/iqac/edit-development-programme/edit-development-programme.component';
import { EditIqacMeetingsComponent } from 'src/app/edit/iqac/edit-iqac-meetings/edit-iqac-meetings.component';
import { ServiceService } from 'src/app/service.service';
import { TestreportComponent } from 'src/app/testreport/testreport.component';
// import { TestReportComponent } from 'src/app/test-report/test-report.component';
import { ViewOneTimeFormComponent } from 'src/app/View/view-one-time-form/view-one-time-form.component';
import { NewStudentAwardComponent } from 'src/app/View/new-student-award/new-student-award.component';
import { TeachingmethodreportComponent } from 'src/app/teachingmethodreport/teachingmethodreport.component';
import { TeachingMethodsComponent } from 'src/app/teaching-methods/teaching-methods.component';
import { MatPaginator } from '@angular/material/paginator';
import { EditCriteriaReportComponent } from 'src/app/edit/edit-criteria-report/edit-criteria-report.component';
import { ViewCriteriaReportsComponent } from 'src/app/View/view-criteria-reports/view-criteria-reports.component';
import { ViewCriteriaQuantitativeComponent } from 'src/app/View/view-criteria-quantitative/view-criteria-quantitative.component';
import { EditCriquantitativeReportComponent } from 'src/app/edit/edit-criquantitative-report/edit-criquantitative-report.component';
import { ViewActivityReportComponent } from 'src/app/View/view-activity-report/view-activity-report.component';
@Component({
  selector: 'app-criteria2',
  templateUrl: './criteria2.component.html',
  styleUrls: ['./criteria2.component.scss']
})
export class Criteria2Component implements OnInit {


  department: any = null;


  year_detail:any = null;
  committee: any = null;
  displayedColumns: string[] =['academic_year',
  'Department','title','duration','n_teachers','n_students','s_agency','viewReport','participants',
  // 'edit',
  // 'delete'
];
  displayedColumns_event: string[] =['academic_year','Department','title','duration','n_teachers','n_students','s_agency','newsReport', 'participants',
  // 'edit','delete'
];
  displayedColumns_activity: string[] = ['year','committee',
  'title',
  'fromDate',
  'toDate',
  'details',
  'participants'
  // 'edit','delete'
];
  displayedColumns_approval: string[] = ['f_name','approval_date','letter_no','approval_type','designation', 'document'];
  displayedColumns_teacher: string[] = ['f_Name','qualification', 'DOB', 'Addhar_no','Pancard_no','view' ];
  displayedColumns_appointment: string[] = ['f_name','qualification','designation','appointment_type','nature','Addhar_no', 'Pan_no', 'appointment_date','joining_date','resguide','rec_year', 'document','gui_document'];
  displayedColumns_ug: string[] =['year','prog_code','prog_name','students_addmitted', 'students_appear','students_pass'];
  displayedColumns_pg: string[] =['year','prog_name','students_addmitted','students_appear','students_pass',
 ];
 displayedColumns_award: string[] = [
  // 'title',
   'a_year','name_of_student','name_of_award','achievementNature','awarding_agency', 'level' , 'certificate',
  //  'edit',    'delete'
];
displaycolumns_methods:string[]=['a_year','dept','teacher','resource','link_one','link_two',];
displaycolumns_tmethods:string[]=['a_year','dept','teacher','method','title','number_of_students','newsReport'];
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
  dataSource!:MatTableDataSource<Criteria2Component>;
  dataSource_events!:MatTableDataSource<Criteria2Component>;
  dataSource_activity!:MatTableDataSource<Criteria2Component>;
  dataSource_approval!:MatTableDataSource<Criteria2Component>;
  dataSource_teacher!:MatTableDataSource<Criteria2Component>;
  dataSource_appointment!:MatTableDataSource<Criteria2Component>;
  dataSource_ug!:MatTableDataSource<Criteria2Component>;
  dataSource_pg!:MatTableDataSource<Criteria2Component>;
  dataSource_awards!:MatTableDataSource<Criteria2Component>;
  dataSource_methods!:MatTableDataSource<Criteria2Component>;
  dataSource_report!:MatTableDataSource<Criteria2Component>;
  dataSource_qualN!:MatTableDataSource<Criteria2Component>;
  dataSource_qual!:MatTableDataSource<Criteria2Component>;
  dataSource_quanT!:MatTableDataSource<Criteria2Component>;
  @ViewChild('paginator') paginator!: MatPaginator;
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
  constructor(

    public dialog : MatDialog,
    public service : ServiceService,
    public router: Router,
    public download: DownloadService
    //@Inject(MAT_DIALOG_DATA) public data: any

  ) {

   // this.year_detail = data;

  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource();
    this.dataSource_events = new MatTableDataSource();
    this.dataSource_activity = new MatTableDataSource();
    this.fetchdata();
    this.fetchdata_event();
    this.fetchactivity();
    this.fetchData_appointment();
    this.fetchData_approval();
    this.fetchData_teacher();
    this.fetch_ugresult();
    this.fetch_pgresult();
    this.fetch_awards();
    this.fetchteachingMethod();
    this.fetchteachingReport();
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

  var fileName = "Report Of Summer/Winter School  Criteria 2";
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
  var fileName = "Report Of Event  Criteria 2";
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
  var fileName = "Report Of Activity Criteria 2";
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

export_appointment(){

  var fileName = "Report Of Appointment Details";
  // let data = this.download_data;
  let data: any = null;
  if(this.dataSource_appointment.filter != "" ||this.dataSource_teacher.filter != ""){
    data = this.dataSource_appointment.filteredData;
  }else{
    data = this.dataSource_appointment.data;
  }
  data = data.map((e)=>{
      return {

        'Teacher Name':e.user.firstName +" " + e.user.middleName + " " + e.user.lastName,
       //' Middle Name':e.user.middleName,
        //'Last Name'	:e.user.lastName,
        'Gender':e.user?.gender,
        'Addhar number':e.teacher?.aadharNumber,
        'Pan number': e.teacher?.panNumber,
        'Mobile No.':e.user?.phone,
        'Email ID': e.user?.email,
        'Appointment Date':this.formatDate(e.appointmentDate),
        'Joining Date in this Institute': this.formatDate(e.joinDate),
        'Order Number':e.orderNumber, 
        'Appointment Type':e.appointmentType.replace("_"," "),
        'Appointment Nature':e.nature.replace("_"," "),
        'Designation':e.designation.replace("_"," "),
        'Qualification':e.teacher?.pgQualification[0]?.degree +","+ e.teacher?.entranceQualification[0]?.name+","+ e.teacher?.researchQualification[0]?.degree,
        'Recognized as Reserach Guide':e.teacher?.resGuide,
        'Year of Recognition':e.teacher?.recYear,
// 'Supporting agency':e.supportingAgency,

      }
  });
  this.download.exportAsExcelFile(data,fileName);

}

export_approval(){
  var fileName = "Report Of Approval Details";
  // let data = this.download_data;
  let data: any = null;
  if(this.dataSource_approval.filter != ""){
    data = this.dataSource_approval.filteredData;
  }else{
    data = this.dataSource_approval.data;
  }
  data = data.map((e)=>{
      return {

        'Teacher Name':e.user.firstName + " " + e.user.middleName+ " " +e.user.lastName,
       //' Middle Name':e.user.middleName,
        //'Last Name'	:e.user.lastName,
        'Approval Date':this.formatDate(e.approval.approvalDate),
        'Letter Number':e.approval.letterNumber,
        'Appointment Type':e.approval.approvalType,
        'Designation':e.approval.designation,
// 'Supporting agency':e.supportingAgency,

      }
  });
  this.download.exportAsExcelFile(data,fileName);
}

export_teacher(){
  var fileName = "Report Of Teacher Details";
  // let data = this.download_data;
  let data: any = null;
  if(this.dataSource_teacher.filter != ""){
    data = this.dataSource_teacher.filteredData;
  }else{
    data = this.dataSource_teacher.data;
  }
  data = data.map((e)=>{
      return {
        'First Name':e.firstName +" "+ e.middleName+ " "+e.lastName,
       //' Middle Name':e.middleName,
       //'Last Name'	:e.lastName,
        'DOB':	e.dob,
        'Addhar number':e.teacher?.aadharNumber,
       	'Pancard Number':e.teacher?.panNumber,
        'Degree':e.teacher.pgQualification[0]?.degree, 
// 'Supporting agency':e.supportingAgency,

      }
  });
  this.download.exportAsExcelFile(data,fileName);
}


export_awards(){

  var fileName = "Students Awards in Curricular and Co-curricular activity";
  // let data = this.download_data;
  let data: any = null;
  if(this.dataSource_awards.filter != ""){
    data = this.dataSource_awards.filteredData;
  }else{
    data = this.dataSource_awards.data;
  }
  data = data.map((e)=>{
      return {

        'Academic Year':e.year,
        'Department':e.department.Id,
        'Student Name':e.nameOfStudent,
        'Award Name':e.nameOfAward,
        'Award Type':e.achievementNature,
        'Awarding Agency':e.awardingAgency,
        	'Level of Award':e.achievementLevel,
       
// 'Supporting agency':e.supportingAgency,

      }
  });
  this.download.exportAsExcelFile(data,fileName);


}


export_method(){
  var fileName = "List of ICT resources used by Teachers ";
  let data: any = null;
  if(this.dataSource_methods.filter != ""){
    data = this.dataSource_methods.filteredData;
  }else{
    data = this.dataSource_methods.data;
  }
  data = data.map((e)=>{
      return {

        'Academic Year':e.academicYear,
        'Department':e.teacher.department.departmentName,
        'Teacher Name':e.user.firstName + " " +e.user.middleName + " "+e.user.lastName,
        'ICT Resources used by Teacher':e.ictResources,
        'ICT resources Link-1':e.ictLinkone,
        'ICT resources Link-2':e.ictLinktwo,
       
// 'Supporting agency':e.supportingAgency,

      }
  });
  this.download.exportAsExcelFile(data,fileName);

}
////////////////////////////////////


  testreport_event(element){
    console.log(element)
    const dialogRef = this.dialog.open(ViewActivityReportComponent ,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data:element});
    dialogRef.afterOpened().subscribe((result : any) => {
      //  result = this.test;
      //  console.log(result)
    });


  }

  testreport_method(element){
    console.log(element)
    const dialogRef = this.dialog.open(TeachingmethodreportComponent ,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data:element});
    dialogRef.afterOpened().subscribe((result : any) => {
      //  result = this.test;
      //  console.log(result)
    });
  
  }




  ///////////////////////////////////Teacher INFO ///////////////////////////////////////

  viewDetail_teacher(element : any) {
    const dialogRef1 = this.dialog.open(ViewOneTimeFormComponent ,{width: "85%",height: "86vh",panelClass: 'full-width-dialog', data : element});
    dialogRef1.afterClosed().subscribe((result : any) => {
       this.fetchData_teacher();
    });
  }

  fetchData_teacher() {
    this.service.getUserWithUserId().subscribe((user : any) => {
      this.service.getData("/user/role/Teacher/college/" + user.college.id).subscribe((res: any) => {
        const getPos:any = this.compute_teacher(res);
        getPos.then((response: any) => {
          this.dataSource_teacher = new MatTableDataSource(
            JSON.parse(
              JSON.stringify(response)
            )
          );
          console.log(this.dataSource_teacher.data)
                  this.dataSource_teacher.paginator = this.paginator4;
              //  this.dataSource.sort = this.sort;
        });
      }, (err: any) => {
        alert("Error try again later!!!!!!!!");
      });
    }, (err: any) => {
      alert("Error try again later!!!!!!!!");
    });
  }

  async compute_teacher(data: any) {
    return new Promise(resolve => {
              for (var i = 0; i < data.length; i++) {
                        data[i].pos = i + 1;
                        if (i == data.length - 1) {
                                  resolve(data);
                        }
              }
    });
  }

  applyFilter_teacher(event: any) {
    this.dataSource_teacher.filterPredicate = (data: any, filter) => {
      const dataStr =JSON.stringify(data).toLowerCase();
      return dataStr.indexOf(filter) != -1;
    }
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource_teacher.filter = filterValue.trim().toLowerCase();
    if (this.dataSource_teacher.paginator) {
      this.dataSource_teacher.paginator.firstPage();
    }
  }

/////////////Student Awards///////

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

applyFilter_methods(event: any) {
  this.dataSource_methods.filterPredicate = (data: any, filter) => {
    const dataStr =JSON.stringify(data).toLowerCase();
    return dataStr.indexOf(filter) != -1;
  }
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource_methods.filter = filterValue.trim().toLowerCase();
  if (this.dataSource_methods.paginator) {
    this.dataSource_methods.paginator.firstPage();
  }
}

fetch_awards() {
  this.service.getUserWithUserId().subscribe((user: any) => {
    this.service.getData("/achievement").subscribe((res: any) => {
      const getPos:any = this.compute_awards(res);
      getPos.then((response: any) => {
                this.dataSource_awards = new MatTableDataSource(
                          JSON.parse(
                                    JSON.stringify(
                                              response
                                    )
                          )

                );console.table(this.dataSource_awards.data)

                this.dataSource_awards.paginator = this.paginator8;
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





////////////////////////////Appointment Details ////////////////////////////////////////////////


fetchData_appointment() {
  this.service.getUserWithUserId().subscribe((user: any) => {
    this.service.getData("/teacher-appointment/college/" + user.college.id).subscribe((res: any) => {
      console.log("apoint",res);
      res.forEach((element,key) => {
        this.service.getData("/user/teacher/"+element.teacher.teacherId).subscribe((data:any)=>{

         res[key].user=data
         
         if(!(key < res.length-1)) {
           this.process_appointment(res);
         }           })
     });

    }, (err: any) => {
      alert(err.error?.message);
    });

  }, (err: any) => {
    console.warn(err);
  });
}

process_appointment(res:any) {
  console.log("abc",res);
  const getPos:any = this.compute_appointment(res);
      getPos.then((response: any) => {
        this.dataSource_appointment = new MatTableDataSource(
          response
        );
        console.log(this.dataSource_appointment.data)
                this.dataSource_appointment.paginator = this.paginator5;
            //  this.dataSource.sort = this.sort;
      });
}

async compute_appointment(data: any) {
  return new Promise(resolve => {
            for (var i = 0; i < data.length; i++) {
                      data[i].pos = i + 1;
                      if (i == data.length - 1) {
                                resolve(data);
                      }
            }
  });
}

applyFilter_appointment(event: any) {
  this.dataSource_appointment.filterPredicate = (data: any, filter) => {
    const dataStr =JSON.stringify(data).toLowerCase();
    return dataStr.indexOf(filter) != -1;
  }
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource_appointment.filter = filterValue.trim().toLowerCase();
  if (this.dataSource_appointment.paginator) {
    this.dataSource_appointment.paginator.firstPage();
  }
}






/////////////////////////////APPROVAL DETAILS ////////////////////////////////////////////////////////


fetchData_approval() {
  this.service.getUserWithUserId().subscribe((user: any) => {
    this.service.getData("/teacher-approval/college/" + user.college.id).subscribe((res: any) => {
      console.log(res);
      let finaldata: any[] = [];
      for (let i = 0; i < res.length; i++) {

        this.service.getData("/user/teacher/" + res[i].teacher.teacherId).subscribe((result: any) => {
          finaldata.push(
            {
              user: result,
              approval: res[i]
            }
          );

          if(!(i < res.length-1)) {
            this.process_approval(finaldata);
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

process_approval(data) {
  const getPos:any = this.compute_approval(data);
      getPos.then((response: any) => {
        this.dataSource_approval = new MatTableDataSource(
          JSON.parse(
            JSON.stringify(response)
          )
        );
        console.log(this.dataSource_approval.data)
                this.dataSource_approval.paginator = this.paginator3;
            //  this.dataSource.sort = this.sort;
      });
}

async compute_approval(data: any) {
  return new Promise(resolve => {
            for (var i = 0; i < data.length; i++) {
                      data[i].pos = i + 1;
                      if (i == data.length - 1) {
                                resolve(data);
                      }
            }
  });
}

applyFilter_approval(event: any) {
  this.dataSource_approval.filterPredicate = (data: any, filter) => {
    const dataStr =JSON.stringify(data).toLowerCase();
    return dataStr.indexOf(filter) != -1;
  }
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource_approval.filter = filterValue.trim().toLowerCase();
  if (this.dataSource_approval.paginator) {
    this.dataSource_approval.paginator.firstPage();
  }
}

// export interface PeriodicElement {
//   f_Name:string;
//   Name: string;
//   l_Name:string;
//   DOB: string;
//   Addhar_no: number;
//   Pancard_no: string;

// }

// const ELEMENT_DATA: PeriodicElement[] = [
//   {f_Name:'This',Name:'Test',l_Name:'Complete', DOB: '1/10/2002', Addhar_no: 9876543210, Pancard_no: '123456',},

// ];






/////////////////////for Summer winter school ////////////////

  edit(row){
    const dialogRef = this.dialog.open(EditSummerWinterComponent,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data: row});
  }

  delete(row){ }


  testreport(element){
    console.log(element)
    const dialogRef = this.dialog.open(ViewActivityReportComponent ,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data:element});
    dialogRef.afterOpened().subscribe((result : any) => {
      //  result = this.test;
      //  console.log(result)
    });


  }

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


  // addNewSchoolData(){
  //   const dialogRef = this.dialog.open(AddNewSchoolComponent ,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data : this.department});
  //   dialogRef.afterClosed().subscribe((result: any) => {
  //     this.fetchdata();
  //   });
  // }

  fetchdata(){

    this.service.getData("/school-report/criteriaName/criteria2").subscribe((res: any) =>  {
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

                this.dataSource.paginator = this.paginator;
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


///////////////////////for events ///////////////////////////////////

edit_event(row){
  const dialogRef = this.dialog.open(EditReportOfEventComponent,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data: row});
}


delete_event(row){
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

// ngOnInit(): void {
//   this.dataSource = new MatTableDataSource();
//   this.fetchdata();
// }

// addNewEventData(){

//   const dialogRef = this.dialog.open(AddNewDepartmentEventComponent ,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data : this.department});
//   dialogRef.afterClosed().subscribe((result: any) => {
//     this.fetchdata_event();
//   });
// }


fetchdata_event(){
    this.service.getData("/event-report/criteriaName/criteria2").subscribe((reports: any) => {
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

              this.dataSource_events.paginator = this.paginator1;
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

fetchactivity() {
  this.service.getData("/activity-report/criteriaName/criteria2").subscribe((res: any) => {
    const getPos:any = this.compute_activity(res);
    getPos.then((response: any) => {
              this.dataSource_activity = new MatTableDataSource(
                        JSON.parse(
                                  JSON.stringify(
                                            response
                                  )
                        )

              );console.table(this.dataSource_activity.data)

              this.dataSource_activity.paginator = this.paginator2;
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

fetch_ugresult(){
  this.service.getData("/user/" + localStorage.getItem("userId")).subscribe((user: any) =>  {
    this.service.getData("/ug-result/college/" + user.college.id).subscribe((res: any) => {
      const getPos:any = this.compute_ug(res);
      getPos.then((response: any) => {
                this.dataSource_ug = new MatTableDataSource(
                          JSON.parse(
                                    JSON.stringify(
                                              response
                                    )
                          )

                );console.table(this.dataSource_ug.data)

                this.dataSource_ug.paginator = this.paginator6;
            //  this.dataSource.sort = this.sort;
      });
    }, (err: any) => {
      console.warn("No committee available!!");
    })

  })

}
async compute_ug(data: any) {
  return new Promise(resolve => {
            for (var i = 0; i < data.length; i++) {
                      data[i].pos = i + 1;
                      if (i == data.length - 1) {
                                resolve(data);
                      }
            }
  });
}

export_ugresult(){
  var fileName = "Undergraduate Results";
  // let data = this.download_data;
  let data: any = null;
  if(this.dataSource_ug.filter != ""){
    data = this.dataSource_ug.filteredData;
  }else{
    data = this.dataSource_ug.data;
  }
  data = data.map((e)=>{
      return {
        'Academic Year':e.year,
        //'Department':e.department.departmentName,
        'Programme Code':e.program.programCode,  
'Programme Nmae':e.program.programName,

'Number of Students Admitted':e.studentAdmitted,
'Number of Students Appeared':e.studentAppeared,
'Number of Students Passed':e.studentPassed,

      }
  });
  this.download.exportAsExcelFile(data,fileName);


}

applyFilter_ug(event: any) {
  this.dataSource_ug.filterPredicate = (data: any, filter) => {
    const dataStr =JSON.stringify(data).toLowerCase();
    return dataStr.indexOf(filter) != -1;
  }
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource_ug.filter = filterValue.trim().toLowerCase();
  if (this.dataSource_ug.paginator) {
    this.dataSource_ug.paginator.firstPage();
  }
}


//PG RESULTS

fetch_pgresult(){
  this.service.getData("/user/" + localStorage.getItem("userId")).subscribe((user: any) =>  {
    this.service.getData("/pg-result/college/" + user.college.id).subscribe((res: any) => {
      const getPos:any = this.compute_ug(res);
      getPos.then((response: any) => {
                this.dataSource_pg = new MatTableDataSource(
                          JSON.parse(
                                    JSON.stringify(
                                              response
                                    )
                          )

                );console.table(this.dataSource_pg.data)

                this.dataSource_pg.paginator = this.paginator7;
            //  this.dataSource.sort = this.sort;
      });
    }, (err: any) => {
      console.warn("No committee available!!");
    })

  })

}
async compute_pg(data: any) {
  return new Promise(resolve => {
            for (var i = 0; i < data.length; i++) {
                      data[i].pos = i + 1;
                      if (i == data.length - 1) {
                                resolve(data);
                      }
            }
  });
}
export_pgresult(){
  var fileName = "Postgraduate Results";
  // let data = this.download_data;
  let data: any = null;
  if(this.dataSource_pg.filter != ""){
    data = this.dataSource_pg.filteredData;
  }else{
    data = this.dataSource_pg.data;
  }
  data = data.map((e)=>{
      return {
        'Academic Year':e.year,
        //'Department':e.department.departmentName,
        'Programme Code':e.program.programCode,  
'Programme Nmae':e.program.programName,

'Number of Students Admitted':e.studentAdmitted,
'Number of Students Appeared':e.studentAppeared,
'Number of Students Passed':e.studentPassed,

      }
  });
  this.download.exportAsExcelFile(data,fileName);


}

applyFilter_pg(event: any) {
  this.dataSource_pg.filterPredicate = (data: any, filter) => {
    const dataStr =JSON.stringify(data).toLowerCase();
    return dataStr.indexOf(filter) != -1;
  }
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource_pg.filter = filterValue.trim().toLowerCase();
  if (this.dataSource_pg.paginator) {
    this.dataSource_pg.paginator.firstPage();
  }
}
///Teaching Methods/////
fetchteachingMethod() {
  this.service.getUserWithUserId().subscribe((user: any) => {
    console.log("user",user)
    this.service.getData("/teaching-methods/college/" + user.college.id).subscribe((res: any) => {
      
      console.log("methods",res);
        console.log(res);
        res.forEach((element,key) => {
           this.service.getData("/user/teacher/"+element.teacher.teacherId).subscribe((data:any)=>{

            res[key].user=data
            if(!(key < res.length-1)) {
              this.process_method(res);
            }           })
        });
        console.log("final teacher",res)
      }, (err: any) => {
        alert(err.error?.message);
      });

    }, (err: any) => {
      console.warn(err);
    });

}

process_method(data){
  const getPos:any = this.compute_method(data);
  getPos.then((response: any) => {
    this.dataSource_methods = new MatTableDataSource(
      response
    );
    console.log(this.dataSource_methods.data)
            this.dataSource_methods.paginator = this.paginator9;
        //  this.dataSource.sort = this.sort;
  });


}
async compute_method(data: any) {
  return new Promise(resolve => {
            for (var i = 0; i < data.length; i++) {
                      data[i].pos = i + 1;
                      if (i == data.length - 1) {
                                resolve(data);
                      }
            }
  });
}
///Teaching method report

fetchteachingReport() {
  this.service.getUserWithUserId().subscribe((user: any) => {
    console.log("user",user)
    this.service.getData("/teaching-methods/college/" + user.college.id).subscribe((res: any) => {
      
      console.log("methods",res);
        console.log(res);
        res.forEach((element,key) => {
           this.service.getData("/user/teacher/"+element.teacher.teacherId).subscribe((data:any)=>{

            res[key].user=data
            if(!(key < res.length-1)) {
              this.process_report(res);
            }           })
        });
        console.log("final teacher",res)
      }, (err: any) => {
        alert(err.error?.message);
      });

    }, (err: any) => {
      console.warn(err);
    });

}

process_report(data){
  const getPos:any = this.compute_report(data);
  getPos.then((response: any) => {
    this.dataSource_report = new MatTableDataSource(
      response
    );
    console.log(this.dataSource_report.data)
            this.dataSource_report.paginator = this.paginator10;
        //  this.dataSource.sort = this.sort;
  });


}
async compute_report(data: any) {
  return new Promise(resolve => {
            for (var i = 0; i < data.length; i++) {
                      data[i].pos = i + 1;
                      if (i == data.length - 1) {
                                resolve(data);
                      }
            }
  });
}

applyFilter_report(event: any) {
  this.dataSource_report.filterPredicate = (data: any, filter) => {
    const dataStr =JSON.stringify(data).toLowerCase();
    return dataStr.indexOf(filter) != -1;
  }
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource_report.filter = filterValue.trim().toLowerCase();
  if (this.dataSource_report.paginator) {
    this.dataSource_report.paginator.firstPage();
  }
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
          if(res[i].crh.criteriaName=="Criterion-II")
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
///Quantitative
fetchCriQuanT(){
  this.service.getUserWithUserId().subscribe((user: any) => {
    this.service.getData(`/cri-quant`).subscribe((res: any) => {
      console.log(res);
      let finaldata: any[] = [];
      for (let i = 0; i < res.length; i++) {

        this.service.getData("/crh/" + res[i].crh.id).subscribe((result: any) => {
          if(res[i].crh.criteriaName=="Criterion-II")
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
