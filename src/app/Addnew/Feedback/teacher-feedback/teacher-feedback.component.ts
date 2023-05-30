import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SelectCourseByProgramIdComponent } from 'src/app/common/select-course-by-program-id/select-course-by-program-id.component';
import { SelectProgramByCollegeIdComponent } from 'src/app/common/select-program-by-college-id/select-program-by-college-id.component';
import { SelectProgramByDepartmentIdComponent } from 'src/app/common/select-program-by-department-id/select-program-by-department-id.component';
import { SelectTeacherByCollegeComponent } from 'src/app/common/select-teacher-by-college/select-teacher-by-college.component';
import { ServiceService } from 'src/app/service.service';

@Component({
  selector: 'app-teacher-feedback',
  templateUrl: './teacher-feedback.component.html',
  styleUrls: ['./teacher-feedback.component.scss']
})
export class TeacherFeedbackComponent implements OnInit {



  coLength: any = null;
  lowerSection: boolean = true;
  course: any = null;
  program: any = null;
  divisions: any = null;
  subjects: any = null;
  teacher: any = null;

  programDetails: any = null;

  public Form: FormGroup;

  year: any[] = [
    {year: '2018-2019', },
    {year: '2019-2020', },
    {year: '2020-2021', },
    {year: '2021-2022', },
  ];

  tests: any[] = [
    {test: "First"},
    {test: "Second"},
    {test: "Third"},
    {test: "Fourth"}
  ];

  types: any[] = [
    {type: "Internal Test", value: "internal"},
    {type: "External Test", value: "external"}
  ];

  constructor(
    private fb: FormBuilder,
    public service: ServiceService,
    public dialogRef: MatDialogRef<TeacherFeedbackComponent>,
    public dialog: MatDialog,
    public router: Router,

  ) {
    this.Form = this.fb.group({
      academic_year: this.fb.control('',Validators.required),
      // year: this.fb.control('',Validators.required),
      // semester: this.fb.control('',Validators.required),
      class: this.fb.control('',Validators.required),
      div: this.fb.control('',Validators.required),
      subject: this.fb.control('',Validators.required),
      program: this.fb.control('',Validators.required),
      // c_code: this.fb.control('',Validators.required),
      // c_name: this.fb.control('',Validators.required),
      link:this.fb.control('',Validators.required),
      teacher:this.fb.control('',Validators.required),
    })
  }
  ngOnInit(): void {


  }

  getTeacher() {
    const teacherDialogRef = this.dialog.open(SelectTeacherByCollegeComponent ,{width: "80%",height: "86vh",panelClass: 'full-width-dialog'});
    teacherDialogRef.afterClosed().subscribe((result: any) => {
      this.teacher = result;
      // console.log(result);
      this.Form.get("teacher").setValue(result.firstName + " " + result.middleName+ " " + result.lastName);
    })
  }

  getProgram() {
    this.service.getUserWithUserId().subscribe((user: any) => {
      // console.log(user.teacher)
      const programDialogRef = this.dialog.open(SelectProgramByCollegeIdComponent ,{width: "80%",height: "86vh",panelClass: 'full-width-dialog', data: {collegeId : user.college.id}});
      programDialogRef.afterClosed().subscribe((result: any) => {
        this.program = result;
        // console.log(result);
        this.Form.get("program").setValue(result.programName);
        this.service.getData("/stream-detail/stream/" + result.stream.id).subscribe((res: any) => {
          this.programDetails = res;
          // console.log(res);
        })
      })
    }, (err: any) => {
      alert("User authentication expired!!. Login again to continue.");
      this.router.navigateByUrl("");
    });
  }


  // getCourses() {
  //   const courseDialogRef = this.dialog.open(SelectCourseByProgramIdComponent ,{width: "80%",height: "86vh",panelClass: 'full-width-dialog', data: {programId : this.program.programId}});
  //   courseDialogRef.afterClosed().subscribe((result: any) => {
  //     this.course = result;
  //     // console.log(result);
  //     this.Form.get("c_code").setValue(result.code);
  //     this.Form.get("c_name").setValue(result.name);
  //     this.Form.get("year").setValue(result.year);
  //     this.Form.get("semester").setValue(result.semester);
  //   })
  // }
  classChanges(event: any) {
    // console.log(event.value);

    if(event.value != "" && event.value != null && event.value != undefined) {
      this.divisions = event.value.divisions;
    }
  }

  
  divisionChanges(event: any) {
    // console.log(event.value);

    if(event.value != "" && event.value != null && event.value != undefined) {
      this.subjects = event.value.subjects;
    }
  }
  submitForm(){
    let finalData: any = {
      academicDetail: {
        academicYear: this.Form.get("academic_year").value
      },
      program:{
        programId:this.program.programId
      },
      link: this.Form.get("link").value
    }

    this
    .service
    .postData(
      `/teacher-feedback/subject/${this.Form.get("subject").value.id}/user/${this.teacher.userId}`, 
      finalData
    ).subscribe((res: any) => {
      console.log(res);
    }, (err: any) => {
      console.log(err);
      this.dialogRef.close();
    }, () => {
    this.dialogRef.close();
   });
  }
}

