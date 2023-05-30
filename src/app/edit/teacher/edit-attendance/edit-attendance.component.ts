import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SelectCourseByProgramIdComponent } from 'src/app/common/select-course-by-program-id/select-course-by-program-id.component';
import { SelectProgramByDepartmentIdComponent } from 'src/app/common/select-program-by-department-id/select-program-by-department-id.component';
import { ServiceService } from 'src/app/service.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-edit-attendance',
  templateUrl: './edit-attendance.component.html',
  styleUrls: ['./edit-attendance.component.scss']
})
export class EditAttendanceComponent implements OnInit {

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
    public dialogRef: MatDialogRef<EditAttendanceComponent>,
    public dialog: MatDialog,
    public router: Router,
    private http: HttpClient,
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

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    console.log(this.data);

    this.service.getData("/program-detail/program/" + this.data.academicDetail.course.program.programId).subscribe((res: any) => {
      this.programDetails = res;
      console.log(res);
      this.divisions = this.programDetails.divisions;
      this.program = this.data.academicDetail.course.program;
      this.course = this.data.academicDetail.course;
      this.Form.get("academic_year").setValue(this.data.academicDetail.academicYear);
      this.Form.get("year").setValue(this.data.academicDetail.course.year);
      this.Form.get("semester").setValue(this.data.academicDetail.course.semester);
      this.Form.get("class").setValue(this.programDetails);
      this.Form.get("div").setValue(this.data.academicDetail.division.id);
      this.Form.get("program").setValue(this.data.academicDetail.course.program.programName);
      this.Form.get("c_code").setValue(this.data.academicDetail.course.code);
      this.Form.get("c_name").setValue(this.data.academicDetail.course.name);
      this.Form.get("month").setValue(this.data.month);
    })

    this.http.get(`${this.service.BASE_URL}/resources/uploads/${this.data?.attendance}`,{responseType: 'blob'}).subscribe(data => {
      this.report = data;
      this.report.name = this.data?.attendance;
    });
  }


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
      id: this.data.id,
      academicDetail: {
        academicYear: this.Form.get("academic_year").value,
        course: {
          courseId: this.course.courseId
        },
        division: {
          id: this.Form.get("div").value
        }
      },
      month: this.Form.get("month").value,
      attendance: filename,
      user: {
        userId: localStorage.getItem("userId")
      }
    }

  this
  .service
  .putData(`/attendance-record`, finalData).subscribe((res: any) => {
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