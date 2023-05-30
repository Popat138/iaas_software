import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';
import { CoPoAttainmentComponent} from '../edit/teacher/co-po-attainment/co-po-attainment.component';
import { ViewCourseOutcomeMappingComponent } from '../View/view-course-outcome-mapping/view-course-outcome-mapping.component';
import { ViewInternalAssessmentComponent } from '../View/view-internal-assessment/view-internal-assessment.component';
import { FormBuilder, FormGroup,Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import { GetAttainmentDetailComponent } from '../get-attainment-detail/get-attainment-detail.component';
import { GetFinalAttainmentChartComponent } from '../get-final-attainment-chart/get-final-attainment-chart.component';
import { SelectCourseByProgramIdComponent } from '../common/select-course-by-program-id/select-course-by-program-id.component';
import { SelectProgramByDepartmentIdComponent } from '../common/select-program-by-department-id/select-program-by-department-id.component';
import { ReactiveFormsModule } from '@angular/forms';
import { GetAttainmentDepartmentComponent } from '../get-attainment-department/get-attainment-department.component';
import { ViewCoPoMappingComponent } from '../View/view-co-po-mapping/view-co-po-mapping.component';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-program-outcome',
  templateUrl: './program-outcome.component.html',
  styleUrls: ['./program-outcome.component.scss']
})
export class ProgramOutcomeComponent implements OnInit {
  course: any = null;
program: any = null;
teacher:any=null;
divisions: any = null;
programDetails: any = null;
public Form: FormGroup;

year: any[] = [
  {year: '2018-2019', },
  {year: '2019-2020', },
  {year: '2020-2021', },
  {year: '2021-2022', },
];
  displayedColumns_po: string[] = ['a_year','f_name','program','year','sem','class','div','c_code','c_name', 'view',

  'edit',
  'delete'
];
displayedColumns_ass: string[] = [   'year', 'f_name', 'prog_name','c_code',  'c_name', 'class', 'division',  'test_type',  'view'];
displayedColumns_pat: string[] = ['a_year','f_name','program','year','sem','class','div','c_code','c_name', 'views',

  'edit',
  'delete'
];
dataSource_po!:MatTableDataSource<ProgramOutcomeComponent>;
dataSource_ass!:MatTableDataSource<ProgramOutcomeComponent>;
dataSource_pos!:MatTableDataSource<ProgramOutcomeComponent>;
@ViewChild('paginator1') paginator1: MatPaginator;
@ViewChild('paginator2') paginator2: MatPaginator;
@ViewChild('paginator3') paginator3: MatPaginator;
  constructor(
    private fb: FormBuilder,
     public dialog : MatDialog,
    public service : ServiceService,
    public router: Router

  ) { 
    this.Form = this.fb.group({
      academic_year: this.fb.control('',Validators.required),
      year: this.fb.control('',Validators.required),
      semester: this.fb.control('',Validators.required),
      class: this.fb.control('',Validators.required),
      div: this.fb.control('',Validators.required),
      program: this.fb.control('',Validators.required),
      c_code: this.fb.control('',Validators.required),
      c_name: this.fb.control('',Validators.required)
    })
  }

  ngOnInit(): void {
    this.dataSource_po = new MatTableDataSource();
    this.fetchteachingplan();
    this.fetchData();
    this.fetchassessment();
    this.fetchteachingpos();
    this.submitForm();

  }

  // addCoPoMapping(){
  //   const dialogRef = this.dialog.open(AddCourseOutcomeMappingComponent ,{width: "80%",height: "86vh",panelClass: 'full-width-dialog'});
  //   dialogRef.afterClosed().subscribe(result => {
  //     this.fetchteachingplan();
  //   });
  // }

  applyFilter(event: any) {
    this.dataSource_po.filterPredicate = (data: any, filter) => {
      const dataStr =JSON.stringify(data).toLowerCase();
      return dataStr.indexOf(filter) != -1;
    }
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource_po.filter = filterValue.trim().toLowerCase();
    if (this.dataSource_po.paginator) {
      this.dataSource_po.paginator.firstPage();
    }
  }


  fetchteachingplan() {
    this.service.getUserWithUserId().subscribe((user: any) => {
      console.log("userPlans",user.hod.department.id)
      this.service.getData("/course-outcome-mapping/department/"+user.hod.department.id).subscribe((res: any) => {
        this.programDetails = res;
      
        const getPos:any = this.compute(res);
        getPos.then((response: any) => {
                  this.dataSource_po = new MatTableDataSource(
                            JSON.parse(
                                      JSON.stringify(
                                                response
                                      )
                            )

                  );
                  console.log(this.dataSource_po.data)
                  
                  this.dataSource_po.paginator = this.paginator1;
              //  this.dataSource.sort = this.sort;
        });
      }, (err: any) => {
        alert("No CO - PO Mapping available!!");
      })
    }, (err: any) => {
      alert("User authentication expired!!. Login again to continue.");
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
////
applyFilter_pos(event: any) {
  this.dataSource_pos.filterPredicate = (data: any, filter) => {
    const dataStr =JSON.stringify(data).toLowerCase();
    return dataStr.indexOf(filter) != -1;
  }
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource_pos.filter = filterValue.trim().toLowerCase();
  if (this.dataSource_pos.paginator) {
    this.dataSource_pos.paginator.firstPage();
  }
}


fetchteachingpos() {
  this.service.getUserWithUserId().subscribe((user: any) => {
    console.log("userPlans",user.hod.department.id)
    this.service.getData("/course-outcome-mapping/department/"+user.hod.department.id).subscribe((res: any) => {
      this.programDetails = res;
    
      const getPos:any = this.compute_pos(res);
      getPos.then((response: any) => {
                this.dataSource_pos = new MatTableDataSource(
                          JSON.parse(
                                    JSON.stringify(
                                              response
                                    )
                          )

                );
                console.log(this.dataSource_pos.data)
                
                this.dataSource_pos.paginator = this.paginator2;
            //  this.dataSource.sort = this.sort;
      });
    }, (err: any) => {
      alert("No CO - PO Mapping available!!");
    })
  }, (err: any) => {
    alert("User authentication expired!!. Login again to continue.");
    this.router.navigateByUrl("");
  });


}

async compute_pos(data: any) {
  return new Promise(resolve => {
            for (var i = 0; i < data.length; i++) {
                      data[i].pos = i + 1;
                      if (i == data.length - 1) {
                                resolve(data);
                      }
            }
  });
}

////
  viewDetail(element : any) {
    const dialogRef = this.dialog.open(ViewCourseOutcomeMappingComponent ,{width: "70%",height: "86vh",panelClass: 'full-width-dialog', data: element});
    dialogRef.afterClosed().subscribe((result: any) => {
      this.fetchteachingplan();
    })
  }

  viewDetails(element : any) {
    const dialogRef = this.dialog.open(ViewCoPoMappingComponent ,{width: "70%",height: "86vh",panelClass: 'full-width-dialog', data: element});
    dialogRef.afterClosed().subscribe((result: any) => {
      this.fetchteachingplan();
    })
  }

  edit(row) {
    const dialogRef = this.dialog.open(CoPoAttainmentComponent ,{width: "80%",height: "86vh",panelClass: 'full-width-dialog', data: row});
    dialogRef.afterClosed().subscribe(result => {
      this.fetchteachingplan();
    });
  }

  delete(row) {
    // console.log(row);

      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
      this.service.deleteData('/course-outcome-mapping/'+row['id']).subscribe(response => {
        location.reload();
    },err => {
      // console.log(err);
      if(err.status == 409){
        Swal.fire({
          title: "Supplier cannot be deleted",
          text: "Stock In entry has been made against this supplier",
          icon: 'warning'
        });
      }
    });
  }
  });
  }
///Assessment ///////

viewInternalAssessment(element: any) {
  const dialogRef = this.dialog.open(ViewInternalAssessmentComponent ,{width: "100vw",height: "90vh",panelClass: 'full-width-dialog', data: element});
  dialogRef.afterClosed().subscribe((result : any) => {
     this.fetchData();
  });
}

geattainment()
{
  const dialogRef = this.dialog.open(GetAttainmentDepartmentComponent  ,{width: "100vw",height: "90vh",panelClass: 'full-width-dialog'});
}

// addinternalassesment(){
//   const dialogRef = this.dialog.open(AddTestComponenet ,{width: "100vw",height: "90vh",panelClass: 'full-width-dialog'});
//   dialogRef.afterClosed().subscribe((result : any) => {
//      this.fetchData();
//   });
// }

fetchData(){}
//  {

//   this.service.getData(`/internal-assessment/user/${localStorage.getItem("userId")}`).subscribe((res : any) => {
//     console.log("userAss",res);
//     const getPos:any = this.compute_ass(res);
//     getPos.then((response: any) => {
//       this.dataSource_ass = new MatTableDataSource(
//         JSON.parse(
//           JSON.stringify(response)
//         )
//       );
//       console.log(this.dataSource_ass.data)
//           //     this.dataSource.paginator = this.paginator;
//           //  this.dataSource.sort = this.sort;
//     });
//   }, (err: any) => {
//     console.warn(err);
//   });

// }

fetchassessment() {
  this.service.getUserWithUserId().subscribe((user: any) => {
    console.log("userAttt",user.hod.department.id)
    this.service.getData("/internal-assessment/department/"+user.hod.department.id).subscribe((res: any) => {
      console.log("departmentAttment",res);
      
      const getPos:any = this.compute_ass(res);
      getPos.then((response: any) => {
                this.dataSource_ass = new MatTableDataSource(
                          JSON.parse(
                                    JSON.stringify(
                                              response
                                    )
                          )

                );
                console.log(this.dataSource_ass.data)

                this.dataSource_ass.paginator = this.paginator3;
            //  this.dataSource.sort = this.sort;
      });
    }, (err: any) => {
      alert("No CO - PO Mapping available!!");
    })
  }, (err: any) => {
    alert("User authentication expired!!. Login again to continue.");
    this.router.navigateByUrl("");
  });


}



async compute_ass(data: any) {
  return new Promise(resolve => {
            for (var i = 0; i < data.length; i++) {
                      data[i].pos = i + 1;
                      if (i == data.length - 1) {
                                resolve(data);
                      }
            }
  });
}

applyFilter_ass(event: any) {
  this.dataSource_ass.filterPredicate = (data: any, filter) => {
    const dataStr =JSON.stringify(data).toLowerCase();
    return dataStr.indexOf(filter) != -1;
  }
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource_ass.filter = filterValue.trim().toLowerCase();
  if (this.dataSource_ass.paginator) {
    this.dataSource_ass.paginator.firstPage();
  }
}

// edit(row: any) {
//   const dialogRef = this.dialog.open(EditInternalAssesmentComponent,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data: row});
//   dialogRef.afterClosed().subscribe((result : any) => {
//     this.fetchData();
//  });
// }

// delete(row) {
//   // console.log(row);

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
//     this.service.deleteData('/internal-assessment/'+row['id']).subscribe(response => {
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
// }





///////Attainment Chart//////

getProgram() {
  this.service.getUserWithUserId().subscribe((user: any) => {
    console.log("userAtt",user.hod.department.id)
    const programDialogRef = this.dialog.open(SelectProgramByDepartmentIdComponent ,{width: "80%",height: "86vh",panelClass: 'full-width-dialog', data: {departmentId : user.hod.department.id}});
    programDialogRef.afterClosed().subscribe((result1: any) => {
      console.log("result",result1)
      this.program = result1;
      this.Form.get("program").setValue(result1.programName);
      this.service.getData("/stream-detail/" + result1.streamDetail.id).subscribe((res: any) => {
        console.log("general",res)
        this.programDetails = res;
      })
    })
  }, (err: any) => {
    alert("User authentication expired!!. Login again to continue.");
    this.router.navigateByUrl("");
  });
}

getCourses() {
  const courseDialogRef = this.dialog.open(SelectCourseByProgramIdComponent ,{width: "80%",height: "86vh",panelClass: 'full-width-dialog', data: {programId : this.program.programId}});
  courseDialogRef.afterClosed().subscribe((result1: any) => {
    this.course = result1;
    this.Form.get("c_code").setValue(result1.code);
    this.Form.get("c_name").setValue(result1.name);
    this.Form.get("year").setValue(result1.year);
    this.Form.get("semester").setValue(result1.semester);
  })
}

classChanges(event: any) {
  if(event.value != "" && event.value != null && event.value != undefined) {
    this.divisions = event.value.divisions;
  }
}

submitForm(){ 
  this.service.getUserWithUserId().subscribe((user: any) => {
  this.service.getData("/course-outcome-mapping/department/"+user.hod.department.id).subscribe((res: any) => {
    this.programDetails = res;
  
    console.log("ProgramDetail_Submit",this.programDetails);
  //   this.program = res.academicDetail.course.program;
  //   this.course = res.data.academicDetail.course;
  //  // console.log("Div", this.data.academicDetail.streamDetail.divisions);
  //  this.divisions = res.academicDetail.streamDetail.divisions;

  })
  // const dialogRef = this.dialog.open(GetFinalAttainmentChartComponent ,{width: "100vw",height: "90vh",panelClass: 'full-width-dialog', data: {
  //   academicYear: this.Form.get("academic_year").value,
  //  divisionId: this.Form.get("div").value.id,
  //   divisionName: this.Form.get("div").value.divisionName,
  //   program: this.Form.get("program").value,
  //   c_name:this.Form.get("c_name").value,
  //   class:this.Form.get("class").value,
  //   courseId: this.Form.get("c_code").value.id,
  //   departmentId:localStorage.getItem("userId"),
  //   userId: this.teacher.departmentId
  // }});
  // dialogRef.afterClosed().subscribe((result1 : any) => { });
}
)}





}
