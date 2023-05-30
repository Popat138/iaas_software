import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/service.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-view-teaching-plan',
  templateUrl: './view-teaching-plan.component.html',
  styleUrls: ['./view-teaching-plan.component.scss']
})
export class ViewTeachingPlanComponent implements OnInit {

  course: any = null;
  college;
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

  public Form: FormGroup;
  public other : FormArray = this.fb.array([]);
  constructor(
    private fb: FormBuilder,
    public service: ServiceService,
    @Inject(MAT_DIALOG_DATA) public data : any,
    public dialogRef: MatDialogRef<ViewTeachingPlanComponent>,
    public router: Router
  )
  {

    this.Form = this.fb.group({
      academic_year: this.fb.control('',Validators.required),
      year: this.fb.control('',Validators.required),
      semester: this.fb.control('',Validators.required),
      class: this.fb.control('',Validators.required),
      div: this.fb.control('',Validators.required),
      program: this.fb.control('',Validators.required),
      c_code: this.fb.control('',Validators.required),
      c_name: this.fb.control('',Validators.required),
      month: this.fb.control('',Validators.required),
      other:this.fb.array([]),
    })
   }

  ngOnInit(): void {
    this.getTeachingPlan();
    this.service.getUserWithUserId().subscribe((res:any) =>
    {
     this.college =  res.college.name;
      //console.log(this.college)
      console.log(this.college)
      this.pclass=res.programClass;
      console.log(this.pclass)

    })
  }

  get otherControl() {
    this.other = this.Form.get('other') as FormArray;
    return this.other.controls;
  }

  createother(): FormGroup {
    return this.fb.group({
     lec_dates: this.fb.control('',Validators.required),
    no_of_lectures: this.fb.control('',[Validators.required, Validators.pattern(new RegExp("[0-9]"))]),
    no_of_tutorials: this.fb.control('',[Validators.required, Validators.pattern(new RegExp("[0-9]"))]),
    topics: this.fb.control('',Validators.required),
    assignments: this.fb.control('',Validators.required),
    mode_of_teaching: this.fb.control('',Validators.required),


  });
  }

  addother(): void {
    this.other = this.Form.get('other') as FormArray;
    this.other.push(this.createother());
  }

  removeother(i: number) {
    this.other.removeAt(i);
  }

  submitForm(){

  let courseLectures: any[] = [];
  for(let i = 0; i<this.other.length; i++) {
    courseLectures.push({
      month: this.Form.get("month").value,
      week: i,
      lecDates:this.other.at(i).get("lec_dates").value,
      noOfLectures: this.other.at(i).get("no_of_lectures").value,
      nofOfTutorials: this.other.at(i).get("no_of_tutorials").value,
      topic: this.other.at(i).get("topics").value,
      assignment: this.other.at(i).get("assignments").value,
      modeOfTeaching: this.other.at(i).get("mode_of_teaching").value
    })
  }

  let finalData: any = {
    academicDetail: {
      academicYear: this.Form.get("academic_year").value
    },
    courseLecture: courseLectures
  }

  this
  .service
  .postData(`/teaching-plan/division/${this.Form.get("div").value.id}/course/${this.course.courseId}/user/${localStorage.getItem("userId")}`, finalData)
  .subscribe((res: any) => {
    console.log(res);
  }, (err: any) => {

    console.warn(err);
    this.dialogRef.close();
  }, () => {
  this.dialogRef.close();
 })
}

report() {

   var quotes = document.getElementById('plan');

    html2canvas(quotes, {useCORS: true, scale:5}).then(canvas => {
      var imgData  = canvas.toDataURL("image/jpeg", 10);
      var pdf = new jsPDF("p", "mm", "a4");
      var pageWidth = pdf.internal.pageSize.getWidth();
      var pageHeight = pdf.internal.pageSize.getHeight();
      var imageWidth = canvas.width;
      var imageHeight = canvas.height;

      var ratio = imageWidth/imageHeight >= pageWidth/pageHeight ? pageWidth/imageWidth : pageHeight/imageHeight;

       pdf.addImage(imgData, 'JPEG', 0.5, 4, imageWidth * ratio, imageHeight * ratio);

      pdf.save('Teaching plan.pdf');

    });


}

getTeachingPlan() {
    this.Form.get("academic_year").setValue(this.data.academicDetail?.academicYear);
    this.Form.get("year").setValue(this.data.academicDetail?.course.year);
    this.Form.get("semester").setValue(this.data.academicDetail?.course.semester);
    this.Form.get("class").setValue(this.data.academicDetail?.streamDetail.streamClass);
    this.Form.get("div").setValue(this.data.academicDetail?.division?.divisionName);
    this.Form.get("program").setValue(this.data.academicDetail?.course?.program.programName);
    this.Form.get("c_code").setValue(this.data.academicDetail?.course.code);
    this.Form.get("c_name").setValue(this.data.academicDetail?.course.name);
    this.Form.get("month").setValue(this.data.courseLecture[0]?.month);

    this.data.courseLecture.forEach((element : any, index: any) => {
      this.other = this.Form.get('other') as FormArray;
      this.other.push(
        this.fb.group({
          no_of_lectures: this.fb.control(element.noOfLectures,[Validators.required, Validators.pattern(new RegExp("[0-9]"))]),
          no_of_tutorials: this.fb.control(element.nofOfTutorials,[Validators.required, Validators.pattern(new RegExp("[0-9]"))]),
          lec_dates:this.fb.control(element.lecDates,Validators.required),
          topics: this.fb.control(element.topic,Validators.required),
          assignments: this.fb.control(element.assignment,Validators.required),
          mode_of_teaching: this.fb.control(element.modeOfTeaching,Validators.required),
        })
      );
    });
  
}
report5(){
 
  var data = document.getElementById('plan');  
  html2canvas(data, { useCORS: true, allowTaint: true, scrollY: 0 }).then((canvas) => {
    const image = { type: 'jpeg', quality: 1.2 };
    const margin = [0.5, 0.5];
    const filename = 'myfile.pdf';

    var imgWidth = 8.5;
    var pageHeight = 11;

    var innerPageWidth = imgWidth - margin[0] * 2;
    var innerPageHeight = pageHeight - margin[1] * 2.5;

    // Calculate the number of pages.
    var pxFullHeight = canvas.height;
    var pxPageHeight = Math.floor(canvas.width * (pageHeight / imgWidth));
    var nPages = Math.ceil(pxFullHeight / pxPageHeight);

    // Define pageHeight separately so it can be trimmed on the final page.
    var pageHeight = innerPageHeight;

    // Create a one-page canvas to split up the full image.
    var pageCanvas = document.createElement('canvas');
    var pageCtx = pageCanvas.getContext('2d');
    pageCanvas.width = canvas.width;
    pageCanvas.height = pxPageHeight;

    // Initialize the PDF.
    var pdf = new jsPDF('p', 'in', [8.5, 11]);

    for (var page = 0; page < nPages; page++) {
      // Trim the final page to reduce file size.
      if (page === nPages - 1 && pxFullHeight % pxPageHeight !== 0) {
        pageCanvas.height = pxFullHeight % pxPageHeight;
        pageHeight = (pageCanvas.height * innerPageWidth) / pageCanvas.width;
      }

      // Display the page.
      var w = pageCanvas.width;
      var h = pageCanvas.height;
      pdf.setFontSize(7);
      pageCtx.fillStyle = 'white';
      pageCtx.fillRect(0, 0, w, h);
      pageCtx.drawImage(canvas, 0, page * pxPageHeight, w, h, 0, 0, w, h);

      // Add the page to the PDF.
      if (page > 0) pdf.addPage();
      debugger;
      var imgData = pageCanvas.toDataURL('image/' + image.type, image.quality);
      pdf.addImage(imgData, image.type, margin[1], margin[0], innerPageWidth, pageHeight);
      pdf.text( '||  ' +this.college,margin[0]+0.2,11-0.3,null,null);
      pdf.text(String(page+1) + '  ||',8.5-margin[0],11-0.3,null,null);
      if(page>0)
      pdf.text(this.data.user.firstName +  " " + this.data.user.middleName +" " + this.data.user.lastName ,2*margin[0],0.3,null,null);
    }
    pdf.save('Teaching plan.pdf');
 
});
}

}
