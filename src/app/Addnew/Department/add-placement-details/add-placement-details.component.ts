import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SelectProgramByDepartmentIdComponent } from 'src/app/common/select-program-by-department-id/select-program-by-department-id.component';
import { SelectStudentByDepartmentIdComponent } from 'src/app/common/select-student-by-department-id/select-student-by-department-id.component';
import { SelectUserByDepartmentIdComponent } from 'src/app/common/select-user-by-department-id/select-user-by-department-id.component';
import { SelectStudentByDivisionComponent } from 'src/app/common/select-student-by-division/select-student-by-division.component';
import { ServiceService } from 'src/app/service.service';
import { v4 as uuidv4 } from 'uuid';
import { SelectStudentByProgramIdComponent } from 'src/app/common/select-student-by-program-id/select-student-by-program-id.component';
@Component({
  selector: 'app-add-placement-details',
  templateUrl: './add-placement-details.component.html',
  styleUrls: ['./add-placement-details.component.scss']
})
export class AddPlacementDetailsComponent implements OnInit {

  user: any = null;
  program: any = null;
  fileUpload = new FormData();
  uploads: any = null;
  divisions: any = null;
  toggle=true;
  fileName: string = "";
  public Form: FormGroup;
  public programDetails: any = null;

  constructor(

    private fb: FormBuilder,
    public service: ServiceService,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    public dialogRef: MatDialogRef<AddPlacementDetailsComponent>,
    public dialog: MatDialog,
    public router: Router


  ) {
    // this.userid = data.userid;
    this.Form = this.fb.group({
      class: this.fb.control('',Validators.required),
      div: this.fb.control('',Validators.required),
      year: this.fb.control('', Validators.required),
      program: this.fb.control('', Validators.required),
      student_name: this.fb.control('', Validators.required),
      student_contact:this.fb.control('', Validators.required),
      job_title: this.fb.control('', Validators.required),
      pay_package:this.fb.control('', Validators.required),
      detail_of_organization: this.fb.control('', Validators.required),
      // no_of_student_passed: this.fb.control('',Validators.required),

      //  academic_calander: this.fb.array([this.createacademic_calander()]),
      // meeting_details: this.fb.array([this.createmeeting_details()]),
      // report_activity: this.fb.array([this.createreport_activity()])
    })
  }

  ngOnInit(): void {
  }
  upload(event: any) {
    this.uploads = event.target.files[0];
    this.fileName=event.target.files[0].name;
    this.toggle = !this.toggle;
  }

  submitForm() {

    let photographExt = this.uploads?.name.split('.').pop();
    let filename: any = null;
    if (this.uploads != undefined && this.uploads != null) {
      filename = uuidv4() + "." + photographExt;
      this.fileUpload.append("files", this.uploads, filename);
    } else {
      console.log(`document not provided.`);
    }

    let data: any = {
      year: this.Form.get("year")?.value,
      programme: this.Form.get("programme")?.value,
      contactStudent: this.Form.get("student_contact")?.value,
      jobTitle: this.Form.get("job_title")?.value,
      detailOfOrganization: this.Form.get("detail_of_organization")?.value,
      payPackage: this.Form.get("pay_package")?.value,
      placementLetter: filename
    }

    this.service.postData(`/placement-detail/program/${this.program.programId}/user/${this.user.userId}`, data).subscribe((res: any) => {
      console.log(res);
      if (this.fileUpload.getAll("files").length > 0) {
        this.service.postData("/upload", this.fileUpload).subscribe(res2 => {
          console.log(res2);
        });
      }
    }, (err: any) => {
      console.warn("Error try again later!!");
    }, () => {
      this.dialogRef.close();
    })


  }
  
  classChanges(event: any) {
    console.log(event.value);
  
    if(event.value != "" && event.value != null && event.value != undefined) {
      this.divisions = event.value.divisions;
    }
  }
  
  getStudent() {
    this.service.getUserWithUserId().subscribe((user: any) => {
      // console.log(user.teacher)
      const programDialogRef = this.dialog.open(SelectStudentByDivisionComponent, { width: "80%", height: "86vh", panelClass: 'full-width-dialog', data: { divisionId:this.Form.get("div")?.value.id ,academicYear:this.Form.get("year")?.value} });
      programDialogRef.afterClosed().subscribe((result: any) => {
        this.user = result;
        // console.log(result);
        this.Form.get("student_name").setValue(result.firstName + result.middleName + result.lastName);
      })
    }, (err: any) => {
      alert("User authentication expired!!. Login again to continue.");
      this.router.navigateByUrl("");
    });
  }

  getProgram() {
    this.service.getUserWithUserId().subscribe((user: any) => {
      // console.log(user.teacher)
      const programDialogRef = this.dialog.open(SelectProgramByDepartmentIdComponent, { width: "80%", height: "86vh", panelClass: 'full-width-dialog', data: { departmentId: user.hod.department.id } });
      programDialogRef.afterClosed().subscribe((result: any) => {
        this.program = result;
        console.log(result, this.Form);
        this.Form.get("program").setValue(result.programName);

        // this.fetchClass(result);
        // this.service.getData("/program-detail/program/" + result.programId).subscribe((res: any) => {
        //   this.programDetails = res;
        //   console.log(res);
        // })
        this.service.getData("/stream-detail/stream/" + result.stream.id).subscribe((res: any) => {
                console.log(res);
                if (res != null && res != undefined) {
                  this.programDetails = res
                }
                // this.departments = res;
              }, (err: any) => {
                alert("Error try again later!!!");
              });
      })
    }, (err: any) => {
      alert("User authentication expired!!. Login again to continue.");
      this.router.navigateByUrl("");
    });
  }

}
