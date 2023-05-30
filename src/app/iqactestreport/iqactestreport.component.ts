
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DownloadService } from '../download.service';
import { ServiceService } from '../service.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { ContentObserver } from '@angular/cdk/observers';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-iqactestreport',
  templateUrl: './iqactestreport.component.html',
  styleUrls: ['./iqactestreport.component.scss']
})
export class IqactestreportComponent implements OnInit {
  test;
  photo;
  news;
  college;
  image;
  association;
  fdate;
  tdate;
  address
    constructor(    public dialog : MatDialog,
      public service : ServiceService,
      @Inject(MAT_DIALOG_DATA) public data: any,
      public router: Router,
      public download: DownloadService,) { }
      public Form: FormGroup;
    dataSource_pdp!:MatTableDataSource<IqactestreportComponent>;
  
    ngOnInit(): void {
      console.log(this.data);
      // this.fetchData_pdp();
      // this.report();
      this.service.getUserWithUserId().subscribe((res:any) =>
  {
   this.college =  res.college.name;
   this.image=res.college.image;
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
    console.log(this.image)
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
  
        html2canvas(quotes, {useCORS: true, scale:5}).then(canvas => {
          var imgData  = canvas.toDataURL("image/jpeg", 10);
          var pdf = new jsPDF("p", "mm", "a4");
          var margins={
            top:20,
            bottom:20,
            left:40,
            width:522,
                    };
          var pageWidth = pdf.internal.pageSize.getWidth();
          var pageHeight = pdf.internal.pageSize.getHeight();
          var imageWidth = canvas.width-20;
          var imageHeight = canvas.height;
  
          var ratio = imageWidth/imageHeight >= pageWidth/pageHeight ? pageWidth/imageWidth : pageHeight/imageHeight;
  
           pdf.addImage(imgData, 'JPEG', 5, 4, imageWidth * ratio-17, imageHeight * ratio);
  
          pdf.save('Report.pdf');
  
        });
  
  
  }
  
  report5(){
    console.log("this.data.photographs",this.data.photographs)
    var data = document.getElementById('report');  
    html2canvas(data, { useCORS: true, allowTaint: true, scrollY: 0 }).then((canvas) => {
      const image = { type: 'jpeg', quality: 1.2 };
      const margin = [0.5, 0.5];
      const filename = 'myfile.pdf';
  
      var imgWidth = 8.27;
      var pageHeight = 11.75;
  
      var innerPageWidth = imgWidth - margin[0] * 2;
      var innerPageHeight = pageHeight - margin[1] * 2;
  
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
        pdf.setFontSize(8);
        pageCtx.fillStyle = 'white';
        pageCtx.fillRect(0, 0, w, h);
        pageCtx.drawImage(canvas, 0, page * pxPageHeight, w, h, 0, 0, w, h);
  
        // Add the page to the PDF.
        if (page > 0) pdf.addPage();
        debugger;
        var imgData = pageCanvas.toDataURL('image/' + image.type, image.quality);
        pdf.addImage(imgData, image.type, margin[1], margin[0], innerPageWidth, pageHeight);
        // pdf.text( '||  ' +this.college,margin[0]+0.2,11-0.3,null,null);
        // pdf.text(String(page+1) + '  ||',8.5-margin[0],11-0.3,null,null);
      }
  
      pdf.save('Report of Event.pdf');
   
  });
  }
  
  printPage() {
    window.print();
  }
  
  
  
  
  }
  
  
  
  
  
  