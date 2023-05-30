import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceService } from 'src/app/service.service';

@Component({
  selector: 'app-edit-create-committee',
  templateUrl: './edit-create-committee.component.html',
  styleUrls: ['./edit-create-committee.component.scss']
})
export class EditCreateCommitteeComponent implements OnInit {

  public Form: FormGroup;
  constructor(

    private fb: FormBuilder,
    public service: ServiceService,
    public dialogref: MatDialogRef<EditCreateCommitteeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    this.Form = this.fb.group({
      c_name: this.fb.control('',Validators.required),
      chairman_name: this.fb.control('',Validators.required),
      c_email: this.fb.control('',Validators.required),
      c_paswd: this.fb.control('',Validators.required)
    })

   }

  ngOnInit(): void {

    this.getData();
  }

  getData() {
    console.log(this.data);
    this.Form.get("c_name").setValue(this.data.name);
    this.Form.get("chairman_name").setValue(this.data.committeeMembers[0].user.firstName);
    this.Form.get("c_email").setValue(this.data.committeeMembers[0].user.email);
    this.Form.get("c_paswd").setValue(this.data.committeeMembers[0].user.password);
  }

  submitForm(){
    
      let userData = {
        userId: this.data.committeeMembers[0].user.userId,
        firstName: this.Form.get("chairman_name").value,
        email: this.Form.get("c_email").value,
        password: this.Form.get("c_paswd").value,
        role: {
          roleName: "Committee_chairman"
        }
      };

      let commiteeData = {
        id: this.data.id,
        name: this.Form.get("c_name").value,
        committeeMembers: [],
        college: {
          id: this.data.college.id
        }
      }

      commiteeData.committeeMembers.push({
        user: userData,
        committeeMemberRole: "Chairman"
      });

      this.service.putData("/committee" , commiteeData).subscribe((res2: any) => {
        this.dialogref.close();
      }, (err2 : any) => {
        
      alert("Error try again later!!");
      this.dialogref.close();
      })
  }

}