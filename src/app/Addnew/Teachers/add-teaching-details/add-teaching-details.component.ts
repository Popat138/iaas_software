import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SelectCertificationCourseByProgramIdComponent } from 'src/app/common/select-certification-course-by-program-id/select-certification-course-by-program-id.component';
import { SelectCourseByProgramIdComponent } from 'src/app/common/select-course-by-program-id/select-course-by-program-id.component';
import { ServiceService } from 'src/app/service.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-add-teaching-details',
  templateUrl: './add-teaching-details.component.html',
  styleUrls: ['./add-teaching-details.component.scss']
})
export class AddTeachingDetailsComponent implements OnInit {

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
    @Inject(MAT_DIALOG_DATA) public data : any,
    public dialogref: MatDialogRef<AddTeachingDetailsComponent>,
    public dialog: MatDialog
    ) {
      this.teacher = data;
      this.Form = this.fb.group({

      academic_year:this.fb.control('',Validators.required),
      ug:this.fb.array([this.createug()]),
      pg:this.fb.array([this.createpg()]),
      other:this.fb.array([this.createother()]),

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
   this.fetchData();
 }

 fetchData() {
  this.service.getData("/program/programLevel/Undergraduate/department/" + this.teacher.department.id).subscribe((res : any) => {
    this.ugProgramList = res;
    console.log(this.ugProgramList);
  }, (err: any) => {
    console.log(err);
  });
  this.service.getData("/program/programLevel/Postgraduate/department/" + this.teacher.department.id).subscribe((res : any) => {
    this.pgProgramList = res;
    console.log(this.pgProgramList);
  }, (err: any) => {
    console.log(err);
  });
  this.service.getData("/program/certificationProgram/department/" + this.teacher.department.id).subscribe((res : any) => {
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
    ugCourseList.push({
      year :this.ug.at(i).get('ug_year').value,
      semester :this.ug.at(i).get('ug_semester').value,
      courseType :this.ug.at(i).get('c_type').value,
      course: {
        courseId: this.ug.at(i).get("course").value.courseId
      }
    });
  }

  
  for (let i = 0 ; i< this.pg.length; i++) {
    pgCourseList.push({
      year :this.pg.at(i).get('pg_year').value,
      semester :this.pg.at(i).get('pg_semester').value,
      courseType :this.pg.at(i).get('c_type').value,
      course: {
        courseId: this.pg.at(i).get("course").value.courseId
      }
    });
  }
  
  for (let i = 0 ; i< this.other.length; i++) {
    otherCourseList.push({
      year :this.other.at(i).get('other_year').value,
      courseType :this.other.at(i).get('c_type').value,
      certificateCourse: {
        courseId: this.other.at(i).get("course").value.courseId
      }
    });
  }

   let data = {

     academicYear: this.Form.get("academic_year").value,
     ugCourses: ugCourseList,
     pgCourses: pgCourseList,
     otherCourses: otherCourseList
   };

   this.service.getUserWithUserId().subscribe((user: any) => {
     this.service.postData("/teaching-detail/teacher/" + user.teacher.teacherId , data).subscribe((res2: any) => {
      console.log("Submitted",res2);
       if(this.fileUpload.getAll("files").length > 0){
         this.service.postData("/upload", this.fileUpload).subscribe(res2 => {

         });
       }
       this.dialogref.close();
     }, (err2 : any) => {
       console.log(err2);
       alert("Error try again later!!");
      //  this.dialogref.close();
     });
   }, (err: any) => {
     console.warn(err);
   });
 }

 // close() {
 //   this.dialogref.close();
 // }

 upload(event: any){
   this.uploads = event.target.files[0];
 }

 getUGCourses(i: number) {
  const courseDialogRef = this.dialog.open(SelectCourseByProgramIdComponent ,{width: "80%",height: "86vh",panelClass: 'full-width-dialog', data: {programId : this.ug.at(i).get("program").value.programId}});
    courseDialogRef.afterClosed().subscribe((result: any) => {
      this.ug.at(i).get("c_code").setValue(result.code);
      this.ug.at(i).get("c_name").setValue(result.name);
      this.ug.at(i).get("course").setValue(result);
      this.ug.at(i).get("ug_year").setValue(result.year);
    this.ug.at(i).get("ug_semester").setValue(result.semester);
    })
 }

 getPGCourses(i: number) {
  const courseDialogRef = this.dialog.open(SelectCourseByProgramIdComponent ,{width: "80%",height: "86vh",panelClass: 'full-width-dialog', data: {programId : this.pg.at(i).get("program").value.programId}});
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
