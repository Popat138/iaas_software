import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceService } from 'src/app/service.service';

import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-edit-committee-meeting-details',
  templateUrl: './edit-committee-meeting-details.component.html',
  styleUrls: ['./edit-committee-meeting-details.component.scss']
})
export class EditCommitteeMeetingDetailsComponent implements OnInit {

  year: Year[] = [
    {year: '2018-2019', },
    {year: '2019-2020', },
    {year: '2020-2021', },
    {year: '2021-2022', },
  ];

  fileUpload = new FormData();
  uploads;
  photograph;
  newsReport;
  participantList;

  committeeId : any = null;
  document:any=null;
  final_data:any;
  public Form: FormGroup;
  constructor(

    private fb: FormBuilder,
    public service: ServiceService,
    public dialogref: MatDialogRef<EditCommitteeMeetingDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data : any,
    private http: HttpClient,
  ) {

    this.Form = this.fb.group({
      academicYear: this.fb.control('',Validators.required),
      agenda: this.fb.control('',Validators.required),
      date:this.fb.control('',Validators.required),


    })

   }

  ngOnInit(): void {
    this.getData();
  }
  
  getData() {
    console.log(this.data.row);
    this.Form.get("academicYear").setValue(this.data.row?.academicYear);
    this.Form.get("agenda").setValue(this.data.row?.agenda);
    this.Form.get("date").setValue(this.data.row?.meetingDate);

    this.http.get(`${this.service.BASE_URL}/resources/uploads/${this.data.row.document}`,{responseType: 'blob'}).subscribe(data => {
      this.uploads = data;
      this.uploads.name = this.data.row?.document;
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
    //  console.log(`At index ${i} document not provided.`);
    }

    

  let data : any = {
    id: this.data.row.id,
    academicYear : this.Form.get("academicYear")?.value,
    agenda: this.Form.get("agenda")?.value,
    meetingDate: this.Form.get("date")?.value,
    document: filename
}




      this.service.putData("/meeting-record/committee/" + this.data.committeeId, data).subscribe((res2: any) => {
        if(this.fileUpload.getAll("files").length > 0){
          this.service.postData("/upload", this.fileUpload).subscribe(res2 => {
            console.log(res2);
          });
        }
      }, (err2 : any) => {

        console.log(err2);
      alert("Error try again later!!");
      this.dialogref.close();
      }, () => {
        
        this.dialogref.close();
      })
    // }, (err:any) => {
    //   alert("Error try again later!!");
    //   this.dialogref.close();
    // })
  }

}
interface Year {
  year: String;
}
