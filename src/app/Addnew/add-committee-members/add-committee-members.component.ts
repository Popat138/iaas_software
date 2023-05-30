import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/service.service';
@Component({
  selector: 'app-add-committee-members',
  templateUrl: './add-committee-members.component.html',
  styleUrls: ['./add-committee-members.component.scss']
})
export class AddCommitteeMembersComponent implements OnInit {


  public Form: FormGroup;
  public other : FormArray = this.fb.array([]);
  constructor(

    private fb: FormBuilder,
    public service: ServiceService,
    @Inject(MAT_DIALOG_DATA)
    public data : any,
    public dialogRef: MatDialogRef<AddCommitteeMembersComponent>,
    public router: Router


  ) {
    // this.userid = data.userid;
    this.Form = this.fb.group({
      // f_name: this.fb.control('',Validators.required),
      // m_name: this.fb.control(''),
      // l_name: this.fb.control('',Validators.required),
      // email: this.fb.control('',Validators.required),
      // mobile: this.fb.control('',Validators.required),
    //  academic_calander: this.fb.array([this.createacademic_calander()]),
      // meeting_details: this.fb.array([this.createmeeting_details()]),
      // report_activity: this.fb.array([this.createreport_activity()])
      other:this.fb.array([this.createother()]),
    })
   }
   

  ngOnInit(): void {
  }
  get otherControl() {
    this.other = this.Form.get('other') as FormArray;
    return this.other.controls;
  }
  
  createother(): FormGroup {
    return this.fb.group({
    // Programme: this.fb.control('',Validators.required),
    f_name: this.fb.control('',Validators.required),
    m_name: this.fb.control(''),
    l_name: this.fb.control('',Validators.required),
    email: this.fb.control('',Validators.required),
    mobile: this.fb.control('',Validators.required),

  });
  }

  addother(): void {
    this.other = this.Form.get('other') as FormArray;
    this.other.push(this.createother());
  }

  removeother(i: number) {
    this.other.removeAt(i);
  }
  submitForm(){

    let data : any = {
      firstName : this.Form.get("f_name")?.value,
      middleName : this.Form.get("m_name")?.value,
      lastName : this.Form.get("l_name")?.value,
      email : this.Form.get("email")?.value,
      password : this.Form.get("mobile")?.value
    }

    this.service.getUserWithUserId().subscribe((user: any) => {
      this.service.postData("/user/teacher/department/" + user.hod.department.id, data).subscribe((res: any) => {
        console.log(res);
        }, (err: any) => {
        console.warn("Error try again later!!");
        }, () => {
        this.dialogRef.close();
        });
    }, (err: any) => {
      alert("User authentication expired!!. Login again to continue.");
      this.router.navigateByUrl("");
    })

  }

  }
