import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceService } from 'src/app/service.service';

@Component({
  selector: 'app-edit-create-department',
  templateUrl: './edit-create-department.component.html',
  styleUrls: ['./edit-create-department.component.scss']
})
export class EditCreateDepartmentComponent implements OnInit {

  

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
    public dialogref: MatDialogRef<EditCreateDepartmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
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
    this.getData();
  }

  getData() {
    console.log(this.data);
    console.log("COLLEGE",this.data.college.id)
    this.Form.get("d_name").setValue(this.data.hod.department.departmentName);
    this.Form.get("spec").setValue(this.data.hod.department.specialization);
    this.Form.get("academicYear").setValue(this.data.hod.department.establishmentYear);
    this.Form.get("hod_name").setValue(this.data.firstName);
    this.Form.get("hod_email").setValue(this.data.email);
    this.Form.get("hod_paswd").setValue(this.data.password);
  }

  submitForm(){
    let departmentData = {
      id: this.data.hod.department.id,
      departmentName: this.Form.get("d_name").value,
      specialization: this.Form.get("spec").value,
      establishmentYear: this.Form.get("academicYear").value,
      college:{
        id:this.data.college.id,
        name:this.data.college.name,
        address:this.data.college.address,
        association:this.data.college.association,
        description:this.data.college.description,
        image:this.data.college.image
      }
    }

    // this.service.postData("/department", departmentData).subscribe((res:any) => {

    //   let department = res;
      let userData = {
        userId: this.data.userId,
        firstName: this.Form.get("hod_name").value,
        email: this.Form.get("hod_email").value,
        password: this.Form.get("hod_paswd").value,
        hod: {
          id: this.data.hod.id,
          department: departmentData
        },
        
      
      };
      this.service.putData("/user", userData).subscribe((res2: any) => {
        console.log("USER",this.data.userId)
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
