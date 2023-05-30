import { Component, OnInit, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceService } from 'src/app/service.service';
import {v4 as uuid4} from 'uuid';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-stream-detail',
  templateUrl: './edit-stream-detail.component.html',
  styleUrls: ['./edit-stream-detail.component.scss']
})
export class EditStreamDetailComponent implements OnInit {
  fileUpload = new FormData();
  departments: any;
  streams: any;

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
    public dialogRef: MatDialogRef<EditStreamDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data : any,
    public dialog: MatDialog,
    public router: Router

  ) { 
    this.Form = this.fb.group({
      faculty: this.fb.control(''),
      no_of_div:this.fb.control('',Validators.required),
      division:this.fb.array([]),
      class: this.fb.control('',Validators.required),
   })
  }
  get divisionControl() {
    this.division = this.Form.get('division') as FormArray;
    return this.division.controls;
  }

  createDivision(): FormGroup {
    return this.fb.group({
      id:this.fb.control(''),
      division: this.fb.control('',Validators.required),
      subjects:this.fb.control(''),

    });
  }

  addDivision(): void {
    this.division = this.Form.get('division') as FormArray;
    this.division.push(this.createDivision());
  }

  removeDivision(i: number) {
    this.division.removeAt(i);

  }
  ngOnInit(): void {
    this.fetchStream();
    this.getData();

  }
  fetchStream(){
    this.service.getData("/stream").subscribe((res: any) => {
      console.log(res);
      this.streams = res;
    }, (err: any) => {
      alert("Error try again!!!");
    });
     }
    getData(){
      console.log(this.data);
        this.service.getData("/stream-detail/stream/" + this.data.stream.id).subscribe((res: any) => {
        // console.log(department);
        // this.Form.get("department").setValue(department);
        this.Form.get("faculty").setValue(this.data.stream.id);
        this.Form.get("class").setValue(this.data.streamClass);
        this.Form.get("no_of_div").setValue(this.data.divisions.length);
        // this.Form.get("division").setValue(this.data.divisions.divisionName);
        // this.Form.get("intake").setValue(this.data.intakeCapacity);
        

        for(let i = 0; i<this.data.divisions.length; i++) {
          console.log("defdf",this.data.divisions[i].id)
          this.division=this.Form.get('division') as FormArray;
          this.division.push(this.createDivision());
          this.division.at(i).get("id").setValue(this.data.divisions[i].id);
          this.division.at(i).get("division").setValue(this.data.divisions[i].divisionName);
          for(let j = 0; j< this.data.divisions[i].subjects.length; j++) {
            this.subjects[i] ?? this.subjects.push([]);   
            this.subjects[i].push(this.data.divisions[i].subjects[j].name);
          }
        }
  
      }, (err: any)=> {
        console.log(err);
      })



    }


     submitForm(){
      
      let divsionList: any [] =[];
      for(let i = 0; i< this.division.length; i++){
        let subjectList: any [] = [];
        for(let j = 0; j<this.subjects[i].length; j++){
          subjectList.push({
            name: this.subjects[i][j]
          })
        }
        divsionList.push({
          id: this.division.at(i).get("id").value, //Added
          divisionName: this.division.at(i).get("division").value,
          subjects: subjectList
        })
      }
  
      let streamData = {
        id: this.data.id,
        // stream: JSON.stringify(this.Form.get("faculty").value),
        streamClass: this.Form.get("class").value,
        divisions: divsionList,
        stream: {
          id: this.Form.get("faculty").value
        }
  
      }
      this.service.putData("/stream-detail", streamData).subscribe((res2: any) => {
        console.log(" res",res2)
        // if(this.fileUpload.getAll("files").length > 0){
          // this.service.postData("/upload", this.fileUpload).subscribe(res2 => {
          //   console.log(res2);
          // });
        // }
      }, (err2 : any) => {
        console.log("error",err2)
      alert("Error try again later on !!");
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

export interface Subject {
  name: string;
}