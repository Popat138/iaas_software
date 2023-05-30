import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SelectProgramByCollegeIdComponent } from 'src/app/common/select-program-by-college-id/select-program-by-college-id.component';
import { ServiceService } from 'src/app/service.service';

@Component({
  selector: 'app-edit-student-data-by-academic-detail',
  templateUrl: './edit-student-data-by-academic-detail.component.html',
  styleUrls: ['./edit-student-data-by-academic-detail.component.scss']
})
export class EditStudentDataByAcademicDetailComponent implements OnInit {

  studentDataList:any = true;
  lowerSection: boolean = true;
  course: any = null;
  program: any = null;
  divisions: any = null;
  programDetails: any = null;

  public Form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public service: ServiceService,
    public dialogRef: MatDialogRef<EditStudentDataByAcademicDetailComponent>,
    public dialog: MatDialog,
    public router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    this.Form = this.fb.group({
      academic_year: this.fb.control('',Validators.required),
      class: this.fb.control('',Validators.required),
      div: this.fb.control('',Validators.required),
      program: this.fb.control('',Validators.required),
      firstname: this.fb.control('',Validators.required),
      middlename: this.fb.control('',Validators.required),
      lastname: this.fb.control('',Validators.required),
      phone: this.fb.control('',Validators.required),
    })
    
    }

  ngOnInit(): void {
    console.log(this.data);
    this.getData();
  }

  getData() {
    this.service.getData("/program-detail/division/" + this.data.student.division.id).subscribe((programDetail: any) => {
      console.log(programDetail);

      this.service.getData("/program-detail/program/" + programDetail.program.programId).subscribe((programDetails) => {
        this.programDetails = programDetails;
        this.program = programDetail.program;
        this.divisions = programDetail.divisions;
        this.Form.get("academic_year").setValue(this.data.student?.academicYear);
        this.Form.get("class").setValue(programDetail);
        this.Form.get("div").setValue(this.data.student?.division?.id);
        this.Form.get("program").setValue(programDetail?.program?.programName);
        this.Form.get("firstname").setValue(this.data?.firstName);
        this.Form.get("middlename").setValue(this.data?.middleName);
        this.Form.get("lastname").setValue(this.data?.lastName);
        this.Form.get("phone").setValue(this.data?.phone);
      });
    });
  }

  submitStudentData() {

    let finalData = {
      userId: this.data.userId,
      firstName: this.Form.get("firstname")?.value,
      middleName: this.Form.get("middlename")?.value,
      lastName: this.Form.get("lastname")?.value,
      phone: this.Form.get("phone")?.value,
      student: {
        academicYear: this.Form.get("academic_year")?.value
      }
    }

    this.service.getUserWithUserId().subscribe((user: any) => {
      this.service.putData(`/user/student/division/${this.Form.get("div").value}/college/${user.college.id}`, finalData).subscribe((res: any) => {
        this.dialogRef.close();
      }, (err: any)=> {
        console.log(err);
        this.dialogRef.close();
      });
    });
    
  }

  getProgram() {
    this.service.getUserWithUserId().subscribe((user: any) => {
      // console.log(user.teacher)
      const programDialogRef = this.dialog.open(SelectProgramByCollegeIdComponent ,{width: "80%",height: "86vh",panelClass: 'full-width-dialog', data: {collegeId : user.college.id}});
      programDialogRef.afterClosed().subscribe((result: any) => {
        this.program = result;
        // console.log(result);
        this.Form.get("program").setValue(result.programName);
        this.service.getData("/program-detail/program/" + result.programId).subscribe((res: any) => {
          this.programDetails = res;
          // console.log(res);
        })
      })
    }, (err: any) => {
      alert("User authentication expired!!. Login again to continue.");
      this.router.navigateByUrl("");
    });
  }
  
  classChanges(event: any) {
    // console.log(event.value);
  
    if(event.value != "" && event.value != null && event.value != undefined) {
      this.divisions = event.value.divisions;
    }
  }
}
