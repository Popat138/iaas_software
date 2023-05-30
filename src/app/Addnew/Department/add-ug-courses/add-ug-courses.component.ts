import { Component, Inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/service.service';

@Component({
  selector: 'app-add-ug-courses',
  templateUrl: './add-ug-courses.component.html',
  styleUrls: ['./add-ug-courses.component.scss']
})
export class AddUgCoursesComponent implements OnInit {


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
    {ug_year: 'V', },


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
    {ug_semester: 'IX', },
    {ug_semester: 'X', },


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
    @Inject(MAT_DIALOG_DATA)
    public data : any,
    public dialogRef: MatDialogRef<AddUgCoursesComponent>,
    public router: Router


  ) {
    // this.userid = data.userid;
    this.Form = this.fb.group({
      ug:this.fb.array([this.createug()]),

    })
   }

  ngOnInit(): void {
    this.getProgram();
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

    name : this.ug.at(0).get("c_name").value,
    year: this.ug.at(0).get("ug_year").value,
    semester:this.ug.at(0).get("ug_semester").value,
    code:this.ug.at(0).get("c_code").value,
    yoi:this.ug.at(0).get("year_of_intro").value,
    electiveType:this.ug.at(0).get("prog_type").value,
  }

  // console.log(data);

  this.service.postData("/course/program/" + this.program.programId, data).subscribe((res: any) => {
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

