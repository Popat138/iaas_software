import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SelectCourseByProgramIdComponent } from 'src/app/common/select-course-by-program-id/select-course-by-program-id.component';
import { SelectProgramByDepartmentIdComponent } from 'src/app/common/select-program-by-department-id/select-program-by-department-id.component';
import { ServiceService } from 'src/app/service.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-teaching-plan',
  templateUrl: './add-teaching-plan.component.html',
  styleUrls: ['./add-teaching-plan.component.scss']
})
export class AddTeachingPlanComponent implements OnInit {

  course: any = null;
  teacher:any=null;
  user:any=null;
  program: any = null;
  divisions: any = null;
  programDetails: any = null;

  year: any[] = [
    {year: '2018-2019', },
    {year: '2019-2020', },
    {year: '2020-2021', },
    {year: '2021-2022', },
  ];


  public Form: FormGroup;
  public other : FormArray = this.fb.array([]);
  constructor(
    private fb: FormBuilder,
    public service: ServiceService,
    @Inject(MAT_DIALOG_DATA)
    public data : any,
    public dialogRef: MatDialogRef<AddTeachingPlanComponent>,
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
      other:this.fb.array([this.createother()]),
    })
   }

  ngOnInit(): void {}

  get otherControl() {
    this.other = this.Form.get('other') as FormArray;
    return this.other.controls;
  }

  createother(): FormGroup {
    return this.fb.group({
    lec_dates: this.fb.control('',Validators.required), 
    no_of_lectures: this.fb.control('',[Validators.required, Validators.pattern(new RegExp("[0-9]"))]),
    no_of_tutorials: this.fb.control('',[Validators.required, Validators.pattern(new RegExp("[0-9]"))]),
    topics: this.fb.control('',Validators.required),
    assignments: this.fb.control('',Validators.required),
    mode_of_teaching: this.fb.control('',Validators.required),
  });
  }

  addother(): void {
    this.other = this.Form.get('other') as FormArray;
    this.other.push(this.createother());
  }

  removeother(i: number) {
    this.other.removeAt(i);
  }

  submitForm(){
  let courseLectures: any[] = [];
  for(let i = 0; i<this.other.length; i++) {
    courseLectures.push({
      month: this.Form.get("month").value,
      week: i+1,
      lecDates: this.other.at(i).get("lec_dates").value,
      noOfLectures: this.other.at(i).get("no_of_lectures").value,
      nofOfTutorials: this.other.at(i).get("no_of_tutorials").value,
      topic: this.other.at(i).get("topics").value,
      assignment: this.other.at(i).get("assignments").value,
      modeOfTeaching: this.other.at(i).get("mode_of_teaching").value
    })
  }

  let finalData: any = {
    academicDetail: {
      academicYear: this.Form.get("academic_year").value
    },
    courseLecture: courseLectures
  }

  this
  .service
  .postData(`/teaching-plan/division/${this.Form.get("div").value.id}/streamDetail/${this.Form.get("class").value.id}/course/${this.course.courseId}/user/${localStorage.getItem("userId")}`, finalData)
  .subscribe((res: any) => {
    console.log(res);
  }, (err: any) => {

    console.warn(err);
    this.dialogRef.close();
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
    const programDialogRef = this.dialog.open(SelectProgramByDepartmentIdComponent ,{width: "80%",height: "86vh",panelClass: 'full-width-dialog', data: {departmentId : user.teacher.department.id}});
    programDialogRef.afterClosed().subscribe((result: any) => {
      this.program = result;
      console.log(result);
      this.Form.get("program").setValue(result.programName);
      this.service.getData("/stream-detail/stream/" + result.stream.id).subscribe((res: any) => {
        console.log("Stream",res);
        this.programDetails = res;
        // console.log(res);
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
  // console.log(event.value);

  if(event.value != "" && event.value != null && event.value != undefined) {
    this.divisions = event.value.divisions;
  }
}
}

interface other_type {
  other_type: String;
 }


