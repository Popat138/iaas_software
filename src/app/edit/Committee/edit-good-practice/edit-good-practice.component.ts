import { Component,Inject, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceService } from 'src/app/service.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { v4 as uuidv4 } from 'uuid';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-good-practice',
  templateUrl: './edit-good-practice.component.html',
  styleUrls: ['./edit-good-practice.component.scss']
})
export class EditGoodPracticeComponent implements OnInit {
  fileUpload = new FormData();
  yearControl = new FormControl('', Validators.required);
  committee : any = null;
  document:any=null;
  photograph:any=[];
  newsReport:any=[];
  participantList:any=null;
  final_data:any;
  fileName:'';
  htmlContent1= '';
  public item_data :any[] = [];
  public Form: FormGroup;
  constructor(
    private fb: FormBuilder,
    public service: ServiceService,
    @Inject(MAT_DIALOG_DATA) public data : any,
    public dialogRef: MatDialogRef<EditGoodPracticeComponent>,
    private http: HttpClient,
  ) { 
    console.log("data",data)
    this.committee = data;
    this.Form = this.fb.group({
      title:this.fb.control('',Validators.required),
      academicYear: this.fb.control('',Validators.required),
      context_name:this.fb.control('',Validators.required),
      best_report:this.fb.control('',[Validators.required, Validators.maxLength(5000)]),
      outcome_best:this.fb.control('',Validators.required),
      upload:this.fb.control('')
    })
  }
  year: Year[] = [
    {year: '2018-2019', },
    {year: '2019-2020', },
    {year: '2020-2021', },
    {year: '2021-2022', },
  ];

  ngOnInit(): void {
    this.getData();
  }
  getData(){
    console.log(this.data);
    this.Form.get("academicYear").setValue(this.data.year);
    this.Form.get("title").setValue(this.data.title);
    this.Form.get("context_name").setValue(this.data.context);
    this.Form.get("best_report").setValue(this.data.reportBest);
    this.Form.get("outcome_best").setValue(this.data.outcome);
    
    this.data.photographs.forEach((element, index) => {
      this.http.get(`${this.service.BASE_URL}/resources/uploads/${element.photo}`,{responseType: 'blob'}).subscribe(data => {
        this.photograph[index] = data;
        this.photograph[index].name = element.photo;
      });
    });

    this.data.newsReports.forEach((element, index) => {

      this.http.get(`${this.service.BASE_URL}/resources/uploads/${element.news}`,{responseType: 'blob'}).subscribe(data => {
        this.newsReport[index] = data;
        this.newsReport[index].name = element.news;

      });
    });
  }

  photographUpload(event: any){
    this.photograph = event.target.files;
  }

  newsReportUpload(event: any){
    this.newsReport = event.target.files;
  }

  participantListUpload(event: any){
    this.participantList = event.target.files[0];
  }
  submitForm(){
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
      photoFilenaamelist.push({
        photo: photographFilename
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
  let data : any = {
    id: this.data.id,
    year: this.Form.get("academicYear")?.value,
    title: this.Form.get("title")?.value,
    context:this.Form.get("context_name")?.value,
    reportBest : this.Form.get("best_report")?.value,
    outcome : this.Form.get("outcome_best")?.value,
    photographs: photoFilenaamelist,
    newsReports: newsReportList,
    
  
  }
  // console.log(data);
  
  this.service.putData("/good-practice", data).subscribe((res: any) => {
    console.log(res);
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
  
  
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    sanitize: true,
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
  
  }
  
  
  interface Year {
    year: String;
  }
  
  interface Role {
    role: String;
  }
  