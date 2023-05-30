import { Component, Inject,OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SelectCourseByProgramIdComponent } from 'src/app/common/select-course-by-program-id/select-course-by-program-id.component';
import { SelectProgramByDepartmentIdComponent } from 'src/app/common/select-program-by-department-id/select-program-by-department-id.component';
import { ServiceService } from 'src/app/service.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { DownloadService } from 'src/app/download.service';
import { GetFinalAttainmentChartComponent } from 'src/app/get-final-attainment-chart/get-final-attainment-chart.component';
@Component({
  selector: 'app-view-co-po-mapping',
  templateUrl: './view-co-po-mapping.component.html',
  styleUrls: ['./view-co-po-mapping.component.scss']
})
export class ViewCoPoMappingComponent implements OnInit {
  course: any = null;
  program: any = null;
  divisions: any = null;
  programDetails: any = null;
////////
  finalCOAttainment: any = [];
  finalPOAttainment: any = [];

  public internalAttainments: any = [];
  public externalAttainments: any = [];

  public internalAssessments: any = [];
  public externalAssessments: any = [];
  public formData: any = [];
//////////
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
    public dialogRef: MatDialogRef<ViewCoPoMappingComponent>,
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
      
    })
    console.log("GetFinalAttainmentChartComponentData",data);
    this.formData=data;

  }
////
ngDoCheck(): void {
  if (this.internalAttainments.length > 0 && this.externalAttainments.length > 0) {
    this.getFinalCOAttainment();
  }

  if (this.finalCOAttainment.length > 0) {
    this.getFinalPOAttainment();
  }
}
////

  ngOnInit(): void {
    this.getData();
    this.fetchData();
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
    const dialogRef = this.dialog.open(GetFinalAttainmentChartComponent ,{width: "100vw",height: "90vh",panelClass: 'full-width-dialog', data: {
      academicYear: this.data.academicDetail.academicYear,
      divisionId:this.data.academicDetail.division.id, 
      divisionName: this.data.academicDetail.division.divisionName, 
      program: this.Form.get("program").value,
      c_name:this.Form.get("c_name").value,
      class:this.data.academicDetail.streamDetail.streamClass,
      courseId: this.data.academicDetail.course.courseId,
      userId: this.data.user.userId,
    }});
    dialogRef.afterClosed().subscribe((result : any) => { });
  }

  fetchData() {
    this
    .service
    .getData(`/attainment-generation/academicYear/${this.data.academicDetail.academicYear}/division/${this.data.academicDetail.division.id}/course/${this.data.academicDetail.course.courseId}/testType/internal/user/${this.data.user.userId}`).subscribe((res: any) => {
      this.internalAssessments = res;
      console.log(this.internalAssessments);
      this.calculateInternalAttainment(this.internalAssessments);
    });

    this
    .service
    .getData(`/attainment-generation/academicYear/${this.data.academicDetail.academicYear}/division/${this.data.academicDetail.division.id}/course/${this.data.academicDetail.course.courseId}/testType/external/user/${this.data.user.userId}`).subscribe((res: any) => {
      this.externalAssessments = res;
      console.log(this.externalAssessments);
      this.calculateExernalAttainment(this.externalAssessments);
    });

    this
    .service
    .getData(`/attainment-generation/po/academicYear/${this.data.academicDetail.academicYear}/division/${this.data.academicDetail.division.id}/course/${this.data.academicDetail.course.courseId}/user/${this.data.user.userId}`).subscribe((res: any) => {
      console.table(res);
    });
  }

  calculateInternalAttainment(internalAssessments: any) {
    this.internalAttainments = [];
    for(let j=0; j<internalAssessments[0].courseOutcomeWiseCourseAttainments.length; j++) {
      let totalAttainmentForCourseOutcome = 0;
      let totalStudentAboveThreshold = 0;
      for(let i = 0; i< internalAssessments.length; i++) {
        totalAttainmentForCourseOutcome += internalAssessments[i].courseOutcomeWiseCourseAttainments[j].studentAboveThreshold * internalAssessments[i].courseOutcomeWiseCourseAttainments[j].testAttainment;
        totalStudentAboveThreshold += internalAssessments[i].courseOutcomeWiseCourseAttainments[j].studentAboveThreshold
      }
      let attainment = isNaN(totalAttainmentForCourseOutcome / totalStudentAboveThreshold) ? 0 : totalAttainmentForCourseOutcome / totalStudentAboveThreshold;
      this.internalAttainments.push(
        {
          courseOutcome : internalAssessments[0].courseOutcomeWiseCourseAttainments[j].courseOutcome,
          // studentAboveThreshold : internalAssessments[0].courseOutcomeWiseCourseAttainments[j].studentAboveThreshold,
          attainment: attainment,
          attainmentLevel: this.getInternalAttainmentLevel(attainment)
        }
      );
    }

    // console.log(this.internalAttainments);

  }

  calculateExernalAttainment(externalAssessments) {
    this.externalAttainments = [];
    for(let j=0; j<externalAssessments[0].courseOutcomeWiseCourseAttainments.length; j++) {
      // let totalAttainmentForCourseOutcome = 0;
      // let totalStudentAboveThreshold = 0;
      // for(let i = 0; i< externalAssessments.length; i++) {
      //   totalAttainmentForCourseOutcome += externalAssessments[i].courseOutcomeWiseCourseAttainments[j].studentAboveThreshold * externalAssessments[i].courseOutcomeWiseCourseAttainments[j].testAttainment;
      //   totalStudentAboveThreshold += externalAssessments[i].courseOutcomeWiseCourseAttainments[j].studentAboveThreshold
      // }
      // let attainment = isNaN(totalAttainmentForCourseOutcome / totalStudentAboveThreshold) ? 0 : totalAttainmentForCourseOutcome / totalStudentAboveThreshold;
      // this.externalAttainments.push(
      //   {
      //     courseOutcome : externalAssessments[0].courseOutcomeWiseCourseAttainments[j].courseOutcome,
      //     studentAboveThreshold : externalAssessments[0].courseOutcomeWiseCourseAttainments[j].studentAboveThreshold,
      //     attainment: attainment,
      //     attainmentLevel: this.getExternalAttainmentLevel(attainment)
      //   }
      // );

      this.externalAttainments.push(
        {
          courseOutcome : externalAssessments[0].courseOutcomeWiseCourseAttainments[j].courseOutcome,
          studentAboveThreshold : externalAssessments[0].courseOutcomeWiseCourseAttainments[j].studentAboveThreshold,
          attainment: externalAssessments[0].courseOutcomeWiseCourseAttainments[j].testAttainment,
          attainmentLevel: this.getExternalAttainmentLevel(externalAssessments[0].courseOutcomeWiseCourseAttainments[j].testAttainment)
        }
      );
    }

    // console.log(this.externalAttainments);

  }

  getInternalAttainmentLevel(attainment: any): any{
    let attainmentLevel = null;
    for(let i = 0 ; i < this.internalAssessments[0].courseOutcomeMapping.attainmentsLevels.length; i++) {
      if(attainment >= this.internalAssessments[0].courseOutcomeMapping.attainmentsLevels[i].startRange && 
        attainment <= this.internalAssessments[0].courseOutcomeMapping.attainmentsLevels[i].endRange) {
          attainmentLevel = this.internalAssessments[0].courseOutcomeMapping.attainmentsLevels[i].level;
      }
    }
    return attainmentLevel?? 0;
  }

  getExternalAttainmentLevel(attainment: any): any{
    let attainmentLevel = null;
    for(let i = 0 ; i < this.externalAssessments[0].courseOutcomeMapping.attainmentsLevels.length; i++) {
      if(attainment >= this.externalAssessments[0].courseOutcomeMapping.attainmentsLevels[i].startRange && 
        attainment <= this.externalAssessments[0].courseOutcomeMapping.attainmentsLevels[i].endRange) {
          attainmentLevel = this.externalAssessments[0].courseOutcomeMapping.attainmentsLevels[i].level;
      }
    }
    return attainmentLevel?? 0;
  }

  getFinalCOAttainment() {
    this.finalCOAttainment = [];

    for(let i = 0; i< this.internalAttainments.length; i++) {
      for (let j = 0; j < this.externalAttainments.length; j++) {
        if (this.internalAttainments[i].courseOutcome == this.externalAttainments[j].courseOutcome){
          let finalAttainment = (this.internalAttainments[i].attainmentLevel * (this.internalAssessments[0].courseOutcomeMapping.internalWeightagePercentage / 100)) 
          + (this.externalAttainments[j].attainmentLevel * (this.internalAssessments[0].courseOutcomeMapping.externalWeightagePercentage / 100));
          this.finalCOAttainment.push({
            courseOutcome: this.internalAttainments[i].courseOutcome,
            internalAttainment: this.internalAttainments[i].attainmentLevel,
            externalattainment: this.externalAttainments[j].attainmentLevel,
            finalAttainment: finalAttainment
          });
        }  
      }
    }

    // console.log(this.finalCOAttainment);
  }


  getFinalPOAttainment() {
    this.finalPOAttainment = [];

    let teachingOutcomes: any = this.internalAssessments[0].courseOutcomeMapping.teachingOutcomes;
    for (let i = 0; i < teachingOutcomes[0].programOutcomeDataList.length; i++) {
      let sumOfCOAndAttainment = 0;
      let sumOfCO = 0;
      let programOutcome = null;
      for (let j = 0; j < teachingOutcomes.length; j++) {
        sumOfCOAndAttainment += (teachingOutcomes[j].programOutcomeDataList[i].value * this.finalCOAttainment[j].finalAttainment);
        sumOfCO += teachingOutcomes[j].programOutcomeDataList[i].value;
        programOutcome = teachingOutcomes[j].programOutcomeDataList[i].programOutcome
      }
      this.finalPOAttainment.push({
        programOutcome: programOutcome,
        finalAttainment: sumOfCOAndAttainment / sumOfCO
      });
    }

    console.log(this.finalPOAttainment);
  }

  printReport() {
    console.log("this.data.photographs",this.data.photographs)
    // this.photo = this.data.photographs[0].photo;
    // this.news =this.data.newsReports[0].news;
    // console.log(this.photo)
    // console.log(this.news)

     var quotes = document.getElementById('printReport');

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

        pdf.save('CO-POattainment.pdf');

      });


}





}


