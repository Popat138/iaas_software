import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceService } from 'src/app/service.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { v4 as uuidv4 } from 'uuid';
import { AddImagesComponent } from '../add-images/add-images.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-new-committee-report',
  templateUrl: './add-new-committee-report.component.html',
  styleUrls: ['./add-new-committee-report.component.scss'],
  
  
 
  
  })
export class AddNewCommitteeReportComponent implements OnInit {
 
 
  ckeditorContent: string = '<p>Some html</p>';
  year: Year[] = [
    {year: '2018-2019', },
    {year: '2019-2020', },
    {year: '2020-2021', },
    {year: '2021-2022', },
  ];

  fileUpload = new FormData();
  uploads;
  photograph;
  caption;
  newsReport;
  participantList;
 committee:any=null;
  committeeId : any = null;
  document:any=null;
  final_data:any;
  htmlContent1= '';
  public Form: FormGroup;
  constructor(

    private fb: FormBuilder,
    public service: ServiceService,
    public dialog : MatDialog,
    public dialogref: MatDialogRef<AddNewCommitteeReportComponent>,
    @Inject(MAT_DIALOG_DATA) public data : any,
  ) {
    console.log("data",data)
    this.committeeId = data;
    this.Form = this.fb.group({
      year: this.fb.control('',Validators.required),
      title:this.fb.control('',Validators.required),
      f_date:this.fb.control('',Validators.required),
      t_date:this.fb.control('',Validators.required),
      number_of_students:this.fb.control('',[Validators.required,Validators.pattern(new RegExp("[0-9]"))]),
      number_of_teachers:this.fb.control('',[Validators.required,Validators.pattern(new RegExp("[0-9]"))]),
      breif_report:this.fb.control('',[Validators.required, Validators.maxLength(15000)]),
      guest_name:this.fb.control('',Validators.required),
      supporting_agency:this.fb.control('',Validators.required),
      upload:this.fb.control('')

    })

   }

  ngOnInit(): void {
  }

  addPhoto(){
    const dialogRefS = this.dialog.open(AddImagesComponent ,{width: "70%",height: "86vh",panelClass: 'full-width-dialog', data : {"committeeId": "sdjkgjhgsdj"}});
    dialogRefS.afterClosed().subscribe(result => {
      console.log(result)
      this.photograph=result[0].photograph
      this.caption=result[0].caption.value
      // this.fetchActvityReport();
    });
  }
  
  photgraphUpload(event: any){
    this.photograph = event.target.files;
  }

  newsReportUpload(event: any){
    this.newsReport = event.target.files;
  }

  participantListUpload(event: any){
    this.participantList = event.target.files[0];
  }


  submitForm(){
    console.log("CAPTIOM ADDED", this.caption);
    let agendaList: any[] = [];
    for(let i = 0; i< this.photograph?.length; i++) {
     agendaList.push({
       
       caption:this.caption[i].caption,
       
     });
   }
   console.log("ÄGENDA",agendaList);
    let photoFilenaamelist:any[] = [];
    for(let i = 0;i< this.photograph?.length;i++){

      let photographExt =  this.photograph[i]?.name.split('.').pop();
      let photographFilename: any = null;
      if(this.photograph[i] != undefined && this.photograph[i] != null ) {
        photographFilename = uuidv4() + "." + photographExt;
        this.fileUpload.append("files", this.photograph[i], photographFilename) ;
      } else {
        console.log(`document not provided.`);

      }
      console.log(this.caption)
      photoFilenaamelist.push({
        photo: photographFilename,
        // caption: this.caption[i].caption
      })
    }

    let newsReportList:any[] = [];
    for(let i = 0;i< this.newsReport?.length;i++){
    let newsReportExt =  this.newsReport[i]?.name.split('.').pop();
    let newsReportFilename: any = null;
    if(this.newsReport[i] != undefined && this.newsReport[i] != null ) {
      newsReportFilename = uuidv4() + "." + newsReportExt;
      this.fileUpload.append("files", this.newsReport[i], newsReportFilename);
    } else {
      console.log(`document not provided.`);
    }
    newsReportList.push({
      news: newsReportFilename
    })
  }

    let participantListExt =  this.participantList?.name.split('.').pop();
    let participantListFilename: any = null;
    if(this.participantList != undefined && this.participantList != null ) {
      participantListFilename = uuidv4() + "." + participantListExt
      this.fileUpload.append("files", this.participantList, participantListFilename)
    } else {
     // console.log(`At index ${i} document not provided.`);
    }

    // reportOfActivitieList.push({
    //   titleOfActivity: this.Form.get("title")?.value,
    //   fromDate : this.Form.get("f_date")?.value,
    //   toDate : this.Form.get("t_date")?.value,
    //   noOfTeachers : this.Form.get("number_of_teachers")?.value,
    //   noOfStudent : this.Form.get("number_of_students")?.value,
    //   reportBrief : this.Form.get("breif_report")?.value,
    //   supportingAgency : this.Form.get("supporting_agency")?.value,
    //   photographs: [{
    //     photo: photographFilename
    //   }],
    //   newsReports: [{
    //     news: newsReportFilename
    //   }],
    //   listOfParticipants: [{
    //     participant: participantListFilename
    //   }]
    // })
  // }

  let data : any = {
    year : this.Form.get("year")?.value,
    titleOfActivity: this.Form.get("title")?.value,
    fromDate : this.Form.get("f_date")?.value,
    toDate : this.Form.get("t_date")?.value,
    noOfTeachers : this.Form.get("number_of_teachers")?.value,
    noOfStudent : this.Form.get("number_of_students")?.value,
    guests:this.Form.get("guest_name")?.value,
    reportBrief : this.Form.get("breif_report")?.value,
    supportingAgency : this.Form.get("supporting_agency")?.value,
    captions: agendaList,
    photographs: photoFilenaamelist,
    newsReports: newsReportList,
    listOfParticipants: [{
      participant: participantListFilename
    }]
}



      this.service.postData("/activity-report/committee/" + this.data.committeeId , data).subscribe((res: any) => {
        this.dialogref.close();
        if(this.fileUpload.getAll("files").length > 0){
        this.service.postData("/upload", this.fileUpload).subscribe(res2 => {
          console.log(res2);
        });
      }
      }, (err2 : any) => {

        console.log(err2);
      alert("Error try again later!!");
      this.dialogref.close();
      })
    // }, (err:any) => {
    //   alert("Error try again later!!");
    //   this.dialogref.close();
    // })
    Swal.fire({
      title: 'Submitted Successfully?',
      text: "Congratulations!",
      icon: 'info',
      // showCancelButton: true,
      // confirmButtonColor: '#3085d6',
      // cancelButtonColor: '#d33',
      // confirmButtonText: 'Yes, delete it!'
    })
  }
  
  
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    sanitize: false,
    defaultParagraphSeparator: 'p',
    defaultFontName: '',
  
    fonts: [
      
      {class: 'arial', name: 'Arial'},
      {class: 'times-new-roman', name: 'Times New Roman'},
      {class: 'calibri', name: 'Calibri'},
      {class: 'comic-sans-ms', name: 'Comic Sans MS'}
    ],
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ]
  };




///// 
econfig = {
  placeholder: '',
  tabsize: 2,
  height: '200px',
  uploadImagePath: '/api/upload',
  toolbar: [
      ['misc', ['codeview', 'undo', 'redo']],
      ['style', ['bold', 'italic', 'underline', 'clear']],
      ['font', ['bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript', 'clear']],
      ['fontsize', ['fontname', 'fontsize', 'color']],
      ['para', ['style', 'ul', 'ol', 'paragraph', 'height']],
      ['insert', ['table', 'picture', 'link', 'video', 'hr']]
  ],
  fontNames: ['Helvetica', 'Arial', 'Arial Black', 'Comic Sans MS', 'Courier New', 'Roboto', 'Times']
}

}
interface Year {
  year: String;
}
