import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SelectCourseByProgramIdComponent } from 'src/app/common/select-course-by-program-id/select-course-by-program-id.component';
import { SelectProgramByDepartmentIdComponent } from 'src/app/common/select-program-by-department-id/select-program-by-department-id.component';
import { ServiceService } from 'src/app/service.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-add-attandance-record',
  templateUrl: './add-attandance-record.component.html',
  styleUrls: ['./add-attandance-record.component.scss']
})
export class AddAttandanceRecordComponent implements OnInit {

  fileUpload = new FormData();
  course: any = null;

  program: any = null;
  divisions: any = null;
  public programDetails: any = null;

  report:any=null;
  public Form: FormGroup;
  public other : FormArray = this.fb.array([]);


  year: any[] = [
    {year: '2018-2019', },
    {year: '2019-2020', },
    {year: '2020-2021', },
    {year: '2021-2022', },
  ];

  constructor(
    private fb: FormBuilder,
    public service: ServiceService,
    @Inject(MAT_DIALOG_DATA)
    public data : any,
    public dialogRef: MatDialogRef<AddAttandanceRecordComponent>,
    public dialog: MatDialog,
    public router: Router
  )
  {

    this.Form = this.fb.group({
      academic_year: this.fb.control('',Validators.required),
      year: this.fb.control('',Validators.required),
      semester: this.fb.control('',Validators.required),
      class: this.fb.control('',Validators.required),
      div: this.fb.control('',Validators.required),
      program: this.fb.control('',Validators.required),
      c_code: this.fb.control('',Validators.required),
      c_name: this.fb.control('',Validators.required),
      month: this.fb.control('',Validators.required),

      //upload section is also there

     // other:this.fb.array([this.createother()]),
    })
   }

  ngOnInit(): void {}


  reportUpload(event: any){
    this.report = event.target.files[0];
  }
  submitForm(){

    let ext =  this.report?.name.split('.').pop();
    let filename: any = null;
    if(this.report != undefined && this.report != null ) {
      filename = uuidv4() + "." + ext;
      this.fileUpload.append("files", this.report, filename) ;
    } else {
      console.log(`document not provided.`);
    }

    let finalData: any = {
      academicDetail: {
        academicYear: this.Form.get("academic_year").value
      },
      month: this.Form.get("month").value,
      attendance: filename
    }

  this
  .service
  .postData(`/attendance-record/division/${this.Form.get("div").value.id}/course/${this.course.courseId}/user/${localStorage.getItem("userId")}`, finalData).subscribe((res: any) => {
  console.log(res);

  if(this.fileUpload.getAll("files").length > 0){
    this.service.postData("/upload", this.fileUpload).subscribe(res2 => {
      console.log(res2);
    });
  }
  }, (err: any) => {

    console.warn("Error try again later!!");
                    },
    () => {
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
      this.service.getData("/program-detail/program/" + result.programId).subscribe((res: any) => {
        this.programDetails = res;
        console.log(res);
      })
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
    console.log(result);
    this.Form.get("c_code").setValue(result.code);
    this.Form.get("c_name").setValue(result.name);
    this.Form.get("year").setValue(result.year);
    this.Form.get("semester").setValue(result.semester);
  })
}

classChanges(event: any) {
  console.log(event.value);

  if(event.value != "" && event.value != null && event.value != undefined) {
    this.divisions = event.value.divisions;
  }
}

}

interface other_type {
  other_type: String;
 }


