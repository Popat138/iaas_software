import { Component, OnInit, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SelectCertificationCourseByProgramIdComponent } from 'src/app/common/select-certification-course-by-program-id/select-certification-course-by-program-id.component';
import { SelectCourseByProgramIdComponent } from 'src/app/common/select-course-by-program-id/select-course-by-program-id.component';
import { ServiceService } from 'src/app/service.service';
import { Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';
@Component({
  selector: 'app-edit-teaching-details',
  templateUrl: './edit-teaching-details.component.html',
  styleUrls: ['./edit-teaching-details.component.scss']
})
export class EditTeachingDetailsComponent implements OnInit {
  ugProgramList: any = null;
  pgProgramList: any = null;
  certificationList:any = null;
  divisions: any = null;
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
    @Inject(MAT_DIALOG_DATA) 
    public data : any,
    public dialogRef: MatDialogRef<EditTeachingDetailsComponent>,
    public dialog: MatDialog,
    public router: Router
  ) {
    this.teacher = data;
      this.Form = this.fb.group({
      id:this.fb.control(''),
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
   {c_type: 'Sessional', },
 
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
    program:this.fb.control('',Validators.required),
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
   program:this.fb.control('',Validators.required),
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
    this.fetchData();
    this.getData();
   
  }
  getData()
  {console.log("DATA",this.data);
  this.Form.get("academic_year").setValue(this.data?.academicYear);
  this.teacher=this.data;
  console.log("UG",this.data.ugCourses[0]?.course.program.programName);
  console.log("KIND",this.data.user);
  // this.fetchData();
  this.ug = this.Form.get('ug') as FormArray;

  this.data.ugCourses.forEach((element,i) => {
    console.log("ug",element.course)
    // this.ug.at(i).get("progam").setValue(element.course.program.programName);
    this.ug.push(
      
      this.fb.group({
        id:this.fb.control(element.id),
        ug_year:this.fb.control(element.year,Validators.required),
        ug_semester:this.fb.control(element.semester,Validators.required),
        // program:this.Form.get("program").setValue(element.course.program.programName),
        program:this.fb.control(element.course.program.programId,Validators.required),
        course: this.fb.control(element.course.courseId,Validators.required),
        c_code:this.fb.control(element.course.code,Validators.required),
        c_name:this.fb.control(element.course.name,Validators.required),
        c_type:this.fb.control(element.courseType,Validators.required),
       

      })
    );
    // this.ug.at(i).get("progam").setValue(element.course.program.programName);
  });
  this.pg = this.Form.get('pg') as FormArray;
this.data.pgCourses.forEach(element=>
  {
  this.pg.push(
 this.fb.group({
  id:this.fb.control(element.id),
  pg_year:this.fb.control(element.year,Validators.required),
  pg_semester:this.fb.control(element.semester,Validators.required),
  program:this.fb.control(element.course.program.programId,Validators.required),
  course: this.fb.control(element.course.courseId,Validators.required),
  c_code:this.fb.control(element.course.code,Validators.required),
  c_name:this.fb.control(element.course.name,Validators.required),
  c_type:this.fb.control(element.courseType,Validators.required),


 })

  );


  }
  
  )



}
  fetchData() {
    this.service.getData("/program/programLevel/Undergraduate/department/" + this.data.teacher.department.id).subscribe((res : any) => {
      this.ugProgramList = res;
      console.log("UGPROGRAM",this.ugProgramList);
    }, (err: any) => {
      console.log(err);
    });
    this.service.getData("/program/programLevel/Postgraduate/department/" + this.data.teacher.department.id).subscribe((res : any) => {
      this.pgProgramList = res;
      console.log(this.pgProgramList);
    }, (err: any) => {
      console.log(err);
    });
    this.service.getData("/program/certificationProgram/department/" + this.data.teacher.department.id).subscribe((res : any) => {
      this.certificationList = res;
      console.log(this.certificationList);
    }, (err: any) => {
      console.log(err);
    });
   }
  
   onUGProgramChange(event : any) {
  
  }
  
   onPGProgramChange(event : any) {
  
   }
  
   submitForm(){
  
    //  let ext =  this.uploads?.name.split('.').pop();
    //  let filename: any = null;
    //  if(this.uploads != undefined && this.uploads != null ) {
    //    filename = uuidv4() + "." + ext
    //    this.fileUpload.append("files", this.uploads, filename)
    //  } else {
    //    console.log(`Document not provided.`);
    //  }
  
    let ugCourseList: any[] =[];
    let pgCourseList: any[] =[];
    let otherCourseList: any[] =[];
    for (let i = 0 ; i< this.ug.length; i++) {
      console.log("sasas",this.ug.at(i).get("course").value)
      ugCourseList.push({
        id:this.ug.at(i).get('id').value,
        courseType :this.ug.at(i).get('c_type').value,
        year :this.ug.at(i).get('ug_year').value,
        semester :this.ug.at(i).get('ug_semester').value,
        course: {
          yoi:this.ug.at(i).get("course").value.yoi,
          name:this.ug.at(i).get("c_name").value,
          code:this.ug.at(i).get("c_code").value,
          courseId: this.ug.at(i).get("course").value,
          program: {
            programId: this.ug.at(i).get("program").value
          }
        }
      });
    }
    console.log("ugCourseList",ugCourseList)
    
    for (let i = 0 ; i< this.pg.length; i++) {
      pgCourseList.push({
        id:this.pg.at(i).get('id').value,
        year :this.pg.at(i).get('pg_year').value,
        semester :this.pg.at(i).get('pg_semester').value,
        courseType :this.pg.at(i).get('c_type').value,
        course: {
          electiveType:this.pg.at(i).get("course").value.electiveType,
          yoi:this.pg.at(i).get("course").value.yoi,
          name:this.pg.at(i).get("c_name").value,
          code:this.pg.at(i).get("c_code").value,
          courseId: this.pg.at(i).get("course").value,
          program: {
            programId: this.pg.at(i).get("program").value
          }
        }
      });
    }
    
    for (let i = 0 ; i< this.other.length; i++) {
      otherCourseList.push({
        id:this.other.at(i).get('id').value,
        year :this.other.at(i).get('other_year').value,
        courseType :this.other.at(i).get('c_type').value,
        certificateCourse: {
          courseId: this.other.at(i).get("course").value
        }
      });
    }
    
     let data = {
      id:this.data.id,
       academicYear: this.Form.get("academic_year").value,
       ugCourses: ugCourseList,
       pgCourses: pgCourseList,
       otherCourses: otherCourseList,
       teacher:this.data.teacher,
       user:this.data.user,
       department:this.data.teacher.department,
       teacherId:this.data.teacher.teacherId,
       userId:this.data.user.userId
     };
    
    console.log("Final",data);
    //  this.service.getUserWithUserId().subscribe((user: any) => {
      // console.log("USER",user)
       this.service.putData(`/teaching-detail`, data).subscribe((res2: any) => {
        console.log("Submitted",res2);
        this.dialogRef.close();
       }, (err2 : any) => {
         console.log(err2);
         this.dialogRef.close();
         alert("Error try again later!!");
        //  this.dialogref.close();
       });
    //  }, (err: any) => {
    //    console.warn(err);
    //  });
   }
  
   // close() {
   //   this.dialogref.close();
   // }
  
   upload(event: any){
     this.uploads = event.target.files[0];
   }
  
   getUGCourses(i: number) {
    console.log("PROGRAM ID",this.ug.at(i).get("program"))   
    const courseDialogRef = this.dialog.open(SelectCourseByProgramIdComponent ,{width: "80%",height: "86vh",panelClass: 'full-width-dialog', data: {programId : this.ug.at(i).get("program").value}});
      courseDialogRef.afterClosed().subscribe((result: any) => {
        this.ug.at(i).get("c_code").setValue(result.code);
        this.ug.at(i).get("c_name").setValue(result.name);
        this.ug.at(i).get("course").setValue(result);
        this.ug.at(i).get("ug_year").setValue(result.year);
    this.ug.at(i).get("ug_semester").setValue(result.semester);
      })
   }
  
   getPGCourses(i: number) {
    const courseDialogRef = this.dialog.open(SelectCourseByProgramIdComponent ,{width: "80%",height: "86vh",panelClass: 'full-width-dialog', data: {programId : this.pg.at(i).get("program").value}});
    courseDialogRef.afterClosed().subscribe((result: any) => {
      this.pg.at(i).get("c_code").setValue(result.code);
      this.pg.at(i).get("c_name").setValue(result.name);
      this.pg.at(i).get("course").setValue(result);
      this.pg.at(i).get("pg_year").setValue(result.year);
      this.pg.at(i).get("pg_semester").setValue(result.semester);
    })
  }
  
  getOtherCourses(i: number) {
   const courseDialogRef = this.dialog.open(SelectCertificationCourseByProgramIdComponent ,{width: "80%",height: "86vh",panelClass: 'full-width-dialog', data: {programId : this.other.at(i).get("program").value.programId}});
   courseDialogRef.afterClosed().subscribe((result: any) => {
     
    console.log(result);
    //  this.pg.at(i).get("c_code").setValue(result.code);
     this.other.at(i).get("c_name").setValue(result.name);
     this.other.at(i).get("course").setValue(result);
   })
  }
  
  classChanges(event: any) {
    // console.log(event.value);
  
    if(event.value != "" && event.value != null && event.value != undefined) {
      this.divisions = event.value.divisions;
    }
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
  