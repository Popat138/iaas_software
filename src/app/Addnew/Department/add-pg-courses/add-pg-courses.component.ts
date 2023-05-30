import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/service.service';

@Component({
  selector: 'app-add-pg-courses',
  templateUrl: './add-pg-courses.component.html',
  styleUrls: ['./add-pg-courses.component.scss']
})
export class AddPgCoursesComponent implements OnInit {

  programs : any = null;
  program: any =null;
  year: Year[] = [
    {year: '2018-2019', },
    {year: '2019-2020', },
    {year: '2020-2021', },
    {year: '2021-2022', },
  ];

  pg_year : PgYear[] = [

    {pg_year: 'I', },
    {pg_year: 'II', },
    {pg_year: 'III', },

  ]


  pg_semester : pg_semester[] = [

    {pg_semester: 'I', },
    {pg_semester: 'II', },
    {pg_semester: 'III', },
    {pg_semester: 'IV', },
    {pg_semester: 'V', },
    {pg_semester: 'VI', },

  ]

  prog_type : prog_type[] = [

    {prog_type: 'Elective', },
    {prog_type: 'CBCS', },


  ]

  public Form: FormGroup;
  public pg : FormArray = this.fb.array([]);
  constructor(

    private fb: FormBuilder,
    public service: ServiceService,
    @Inject(MAT_DIALOG_DATA)
    public data : any,
    public dialogRef: MatDialogRef<AddPgCoursesComponent>,
    public router: Router

  ) {
    // this.userid = data.userid;
    this.Form = this.fb.group({
      pg:this.fb.array([this.createpg()]),

    })
   }

  ngOnInit(): void {
    this.getProgram();
  }

  get pgControl() {
    this.pg = this.Form.get('pg') as FormArray;
    return this.pg.controls;
  }

  createpg(): FormGroup {
    return this.fb.group({

    //  academic_year:this.fb.control('',Validators.required),

    pg_prog_name: this.fb.control('',Validators.required),
    code: this.fb.control('',Validators.required),
    pg_year: this.fb.control('',Validators.required),
    pg_semester: this.fb.control('',Validators.required),
    c_code: this.fb.control('',Validators.required),
    c_name: this.fb.control('',Validators.required),
    year_of_intro: this.fb.control('',Validators.required),
    prog_type: this.fb.control('',Validators.required),

    });
  }

  addpg(): void {
    this.pg = this.Form.get('pg') as FormArray;
    this.pg.push(this.createpg());
  }

  removepg(i: number) {
    this.pg.removeAt(i);

  }


  getProgram() {
    this.service.getUserWithUserId().subscribe((user: any) => {
      this.service.getData("/program/programLevel/Postgraduate/department/" + user.hod.department.id).subscribe((res: any) => {
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



    name : this.pg.at(0).get("c_name").value,
    year: this.pg.at(0).get("pg_year").value,
    semester:this.pg.at(0).get("pg_semester").value,
    code:this.pg.at(0).get("c_code").value,
    yoi:this.pg.at(0).get("year_of_intro").value,
    electiveType:this.pg.at(0).get("prog_type").value,

  }

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

interface PgYear {
  pg_year: String;
}
interface pg_semester {
 pg_semester:String
}

interface prog_type {
  prog_type: String;
 }

