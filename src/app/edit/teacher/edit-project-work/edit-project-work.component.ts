import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SelectCourseByProgramIdComponent } from 'src/app/common/select-course-by-program-id/select-course-by-program-id.component';
import { SelectProgramByDepartmentIdComponent } from 'src/app/common/select-program-by-department-id/select-program-by-department-id.component';
import { SelectStudentByDivisionComponent } from 'src/app/common/select-student-by-division/select-student-by-division.component';
import { ServiceService } from 'src/app/service.service';
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-project-work',
  templateUrl: './edit-project-work.component.html',
  styleUrls: ['./edit-project-work.component.scss']
})
export class EditProjectWorkComponent implements OnInit {

  user: any[] = [];
  fileUpload = new FormData();
  course: any = null;
  uploads:any[] = [];
 projectList:any[]=[];
  program: any = null;
  divisions: any = null;
  fileName: any[] = [];
  toggle:any[]=[];
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
    public dialogRef: MatDialogRef<EditProjectWorkComponent>,
    public dialog: MatDialog,
    public router: Router,
    private http: HttpClient,
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
      // month: this.fb.control('',Validators.required),
      other:this.fb.array([]),
    })
   }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    console.log(this.data);
    this.service.getData("/stream-detail/stream/" + this.data.academicDetail.streamDetail.stream.id).subscribe((res: any) => {
      this.programDetails = res;
      console.log("ProjectDetails",this.data.academicDetail?.academicYear);
      this.program = this.data.academicDetail.course.program;
      this.course = this.data.academicDetail.course;
      this.divisions = this.data.academicDetail.streamDetail.divisions;
      // this.service.getData("/stream-detail/stream/" + this.data.academicDetail.division.id).subscribe((streamDetail: any) => {
      //   console.log("projectdata",streamDetail);
      //   this.divisions = streamDetail.divisions;
        this.Form.get("academic_year").setValue(this.data.academicDetail?.academicYear);
        this.Form.get("year").setValue(this.data.academicDetail?.course?.year);
        this.Form.get("semester").setValue(this.data.academicDetail?.course?.semester);
        this.Form.get("class").setValue(this.data.academicDetail?.streamDetail.streamClass);
        this.Form.get("div").setValue(this.data.academicDetail?.division?.id);
        this.Form.get("program").setValue(this.data.academicDetail?.course?.program?.programName);
        this.Form.get("c_code").setValue(this.data.academicDetail?.course?.code);
        this.Form.get("c_name").setValue(this.data.academicDetail?.course?.name);
              
        this.service.getData("/student-project/project-work/"+this.data.id).subscribe((studentProjects: any) => {
          studentProjects.forEach((element, index) => {
            this.other.push(
              this.fb.group({
                studentDataId: this.fb.control(element.id),
                roll_no: this.fb.control(element.user.student.rollNo,Validators.required),
                name_of_students: this.fb.control(element.user.firstName + " " + element.user.middleName + " " + element.user.lastName,Validators.required),
                title_of_project: this.fb.control(element.projectTitle,Validators.required)
              })
            );

            this.user.push(element.user);
            this.http.get(`${this.service.BASE_URL}/resources/uploads/${element.certificate}`,{responseType: 'blob'}).subscribe(data => {
              this.uploads[index] = data;
              this.uploads[index].name = element.certificate;
              this.fileName[index]=this.uploads[index].name!=null?'Document exists':"";
              this.toggle[index]=this.uploads[index].name!=null?(this.toggle[index]):!this.toggle[index];
          });
          this.projectList.push(
            element
          );

          });
        });
      });
      console.log("PROJECT",this.projectList)
    // })
  }

  get otherControl() {
    this.other = this.Form.get('other') as FormArray;
      return this.other.controls;
  }

  createother(): FormGroup {
    this.user.push({});
    return this.fb.group({
     studentDataId: this.fb.control(''),
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
    console.log("LENGTH1",this.other.length);
    this.projectList.splice(i, 1);
    this.other.removeAt(i);
   

  }
 
  removeStudemts(i:number){
    this.user = this.projectList[i];
    console.log("USER",this.projectList[i].user.student.rollNo)
    this.other.at(i).get("roll_no").setValue(this.projectList[i].user.student.rollNo);
    console.log("NAME",this.projectList[i].user.firstName + " " + this.projectList[i].user.middleName + " " + this.projectList[i].user.lastName)
    this.other.at(i).get("name_of_students").setValue(this.projectList[i].user.firstName + " " + this.projectList[i].user.middleName + " " + this.projectList[i].user.lastName);
    console.log("USER ID",this.projectList[i].user.userId);
    console.log("LENGTH2",this.projectList[i].id)

    this.service.deleteData('/student-project/'+this.projectList[i].id).subscribe(response => {
      location.reload();
  },err => {
    // console.log(err);
    if(err.status == 409){
      Swal.fire({
        title: "Supplier cannot be deleted",
        text: "Stock In entry has been made against this supplier",
        icon: 'warning'
      });
    }
  });
    this.removeother(i)
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
      id: this.other.at(i).get("studentDataId").value,
      user: {
        userId: this.projectList[i].user.userId
      },
      projectTitle: this.other.at(i).get("title_of_project").value,
      certificate: filename,
      projectWork: {
        id: this.data.id
      }
    });

  }
 console.log("STUDENT", studentData)
  let data : any = {
    id: this.data.id,
    academicDetail: {
      academicYear: this.Form.get("academic_year").value,
      course: {
        courseId: this.course.courseId
      },
      division: {
        id: this.Form.get("div").value
      },
      streamDetail:{
        id:this.data.academicDetail.streamDetail.id
      }
    },
    user: {
      userId: localStorage.getItem("userId")
    }
  }

  this.service.putData(`/project-work`, data).subscribe((res: any) => {
      console.log("Added project",res);
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

getStudents(i : number) {
  const courseDialogRef = this.dialog.open(SelectStudentByDivisionComponent ,{width: "80%",height: "86vh",panelClass: 'full-width-dialog', data: {divisionId : this.Form.get("div").value, academicYear: this.Form.get("academic_year").value}});
  courseDialogRef.afterClosed().subscribe((result: any) => {
    console.log(result);
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
      console.log(result);
      this.Form.get("program").setValue(result.programName);
      this.service.getData("/program-detail/program/" + result.programId).subscribe((res: any) => {
        this.programDetails = res;
        console.log(res);
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