import { Component, Inject, OnInit } from '@angular/core';
import { SelectProgramByDepartmentIdComponent } from 'src/app/common/select-program-by-department-id/select-program-by-department-id.component';

import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/service.service';
import { SelectCertificationCourseByProgramIdComponent } from 'src/app/common/select-certification-course-by-program-id/select-certification-course-by-program-id.component';

@Component({
  selector: 'app-edit-diploma-and-other-courses',
  templateUrl: './edit-diploma-and-other-courses.component.html',
  styleUrls: ['./edit-diploma-and-other-courses.component.scss']
})
export class EditDiplomaAndOtherCoursesComponent implements OnInit {

  other_type : other_type[] = [
    {other_type: 'Diploma', },
    {other_type: 'Advanced Diploma', },
    {other_type: 'PG Diploma', },
    {other_type: 'Certificate course', },
    {other_type: 'Ad-on Course', },
    {other_type: 'Undergraduate', },
    {other_type: 'Postgraduate', }
  ]

  program: any = null;
  public programDetails: any = null;
  public diplomaLevel: any = null;

  public Form: FormGroup;
  public other : FormArray = this.fb.array([]);
  constructor(
    private fb: FormBuilder,
    public service: ServiceService,
    @Inject(MAT_DIALOG_DATA)
    public data : any,
    public dialogRef: MatDialogRef<EditDiplomaAndOtherCoursesComponent>,
    public dialog: MatDialog,
    public router: Router
  )
  {
    // this.userid = data.userid;
    this.Form = this.fb.group({
      other_type: this.fb.control('',Validators.required),
      name_of_prog: this.fb.control('',Validators.required),
      year: this.fb.control('',Validators.required),
      course_name:this.fb.control('',Validators.required),
      other:this.fb.array([]),
    })
   }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    console.log(this.data);
    this.Form.get("other_type").setValue(this.data.program.programType);
    this.Form.get("name_of_prog").setValue(this.data.program.programName);
    this.Form.get("course_name").setValue(this.data.diplomaName);
    this.diplomaLevel=this.data.diplomaLevel
    this.Form.get("year").setValue(this.data.year);

    this.program = this.data.program;

    this.service.getData("/program-detail/program/" + this.program.programId).subscribe((res: any) => {
      this.programDetails = res;
      console.log(res);
    })

    for (let i = 0; i<this.data.admittedStudents.length; i++) {
      
      this.other = this.Form.get('other') as FormArray;
      this.other.push(this.createother());
      this.other.at(i).get("userId").setValue(this.data?.admittedStudents[i]?.user?.userId);
      this.other.at(i).get("firstName").setValue(this.data?.admittedStudents[i]?.user?.firstName);
      this.other.at(i).get("middleName").setValue(this.data?.admittedStudents[i]?.user?.middleName);
      this.other.at(i).get("lastName").setValue(this.data?.admittedStudents[i]?.user?.lastName);
      this.other.at(i).get("class").setValue(this.data?.admittedStudents[i]?.programDetail?.programClass);
      this.other.at(i).get("category").setValue(this.data?.admittedStudents[i]?.user?.student?.category);
      this.other.at(i).get("email").setValue(this.data?.admittedStudents[i]?.user?.email);
      this.other.at(i).get("phone").setValue(this.data?.admittedStudents[i]?.user?.phone);
    }
  }

  get otherControl() {
    this.other = this.Form.get('other') as FormArray;
    return this.other.controls;
  }

  createother(): FormGroup {
    return this.fb.group({
      userId: this.fb.control(''),
      firstName: this.fb.control('',Validators.required),
      middleName: this.fb.control('',Validators.required),
      lastName: this.fb.control('',Validators.required),
      class: this.fb.control('',Validators.required),
      category: this.fb.control('',Validators.required),
      email: this.fb.control('',Validators.required),
      phone: this.fb.control('',Validators.required),
    });
  }

  addother(): void {
    this.other = this.Form.get('other') as FormArray;
    this.other.push(this.createother());
  }

  removeother(i: number) {
    this.other.removeAt(i);
  }

  submitForm(){

  // let data : any = {

  //   :this.Form.get("other_type")?.value,
  //   :this.Form.get("name_of_prog")?.value,
  //   :this.Form.get("year")?.value,

  // }

  let admittedStudentList: any[] = [];
  for(let i = 0; i<this.other.length; i++) {
    admittedStudentList.push({
      studentClass: this.other.at(i).get("class")?.value,
      user: {
        userId: this.other.at(i).get("userId")?.value,
        firstName: this.other.at(i).get("firstName")?.value,
        middleName: this.other.at(i).get("middleName")?.value,
        lastName: this.other.at(i).get("lastName")?.value,
        email: this.other.at(i).get("email")?.value,
        phone: this.other.at(i).get("phone")?.value,
        password: "123456",
        student: {
          category: this.other.at(i).get("category")?.value,
        }
      }
    });
  }

  let data = {
    id: this.data.id,
    year: this.Form.get("year")?.value,
    diplomaName:this.Form.get("course_name").value,
    diplomaLevel:this.diplomaLevel,
    admittedStudents: admittedStudentList,
    program : {
      programId: this.program.programId
    }
  }

  // let userData: any[] = [];
  // for(let i = 0; i<this.other.length; i++) {
  //   userData.push({
  //     firstName: this.other.at(i).get("firstName")?.value,
  //     middleName: this.other.at(i).get("middleName")?.value,
  //     lastName: this.other.at(i).get("lastName")?.value,
  //     email: this.other.at(i).get("email")?.value,
  //     phone: this.other.at(i).get("phone")?.value,
  //     password: "123456",
  //     student: {
  //       studentClass: this.other.at(i).get("class")?.value,
  //       category: this.other.at(i).get("category")?.value,
  //     }
  //   })
  // }

  this.service.getUserWithUserId().subscribe((user: any) => {

    this.service.putData("/diploma-program", data).subscribe((res: any) => {
      console.log(res);

    }, (err: any) => {
      alert("Error try again later!!");
    }, () => {
    this.dialogRef.close();
    });

  }, (err: any) => {
    alert("User authentication expired!!. Login again to continue.");
    this.router.navigateByUrl("");
  });
}

  getProgram() {

    this.service.getUserWithUserId().subscribe((user: any) => {
      console.log(user.hod)
      const programDialogRef = this.dialog.open(SelectProgramByDepartmentIdComponent ,{width: "80%",height: "86vh",panelClass: 'full-width-dialog', data: {departmentId : user.hod.department.id}});
    programDialogRef.afterClosed().subscribe((result: any) => {
      console.log(result);
      if(result != undefined) {
        this.program = result;
        this.Form.get("name_of_prog").setValue(result.programName);
        this.Form.get("other_type").setValue(result.programLevel);
        // this.Form.get("year").setValue(result.startYear);
        
        this.service.getData("/program-detail/program/" + result.programId).subscribe((res: any) => {
          this.programDetails = res;
          console.log(res);
        })
      }
    })
    });
  }
  //Certificate course
getCertificate() {

  this.service.getUserWithUserId().subscribe((user: any) => {
    console.log(user.hod)
    const programDialogRef = this.dialog.open(SelectCertificationCourseByProgramIdComponent ,{width: "80%",height: "86vh",panelClass: 'full-width-dialog', data: {programId : this.program.programId}});
  programDialogRef.afterClosed().subscribe((result: any) => {
    console.log(result);
    if(result != undefined) {
      // this.program = result;
      this.Form.get("course_name").setValue(result.name);
      this.diplomaLevel=result.level
    //  this.Form.get("courseLevel").setValue(result.diplomaLevel);
     // this.Form.get("other_type").setValue(result.programLevel);
      // this.Form.get("year").setValue(result.startYear);
      
      // this.service.getData("/program-detail/program/" + result.programId).subscribe((res: any) => {
      //   this.programDetails = res;
      //   console.log(res);
      // })
    }
  })
  });

  
}
}

interface other_type {
  other_type: String;
 }