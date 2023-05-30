import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SelectStudentByDepartmentIdComponent } from 'src/app/common/select-student-by-department-id/select-student-by-department-id.component';
import { SelectStudentByProgramIdComponent } from 'src/app/common/select-student-by-program-id/select-student-by-program-id.component';
import { SelectProgramByDepartmentIdComponent } from 'src/app/common/select-program-by-department-id/select-program-by-department-id.component';
import { SelectUserByDepartmentIdComponent } from 'src/app/common/select-user-by-department-id/select-user-by-department-id.component';
import { ServiceService } from 'src/app/service.service';
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-edit-internship',
  templateUrl: './edit-internship.component.html',
  styleUrls: ['./edit-internship.component.scss']
})
export class EditInternshipComponent implements OnInit {

  user:any  = null;
  program:any=null;
  fileUpload = new FormData();
  uploads:any = null;
  fileName: string = "";
  toggle=true;
  public Form: FormGroup;
  constructor(

    private fb: FormBuilder,
    public service: ServiceService,
    @Inject(MAT_DIALOG_DATA)
    public rowdata : any,
    public dialogRef: MatDialogRef<EditInternshipComponent>,
    public dialog: MatDialog,
    public router: Router,
    private http: HttpClient,


  ) {
    // this.userid = data.userid;
    this.Form = this.fb.group({

      year: this.fb.control('',Validators.required),
      student_name:this.fb.control('',Validators.required),
      programme:this.fb.control('',Validators.required),
      job_title: this.fb.control('',Validators.required),
      detail_of_organization: this.fb.control('',Validators.required),
      // no_of_student_passed: this.fb.control('',Validators.required),

    //  academic_calander: this.fb.array([this.createacademic_calander()]),
      // meeting_details: this.fb.array([this.createmeeting_details()]),
      // report_activity: this.fb.array([this.createreport_activity()])
    })
   }

  ngOnInit(): void {
    this.getData();
  }
  
  getData() {
    console.log(this.rowdata);
    this.program = this.rowdata.program;
    this.user = this.rowdata.user;
    this.Form.get("year").setValue(this.rowdata.year);
    this.Form.get("student_name").setValue(this.rowdata.user.firstName +" "+this.rowdata.user.middleName+" "+this.rowdata.user.lastName);
    this.Form.get("job_title").setValue(this.rowdata.jobTitle);
    this.Form.get("detail_of_organization").setValue(this.rowdata.detailOfOrganization);
    this.Form.get("programme").setValue(this.rowdata.program.programName);
    this.http.get(`${this.service.BASE_URL}/resources/uploads/${this.rowdata.internshipLetter}`,{responseType: 'blob'}).subscribe(data => {
      this.uploads = data;
      this.uploads.name = this.rowdata.internshipLetter;
      this.fileName=this.uploads.name!=null?'Document exists':"";
      this.toggle=this.uploads.name!=null?(!this.toggle):this.toggle;
          });
  }

  upload(event: any){
    this.uploads = event.target.files[0];
    this.fileName=event.target.files[0].name;
    this.toggle = !this.toggle;
  }

  submitForm(){

    let photographExt =  this.uploads?.name.split('.').pop();
    let filename: any = null;
    if(this.uploads != undefined && this.uploads != null ) {
      filename = uuidv4() + "." + photographExt;
      this.fileUpload.append("files", this.uploads, filename) ;
    } else {
      console.log(`document not provided.`);
    }

  let data : any = {
    id: this.rowdata.id,
    year : this.Form.get("year")?.value,
    jobTitle : this.Form.get("job_title")?.value,
    detailOfOrganization : this.Form.get("detail_of_organization")?.value,
    internshipLetter: filename,
    program:{
      programId:this.program.programId
    },
    user: {
      userId: this.user.userId
    }
  }

  this.service.putData("/internship-detail", data).subscribe((res: any) => {
  console.log(res);
  if(this.fileUpload.getAll("files").length > 0){
    this.service.postData("/upload", this.fileUpload).subscribe(res2 => {
      console.log(res2);
    });
  }
  }, (err: any) => {
  console.warn("Error try again later!!");
  }, () => {
  this.dialogRef.close();
  })
  Swal.fire({
    title: 'Submitted Successfully?',
    text: "Congratulations!",
    icon: 'info',
    // showCancelButton: true,
    // confirmButtonColor: '#3085d6',
    // cancelButtonColor: '#d33',
    // confirmButtonText: 'Yes, delete it!'
  })

  }
//Get program Id
getProgram() {
  this.service.getUserWithUserId().subscribe((user: any) => {
    // console.log(user.teacher)
    const programDialogRef = this.dialog.open(SelectProgramByDepartmentIdComponent ,{width: "80%",height: "86vh",panelClass: 'full-width-dialog', data: {departmentId : user.hod.department.id}});
    programDialogRef.afterClosed().subscribe((result: any) => {
      this.program = result;
      // console.log(result);
      this.Form.get("programme").setValue(result.programName);
    })
  }, (err: any) => {
    alert("User authentication expired!!. Login again to continue.");
    this.router.navigateByUrl("");
  });
}


//End of program



  getStudent() {
    //this.service.getUserWithUserId().subscribe((user: any) => {
      // console.log(user.teacher)
      const programDialogRef = this.dialog.open(SelectStudentByProgramIdComponent ,{width: "80%",height: "86vh",panelClass: 'full-width-dialog', data: {programId : this.program.programId}});
      programDialogRef.afterClosed().subscribe((result: any) => {
        this.user = result;
        // console.log(result);
        this.Form.get("student_name").setValue(result.firstName + result.middleName + result.lastName);
      })
  //  }, (err: any) => {
 //     alert("User authentication expired!!. Login again to continue.");
  //    this.router.navigateByUrl("");
 //   });
  }

  }
