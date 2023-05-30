import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SelectCourseByProgramIdComponent } from 'src/app/common/select-course-by-program-id/select-course-by-program-id.component';
import { SelectProgramByDepartmentIdComponent } from 'src/app/common/select-program-by-department-id/select-program-by-department-id.component';
import { ServiceService } from 'src/app/service.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-add-results',
  templateUrl: './add-results.component.html',
  styleUrls: ['./add-results.component.scss']
})
export class AddResultsComponent implements OnInit {


  fileUpload = new FormData();
  program:any = null;
  course:any = null;

  report:any=null;
  public Form: FormGroup;
  public other : FormArray = this.fb.array([]);
  constructor(
    private fb: FormBuilder,
    public service: ServiceService,

    public dialog: MatDialog,
    public router: Router,
    @Inject(MAT_DIALOG_DATA)
    public data : any,
    public dialogRef: MatDialogRef<AddResultsComponent>
  )
  {

    this.Form = this.fb.group({

      year: this.fb.control('',Validators.required),
     // semester: this.fb.control('',Validators.required),
     // class: this.fb.control('',Validators.required),
     // div: this.fb.control('',Validators.required),
      program: this.fb.control('',Validators.required),
      c_code: this.fb.control('',Validators.required),
      c_name: this.fb.control('',Validators.required),
     // month: this.fb.control('',Validators.required),

      //upload section is also there

     // other:this.fb.array([this.createother()]),
    })
   }

  ngOnInit(): void {}

  // get otherControl() {
  //   this.other = this.Form.get('other') as FormArray;
  //   return this.other.controls;
  // }

  // createother(): FormGroup {
  //   return this.fb.group({
  //   no_of_lectures: this.fb.control('',Validators.required),
  //   no_of_tutorials: this.fb.control('',Validators.required),
  //   topics: this.fb.control('',Validators.required),
  //   assignments: this.fb.control('',Validators.required),
  //   mode_of_teaching: this.fb.control('',Validators.required),


  // });
  // }



  // addother(): void {
  //   this.other = this.Form.get('other') as FormArray;
  //   this.other.push(this.createother());
  // }

  // removeother(i: number) {
  //   this.other.removeAt(i);
  // }
  reportUpload(event: any){
    this.report = event.target.files[0];
  }
  submitForm(){

    let Ext =  this.report?.name.split('.').pop();
    let Filename: any = null;
    if(this.report != undefined && this.report != null ) {
      Filename = uuidv4() + "." + Ext
      this.fileUpload.append("files", this.report, Filename)
    } else {
      console.log(`document not provided.`);
    }

    let data : any = {
      academicDetail: {
        academicYear: this.Form.get("year").value,
      },
      resultDoc: Filename
    }

    this.service.postData(`/result/course/${this.course.courseId}/user/${localStorage.getItem("userId")}`, data).subscribe((res: any) => {
      console.log(res);
      if(this.fileUpload.getAll("files").length > 0){
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


getProgram() {
  this.service.getUserWithUserId().subscribe((user: any) => {
    console.log(user.teacher)
    const programDialogRef = this.dialog.open(SelectProgramByDepartmentIdComponent ,{width: "80%",height: "86vh",panelClass: 'full-width-dialog', data: {departmentId : user.teacher.department.id}});
    programDialogRef.afterClosed().subscribe((result: any) => {
      this.program = result;
      console.log(result);
      this.Form.get("program").setValue(result.programName);
    })
  }, (err: any) => {
    alert("User authentication expired!!. Login again to continue.");
    this.router.navigateByUrl("");
  });
}

getCourses() {
  const courseDialogRef = this.dialog.open(SelectCourseByProgramIdComponent ,{width: "80%",height: "86vh",panelClass: 'full-width-dialog', data: {programId : this.program.programId}});
  courseDialogRef.afterClosed().subscribe((result: any) => {
    this.course = result;
    this.Form.get("c_code").setValue(result.code);
    this.Form.get("c_name").setValue(result.name);
  })
}

}

interface other_type {
  other_type: String;
 }



