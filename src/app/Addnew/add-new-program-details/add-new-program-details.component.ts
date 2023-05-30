import { Component, Inject, OnChanges, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceService } from 'src/app/service.service';
import { StreamDetailsComponent } from 'src/app/stream-details/stream-details.component';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-add-new-program-details',
  templateUrl: './add-new-program-details.component.html',
  styleUrls: ['./add-new-program-details.component.scss']
})
export class AddNewProgramDetailsComponent implements OnInit, OnChanges {

  
  departments: any;
  classData: any;
  divisions:any;
  department: any = null;
  fileUpload = new FormData();
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  subjects: any[][] = [];

  add(event: MatChipInputEvent, i:number): void {
    const value = (event.value || '').trim();

    this.subjects[i] ?? this.subjects.push([]);    
    // Add our fruit
    if (value) {
      this.subjects[i].push(value.trim());
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(subject: any, i:number): void {
    const index = this.subjects[i].indexOf(subject);

    if (index >= 0) {
      this.subjects[i].splice(index, 1);
    }
  }


    upload: any;
    year: Year[] = [
      {year: '2018-2019', },
      {year: '2019-2020', },
      {year: '2020-2021', },
      {year: '2021-2022', },
    ];


    level: Level [] = [
      {level: 'A', },
      {level: 'B', },
      {level: 'C', },
      {level: 'D', },
      {level: 'E', },
      {level: 'F', },
      {level: 'G', },
    ];


    public Form: FormGroup;
    public division: FormArray = this.fb.array([]);
    constructor(

      private fb: FormBuilder,
      public service: ServiceService,
      public dialogRef: MatDialogRef<AddNewProgramDetailsComponent>,
      @Inject(MAT_DIALOG_DATA) public data : any
    ) {

      this.Form = this.fb.group({


      department: this.fb.control('',Validators.required),
      division:this.fb.array([this.createDivision()]),

       // faculty: this.fb.control('',Validators.required),

       prog_name: this.fb.control({value: '', disabled: true},Validators.required),
       class: this.fb.control({value: '', disabled: true},Validators.required),
       no_of_div:this.fb.control('',Validators.required),
       intake:this.fb.control('',Validators.required),



      //  prog_lvl: this.fb.control('',Validators.required),
      //  prog_type: this.fb.control('',Validators.required),
      //  implementationYear:  this.fb.control('',Validators.required),


        // hod_name: this.fb.control('',Validators.required),
        // hod_email: this.fb.control('',Validators.required),
        // hod_paswd: this.fb.control('',Validators.required)
      })

    }


    get divisionControl() {
      this.division = this.Form.get('division') as FormArray;
      return this.division.controls;
    }

    
    createDivision(): FormGroup {
      return this.fb.group({
        division: this.fb.control('',Validators.required),
        // subjects:this.fb.control(''),

      });
    }

    addDivision(): void {
      this.division = this.Form.get('division') as FormArray;
      this.division.push(this.createDivision());
    }

    removeDivision(i: number) {
      this.division.removeAt(i);

    }




     certupload(event: any){
      this.upload = event.target.files[0];
    }

    affiliationupload(event: any){
      this.upload = event.target.files[0];
    }

    ngOnInit(): void {
      this.fetchDepartment();
  }

  changeDepartment(event: any) {
    // this.department = this.Form.get('department')
    if(event.value != "" && event.value != null && event.value != undefined) {
      this.Form.get("prog_name")?.enable();
    } else {
      this.Form.get("prog_name")?.disable();
    }
  }

  changeProgram(event: any) {
    // this.department = this.Form.get('department')
    console.log("ëvent.value",event.value)
    if(event.value != "" && event.value != null && event.value != undefined) {
      this.Form.get("class")?.enable();
      this.fetchClass()
    } else {
      this.Form.get("class")?.disable();
    }
  }
  changeClass(event: any) {
    // this.department = this.Form.get('department')
    console.log("ëvent.value",event.value)
    if(event.value != "" && event.value != null && event.value != undefined) {
      this.Form.get("division")?.enable();
      this.fetchClass()
    } else {
      this.Form.get("class")?.disable();
    }
  }

  fetchPrograms(): any {
    let data = this.Form.get("department")?.value;
    // console.log("datasssssss",data)
    if(data != null || data != undefined) {
      return data.programs;
    }
    return null;
  }

  fetchClass(): any {
    let data = this.Form.get("prog_name")?.value;
    
    if(data!==undefined && data.stream!==undefined &&data.stream.id!==undefined){
          // console.log("data",data.stream.id)
    this.service.getData("/stream-detail/stream/" + data.stream.id).subscribe((res: any) => {
      console.log(res);
      if(res != null && res != undefined) {
        this.classData=res
      }
      // this.departments = res;
    }, (err: any) => {
      alert("Error try again later!!!");
    });
  }
   
  }


  
  fetchDivisions(): any {
    let data = this.Form.get("class")?.value;
    if(data != null || data != undefined) {
      return data.divisions;
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

    ngOnChanges(): void {
      console.log(this.Form.errors);
    }

    submitForm(){
      // console.log(this.Form.value);
      // console.log(this.subjects);
      let uploadExt =  this.upload?.name.split('.').pop();
      let uploadFilename: any = null;
      if(this.upload != undefined && this.upload != null ) {
        uploadFilename = uuidv4() + "." + uploadExt;
        this.fileUpload.append("files", this.upload, uploadFilename) ;
      }
      let divsionList: any [] =[];
      for(let i = 0; i< this.division.length; i++){
        let subjectList: any [] = [];
        // for(let j = 0; j<this.subjects[i].length; j++){
        //   subjectList.push({
        //     name: this.subjects[i][j]
        //   })
        // }
        divsionList.push({
          divisionName: this.division.at(i).get("division").value.divisionName,
          // subjects: subjectList
        })
      }

      let programDetails = {
        programClass: this.Form.get("class").value.streamClass,
        intakeCapacity: this.Form.get("intake").value,
        certificate: uploadFilename,
        divisions: divsionList
      }
      // console.log("Divitions",divsionList)
      this.service.postData("/program-detail/program/" + this.Form.get("prog_name").value.programId, programDetails).subscribe((res:any) => {
        if(this.fileUpload.getAll("files").length > 0){
          this.service.postData("/upload", this.fileUpload).subscribe(res2 => {
            console.log(res2);
          });
        }
      }, (err:any) => {
        console.log("Error try again later!!");
      }, () => {
        this.dialogRef.close();
      });
    }

  }
  interface Year {
    year: String;
  }

  interface Level {
    level: String;
  }
  export interface Subject {
    name: string;
  }