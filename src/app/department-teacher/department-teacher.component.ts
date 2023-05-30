import { Component, OnInit,ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ServiceService } from '../service.service';
import { ViewResearchPaperComponent } from '../View/view-research-paper/view-research-paper.component';
import { ViewProjectWorkComponent } from '../View/view-project-work/view-project-work.component';
import { EditProjectWorkComponent } from '../edit/teacher/edit-project-work/edit-project-work.component';
import { TeachingmethodreportComponent } from '../teachingmethodreport/teachingmethodreport.component';
import { Router } from '@angular/router';
import { DownloadService } from '../download.service';
import { ViewTeachingPlanComponent } from '../View/view-teaching-plan/view-teaching-plan.component';
import { ViewPHDResearchStudentDetailsComponent } from '../View/view-phdresearch-student-details/view-phdresearch-student-details.component';
import { ViewPHDDeclaredStudentDetailsComponent } from '../View/view-phddeclared-student-details/view-phddeclared-student-details.component';
import { ViewLessonPlanComponent } from '../View/view-lesson-plan/view-lesson-plan.component';
import { MatPaginator } from '@angular/material/paginator';
import { ViewOneTimeFormComponent } from '../View/view-one-time-form/view-one-time-form.component';
import { ViewBiodataiqacComponent } from '../View/view-biodataiqac/view-biodataiqac.component';
@Component({
  selector: 'app-department-teacher',
  templateUrl: './department-teacher.component.html',
  styleUrls: ['./department-teacher.component.scss']
})
export class DepartmentTeacherComponent implements OnInit {
  department: any;
  teacher:any;
  displayedColumns: string[] = ['academic_year','teacher','level','title_of_book','title_of_paper','title_of_proceeding','title_of_conferce','publisher','edition','upload_cert'];
  displayedColumns_researchpapers: string[] = ['academic_year','authors','type','paper_title','journal_name','volume', 'issn','view'];
  displayedColumns_rproject: string[] = ['academic_year','award_year','level','dept','title_of_book','authors','year_award','publisher','edition','agency','upload_cert'];
  displayedColumns_paperpresented: string[] = ['academic_year','teacher','level','type','workshop_title','paper_title','duration','upload_cert'];
  displayedColumns_conferenceattended: string[] = ['academic_year','teacher','level','type','workshop_title','course_place','duration','role','upload_cert' ];
  displayedColumn_less: string[] = ['a_year','teacher','programme','class','div','c_code','c_name','view'];
  displayedColumns3: string[] = ['a_year','pcode','sem','year','c_name', 'view',
  // 'edit','delete'
];
displayedColumns_appointment: string[] = ['f_name','qualification','designation','appointment_type','nature','Addhar_no', 'Pan_no', 'appointment_date','joining_date','resguide','rec_year', 'document','gui_document'];
displaycolumns_methods:string[]=['a_year','dept','teacher','resource','link_one','link_two',]; 
displaycolumns_tmethods:string[]=['a_year','dept','teacher','method','title','number_of_students','newsReport'];
displayedColumns_tdetail: string[] = ['a_year','teacher','year','sem','class','div','c_name', 'month', 'view'];
displayedColumns_rstudent: string[] = ['a_year','teacher',
  // 'qualification','guide','rec_year',
  'view_registered_students','view_phd_declaratin'];
displayedCoulumns_teacher:string[]= [
  'f_Name',
'qualification','DOB', 
'Addhar_no','Pancard_no','view',
'view_bio' 
];

constructor(
    private dialog: MatDialog,
    public router: Router,
    public download: DownloadService,
    public service: ServiceService
  ) { }
  dataSource!:MatTableDataSource<DepartmentTeacherComponent>;
  dataSource_researchpapers!:MatTableDataSource<DepartmentTeacherComponent>;
  dataSource_rproject:MatTableDataSource<DepartmentTeacherComponent>;
  dataSource_paperpresented!:MatTableDataSource<DepartmentTeacherComponent>;
  dataSource_conferenceattended!:MatTableDataSource<DepartmentTeacherComponent>;
  dataSource_project!:MatTableDataSource<DepartmentTeacherComponent>;
  dataSource_other!:MatTableDataSource<DepartmentTeacherComponent>;
  dataSource_appointment!:MatTableDataSource<DepartmentTeacherComponent>;
  dataSource_methods!:MatTableDataSource<DepartmentTeacherComponent>;
  dataSource_tdetails!:MatTableDataSource<DepartmentTeacherComponent>;
  dataSource_rstudent!:MatTableDataSource<DepartmentTeacherComponent>;
  dataSource_plan!:MatTableDataSource<DepartmentTeacherComponent>;
  dataSource_report!:MatTableDataSource<DepartmentTeacherComponent>;
  dataSource_teacher!:MatTableDataSource<DepartmentTeacherComponent>;
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
  @ViewChild('paginator13') paginator13: MatPaginator;
  @ViewChild('paginator14') paginator14: MatPaginator;

  types: any[] = [
    {value: 'Reference_Book', title: 'Reference book', },
    {value: 'Text_Book', title: 'Text book', },
    {value: 'Chapter', title: 'Chapter', },
    {value: 'Proceeding', title: 'Proceeding', },
  ];
  ngOnInit(): void {
    this.dataSource_rstudent= new MatTableDataSource();
    this.dataSource_conferenceattended= new MatTableDataSource();
    this.fetchData();
    this.fetchData_researchpapers();
    this.fetchData_appointment();
    this.fetch_rprojects();
    this.fetchData_paperpresented();
    this.fetchData_conferenceattended();
    this.fetchProjectWork();
    this.fetchteachingMethod();
    this.fetchteachingdetails();
    this.fetchresstudent();
    this.fetchData_plan();
    this.fetchteachingReport();
    this.fetchteacherData()
  }
  fetchData() {
    this.service.getUserWithUserId().subscribe((user: any) => {
      console.log("userData",user.hod.department.id)
      this.service.getData(`/book-publication/department/` + user.hod.department.id).subscribe((res: any) => {
        console.log("department",res);
        // this.process(res);
        // return
        res.forEach((element,key) => {
           this.service.getData(`/user/teacher/`+element.teacher.teacherId).subscribe((data:any)=>{

            res[key].user=data
            if(!(key < res.length-1)) {
              this.processbook(res);
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
  processbook(data) {
    const getPos:any = this.computebook(data);
        getPos.then((response: any) => {
          this.dataSource = new MatTableDataSource(
            response
            // JSON.parse(
            //   JSON.stringify(response)
            // )
          );
          console.log(this.dataSource.data)
                  this.dataSource.paginator = this.paginator1;
              //  this.dataSource.sort = this.sort;
        });
  }
  async computebook(data: any) {
    return new Promise(resolve => {
              for (var i = 0; i < data.length; i++) {
                        data[i].pos = i + 1;
                        if (i == data.length - 1) {
                                  resolve(data);
                        }
              }
    });
  }
  biodata(element:any){
    const dialogRef1 = this.dialog.open(ViewBiodataiqacComponent ,{width: "85%",height: "86vh",panelClass: 'full-width-dialog', data : element});
    dialogRef1.afterClosed().subscribe((result : any) => {
       this.fetchData();
    });
  
  }


  viewDetail_plan(element){
    const dialogRef = this.dialog.open(ViewLessonPlanComponent ,{width: "80%",height: "86vh",panelClass: 'full-width-dialog', data: element});
      dialogRef.afterClosed().subscribe(result => {
        this.fetchData_plan();
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
//Research Papers Publication API///////////////////////////////
viewDetail_researchpapers(element : any) {
  const dialogRef1 = this.dialog.open(ViewResearchPaperComponent ,{width: "85%",height: "86vh",panelClass: 'full-width-dialog', data: element});
  dialogRef1.afterClosed().subscribe((result : any) => {
     this.fetchData_researchpapers();
  });
}
fetchData_researchpapers() {
  this.service.getUserWithUserId().subscribe((user: any) => {
    console.log("userResearch",user.hod.department.id)
    this.service.getData("/research-publication/department/" + user.hod.department.id).subscribe((res: any) => {
      console.log("departmentresearch",res);
      const getPos:any = this.compute_researchpapers(res);
      getPos.then((response: any) => {
        this.dataSource_researchpapers = new MatTableDataSource(
          JSON.parse(
            JSON.stringify(response)
          )
        );
        console.log(this.dataSource_researchpapers.data)
                this.dataSource_researchpapers.paginator = this.paginator2;
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
//Research Project by Faculty ////////////////

fetch_rprojects(){
  this.service.getUserWithUserId().subscribe((user: any) => {
    console.log("userProject",user.hod.department.id)
    this.service.getData("/research-project/department/" + user.hod.department.id).subscribe((res: any) => {
      console.log("project",res);
      const getPos:any = this.compute_rproject(res);
      getPos.then((response: any) => {
        this.dataSource_rproject = new MatTableDataSource(
          JSON.parse(JSON.stringify(response)            )
        );
        console.log(this.dataSource_rproject.data)
                this.dataSource_rproject.paginator = this.paginator5;
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
////////////////////////////// Paper presented /////////////////////////

fetchData_paperpresented() {
  this.service.getUserWithUserId().subscribe((user: any) => {
    console.log("userPresented",user.hod.department.id)
    this.service.getData("/paper-presented/department/" + user.hod.department.id).subscribe((res: any) => {
      console.log("Paper Pre",res);
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
  const getPos:any = this.compute_paperpresented(data);
      getPos.then((response: any) => {
        this.dataSource_paperpresented = new MatTableDataSource(
          response
          // JSON.parse(
          //   JSON.stringify(response)
          // )
        );
        console.log(this.dataSource_paperpresented.data)
                this.dataSource_paperpresented.paginator = this.paginator3;

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


fetchData_conferenceattended() {
  this.service.getUserWithUserId().subscribe((user: any) => {
    console.log("userAttended",user.hod.department.id)
    this.service.getData("/faculty-seminar/department/" + user.hod.department.id).subscribe((res: any) => {
      console.log("Attended",res);
      res.forEach((element,key) => {
         this.service.getData("/user/teacher/"+element.teacher.teacherId).subscribe((data:any)=>{

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
          JSON.parse(
            JSON.stringify(response)
          )
        );
        console.log(this.dataSource_conferenceattended.data)
                this.dataSource_conferenceattended.paginator = this.paginator4;
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

//Project Work by student /////

viewProjectDetail(element: any){
  const dialogRef = this.dialog.open(ViewProjectWorkComponent ,{width: "70%",height: "86vh",panelClass: 'full-width-dialog', data: element});
}
delete_project(row){

}
edit_project(row){
  const dialogRef = this.dialog.open(EditProjectWorkComponent,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data: row});

}

fetchProjectWork() {
  this.service.getUserWithUserId().subscribe((user: any) => {
    console.log("userProjectwork",user.hod.department.id)
    this.service.getData("/project-work/department/"+user.hod.department.id).subscribe((res: any) => {
      const getPos:any = this.computeproject(res);
      getPos.then((response: any) => {
                this.dataSource_other = new MatTableDataSource(
                          JSON.parse(
                                    JSON.stringify(
                                              response
                                    )
                          )

                );console.table(this.dataSource_other.data)

                this.dataSource_other.paginator = this.paginator12;
            //  this.dataSource.sort = this.sort;
      });
    }, (err: any) => {
      console.warn("No committee available!!");
    })
  })
}

async computeproject(data: any) {
  return new Promise(resolve => {
            for (var i = 0; i < data.length; i++) {
                      data[i].pos = i + 1;
                      if (i == data.length - 1) {
                                resolve(data);
                      }
            }
  });
}

//Teacher appointment//////


fetchData_appointment() {
  this.service.getUserWithUserId().subscribe((user: any) => {
    console.log("userAppointment",user.hod.department.id)
    this.service.getData("/teacher-appointment/department/" + user.hod.department.id).subscribe((res: any) => {
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
  console.log("process_appointment",res);
  const getPos:any = this.compute_appointment(res);
      getPos.then((response: any) => {
        this.dataSource_appointment = new MatTableDataSource(
          response
        );
        console.log(this.dataSource_appointment.data)
                this.dataSource_appointment.paginator = this.paginator7;
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
///Teaching Methods/////
testreport_method(element){
  console.log(element)
  const dialogRef = this.dialog.open(TeachingmethodreportComponent ,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data:element});
  dialogRef.afterOpened().subscribe((result : any) => {
    //  result = this.test;
    //  console.log(result)
  });

}
fetchteachingMethod() {
  this.service.getUserWithUserId().subscribe((user: any) => {
    console.log("userMethods",user.hod.department.id)
    this.service.getData("/teaching-methods/department/" +user.hod.department.id).subscribe((res: any) => {
      
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
            this.dataSource_methods.paginator = this.paginator8;
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
/////Teaching Method II
fetchteachingReport() {
  this.service.getUserWithUserId().subscribe((user: any) => {
    console.log("userMethods",user.hod.department.id)
    this.service.getData("/teaching-methods/department/" +user.hod.department.id).subscribe((res: any) => {
      
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
  const getPos:any = this.compute_method(data);
  getPos.then((response: any) => {
    this.dataSource_report = new MatTableDataSource(
      response
    );
    console.log(this.dataSource_report.data)
            this.dataSource_report.paginator = this.paginator13;
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
//Teaching Plans //////////
fetchteachingdetails() {
  this.service.getUserWithUserId().subscribe((user: any) => {
    console.log("userPlans&&&",user.hod.department.id)
    this.service.getData("/teaching-plan/department/" + user.hod.department.id).subscribe((res: any) => {
      console.log("userfsfsfsfsf",res)
      const getPos:any = this.computedetails(res);
      getPos.then((response: any) => {
                this.dataSource_tdetails = new MatTableDataSource(
                  response
                          // JSON.parse(
                          //           JSON.stringify(
                          //                     response
                          //           )
                          // )

                );
                console.log(this.dataSource_tdetails.data)

                this.dataSource_tdetails.paginator = this.paginator9;
            //  this.dataSource.sort = this.sort;
      });
    }, (err: any) => {
      console.warn("No committee available!!");
    })
  }, (err: any) => {
    alert("User authentication expired!!. Login again to continue.");
    this.router.navigateByUrl("");
  });


}


async computedetails(data: any) {
  return new Promise(resolve => {
            for (var i = 0; i < data.length; i++) {
                      data[i].pos = i + 1;
                      if (i == data.length - 1) {
                                resolve(data);
                      }
            }
  });
}

viewDetail(element : any) {
  const dialogRef = this.dialog.open(ViewTeachingPlanComponent ,{width: "70%",height: "86vh",panelClass: 'full-width-dialog', data: element});
  dialogRef.afterClosed().subscribe((result: any) => {
    this.fetchteachingdetails();
  })
}
///Research Students Information/////
viewRegisteredStudent(element: any ) {
  const dialogRef = this.dialog.open(ViewPHDResearchStudentDetailsComponent ,{width: "80%",height: "86vh",panelClass: 'full-width-dialog', data : element});
  dialogRef.afterClosed().subscribe(result => {
    this.fetchresstudent();
  });
}

viewDeclaredStudent(element: any) {
  const dialogRef = this.dialog.open(ViewPHDDeclaredStudentDetailsComponent ,{width: "80%",height: "86vh",panelClass: 'full-width-dialog', data : element});
  dialogRef.afterClosed().subscribe(result => {
    this.fetchresstudent();
  });
}

lengthvalidate(array:any[]):boolean{

  if(array.length > 0){
    return true;
  }
  else{return false}

}
fetchresstudent(){
  this.service.getUserWithUserId().subscribe((user: any) => {
    console.log("userPlans",user.hod.department.id)
  this.service.getData("/research-student/department/" + user.hod.department.id).subscribe((res: any) => {
    console.log("dataStudents",res)
    const getPos:any = this.compute_student(res);
    getPos.then((response: any) => {
              this.dataSource_rstudent = new MatTableDataSource(
                response
                        // JSON.parse(
                        //           JSON.stringify(
                        //                     response
                        //           )
                        // )

              );
              console.log(this.dataSource_rstudent.data)

              this.dataSource_rstudent.paginator = this.paginator10;
          //  this.dataSource.sort = this.sort;
    });
  }, (err: any) => {
    console.warn("No committee available!!");
  })
}, (err: any) => {
  alert("User authentication expired!!. Login again to continue.");
  this.router.navigateByUrl("");
});


}



async compute_student(data: any) {
  return new Promise(resolve => {
            for (var i = 0; i < data.length; i++) {
                      data[i].pos = i + 1;
                      if (i == data.length - 1) {
                                resolve(data);
                      }
            }
  });
}
applyFilter_rstudent(event: any) {
  this.dataSource_rstudent.filterPredicate = (data: any, filter) => {
    const dataStr =JSON.stringify(data).toLowerCase();
    return dataStr.indexOf(filter) != -1;
  }
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource_rstudent.filter = filterValue.trim().toLowerCase();
  if (this.dataSource_rstudent.paginator) {
    this.dataSource_rstudent.paginator.firstPage();
  }
}

////Excel Downloads////////////////////////////
export_books(){
  var fileName = "Report Of Book Publication";
  // let data = this.download_data;
  let data: any = null;
  if(this.dataSource.filter != ""){
    data = this.dataSource.filteredData;
  }else{
    data = this.dataSource.data;
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

fetchData_plan(){
  this.service.getUserWithUserId().subscribe((user: any) => {
    console.log("Lesson plans",user.hod.department.id)
    this.service.getData("/lesson-plan/department/" + user.hod.department.id).subscribe((res: any) => {
      console.log("LESSON PLAN",res)
      const getPos:any = this.compute_plan(res);
      getPos.then((response: any) => {
                this.dataSource_plan = new MatTableDataSource(
                  response
                          // JSON.parse(
                          //           JSON.stringify(
                          //                     response
                          //           )
                          // )

                );
                console.log(this.dataSource_plan.data)

                this.dataSource_plan.paginator = this.paginator11;
            //  this.dataSource.sort = this.sort;
      });
    }, (err: any) => {
      console.warn("No committee available!!");
    })
  }, (err: any) => {
    alert("User authentication expired!!. Login again to continue.");
    this.router.navigateByUrl("");
  });
}
async compute_plan(data: any) {
  return new Promise(resolve => {
            for (var i = 0; i < data.length; i++) {
                      data[i].pos = i + 1;
                      if (i == data.length - 1) {
                                resolve(data);
                      }
            }
  });
}
/////// Teacher personal information
viewTeacherDetail(element : any) {
  const dialogRef1 = this.dialog.open(ViewOneTimeFormComponent ,{width: "85%",height: "86vh",panelClass: 'full-width-dialog', data : element});
  dialogRef1.afterClosed().subscribe((result : any) => {
     this.fetchteacherData();
  });
}

fetchteacherData() {
  this.service.getUserWithUserId().subscribe((user : any) => {
    // console.log("userData==Teacher",user.hod.department.id)
    this.service.getData("/user/AllTeacher/department/" + user.hod.department.id).subscribe((res: any) => {
      console.log("Teacher Here",res)
      const getPos:any = this.compute_teacher(res);
      getPos.then((response: any) => {
        this.dataSource_teacher = new MatTableDataSource(
          response
          // JSON.parse(
          //   JSON.stringify(response)
          // )
        );
        console.log("DATA SOURCE",this.dataSource_teacher.data)
                this.dataSource_teacher.paginator = this.paginator14;
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


/////////






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


}
