import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceService } from 'src/app/service.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-view-one-time-form',
  templateUrl: './view-one-time-form.component.html',
  styleUrls: ['./view-one-time-form.component.scss']
})
export class ViewOneTimeFormComponent implements OnInit {

  fileUpload = new FormData();
  uploads:any = null;
  adhaarFile: any = null;
  panFile: any = null;
  ugFile: any = null;
  pgFile:any = null;
  qualifingFile: any = null;
  researchFile:any=null;
  designation: any[] = [
    {title: 'Principal', value : 'Principal'},
    {title: 'Librarian', value : 'Librarian'},
    {title: 'Professor', value : 'Professor'},
    {title: 'Associate professor ', value : 'Associate_professor'},
    {title: 'Assistant professor', value : 'Assistant_professor'},
    {title: 'Physical Director', value : 'Physical_director'},
  ]
  level: Level [] = [
    {level: 'Yes', },
    {level: 'No', },

  ];
  public qualifications : FormArray = this.fb.array([]);
  public Form: FormGroup;
  constructor(

    private fb: FormBuilder,
    public service: ServiceService,
    @Inject(MAT_DIALOG_DATA) public data : any,
    private http: HttpClient,
    public dialogref: MatDialogRef<ViewOneTimeFormComponent>
  ) {

    this.Form = this.fb.group({
      f_name: this.fb.control('',Validators.required),
      m_name: this.fb.control('',Validators.required),
      l_name: this.fb.control('',Validators.required),
      dob: this.fb.control('',Validators.required),
      addhar: this.fb.control('',Validators.required),
      pan_no: this.fb.control('',Validators.required),
      designation: this.fb.control('',Validators.required),

      degree:this.fb.control('',Validators.required),
      university: this.fb.control('',Validators.required),
      y_of_pass:this.fb.control('',Validators.required),
      specialization: this.fb.control('',Validators.required),
      grade: this.fb.control('',Validators.required),

      degree1:this.fb.control('',Validators.required),
      university1: this.fb.control('',Validators.required),
      y_of_pass1:this.fb.control('',Validators.required),
      specialization1: this.fb.control( '',Validators.required),
      grade1: this.fb.control('',Validators.required),

      net_set:this.fb.control(''),
      y_of_pass2:this.fb.control(''),
      subject:this.fb.control(''),
      grade2: this.fb.control(''),

      net_set1:this.fb.control(''),
      y_of_pass21:this.fb.control(''),
      subject11:this.fb.control(''),
      grade21: this.fb.control(''),

      degree2:this.fb.control(''),
      date_of_declaration:this.fb.control(''),
      subject1:this.fb.control(''),
      university2:this.fb.control(''),
      guide:this.fb.control(''),
      rec_year:this.fb.control(''),
      mobile:this.fb.control(''),
      gender:this.fb.control(''),
      tec_mobile:this.fb.control(''),
      tec_mail:this.fb.control(''),
      tec_address:this.fb.control(''),
      add_duty:this.fb.control(''),
    })
   }

   adhaarUpload(event: any){
    this.adhaarFile = event.target.files[0];
  }

   panUpload(event: any){
    this.panFile = event.target.files[0];
  }

   ugFileUpload(event: any){
    this.ugFile = event.target.files[0];
  }

   pgFileUpload(event: any){
    this.pgFile = event.target.files[0];
  }

   qualifingFileUpload(event: any){
    this.qualifingFile = event.target.files[0];
  }

  researchFileUpload(event: any){
    this.researchFile = event.target.files[0];
  }


  ngOnInit(): void {

    console.log("DATA",this.data);

    this.Form.get("f_name").setValue(this.data?.firstName);
    this.Form.get("m_name").setValue(this.data?.middleName);
    this.Form.get("l_name").setValue(this.data?.lastName);
    this.Form.get("dob").setValue(this.data?.dob);
    this.Form.get("addhar").setValue(this.data?.teacher?.aadharNumber);
    this.Form.get("pan_no").setValue(this.data?.teacher?.panNumber);
    this.Form.get("designation").setValue(this.data?.teacher?.designation);
    this.Form.get("degree").setValue(this.data?.teacher?.ugQualification[0]?.degree);
    this.Form.get("university").setValue(this.data?.teacher?.ugQualification[0]?.university);
    this.Form.get("y_of_pass").setValue(this.data?.teacher?.ugQualification[0]?.yearOfPassing);
    this.Form.get("specialization").setValue(this.data?.teacher?.ugQualification[0]?.specialization);
    this.Form.get("grade").setValue(this.data?.teacher?.ugQualification[0]?.grade);
    this.Form.get("degree1").setValue(this.data?.teacher?.pgQualification[0]?.degree);
    this.Form.get("university1").setValue(this.data?.teacher?.pgQualification[0]?.university);
    this.Form.get("y_of_pass1").setValue(this.data?.teacher?.pgQualification[0]?.yearOfPassing);
    this.Form.get("specialization1").setValue(this.data?.teacher?.pgQualification[0]?.specialization);
    this.Form.get("grade1").setValue(this.data?.teacher?.pgQualification[0]?.grade);
    this.Form.get("net_set").setValue(this.data?.teacher?.entranceQualification[0]?.name);
    this.Form.get("y_of_pass2").setValue(this.data?.teacher?.entranceQualification[0]?.yearOfPassing);
    this.Form.get("subject").setValue(this.data?.teacher?.entranceQualification[0]?.subject);
    this.Form.get("grade2").setValue(this.data?.teacher?.entranceQualification[0]?.grade);
    this.Form.get("degree2").setValue(this.data?.teacher?.researchQualification[0]?.degree);
    this.Form.get("date_of_declaration").setValue(this.data?.teacher?.researchQualification[0]?.dateOfDeclaration);
    this.Form.get("subject1").setValue(this.data?.teacher?.researchQualification[0]?.subject);
    this.Form.get("university2").setValue(this.data?.teacher?.researchQualification[0]?.university);
    this.Form.get("guide").setValue(this.data?.teacher?.resGuide);
    this.Form.get("rec_year").setValue(this.data?.teacher?.recYear);
    this.Form.get("gender").setValue(this.data?.gender);
    this.Form.get("mobile").setValue(this.data?.phone);
    this.Form.get("tec_mail").setValue(this.data?.teacher?.tecMail);
    this.Form.get("tec_address").setValue(this.data.teacher?.tecAddress);
    this.Form.get("add_duty").setValue(this.data?.teacher?.addDuty);
    this.Form.get("net_set1").setValue(this.data?.teacher?.entranceQualification[1]?.name);
    this.Form.get("y_of_pass21").setValue(this.data?.teacher?.entranceQualification[1]?.yearOfPassing);
    this.Form.get("subject11").setValue(this.data?.teacher?.entranceQualification[1]?.subject);
    this.Form.get("grade21").setValue(this.data?.teacher?.entranceQualification[1]?.grade);
 

    this.http.get(`${this.service.BASE_URL}/resources/uploads/${this.data?.teacher?.teacherPhoto}`,{responseType: 'blob'}).subscribe(data => {
      this.uploads = data;
      this.uploads.name = this.data?.teacher?.teacherPhoto;

      
    });

    this.http.get(`${this.service.BASE_URL}/resources/uploads/${this.data?.teacher?.guideLetter}`,{responseType: 'blob'}).subscribe(data => {
      this.uploads = data;
      this.uploads.name = this.data?.teacher?.guideLetter;
     
    });
    this.http.get(`${this.service.BASE_URL}/resources/uploads/${this.data?.teacher?.panDocument}`,{responseType: 'blob'}).subscribe(data => {
      this.uploads = data;
      this.uploads.name = this.data?.teacher?.panDocument;
     
    });

    this.http.get(`${this.service.BASE_URL}/resources/uploads/${this.data?.teacher?.aadharDocument}`,{responseType: 'blob'}).subscribe(data => {
      this.uploads = data;
      this.uploads.name = this.data?.teacher?.aadharDocument;
     
    });

    this.http.get(`${this.service.BASE_URL}/resources/uploads/${this.data?.teacher?.researchQualification[0]?.document}`,{responseType: 'blob'}).subscribe(data => {
      this.uploads = data;
      this.uploads.name = this.data?.teacher?.researchQualification[0]?.document;
     
    });

    this.http.get(`${this.service.BASE_URL}/resources/uploads/${this.data?.teacher?.entranceQualification[0]?.document}`,{responseType: 'blob'}).subscribe(data => {
      this.uploads = data;
      this.uploads.name = this.data?.teacher?.entranceQualification[0]?.document;
     
    });

    this.http.get(`${this.service.BASE_URL}/resources/uploads/${this.data?.teacher?.pgQualification[0]?.document}`,{responseType: 'blob'}).subscribe(data => {
      this.uploads = data;
      this.uploads.name = this.data?.teacher?.pgQualification[0]?.document;
     
    });
    this.http.get(`${this.service.BASE_URL}/resources/uploads/${this.data?.teacher?.ugQualification[0]?.document}`,{responseType: 'blob'}).subscribe(data => {
      this.uploads = data;
      this.uploads.name = this.data?.teacher?.ugQualification[0]?.document;
     
    });
 




  }






}

interface Year {
  year: String;
}

interface Level {
  level: String;
}

interface Value {
  value: String;
}
