import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/service.service';

@Component({
  selector: 'app-edit-ug-courses',
  templateUrl: './edit-ug-courses.component.html',
  styleUrls: ['./edit-ug-courses.component.scss']
})
export class EditUgCoursesComponent implements OnInit {

  programs : any = null;
  program: any =null;
  year: Year[] = [
    {year: '2018-2019', },
    {year: '2019-2020', },
    {year: '2020-2021', },
    {year: '2021-2022', },
  ];

  ug_year : UgYear[] = [

    {ug_year: 'I', },
    {ug_year: 'II', },
    {ug_year: 'III', },
    {ug_year: 'IV', },


  ]

  ug_semester : ug_semester[] = [

    {ug_semester: 'I', },
    {ug_semester: 'II', },
    {ug_semester: 'III', },
    {ug_semester: 'IV', },
    {ug_semester: 'V', },
    {ug_semester: 'VI', },
    {ug_semester: 'VII', },
    {ug_semester: 'VIII', },


  ]


  prog_type : prog_type[] = [

    {prog_type: 'Elective', },
    {prog_type: 'CBCS', },


  ]

  public Form: FormGroup;
  public ug : FormArray = this.fb.array([]);
  constructor(

    private fb: FormBuilder,
    public service: ServiceService,
    @Inject(MAT_DIALOG_DATA) public data : any,
    public dialogRef: MatDialogRef<EditUgCoursesComponent>,
    public router: Router


  ) {
    // this.userid = data.userid;
    this.Form = this.fb.group({
      ug:this.fb.array([]),

    })
   }

  ngOnInit(): void {
    this.getProgram();
  }

  getData() {
    console.log(this.data);
    this.ug = this.Form.get('ug') as FormArray;
    this.ug.push(this.createug());


    this.program = this.data.program.programId;
    // this.programs.map((program:any) => {
    //   if(program.programId = this.data.program.programId) {
    //     program = this.data.program;
    //   }
    // });

    this.ug.at(0).get("ug_prog_name").setValue(this.data.programprogramId),
    this.ug.at(0).get("code").setValue(this.data.programprogramId),
    this.ug.at(0).get("c_name").setValue(this.data.name),
    this.ug.at(0).get("ug_year").setValue(this.data.year),
    this.ug.at(0).get("ug_semester").setValue(this.data.semester),
    this.ug.at(0).get("c_code").setValue(this.data.code),
    this.ug.at(0).get("year_of_intro").setValue(this.data.yoi),
    this.ug.at(0).get("prog_type").setValue(this.data.electiveType)
  }

  get ugControl() {
    this.ug = this.Form.get('ug') as FormArray;
    return this.ug.controls;
  }

  createug(): FormGroup {
    return this.fb.group({

    //  academic_year:this.fb.control('',Validators.required),

    ug_prog_name: this.fb.control('',Validators.required),
    code: this.fb.control('',Validators.required),
    ug_year: this.fb.control('',Validators.required),
    ug_semester: this.fb.control('',Validators.required),
    c_code: this.fb.control('',Validators.required),
    c_name: this.fb.control('',Validators.required),
    year_of_intro: this.fb.control('',Validators.required),
    prog_type: this.fb.control('',Validators.required),

    });
  }

  addug(): void {
    this.ug = this.Form.get('ug') as FormArray;
    this.ug.push(this.createug());
  }

  removeug(i: number) {
    this.ug.removeAt(i);

  }

  getProgram() {
    this.service.getUserWithUserId().subscribe((user: any) => {
      this.service.getData("/program/programLevel/Undergraduate/department/" + user.hod.department.id).subscribe((res: any) => {
        console.log(res);
        this.programs = res;
        
    this.getData();
      }, (err: any) => {
        alert("Error try again later!");
        this.dialogRef.close();
      });
    }, (err: any) => {
      alert("User authentication expired!!. Login again to continue.");
      this.router.navigateByUrl("");
    });
  }

  submitForm(){

  let data : any = {
    courseId: this.data.courseId,
    name : this.ug.at(0).get("c_name").value,
    year: this.ug.at(0).get("ug_year").value,
    semester:this.ug.at(0).get("ug_semester").value,
    code:this.ug.at(0).get("c_code").value,
    yoi:this.ug.at(0).get("year_of_intro").value,
    electiveType:this.ug.at(0).get("prog_type").value,
    program: {
      programId: this.program
    }
  }

  // console.log(data);

  this.service.putData("/course", data).subscribe((res: any) => {
  console.log(res);
  }, (err: any) => {
    console.log(err);
  console.warn("Error try again later!!");
  }, () => {
  this.dialogRef.close();
  })


  }

  }
  interface Year {
    year: String;
   }

   interface UgYear {
     ug_year: String;
   }

   interface prog_type {
    prog_type: String;
   }

   interface ug_semester {
     ug_semester:String
   }