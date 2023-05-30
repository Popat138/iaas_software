import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SelectProgramByDepartmentIdComponent } from '../common/select-program-by-department-id/select-program-by-department-id.component';
import { SelectCourseByProgramIdComponent } from '../common/select-course-by-program-id/select-course-by-program-id.component';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';
import { GetFinalAttainmentChartComponent } from '../get-final-attainment-chart/get-final-attainment-chart.component';
import { SelectStudentForRollComponent } from '../common/select-student-for-roll/select-student-for-roll.component';
@Component({
  selector: 'app-get-roll-call-list',
  templateUrl: './get-roll-call-list.component.html',
  styleUrls: ['./get-roll-call-list.component.scss']
})
export class GetRollCallListComponent implements OnInit {
  user: any = null;
  course: any = null;
  program: any = null;
  divisions: any = null;
  programDetails: any = null;

  public Form: FormGroup;

  year: any[] = [
    {year: '2018-2019', },
    {year: '2019-2020', },
    {year: '2020-2021', },
    {year: '2021-2022', },
  ];

  constructor(
    private fb: FormBuilder,
    public service: ServiceService,
    public dialog: MatDialog,
    public router: Router
  ) { 
    this.Form = this.fb.group({
      academic_year: this.fb.control('',Validators.required),
      // year: this.fb.control('',Validators.required),
      // semester: this.fb.control('',Validators.required),
      class: this.fb.control('',Validators.required),
      div: this.fb.control('',Validators.required),
      program: this.fb.control('',Validators.required),
      // c_code: this.fb.control('',Validators.required),
      // c_name: this.fb.control('',Validators.required)
    })
  }

  ngOnInit(): void {
  }

  getProgram() {
    this.service.getUserWithUserId().subscribe((user: any) => {
      const programDialogRef = this.dialog.open(SelectProgramByDepartmentIdComponent ,{width: "80%",height: "86vh",panelClass: 'full-width-dialog', data: {departmentId : user.teacher.department.id}});
      programDialogRef.afterClosed().subscribe((result: any) => {
        this.program = result;
        this.Form.get("program").setValue(result.programName);
        this.service.getData("/stream-detail/stream/" + result.stream.id).subscribe((res: any) => {
          this.programDetails = res;
        })
      })
    }, (err: any) => {
      alert("User authentication expired!!. Login again to continue.");
      this.router.navigateByUrl("");
    });
  }
  classChanges(event: any) {
    if(event.value != "" && event.value != null && event.value != undefined) {
      this.divisions = event.value.divisions;
    }
  }
  submitForm(){ 
    
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
