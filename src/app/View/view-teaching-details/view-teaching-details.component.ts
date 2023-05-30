import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder,FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/service.service';

@Component({
  selector: 'app-view-teaching-details',
  templateUrl: './view-teaching-details.component.html',
  styleUrls: ['./view-teaching-details.component.scss']
})
export class ViewTeachingDetailsComponent implements OnInit {
  ugProgramList: any = null;
  pgProgramList: any = null;
  certificationList:any = null;

  fileUpload = new FormData();
  teacher : any = null;
  uploads:any = null;
  doc:any=null;
  public ug : FormArray = this.fb.array([]);
  public pg : FormArray = this.fb.array([]);
  public other : FormArray = this.fb.array([]);
  public Form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public service: ServiceService,
    @Inject(MAT_DIALOG_DATA) public data : any,
    public dialogref: MatDialogRef<ViewTeachingDetailsComponent>,
    public router: Router
  ) { 
    this.teacher = data;
      this.Form = this.fb.group({

      academic_year:this.fb.control('',Validators.required),
      ug:this.fb.array([]),
      pg:this.fb.array([]),
      other:this.fb.array([]),
    })

  }
  docUpload(event: any){
    this.doc = event.target.files[0];
  }
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
 
 pg_year : PgYear[] = [
 
   {pg_year: 'I', },
   {pg_year: 'II', },
   {pg_year: 'III', },
 
 ]
 
 other_year : other_year[] = [
 
   {other_year: 'Diploma', },
   {other_year: 'Advanced Diploma', },
   {other_year: 'PG Diploma', },
   {other_year: 'Certificate', },
   {other_year: 'Ad-on Course', }
 
 ]
 
 pg_semester : pg_semester[] = [
 
   {pg_semester: 'I', },
   {pg_semester: 'II', },
   {pg_semester: 'III', },
   {pg_semester: 'IV', },
   {pg_semester: 'V', },
   {pg_semester: 'VI', },
 
 ]
 
 c_type : course_type[] = [
 
   {c_type: 'Theory', },
   {c_type: 'Practical', },
   {c_type: 'Project work', },
 
 ]
 ////////////////////////////////////////////////////
 
    get ugControl() {
    this.ug = this.Form.get('ug') as FormArray;
    return this.ug.controls;
  }
 
  createug(): FormGroup {
    return this.fb.group({

    //  academic_year:this.fb.control('',Validators.required),
    ug_year:this.fb.control(''),
    ug_semester:this.fb.control(''),
    program:this.fb.control(''),
    course: this.fb.control(''),
    c_code:this.fb.control(''),
    c_name:this.fb.control(''),
    c_type:this.fb.control(''),
 
    });
  }
 
  addug(): void {
    this.ug = this.Form.get('ug') as FormArray;
    this.ug.push(this.createug());
  }
 
  removeug(i: number) {
    this.ug.removeAt(i);
 
  }
 
 //////////////////////////////////////////////////////////////////
 
 
 
 get pgControl() {
   this.pg = this.Form.get('pg') as FormArray;
   return this.pg.controls;
 }
 
 createpg(): FormGroup {
   return this.fb.group({
 
   //  academic_year:this.fb.control('',Validators.required),
   pg_year:this.fb.control(''),
   pg_semester:this.fb.control(''),
   program:this.fb.control(''),
   course: this.fb.control(''),
   c_code:this.fb.control(''),
   c_name:this.fb.control(''),
   c_type:this.fb.control(''),
 
   });
 }
 
 addpg(): void {
   this.pg = this.Form.get('pg') as FormArray;
   this.pg.push(this.createpg());
 }
 
 removepg(i: number) {
   this.pg.removeAt(i);
 
 }
 
 //////////////////////////////////////////////////////////////////
 
 get otherControl() {
   this.other = this.Form.get('other') as FormArray;
   return this.other.controls;
 }
 
 createother(): FormGroup {
   return this.fb.group({
 
   //  academic_year:this.fb.control('',Validators.required),
   other_year:this.fb.control(''),
   // semester:this.fb.control('',Validators.required),
   program:this.fb.control('',Validators.required),
   // c_code:this.fb.control('',Validators.required),
   course: this.fb.control(''),
   c_name:this.fb.control(''),
   c_type:this.fb.control(''),
 
   });
 }
 
 addother(): void {
   this.other = this.Form.get('other') as FormArray;
   this.other.push(this.createother());
 }
 
 removeother(i: number) {
   this.other.removeAt(i);
 
 }
 

  ngOnInit(): void {
    this.getData();
      }

  getData(){
    console.log("Dataaa",this.data)
    this.Form.get("academic_year").setValue(this.data.academicYear);
    
    
   this.data.ugCourses.forEach((element : any, index: any) => {
      this.ug = this.Form.get('ug') as FormArray;
      this.ug.push(
        this.fb.group({
         ug_year:this.fb.control(element.course.year,Validators.required),
         ug_semester:this.fb.control(element.semester,Validators.required),
         course:this.fb.control(element.course.name,Validators.required),
         program:this.fb.control(element.course.program.programName,Validators.required),
         c_type:this.fb.control(element.courseType,Validators.required),
        })
      );

    })

    this.data.pgCourses.forEach((element : any, index: any) => {
      this.pg = this.Form.get('pg') as FormArray;
      this.pg.push(
        this.fb.group({
         pg_year:this.fb.control(element.year,Validators.required),
         pg_semester:this.fb.control(element.semester,Validators.required),
         course:this.fb.control(element.course.name,Validators.required),
         program:this.fb.control(element.course.program.programName,Validators.required),
         c_type:this.fb.control(element.courseType,Validators.required),
        })
      );

    })
    // this.Form.get("semester").setValue(this.data.academicDetail.course.semester);
    // this.Form.get("class").setValue(this.data.academicDetail?.streamDetail.streamClass);
    // this.Form.get("div").setValue(this.data.academicDetail.division.divisionName);
    // this.Form.get("program").setValue(this.data.academicDetail.course.program.programName);
    // this.Form.get("c_code").setValue(this.data.academicDetail.course.code);
    // this.Form.get("c_name").setValue(this.data.academicDetail.course.name);
  }




}

interface Year {
  year: String;
 }
 
 interface UgYear {
   ug_year: String;
 }
 
 interface PgYear {
   pg_year: String;
 }
 
 interface other_year{
   other_year: String
 }
 
 interface course_type {
   c_type: String;
 }
 
 interface ug_semester {
   ug_semester:String
 }
 
 interface pg_semester {
   pg_semester:String
 }
 