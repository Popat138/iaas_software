import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { AddStudentDataByAcademicDetailComponent } from '../Addnew/add-student-data-by-academic-detail/add-student-data-by-academic-detail.component';
import { DownloadService } from '../download.service';
import { EditStudentDataByAcademicDetailComponent } from '../edit/edit-student-data-by-academic-detail/edit-student-data-by-academic-detail.component';
import { ServiceService } from '../service.service';
import { ViewRollCallListComponent } from '../View/view-roll-call-list/view-roll-call-list.component';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-student-data-by-academic-detail',
  templateUrl: './student-data-by-academic-detail.component.html',
  styleUrls: ['./student-data-by-academic-detail.component.scss']
})
export class StudentDataByAcademicDetailComponent implements OnInit {
  divisionId: any = null;
  academicYear:any=null;
  
  constructor(
    public dialog : MatDialog,
    private service : ServiceService,
    public download: DownloadService

  ) { }

  displayedColumns: string[] = [
  'academicYear',
  'firstname',
  'middlename',
  'lastname',
  'email',
  'class',
	'division',
  // 'roleCallList',
  // 'studentList',
  // 'download',
  // 'edit',
  'delete'
];
displayedColumns_1: string[] = [
  'academicYear',
  'firstname',
  'middlename',
  'lastname',
  'email',
  'class',
	'division',
  // // 'roleCallList',
  // // 'studentList',
  // // 'download',
  // // 'edit',
  'delete'
];
  studentData : any = null;
  dataSource!:MatTableDataSource<StudentDataByAcademicDetailComponent>;
  dataSource_new!:MatTableDataSource<StudentDataByAcademicDetailComponent>;
  // dataSource : any = [];
  @ViewChild('paginator') paginator!: MatPaginator;

  ngOnInit(): void {
    this.fetchStudentData();
    this.dataSource = new MatTableDataSource();
    // this.dataSource.paginator = this.paginator;
//     this.dataSource = new MatTableDataSource();
// this.fetchStudentData();
this.fetchclassData();
// this.fetchAluminiData();
  }

  fetchStudentData() {
    this.service.getUserWithUserId().subscribe((user: any) => {
      this.service.getData("/user/role/Student/college/" + user.college.id).subscribe((res: any) => {
        console.log(res);
        this.studentData = res;

        let student: any[] =[];
      res.forEach((element, i) => {
        this.service.getData("/program-detail/division/" + element?.student?.division?.id).subscribe((programDetail: any) => {
          console.log("PROGRAM",programDetail);
          student.push({
            user: element,
           // streamClass: programDetail.programClass
          });

          if (!(i < res.length-1)) {
            this.processStudentFeedback(student);
          }
        });
      });
        
      }, (err: any) => {
        console.warn("No committee available!!");
      })
    })
  }

  processStudentFeedback(data) {
    const getPos:any = this.compute(data);
        getPos.then((response: any) => {
						this.dataSource = new MatTableDataSource(
								JSON.parse(
										JSON.stringify(
												response
										)
								)

						);
						console.log(this.dataSource.data)
				    this.dataSource.paginator = this.paginator;
				//  this.dataSource.sort = this.sort;
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
//Newl Added
fetchclassData()
{
 
  this.service.getUserWithUserId().subscribe((user: any) => {
    this.service.getData("/user/role/Student/college/" + user.college.id).subscribe((res: any) => {
      console.log("STUDENT",res);
      this.studentData = res;

      let student:any[]=[];
      let net:any[]=[];
    res.forEach((element,i) => {
      this.service.getData("/program-detail/division/" + element?.student?.division?.id).subscribe((programDetail: any) => {
        console.log("PROGRAM",programDetail);
         student.push({
           user: element,
           academicYear:element.student.academicYear,
           divisionId:element.student.division.divisionId,
          //  divisionName:element.student.division.divisionName
    //  streamClass: programDetail.programClass
        });
        for (const key in student) {
          net.push({ key, value: student[key]});
        }

        if (!(i <net.length-1)) {
          this.processStudent_Feedback(net);
        }
      });
    });
      
    }, (err: any) => {
      console.warn("No committee available!!");
    })
  })
}

processStudent_Feedback(data) {
  const getPos:any = this.compute_feed(data);
      getPos.then((response: any) => {
          this.dataSource_new = new MatTableDataSource(
              JSON.parse(
                  JSON.stringify(
                      response
                  )
              )

          );

          
          console.log("POPAT",this.dataSource_new.data)
      //     this.dataSource.paginator = this.paginator;
      //  this.dataSource.sort = this.sort;
      });
}

//

  async compute_feed(data: any) {
    return new Promise(resolve => {
              for (var i = 0; i < data.length; i++) {
                        data[i].pos = i + 1;
                        if (i == data.length - 1) {
                                  resolve(data);
                        }
              }
    });
  }


  export(){
    var fileName = "Student data";
    // let data = this.download_data;
    let data: any = null;
    if(this.dataSource.filter != ""){
      data = this.dataSource.filteredData;
    }else{
      data = this.dataSource.data;
    }
    data = data.map((e)=>{
        return {
          'Academic year':e?.user?.student?.academicYear,
           'First name':e?.user?.firstName,
            'Middle name':e?.user?.middleName,
            'Last name':e?.user?.lastName,
            'Email':e?.user?.email,
            'Class':e?.user?.student?.streamDetail?.streamClass,
            'Division':e?.user?.student?.division?.divisionName
        }
    });
    this.download.exportAsExcelFile(data,fileName);
  }


edit(row){
  const dialogRef = this.dialog.open(EditStudentDataByAcademicDetailComponent,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data: row});
  dialogRef.afterClosed().subscribe((result: any) => {
    this.fetchStudentData();
  })
}


delete(row){
  console.log("ROW",row);
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
    this.service.deleteData('/user/'+row.user.userId).subscribe(response => {
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
  addNewStudentData(){

     const dialogRef = this.dialog.open(AddStudentDataByAcademicDetailComponent ,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data : {"committeeId":2}});
    // const dialogRef = this.dialog.open(AddNewStudentDataComponent ,{width: "70%",height: "86vh",panelClass: 'full-width-dialog'});
    dialogRef.afterClosed().subscribe((result: any) => {
      this.fetchStudentData();
    });
  }

  rollcalllist(rowData : any){
    const dialogRef = this.dialog.open(ViewRollCallListComponent ,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data : rowData});
    dialogRef.afterClosed().subscribe((result: any) => {
      this.fetchStudentData();
    });
  }

  studentlist() {
    
  }

  downloadStudentList(element: any) {
    console.log(element.studentList);

    var fileName = "Studentlist_" + element?.academicYear;
    var data = element.studentList.map((e, index)=>{
        return {
          'Sr.No..' : index+1,
          'Enrollment No.' : e.student.enrollmentNo,
          'Roll No.' : e.student.rollNo,
          'First name' : e.firstName,
          'Middle name' : e.middleName,
          'Last name' : e.lastName,
          'Adhar Card No.' : e.student.aadharNumber,
          'Gender' : e.gender,
          'Caste' : e.student.caste,
          'Category' : e.student.category,
          'Correspondence Address' : e.student.correspondenceAddress,
          'Phone No.' : e.phone,
          'Degree Applied' : e.student.degreeApplied,
          'Medium' : e.student.medium,
          'Class' : e.student.studentClass,
          'Fee Category' : e.student.feeCategory,
          'Name Of The Exam' : e.student.nameOfTheExam,
          'Seat No.' : e.student.seatNo,
          'University/Board' : e.student.universityOrBoard,
          'Percentage' : e.student.percentage,
          'Annual Income' : e.student.annualIncome,
          'Admission Date' : e.student.admissionDate,
          "Father's/Guardian's Name" : e.student.fatherOrGuardianName,
          'Division' : e.student.division.divisionName,
          'Relation' : e.student.relation,
          'Class Last Attended' : e.student.classLastAttended,
          'General Subject' : e.student.generalSubject,
          'Special Subject' : e.student.specialSubject,
          'Permanent Address' : e.student.permanentAddress,
          'Mobile No.' : e.student.alternateNumber,
          "Document's Submitted" : e.student.documentSubmitted,
          'Parents Occupation' : e.student.parentOccupation,
          'Phone No.(Office)' : e.student.officePhoneNo,
          'Office Address' : e.student.officeAddress,
          'Register No.' : e.student.registerNumber,
          'Birth Date' : e.student.birthDate,
          'Birth Place' : e.student.birthPlace,
          "Mother's Name" : e.student.motherName,
          'Eligibility No' : e.student.eligibilityNo,
          'Student ID No' : e.student.studentIdNo,
          'Previous Class' : e.student.previousClass,
          'E-Mail' : e.email,
          'Nationality' : e.student.nationality,
          'Admission Form No' : e.student.admissionFormNo,
          'Religion' : e.student.religion,
          'Area' : e.student.area,
          'Student Status' : e.student.studentStatus,
        }
    });
    this.download.exportAsExcelFile(data,fileName);
  }
///
fetchAluminiData() {
  this.service.getUserWithUserId().subscribe((user: any) => {
    this.service.getData("/user/role/Student/college/" + user.college.id).subscribe((res: any) => {
      console.log("POPAT",res)
      const getPos:any = this.compute_data(res);
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
            //  this.dataSource.sort = this.sort;
      });
    }, (err: any) => {
      console.warn("No committee available!!");
    })
  })
}

async compute_data(data: any) {
  return new Promise(resolve => {
            for (var i = 0; i < data.length; i++) {
                      data[i].pos = i + 1;
                      if (i == data.length - 1) {
                                resolve(data);
                      }
            }
  });
}

///

}
