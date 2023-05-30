import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ServiceService } from 'src/app/service.service';

@Component({
  selector: 'app-add-new-committee',
  templateUrl: './add-new-committee.component.html',
  styleUrls: ['./add-new-committee.component.scss']
})
export class AddNewCommitteeComponent implements OnInit {

  public Form: FormGroup;
  constructor(

    private fb: FormBuilder,
    public service: ServiceService,
    public dialogref: MatDialogRef<AddNewCommitteeComponent>
  ) {

    this.Form = this.fb.group({
      c_name: this.fb.control('',Validators.required),
      chairman_name: this.fb.control('',Validators.required),
      c_email: this.fb.control('',Validators.required),
      c_paswd: this.fb.control('',Validators.required)
    })

   }

  ngOnInit(): void {
  }

  submitForm(){
    
      let userData = {
        firstName: this.Form.get("chairman_name").value,
        email: this.Form.get("c_email").value,
        password: this.Form.get("c_paswd").value,
        role: {
          roleName: "Committee_chairman"
        }
      };

      let commiteeData = {
        name: this.Form.get("c_name").value,
        committeeMembers: []
      }

      commiteeData.committeeMembers.push({
        user: userData,
        committeeMemberRole: "Chairman"
      });

      this.service.postData("/committee/college/" + 1 , commiteeData).subscribe((res2: any) => {
        this.dialogref.close();
      }, (err2 : any) => {
        
      alert("Error try again later!!");
      this.dialogref.close();
      })
  }

}