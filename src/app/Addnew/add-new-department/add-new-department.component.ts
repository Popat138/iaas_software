import { validateHorizontalPosition } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ServiceService } from 'src/app/service.service';

@Component({
  selector: 'app-add-new-department',
  templateUrl: './add-new-department.component.html',
  styleUrls: ['./add-new-department.component.scss']
})
export class AddNewDepartmentComponent implements OnInit {


  year: Year[] = [
    {year: '2018-2019', },
    {year: '2019-2020', },
    {year: '2020-2021', },
    {year: '2021-2022', },
  ];

  public Form: FormGroup;
  constructor(

    private fb: FormBuilder,
    public service: ServiceService,
    public dialogref: MatDialogRef<AddNewDepartmentComponent>
  ) {

    this.Form = this.fb.group({
      d_name: this.fb.control('',Validators.required),
      spec: this.fb.control('',Validators.required),
      academicYear:  this.fb.control('',Validators.required),
      hod_name: this.fb.control('',Validators.required),
      hod_email: this.fb.control('',Validators.required),
      hod_paswd: this.fb.control('',Validators.required)
    })

   }

  ngOnInit(): void {
  }

  submitForm(){
    let departmentData = {
      departmentName: this.Form.get("d_name").value,
      specialization: this.Form.get("spec").value,
      establishmentYear: this.Form.get("academicYear").value,
    }

    // this.service.postData("/department", departmentData).subscribe((res:any) => {

    //   let department = res;
      let userData = {
        firstName: this.Form.get("hod_name").value,
        email: this.Form.get("hod_email").value,
        password: this.Form.get("hod_paswd").value,
        hod: {
          department: departmentData
        }
      };
      this.service.postData("/user/hod/college/" + 1 , userData).subscribe((res2: any) => {
        this.dialogref.close();
      }, (err2 : any) => {
        
      alert("Error try again later!!");
      this.dialogref.close();
      })
    // }, (err:any) => {
    //   alert("Error try again later!!");
    //   this.dialogref.close();
    // })
  }

}
interface Year {
  year: String;
}
