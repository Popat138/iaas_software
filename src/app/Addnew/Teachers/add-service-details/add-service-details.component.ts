import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AddOneTimeFormComponent } from '../add-one-time-form/add-one-time-form.component';
import { ServiceService } from 'src/app/service.service';
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-service-details',
  templateUrl: './add-service-details.component.html',
  styleUrls: ['./add-service-details.component.scss']
})
export class AddServiceDetailsComponent implements OnInit {

  fileUpload = new FormData();
  uploads:any = null;
  toggle=true;
  fileName: string = "";
  type: any[] = [

    {title: 'Full time', value : 'Full_time'},
    {title: 'Part time', value : 'Part_time'},
    {title: 'Ad hoc', value : 'Ad_hoc'},
    {title: 'Contractual', value : 'Contractual'},
    {title: 'CHB', value : 'CHB'}
  ];

  designation: any[] = [
    {title: 'Principal', value : 'Principal'},
    {title: 'Librarian', value : 'Librarian'},
    {title: 'Professor', value : 'Professor'},
    {title: 'Associate professor ', value : 'Associate_professor'},
    {title: 'Assistant professor', value : 'Assistant_professor'},
    {title: 'Physical Director', value : 'Physical_director'},
  ]



  public Form: FormGroup;
  constructor(

    private fb: FormBuilder,
    public service: ServiceService,
    public dialogref: MatDialogRef<AddServiceDetailsComponent>
  ) {

    this.Form = this.fb.group({

      appointment_date: this.fb.control('',Validators.required),
      order_no: this.fb.control('',Validators.required),
      appointment_type:this.fb.control('',Validators.required),
      nature:this.fb.control('',Validators.required),
      designation: this.fb.control('',Validators.required),
      joining_date: this.fb.control('',Validators.required),
    })

   }

  //  year: Year[] = [
  //   {year: '2018-2019', },
  //   {year: '2019-2020', },
  //   {year: '2020-2021', },
  //   {year: '2021-2022', },
  // ];

  level: Level[] = [
    {level: 'University', },
    {level: 'State', },
    {level: 'National', },
    {level: 'International', },
  ];

  upload(event: any){
    this.uploads = event.target.files[0];
    this.fileName=event.target.files[0].name;
   this.toggle = !this.toggle;
  }

  types: any[] = [
    {value: 'Research_Article', title: 'Research Article', },
    {value: 'Review_Article', title: 'Review Article', }
  ];

  roles: Value[] = [
    {value: 'person', },
    {value: 'participant', },
  ]



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

    let data = {

      appointmentDate: this.Form.get("appointment_date").value,
      joinDate:this.Form.get("joining_date").value,
      orderNumber: this.Form.get("order_no").value,
      appointmentType: this.Form.get("appointment_type").value,
      nature: this.Form.get("nature").value,
      designation: this.Form.get("designation").value,
      document: filename

    };

    this.service.getUserWithUserId().subscribe((user: any) => {
      this.service.postData("/teacher-appointment/teacher/" + user.teacher.teacherId , data).subscribe((res2: any) => {
        if(this.fileUpload.getAll("files").length > 0){
          this.service.postData("/upload", this.fileUpload).subscribe(res2 => {
            this.dialogref.close();
          }, (err2 : any) => {
            alert("Error try again later!!");
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

interface desig {
  value: String;
}

interface Level {
  level: String;
}

interface Value {
  value: String;
}
