import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core/datetime/date-adapter';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ServiceService } from 'src/app/service.service';
import { v4 as uuidv4 } from 'uuid';
import { AddImagesComponent } from '../add-images/add-images.component';

@Component({
  selector: 'app-add-new-development-program',
  templateUrl: './add-new-development-program.component.html',
  styleUrls: ['./add-new-development-program.component.scss']
})
export class AddNewDevelopmentProgramComponent implements OnInit {

  fileUpload = new FormData();
  caption;
  photograph:any=[];
  newsReport:any=[];
  participantList:any=null;
  final_data:any;
  public item_data :any[] = [];
  public Form: FormGroup;
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
  constructor(

    private fb: FormBuilder,
    public service: ServiceService,
    public dialog : MatDialog,
   @Inject(MAT_DIALOG_DATA) public data : any,
    public dialogRef: MatDialogRef<AddNewDevelopmentProgramComponent>
    // private http: HttpClient,

  ) {
   // this.committeeId = data.committeeId;
    this.Form = this.fb.group({
      academicYear: this.fb.control('',Validators.required),
      title:this.fb.control('',Validators.required),
      f_date:this.fb.control('',Validators.required),
      t_date:this.fb.control('',Validators.required),
      number_of_students:this.fb.control('',[Validators.required,Validators.pattern(new RegExp("[0-9]"))]),
      number_of_teachers:this.fb.control('',[Validators.required,Validators.pattern(new RegExp("[0-9]"))]),
      breif_report:this.fb.control('',[Validators.required, Validators.maxLength(15000)]),
      supporting_agency:this.fb.control('',Validators.required)
    })
    //this.adapter.setLocale("en-IN");
   }

  ngOnInit(): void {
    this.photographUpload;
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

  photographUpload(event: any){
    this.photograph = event.target.files;
    console.log(this.photograph);
}


  newsReportUpload(event: any){
    this.newsReport = event.target.files;
    console.log(this.newsReport);
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
    for(let i = 0;i< this.photograph.length;i++){

      let photographExt =  this.photograph[i]?.name.split('.').pop();
      let photographFilename: any = null;
      if(this.photograph[i] != undefined && this.photograph[i] != null ) {
        photographFilename = uuidv4() + "." + photographExt;
        this.fileUpload.append("files", this.photograph[i], photographFilename) ;
      } else {
        console.log(`document not provided.`);

      }

      photoFilenaamelist.push({
        photo: photographFilename
      })

    }
    let newsReportList:any[] = [];
    for(let i = 0;i< this.newsReport.length;i++){
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
      this.fileUpload.append("files", this.participantList, participantListFilename);
    } else {
      console.log(`document not provided.`);
    }

    let data : any = {
      academicYear: this.Form.get("academicYear").value,
      title: this.Form.get("title")?.value,
      fromDate : this.Form.get("f_date")?.value,
      toDate : this.Form.get("t_date")?.value,
      noOfTeachers : this.Form.get("number_of_teachers")?.value,
      noOfStudent : this.Form.get("number_of_students")?.value,
      reportBrief : this.Form.get("breif_report")?.value,
      supportingAgency : this.Form.get("supporting_agency")?.value,
      reportType: "DEVELOPMENT_PROGRAM",
      captions: agendaList,
      photographs: photoFilenaamelist,
      newsReports: newsReportList,
      listOfParticipants: [{
        participant: participantListFilename
      }]
    }

  this.service.postData("/iqac-report/", data).subscribe((res: any) => {
    if(this.fileUpload.getAll("files").length > 0){
      this.service.postData("/upload", this.fileUpload).subscribe(res2 => {
        console.log(res2);
      });
    }
  }, (err: any) => {
    console.warn("Error try again later!!");
  }, () => {
    this.dialogRef.close();
  })
}

}



interface Year {
  year: String;
}

interface Role {
  role: String;
}

