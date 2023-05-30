import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SelectCourseByProgramIdComponent } from 'src/app/common/select-course-by-program-id/select-course-by-program-id.component';
import { SelectProgramByDepartmentIdComponent } from 'src/app/common/select-program-by-department-id/select-program-by-department-id.component';
import { ServiceService } from 'src/app/service.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-lesson-plan',
  templateUrl: './add-lesson-plan.component.html',
  styleUrls: ['./add-lesson-plan.component.scss']
})
export class AddLessonPlanComponent implements OnInit {
  course: any = null;
  teacher:any=null;
  user:any=null;
  userId:any=null;
  program: any = null;
  divisions: any = null;
  programDetails: any = null;
  // yearControl = new FormControl('', Validators.required);
  year: any[] = [
    {year: '2018-2019', },
    {year: '2019-2020', },
    {year: '2020-2021', },
    {year: '2021-2022', },
  ];

  level: level [] = [
    {level: 'Monday', },
    {level: 'Tuesday', },
    {level: 'Wedensday', },
    {level: 'Thursday', },
    {level: 'Friday', },
    {level: 'Saturday', },
    {level: 'Sunday', },
  ];

  public Form: FormGroup;
 public other : FormArray = this.fb.array([]);
  constructor(
    private fb: FormBuilder,
    public service: ServiceService,
    @Inject(MAT_DIALOG_DATA)
    public data : any,
    public dialogRef: MatDialogRef<AddLessonPlanComponent>,
    public dialog: MatDialog,
    public router: Router
  ) { 
    this.Form = this.fb.group({
      academic_year: this.fb.control('',Validators.required),
      class: this.fb.control('',Validators.required),
      div: this.fb.control('',Validators.required),
      program: this.fb.control('',Validators.required),
      c_code: this.fb.control('',Validators.required),
      c_name: this.fb.control('',Validators.required),
      other:this.fb.array([this.createother()]),
    })
  }

  ngOnInit(): void { 
  }
  get otherControl() {
    this.other = this.Form.get('other') as FormArray;
    return this.other.controls;
  }
  createother(): FormGroup {
  return this.fb.group({
    lec_dates: this.fb.control('',Validators.required), 
    lec_day: this.fb.control('',Validators.required),
    lec_time:this.fb.control('',Validators.required), 
    unit_title: this.fb.control('',Validators.required),
    key_point: this.fb.control('',Validators.required),
    teach_aid:this.fb.control('',Validators.required),
    previous_knw: this.fb.control('',Validators.required),
    objectives: this.fb.control('',Validators.required),
    activity_teaching: this.fb.control('',Validators.required),
    activity_student: this.fb.control('',Validators.required),
    reference: this.fb.control('',Validators.required),
    learn_skills:this.fb.control('',Validators.required),
    assignments:this.fb.control('',Validators.required),
    analysis_ss:this.fb.control(false),
    knowledge_ss:this.fb.control(false),
    understanding_ss:this.fb.control(false),
    application_ss:this.fb.control(false),
    synthesis_ss:this.fb.control(false),
    evaluation_ss:this.fb.control(false),
  });
}

addother(): void {
  this.other = this.Form.get('other') as FormArray;
  this.other.push(this.createother());
}

removeother(i: number) {
  this.other.removeAt(i);
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
  
  classChanges(event: any) {
    // console.log(event.value);
  
    if(event.value != "" && event.value != null && event.value != undefined) {
      this.divisions = event.value.divisions;
    }
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
submitForm(){
  console.log(this.Form.value)
  // let planDetails: any[] = [];
  // for(let i = 0; i<this.other.length; i++) {
  //   planDetails.push({
  //     lecNo: i+1,
  //     lecDate: this.other.at(i).get("lec_dates").value,
  //     lecTime: this.other.at(i).get("lec_time").value,
  //     lecDay: this.other.at(i).get("lec_day").value,
  //     teachAid: this.other.at(i).get("teach_aid").value,
  //     reference:this.other.at(i).get("reference").value,
  //     studActivity:this.other.at(i).get("activity_student").value,
  //     teachActivity:this.other.at(i).get("activity_teaching").value,
  //     objective:this.other.at(i).get("objectives").value,
  //     prevKnow:this.other.at(i).get("previous_knw").value,
  //     assignment: this.other.at(i).get("assignments").value,
  //     keyPoint: this.other.at(i).get("key_point").value,
  //     learnSkills:this.other.at(i).get("learn_skills").value
  //         })
  // }

  let detailPlans: any[] = [];
  for(let i = 0; i<this.other.length; i++) {
    detailPlans.push({
      lecNo: i+1,
      lecDate: this.other.at(i).get("lec_dates").value,
      lecTime: this.other.at(i).get("lec_time").value,
      lecDay: this.other.at(i).get("lec_day").value,
      teachAid: this.other.at(i).get("teach_aid").value,
      unitTitle: this.other.at(i).get("unit_title").value,
      reference:this.other.at(i).get("reference").value,
      studActivity:this.other.at(i).get("activity_student").value,
      teachActivity:this.other.at(i).get("activity_teaching").value,
      objective:this.other.at(i).get("objectives").value,
      prevKnow:this.other.at(i).get("previous_knw").value,
      assignment: this.other.at(i).get("assignments").value,
      keyPoint: this.other.at(i).get("key_point").value,
      learnSkills:this.other.at(i).get("learn_skills").value,
      analysis:this.other.at(i).get("analysis_ss").value,
      knowledge:this.other.at(i).get("knowledge_ss").value,
      understanding:this.other.at(i).get("understanding_ss").value,
      application:this.other.at(i).get("application_ss").value,
      synthesis:this.other.at(i).get("synthesis_ss").value,
      evaluation:this.other.at(i).get("evaluation_ss").value,
          })
  }



  let finalData: any = {
    academicDetail: {
      academicYear: this.Form.get("academic_year").value
    },
        // planDetail: planDetails
        detailPlan: detailPlans
       
  }
//   this
//   .service
//   .postData(`/lesson-plan/division/${this.Form.get("div").value.id}/streamDetail/${this.Form.get("class").value.id}/course/${this.course.courseId}/user/${localStorage.getItem("userId")}`, finalData)
//   .subscribe((res: any) => {
//    console.log(planDetails)
//     console.log(res);
//     this.service.postData(`/plan-detail/bulk/lesson-plan/${res.id}`, planDetails).subscribe(res2 => {
//       console.log(res2);
//     });



//   }, (err: any) => {

//     console.warn(err);
//     this.dialogRef.close();
//   }, () => {
//   this.dialogRef.close();
//  })
///NEW PATH 
this
.service
.postData(`/lesson-plan/division/${this.Form.get("div").value.id}/streamDetail/${this.Form.get("class").value.id}/course/${this.course.courseId}/user/${localStorage.getItem("userId")}`, finalData)
.subscribe((res: any) => {
  console.log("ARRAY",res);
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


}

interface other_type {
  other_type: String;
 }
interface level {
  level: string;
}