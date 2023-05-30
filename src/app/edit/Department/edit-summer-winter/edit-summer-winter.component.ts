import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceService } from 'src/app/service.service';
import { v4 as uuidv4 } from 'uuid';
import { HttpClient } from "@angular/common/http";
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { EditImagesReportComponent } from '../../Committee/edit-images-report/edit-images-report.component';
@Component({
  selector: 'app-edit-summer-winter',
  templateUrl: './edit-summer-winter.component.html',
  styleUrls: ['./edit-summer-winter.component.scss']
})
export class EditSummerWinterComponent implements OnInit {
  fileUpload = new FormData();
  yearControl = new FormControl('', Validators.required);
  department : any = null;
  document:any=null;
  photograph:any=[];
  caption:any=[];
  newsReport:any=[];
  participantList:any=null;
  final_data:any;
  htmlContent1= '';
  public item_data :any[] = [];
  public academic_calander: FormArray = this.fb.array([]);
  public add_details: FormArray = this.fb.array([]);
  public Form: FormGroup;
  public meeting_details: FormArray = this.fb.array([]);
  public report_activity: FormArray = this.fb.array([]);
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
    public dialogRef: MatDialogRef<EditSummerWinterComponent>,
    private http: HttpClient,

  ) {
    this.department = data;
    this.Form = this.fb.group({
      academicYear:this.fb.control('',Validators.required),
      title:this.fb.control('',Validators.required),
      f_date:this.fb.control('',Validators.required),
      t_date:this.fb.control('',Validators.required),
      number_of_students:this.fb.control('',[Validators.required,Validators.pattern(new RegExp("[0-9]"))]),
      number_of_teachers:this.fb.control('',[Validators.required,Validators.pattern(new RegExp("[0-9]"))]),
      guest_name:this.fb.control('',Validators.required),
      breif_report:this.fb.control('',Validators.required),
      supporting_agency:this.fb.control('',Validators.required),
    })
   }
  ngOnInit(): void {
    this.getData();
  }
  addPhoto(){
    const dialogRefS = this.dialog.open(EditImagesReportComponent ,{width: "70%",height: "86vh",panelClass: 'full-width-dialog', data : {"committeeId": this.data}});
    this.getData();
    dialogRefS.afterClosed().subscribe(result => {
      console.log(result)
      this.photograph=result[0].photograph
      this.caption=result[0].caption.value
      // this.fetchActvityReport();
    });
  }
  getData() {
    console.log(this.data);
    this.Form.get("academicYear").setValue(this.data.year);
    this.Form.get("title").setValue(this.data.title);
    this.Form.get("f_date").setValue(this.data.fromDate);
    this.Form.get("t_date").setValue(this.data.toDate);
    this.Form.get("number_of_students").setValue(this.data.noOfStudent);
    this.Form.get("number_of_teachers").setValue(this.data.noOfTeachers);
    this.Form.get("guest_name").setValue(this.data.guests);
    this.Form.get("breif_report").setValue(this.data.reportBrief);
    this.Form.get("supporting_agency").setValue(this.data.supportingAgency);
    // this.http.get(`${this.service.BASE_URL}/resources/uploads/${this.data.photographs.photo}`,{responseType: 'blob'}).subscribe(data => {
    //   let photos:any[]=[]
    //   for(let i=0;i<this.photograph.length, i++){
    //   this.photograph = data;
    //   this.photograph.name = this.data.photographs.photo;

    //   photos.push({
    //     img : photos
    //   })
    // }
    // });
    this.caption=this.data.captions;    
this.data.photographs.forEach((element, index) => {
  this.http.get(`${this.service.BASE_URL}/resources/uploads/${element.photo}`,{responseType: 'blob'}).subscribe(data => {
    this.photograph[index] = data;
    this.photograph[index].name = element.photo;
    // this.photograph[index].caption = element.caption;
  });
});
this.data.newsReports.forEach((element, index) => {
  this.http.get(`${this.service.BASE_URL}/resources/uploads/${element.news}`,{responseType: 'blob'}).subscribe(data => {
    this.newsReport[index] = data;
    this.newsReport[index].name = element.news;

  });
});

this.http.get(`${this.service.BASE_URL}/resources/uploads/${this.data.listOfParticipants[0].participant}`,{responseType: 'blob'}).subscribe(data => {
  this.participantList = data;
  this.participantList.name = this.data.listOfParticipants[0].participant;
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

  ////////////////////////////////////////////////////////////////////////////////////////



  submitForm(){
    console.log("NEW CAPTION",this.caption);
 /////
 let agendaList: any[] = [];
 for(let i = 0; i< this.photograph?.length; i++) {
  agendaList.push({
    id:this.caption[i].id,
    caption:this.caption[i].caption,
    
  });
}
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
        photo: photographFilename,
        // caption: this.caption[i]?.caption
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
      id: this.data.id,
      year: this.Form.get("academicYear")?.value,
      title: this.Form.get("title")?.value,
      fromDate : this.Form.get("f_date")?.value,
      toDate : this.Form.get("t_date")?.value,
      noOfTeacher : this.Form.get("number_of_teachers")?.value,
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

    // console.log(data);

    this.service.putData("/school-report", data).subscribe((res: any) => {
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
