import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SelectCourseByProgramIdComponent } from 'src/app/common/select-course-by-program-id/select-course-by-program-id.component';
import { SelectProgramByDepartmentIdComponent } from 'src/app/common/select-program-by-department-id/select-program-by-department-id.component';
import { ServiceService } from 'src/app/service.service';
import { GetFinalAttainmentChartComponent } from 'src/app/get-final-attainment-chart/get-final-attainment-chart.component';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import domtoimage from 'dom-to-image';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";  
declare var require: any;
const htmlToPdfmake = require("html-to-pdfmake");
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-view-internal-assessment',
  templateUrl: './view-internal-assessment.component.html',
  styleUrls: ['./view-internal-assessment.component.scss']
})
export class ViewInternalAssessmentComponent implements OnInit {

  coLength: any = null;
  lowerSection: boolean = true;
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
    public dialogRef: MatDialogRef<ViewInternalAssessmentComponent>,
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
      test: this.fb.control('',Validators.required),
      type: this.fb.control('',Validators.required),
      totalMarks: this.fb.control('',Validators.required),
      thresholdPercentage: this.fb.control('',Validators.required),
      distributedMarks: this.fb.array([]),
      studentCourseOutcomeMappings:  this.fb.array([]),
    })
    console.log(data);
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
    this.Form.get("test").setValue(this.data.internalTest);
    this.Form.get("type").setValue(this.data.testType);
    this.Form.get("totalMarks").setValue(this.data.totalMarks);
    this.Form.get("thresholdPercentage").setValue(this.data.thresholdPercentage);

    this.data.distributedMarks.forEach(element => {
      this.distributedMarks().push(
        this.fb.group({
          courseOutcome: this.fb.control(element.courseOutcome, Validators.required),
          totalMark: this.fb.control(element.totalMark, Validators.required)
        })
      );
    });

    this.data.studentCourseOutcomeMappings.forEach(element => {
      let allotedMarks: any[] = [];

      element.allottedMarks.forEach(item => {
        allotedMarks.push(
          this.fb.group({
            courseOutcome: this.fb.control(item.courseOutcome),
            mark: this.fb.control(item.mark)
          })
        );
      });

      this.studentCourseOutcomeMappings().push(
        this.fb.group({
          user: this.fb.control(element.user, Validators.required),
          totalMarks: this.fb.control(element.totalMarks),
          allottedMarks: this.fb.array(allotedMarks)
        })
      );
    });

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


  // submitForm(){

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

  //   let studentCourseMappingList: any [] = [];
  //   for(let i =0; i<this.studentCourseOutcomeMappings().length; i++) {
  //     studentCourseMappingList.push({
  //       user: {
  //         userId: this.studentCourseOutcomeMappings().at(i).get("user").value.userId
  //       },
  //       totalMarks: this.studentCourseOutcomeMappings().at(i).get("totalMarks").value,
  //       allottedMarks: this.allottedMarks(i).value
  //     });
  //   }

  //   let finalData: any = {
  //     academicDetail: {
  //       academicYear: this.Form.get("academic_year").value
  //     },
  //     internalTest: this.Form.get("test").value,
  //     testType: this.Form.get("type").value,
  //     totalMarks: this.Form.get("totalMarks").value,
  //     thresholdPercentage: this.Form.get("thresholdPercentage").value,
  //     distributedMarks: this.distributedMarks().value,
  //     studentCourseOutcomeMappings: studentCourseMappingList,
  //   }
  
  //   this
  //   .service
  //   .postData(
  //     `/internal-assessment/division/${this.Form.get("div").value.id}/course/${this.course.courseId}/user/${localStorage.getItem("userId")}`, 
  //     finalData
  //   ).subscribe((res: any) => {
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
  report4(){
    var data = document.getElementById('print');  
   html2canvas(data, { useCORS: true, allowTaint: true, scrollY: 0,scale:3  }).then((canvas) => {
     const image = { type: 'jpeg', quality: 1.4 };
     const margin = [0.3, 0.4];
     const filename = 'myfile.pdf';
 
     var imgWidth = 8.27;
     var pageHeight = 11.75;
 
     var innerPageWidth = imgWidth - margin[0] * 2;
     var innerPageHeight = pageHeight - margin[1] * 3.5;
 
     // Calculate the number of pages.
     var pxFullHeight = canvas.height;
     var pxPageHeight = Math.floor(canvas.width * (0.9*pageHeight / imgWidth));
     var nPages = Math.ceil(pxFullHeight / pxPageHeight);
 
     // Define pageHeight separately so it can be trimmed on the final page.
     var pageHeight = innerPageHeight;
 
     // Create a one-page canvas to split up the full image.
     var pageCanvas = document.createElement('canvas');
     var pageCtx = pageCanvas.getContext('2d');
     pageCanvas.width = canvas.width;
     pageCanvas.height = pxPageHeight;
 
     // Initialize the PDF.
     var pdf = new jsPDF('p', 'in', 'a4');
     for (var page = 0; page < nPages; page++) {
       // Trim the final page to reduce file size.
       if (page === nPages - 1 && pxFullHeight % pxPageHeight !== 0) {
         pageCanvas.height = pxFullHeight % pxPageHeight;
         pageHeight = (pageCanvas.height * innerPageWidth) / pageCanvas.width;
       }
       // Display the page.
       var w = pageCanvas.width;
       var h = pageCanvas.height;
       pdf.setFontSize(8)
       pageCtx.fillStyle = 'white';
       pageCtx.fillRect(0, 0, w, h);
       pageCtx.drawImage(canvas, 0, page * pxPageHeight, w, h, 0, 0, w, h);
 
       // Add the page to the PDF.
       if (page > 0) pdf.addPage();
       debugger;
       var imgData = pageCanvas.toDataURL('image/' + image.type, image.quality);
       pdf.addImage(imgData, image.type, margin[1], margin[0]+0.2, innerPageWidth, pageHeight);
           
       pdf.text(String(page+1) + '  ||',8.5-1,11,null,null);
     }
 
     pdf.save('Minutes of IQAC Meeting.pdf');
  
 });
 }
}
