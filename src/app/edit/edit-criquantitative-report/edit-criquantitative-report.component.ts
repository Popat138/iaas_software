import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ServiceService } from 'src/app/service.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { v4 as uuidv4 } from 'uuid';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

// import { AddImagesComponent } from '../add-images/add-images.component';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-edit-criquantitative-report',
  templateUrl: './edit-criquantitative-report.component.html',
  styleUrls: ['./edit-criquantitative-report.component.scss']
})
export class EditCriquantitativeReportComponent implements OnInit {

 
  fileUpload = new FormData();
  caption;
  ugFile:any=null;
  pgFile:any = null;
  photograph:any=[];
  uploads:any = null;
  newsReport:any=[];
  participantList:any=null;
  final_data:any;
  htmlContent1= '';
  toggle=true;
  fileName: string = "";
  togglepg=true;
  fileNamepg: string = "";
  toggleug=true;
  fileNameug: string = "";
  public item_data :any[] = [];
  public Form: FormGroup;
  types: any =[
    "AQAR",
    "SSR",
    ];
  year: Year[] = [
    {year: '2018', },
    {year: '2019', },
    {year: '2020', },
    {year: '2021', },
  ];

  constructor(
    private fb: FormBuilder,
    public service: ServiceService,
    public dialog : MatDialog,
    public dialogref: MatDialogRef<EditCriquantitativeReportComponent>,
    @Inject(MAT_DIALOG_DATA) public data : any,
    private http: HttpClient,
    public router: Router
  ) {
    this.Form = this.fb.group({
      academicYear: this.fb.control('',Validators.required),
      type:this.fb.control('',Validators.required),
      title:this.fb.control('',Validators.required),
      number_of_students:this.fb.control('',[Validators.required,Validators.pattern(new RegExp("[0-9]"))]),
      breif_report:this.fb.control(''),
      link_any:this.fb.control('')
    })
   }

  ngOnInit(): void {
    this.getData();
  }
  upload(event: any){
    this.uploads = event.target.files[0];
    this.fileName=event.target.files[0].name;
    this.toggle = !this.toggle;
  }

  pgFileUpload(event: any){
    // console.log(event.target.files[0]);
    this.pgFile = event.target.files[0];
    this.fileNamepg=event.target.files[0].name;
    this.togglepg = !this.togglepg;
  }
  ugFileUpload(event: any){
    // console.log(event.target.files[0]);
    this.ugFile = event.target.files[0];
    this.fileNameug=event.target.files[0].name;
    this.toggleug = !this.toggleug;
  }
  getData(){
    console.log("VIEWV DATA",this.data);
    console.log("CRH",this.data.crh.id);
    this.Form.get("academicYear").setValue(this.data.academicYear);
    // this.Form.get("name").setValue(this.data.crh.criteriaName);
    this.Form.get("title")?.setValue(this.data.metricTitle);
    this.Form.get("type")?.setValue(this.data.metricFor);
    this.Form.get("number_of_students")?.setValue(this.data.metricNo);
    this.Form.get("breif_report")?.setValue(this.data.ansBrief);
    this.Form.get("link_any")?.setValue(this.data.anyLink);
    this.http.get(`${this.service.BASE_URL}/resources/uploads/${this.data?.documentOne}`,{responseType: 'blob'}).subscribe(data => {
      this.uploads = data;
      this.uploads.name = this.data?.documentOne;
  
      
    });
  
    this.http.get(`${this.service.BASE_URL}/resources/uploads/${this.data?.documentTwo}`,{responseType: 'blob'}).subscribe(data => {
      this.pgFile = data;
      this.pgFile.name = this.data?.documentTwo;
     
    });
    this.http.get(`${this.service.BASE_URL}/resources/uploads/${this.data?.documentThree}`,{responseType: 'blob'}).subscribe(data => {
      this.ugFile = data;
      this.ugFile.name = this.data?.documentThree;
     
    });
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
  submitForm(){
    let photographExt =  this.uploads?.name.split('.').pop();
    let filename: any = null;
    if(this.uploads != undefined && this.uploads != null ) {
      filename = uuidv4() + "." + photographExt;
      this.fileUpload.append("files", this.uploads, filename) ;
    } else {
      console.log(`document not provided.`);
    }

    let pgExt =  this.pgFile?.name.split('.').pop();
    let pgFileName: any = null;
    if(this.pgFile != undefined && this.pgFile != null ) {
      pgFileName = uuidv4() + "." + pgExt
      this.fileUpload.append("files", this.pgFile, pgFileName)
    } else {
      console.log(`Document not provided.`);
    }
    let ugExt =  this.ugFile?.name.split('.').pop();
    let ugFileName: any = null;
    if(this.ugFile != undefined && this.ugFile != null ) {
      ugFileName = uuidv4() + "." + ugExt
      this.fileUpload.append("files", this.ugFile, ugFileName)
    } else {
      console.log(`Document not provided.`);
    }
    
    let data : any = {
      id:this.data.id,
      crhId:this.data.crh.id,
      metricTitle: this.Form.get("title")?.value,
      metricFor: this.Form.get("type")?.value,
      academicYear: this.Form.get("academicYear").value,
      metricNo : this.Form.get("number_of_students")?.value,
      ansBrief : this.Form.get("breif_report")?.value,
      anyLink : this.Form.get("link_any")?.value,
      documentOne:filename,
      documentTwo:pgFileName,
      documentThree:ugFileName
      
    }
    console.log("Submitted",data.crhId);
    // this.service.getUserWithUserId().subscribe((user: any) => {
      // console.log("NORMAL USER",user);
      this.service.putData(`/cri-quant`, data).subscribe((res2: any) => {
        console.log("FINAL",res2)
        if(this.fileUpload.getAll("files").length > 0){
          this.service.postData("/upload", this.fileUpload).subscribe(res2 => {
            this.dialogref.close();
          }, (err2 : any) => {
            alert("Error try again later!!");
            this.dialogref.close();
          });
        } else {
          this.dialogref.close();
        }
        
      }, (err2 : any) => {
        alert("Error try again later!!");
        this.dialogref.close();
      });

    // }, (err: any) => {
    //   console.warn(err);
    // });



  }

}

interface Year {
  year: String;
}

interface Role {
  role: String;
}