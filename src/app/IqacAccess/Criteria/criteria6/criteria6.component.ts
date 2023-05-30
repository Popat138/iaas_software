import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DownloadService } from 'src/app/download.service';
import { EditDevelopmentProgrammeComponent } from 'src/app/edit/iqac/edit-development-programme/edit-development-programme.component';
import { EditIqacMeetingsComponent } from 'src/app/edit/iqac/edit-iqac-meetings/edit-iqac-meetings.component';
import { IqactestreportComponent } from 'src/app/iqactestreport/iqactestreport.component';
import { ServiceService } from 'src/app/service.service';
import { TestreportComponent } from 'src/app/testreport/testreport.component';
import { MatPaginator } from '@angular/material/paginator';
// import { TestReportComponent } from 'src/app/test-report/test-report.component';
import { EditCriteriaReportComponent } from 'src/app/edit/edit-criteria-report/edit-criteria-report.component';
import { ViewCriteriaReportsComponent } from 'src/app/View/view-criteria-reports/view-criteria-reports.component';
import { ViewCriteriaQuantitativeComponent } from 'src/app/View/view-criteria-quantitative/view-criteria-quantitative.component';
import { EditCriquantitativeReportComponent } from 'src/app/edit/edit-criquantitative-report/edit-criquantitative-report.component';
import { ViewActivityReportComponent } from 'src/app/View/view-activity-report/view-activity-report.component';

@Component({
  selector: 'app-criteria6',
  templateUrl: './criteria6.component.html',
  styleUrls: ['./criteria6.component.scss']
})
export class Criteria6Component implements OnInit {

  committee: any = null;
  displayedColumns_activity: string[] = ['year','committee',
  'title',
  'fromDate',
  'toDate',
  'details',
'participants'];
  displayedColumns_iqacreport: string[] =['title','dates','n_teachers','n_students','s_agency','viewReport','participants',
  //'edit','delete'
];
  displayedColumns_pdp: string[] = [    'academic_year','title','dates','n_teachers','n_staff','s_agency','viewReport','participants',
 // 'edit','delete'
];
  displayedColumns_fdp: string[] = ['academic_year','teacher','type','course_title','course_place','duration','upload_cert',
 // 'edit','delete'
];
  displayedColumns_meeting: string[] = ['year','committee','date','agenda','details',
 // 'edit','delete'
];
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

  dataSource_activity!:MatTableDataSource<Criteria6Component>;
  dataSource_iqacreport!:MatTableDataSource<Criteria6Component>;
  dataSource_pdp!:MatTableDataSource<Criteria6Component>;
  dataSource_fpd!:MatTableDataSource<Criteria6Component>;
  dataSource_meeting!:MatTableDataSource<Criteria6Component>;
  dataSource_qualN!:MatTableDataSource<Criteria6Component>;
  dataSource_qual!:MatTableDataSource<Criteria6Component>;
  dataSource_quanT!:MatTableDataSource<Criteria6Component>;
  @ViewChild('paginator1') paginator1: MatPaginator;
  @ViewChild('paginator2') paginator2: MatPaginator;
  @ViewChild('paginator3') paginator3: MatPaginator;  
  @ViewChild('paginator4') paginator4: MatPaginator;
  @ViewChild('paginator5') paginator5: MatPaginator;


  test;



  constructor(
    public dialog : MatDialog,
    public service : ServiceService,
    public router: Router,
    public download: DownloadService,
  ) { }



  ngOnInit(): void {
    this.fetchactivity();
    this.fetchData_iqacreport();
    this.fetchData_pdp();
    this.fetchData_fdp();
    this.fetchCommittee();
    this.fetchCriQual();
    this.fetchCriQualN();
    console.log(this.fetchData_iqacreport)
    this.fetchCriQuanT();
  }





  export_activity(){
    var fileName = "Report of Activity Criteria 6";
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
'Duration':this.formatDate(e.fromDate)+" to "+this.formatDate(e.toDate),
'Teachers count':e.noOfTeachers,
'Students count':e.noOfStudent,
'Supporting agency':e.supportingAgency
        }
    });
    this.download.exportAsExcelFile(data,fileName);
  }

  export_committee(){

    var fileName = "Report of Committee Meeting";
    // let data = this.download_data;
    let data: any = null;

    if(this.dataSource_meeting.filter != ""){
      data = this.dataSource_meeting.filteredData;
    }else{
      data = this.dataSource_meeting.data;
    }
    data = data.map((e)=>{
        return {
'Year':e.academicYear,
'Date':e.meetingDate,
'Agenda':e.agenda,

        }
    });
    this.download.exportAsExcelFile(data,fileName);

  }
  export_fdp(){
    var fileName = "Report of Faculty Development Program";
    // let data = this.download_data;
    let data: any = null;

    if(this.dataSource_fpd.filter != ""){
      data = this.dataSource_fpd.filteredData;
    }else{
      data = this.dataSource_fpd.data;
    }
    data = data.map((e)=>{
        return {
'Academic Year':e.academicYear,
'Name of the teacher':e.user.firstName + " " + e.user.middleName +" "+e.user.lastName,
'Type':e.facultyProgramType,
'Course Title':e.titleOfCourse,
'Course Place':e.placeOfCourse,
'Duration':this.formatDate(e.startDate) +" to "+ this.formatDate(e.endDate)
        }
    });
    this.download.exportAsExcelFile(data,fileName);

  }










  ////////////////////////////////FOR COMMITTEE MEETING///////////////////////////////////////////

  viewmeeting(){


  }

  editmeeting(row){

  }

  deletemeeting(row){

  }

  viewmeetingupload(){

  }


  fetchCommittee() {
    this.service.getUserWithUserId().subscribe((user:any) => {
      this.service.getData("/meeting-record/college/"+user.college.id).subscribe((res: any) => {
        const getPos:any = this.compute(res);
        getPos.then((response: any) => {
                  this.dataSource_meeting = new MatTableDataSource(
                            JSON.parse(
                                      JSON.stringify(
                                                response
                                      )
                            )

                  );console.table(this.dataSource_meeting.data)

                  this.dataSource_meeting.paginator = this.paginator5;
              //  this.dataSource.sort = this.sort;
        });
      }, (err: any) => {
        console.warn("No committee available!!");
      })
    })
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

  applyFilter(event: any) {
    this.dataSource_meeting.filterPredicate = (data: any, filter) => {
      const dataStr =JSON.stringify(data).toLowerCase();
      return dataStr.indexOf(filter) != -1;
    }
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource_meeting.filter = filterValue.trim().toLowerCase();
    if (this.dataSource_meeting.paginator) {
      this.dataSource_meeting.paginator.firstPage();
    }
  }





//////////////////////////////FOR FACULTY DEVELOPMENT PROGRAM/////////////////////////////



edit(){}
delete(){}


fetchData_fdp() {
  this.service.getUserWithUserId().subscribe((user: any) => {
    this.service.getData("/faculty-program/college/" + user.college.id).subscribe((res : any) => {
      
      res.forEach((element,key) => {
        this.service.getData("/user/teacher/"+element.teacher.teacherId).subscribe((data:any)=>{

         res[key].user=data
         if(!(key < res.length-1)) {
           this.process(res);
         }           })
     });
    }, (err: any) => {
      console.warn(err);
    });
  })
}
process(data) {
  const getPos:any = this.compute_fdp(data);
      getPos.then((response: any) => {
        this.dataSource_fpd = new MatTableDataSource(
          response
          // JSON.parse(
          //   JSON.stringify(response)
          // )
        );
        console.table(this.dataSource_fpd.data)

                  this.dataSource_fpd.paginator = this.paginator4;
              //  this.dataSource.sort = this.sort;
      });
}
async compute_fdp(data: any) {
  return new Promise(resolve => {
            for (var i = 0; i < data.length; i++) {
                      data[i].pos = i + 1;
                      if (i == data.length - 1) {
                                resolve(data);
                      }
            }
  });
}

applyFilter_fdp(event: any) {
  this.dataSource_fpd.filterPredicate = (data: any, filter) => {
    const dataStr =JSON.stringify(data).toLowerCase();
    return dataStr.indexOf(filter) != -1;
  }
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource_fpd.filter = filterValue.trim().toLowerCase();
  if (this.dataSource_fpd.paginator) {
    this.dataSource_fpd.paginator.firstPage();
  }
}


//////////////////////////////////FOR PROFESSIONAL DEVELOPMENT PROGRAMME (IQAC)//////////////////


testreport(element){
  const dialogRef = this.dialog.open(IqactestreportComponent ,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data:element});
  dialogRef.afterOpened().subscribe((result : any) => {
     result = this.test;
     console.log(result)
  });

}

fetchData_pdp() {

  this.service.getData("/iqac-report/type/DEVELOPMENT_PROGRAM").subscribe((res : any) => {
    const getPos:any = this.compute_pdp(res);
    getPos.then((response: any) => {
      this.dataSource_pdp = new MatTableDataSource(
        JSON.parse(JSON.stringify(response))
      );
      this.test = this.dataSource_pdp.data
       console.log(this.dataSource_pdp.data)

           this.dataSource_pdp.paginator = this.paginator3;
          //  this.dataSource.sort = this.sort;
    });
  }, (err: any) => {
    console.warn(err);
  });

}

edit_pdp(row){
  const dialogRef = this.dialog.open(EditDevelopmentProgrammeComponent,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data: row});
}


delete_pdp(row){
  // console.log(row);

}


formatDate_pdp(date) {
  const options:any = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  };

  date = new Date(date).toLocaleString("en-IN", options);
  // console.log("gg", date);

  return date;
}



async compute_pdp(data: any) {
  return new Promise(resolve => {
            for (var i = 0; i < data.length; i++) {
                      data[i].pos = i + 1;
                      if (i == data.length - 1) {
                                resolve(data);
                      }
            }
  });
}

applyFilter_pdp(event: any) {
  this.dataSource_pdp.filterPredicate = (data: any, filter) => {
    const dataStr =JSON.stringify(data).toLowerCase();
    return dataStr.indexOf(filter) != -1;
  }
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource_pdp.filter = filterValue.trim().toLowerCase();
  if (this.dataSource_pdp.paginator) {
    this.dataSource_pdp.paginator.firstPage();
  }
}


export_pdp(){
  var fileName = "Report of Professional Development Program (IQAC)";
  // let data = this.download_data;
  let data: any = null;
  if(this.dataSource_pdp.filter != ""){
    data = this.dataSource_pdp.filteredData;
  }else{
    data = this.dataSource_pdp.data;
  }
  data = data.map((e)=>{
      return {
        'Academic Year':e.academicYear,
        'Title':e.title,
        'Duration':this.formatDate(e.fromDate) + " To " + this.formatDate(e.toDate),
        'Teachers count	':e.noOfTeachers,
        'Staff count	':e.noOfStudent,
        'Supporting agency':e.supportingAgency

      }
  });
  this.download.exportAsExcelFile(data,fileName);
}




  //////////////////////////////FOR IQAC REPORT ////////////////////////////

  // addactivities(){
  //   const dialogRef = this.dialog.open(AddNewIqacReportComponent ,{width: "70%",height: "86vh",panelClass: 'full-width-dialog'});
  //   dialogRef.afterClosed().subscribe((result : any) => {
  //      this.fetchData();
  //   });
  // }

  testreport1(element){
    const dialogRef = this.dialog.open(IqactestreportComponent ,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data:element});
    dialogRef.afterOpened().subscribe((result : any) => {
       result = this.test;
       console.log(result)
    });

  }



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

  fetchData_iqacreport() {

    this.service.getData("/iqac-report/type/IQAC_ACTIVITIES").subscribe((res : any) => {
      const getPos:any = this.compute_iqacreport(res);
      getPos.then((response: any) => {
        this.dataSource_iqacreport = new MatTableDataSource(
          JSON.parse(JSON.stringify(response))
        );
        console.table(this.dataSource_iqacreport.data)
             this.dataSource_iqacreport.paginator = this.paginator2;
            //  this.dataSource.sort = this.sort;
      });
    }, (err: any) => {
      console.warn(err);
    });

  }


  async compute_iqacreport(data: any) {
    return new Promise(resolve => {
      for (var i = 0; i < data.length; i++) {
        data[i].pos = i + 1;
        if (i == data.length - 1) {
          resolve(data);
        }
      }
    });
  }

  edit_iqacreport(row){
    const dialogRef = this.dialog.open(EditIqacMeetingsComponent,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data: row});
  }


  delete_iqacreport(row){


  }

  applyFilter_iqacreport(event: any) {
    this.dataSource_iqacreport.filterPredicate = (data: any, filter) => {
      const dataStr =JSON.stringify(data).toLowerCase();
      return dataStr.indexOf(filter) != -1;
    }
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource_iqacreport.filter = filterValue.trim().toLowerCase();
    if (this.dataSource_iqacreport.paginator) {
      this.dataSource_iqacreport.paginator.firstPage();
    }
  }

  export(){
    var fileName = "Report of IQAC Activities";
    // let data = this.download_data;
    let data: any = null;

    if(this.dataSource_iqacreport.filter != ""){
      data = this.dataSource_iqacreport.filteredData;
    }else{
      data = this.dataSource_iqacreport.data;
    }
    data = data.map((e)=>{
        return {
'Title':e.title,
'Duration':this.formatDate(e.fromDate)+" to "+this.formatDate(e.toDate),
'Teachers count':e.noOfTeacher,
'Students count':e.noOfStudent,
'Supporting agency':e.supportingAgency
        }
    });
    this.download.exportAsExcelFile(data,fileName);
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
  this.service.getData("/activity-report/criteriaName/criteria6").subscribe((res: any) => {
    const getPos:any = this.compute_activity(res);
    getPos.then((response: any) => {
              this.dataSource_activity = new MatTableDataSource(
                        JSON.parse(
                                  JSON.stringify(
                                            response
                                  )
                        )

              );console.table(this.dataSource_activity.data)

              this.dataSource_activity.paginator = this.paginator1;
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
          if(res[i].crh.criteriaName=="Criterion-VI")
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
            if(res[i].crh.criteriaName=="Criterion-VI")
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
interface send_to {
  send_to: String;
 }
