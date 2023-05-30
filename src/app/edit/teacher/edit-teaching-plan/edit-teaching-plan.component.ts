import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SelectCourseByProgramIdComponent } from 'src/app/common/select-course-by-program-id/select-course-by-program-id.component';
import { SelectProgramByDepartmentIdComponent } from 'src/app/common/select-program-by-department-id/select-program-by-department-id.component';
import { ServiceService } from 'src/app/service.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-edit-teaching-plan',
  templateUrl: './edit-teaching-plan.component.html',
  styleUrls: ['./edit-teaching-plan.component.scss']
})
export class EditTeachingPlanComponent implements OnInit {

  course: any = null;

  program: any = null;
  divisions: any = null;
  public programDetails: any = null;

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
    public dialogRef: MatDialogRef<EditTeachingPlanComponent>,
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
      other:this.fb.array([]),
    })
   }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    console.log("This Data",this.data);
    this.service.getData("/stream-detail/stream/" + this.data.academicDetail?.streamDetail?.stream.id).subscribe((res: any) => {
      this.programDetails = res;
      console.log(res);
      // this.divisions = this.programDetails.divisions;
      this.program = this.data.academicDetail?.course.program;
      this.course = this.data.academicDetail?.course;
      this.course = this.data.academicDetail?.course;
      console.log("Div", this.data.academicDetail?.division?.id);
     this.divisions = this.data.academicDetail?.streamDetail.divisions;
      // this.service.getData("/program-detail/division/" + this.data.academicDetail?.division?.id).subscribe((programDetail: any) => {
      //   console.log(programDetail);
      //   this.divisions = programDetail.divisions;
      this.Form.get("academic_year").setValue(this.data?.academicDetail?.academicYear);
      this.Form.get("year").setValue(this.data.academicDetail?.course?.year);
      this.Form.get("semester").setValue(this.data.academicDetail?.course?.semester);
      this.Form.get("class").setValue(this.data.academicDetail?.streamDetail?.streamClass);
      this.Form.get("div").setValue(this.data.academicDetail?.division?.id);
      this.Form.get("program").setValue(this.data.academicDetail?.course?.program?.programName);
      this.Form.get("c_code").setValue(this.data.academicDetail?.course?.code);
      this.Form.get("c_name").setValue(this.data.academicDetail?.course?.name);
      this.Form.get("month").setValue(this.data.courseLecture[0]?.month);


      this.other = this.Form.get('other') as FormArray;
      this.data.courseLecture.forEach(element => {
        this.other.push(
          this.fb.group({
            lec_dates:this.fb.control(element.lecDates,Validators.required),
            no_of_lectures: this.fb.control(element.noOfLectures,[Validators.required, Validators.pattern(new RegExp("[0-9]"))]),
            no_of_tutorials: this.fb.control(element.nofOfTutorials,[Validators.required, Validators.pattern(new RegExp("[0-9]"))]),
            topics: this.fb.control(element.topic,Validators.required),
            assignments: this.fb.control(element.assignment,Validators.required),
            mode_of_teaching: this.fb.control(element.modeOfTeaching,Validators.required),
        
        
          })
        );
      });

    });

    // })

    
  }

  get otherControl() {
    this.other = this.Form.get('other') as FormArray;
    return this.other.controls;
  }

  createother(): FormGroup {
    return this.fb.group({
    lec_dates:this.fb.control('',Validators.required),
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
      lecDates:this.other.at(i).get("lec_dates").value,
      noOfLectures: this.other.at(i).get("no_of_lectures").value,
      nofOfTutorials: this.other.at(i).get("no_of_tutorials").value,
      topic: this.other.at(i).get("topics").value,
      assignment: this.other.at(i).get("assignments").value,
      modeOfTeaching: this.other.at(i).get("mode_of_teaching").value
    })
  }

  let finalData: any = {
    id: this.data.id,
    academicDetail: {
      id:this.data.academicDetail.id,
      academicYear: this.Form.get("academic_year").value,
      course: {
        courseId: this.course.courseId
      },
      division: {
        id: this.data.academicDetail?.division?.id
      },
      streamDetail:{
        id: this.data.academicDetail?.streamDetail?.id
       }
    },
    courseLecture: courseLectures,
    user: {
      userId: localStorage.getItem("userId")
    }
  }
console.log("FINAL DATA",finalData);
  this.service.putData(`/teaching-plan`, finalData)
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


