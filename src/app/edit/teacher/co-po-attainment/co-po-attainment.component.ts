import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SelectCourseByProgramIdComponent } from 'src/app/common/select-course-by-program-id/select-course-by-program-id.component';
import { SelectProgramByDepartmentIdComponent } from 'src/app/common/select-program-by-department-id/select-program-by-department-id.component';
import { ServiceService } from 'src/app/service.service';
import { stream } from 'xlsx';

@Component({
  selector: 'app-co-po-attainment',
  templateUrl: './co-po-attainment.component.html',
  styleUrls: ['./co-po-attainment.component.scss']
})
export class CoPoAttainmentComponent implements OnInit {

  course: any = null;
  program: any = null;
  divisions: any = null;
  programDetails: any = null;
  teachingOutcome: any = null;
  programOutcomeList:any = null;

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
    public dialogRef: MatDialogRef<CoPoAttainmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
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
      attainmentLevels: this.fb.array([]),
      attainments: this.fb.array([])
    })
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    console.log("Data",this.data)
    this.service.getData("/stream-detail/stream/" + this.data.academicDetail.streamDetail.stream.id).subscribe((res: any) => {
      this.programDetails = res;
      console.log("ProgramDetails",this.data.academicDetail.streamDetail.streamClass);
      this.program = this.data.academicDetail.course.program;
      this.course = this.data.academicDetail.course;
      this.divisions = this.data.academicDetail.streamDetail.divisions;
      // this.service.getData("/course-outcome-mapping/division/" + this.data.academicDetail.division.id).subscribe((programDetail: any) => {
        // console.log("mapping",programDetail);
        // this.divisions = programDetail.divisions;
        this.Form.get("academic_year").setValue(this.data.academicDetail.academicYear);
        this.Form.get("program").setValue(this.data.academicDetail.course.program.programName);
        this.Form.get("c_code").setValue(this.data.academicDetail.course.code);
        this.Form.get("c_name").setValue(this.data.academicDetail.course.name);
        this.Form.get("year").setValue(this.data.academicDetail.course.year);
        this.Form.get("semester").setValue(this.data.academicDetail.course.semester);
        this.Form.get("class").setValue(this.data.academicDetail.streamDetail.streamClass);
        this.Form.get("div").setValue(this.data.academicDetail.division.id);
        this.Form.get("internalWeightagePercentage").setValue(this.data.internalWeightagePercentage);
        this.Form.get("externalWeightagePercentage").setValue(this.data.externalWeightagePercentage);

        console.log("Data Attainment",this.data.attainmentsLevels)
        this.data.attainmentsLevels.forEach(element => {
            this.attainmentLevels().push(
            this.fb.group({
              id: this.fb.control(element.id),
              level: this.fb.control(element.level, Validators.required),
              startRange: this.fb.control(element.startRange, Validators.required),
              endRange: this.fb.control(element.endRange, Validators.required),
            })
          );
        });
    
          this.data.teachingOutcomes.forEach(element => {
            console.log("TeachingOutcomes",this.data.teachingOutcomes)
           
            let tempFormArray: any[] = [];
            element.programOutcomeDataList.forEach(item => {
              tempFormArray.push(
                this.fb.group({
            id:this.fb.control(item.id),
                  po: this.fb.control(item.programOutcome),
                  val: this.fb.control(item.value)
                })
              );
    
            });
            
            this.attainment().push(
              this.fb.group({
                id: this.fb.control(element.id),
                courseOutcome: this.fb.control(element.courseOutcome),
                programOutcomes: this.fb.array(tempFormArray)
              })
            );
          });
      // });
    });
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
          id:this.attainment().at(i).get("id").value,
          courseOutcome: this.attainment().at(i).get("courseOutcome").value,
          programOutcomeDataList: programOutcomeList
        }
      );
      
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
          id: this.Form.get("div").value
        },
        streamDetail:
        {
          id:this.data.academicDetail.streamDetail.id
        }
       
      },
      teachingOutcomes : teachingOutcomes,
      attainmentsLevels: this.attainmentLevels().value,
     
      internalWeightagePercentage: this.Form.get("internalWeightagePercentage").value,
      externalWeightagePercentage: this.Form.get("externalWeightagePercentage").value,
      user: {
        userId: localStorage.getItem("userId")
      }
    }
  
    this
    .service
    .putData(`/course-outcome-mapping`, finalData)
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
        this.service.getData("/program-detail/program/" + result.programId).subscribe((res: any) => {
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
