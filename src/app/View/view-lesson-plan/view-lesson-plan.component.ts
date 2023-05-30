import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/service.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
@Component({
  selector: 'app-view-lesson-plan',
  templateUrl: './view-lesson-plan.component.html',
  styleUrls: ['./view-lesson-plan.component.scss']
})
export class ViewLessonPlanComponent implements OnInit {
  course: any = null;
  college;
  association;
  address;
  teacher:any=null;
  user:any=null;
  userId:any=null;
  program: any = null;
  divisions: any = null;
  pclass;
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
    @Inject(MAT_DIALOG_DATA) public data : any,
    public dialogRef: MatDialogRef<ViewLessonPlanComponent>,
    public router: Router

  ) { 
    console.log(data);
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

  ngOnInit(): void {
    this.getLessonPlan();
    this.service.getUserWithUserId().subscribe((res:any) =>
    {
     this.college =  res.college.name;
      //console.log(this.college)
      console.log(this.college)
      this.association=res.college.association;
      console.log(this.association)
      this.address=res.college.address;
      console.log(this.address)
      this.pclass=res.programClass;
      console.log(this.pclass)

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
  
getLessonPlan(){
    this.Form.get("academic_year").setValue(this.data.academicDetail.academicYear);
    // this.Form.get("year").setValue(this.data.academicDetail.course.year);
    // this.Form.get("semester").setValue(this.data.academicDetail.course.semester);
    this.Form.get("class").setValue(this.data.academicDetail?.streamDetail.streamClass);
    this.Form.get("div").setValue(this.data.academicDetail.division.divisionName);
    this.Form.get("program").setValue(this.data.academicDetail.course.program.programName);
    this.Form.get("c_code").setValue(this.data.academicDetail.course.code);
    this.Form.get("c_name").setValue(this.data.academicDetail.course.name);
    // this.Form.get("month").setValue(this.data.courseLecture[0].month);
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
          // analysis_ss:this.fb.control(element.analysis=="true"?true:false),
          analysis_ss:[{ value:element.analysis=="true"?true:false, disabled: true}],
          knowledge_ss:[{ value:element.knowledge=="true"?true:false, disabled: true}],
          understanding_ss:[{ value:element.understanding=="true"?true:false, disabled: true}],
          application_ss:[{ value:element.application=="true"?true:false, disabled: true}],
         synthesis_ss:[{ value:element.synthesis=="true"?true:false, disabled: true}],
         evaluation_ss:[{ value:element.evaluation=="true"?true:false, disabled: true}],
        })
      );
    });
}

print(){
  var data = document.getElementById('report');  
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
     
      pdf.text( '||  ' +this.college,margin[0]+0.2,11,null,null);
      pdf.text(String(page+1) + '  ||',8.5-1,11,null,null);
    }

    pdf.save('Lesson plan.pdf');
 
});
}

}

interface other_type {
  other_type: String;
 }
interface level {
  level: string;
}