import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceService } from 'src/app/service.service';
import {v4 as uuidv4} from 'uuid';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-edit-one-time-form',
  templateUrl: './edit-one-time-form.component.html',
  styleUrls: ['./edit-one-time-form.component.scss']
})
export class EditOneTimeFormComponent implements OnInit {
  fileUpload = new FormData();
  adhaarFile: any = null;
  panFile: any = null;
  ugFile: any = null;
  pgFile:any = null;
  teacher:any=null;
  qualifingFile: any = null;
  researchFile:any=null;
  guideFile:any=null;
  image:any=null;
  togglea=true;
  fileNamea: string = "";
  togglep=true;
  fileNamep: string = "";
  toggleu=true;
  fileNameu: string = "";
  togglepg=true;
  fileNamepg: string = "";
  toggleq=true;
  fileNameq: string = "";
  toggleph=true;
  fileNameph: string = "";
  toggleg=true;
  fileNameg: string = "";
  designation: any[] = [
    {title: 'Principal', value : 'Principal'},
    {title: 'Librarian', value : 'Librarian'},
    {title: 'Professor', value : 'Professor'},
    {title: 'Associate professor ', value : 'Associate_professor'},
    {title: 'Assistant professor', value : 'Assistant_professor'},
    {title: 'Physical Director', value : 'Physical_director'},
  ]

  salutation:any[]=[
    {level: 'Dr.', },
    {level: 'Prof.', },
    {level: 'Prof. Dr.', },
    {level: 'Ar.', },
    {level: 'Mr.', },
    {level: 'Mrs.', },
    {level: 'Miss.', },
    {level: 'Shri.', },
    {level: 'Maj.'},
    {level: 'LT'},
    {level: 'LT Capt.'},
    {level: ''},
     ];


  level: Level [] = [
    {level: 'Yes', },
    {level: 'No', },

  ];
  toDisplay = true;
  toggleData() {
    this.toDisplay = !this.toDisplay;
  }
  toDisplay1 = true;
  toggleData1() {
    this.toDisplay1 = !this.toDisplay1;
  }
  toDisplay2 = true;
  toggleData2() {
    this.toDisplay2 = !this.toDisplay2;
  }
  public qualifications : FormArray = this.fb.array([]);
  uploads:any = null;
  public Form: FormGroup;
  constructor(
    private fb: FormBuilder,
    public service: ServiceService,
    public dialogref: MatDialogRef<EditOneTimeFormComponent>,
    @Inject(MAT_DIALOG_DATA) public userData : any,
    @Inject(MAT_DIALOG_DATA) public teacherData : any,
    private http: HttpClient,

  ) { 
    this.Form = this.fb.group({
      salutation: this.fb.control(''),
      f_name: this.fb.control('',Validators.required),
      m_name: this.fb.control(''),
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

      net_set:this.fb.control('',),
      y_of_pass2:this.fb.control('',),
      subject:this.fb.control(''),
      grade2: this.fb.control(''),

      net_set1:this.fb.control(''),
      y_of_pass21:this.fb.control(''),
      subject11:this.fb.control(''),
      grade21: this.fb.control(''),


      degree2:this.fb.control(''),
      date_of_declaration:this.fb.control('',),
      subject1:this.fb.control(''),
      university2:this.fb.control(''),
      guide:this.fb.control(''),
      rec_year:this.fb.control(''),
      mobile:this.fb.control(''),
      gender:this.fb.control(''),
      tec_mobile:this.fb.control(''),
      // tec_mail:this.fb.control(''),
      // tec_address:this.fb.control(''),
      add_duty:this.fb.control(''),
      // year: this.fb.control('',Validators.required),
      // edition: this.fb.control('',Validators.required),
      // role: this.fb.control('',Validators.required),
      // publication: this.fb.control('',Validators.required),
    })
  }

  ngOnInit(): void {
    this.getData();
  }
  adhaarUpload(event: any){
    console.log(event.target.files[0]);
    this.adhaarFile = event.target.files[0];
    this.fileNamea=event.target.files[0].name;
    this.togglea = !this.togglea;
  }

   panUpload(event: any){
    console.log(event.target.files[0]);
    this.panFile = event.target.files[0];
    this.fileNamep=event.target.files[0].name;
    this.togglep = !this.togglep;
  }

   ugFileUpload(event: any){
    console.log(event.target.files[0]);
    this.ugFile = event.target.files[0];
    this.fileNameu=event.target.files[0].name;
    this.toggleu = !this.toggleu;
  }

   pgFileUpload(event: any){
    console.log(event.target.files[0]);
    this.pgFile = event.target.files[0];
    this.fileNamepg=event.target.files[0].name;
    this.togglepg = !this.togglepg;
  }

   qualifingFileUpload(event: any){
    console.log(event.target.files[0]);
    this.qualifingFile = event.target.files[0];
    this.fileNameq=event.target.files[0].name;
    this.toggleq = !this.toggleq;
  }

  researchFileUpload(event: any){
    console.log(event.target.files[0]);
    this.researchFile = event.target.files[0];
    this.fileNameph=event.target.files[0].name;
    this.toggleph = !this.toggleph;
  }
  guideFileUpload(event: any){
    console.log(event.target.files[0]);
    this.guideFile = event.target.files[0];
    this.fileNameg=event.target.files[0].name;
    this.toggleg = !this.toggleg;
  }
  certupload(event: any){
    console.log(event.target.files[0]);
    this.image = <File>event.target.files[0];
  }
getData(){
  console.log("USER",this.userData);   
     this.Form.get("f_name").setValue(this.userData.firstName);
     this.Form.get("m_name").setValue(this.userData.middleName);
     this.Form.get("l_name").setValue(this.userData.lastName);
     this.Form.get("dob").setValue(this.userData.dob);
     console.log("Teacher Data",this.teacherData);
     this.Form.get("salutation").setValue(this.teacherData?.teacher?.salute);
     this.Form.get("designation").setValue(this.teacherData?.teacher?.designation);
     this.Form.get("addhar").setValue(this.userData?.teacher?.aadharNumber);
     this.Form.get("pan_no").setValue(this.userData?.teacher?.panNumber);
     this.Form.get("guide").setValue(this.teacherData?.teacher?.resGuide);
     this.Form.get("rec_year").setValue(this.teacherData?.teacher?.recYear);
     this.Form.get("degree").setValue(this.teacherData?.teacher?.ugQualification[0]?.degree);
     this.Form.get("university").setValue(this.teacherData?.teacher?.ugQualification[0]?.university);
     this.Form.get("y_of_pass").setValue(this.teacherData?.teacher?.ugQualification[0]?.yearOfPassing);
    this.Form.get("specialization").setValue(this.teacherData?.teacher?.ugQualification[0]?.specialization);
     this.Form.get("grade").setValue(this.teacherData?.teacher?.ugQualification[0]?.grade);
    this.Form.get("degree1").setValue(this.teacherData?.teacher?.pgQualification[0]?.degree);
    this.Form.get("university1").setValue(this.teacherData?.teacher?.pgQualification[0]?.university);
    this.Form.get("y_of_pass1").setValue(this.teacherData?.teacher?.pgQualification[0]?.yearOfPassing);
    this.Form.get("specialization1").setValue(this.teacherData?.teacher?.pgQualification[0]?.specialization);
    this.Form.get("grade1").setValue(this.teacherData?.teacher?.pgQualification[0]?.grade);
     this.Form.get("net_set").setValue(this.teacherData?.teacher?.entranceQualification[0]?.name);
    this.Form.get("y_of_pass2").setValue(this.teacherData?.teacher?.entranceQualification[0]?.yearOfPassing);
    this.Form.get("subject").setValue(this.teacherData?.teacher?.entranceQualification[0]?.subject);
    this.Form.get("grade2").setValue(this.teacherData?.teacher?.entranceQualification[0]?.grade);
    this.Form.get("degree2").setValue(this.teacherData?.teacher?.researchQualification[0]?.degree);
    this.Form.get("date_of_declaration").setValue(this.teacherData?.teacher?.researchQualification[0]?.dateOfDeclaration);
    this.Form.get("subject1").setValue(this.teacherData?.teacher?.researchQualification[0]?.subject);
    this.Form.get("university2").setValue(this.teacherData?.teacher?.researchQualification[0]?.university);
    this.Form.get("gender").setValue(this.userData?.gender);
    this.Form.get("mobile").setValue(this.userData?.phone);
    this.Form.get("net_set1").setValue(this.teacherData?.teacher?.entranceQualification[1]?.name);
    this.Form.get("y_of_pass21").setValue(this.teacherData?.teacher?.entranceQualification[1]?.yearOfPassing);
    this.Form.get("subject11").setValue(this.teacherData?.teacher?.entranceQualification[1]?.subject);
    this.Form.get("grade21").setValue(this.teacherData?.teacher?.entranceQualification[1]?.grade);
 

    // this.Form.get("tec_mail").setValue(this.teacherData?.teacher?.tecMail);
    // this.Form.get("tec_address").setValue(this.teacherData?.teacher?.tecAddress);
    this.Form.get("add_duty").setValue(this.teacherData?.teacher?.addDuty);

     this.http.get(`${this.service.BASE_URL}/resources/uploads/${this.teacherData?.teacher?.teacherPhoto}`,{responseType: 'blob'}).subscribe(teacherData => {
      this.uploads = teacherData;
      this.uploads.name = this.teacherData?.teacher?.teacherPhoto;

      
    });

    this.http.get(`${this.service.BASE_URL}/resources/uploads/${this.teacherData?.teacher?.guideLetter}`,{responseType: 'blob'}).subscribe(teacherData => {
      this.guideFile = teacherData;
      this.guideFile.name = this.teacherData?.teacher?.guideLetter;
      this.fileNameg=this.guideFile.name!=null?'Document exists':"";
      this.toggleg=this.guideFile.name!=null?(this.toggleg):!this.toggleg;
    });
    this.http.get(`${this.service.BASE_URL}/resources/uploads/${this.teacherData?.teacher?.panDocument}`,{responseType: 'blob'}).subscribe(teacherData => {
      this.panFile = teacherData;
      this.panFile.name = this.teacherData?.teacher?.panDocument;
      this.fileNamep=this.panFile.name!=null?'Document exists':"";
      this.togglep=this.panFile.name!=null?(this.togglep):!this.togglep;
    });

    this.http.get(`${this.service.BASE_URL}/resources/uploads/${this.teacherData?.teacher?.aadharDocument}`,{responseType: 'blob'}).subscribe(teacherData => {
      this.adhaarFile = teacherData;
      this.adhaarFile.name = this.teacherData?.teacher?.aadharDocument;
      this.fileNamea=this.adhaarFile.name!=null?'Document exists':"";
      this.togglea=this.adhaarFile.name!=null?(this.togglea):!this.togglea;
    });

    this.http.get(`${this.service.BASE_URL}/resources/uploads/${this.teacherData?.teacher?.researchQualification[0]?.document}`,{responseType: 'blob'}).subscribe(teacherData => {
      this.researchFile = teacherData;
      this.researchFile.name = this.teacherData?.teacher?.researchQualification[0]?.document;
      this.fileNameph=this.researchFile!=null?'Document exists':"";
      this.toggleph=this.researchFile.name!=null?(this.toggleph):!this.toggleph;
    });
console.log("Research",this.uploads.name)
    this.http.get(`${this.service.BASE_URL}/resources/uploads/${this.teacherData?.teacher?.entranceQualification[0]?.document}`,{responseType: 'blob'}).subscribe(teacherData => {
      this.qualifingFile  = teacherData;
      this.qualifingFile.name = this.teacherData?.teacher?.entranceQualification[0]?.document;
      this.fileNameq=this.qualifingFile.name!=null?'Document exists':"";
      this.toggleq=this.qualifingFile.name!=null?(this.toggleq):!this.toggleq;
    });

    this.http.get(`${this.service.BASE_URL}/resources/uploads/${this.teacherData?.teacher?.pgQualification[0]?.document}`,{responseType: 'blob'}).subscribe(teacherData => {
      this.pgFile = teacherData;
      this.pgFile.name = this.teacherData?.teacher?.pgQualification[0]?.document;
      this.fileNamepg=this.pgFile.name!=null?'Document exists':"";
      this.togglepg=this.pgFile.name!=null?(this.togglepg):!this.togglepg;
    });
    this.http.get(`${this.service.BASE_URL}/resources/uploads/${this.teacherData?.teacher?.ugQualification[0]?.document}`,{responseType: 'blob'}).subscribe(teacherData => {
      this.ugFile = teacherData;
      this.ugFile.name = this.teacherData?.teacher?.ugQualification[0]?.document;
      this.fileNameu=this.ugFile.name!=null?'Document exists':"";
      this.toggleu=this.ugFile.name!=null?(this.toggleu):!this.toggleu;
    });
 
    }
  submitForm(){

    let ext =  this.adhaarFile?.name.split('.').pop();
    let filename: any = null;
    if(this.adhaarFile != undefined && this.adhaarFile != null ) {
      filename = this.teacherData?.teacher?.aadharDocument!=null?(this.teacherData.teacher.aadharDocument.split('.').slice(0, -1).join('.') + "." + ext):(uuidv4() + "." + ext)
      this.fileUpload.append("files", this.adhaarFile, filename)
    } else {
      // filename=this.teacherData?.teacher?.aadharDocument;
      console.log(`Document not provided.`);
    }

    let panExt =  this.panFile?.name.split('.').pop();
    let panFileName: any = null;
    if(this.panFile != undefined && this.panFile != null ) {
      panFileName = this.teacherData?.teacher?.panDocument!=null?(this.teacherData.teacher.panDocument.split('.').slice(0, -1).join('.') + "." + panExt):(uuidv4() + "." + panExt)
      this.fileUpload.append("files", this.panFile, panFileName)
    } else {
      // panFileName=this.teacherData?.teacher?.panDocument;
      console.log(`Document not provided.`);
    }

    let ugExt =  this.ugFile?.name.split('.').pop();
    let ugFileName: any = null;
    if(this.ugFile != undefined && this.ugFile != null ) {
      ugFileName =  this.teacherData?.teacher?.ugQualification[0].document!=null?(this.teacherData.teacher.ugQualification[0].document.split('.').slice(0, -1).join('.') + "." + ugExt):(uuidv4() + "." + ugExt)
      this.fileUpload.append("files", this.ugFile, ugFileName)
    } else {
      ugFileName=this.userData.teacher.ugQualification[0].document
    }

    let pgExt =  this.pgFile?.name.split('.').pop();
    let pgFileName: any = null;
    if(this.pgFile != undefined && this.pgFile != null ) {
      pgFileName = this.teacherData?.teacher?.pgQualification[0].document!=null?(this.teacherData.teacher.pgQualification[0].document.split('.').slice(0, -1).join('.') + "." + pgExt):(uuidv4() + "." + pgExt)
      this.fileUpload.append("files", this.pgFile, pgFileName)
    } else {
      pgFileName=this.userData.teacher.pgQualification[0].document
    }

    let qfExt =  this.qualifingFile?.name.split('.').pop();
    let qualifingFileName: any = null;
    if(this.qualifingFile != undefined && this.qualifingFile != null ) {
      // qualifingFileName=
      qualifingFileName = uuidv4() + "." + qfExt
      this.fileUpload.append("files", this.qualifingFile, qualifingFileName)
    } else {
      qualifingFileName=this.userData.teacher.entranceQualification[0].document

    }

    let rfExt =  this.researchFile?.name.split('.').pop();
    let researchFileName: any = null;
    if(this.researchFile != undefined && this.researchFile != null ) {
      researchFileName = this.teacherData?.teacher?.researchQualification[0].document!=null?(this.teacherData.teacher.researchQualification[0].document.split('.').slice(0, -1).join('.') + "." + rfExt):(uuidv4() + "." + rfExt)
      this.fileUpload.append("files", this.researchFile, researchFileName)
    } else {
      // researchFileName=this.userData.teacher.researchQualification[0].document
      console.log(`Document not provided.`);
    }

    let gdExt =  this.guideFile?.name.split('.').pop();
    let guideFileName: any = null;
    if(this.guideFile != undefined && this.guideFile != null ) {

      guideFileName = this.teacherData?.teacher?.guideLetter!=null?(this.teacherData.teacher.guideLetter.split('.').slice(0, -1).join('.') + "." + gdExt):(uuidv4() + "." + gdExt)
      this.fileUpload.append("files", this.guideFile, guideFileName)
    } else {
      // guideFileName=this.teacherData?.teacher?.guideLetter;
      console.log(`Document not provided.`);
    }

    let imageExt =  this.image?.name.split('.').pop();
    let imageFileName: any = null;
    if(this.image != undefined && this.image != null ) {

      imageFileName =this.teacherData?.teacher?.teacherPhoto!==null?(this.teacherData.teacher.teacherPhoto.split('.').slice(0, -1).join('.') + "." + imageExt):(uuidv4() + "." + imageExt)
      this.fileUpload.append("files", this.image, imageFileName)
    } else {
      console.log(`Document not provided.`);
    }

    let userData = {
      id: this.userData.id,
      userId: null,
      firstName: this.Form.get("f_name").value,
      middleName: this.Form.get("m_name").value,
      lastName: this.Form.get("l_name").value,
      dob: this.Form.get("dob").value,
      gender:this.Form.get("gender").value,
      phone:this.Form.get("mobile").value,
      //designation: this.Form.get("designation").value,
    }


      let teacherData = {
        id: this.teacherData.id,
        teacherId: null,
        salute:this.Form.get("salutation").value,
        designation: this.Form.get("designation").value,
        aadharNumber: this.Form.get("addhar").value,
        aadharDocument: filename,
        panNumber: this.Form.get("pan_no").value,
        resGuide: this.Form.get("guide").value,
        // tecMail:this.Form.get("tec_mail").value,
        // tecAddress:this.Form.get("tec_address").value,
        addDuty:this.Form.get("add_duty").value,
        recYear:  this.Form.get("guide").value=="Yes"?this.Form.get("rec_year").value:"--",
        panDocument: panFileName,
        guideLetter:guideFileName,
        teacherPhoto:imageFileName,
        ugQualification: [
          { 
            id:this.teacherData.teacher.ugQualification[0].id,
            degree: this.Form.get("degree").value,
            university: this.Form.get("university").value,
            yearOfPassing: this.Form.get("y_of_pass").value,
            specialization: this.Form.get("specialization").value,
            grade: this.Form.get("grade").value,
            document: ugFileName
          }
        ],
        pgQualification: [
          { 
            id:this.teacherData.teacher.pgQualification[0].id,
            degree: this.Form.get("degree1").value,
            university: this.Form.get("university1").value,
            yearOfPassing: this.Form.get("y_of_pass1").value,
            specialization: this.Form.get("specialization1").value,
            grade: this.Form.get("grade1").value,
            document: pgFileName
          }
        ],
        entranceQualification: [
          { 
            id:this.teacherData.teacher.entranceQualification[0].id,
            name: this.Form.get("net_set").value,
            yearOfPassing: this.Form.get("y_of_pass2").value,
            subject: this.Form.get("subject").value,
            grade: this.Form.get("grade2").value,
            document: qualifingFileName
          },
          { 
            // id:this.teacherData.teacher.entranceQualification[1].id,
            name: this.Form.get("net_set1").value,
            yearOfPassing: this.Form.get("y_of_pass21").value,
            subject: this.Form.get("subject11").value,
            grade: this.Form.get("grade21").value,
          }
        ],
        researchQualification: [
          { 
            id:this.teacherData.teacher.researchQualification[0].id,
            degree: this.Form.get("degree2").value,
            dateOfDeclaration: this.Form.get("date_of_declaration").value,
            subject: this.Form.get("subject1").value,
            university: this.Form.get("university2").value,
            document: researchFileName
          }
        ]

        
      };

      // console.log(teacherData);

    // this.service.getUserWithUserId().subscribe((user: any) => {
      userData.userId = localStorage.getItem('userId');
      this.service.putData("/user", userData).subscribe((userResult: any) => {
        teacherData.teacherId = userResult.teacher.teacherId;
        console.log("userID",userData.userId);
        console.log("TEACHERID",teacherData.teacherId);
        this.service.putData("/teacher",teacherData).subscribe((res: any) => {
           if(this.fileUpload.getAll("files").length > 0){
            this.service.postData("/upload", this.fileUpload).subscribe(res2 => {
              console.log(res2);
            });
          }
          this.dialogref.close("update");
        }, (err2 : any) => {
          alert("Error try again later!!");
          this.dialogref.close("update");
        })
      }, (err2 : any) => {
        alert("Error try again later!!");
        this.dialogref.close("update");
      });
    // }, (err: any) => {
    //   console.warn(err);
    // });
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
