import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SelectCourseByProgramIdComponent } from 'src/app/common/select-course-by-program-id/select-course-by-program-id.component';
import { SelectProgramByDepartmentIdComponent } from 'src/app/common/select-program-by-department-id/select-program-by-department-id.component';
import { SelectStudentByDivisionComponent } from 'src/app/common/select-student-by-division/select-student-by-division.component';
import { ServiceService } from 'src/app/service.service';
import { v4 as uuidv4 } from 'uuid';
import { StudentForProjectComponent } from 'src/app/common/student-for-project/student-for-project.component';

@Component({
  selector: 'app-add-project-work',
  templateUrl: './add-project-work.component.html',
  styleUrls: ['./add-project-work.component.scss']
})
export class AddProjectWorkComponent implements OnInit {

  user: any[] = [];
  fileUpload = new FormData();
  course: any = null;
  uploads:any[] = [];
 projectList:any[]=[];
  program: any = null;
  divisions: any = null;
  fileName: any[] = [];
  toggle:any[]=[];
  types: any =[
    "Project Work",
    "Field Work",
    "Field Visit"
  ];
  public programDetails: any = null;

  year: any[] = [
    {year: '2018-2019', },
    {year: '2019-2020', },
    {year: '2020-2021', },
    {year: '2021-2022', },
  ];

  // report:any=null;
  public Form: FormGroup;
  public other : FormArray = this.fb.array([]);
  constructor(
    private fb: FormBuilder,
    public service: ServiceService,
    @Inject(MAT_DIALOG_DATA)
    public data : any,
    public dialogRef: MatDialogRef<AddProjectWorkComponent>,
    public dialog: MatDialog,
    public router: Router
  )
  {

    this.Form = this.fb.group({
      academic_year: this.fb.control('',Validators.required),
      year: this.fb.control('',Validators.required),
      semester: this.fb.control('',Validators.required),
      class: this.fb.control('',Validators.required),
      div: this.fb.control('',Validators.required),
      program: this.fb.control('',Validators.required),
      c_code: this.fb.control('',Validators.required),
      c_name: this.fb.control('',Validators.required),
      type: this.fb.control('',Validators.required),
       // month: this.fb.control('',Validators.required),
      other:this.fb.array([this.createother()]),
    })
   }

  ngOnInit(): void {}

  get otherControl() {
    this.other = this.Form.get('other') as FormArray;
    return this.other.controls;
  }

  createother(): FormGroup {
    this.user.push({});
    return this.fb.group({
    roll_no: this.fb.control('',Validators.required),
    name_of_students: this.fb.control('',Validators.required),
    title_of_project: this.fb.control('',Validators.required),


   // assignments: this.fb.control('',Validators.required),
   // mode_of_teaching: this.fb.control('',Validators.required),


  });
  }

  reportUpload(event: any, i: number){
    this.uploads[i] = event.target.files[0];
    this.fileName[i]=event.target.files[0].name;
    this.toggle[i] = !this.toggle[i];

  }

  addother(): void {
    this.user.push({});
    this.other = this.Form.get('other') as FormArray;
    this.other.push(this.createother());
  }

  removeother(i: number) {
    this.projectList.splice(i, 1);
    this.other.removeAt(i);
  }
 

  submitForm(){

    // let ext =  this.report?.name.split('.').pop();
    // let filename: any = null;
    // if(this.report != undefined && this.report != null ) {
    //   filename = uuidv4() + "." + ext;
    //   this.fileUpload.append("files", this.report, filename) ;
    // } else {
    //   console.log(`document not provided.`);
    // }

  let studentData: any[] = []
  for(let i = 0; i< this.other.length; i++) {

    let ext =  this.uploads[i]?.name.split('.').pop();
    let filename: any = null;
    if(this.uploads[i] != undefined && this.uploads[i] != null ) {
      filename = uuidv4() + "." + ext
      this.fileUpload.append("files", this.uploads[i], filename)
    } else {
      console.log(`At index ${i} document not provided.`);
    }

    studentData.push({
      user: {
        userId: this.projectList[i].user.userId
      },
      projectTitle: this.other.at(i).get("title_of_project").value,
      certificate: filename
    });

  }

  let data : any = {
    academicDetail : {
      academicYear: this.Form.get("academic_year").value,
    },
    type: this.Form.get("type").value
  }
  console.log("type",this.Form.get("type").value,data)
  this.service.postData(`/project-work/division/${this.Form.get("div").value.id}/streamDetail/${this.Form.get("class").value.id}/course/${this.course.courseId}/user/${localStorage.getItem("userId")}`, data).subscribe((res: any) => {
      console.log(res);
      this.service.postData(`/student-project/bulk/project-work/${res.id}`, studentData).subscribe((res: any) => {

        if(this.fileUpload.getAll("files").length > 0){
          this.service.postData("/upload", this.fileUpload).subscribe(res2 => {
            console.log(res2);
          });
        }
      }, (err: any) => {
      console.warn(err);
      })
    }, (err: any) => {
      console.warn(err);
    }, () => {
    this.dialogRef.close();
 })
}
///
getList()
{
  const courseDialogRef = this.dialog.open(StudentForProjectComponent ,{width: "80%",height: "86vh",panelClass: 'full-width-dialog', data: {divisionId : this.Form.get("div").value.id, academicYear: this.Form.get("academic_year").value,}});
  courseDialogRef.afterClosed().subscribe((result: any) => {
    console.log("STUDENTS Final RESULT",result);
    result.forEach((element, i) => {
      this.projectList.push({
        user: element,
       // streamClass: programDetail.programClass
      });
    });
  
    console.log("STUDENT",this.projectList)
    
    console.log("LENGTH",this.projectList.length)

    for(var i=0;i<this.projectList.length-1;i++){
            this.addother();
    //         this.user = this.projectList[i];
    // console.log("USER",this.projectList[i].user.student.rollNo)
    // this.other.at(i).get("roll_no").setValue(this.projectList[i].user.student.rollNo);
    // this.other.at(i).get("name_of_students").setValue(this.projectList[i].user.firstName + " " + this.projectList[i].user.middleName + " " + this.projectList[i].user.lastName);

        }

        for(var i=0;i<this.projectList.length;i++)
        {
          this.getnewStudent(i);
        }
    // this.user[i] = result;
    // this.other.at(i).get("roll_no").setValue(result.student.rollNo);
    // this.other.at(i).get("name_of_students").setValue(result.firstName + " " + result.middleName + " " + result.lastName);
  })
 

}


getnewStudent(i:number)
{
    this.user = this.projectList[i];
    console.log("USER",this.projectList[i].user.student.rollNo)
    this.other.at(i).get("roll_no").setValue(this.projectList[i].user.student.rollNo);
    this.other.at(i).get("name_of_students").setValue(this.projectList[i].user.firstName + " " + this.projectList[i].user.middleName + " " + this.projectList[i].user.lastName);
}

removeStudemts(i:number){
  this.user = this.projectList[i];
  console.log("USER",this.projectList[i].user.student.rollNo)
  this.other.at(i).get("roll_no").setValue(this.projectList[i].user.student.rollNo);
  this.other.at(i).get("name_of_students").setValue(this.projectList[i].user.firstName + " " + this.projectList[i].user.middleName + " " + this.projectList[i].user.lastName);
  this.removeother(i)
}
///


getStudents(i : number) {
  const courseDialogRef = this.dialog.open(StudentForProjectComponent ,{width: "80%",height: "86vh",panelClass: 'full-width-dialog', data: {divisionId : this.Form.get("div").value.id, academicYear: this.Form.get("academic_year").value,}});
  courseDialogRef.afterClosed().subscribe((result: any) => {
    console.log("STUDENTS RESULT",result);
    this.user[i] = result;
    this.other.at(i).get("roll_no").setValue(result.student.rollNo);
    this.other.at(i).get("name_of_students").setValue(result.firstName + " " + result.middleName + " " + result.lastName);
  })
}






getProgram() {
  this.service.getUserWithUserId().subscribe((user: any) => {
    console.log(user.teacher)
    const programDialogRef = this.dialog.open(SelectProgramByDepartmentIdComponent ,{width: "80%",height: "86vh",panelClass: 'full-width-dialog', data: {departmentId : user.teacher.department.id}});
    programDialogRef.afterClosed().subscribe((result: any) => {
      this.program = result;
      console.log("ROLL",result);
      this.Form.get("program").setValue(result.programName);
      this.service.getData("//stream-detail/stream//" + result.stream.id).subscribe((res: any) => {
        this.programDetails = res;
        console.log("RES",res);
      })
    })
  }, (err: any) => {
    alert("User authentication expired!!. Login again to continue.");
    this.router.navigateByUrl("");
  });
}

getCourses() {
  const courseDialogRef = this.dialog.open(SelectCourseByProgramIdComponent ,{width: "80%",height: "86vh",panelClass: 'full-width-dialog', data: {programId : this.program.programId}});
  courseDialogRef.afterClosed().subscribe((result: any) => {
    this.course = result;
    console.log(result);
    this.Form.get("c_code").setValue(result.code);
    this.Form.get("c_name").setValue(result.name);
    this.Form.get("year").setValue(result.year);
    this.Form.get("semester").setValue(result.semester);
  })
}

classChanges(event: any) {
  console.log(event.value);

  if(event.value != "" && event.value != null && event.value != undefined) {
    this.divisions = event.value.divisions;
  }
}

}

interface other_type {
  other_type: String;
 }


