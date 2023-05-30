import { Component, Inject, OnInit } from '@angular/core';
import {  FormArray,FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  MAT_DIALOG_DATA, MatDialogRef, MatDialog  } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/service.service';
import { v4 as uuidv4 } from 'uuid';
import { AngularEditorConfig } from '@kolkov/angular-editor';
@Component({
  selector: 'app-add-new-teaching-methods',
  templateUrl: './add-new-teaching-methods.component.html',
  styleUrls: ['./add-new-teaching-methods.component.scss']
})
export class AddNewTeachingMethodsComponent implements OnInit {
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
    @Inject(MAT_DIALOG_DATA)
    public data : any,
    public dialogref: MatDialogRef<AddNewTeachingMethodsComponent>,
    public dialog: MatDialog,
    public router: Router

  ) { 
    this.Form = this.fb.group({
      academic_year: this.fb.control('',Validators.required),
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
    this.photographUpload;
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
   academicYear: this.Form.get("academic_year").value,
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
  this.service.postData("/teaching-methods/teacher/" + user.teacher.teacherId , data).subscribe((res2: any) => {
    if(this.fileUpload.getAll("files").length > 0){
      this.service.postData("/upload", this.fileUpload).subscribe(res2 => {
        console.log(res2);
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