import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ServiceService } from 'src/app/service.service';
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-papers-presented',
  templateUrl: './add-papers-presented.component.html',
  styleUrls: ['./add-papers-presented.component.scss']
})
export class AddPapersPresentedComponent implements OnInit {

  fileUpload = new FormData();
  uploads:any = null;
  toggle=true;
  fileName: string = "";
  public Form: FormGroup;
  constructor(

    private fb: FormBuilder,
    public service: ServiceService,
    public dialogref: MatDialogRef<AddPapersPresentedComponent>
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
      console.log(`Document not provided.`);
    }

    let data = {

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
