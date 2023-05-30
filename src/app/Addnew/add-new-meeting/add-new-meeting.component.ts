import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceService } from 'src/app/service.service';

import { v4 as uuidv4 } from 'uuid';
@Component({
  selector: 'app-add-new-meeting',
  templateUrl: './add-new-meeting.component.html',
  styleUrls: ['./add-new-meeting.component.scss']
})
export class AddNewMeetingComponent implements OnInit {



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
    public dialogref: MatDialogRef<AddNewMeetingComponent>,
    @Inject(MAT_DIALOG_DATA) public data : any,
  ) {

    this.Form = this.fb.group({
      academicYear: this.fb.control('',Validators.required),
      agenda: this.fb.control('',Validators.required),
      date:this.fb.control('',Validators.required),


    })

   }

  ngOnInit(): void {
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
    academicYear : this.Form.get("academicYear")?.value,
    agenda: this.Form.get("agenda")?.value,
    meetingDate: this.Form.get("date")?.value,
    document: filename
}




      this.service.postData("/meeting-record/committee/" + this.data.committeeId, data).subscribe((res2: any) => {
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
