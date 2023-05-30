import {
  Component,
  ViewChildren,
  ElementRef,
  QueryList,
  OnInit,
  OnChanges,
  SimpleChanges,
  DoCheck,
  Inject
} from "@angular/core";
import { FormArray, FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { SelectCourseByProgramIdComponent } from "src/app/common/select-course-by-program-id/select-course-by-program-id.component";
import { SelectProgramByDepartmentIdComponent } from "src/app/common/select-program-by-department-id/select-program-by-department-id.component";
import { ServiceService } from "src/app/service.service";

@Component({
  selector: 'app-edit-internal-assesment',
  templateUrl: './edit-internal-assesment.component.html',
  styleUrls: ['./edit-internal-assesment.component.scss']
})
export class EditInternalAssesmentComponent implements OnInit {

  coLength: any = null;
  lowerSection: boolean = false;
  course: any = null;
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
    public dialogRef: MatDialogRef<EditInternalAssesmentComponent>,
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
      test:  this.fb.control(''),
      type: this.fb.control('',Validators.required),
      totalMarks: this.fb.control('',Validators.required),
      thresholdPercentage: this.fb.control('',Validators.required),
      distributedMarks: this.fb.array([]),
      studentCourseOutcomeMappings:  this.fb.array([]),
    })
  }

  ngDoCheck(): void {

    // console.log(this.studentCourseOutcomeMappings().value);

    if(this.Form.get('c_code').valid && this.Form.get('div').valid && this.lowerSection === true) {
      this.lowerSection = false;
      this.distributedMarks().reset();
      this.service
      .getData(`/course-outcome-mapping/academicYear/${this.Form.get("academic_year").value}/division/${this.Form.get("div").value.id}/streamDetail/${this.Form.get("class").value.id}course/${this.course.courseId}`)
      .subscribe((res : any) => {
        if(res != null) {
          this.coLength = res.teachingOutcomes.length;
          for(let i = 0; i< this.coLength; i++) {
              this.distributedMarks().push(
                this.fb.group({
                  courseOutcome: this.fb.control(`co${i+1}`),
                  totalMark: this.fb.control("", Validators.required)
                })
              );
          }
        } else { 
          alert("No CO-PO Mapping available for above selection");
        }

        ////////////Assessment table required data //////////
        this.service.getData(`/user/academicYear/${this.Form.get("academic_year").value}/division/${this.Form.get("div").value.id}`)
          .subscribe((users: any) => {
            console.log(users);
            

            users.forEach((user : any) => {
              let courseOutcomes: any[] =[];
              for(let i = 0; i< this.coLength; i++) {
                courseOutcomes.push(
                  this.fb.group({
                    courseOutcome: this.fb.control(`co${i+1}`),
                    mark: this.fb.control('')
                  })
                )
              }

              console.log(user);
              this.studentCourseOutcomeMappings().push(
                this.fb.group({
                  user: this.fb.control(user, Validators.required),
                  totalMarks: this.fb.control(""),
                  allottedMarks: this.fb.array(courseOutcomes)
                })
              );
            });
            // console.log(this.studentCourseOutcomeMappings().value);
          });
        
      }, (err:any) => {
        alert("CO - PO Mapping not available for this academic detail");
      });
    } 

    if(this.Form.get('type').value != 'internal') {
      this.distributedMarks().disable();
      for(let i = 0; i < this.studentCourseOutcomeMappings().length; i++) {
        this.allottedMarks(i).disable();
      }
    } else {
      this.distributedMarks().enable();
      for(let i = 0; i < this.studentCourseOutcomeMappings().length; i++) {
        this.allottedMarks(i).enable();
      }
    }
  }

  

  
  allottedMarks(index: number) {
    return this.studentCourseOutcomeMappings().at(index).get("allottedMarks") as FormArray;
  }

  newAllottedMarks(): FormGroup {
    return this.fb.group({
      courseOutcome: this.fb.control(`co${this.allottedMarks(0).length + 1}`),
      mark: this.fb.control('')
    });
  }

  addAllottedMarks() {
    for (let i = 0; i < this.studentCourseOutcomeMappings().length; i++) {

      let length = this.allottedMarks(i).length;
      this.allottedMarks(i).push(
        this.fb.group({
          courseOutcome: this.fb.control(`co${length+ 1}`),
          mark: this.fb.control('')
        })
      );
    }
  }

  removeAllottedMarks() {
    for(let i = 0 ; i < this.coLength; i++) {
      this.allottedMarks(i).removeAt(this.allottedMarks(0).length -1); 
    }
  }

  studentCourseOutcomeMappings() {
    return this.Form.get("studentCourseOutcomeMappings") as FormArray;
  }

  newstudentCourseOutcomeMappings() {
    return this.fb.group({
      user: this.fb.control('', Validators.required),
      totalMarks: this.fb.control(""),
      allottedMarks: this.fb.array([])
    });
  }

  addstudentCourseOutcomeMappings() {
    this.studentCourseOutcomeMappings().push(this.newstudentCourseOutcomeMappings()); 
  }

  removestudentCourseOutcomeMappings() {
    this.studentCourseOutcomeMappings().removeAt(this.studentCourseOutcomeMappings().length -1); 
  }

  
  distributedMarks() {
    return this.Form.get("distributedMarks") as FormArray;
  }

  newDistributedMarks() {
    return this.fb.group({
      courseOutcome: this.fb.control(`co${this.distributedMarks().length+1}`),
      totalMark: this.fb.control("")
    });
  }

  addDistributedMarks() {
    this.distributedMarks().push(this.newDistributedMarks()); 
  }

  removeDistributedMarks() {
    this.distributedMarks().removeAt(this.distributedMarks().length -1); 
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    console.log("Data",this.data);
    this.service.getData("/stream-detail/stream/" + this.data.academicDetail.streamDetail.stream.id).subscribe((res: any) => {
      this.programDetails = res;
      console.log("ProgramDetail",this.data.academicDetail.streamDetail.streamClass);
      this.program = this.data.academicDetail.course.program;
      this.course = this.data.academicDetail.course;
      console.log("Div", this.data.academicDetail.streamDetail.divisions);
     this.divisions = this.data.academicDetail.streamDetail.divisions;
      // this.service.getData("/course-outcome-mapping/division/" + this.data.academicDetail.division.id).subscribe((programDetail: any) => {
      //   console.log("CourseData",programDetail);
      //   this.divisions = programDetail.divisions;
        this.Form.get("academic_year").setValue(this.data.academicDetail?.academicYear);
        this.Form.get("year").setValue(this.data.academicDetail?.course?.year);
        this.Form.get("semester").setValue(this.data.academicDetail?.course?.semester);
        this.Form.get("class").setValue(this.data.academicDetail?.streamDetail.streamClass);
        this.Form.get("div").setValue(this.data.academicDetail.division.id);
        this.Form.get("program").setValue(this.data.academicDetail?.course?.program?.programName);
        this.Form.get("c_code").setValue(this.data.academicDetail?.course?.code);
        this.Form.get("c_name").setValue(this.data.academicDetail?.course?.name);
        this.Form.get("test").setValue(this.data.internalTest);
        this.Form.get("type").setValue(this.data.testType);
        this.Form.get("totalMarks").setValue(this.data.totalMarks);
        this.Form.get("thresholdPercentage").setValue(this.data.thresholdPercentage);

        // this.data.distributedMarks.forEach(element => {
        //   this.distributedMarks().push(
        //     this.fb.group({
        //       courseOutcome: this.fb.control(element.courseOutcome),
        //       totalMark: this.fb.control(element.totalMark, Validators.required)
        //     })
        //   );
        // });

        this.data.distributedMarks.forEach(element => {
          console.log(element.courseOutcome);
          this.distributedMarks().push(
            this.fb.group({
              courseOutcome: this.fb.control(element.courseOutcome, Validators.required),
              totalMark: this.fb.control(element.totalMark, Validators.required)
            })
          );
        });


        this.data.studentCourseOutcomeMappings.forEach(element => {
          let allottedMarkList: any [] = [];
          element.allottedMarks.forEach(allottedMark => {
            allottedMarkList.push(
              this.fb.group({
                courseOutcome: this.fb.control(allottedMark.courseOutcome),
                mark: this.fb.control(allottedMark.mark)
              })
            );
          });

          this.studentCourseOutcomeMappings().push(
            this.fb.group({
              user: this.fb.control(element.user, Validators.required),
              totalMarks: this.fb.control(element.totalMarks),
              allottedMarks: this.fb.array(allottedMarkList)
            })
          );

        });
      });
    // })
  }
  change(event: any,j:number,i:number){

    console.log(event.target.value,j,i)
    var totalArray = this.studentCourseOutcomeMappings().at(i).get("allottedMarks").value
    var total = 0
    // console.log("total",totalArray)
    totalArray.forEach(element => {
      console.log(element.mark)
      total= total+element.mark
    });
    this.studentCourseOutcomeMappings().at(i).get("totalMarks").setValue(total)
    // console.log("fianal Total",total)
    
    
    }

  submitForm(){

    console.log(this.studentCourseOutcomeMappings().value);

    // let teachingOutcomes: any [] = [];
    // for(let i = 0; i< this.attainment().length; i++) {
    //     let programOutcomeList: any[] = [];
    //     for(let j = 0 ; j < this.programOutcomes(i).length; j++) {
    //       programOutcomeList.push(
    //         {
    //           programOutcome: this.programOutcomes(i).at(j).get("po").value,
    //           value: this.programOutcomes(i).at(j).get("val").value
    //         }
    //       );
    //     }
    //   teachingOutcomes.push(
    //     {
    //       courseOutcome: this.attainment().at(i).get("courseOutcome").value,
    //       programOutcomeDataList: programOutcomeList
    //     }
    //   );
    // }

    let studentCourseMappingList: any [] = [];
    for(let i =0; i<this.studentCourseOutcomeMappings().length; i++) {
      console.log(this.allottedMarks(i).value);
      studentCourseMappingList.push({
        user: {
          userId: this.studentCourseOutcomeMappings().at(i).get("user").value.userId
        },
        totalMarks: this.studentCourseOutcomeMappings().at(i).get("totalMarks").value,
        allottedMarks: this.allottedMarks(i).value
      });
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
      internalTest: this.Form.get("test").value,
      testType: this.Form.get("type").value,
      totalMarks: this.Form.get("totalMarks").value,
      thresholdPercentage: this.Form.get("thresholdPercentage").value,
      distributedMarks: this.distributedMarks().value,
      studentCourseOutcomeMappings: studentCourseMappingList,
      user: {
        userId: localStorage.getItem("userId")
      }
    }

    console.log(finalData);
  
    this.service.putData(`/internal-assessment`, finalData).subscribe((res: any) => {
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
          this.programDetails = res;
          console.log("Streams",res);
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
      this.lowerSection = true;
      this.divisions = event.value.divisions;
    }
  }

}