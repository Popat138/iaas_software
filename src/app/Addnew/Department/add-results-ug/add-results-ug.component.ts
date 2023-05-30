import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SelectProgramByDepartmentIdComponent } from 'src/app/common/select-program-by-department-id/select-program-by-department-id.component';
import { ServiceService } from 'src/app/service.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-results-ug',
  templateUrl: './add-results-ug.component.html',
  styleUrls: ['./add-results-ug.component.scss']
})
export class AddResultsUgComponent implements OnInit {


  program: any = null;
public Form: FormGroup;
constructor(

  private fb: FormBuilder,
  public service: ServiceService,
  @Inject(MAT_DIALOG_DATA)
  public data : any,
  public dialogRef: MatDialogRef<AddResultsUgComponent>,
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
}

submitForm(){

let data : any = {
  year : this.Form.get("year")?.value,
  studentAdmitted : this.Form.get("no_of_student_admitted")?.value,
  studentAppeared : this.Form.get("no_of_student_appeared")?.value,
  studentPassed : this.Form.get("no_of_student_passed")?.value,

}

this.service.postData("/ug-result/program/" + this.program.programId, data).subscribe((res: any) => {
console.log(res);
}, (err: any) => {
console.warn("Error try again later!!");
}, () => {
this.dialogRef.close();
})
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
