import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ServiceService } from 'src/app/service.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { v4 as uuidv4 } from 'uuid';
import { AddImagesComponent } from '../add-images/add-images.component';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-criteria-report',
  templateUrl: './add-criteria-report.component.html',
  styleUrls: ['./add-criteria-report.component.scss']
})
export class AddCriteriaReportComponent implements OnInit {
  fileUpload = new FormData();
  caption;
  user;
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
  public item_data :any[] = [];
  public Form: FormGroup;
  types: any =[
    "AQAR",
    "SSR",
    ];

    metricArray:any[][]=[
      ['1.1.1','1.1.2','1.1.3'],
      ['2.1.1','2.2.2','2,3,3']


    ]
   onetype:any=[
    "1.1.1",
    "1.1.4"
   ] 
   twotype:any=[
    "2.1.1",
    "2.2.2"
   ]
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
    public dialogref: MatDialogRef<AddCriteriaReportComponent>,
    @Inject(MAT_DIALOG_DATA) public data : any,
    private http: HttpClient,
    public router: Router
  ) {
    this.Form = this.fb.group({
      academicYear: this.fb.control('',Validators.required),
      type:this.fb.control('',Validators.required),
      title:this.fb.control('',Validators.required),
      number_of_students:this.fb.control('',[Validators.required,Validators.pattern(new RegExp("[0-9]"))]),
      breif_report:this.fb.control('',Validators.required),
      link_any:this.fb.control('',Validators.required)
    })
   }


  ngOnInit(): void {
    this.getData();
    console.log("PP",this.data);
  }

  getData(){
    this.service.getUserWithUserId().subscribe((user: any) => {
      console.log("LATER USER",user);
     
    });

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

    let data : any = {
      metricTitle: this.Form.get("title")?.value,
      metricFor: this.Form.get("type")?.value,
      academicYear: this.Form.get("academicYear").value,
      metricNo : this.Form.get("number_of_students")?.value,
      ansBrief : this.Form.get("breif_report")?.value,
      anyLink : this.Form.get("link_any")?.value,
      documentOne:filename,
      documentTwo:pgFileName
     
    }


    console.log(data);
    this.service.getUserWithUserId().subscribe((user: any) => {
      console.log("USER",user);
      this.service.postData("/cri-qual/crh/"+user.crh.id, data).subscribe((res2: any) => {
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

    }, (err: any) => {
      console.warn(err);
    });



  }

}

interface Year {
  year: String;
}

interface Role {
  role: String;
}
