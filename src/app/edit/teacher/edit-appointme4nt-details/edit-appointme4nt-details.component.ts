import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceService } from 'src/app/service.service';
import { ServiceDetailsComponent } from 'src/app/service-details/service-details.component';
import { AddServiceDetailsComponent } from 'src/app/Addnew/Teachers/add-service-details/add-service-details.component';
import {v4 as uuidv4} from 'uuid';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-edit-appointme4nt-details',
  templateUrl: './edit-appointme4nt-details.component.html',
  styleUrls: ['./edit-appointme4nt-details.component.scss']
})
export class EditAppointme4ntDetailsComponent implements OnInit {
  fileUpload = new FormData();
  uploads:any = null;
  fileName: string = "";
  toggle=true;
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
    public dialogref: MatDialogRef<EditAppointme4ntDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data : any,
    private http: HttpClient,
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

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    console.log(this.data);
    this.Form.get("appointment_date").setValue(this.data.appointmentDate);
    this.Form.get("joining_date").setValue(this.data.joinDate);
    this.Form.get("order_no").setValue(this.data.orderNumber);
    this.Form.get("appointment_type").setValue(this.data.appointmentType);
    this.Form.get("nature").setValue(this.data.nature);
    this.Form.get("designation").setValue(this.data.designation);
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
     filename=this.data?.document!=null?(this.data?.document.split('.').slice(0, -1).join('.') + "." + ext):(uuidv4() + "." + ext)
      // filename = uuidv4() + "." + ext
      this.fileUpload.append("files", this.uploads, filename)
    } else {

      console.log(`Document not provided.`);
    }

    let data = {
      id: this.data.id,
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
