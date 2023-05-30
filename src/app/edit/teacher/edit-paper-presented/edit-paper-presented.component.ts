import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceService } from 'src/app/service.service';
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-edit-paper-presented',
  templateUrl: './edit-paper-presented.component.html',
  styleUrls: ['./edit-paper-presented.component.scss']
})
export class EditPaperPresentedComponent implements OnInit {
  fileUpload = new FormData();
  uploads:any = null;
  fileName: string = "";
  toggle=true;
  public Form: FormGroup;
  constructor(
    private fb: FormBuilder,
    public service: ServiceService,
    public dialogref: MatDialogRef<EditPaperPresentedComponent>,
    @Inject(MAT_DIALOG_DATA) public data : any,
    private http: HttpClient,
  ) { 
    this.Form = this.fb.group({

      academicYear: this.fb.control('',Validators.required),
      level: this.fb.control('',Validators.required),
      type: this.fb.control('',Validators.required),
      title_of_conf: this.fb.control('',Validators.required),
      title_of_paper: this.fb.control('',Validators.required),
      s_date: this.fb.control('',Validators.required),
      e_date: this.fb.control('',Validators.required)
    })
  }
  year: Year[] = [
    {year: '2018-2019', },
    {year: '2019-2020', },
    {year: '2020-2021', },
    {year: '2021-2022', },
  ];

  level: Level[] = [
    {level: 'University', },
    {level: 'State', },
    {level: 'National', },
    {level: 'International', },
  ];


  types: any[] = [
    {value: 'conference', title: 'conference', },
    {value: 'workshop', title: 'workshop', },
    {value: 'Seminar', title: 'Seminar', },
    {value: 'Symposium', title: 'Symposium', }
  ];


  ngOnInit(): void {
    this.getData();
  }

  getData(){
    console.log(this.data);
    this.Form.get("academicYear").setValue(this.data.academicYear);
    this.Form.get("level").setValue(this.data.facultySeminarLevel);
    this.Form.get("type").setValue(this.data.facultySeminarType);
    this.Form.get("title_of_conf").setValue(this.data.title);
    this.Form.get("title_of_paper").setValue(this.data.titleOfPaper);
    this.Form.get("s_date").setValue(this.data.startDate);
    this.Form.get("e_date").setValue(this.data.endDate);
    
    this.http.get(`${this.service.BASE_URL}/resources/uploads/${this.data?.document}`,{responseType: 'blob'}).subscribe(data => {
      this.uploads = data;
      this.uploads.name = this.data?.document;
      this.fileName=this.uploads.name!=null?'Document exists':"";
      this.toggle=this.uploads.name!=null?(this.toggle):!this.toggle;
    });
  }
  upload(event: any){
    this.uploads = event.target.files[0];
    this.fileName=event.target.files[0].name;
    this.toggle = !this.toggle;
  }

  submitForm(){

    let ext =  this.uploads?.name.split('.').pop();
    let filename: any = null;
    if(this.uploads != undefined && this.uploads != null ) {
      filename = uuidv4() + "." + ext
      this.fileUpload.append("files", this.uploads, filename)
    } else {
      // filename=this.data?.document;
      console.log(`Document not provided.`);
    }

    let data = {
      id:this.data.id,
      academicYear: this.Form.get("academicYear").value,
      facultySeminarLevel: this.Form.get("level").value,
      facultySeminarType: this.Form.get("type").value,
      title: this.Form.get("title_of_conf").value,
      titleOfPaper: this.Form.get("title_of_paper").value,
      startDate: this.Form.get("s_date").value,
      endDate: this.Form.get("e_date").value,
      document: filename

    };

    this.service.getUserWithUserId().subscribe((user: any) => {
      this.service.postData("/paper-presented/teacher/" + user.teacher.teacherId , data).subscribe((res2: any) => {
        if(this.fileUpload.getAll("files").length > 0){
          this.service.postData("/upload", this.fileUpload).subscribe(res2 => {
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