import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceService } from 'src/app/service.service';
@Component({
  selector: 'app-edit-create-criteria',
  templateUrl: './edit-create-criteria.component.html',
  styleUrls: ['./edit-create-criteria.component.scss']
})
export class EditCreateCriteriaComponent implements OnInit {

  salutation:any[]=[
    {level: 'Criterion-I', },
    {level: 'Criterion-II', },
    {level: 'Criterion-III', },
    {level: 'Criterion-IV', },
    {level: 'Criterion-V', },
    {level: 'Criterion-VI', },
    {level: 'Criterion-VII', },
    {level:''},

  ];
  public Form: FormGroup;
  constructor(
    private fb: FormBuilder,
    public service: ServiceService,
    public dialogref: MatDialogRef<EditCreateCriteriaComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) { 
    this.Form = this.fb.group({
      d_name: this.fb.control('',Validators.required),
      crh_name: this.fb.control('',Validators.required),
      crh_email: this.fb.control('',Validators.required),
      crh_paswd: this.fb.control('',Validators.required)
    })
  }

  ngOnInit(): void {
    this.getData();
  }

getData(){
  console.log(this.data);
    console.log("COLLEGE",this.data.college.id)
    this.Form.get("d_name").setValue(this.data.crh.criteriaName);
    this.Form.get("crh_name").setValue(this.data.firstName);
    this.Form.get("crh_email").setValue(this.data.email);
    this.Form.get("crh_paswd").setValue(this.data.password);
    // this.Form.get("hod_name").setValue(this.data.firstName);
    // this.Form.get("hod_email").setValue(this.data.email);
    // this.Form.get("hod_paswd").setValue(this.data.password);
}


  submitForm()
  {
  // let criteriaData = {
  //         criteriaName: this.Form.get("d_name").value,
  //         }
          let userData = {
            userId: this.data.userId,
            firstName: this.Form.get("crh_name").value,
            email: this.Form.get("crh_email").value,
            password: this.Form.get("crh_paswd").value,
            crh:{
              id: this.data.crh.id,
            criteriaName: this.Form.get("d_name").value,
            }
            // crh: {
            //   criteria: criteriaData
            // }
          };
          this.service.putData("/user", userData).subscribe((res2: any) => {
            this.dialogref.close();
          }, (err2 : any) => {
            
          alert("Error try again later!!");
          this.dialogref.close();
          })
  
  }





  
}
