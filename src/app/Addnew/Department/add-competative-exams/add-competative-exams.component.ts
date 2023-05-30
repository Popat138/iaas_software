import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SelectStudentByDepartmentIdComponent } from 'src/app/common/select-student-by-department-id/select-student-by-department-id.component';
import { ServiceService } from 'src/app/service.service';
import { v4 as uuidv4 } from 'uuid';
import { SelectStudentByProgramIdComponent } from 'src/app/common/select-student-by-program-id/select-student-by-program-id.component';
import { SelectProgramByDepartmentIdComponent } from 'src/app/common/select-program-by-department-id/select-program-by-department-id.component';
import { SelectStudentByDivisionComponent } from 'src/app/common/select-student-by-division/select-student-by-division.component';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-competative-exams',
  templateUrl: './add-competative-exams.component.html',
  styleUrls: ['./add-competative-exams.component.scss']
})
export class AddCompetativeExamsComponent implements OnInit {

  exams: exams [] = [

    {exams: 'JAM', },
    {exams: 'CLAT', },
    {exams: 'GATE', },
    {exams: 'NET', },
    {exams: 'SLET/SET',},
    {exams: 'GMAT', },
    {exams: 'CAT', },
    {exams: 'GRE', },
    {exams: 'TOEFL', },
    {exams: 'Civil Services', },
    {exams: 'State government examinations',},
    {exams: 'Other',},
  ];



  user:any  = null;
  program: any = null;
  fileUpload = new FormData();
  uploads:any = null;
  divisions: any = null;
  department:any = null;
  toggle=true;
  fileName: string = "";
  public Form: FormGroup;
  public programDetails: any = null;
  year: any[] = [
    {year: '2018-2019', },
    {year: '2019-2020', },
    {year: '2020-2021', },
    {year: '2021-2022', },
  ];

  constructor(

    private fb: FormBuilder,
    public service: ServiceService,
    @Inject(MAT_DIALOG_DATA)
    public data : any,
    public dialogRef: MatDialogRef<AddCompetativeExamsComponent>,
    public dialog: MatDialog,
    public router: Router

  ) {
    console.log("data",data)
    this.department=data
    // this.userid = data.userid;
    this.Form = this.fb.group({
      class: this.fb.control('',Validators.required),
      div: this.fb.control('',Validators.required),
      program: this.fb.control('', Validators.required),
     year: this.fb.control('',Validators.required),
     reg_no: this.fb.control('',Validators.required),
      student_name:this.fb.control('',Validators.required),
      date:this.fb.control('',Validators.required),
      exams: this.fb.control('',Validators.required),
      name_of_organization: this.fb.control('',Validators.required),
      // no_of_student_passed: this.fb.control('',Validators.required),

    //  academic_calander: this.fb.array([this.createacademic_calander()]),
      // meeting_details: this.fb.array([this.createmeeting_details()]),
      // report_activity: this.fb.array([this.createreport_activity()])
    })
   }

  ngOnInit(): void {
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
    programme: this.Form.get("programme")?.value,
    year: this.Form.get("year").value,
    regiNumber:this.Form.get("reg_no").value,
    exams : this.Form.get("exams")?.value,
    date : this.Form.get("date")?.value,
    nameOfOrganization : this.Form.get("name_of_organization")?.value,
    letter: filename,
    department:{
      id:this.department.id
    }

  }
console.log("rtafsgha",data)
  this.service.postData(`/competitive-exam/program/${this.program.programId}/user/${this.user.userId}`, data).subscribe((res: any) => {
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
    getProgram() {
      this.service.getUserWithUserId().subscribe((user: any) => {
        // console.log(user.teacher)
        const programDialogRef = this.dialog.open(SelectProgramByDepartmentIdComponent, { width: "80%", height: "86vh", panelClass: 'full-width-dialog', data: { departmentId: user.hod.department.id } });
        programDialogRef.afterClosed().subscribe((result: any) => {
          this.program = result;
          console.log(result, this.Form);
          this.Form.get("program").setValue(result.programName);
  
          // this.fetchClass(result);
          // this.service.getData("/program-detail/program/" + result.programId).subscribe((res: any) => {
          //   this.programDetails = res;
          //   console.log(res);
          // })
          this.service.getData("/stream-detail/stream/" + result.stream.id).subscribe((res: any) => {
                  console.log(res);
                  if (res != null && res != undefined) {
                    this.programDetails = res
                  }
                  // this.departments = res;
                }, (err: any) => {
                  alert("Error try again later!!!");
                });
        })
      }, (err: any) => {
        alert("User authentication expired!!. Login again to continue.");
        this.router.navigateByUrl("");
      });
    }
    classChanges(event: any) {
      console.log(event.value);
    
      if(event.value != "" && event.value != null && event.value != undefined) {
        this.divisions = event.value.divisions;
      }
    }
    getStudent() {
      this.service.getUserWithUserId().subscribe((user: any) => {
        // console.log(user.teacher)
        const programDialogRef = this.dialog.open(SelectStudentByDivisionComponent ,{width: "80%",height: "86vh",panelClass: 'full-width-dialog', data: { divisionId:this.Form.get("div")?.value.id,academicYear:this.Form.get("year")?.value }});
        programDialogRef.afterClosed().subscribe((result: any) => {
          this.user = result;
          console.log(result);
          this.Form.get("student_name").setValue(result.firstName +" "+result.middleName + " "+result.lastName);
        })
      }, (err: any) => {
        alert("User authentication expired!!. Login again to continue.");
        this.router.navigateByUrl("");
      });
    }

  }
  interface exams {
    exams: string;
  }
