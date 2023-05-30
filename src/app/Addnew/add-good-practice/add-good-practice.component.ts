import { Component,Inject, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceService } from 'src/app/service.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { v4 as uuidv4 } from 'uuid';
@Component({
  selector: 'app-add-good-practice',
  templateUrl: './add-good-practice.component.html',
  styleUrls: ['./add-good-practice.component.scss']
})
export class AddGoodPracticeComponent implements OnInit {
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
    public dialogRef: MatDialogRef<AddGoodPracticeComponent>

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
  }
  photographUpload(event: any){
    this.photograph = <File>event.target.files;
    if (this.photograph) {

      this.fileName = this.photograph.name;

      const formData = new FormData();

      formData.append("thumbnail", this.photograph);

      // const upload$ = this.http.post("/api/thumbnail-upload", formData);

      // upload$.subscribe();
  }
  }

  newsReportUpload(event: any){
    this.newsReport = <File>event.target.files;
  }

  participantListUpload(event: any){
    this.participantList = <File>event.target.files[0];
  }

  ////////////////////////////////////////////////////////////////////////////////////////

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
    year: this.Form.get("academicYear")?.value,
    title: this.Form.get("title")?.value,
    context:this.Form.get("context_name")?.value,
    reportBest : this.Form.get("best_report")?.value,
    outcome : this.Form.get("outcome_best")?.value,
    photographs: photoFilenaamelist,
    newsReports: newsReportList,
    
 
}

  console.log(data);

  this.service.postData("/good-practice/committee/"+this.data.committeeId , data).subscribe((res: any) => {
    console.log(res);
    if(this.fileUpload.getAll("files").length > 0){
      this.service.postData("/upload", this.fileUpload).subscribe(res2 => {
        console.log("File Name",res2);
      });
    }
  }, (err: any) => {
    console.warn("Error try again later!!");
  }, () => {
    this.dialogRef.close();
  })

  }

// fetchcommittee (){

//     this.service.postData("/committee/user/"+localStorage.getItem('userId'), this.final_data).subscribe((res: any) => {
//       console.log(res);
//     }, (err: any) => {
//       console.warn("No committee available!!");
//     })

//   }
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
