import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceService } from 'src/app/service.service';
import { v4 as uuidv4} from 'uuid';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { SelectOption } from '@kolkov/angular-editor/lib/ae-select/ae-select.component';
import { UploadResponse } from '@kolkov/angular-editor';
@Component({
  selector: 'app-edit-teaching-methods',
  templateUrl: './edit-teaching-methods.component.html',
  styleUrls: ['./edit-teaching-methods.component.scss']
})
export class EditTeachingMethodsComponent implements OnInit {
  user: any[] = [];
  fileUpload = new FormData();
  course: any = null;
  uploads:any[] = [];
  photograph:any=[];
  program: any = null;
  divisions: any = null;
  htmlContent1= '';
  htmlContent2='';
  types:any=[
'Experiential Learning',
'Participative Learning',
'Problem Solving',
'Co opetative learning',
'Collaborative learning'
  ];
  public programDetails: any = null;

  year: any[] = [
    {year: '2018-2019', },
    {year: '2019-2020', },
    {year: '2020-2021', },
    {year: '2021-2022', },
  ];

  // report:any=null;
  public Form: FormGroup;
  public other : FormArray = this.fb.array([]);
  constructor(
    private fb: FormBuilder,
    public service: ServiceService,
    @Inject(MAT_DIALOG_DATA) public data : any,

    public dialogref: MatDialogRef<EditTeachingMethodsComponent>,
    public dialog: MatDialog,
    private http: HttpClient,
    public router: Router

  ) { 
    this.Form = this.fb.group({
      academicYear: this.fb.control('',Validators.required),
      resource:this.fb.control(''),
      link_one:this.fb.control(''),
      link_two:this.fb.control(''),
      title:this.fb.control(''),
      number_of_students: this.fb.control(''),
      breif_report:this.fb.control('',[Validators.required, Validators.maxLength(15000)]),
      learn:this.fb.control('',[Validators.required, Validators.maxLength(15000)]),
      //,[Validators.required, Validators.maxLength(15000)]
      //year: this.fb.control('',Validators.required),
     // semester: this.fb.control('',Validators.required),
      // class: this.fb.control('',Validators.required),
      // div: this.fb.control('',Validators.required),
      // program: this.fb.control('',Validators.required),
      // c_code: this.fb.control('',Validators.required),
      // c_name: this.fb.control('',Validators.required),
      type: this.fb.control(''),
      // type2: this.fb.control(''),
      // type3: this.fb.control(''),
      p_class: this.fb.control(''),
      p_subject: this.fb.control(''),
      f_date:this.fb.control(''),
      t_date:this.fb.control(''),
       // month: this.fb.control('',Validators.required),
      //other:this.fb.array([this.createother()]),
    })

  }

  ngOnInit(): void {
    this.getData();
  }
 getData(){
  console.log(this.data);
  this.Form.get("academicYear").setValue(this.data.academicYear);
  this.Form.get("resource").setValue(this.data.ictResources);
  this.Form.get("link_one").setValue(this.data.ictLinkone);
  this.Form.get("link_two").setValue(this.data.ictLinktwo);
  this.Form.get("type").setValue(this.data.type);
  this.Form.get("title").setValue(this.data.titleOfMethod);
  this.Form.get("number_of_students").setValue(this.data.noOfStudent);
  this.Form.get("breif_report").setValue(this.data.reportBrief);
  this.Form.get("learn")?.setValue(this.data.learnOutcomes),
  this.Form.get("p_class").setValue(this.data.pclass);
  this.Form.get("p_subject").setValue(this.data.psubject);
  this.Form.get("f_date").setValue(this.data.fromDate);
  this.Form.get("t_date").setValue(this.data.toDate);

  this.data.photographs.forEach((element, index) => {
    this.http.get(`${this.service.BASE_URL}/resources/uploads/${element.photo}`,{responseType: 'blob'}).subscribe(data => {
      this.photograph[index] = data;
      this.photograph[index].name = element.photo;
    });
  });

 }

  photographUpload(event: any){
    this.photograph = event.target.files;
    console.log(this.photograph);
}
submitForm()
{
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
let data : any = {
   id: this.data.id,
   academicYear: this.Form.get("academicYear").value,
   ictResources:this.Form.get("resource").value,
   ictLinkone:this.Form.get("link_one").value,
   ictLinktwo:this.Form.get("link_two").value,
   type: this.Form.get("type").value,
   titleOfMethod: this.Form.get("title").value,
   noOfStudent:this.Form.get("number_of_students").value,
   reportBrief : this.Form.get("breif_report")?.value,
   learnOutcomes : this.Form.get("learn")?.value,
   pclass:this.Form.get("p_class")?.value,
   psubject:this.Form.get("p_subject")?.value,
   fromDate : this.Form.get("f_date")?.value,
   toDate : this.Form.get("t_date")?.value,
   photographs: photoFilenaamelist,
};


this.service.getUserWithUserId().subscribe((user: any) => {
  this.service.putData("/teaching-methods", data).subscribe((res2: any) => {
    if(this.fileUpload.getAll("files").length > 0){
      this.service.postData("/upload", this.fileUpload).subscribe(res2 => {
        // this.dialogref.close();
      });
    }
    this.dialogref.close();
  }, (err2 : any) => {
    alert("Error try again later!!");
    this.dialogref.close();
  });
}, (err: any) => {
  console.warn(err);
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


}
interface other_type {
  other_type: String;
 }