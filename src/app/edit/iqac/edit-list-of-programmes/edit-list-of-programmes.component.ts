import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceService } from 'src/app/service.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-edit-list-of-programmes',
  templateUrl: './edit-list-of-programmes.component.html',
  styleUrls: ['./edit-list-of-programmes.component.scss']
})
export class EditListOfProgrammesComponent implements OnInit {

  fileUpload = new FormData();
  departments: any;
  streams: any;
  permissionLetter: any;
  affiliationLetter: any;
  year: Year[] = [
    {year: '2018-2019', },
    {year: '2019-2020', },
    {year: '2020-2021', },
    {year: '2021-2022', },
  ];


  level: Level [] = [
    {level: 'Undergraduate', },
    {level: 'Postgraduate', },
    {level: 'PhD', },
    {level: 'PG Diploma', },
  ]

  prog_type: Type [] = [
    {prog_type: 'Elective', },
    {prog_type: 'CBCS', },
  ]



  public Form: FormGroup;
  constructor(

    private fb: FormBuilder,
    public service: ServiceService,
    public dialogRef: MatDialogRef<EditListOfProgrammesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    this.Form = this.fb.group({
      department: this.fb.control(''),
      faculty: this.fb.control(''),
      prog_code: this.fb.control(''),
      prog_name: this.fb.control(''),
      spec: this.fb.control(''),
      prog_lvl: this.fb.control(''),
      prog_type: this.fb.control(''),
      implementationYear:  this.fb.control(''),


      // hod_name: this.fb.control('',Validators.required),
      // hod_email: this.fb.control('',Validators.required),
      // hod_paswd: this.fb.control('',Validators.required)
    })

   }
   certupload(event: any){
    this.permissionLetter = event.target.files[0];
  }

  affiliationupload(event: any){
    this.affiliationLetter = event.target.files[0];
  }

  ngOnInit(): void {
    this.fetchDepartment();
    this.getData();
    this.fetchStream();
  }

  fetchDepartment() {
    this.service.getData("/department/college/" + 1).subscribe((res: any) => {
      console.log(res);
      this.departments = res;
    }, (err: any) => {
      alert("Error try again later!!!");
    });
  }

  getData() {
    console.log(this.data);
    this.service.getData("/department/program/" + this.data.programId).subscribe((department: any) => {
      this.Form.get("department").setValue(department.id);
      this.Form.get("faculty").setValue(this.data.stream.id);
      this.Form.get("prog_code").setValue(this.data.programCode);
      this.Form.get("prog_name").setValue(this.data.programName);
      this.Form.get("spec").setValue(this.data.specialization);
      this.Form.get("prog_lvl").setValue(this.data.programLevel);
      this.Form.get("prog_type").setValue(this.data.programType);
      this.Form.get("implementationYear").setValue(this.data.startYear);
    }, (err: any)=> {
      console.log(err);
    })
  }
  fetchStream(){
    this.service.getData("/stream").subscribe((res: any) => {
      console.log(res);
      this.streams = res;
    }, (err: any) => {
      alert("Error try again!!!");
    });
     }
  submitForm(){

    let permissionLetterExt =  this.permissionLetter?.name.split('.').pop();
    let permissionLetterFilename: any = null;
    if(this.permissionLetter != undefined && this.permissionLetter != null ) {
      permissionLetterFilename = uuidv4() + "." + permissionLetterExt;
      this.fileUpload.append("files", this.permissionLetter, permissionLetterFilename) ;
    }

    let affiliationLetterExt =  this.affiliationLetter?.name.split('.').pop();
    let affiliationLetterFilename: any = null;
    if(this.affiliationLetter != undefined && this.affiliationLetter != null ) {
      affiliationLetterFilename = uuidv4() + "." + affiliationLetterExt;
      this.fileUpload.append("files", this.affiliationLetter, affiliationLetterFilename) ;
    }

    let programData = {
      programId: this.data.programId,
      faculty: this.Form.get("faculty").value,
      programCode: this.Form.get("prog_code").value,
      programName: this.Form.get("prog_name").value,
      specialization: this.Form.get("spec").value,
      programLevel: this.Form.get("prog_lvl").value,
      programType: this.Form.get("prog_type").value,
      startYear: this.Form.get("implementationYear").value,
      permissionLetter: permissionLetterFilename,
      affiliationLetter: affiliationLetterFilename
    }

    this.service.putData("/program", programData).subscribe((res2: any) => {
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

interface Type {
  prog_type:String;
}
