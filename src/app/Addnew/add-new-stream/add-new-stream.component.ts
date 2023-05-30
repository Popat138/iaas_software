import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ServiceService } from 'src/app/service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-add-new-stream',
  templateUrl: './add-new-stream.component.html',
  styleUrls: ['./add-new-stream.component.scss']
})
export class AddNewStreamComponent implements OnInit {

  year: Year[] = [
    {year: '2018-2019', },
    {year: '2019-2020', },
    {year: '2020-2021', },
    {year: '2021-2022', },
  ];
  // fileUpload = new FormData();
  public Form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public service: ServiceService,
    public dialogref: MatDialogRef<AddNewStreamComponent>
  ) {
    this.Form = this.fb.group({
      s_name: this.fb.control('',Validators.required),
      academicYear:  this.fb.control('',Validators.required),
    })

   }

  ngOnInit(): void {
  }
  submitForm(){
    let streamData = {
      streamName: this.Form.get("s_name").value,
   
      startYear: this.Form.get("academicYear").value,
    }

    this.service.postData("/stream/", streamData).subscribe((res2: any) => {
      this.dialogref.close();
      // if(this.fileUpload.getAll("files").length > 0){
      //   this.service.postData("/upload", this.fileUpload).subscribe(res2 => {
      //     console.log(res2);
      //   });
      // }
   
      
 
  }, (err:any) => {
    alert("Error try again later!!");
    this.dialogref.close();
  })
}


}
interface Year {
  year: String;
}