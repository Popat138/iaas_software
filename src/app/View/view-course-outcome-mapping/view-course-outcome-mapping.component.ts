import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SelectCourseByProgramIdComponent } from 'src/app/common/select-course-by-program-id/select-course-by-program-id.component';
import { SelectProgramByDepartmentIdComponent } from 'src/app/common/select-program-by-department-id/select-program-by-department-id.component';
import { ServiceService } from 'src/app/service.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { DownloadService } from 'src/app/download.service';

@Component({
  selector: 'app-view-course-outcome-mapping',
  templateUrl: './view-course-outcome-mapping.component.html',
  styleUrls: ['./view-course-outcome-mapping.component.scss']
})
export class ViewCourseOutcomeMappingComponent implements OnInit {

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

  constructor(
    private fb: FormBuilder,
    public service: ServiceService,
    public dialogRef: MatDialogRef<ViewCourseOutcomeMappingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    public router: Router,
    public download: DownloadService,
  ) { 
    console.log(data);
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
    this.Form.get("academic_year").setValue(this.data.academicDetail.academicYear);
    this.Form.get("program").setValue(this.data.academicDetail.course.program.programName);
    this.Form.get("class").setValue(this.data.academicDetail.streamDetail.streamClass);
    this.Form.get("c_code").setValue(this.data.academicDetail.course.code);
    this.Form.get("c_name").setValue(this.data.academicDetail.course.name);
    this.Form.get("year").setValue(this.data.academicDetail.course.year);
    this.Form.get("semester").setValue(this.data.academicDetail.course.semester);
    this.Form.get("div").setValue(this.data.academicDetail.division.divisionName);
    this.Form.get("internalWeightagePercentage").setValue(this.data.internalWeightagePercentage);
    this.Form.get("externalWeightagePercentage").setValue(this.data.externalWeightagePercentage);

    this.data.attainmentsLevels.forEach(element => {
      this.attainmentLevels().push(
        this.fb.group({
          level: this.fb.control(element.level, Validators.required),
          startRange: this.fb.control(element.startRange, Validators.required),
          endRange: this.fb.control(element.endRange, Validators.required),
        })
      );
    });

      this.data.teachingOutcomes.forEach(element => {
        let tempFormArray: any[] = [];
        element.programOutcomeDataList.forEach(item => {
          tempFormArray.push(
            this.fb.group({
              po: this.fb.control(item.programOutcome),
              val: this.fb.control(item.value)
            })
          );

        });
        
        this.attainment().push(
          this.fb.group({
            courseOutcome: this.fb.control(element.courseOutcome),
            programOutcomes: this.fb.array(tempFormArray)
          })
        );
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

  // submitForm(){

  //   let teachingOutcomes: any [] = [];
  //   for(let i = 0; i< this.attainment().length; i++) {
  //       let programOutcomeList: any[] = [];
  //       for(let j = 0 ; j < this.programOutcomes(i).length; j++) {
  //         programOutcomeList.push(
  //           {
  //             programOutcome: this.programOutcomes(i).at(j).get("po").value,
  //             value: this.programOutcomes(i).at(j).get("val").value
  //           }
  //         );
  //       }
  //     teachingOutcomes.push(
  //       {
  //         courseOutcome: this.attainment().at(i).get("courseOutcome").value,
  //         programOutcomeDataList: programOutcomeList
  //       }
  //     );
  //   }

  //   let finalData: any = {
  //     academicDetail: {
  //       academicYear: this.Form.get("academic_year").value
  //     },
  //     teachingOutcomes : teachingOutcomes,
  //     attainmentsLevels: this.attainmentLevels().value,
  //     internalWeightagePercentage: this.Form.get("internalWeightagePercentage").value,
  //     externalWeightagePercentage: this.Form.get("externalWeightagePercentage").value
  //   }
  
  //   this
  //   .service
  //   .postData(`/course-outcome-mapping/division/${this.Form.get("div").value.id}/course/${this.course.courseId}/user/${localStorage.getItem("userId")}`, finalData)
  //   .subscribe((res: any) => {
  //     console.log(res);
  //   }, (err: any) => {
  
  //     console.log(err);
  //     this.dialogRef.close();
  //   }, () => {
  //   this.dialogRef.close();
  //  })
  // }

  // getProgram() {
  //   this.service.getUserWithUserId().subscribe((user: any) => {
  //     // console.log(user.teacher)
  //     const programDialogRef = this.dialog.open(SelectProgramByDepartmentIdComponent ,{width: "80%",height: "86vh",panelClass: 'full-width-dialog', data: {departmentId : user.teacher.department.id}});
  //     programDialogRef.afterClosed().subscribe((result: any) => {
  //       this.program = result;
  //       // console.log(result);
  //       this.Form.get("program").setValue(result.programName);
  //       this.service.getData("/program-detail/program/" + result.programId).subscribe((res: any) => {
  //         this.programDetails = res;
  //         // console.log(res);
  //       })
  //     })
  //   }, (err: any) => {
  //     alert("User authentication expired!!. Login again to continue.");
  //     this.router.navigateByUrl("");
  //   });
  // }
  
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
  
  // classChanges(event: any) {
  //   // console.log(event.value);
  
  //   if(event.value != "" && event.value != null && event.value != undefined) {
  //     this.divisions = event.value.divisions;
  //   }
  // }
  
  report() {
    console.log("this.data.photographs",this.data.photographs)
    // this.photo = this.data.photographs[0].photo;
    // this.news =this.data.newsReports[0].news;
    // console.log(this.photo)
    // console.log(this.news)

     var quotes = document.getElementById('report');

      html2canvas(quotes, {useCORS: true, scale:5}).then(canvas => {
        var imgData  = canvas.toDataURL("image/jpeg", 10);
        var pdf = new jsPDF("l", "mm", "a4");
        var margins={
          top:20,
          bottom:20,
          left:40,
          width:522,
                  };
        var pageWidth = pdf.internal.pageSize.getWidth();
        var pageHeight = pdf.internal.pageSize.getHeight();
        var imageWidth = canvas.width;
        var imageHeight = canvas.height;

        var ratio = imageWidth/imageHeight >= pageWidth/pageHeight ? pageWidth/imageWidth : pageHeight/imageHeight;

         pdf.addImage(imgData, 'JPEG', 5, 4, imageWidth * ratio, imageHeight * ratio);

        pdf.save('CO-POmapping.pdf');

      });


}
}
