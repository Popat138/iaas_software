import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceService } from 'src/app/service.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-edit-certificate-courses',
  templateUrl: './edit-certificate-courses.component.html',
  styleUrls: ['./edit-certificate-courses.component.scss']
})
export class EditCertificateCoursesComponent implements OnInit {

  fileUpload = new FormData();
  departments: any;
  department: any = null;
  programs: any;
  upload: any;
  year: Year[] = [
    {year: '2018-2019', },
    {year: '2019-2020', },
    {year: '2020-2021', },
    {year: '2021-2022', },
  ];

  level: Level[] = [

    {level: 'Add-on course', },
    {level: 'Certificate', },
    {level: 'PG Diploma', },
    {level: 'Diploma', },
    {level: 'Advance Diploma', },

  ]

  public Form: FormGroup;
  constructor(

    private fb: FormBuilder,
    public service: ServiceService,
    private dialogRef: MatDialogRef<EditCertificateCoursesComponent>,
    @Inject(MAT_DIALOG_DATA) public data : any
  ) {

    this.Form = this.fb.group({
      department: this.fb.control('',Validators.required),
      faculty: this.fb.control('',Validators.required),
      prog_name: this.fb.control('',Validators.required),
      cert_name: this.fb.control('',Validators.required),
      duration: this.fb.control('',Validators.required),
    //  t_date: this.fb.control('',Validators.required),
      academicYear: this.fb.control('',Validators.required),
      courseLevel: this.fb.control('',Validators.required),
      // spec: this.fb.control('',Validators.required),
      // hod_email: this.fb.control('',Validators.required),
      // hod_paswd: this.fb.control('',Validators.required)
    })

   }

  ngOnInit(): void {
    this.fetchDepartment();
    this.getData()
  }

  getData() {
    console.log(this.data);
    this.service.getData("/department/program/" + this.data.program_id).subscribe((department: any) => {
      // console.log(department);
      this.Form.get("department").setValue(department);
      this.Form.get("faculty").setValue(this.data.faculty);
      this.Form.get("prog_name").setValue(this.data.program_id);
      this.Form.get("cert_name").setValue(this.data.name);
      this.Form.get("duration").setValue(this.data.duration);
      this.Form.get("academicYear").setValue(this.data.implementation_year);
      this.Form.get("courseLevel").setValue(this.data.level);

    }, (err: any)=> {
      console.log(err);
    })
  }

  changeDepartment(event: any) {
    // this.department = this.Form.get('department')
    if(event.value != "" && event.value != null && event.value != undefined) {
      this.Form.get("prog_name")?.enable();
    } else {
      this.Form.get("prog_name")?.disable();
    }
  }

  fetchDivision(): any {
    let data = this.Form.get("department")?.value;
    if(data != null || data != undefined) {
      return data.programs;
    }
    return null;
  }

  fetchDepartment() {
    this.service.getData("/department/college/" + 1).subscribe((res: any) => {
      console.log(res);
      this.departments = res;
    }, (err: any) => {
      alert("Error try again later!!!");
    });
  }

  certupload(event: any){
    this.upload = event.target.files[0];
  }

  submitForm(){
    let uploadExt =  this.upload?.name.split('.').pop();
    let uploadFilename: any = null;
    if(this.upload != undefined && this.upload != null ) {
      uploadFilename = uuidv4() + "." + uploadExt;
      this.fileUpload.append("files", this.upload, uploadFilename) ;
    }

    let courseData = {
      courseId: this.data.course_id,
      faculty: this.Form.get("faculty").value,
      name: this.Form.get("cert_name").value,
      duration: this.Form.get("duration").value,
     // toDate: this.Form.get("t_date").value,
      implementationYear: this.Form.get("academicYear").value,
      level: this.Form.get("courseLevel").value,
      permissionLetter: uploadFilename
    }


    this.service.putData("/certificate-course/program/" + this.Form.get("prog_name").value, courseData).subscribe((res2: any) => {
      if(this.fileUpload.getAll("files").length > 0){
        this.service.postData("/upload", this.fileUpload).subscribe(res2 => {
          console.log(res2);
        });
      }
    }, (err2 : any) => {
      
    alert("Error try again later!!");
    this.dialogRef.close();
    }, () => {
      this.dialogRef.close();
    })
  }

}
interface Year {
  year: String;
}
interface Level {
  level: String;
}
