import { Component, Inject, ElementRef,ViewChild, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceService } from 'src/app/service.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import domtoimage from 'dom-to-image';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";  
declare var require: any;
const htmlToPdfmake = require("html-to-pdfmake");
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;




@Component({
  selector: 'app-view-iqacmeeting-detail',
  templateUrl: './view-iqacmeeting-detail.component.html',
  styleUrls: ['./view-iqacmeeting-detail.component.scss']
})
export class ViewIQACMeetingDetailComponent implements OnInit {

  photograph:any=null;
  newsReport:any=null;
  participantList:any=null;
  final_data:any;
  public item_data :any[] = [];
  public Form: FormGroup;
  public agenda: FormArray = this.fb.array([]);

  year: Year[] = [
    {year: '2018', },
    {year: '2019', },
    {year: '2020', },
    {year: '2021', },
  ];


  role: Role[] = [

    {role: 'Chairman'},
    {role: 'Coordinator'},
    {role: 'Member – teacher'},
    {role: 'Member – staff'},
    {role: 'Member – student'},
    {role: 'Member - alumni'},

  ]
  date;
  college;
  association;
  time;
  place;
  introduction;
  address;
  agendaNo;
  agenda_no;
  image;
  constructor(

    private fb: FormBuilder,
    public service: ServiceService,
    public dialogRef: MatDialogRef<ViewIQACMeetingDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public rowdata: any
  ) {
    this.Form = this.fb.group({
      academicYear: this.fb.control('',Validators.required),
      date:this.fb.control('',Validators.required),
      number_of_students:this.fb.control('',[Validators.required]),
      number_of_teachers:this.fb.control('',[Validators.required]),
      breif_report:this.fb.control('',Validators.required),
      // supporting_agency:this.fb.control('',Validators.required),

      agenda:this.fb.array([]),

    })
   }

   
  ngOnInit(): void {
    this.fetchData();
    this.service.getUserWithUserId().subscribe((res:any) =>
    {
     this.college =  res.college.name;
      //console.log(this.college)
      console.log(this.college)
      this.image=res.college.image;
      this.address=res.college.address;
      console.log(this.address)

      this.association =  res.college.association;
      //console.log(this.college)
      console.log(this.association)

      this.time=this.rowdata.time;
      console.log(this.time)

      this.place=this.rowdata.place;
      console.log(this.place)

      this.introduction=this.rowdata.introduction;
      console.log(this.introduction)

      this.agenda=this.agenda;
      console.log(this.agenda)  

      this.date =  this.rowdata.date;
      //console.log(this.college)
      console.log(this.date)
          
    })
  }

  report() {

    const dashboard = document.getElementById('plan');

    const dashboardHeight = dashboard.clientHeight;
    const dashboardWidth = dashboard.clientWidth;
    const options = { background: 'white', width: dashboardWidth, height: dashboardHeight };

    domtoimage.toPng(dashboard, options).then((imgData) => {
         const doc = new jsPDF("p", "pt", "a4");
         const imgProps = doc.getImageProperties(imgData);
         const pdfWidth = doc.internal.pageSize.getWidth();
         const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

         doc.addImage(imgData, 'JPG', 0, 0, pdfWidth-25, pdfHeight-10);
         doc.save('Dashboard for hyperpanels.pdf');
    });

 }

 report1() {

  var quotes = document.getElementById('print');

   html2canvas(quotes, {useCORS: true, scale:5}).then(canvas => {
     var imgData  = canvas.toDataURL("image/jpeg", 10);
     var pdf = new jsPDF("p", "pt", "a4");
     var pageWidth = pdf.internal.pageSize.getWidth();
     var pageHeight = pdf.internal.pageSize.getHeight();
     var imageWidth = canvas.width + 60;
     var imageHeight = canvas.height+160;

     var ratio = imageWidth/imageHeight >= pageWidth/pageHeight ? pageWidth/imageWidth : pageHeight/imageHeight;
      pdf.addImage(imgData, 'JPEG', 0.5, 4, imageWidth * ratio, imageHeight * ratio);

     pdf.save('IQAC Action.pdf');

   });


}

report2(){
  var data = document.getElementById('plan');  
html2canvas(data).then(canvas => {  
  // Few necessary setting options  
 
  const contentDataURL = canvas.toDataURL('image/png')  
  var margin = 2;
  var imgWidth = 210 - 2*margin;
  var pageHeight = 295;  
  var imgHeight = canvas.height * imgWidth / canvas.width;
  var heightLeft = imgHeight;
 
  var doc = new jsPDF('p', 'mm');
  var position = 5;
 
  doc.addImage(contentDataURL, 'JPEG', margin, position, imgWidth, imgHeight);
 
  heightLeft -= pageHeight;
 
  while (heightLeft >= 0) {
    position = heightLeft - imgHeight;
    doc.addPage();
    doc.addImage(contentDataURL, 'JPEG', margin, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
  }
  doc.save( 'file.pdf');
 
});
}

report3(){
  window.scrollTo(0,0);
  var data = document.getElementById('print');  
html2canvas(data).then(canvas => {  
  // Few necessary setting options  
 
  const contentDataURL = canvas.toDataURL('image/png')  
  var margin = 2;
  var imgWidth = 210 - 2*margin;
  var pageHeight = 295;  
  var imgHeight = canvas.height * imgWidth / canvas.width;
  let heightLeft = imgHeight;
 
  var doc = new jsPDF('p', 'mm');
  let position = 5;
 
  doc.addImage(contentDataURL, 'JPEG', margin, position, imgWidth, imgHeight+25);
 
  heightLeft -= pageHeight;
 
  while (heightLeft >= 0) {
    position = heightLeft - imgHeight;
    doc.addPage();
    doc.addImage(contentDataURL, 'JPEG', margin, position+10, imgWidth, imgHeight+25);
    heightLeft -= pageHeight;
  }
  doc.save( 'file.pdf');
 
});
}
///pdfMake Module
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
     
      pdf.text( '||  ' +this.college,margin[0]+0.2,11,null,null);
      pdf.text(String(page+1) + '  ||',8.5-1,11,null,null);
    }

    pdf.save('Minutes of IQAC Meeting.pdf');
 
});
}
///////
report5(){
 
  var data = document.getElementById('plan1');  
  html2canvas(data, { useCORS: true, allowTaint: true, scrollY: 0, scale:3 }).then((canvas) => {
    const image = { type: 'jpeg', quality: 1.4 };
    const margin = [0.5, 0.5];
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
    var pdf = new jsPDF('p', 'in', [8.27, 11.75]);
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

    pdf.save('ATR of IQAC Meeting.pdf');
 
});
}

report6(){
 
  var data = document.getElementById('plan');  
  html2canvas(data, { useCORS: true, allowTaint: true, scrollY: 0, scale:3 }).then((canvas) => {
    const image = { type: 'jpeg', quality: 1.4 };
    const margin = [0.5, 0.5];
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
    var pdf = new jsPDF('p', 'in', [8.27, 11.75]);
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

    pdf.save('ATR of IQAC Meeting.pdf');
 
});
}


//////



    get agendaControl() {
      this.agenda = this.Form.get('agenda') as FormArray;
      return this.agenda.controls;
    }

    createAgenda(): FormGroup {
      return this.fb.group({

        agenda_no: this.fb.control('',Validators.required),
        agenda_name:this.fb.control('',Validators.required),
        discussion:this.fb.control('',Validators.required),
        action:this.fb.control('',Validators.required),
        decision:this.fb.control('',Validators.required),
        proposer:this.fb.control('',Validators.required),
        seconder:this.fb.control('',Validators.required),

      });
    }

    addAgenda(): void {
      this.agenda = this.Form.get('agenda') as FormArray;
      this.agenda.push(this.createAgenda());
    }

    removeagenda(i: number) {
      this.agenda.removeAt(i);

    }

    fetchData() {
      console.log(this.rowdata);
      this.Form.get("academicYear").setValue(this.rowdata.academicYear);
      this.Form.get("date")?.setValue(this.rowdata.date);
      this.Form.get("number_of_teachers")?.setValue(this.rowdata.time);
      this.Form.get("number_of_students")?.setValue(this.rowdata.place);
      this.Form.get("breif_report")?.setValue(this.rowdata.introduction);

      this.agenda = this.Form.get('agenda') as FormArray;
      for(let i = 0; i<this.rowdata.agendas.length; i++) 
      {
        this.agenda.push(
          this.fb.group({
            agenda_no: this.fb.control(this.rowdata.agendas[i].agendaNo,Validators.required),
            agenda_name:this.fb.control(this.rowdata.agendas[i].agenda,Validators.required),
            discussion:this.fb.control(this.rowdata.agendas[i].discussion,Validators.required),
            action:this.fb.control(this.rowdata.agendas[i].actionTaken,Validators.required),
            decision:this.fb.control(this.rowdata.agendas[i].decision,Validators.required),
            proposer:this.fb.control(this.rowdata.agendas[i].proposer,Validators.required),
            seconder:this.fb.control(this.rowdata.agendas[i].seconder,Validators.required),
          })
        );
      }
    }
}



interface Year {
  year: String;
}

interface Role {
  role: String;
}
