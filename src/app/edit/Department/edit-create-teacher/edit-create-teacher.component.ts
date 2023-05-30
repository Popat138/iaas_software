import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/service.service';

@Component({
  selector: 'app-edit-create-teacher',
  templateUrl: './edit-create-teacher.component.html',
  styleUrls: ['./edit-create-teacher.component.scss']
})
export class EditCreateTeacherComponent implements OnInit {

  public Form: FormGroup;
  constructor(

    private fb: FormBuilder,
    public service: ServiceService,
    @Inject(MAT_DIALOG_DATA)
    public data : any,
    public dialogRef: MatDialogRef<EditCreateTeacherComponent>,
    public router: Router


  ) {
    // this.userid = data.userid;
    this.Form = this.fb.group({
      f_name: this.fb.control('',Validators.required),
      m_name: this.fb.control('',Validators.required),
      l_name: this.fb.control('',Validators.required),
      email: this.fb.control('',Validators.required),
      paswd: this.fb.control('',Validators.required),
    //  academic_calander: this.fb.array([this.createacademic_calander()]),
      // meeting_details: this.fb.array([this.createmeeting_details()]),
      // report_activity: this.fb.array([this.createreport_activity()])
    })
   }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    console.log(this.data);
    this.Form.get("f_name").setValue(this.data.firstName);
    this.Form.get("m_name").setValue(this.data.middleName);
    this.Form.get("l_name").setValue(this.data.lastName);
    this.Form.get("email").setValue(this.data.email);
    this.Form.get("paswd").setValue(this.data.password);
  }

  submitForm(){

    let data : any = {
      userId: this.data.userId,
      firstName : this.Form.get("f_name")?.value,
      middleName : this.Form.get("m_name")?.value,
      lastName : this.Form.get("l_name")?.value,
      email : this.Form.get("email")?.value,
      password : this.Form.get("paswd")?.value
    }

      this.service.putData("/user", data).subscribe((res: any) => {
        console.log(res);
        }, (err: any) => {
        console.warn("Error try again later!!");
        }, () => {
        this.dialogRef.close();
        });
  }

  }
