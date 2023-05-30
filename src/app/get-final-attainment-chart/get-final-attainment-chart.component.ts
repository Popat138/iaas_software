import { Component, DoCheck, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceService } from '../service.service';
import { SelectCourseByProgramIdComponent } from '../common/select-course-by-program-id/select-course-by-program-id.component';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { DownloadService } from '../download.service';
@Component({
  selector: 'app-get-final-attainment-chart',
  templateUrl: './get-final-attainment-chart.component.html',
  styleUrls: ['./get-final-attainment-chart.component.scss']
})
export class GetFinalAttainmentChartComponent implements OnInit, DoCheck {

  finalCOAttainment: any = [];
  finalPOAttainment: any = [];

  public internalAttainments: any = [];
  public externalAttainments: any = [];

  public internalAssessments: any = [];
  public externalAssessments: any = [];
  public formData: any = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: ServiceService,
    public download: DownloadService,
  ) { 
    console.log("GetFinalAttainmentChartComponent",data);
    this.formData=data;
  }
  ngDoCheck(): void {
    if (this.internalAttainments.length > 0 && this.externalAttainments.length > 0) {
      this.getFinalCOAttainment();
    }

    if (this.finalCOAttainment.length > 0) {
      this.getFinalPOAttainment();
    }
  }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this
    .service
    .getData(`/attainment-generation/academicYear/${this.data.academicYear}/division/${this.data.divisionId}/course/${this.data.courseId}/testType/internal/user/${this.data.userId}`).subscribe((res: any) => {
      this.internalAssessments = res;
      console.log(this.internalAssessments);
      this.calculateInternalAttainment(this.internalAssessments);
    });

    this
    .service
    .getData(`/attainment-generation/academicYear/${this.data.academicYear}/division/${this.data.divisionId}/course/${this.data.courseId}/testType/external/user/${this.data.userId}`).subscribe((res: any) => {
      this.externalAssessments = res;
      console.log(this.externalAssessments);
      this.calculateExernalAttainment(this.externalAssessments);
    });

    this
    .service
    .getData(`/attainment-generation/po/academicYear/${this.data.academicYear}/division/${this.data.divisionId}/course/${this.data.courseId}/user/${this.data.userId}`).subscribe((res: any) => {
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
