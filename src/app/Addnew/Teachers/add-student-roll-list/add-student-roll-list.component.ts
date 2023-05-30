import { Component, Inject,OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { SelectProgramByDepartmentIdComponent } from 'src/app/common/select-program-by-department-id/select-program-by-department-id.component';
import { SelectStudentByDivisionComponent } from 'src/app/common/select-student-by-division/select-student-by-division.component';
import { SelectStudentForRollComponent } from 'src/app/common/select-student-for-roll/select-student-for-roll.component';
import { ServiceService } from 'src/app/service.service';
import { Router } from '@angular/router';
import {v4 as uuidv4} from 'uuid';
@Component({
  selector: 'app-add-student-roll-list',
  templateUrl: './add-student-roll-list.component.html',
  styleUrls: ['./add-student-roll-list.component.scss']
})
export class AddStudentRollListComponent implements OnInit {
  user: any = null;
  program: any = null;
  course: any = null;
  department:any=null;
  teacher:any=null;
  fileUpload = new FormData();
  uploads: any = null;
  divisions: any = null;
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
    public data: any,
    public dialogRef: MatDialogRef<AddStudentRollListComponent>,
    public dialog: MatDialog,
    public router: Router


  ) {
    this.Form = this.fb.group({
      class: this.fb.control('',Validators.required),
      div: this.fb.control('',Validators.required),
      // student_name:this.fb.control('',Validators.required),
      academic_year: this.fb.control('', Validators.required),
      program: this.fb.control('', Validators.required),
   })
  }
  ngOnInit(): void {
    }
 



    
 
   submitForm(){
    let data: any = {
      academicDetail : {
        academicYear: this.Form.get("academic_year").value,
              },
        programId: this.Form.get("program")?.value.id,
    }

    this.service.postData(`/roll-list/division/${this.Form.get("div").value.id}/streamDetail/${this.Form.get("class").value.id}/program/${this.program.programId}/user/${localStorage.getItem("userId")}`, data).subscribe((res: any) => {
      console.log(res);
      if (this.fileUpload.getAll("files").length > 0) {
        this.service.postData("/upload", this.fileUpload).subscribe(res2 => {
          console.log(res2);
        });
      }
    }, (err: any) => {
      console.warn("Error try again later!!");
    }, () => {
      this.dialogRef.close();
    })


   } 




   classChanges(event: any) {
    console.log(event.value);
  
    if(event.value != "" && event.value != null && event.value != undefined) {
      this.divisions = event.value.divisions;
    }
  }
    //Get program Id
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
            console.log("Streamprogram",res);
          })
        })
      }, (err: any) => {
        alert("User authentication expired!!. Login again to continue.");
        this.router.navigateByUrl("");
      });
    }

    getStudent() {
      // this.service.getUserWithUserId().subscribe((user: any) => {
        // console.log(user.teacher)
        const programDialogRef = this.dialog.open(SelectStudentForRollComponent ,{width: "80%",height: "86vh",panelClass: 'full-width-dialog', data: {divisionId:this.Form.get("div")?.value.id,academicYear:this.Form.get("academic_year")?.value }});
        programDialogRef.afterClosed().subscribe((result: any) => {
          this.user = result;
          console.log("RESULT",result);
          this.Form.get("student_name").setValue(result.firstName + result.middleName + result.lastName);
        })
      // }, (err: any) => {
      //   alert("User authentication expired!!. Login again to continue.");
      //   this.router.navigateByUrl("");
      // });
    }
  }

  interface other_type {
    other_type: String;
   }
  