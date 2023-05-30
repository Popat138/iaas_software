import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SelectCourseByProgramIdComponent } from 'src/app/common/select-course-by-program-id/select-course-by-program-id.component';
import { SelectProgramByDepartmentIdComponent } from 'src/app/common/select-program-by-department-id/select-program-by-department-id.component';
import { ServiceService } from 'src/app/service.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-edit-lesson-plan',
  templateUrl: './edit-lesson-plan.component.html',
  styleUrls: ['./edit-lesson-plan.component.scss']
})
export class EditLessonPlanComponent implements OnInit {
  course: any = null;
  teacher:any=null;
  user:any=null;
  userId:any=null;
  program: any = null;
  divisions: any = null;
  public programDetails: any = null;

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
    public dialogRef: MatDialogRef<EditLessonPlanComponent>,
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
      other:this.fb.array([]),
    })

  }
  get otherControl() {
    this.other = this.Form.get('other') as FormArray;
    return this.other.controls;
  }
  createother(): FormGroup {
    // this.user.push({});
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

  ngOnInit(): void {
    this.getData();
  }

getData(){
  console.log(this.data);
  //  console.log("ProjectDetails",this.data.planDetails);
  this.service.getData("/stream-detail/stream/" + this.data.academicDetail.streamDetail.stream.id).subscribe((res: any) => {
    this.programDetails = res;
    console.log(res);
    this.program = this.data.academicDetail.course.program;
    this.course = this.data.academicDetail.course;
    this.divisions = this.data.academicDetail.streamDetail.divisions;
    this.Form.get("academic_year").setValue(this.data?.academicDetail?.academicYear);
    this.Form.get("program").setValue(this.data?.academicDetail?.course?.program.programName);
    this.Form.get("class").setValue(this.data?.academicDetail?.streamDetail.streamClass);
    this.Form.get("div").setValue(this.data?.academicDetail?.division?.id);
    this.Form.get("c_code").setValue(this.data.academicDetail?.course?.code);
    this.Form.get("c_name").setValue(this.data.academicDetail?.course?.name);
    // this.service.getData(`/lesson-plan/plan-detail/${this.data.id}/user/` + this.data.user.userId).subscribe((res2: any) => {
    //   console.log("ResourcesData", res2);
    // });

    ///Change
    // this.service.getData("/plan-detail/lessonPlan/"+this.data.id).subscribe((planDetails: any) => {
    //   console.log(planDetails);
    //   console.log("ID",planDetails.id)
    //   planDetails.forEach(element=>{
    //       this.other.push(
    //       this.fb.group({
    //       planDetailId:this.fb.control(element.id),
    //       lec_dates: this.fb.control(element.lecDate,Validators.required), 
    //       lec_day: this.fb.control(element.lecDay,Validators.required),
    //       lec_time:this.fb.control(element.lecTime,Validators.required), 
    //       key_point: this.fb.control(element.keyPoint,Validators.required),
    //       teach_aid:this.fb.control(element.teachAid,Validators.required),
    //       previous_knw: this.fb.control(element.prevKnow,Validators.required),
    //       objectives: this.fb.control(element.objective,Validators.required),
    //       activity_teaching: this.fb.control(element.teachActivity,Validators.required),
    //       activity_student: this.fb.control(element.studActivity,Validators.required),
    //       reference: this.fb.control(element.reference,Validators.required),
    //       learn_skills:this.fb.control(element.learnSkills,Validators.required),
    //       assignments:this.fb.control(element.assignment,Validators.required),

    //     })

    //   )
    // })
   
    // });
    ///////////////////////////////
    this.other = this.Form.get('other') as FormArray;
    this.data.detailPlan.forEach(element => {
      this.other.push(
        this.fb.group({
          // planDetailId:this.fb.control(element.id),
          lec_dates: this.fb.control(element.lecDate,Validators.required), 
          lec_day: this.fb.control(element.lecDay,Validators.required),
          lec_time:this.fb.control(element.lecTime,Validators.required), 
          unit_title: this.fb.control(element.unitTitle,Validators.required),
          key_point: this.fb.control(element.keyPoint,Validators.required),
          teach_aid:this.fb.control(element.teachAid,Validators.required),
          previous_knw: this.fb.control(element.prevKnow,Validators.required),
          objectives: this.fb.control(element.objective,Validators.required),
          activity_teaching: this.fb.control(element.teachActivity,Validators.required),
          activity_student: this.fb.control(element.studActivity,Validators.required),
          reference: this.fb.control(element.reference,Validators.required),
          learn_skills:this.fb.control(element.learnSkills,Validators.required),
          assignments:this.fb.control(element.assignment,Validators.required),
          analysis_ss:this.fb.control(element.analysis=="true"?true:false),
          knowledge_ss:this.fb.control(element.knowledge=="true"?true:false),
          understanding_ss:this.fb.control(element.understanding=="true"?true:false),
          application_ss:this.fb.control(element.application=="true"?true:false),
         synthesis_ss:this.fb.control(element.synthesis=="true"?true:false),
          evaluation_ss:this.fb.control(element.evaluation=="true"?true:false),
        })
        
      );
      console.log("dsds",element.analysis)
    });



  });
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
  // let planDetails: any[] = [];
  // for(let i = 0; i<this.other.length; i++) {
  //   planDetails.push({
  //     // id: this.other.at(i).get("planDetailId").value,
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
  //     learnSkills:this.other.at(i).get("learn_skills").value,
  //     lessonPlan: {
  //       id: this.data.id
  //     }
  //            })
  //           //  console.log("ID22",this.other.at(i).get("planDetailId").value)   
  // }

  let detailPlans: any[] = [];
  for(let i = 0; i<this.other.length; i++) {
    detailPlans.push({
      lecNo: i+1,
      lecDate: this.other.at(i).get("lec_dates").value,
      lecTime: this.other.at(i).get("lec_time").value,
      lecDay: this.other.at(i).get("lec_day").value,
      unitTitle: this.other.at(i).get("unit_title").value,
      teachAid: this.other.at(i).get("teach_aid").value,
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
    id: this.data.id,
    academicDetail: {
      academicYear: this.Form.get("academic_year").value,
      course: {
        courseId: this.course.courseId
      },
      division: {
        id: this.Form.get("div").value
      },
      streamDetail:{
        id: this.data.academicDetail.streamDetail.id
       }
    },
        // planDetail: planDetails,
        detailPlan: detailPlans,
        user: {
          userId: localStorage.getItem("userId")
        }
  }

//   this.service.putData(`/lesson-plan`, finalData)
//   .subscribe((res: any) => {
//     console.log("PST",res.id);
//     this.service.putData(`/plan-detail/bulk/lesson-plan/${res.id}`, planDetails).subscribe(res2 => {
//     console.log("PPPPPP",res2);
//     });



//   }, (err: any) => {

//     console.warn(err);
//     this.dialogRef.close();
//   }, () => {
//   this.dialogRef.close();
//  })


 this.service.putData(`/lesson-plan`, finalData)
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
}



interface other_type {
  other_type: String;
 }
interface level {
  level: string;
}