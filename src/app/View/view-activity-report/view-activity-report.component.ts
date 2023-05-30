import { Component, Inject, OnInit,ViewChild, ElementRef } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DownloadService } from 'src/app/download.service';
import { ServiceService } from 'src/app/service.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { ContentObserver } from '@angular/cdk/observers';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import domtoimage from 'dom-to-image';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";  
declare var require: any;
const htmlToPdfmake = require("html-to-pdfmake");
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-view-activity-report',
  templateUrl: './view-activity-report.component.html',
  styleUrls: ['./view-activity-report.component.scss']
})
export class ViewActivityReportComponent implements OnInit {
test;
photo;
news;
college;
association;
image;
fdate;
tdate;
address
aphaNumeric:any[]=[];
  constructor(public dialog : MatDialog,
    public service : ServiceService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public router: Router,
    public download: DownloadService,

  ) { }

  public Form: FormGroup;
  dataSource_pdp!:MatTableDataSource<ViewActivityReportComponent>;
  @ViewChild('pdfTable') pdfTable: ElementRef;

  ngOnInit(): void {
     console.log(this.data);
    // this.fetchData_pdp();
    // this.report();
    this.service.getUserWithUserId().subscribe((res:any) =>
{
 this.college =  res.college.name;
 this.image=res.college.image;
 console.log(this.image);
  //console.log(this.college)
  console.log(this.college)
  this.address =  res.college.address;
  //console.log(this.college)
  console.log(this.address)
  this.association =  res.college.association;
  // console.log(this.data.fromDate)
  this.fdate = this.data.fromDate;
  this.tdate = this.data.toDate;
  console.log(this.fdate);
  console.log(this.tdate);
  var alphaNumeric = this.data.photographs.concat(this.data.newsReports)
  console.log("New Photodata",alphaNumeric);
})
  }



  formatDate(date) {
    const options:any = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    };
  }

  report() {
    console.log("this.data.photographs",this.data.photographs)
    // this.photo = this.data.photographs[0].photo;
    // this.news =this.data.newsReports[0].news;
    // console.log(this.photo)
    // console.log(this.news)

     var quotes = document.getElementById('report');

      html2canvas(quotes, {useCORS: true, allowTaint: true, scrollY: 0,scale:3}).then(canvas => {
        var imgData  = canvas.toDataURL("image/jpeg", 10);
        var pdf = new jsPDF("p", "mm", "a4");
        var margins={
          top:1,
          bottom:1,
          left:0,
          // width:522,
                  };
        var pageWidth = pdf.internal.pageSize.getWidth();
        var pageHeight = pdf.internal.pageSize.getHeight();
        var imageWidth = canvas.width;
        var imageHeight = canvas.height;

        var ratio = imageWidth/imageHeight >= pageWidth/pageHeight ? pageWidth/imageWidth : pageHeight/imageHeight;

         pdf.addImage(imgData, 'JPEG', 5, 4, imageWidth * ratio, imageHeight * ratio);

        pdf.save('Report.pdf');

      });


}

report5(){
  console.log("this.data.photographs",this.data.photographs)
  var data = document.getElementById('report');  
  html2canvas(data, { useCORS: true, allowTaint: true, scrollY: 0,scale:5  }).then((canvas) => {
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
      /// This is new part
      let heightLeft = pageHeight;
      // for (var i = 0; i <this.data.photographs.length; i++) {
      //   let imageData: any = this.getBase64Image(
      //     document.getElementById('photograph'+i)
      //   );
        
      //   pdf.addImage(
      //     imageData.photograph,
      //     'JPG',
      //     10,
      //     10,
      //     imageData.width,
      //     imageData.height
      //   );
      
      // }
      // Add the page to the PDF.
      if (page > 0) pdf.addPage();
      // debugger;
      var imgData = pageCanvas.toDataURL('image/' + image.type, image.quality);
      pdf.addImage(imgData, image.type, margin[1], margin[0]+0.2, innerPageWidth, pageHeight);
     
      pdf.text( '||  ' +this.college,margin[0]+0.2,11,null,null);
      pdf.text(String(page+1) + '  ||',8.5-1,11,null,null);
    }

  
    pdf.save('Report of Event.pdf');
 
});
}

printPage() {
  window.print();
}

report6(){
  console.log("this.data.photographs",this.data.photographs)
  var data = document.getElementById('report');  
  html2canvas(data, { useCORS: true, allowTaint: true, scrollY: 0,scale:5  }).then((canvas) => {
    const imgData = canvas.toDataURL('image/png');
    const imgWidth = 190;
    const pageHeight = 290;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    const doc = new jsPDF('p', 'mm','a4');
    let position = 0;
    doc.addImage(imgData, 'PNG', 10, 0, imgWidth, imgHeight + 25);
    for (var i = 0; i <this.data.photographs.length; i++) {
      let imageData: any = this.getBase64Image(
        document.getElementById('photograph'+i)
      );
      heightLeft -= pageHeight;
    while (heightLeft < imageData.height) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(
        imageData.photograph,
        'JPG',
        10,
        10,
        imageData.width,
        imageData.height
      );
      heightLeft -= pageHeight;
    }
  }
    heightLeft -= pageHeight;
    while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight + 25);
        heightLeft -= pageHeight;
    }

  
    doc.save('Report of Event.pdf');
 
});
}


images = [
  {
     name: 'Image 1',
     url: '{{this.service.BASE_URL}}/resources/uploads/{{this.data.photographs[0].photo}}',
   },
   {
     name: 'Image 2',
     url: '{{this.service.BASE_URL}}/resources/uploads/{{this.data.photographs[1].photo}}',
   },
   {
     name: 'Image 3',
     url: '{{this.service.BASE_URL}}/resources/uploads/{{this.data.photographs[2].photo}}',
   }
 ];

getBase64Image(photograph: any) {
  var canvas = document.createElement('canvas');
  canvas.classList.add('myStyle');
  console.log(photograph.width, 'x', photograph.height);
  canvas.width = 446;
  canvas.height = 631;
  var ctx: any = canvas.getContext('2d');
  ctx.drawImage(photograph, 0, 0);
  var dataURL = canvas.toDataURL('image/png');
  return { photograph: dataURL, width: canvas.width/2, height: canvas.height/2 };
} 

pstReport() {
  let doc = new jsPDF('p', 'px', 'a4');
  console.log("this.data.photographs",this.data.photographs)
  for (var i = 0; i <this.data.photographs.length; i++) {
    let imageData: any = this.getBase64Image(
      document.getElementById('photograph'+i)
    );
    doc.addImage(
      imageData.photograph,
      'JPG',
      10,
      10,
      imageData.width,
      imageData.height
    );
  }
    doc.addPage();
  
    doc.save('testPdf.pdf');
}


}





