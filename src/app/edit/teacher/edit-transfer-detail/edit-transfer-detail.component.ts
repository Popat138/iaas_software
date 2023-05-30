import { HttpClient } from '@angular/common/http';
import { Component,Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceService } from 'src/app/service.service';
import {v4 as uuidv4} from 'uuid';


@Component({
  selector: 'app-edit-transfer-detail',
  templateUrl: './edit-transfer-detail.component.html',
  styleUrls: ['./edit-transfer-detail.component.scss']
})
export class EditTransferDetailComponent implements OnInit {

  fileUpload = new FormData();
  uploads:any = null;

  type: any[] = [

    {title: 'Full time', value : 'Full_time'},
    {title: 'Part time', value : 'Part_time'},
    {title: 'Ad hoc', value : 'Ad_hoc'},
    {title: 'Contractual', value : 'Contractual'},
    {title: 'Temporary', value : 'Temporary'},
    {title: 'CHB', value : 'CHB'}
  ];

  designation: any[] = [
    {title: 'Professor', value : 'Professor'},
    {title: 'Associate professor ', value : 'Associate_professor'},
    {title: 'Assistant professor', value : 'Assistant_professor'},
  ]

  public Form: FormGroup;
  constructor(
    private fb: FormBuilder,
    public service: ServiceService,
    public dialogref: MatDialogRef<EditTransferDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data : any,
    private http: HttpClient,
  ) { 
    this.Form = this.fb.group({

    transfer_date: this.fb.control('',Validators.required),
    transfer_order_no: this.fb.control('',Validators.required),
    transfer_form: this.fb.control(''),
    transfer_to: this.fb.control(''),

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
  ngOnInit(): void {
    this.getData();
  }
  getData(){
    console.log(this.data);
    this.Form.get("transfer_date").setValue(this.data.transferDate);
    this.Form.get("transfer_order_no").setValue(this.data.orderNumber);
    this.Form.get("transfer_form").setValue(this.data.transferFrom);
    this.Form.get("transfer_to").setValue(this.data.transferTo);
    this.http.get(`${this.service.BASE_URL}/resources/uploads/${this.data?.document}`,{responseType: 'blob'}).subscribe(data => {
      this.uploads = data;
      this.uploads.name = this.data?.document;
    }); 
  }
  upload(event: any){
    this.uploads = event.target.files[0];
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
      id:this.data.id,
      transferDate: this.Form.get("transfer_date").value,
      orderNumber: this.Form.get("transfer_order_no").value,
      transferFrom: this.Form.get("transfer_form").value,
      transferTo: this.Form.get("transfer_to").value,
      document: filename

    };

    this.service.getUserWithUserId().subscribe((user: any) => {
      this.service.postData("/teacher-transfer/teacher/" + user.teacher.teacherId , data).subscribe((res2: any) => {
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