import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { AddNewStudentDataComponent } from '../Addnew/add-new-student-data/add-new-student-data.component';
import { DownloadService } from '../download.service';
import { EditStudentDataComponent } from '../edit/Office/edit-student-data/edit-student-data.component';
import { ServiceService } from '../service.service';
import { ViewRollCallListComponent } from '../View/view-roll-call-list/view-roll-call-list.component';


@Component({
  selector: 'app-student-data',
  templateUrl: './student-data.component.html',
  styleUrls: ['./student-data.component.scss']
})
export class StudentDataComponent implements OnInit {



  constructor(

    public dialog : MatDialog,
    private service : ServiceService,
    public download: DownloadService

  ) { }

  displayedColumns: string[] = [
  'academicYear',
  // 'roleCallList',
  // 'studentList',
  'download',
  // 'edit',
  'delete'
];
  studentData : any = null;
  dataSource!:MatTableDataSource<StudentDataComponent>;

  ngOnInit(): void {

    this.dataSource = new MatTableDataSource();
    this.fetchStudentData();

  }

  fetchStudentData() {
    this.service.getData("/student-data").subscribe((res: any) => {
      console.log(res);
      this.studentData = res;
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
            //  this.dataSource.sort = this.sort;
      });
    }, (err: any) => {
      console.warn("No committee available!!");
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


edit(row){
  const dialogRef = this.dialog.open(EditStudentDataComponent,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data: row});
}


delete(row){
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
    this.service.deleteData('/student-data/'+row['id']).subscribe(response => {
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

     const dialogRef = this.dialog.open(AddNewStudentDataComponent ,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data : {"committeeId":2}});
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

  studentlist() {}

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
}
