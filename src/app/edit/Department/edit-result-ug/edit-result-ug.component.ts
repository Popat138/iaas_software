import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SelectProgramByDepartmentIdComponent } from 'src/app/common/select-program-by-department-id/select-program-by-department-id.component';
import { ServiceService } from 'src/app/service.service';

@Component({
  selector: 'app-edit-result-ug',
  templateUrl: './edit-result-ug.component.html',
  styleUrls: ['./edit-result-ug.component.scss']
})
export class EditResultUgComponent implements OnInit {

  program: any = null;
public Form: FormGroup;
constructor(

  private fb: FormBuilder,
  public service: ServiceService,
  @Inject(MAT_DIALOG_DATA)
  public rowdata : any,
  public dialogRef: MatDialogRef<EditResultUgComponent>,
  public dialog: MatDialog,
  public router: Router

) {
  // this.userid = data.userid;
  this.Form = this.fb.group({

    year: this.fb.control('',Validators.required),
    programme:this.fb.control('',Validators.required),
    no_of_student_admitted: this.fb.control('',Validators.required),
    no_of_student_appeared: this.fb.control('',Validators.required),
    no_of_student_passed: this.fb.control('',Validators.required),

  //  academic_calander: this.fb.array([this.createacademic_calander()]),
    // meeting_details: this.fb.array([this.createmeeting_details()]),
    // report_activity: this.fb.array([this.createreport_activity()])
  })
 }

ngOnInit(): void {
  this.getData();
}

getData() {
  console.log(this.rowdata);
  this.program = this.rowdata.program;
  this.Form.get("year").setValue(this.rowdata.year);
  this.Form.get("programme").setValue(this.rowdata.program.programName);
  this.Form.get("no_of_student_admitted").setValue(this.rowdata.studentAdmitted);
  this.Form.get("no_of_student_appeared").setValue(this.rowdata.studentAppeared);
  this.Form.get("no_of_student_passed").setValue(this.rowdata.studentPassed);
}

submitForm(){

let data : any = {
  id: this.rowdata.id,
  year : this.Form.get("year")?.value,
  studentAdmitted : this.Form.get("no_of_student_admitted")?.value,
  studentAppeared : this.Form.get("no_of_student_appeared")?.value,
  studentPassed : this.Form.get("no_of_student_passed")?.value,
  program: {
    programId : this.program.programId
  }
}

this.service.putData("/ug-result", data).subscribe((res: any) => {
console.log(res);
}, (err: any) => {
console.warn("Error try again later!!");
}, () => {
this.dialogRef.close();
})


}

getProgram() {
  this.service.getUserWithUserId().subscribe((user: any) => {
    // console.log(user.teacher)
    const programDialogRef = this.dialog.open(SelectProgramByDepartmentIdComponent ,{width: "80%",height: "86vh",panelClass: 'full-width-dialog', data: {departmentId : user.hod.department.id}});
    programDialogRef.afterClosed().subscribe((result: any) => {
      this.program = result;
      // console.log(result);
      this.Form.get("programme").setValue(result.programName);
    })
  }, (err: any) => {
    alert("User authentication expired!!. Login again to continue.");
    this.router.navigateByUrl("");
  });
}

}
