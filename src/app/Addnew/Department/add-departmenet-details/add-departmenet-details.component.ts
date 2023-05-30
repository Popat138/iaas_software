import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceService } from 'src/app/service.service';

@Component({
  selector: 'app-add-departmenet-details',
  templateUrl: './add-departmenet-details.component.html',
  styleUrls: ['./add-departmenet-details.component.scss']
})
export class AddDepartmenetDetailsComponent implements OnInit {



public Form: FormGroup;
constructor(

  private fb: FormBuilder,
  public service: ServiceService,
  @Inject(MAT_DIALOG_DATA)
  public data : any,
  public dialogRef: MatDialogRef<AddDepartmenetDetailsComponent>


) {
  // this.userid = data.userid;
  this.Form = this.fb.group({
    name: this.fb.control('',Validators.required),
    year: this.fb.control('',Validators.required),
  //  academic_calander: this.fb.array([this.createacademic_calander()]),
    // meeting_details: this.fb.array([this.createmeeting_details()]),
    // report_activity: this.fb.array([this.createreport_activity()])
  })
 }

ngOnInit(): void {
}

submitForm(){

let data : any = {
  name : this.Form.get("name")?.value,
  code : this.Form.get("code")?.value,
}

this.service.postData("/college", data).subscribe((res: any) => {
console.log(res);
}, (err: any) => {
console.warn("Error try again later!!");
}, () => {
this.dialogRef.close();
})


}

}
