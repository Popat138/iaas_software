import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ServiceService } from 'src/app/service.service';

@Component({
  selector: 'app-add-new-criteria',
  templateUrl: './add-new-criteria.component.html',
  styleUrls: ['./add-new-criteria.component.scss']
})
export class AddNewCriteriaComponent implements OnInit {

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
    public dialogref: MatDialogRef<AddNewCriteriaComponent>

  ) { 
    this.Form = this.fb.group({
      d_name: this.fb.control('',Validators.required),
      crh_name: this.fb.control('',Validators.required),
      crh_email: this.fb.control('',Validators.required),
      crh_paswd: this.fb.control('',Validators.required)
    })
  }

  ngOnInit(): void {
  }

submitForm()
{
// let criteriaData = {
//         criteriaName: this.Form.get("d_name").value,
//         }
        let userData = {
          firstName: this.Form.get("crh_name").value,
          email: this.Form.get("crh_email").value,
          password: this.Form.get("crh_paswd").value,
          crh:{
          criteriaName: this.Form.get("d_name").value,
          }
          // crh: {
          //   criteria: criteriaData
          // }
        };
        this.service.postData("/user/crh/college/" + 1 , userData).subscribe((res2: any) => {
          this.dialogref.close();
        }, (err2 : any) => {
          
        alert("Error try again later!!");
        this.dialogref.close();
        })

}


}
