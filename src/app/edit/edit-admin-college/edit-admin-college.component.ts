import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceService } from 'src/app/service.service';
import {v4 as uuidv4} from 'uuid';
@Component({
  selector: 'app-edit-admin-college',
  templateUrl: './edit-admin-college.component.html',
  styleUrls: ['./edit-admin-college.component.scss']
})
export class EditAdminCollegeComponent implements OnInit {
  fileUpload = new FormData();
  image:any;
   public Form: FormGroup;
  constructor(
    private fb: FormBuilder,
    public service: ServiceService,
    @Inject(MAT_DIALOG_DATA)
    public data : any,
    public dialogRef: MatDialogRef<EditAdminCollegeComponent>,
    private http: HttpClient,

  ) { 
    this.Form = this.fb.group({
      name: this.fb.control('',Validators.required),
      code: this.fb.control('',Validators.required),
      address:this.fb.control('',Validators.required),
      description:this.fb.control('',Validators.required),
      association:this.fb.control('',Validators.required),
    })
  }

  ngOnInit(): void {
    this.getData();
  }
  certupload(event: any){
    this.image = <File>event.target.files[0];
  }
  getData(){
    console.log(this.data);
    this.Form.get("name").setValue(this.data.name);
     this.Form.get("code").setValue(this.data.code);
     this.Form.get("address").setValue(this.data.address);
     this.Form.get("description").setValue(this.data.description);
     this.Form.get("association").setValue(this.data.association);
  }

  
submitForm(){
  let imageExt =  this.image?.name.split('.').pop();
  console.log("IMAGE",this.image.name)
  let imageFilename: any = null;
  if(this.image != undefined && this.image != null ) {
    imageFilename = this.image.name;
    //uuidv4()  + "." + imageExt;
    this.fileUpload.append("files", this.image, imageFilename) ;
  }

  let data : any = {
    id: this.data.id,
    name : this.Form.get("name")?.value,
    code : this.Form.get("code")?.value,
    address:this.Form.get("address")?.value,
    description:this.Form.get("description")?.value,
    association:this.Form.get("association")?.value,
    image:imageFilename
}

this.service.putData("/college", data).subscribe((res: any) => {
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
