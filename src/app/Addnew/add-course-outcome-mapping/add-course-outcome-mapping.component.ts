import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SelectCourseByProgramIdComponent } from 'src/app/common/select-course-by-program-id/select-course-by-program-id.component';
import { SelectProgramByDepartmentIdComponent } from 'src/app/common/select-program-by-department-id/select-program-by-department-id.component';
import { ServiceService } from 'src/app/service.service';

@Component({
  selector: 'app-add-course-outcome-mapping',
  templateUrl: './add-course-outcome-mapping.component.html',
  styleUrls: ['./add-course-outcome-mapping.component.scss']
})
export class AddCourseOutcomeMappingComponent implements OnInit {

  course: any = null;
  teacher:any=null;
  user:any=null;
  program: any = null;
  divisions: any = null;
  programDetails: any = null;

  public Form: FormGroup;

  year: any[] = [
    {year: '2018-2019', },
    {year: '2019-2020', },
    {year: '2020-2021', },
    {year: '2021-2022', },
  ];

  constructor(
    private fb: FormBuilder,
    public service: ServiceService,
    public dialogRef: MatDialogRef<AddCourseOutcomeMappingComponent>,
    public dialog: MatDialog,
    public router: Router
  ) { 
    this.Form = this.fb.group({
      academic_year: this.fb.control('',Validators.required),
      year: this.fb.control('',Validators.required),
      semester: this.fb.control('',Validators.required),
      class: this.fb.control('',Validators.required),
      div: this.fb.control('',Validators.required),
      program: this.fb.control('',Validators.required),
      c_code: this.fb.control('',Validators.required),
      c_name: this.fb.control('',Validators.required),
      internalWeightagePercentage: this.fb.control('',Validators.required),
      externalWeightagePercentage: this.fb.control('',Validators.required),
      attainmentLevels: this.fb.array([this.newAttainmentLevels()]),
      attainments: this.fb.array([
        this.fb.group({
          courseOutcome: this.fb.control("co1"),
          programOutcomes: this.fb.array([
            this.fb.group({
              po: this.fb.control("po1"),
              val: this.fb.control('')
            })
          ])
        })
      ])
    })
  }

  ngOnInit(): void {
  }

  attainmentLevels() {
    return this.Form.get('attainmentLevels') as FormArray;
  }

  newAttainmentLevels(): FormGroup {

    return this.fb.group({
      level: this.fb.control("", Validators.required),
      startRange: this.fb.control("", Validators.required),
      endRange: this.fb.control("", Validators.required),
    });
  }

  addAttainmentLevels() {
      this.attainmentLevels().push(this.newAttainmentLevels());
  }

  removeAttainmentLevels() {
    if(this.attainmentLevels().length > 1) {
      this.attainmentLevels().removeAt(this.attainmentLevels().length - 1);
    } else {
      alert("Atleast 1 field is required");
    }
  }

  attainment() {
    return this.Form.get('attainments') as FormArray;
  }

  newAttainment(): FormGroup {

    let tempFormArray: any[] = [];
    for(let i = 0 ; i< this.programOutcomes(0).length; i++) {
      tempFormArray.push(
        this.fb.group({
          po: this.fb.control(`po${i+1}`),
          val: this.fb.control('')
        })
      )
    }
    
    return this.fb.group({
      courseOutcome: this.fb.control(`co${this.attainment().length + 1}`),
      programOutcomes: this.fb.array(tempFormArray)
    });
  }

  addAttainment() {
    if(this.attainment().length < 8 ) {
      this.attainment().push(this.newAttainment());
    } else {
      alert("Course outcome limit is 8 length");
    }
  }

  removeAttainment() {
    if(this.attainment().length > 1) {
      this.attainment().removeAt(this.attainment().length - 1);
    } else {
      alert("Atleast 1 field is required");
    }
  }

  programOutcomes(index: number): FormArray {
    return this.attainment().at(index).get('programOutcomes') as FormArray;
  }

  newProgramOutcomes(): FormGroup {
    return this.fb.group({
      po: this.fb.control(`po${this.programOutcomes(0).length+ 1}`),
      val: this.fb.control('')
    });
  }

  addProgramOutcomes() {
    if(this.programOutcomes(0).length < 12) {
      let poLength = this.programOutcomes(0).length
      for(let i = 0 ; i< this.attainment().length; i++) {
        this.programOutcomes(i).push(
          this.fb.group({
            po: this.fb.control(`po${poLength+ 1}`),
            val: this.fb.control('')
          })
        );
      }
    } else {
      alert("Program outcome limit is 12 length");
    }
  }

  removeProgramOutcomes() {
    if(this.programOutcomes(0).length > 1) {
      for(let i = 0 ; i< this.attainment().length; i++) {
        this.programOutcomes(i).removeAt(this.programOutcomes(0).length-1);
      }
    } else {
      alert("Atleast 1 field is required");
    }
  }

  submitForm(){

    let teachingOutcomes: any [] = [];
    for(let i = 0; i< this.attainment().length; i++) {
        let programOutcomeList: any[] = [];
        for(let j = 0 ; j < this.programOutcomes(i).length; j++) {
          programOutcomeList.push(
            {
              programOutcome: this.programOutcomes(i).at(j).get("po").value,
              value: this.programOutcomes(i).at(j).get("val").value
            }
          );
        }
      teachingOutcomes.push(
        {
          courseOutcome: this.attainment().at(i).get("courseOutcome").value,
          programOutcomeDataList: programOutcomeList
        }
      );
    }

    let finalData: any = {
      academicDetail: {
        academicYear: this.Form.get("academic_year").value
      },
      teachingOutcomes : teachingOutcomes,
      attainmentsLevels: this.attainmentLevels().value,
      internalWeightagePercentage: this.Form.get("internalWeightagePercentage").value,
      externalWeightagePercentage: this.Form.get("externalWeightagePercentage").value
    }
  
    this
    .service
    .postData(`/course-outcome-mapping/division/${this.Form.get("div").value.id}/streamDetail/${this.Form.get("class").value.id}/course/${this.course.courseId}/user/${localStorage.getItem("userId")}`, finalData)
    .subscribe((res: any) => {
      console.log(res);
         }, (err: any) => {
  
      console.log(err);
      this.dialogRef.close();
    }, () => {
    this.dialogRef.close();
   })
  }

  getProgram() {
    this.service.getUserWithUserId().subscribe((user: any) => {
      // console.log(user.teacher)
      const programDialogRef = this.dialog.open(SelectProgramByDepartmentIdComponent ,{width: "80%",height: "86vh",panelClass: 'full-width-dialog', data: {departmentId : user.teacher.department.id}});
      programDialogRef.afterClosed().subscribe((result: any) => {
        this.program = result;
        // console.log(result);
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
      // console.log(result);
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
