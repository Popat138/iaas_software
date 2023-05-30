import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AddNewDepartmentEventComponent } from 'src/app/Addnew/add-new-department-event/add-new-department-event.component';
import { AddNewSchoolComponent } from 'src/app/Addnew/add-new-school/add-new-school.component';
import { DownloadService } from 'src/app/download.service';
import { EditReportOfEventComponent } from 'src/app/edit/Department/edit-report-of-event/edit-report-of-event.component';
import { EditSummerWinterComponent } from 'src/app/edit/Department/edit-summer-winter/edit-summer-winter.component';
import { EditUgCoursesComponent } from 'src/app/edit/Department/edit-ug-courses/edit-ug-courses.component';
import { ServiceService } from 'src/app/service.service';
import { TestreportComponent } from 'src/app/testreport/testreport.component';
import { NewStudentAwardComponent } from 'src/app/View/new-student-award/new-student-award.component';
import { ReportbestpracticeComponent } from 'src/app/reportbestpractice/reportbestpractice.component';
import { EditBestPracticeComponent } from 'src/app/edit/Department/edit-best-practice/edit-best-practice.component';
import { EditCriteriaReportComponent } from 'src/app/edit/edit-criteria-report/edit-criteria-report.component';
import { ViewCriteriaReportsComponent } from 'src/app/View/view-criteria-reports/view-criteria-reports.component';
import { ViewCriteriaQuantitativeComponent } from 'src/app/View/view-criteria-quantitative/view-criteria-quantitative.component';
import { EditCriquantitativeReportComponent } from 'src/app/edit/edit-criquantitative-report/edit-criquantitative-report.component';
import { ViewActivityReportComponent } from 'src/app/View/view-activity-report/view-activity-report.component';

@Component({
  selector: 'app-criteria7',
  templateUrl: './criteria7.component.html',
  styleUrls: ['./criteria7.component.scss']
})
export class Criteria7Component implements OnInit {

  department: any = null;


  year_detail:any = null;
  committee: any = null;
  displayedColumns: string[] =['academic_year',
  'Department','title','duration','n_teachers','n_students','s_agency','viewReport','participants',
  // 'edit','delete'
];
  displayedColumns_event: string[] =['academic_year','Department','title','duration','n_teachers','n_students','s_agency','viewReport', 'participants',
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

displayedColumns_awards: string[] = ['a_year','title','name_of_award','award_name','awarding_agency', 'level' ,'nature', 'certificate',
// 'edit','delete'
];

displayedColumns_best: string[] =
   ['academic_year',
   'Department',
    'title','newsReport','edit'
    
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
  dataSource!:MatTableDataSource<Criteria7Component>;
  dataSource_events!:MatTableDataSource<Criteria7Component>;
  dataSource_activity!:MatTableDataSource<Criteria7Component>;
  dataSource_awards!:MatTableDataSource<Criteria7Component>;
  dataSource_best!:MatTableDataSource<Criteria7Component>;
  dataSource_qualN!:MatTableDataSource<Criteria7Component>;
  dataSource_qual!:MatTableDataSource<Criteria7Component>;
  dataSource_quanT!:MatTableDataSource<Criteria7Component>;
  constructor(

    public dialog : MatDialog,
    public service : ServiceService,
    public router: Router,
    public download: DownloadService
    //@Inject(MAT_DIALOG_DATA) public data: any

  ) {

   // this.year_detail = data;

  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.fetchdata();
    this.fetchdata_event();
    this.fetchactivity();
    this.fetch_award();
    this.fetch_best();
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

  var fileName = "Report Of Summer/Winter School  Criteria 7";
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
  var fileName = "Report Of Event  Criteria 7";
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
  var fileName = "Report Of Activity Criteria 7";
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

export_award(){

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
'Name of Award':e.awardName,
'Awarding agency':e.awardingAgency,
'Level':e.achievementLevel,
'Nature of Award':e.achievementNature.replace("_" , " "),

// 'Name of Institute':e.nameOfInstitute
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

testreport(element){
  console.log(element)
  const dialogRef = this.dialog.open(ViewActivityReportComponent ,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data:element});
  dialogRef.afterOpened().subscribe((result : any) => {
    //  result = this.test;
    //  console.log(result)
  });

}
  // addNewSchoolData(){
  //   const dialogRef = this.dialog.open(AddNewSchoolComponent ,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data : this.department});
  //   dialogRef.afterClosed().subscribe((result: any) => {
  //     this.fetchdata();
  //   });
  // }

  fetchdata(){

    this.service.getData("/school-report/criteriaName/criteria7").subscribe((res: any) =>  {
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

            //     this.dataSource.paginator = this.paginator;
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
testreport_event(element){
  console.log(element)
  const dialogRef = this.dialog.open(ViewActivityReportComponent ,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data:element});
  dialogRef.afterOpened().subscribe((result : any) => {
    //  result = this.test;
    //  console.log(result)
  });

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

  this.service.getData("/event-report/criteriaName/criteria7").subscribe((reports: any) => {
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

          //     this.dataSource.paginator = this.paginator;
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
  this.service.getData("/activity-report/criteriaName/criteria7").subscribe((res: any) => {
    const getPos:any = this.compute_activity(res);
    getPos.then((response: any) => {
              this.dataSource_activity = new MatTableDataSource(
                        JSON.parse(
                                  JSON.stringify(
                                            response
                                  )
                        )

              );console.table(this.dataSource_activity.data)

          //     this.dataSource.paginator = this.paginator;
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

applyFilter_award(event: any) {
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


fetch_award() {
  this.service.getUserWithUserId().subscribe((user: any) => {
    this.service.getData("/student-achievement/criteriaName/criteria7").subscribe((res: any) => {
      const getPos:any = this.compute_award(res);
      getPos.then((response: any) => {
                this.dataSource_awards = new MatTableDataSource(
                          JSON.parse(
                                    JSON.stringify(
                                              response
                                    )
                          )

                );console.table(this.dataSource_awards.data)

            //     this.dataSource.paginator = this.paginator;
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

fetch_best(){
  this.service.getData("/user/" + localStorage.getItem("userId")).subscribe((res: any) =>  {
    this.service.getData("/best-practice/college/" + res.college.id).subscribe((reports: any) => {
    const getPos:any = this.compute_best(reports);
    getPos.then((response: any) => {
              this.dataSource_best = new MatTableDataSource(
                        JSON.parse(
                                  JSON.stringify(
                                            response
                                  )
                        )

              );
              console.table(this.dataSource_best.data)

          //     this.dataSource.paginator = this.paginator;
          // this.dataSource.sort = this.sort;
    });
    });
  }, (err: any) => {
    alert("User detail not available!");
    this.router.navigateByUrl("");
  });

}
async compute_best(data: any) {
  return new Promise(resolve => {
            for (var i = 0; i < data.length; i++) {
                      data[i].pos = i + 1;
                      if (i == data.length - 1) {
                                resolve(data);
                      }
            }
  });
}
bestreport(element){
     console.log(element)
    const dialogRef = this.dialog.open(ReportbestpracticeComponent ,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data:element});
    dialogRef.afterOpened().subscribe((result : any) => {
      //  result = this.test;
      //  console.log(result)
    });
}

edit_best(row){
  const dialogRef = this.dialog.open(EditBestPracticeComponent,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data: row});
  dialogRef.afterClosed().subscribe((result: any) => {
    this.fetchdata();
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
          if(res[i].crh.criteriaName=="Criterion-VII")
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
            if(res[i].crh.criteriaName=="Criterion-VII")
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
