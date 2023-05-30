import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ServiceService } from 'src/app/service.service';
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-academic-participation',
  templateUrl: './add-academic-participation.component.html',
  styleUrls: ['./add-academic-participation.component.scss']
})
export class AddAcademicParticipationComponent implements OnInit {
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
    public dialogref: MatDialogRef<AddAcademicParticipationComponent>
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

  
}


interface Year {
  year: String;
}

