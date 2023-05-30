import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SelectProgramByCollegeIdComponent } from 'src/app/common/select-program-by-college-id/select-program-by-college-id.component';
import { ServiceService } from 'src/app/service.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-add-student-data-by-academic-detail',
  templateUrl: './add-student-data-by-academic-detail.component.html',
  styleUrls: ['./add-student-data-by-academic-detail.component.scss']
})
export class AddStudentDataByAcademicDetailComponent implements OnInit {

  studentDataList: any = true;
  lowerSection: boolean = true;
  course: any = null;
  program: any = null;
  divisions: any = null;
  programDetails: any = null;
  streams: any;
  classData: any;


  public Form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public service: ServiceService,
    public dialogRef: MatDialogRef<AddStudentDataByAcademicDetailComponent>,
    public dialog: MatDialog,
    public router: Router
  ) {
    this.Form = this.fb.group({
      academic_year: this.fb.control('', Validators.required),
      class: this.fb.control('', Validators.required),
      div: this.fb.control('', Validators.required),
      // program: this.fb.control('', Validators.required),
      faculty: this.fb.control('', Validators.required)
    })

  }

  ngOnInit(): void {
    this.fetchStream();
  }

  upload1(event: any) {
    // this.service.excelToJson(event).subscribe((res:any) => {
    //   this.studentDataList = res;
    //   console.log(this.studentDataList);
    // });
    const target: DataTransfer = <DataTransfer>(event.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {

      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      let data = XLSX.utils.sheet_to_json(ws, { range: 4 });
      this.studentDataList = data;
      console.log(this.studentDataList);
    };
    reader.readAsBinaryString(target.files[0]);
  }

  submitStudentData() {
    let studentList: any[] = [];
    let parentList: any[] = [];
    this.studentDataList.forEach((student: any) => {

      studentList.push({
        firstName: student['First name']?.trim(),
        middleName: student['Middle name']?.trim(),
        lastName: student['Last name']?.trim(),
        phone: student['Phone No.'],
        email: student['E-Mail']?.trim(),
        gender: student['Gender'],
        password: 123456,
        student: {
          academicYear: this.Form.get("academic_year")?.value,
          enrollmentNo: student['Enrollment No.'],
          rollNo: student['Roll No.'],
          aadharNumber: student['Adhar Card No.'],
          caste: student['Caste'],
          category: student['Category'],
          correspondenceAddress: student['Correspondence Address'],
          degreeApplied: student['Degree Applied'],
          medium: student['Medium'],
          feeCategory: student['Fee Category'],
          nameOfTheExam: student['Name Of The Exam'],
          seatNo: student['Seat No.'],
          universityOrBoard: student['University/Board'],
          percentage: student['Percentage'],
          annualIncome: student['Annual Income'],
          admissionDate: student['Admission Date'],
          fatherOrGuardianName: student["Father's/Guardian's Name"],
          relation: student['Relation'],
          classLastAttended: student['Class Last Attended'],
          generalSubject: student['General Subject'],
          specialSubject: student['Special Subject'],
          permanentAddress: student['Permanent Address'],
          alternateNumber: student['Mobile No.'],
          documentSubmitted: student["Document's Submitted"],
          parentOccupation: student['Parents Occupation'],
          officePhoneNo: student['Phone No.(Office)'],
          officeAddress: student['Office Address'],
          registerNumber: student['Register No.'],
          birthDate: student['Birth Date'],
          birthPlace: student['Birth Place'],
          motherName: student["Mother's Name"],
          eligibilityNo: student['Eligibility No'],
          studentIdNo: student['Student ID No'],
          previousClass: student['Previous Class'],
          nationality: student['Nationality'],
          admissionFormNo: student['Admission Form No'],
          religion: student['Religion'],
          area: student['Area'],
          studentStatus: student['Student Status']
        }
      });

      console.log(student["Parent email"]);
      if (student["Parent email"] != null && student["Parent email"] != undefined && student["Parent email"] != "") {
        parentList.push({
          firstName: student["Father's/Guardian's Name"],
          email: student["Parent email"],
          password: 123456
        })
      }

    });

    console.log("div==>",this.Form.get("div").value.id);

    this.service.getUserWithUserId().subscribe((user: any) => {
      console.log("class",this.Form.get("class"))
      this.service.postData(`/user/bulk/student/division/${this.Form.get("div").value.id}/college/${user.college.id}`, studentList).subscribe((res: any) => {
        console.log("Submitted",res);
        this.service.postData("/student-data/college/" + user.college.id, res[0].student.academicYear).subscribe((res3: any) => {
          console.log(res3);
        });
        if (parentList.length > 0) {
          this.service.postData("/user/parent/bulk/college/" + user.college.id, parentList).subscribe((res2: any) => {
            console.log(res2)
          }, (err2: any) => {
            console.warn(err2);
            this.dialogRef.close();
          }, () => {
            this.dialogRef.close();
          })
        } else {
          this.dialogRef.close();
        }
      }, (err: any) => {
        console.log(err);
        if (err.error.httpStatus == "CONFLICT") {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.error.message,
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error try again later Oops...!!!',
          });
        }
        this.dialogRef.close();
      })
    }, (er: any) => {
      console.log(er);
    });
    
    Swal.fire({
      title: 'Submitted Successfully?',
      text: "Congratulations!",
      icon: 'info',
      // showCancelButton: true,
      // confirmButtonColor: '#3085d6',
      // cancelButtonColor: '#d33',
      // confirmButtonText: 'Yes, delete it!'
    })
  }

  // getProgram() {
  //   this.service.getUserWithUserId().subscribe((user: any) => {
  //     // console.log(user.teacher)
  //     const programDialogRef = this.dialog.open(SelectProgramByCollegeIdComponent ,{width: "80%",height: "86vh",panelClass: 'full-width-dialog', data: {collegeId : user.college.id}});
  //     programDialogRef.afterClosed().subscribe((result: any) => {
  //       this.program = result;
  //       // console.log(result);
  //       this.Form.get("program").setValue(result.programName);
  //       this.service.getData("/program-detail/program/" + result.programId).subscribe((res: any) => {
  //         this.programDetails = res;
  //         // console.log(res);
  //       })
  //     })
  //   }, (err: any) => {
  //     alert("User authentication expired!!. Login again to continue.");
  //     this.router.navigateByUrl("");
  //   });
  // }
  changeStream(event: any) {
    // this.department = this.Form.get('department')
    if (event.value != "" && event.value != null && event.value != undefined) {
      this.Form.get("class")?.enable();
      this.fetchClass()
    } else {
      this.Form.get("class")?.disable();
    }
  }
  fetchStream() {
    this.service.getData("/stream").subscribe((res: any) => {
      console.log(res);
      this.streams = res;
    }, (err: any) => {
      alert("Error try again!!!");
    });
  }
  fetchClass(): any {
    let data = this.Form.get("faculty")?.value;


    if (data !== undefined && data.id !== undefined) {
      this.service.getData("/stream-detail/stream/" + data.id).subscribe((res: any) => {
        console.log(res);
        if (res != null && res != undefined) {
          this.classData = res
        }
        // this.departments = res;
      }, (err: any) => {
        alert("Error try again later!!! Second");
      });
    }

  }

  classChanges(event: any) {
    // console.log(event.value);

    if (event.value != "" && event.value != null && event.value != undefined) {
      this.divisions = event.value.divisions;
    }
  }
  divChange(event: any) {
    console.log(event.value);

    if (event.value != "" && event.value != null && event.value != undefined) {

      // this.divisions = event.value.divisions;
    }
  }

}
