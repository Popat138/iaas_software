import { Component, Inject, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceService } from 'src/app/service.service';
import {v4 as uuidv4} from 'uuid';
@Component({
  selector: 'app-super-admin-add-new-college',
  templateUrl: './super-admin-add-new-college.component.html',
  styleUrls: ['./super-admin-add-new-college.component.scss']
})
export class SuperAdminAddNewCollegeComponent implements OnInit {
  fileUpload = new FormData();
 image:any;
  public Form: FormGroup;
  constructor(

    private fb: FormBuilder,
    public service: ServiceService,
    @Inject(MAT_DIALOG_DATA)
    public data : any,
    public dialogRef: MatDialogRef<SuperAdminAddNewCollegeComponent>


  ) {
    // this.userid = data.userid;
    this.Form = this.fb.group({
      name: this.fb.control('',Validators.required),
      code: this.fb.control('',Validators.required),
      address:this.fb.control('',Validators.required),
      description:this.fb.control('',Validators.required),
      association:this.fb.control('',Validators.required),
    
    //  academic_calander: this.fb.array([this.createacademic_calander()]),
      // meeting_details: this.fb.array([this.createmeeting_details()]),
      // report_activity: this.fb.array([this.createreport_activity()])
    })
   }

  ngOnInit(): void {
  }

  certupload(event: any){
    this.image = <File>event.target.files[0];
  }

submitForm(){
  let imageExt =  this.image?.name.split('.').pop();
    let imageFilename: any = null;
  if(this.image != undefined && this.image != null ) {
    imageFilename = uuidv4() + "." + imageExt;
    this.fileUpload.append("files", this.image, imageFilename) ;
  }

  let data : any = {
    name : this.Form.get("name")?.value,
    code : this.Form.get("code")?.value,
    address:this.Form.get("address")?.value,
    description:this.Form.get("description")?.value,
    association:this.Form.get("association")?.value,
    image:imageFilename
}

this.service.postData("/college", data).subscribe((res: any) => {
  console.log(res);
  if(this.fileUpload.getAll("files").length > 0){
    this.service.postData("/upload", this.fileUpload).subscribe(res2 => {
      console.log("FileName",res2);
    });
  }
}, (err: any) => {
  console.warn("Error try again later!!");
}, () => {
  this.dialogRef.close();
})


}

}
