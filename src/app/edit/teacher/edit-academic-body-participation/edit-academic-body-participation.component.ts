import { Component,Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {v4 as uuidv4} from 'uuid';
import { ServiceService } from 'src/app/service.service';

@Component({
  selector: 'app-edit-academic-body-participation',
  templateUrl: './edit-academic-body-participation.component.html',
  styleUrls: ['./edit-academic-body-participation.component.scss']
})
export class EditAcademicBodyParticipationComponent implements OnInit {
  fileUpload = new FormData();
  uploads:any = null;
  examdoc:any=null;
  fileName: string = "";
  toggle=true;
  fileNamee: string = "";
  togglee=true;
  public Form: FormGroup;
  constructor(
    private fb: FormBuilder,
    public service: ServiceService,
    public dialogref: MatDialogRef<EditAcademicBodyParticipationComponent>,
    @Inject(MAT_DIALOG_DATA) public data : any,
    private http: HttpClient,
  ) {
    this.Form = this.fb.group({
      academicYear: this.fb.control('',Validators.required),
      academic_body: this.fb.control(''),
      university: this.fb.control(''),
      member_type: this.fb.control(''),
      examiner:this.fb.control(''),
      subject:this.fb.control(''),
      exam_type:this.fb.control(''),
      period:this.fb.control(''),
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
    this.Form.get("academicYear").setValue(this.data.academicYear);
    this.Form.get("academic_body").setValue(this.data.academicBody);
    this.Form.get("university").setValue(this.data.university);
    this.Form.get("member_type").setValue(this.data.roleMember);
    this.Form.get("examiner").setValue(this.data.examType);
    this.Form.get("exam_type").setValue(this.data.univerCollege);
    this.Form.get("subject").setValue(this.data.subjectExam);
    this.Form.get("period").setValue(this.data.period);
    this.http.get(`${this.service.BASE_URL}/resources/uploads/${this.data?.documentbos}`,{responseType: 'blob'}).subscribe(data => {
      this.uploads = data;
      this.uploads.name = this.data?.documentbos;
      this.fileName=this.uploads.name!=null?'Document exists':"";
      this.toggle=this.uploads.name!=null?(this.toggle):!this.toggle;
    });

    this.http.get(`${this.service.BASE_URL}/resources/uploads/${this.data?.documentexam}`,{responseType: 'blob'}).subscribe(data => {
      this.examdoc = data;
      this.examdoc.name = this.data?.documentexam;
      this.fileNamee=this.examdoc.name!=null?'Document exists':"";
      this.togglee=this.examdoc.name!=null?(this.togglee):!this.togglee;
    });
  }


  upload(event: any){
    this.uploads = event.target.files[0];
    this.fileName=event.target.files[0].name;
    this.toggle = !this.toggle;
  }

 examFileUpload(event: any){
    console.log(event.target.files[0]);
    this.examdoc = event.target.files[0];
    this.fileNamee=event.target.files[0].name;
    this.togglee = !this.togglee;

  }


  submitForm(){

    let ext =  this.uploads?.name.split('.').pop();
    let filename: any = null;
    if(this.uploads != undefined && this.uploads != null ) {
      filename = uuidv4() + "." + ext
      this.fileUpload.append("files", this.uploads, filename)
    } else {
      console.log(`Document not provided.`);
    }

    let examExt =  this.examdoc?.name.split('.').pop();
    let examfile: any = null;
    if(this.examdoc != undefined && this.examdoc != null ) {
      examfile= uuidv4() + "." + examExt
      this.fileUpload.append("files", this.examdoc, examfile)
    } else {
      console.log(`Document not provided.`);
    }
    let data = {
      id:this.data.id,
      academicYear: this.Form.get("academicYear").value,
      academicBody: this.Form.get("academic_body").value,
      university: this.Form.get("university").value,
      roleMember: this.Form.get("member_type").value,
      examType:this.Form.get("examiner").value,
      univerCollege:this.Form.get("exam_type").value,
      subjectExam:this.Form.get("subject").value,
      period:this.Form.get("period").value,
           documentbos: filename,
           documentexam:examfile
    };
    this.service.getUserWithUserId().subscribe((user: any) => {
      this.service.postData("/academic-participation/teacher/" + user.teacher.teacherId , data).subscribe((res2: any) => {
        console.log("New",res2)
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


}
interface Year {
  year: String;
}