import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';
import { MatDialog } from '@angular/material/dialog';
import { SelectCourseByProgramIdComponent } from '../common/select-course-by-program-id/select-course-by-program-id.component';
import { SelectProgramByDepartmentIdComponent } from '../common/select-program-by-department-id/select-program-by-department-id.component';
import { GetFinalAttainmentChartComponent } from '../get-final-attainment-chart/get-final-attainment-chart.component';

@Component({
  selector: 'app-get-attainment-department',
  templateUrl: './get-attainment-department.component.html',
  styleUrls: ['./get-attainment-department.component.scss']
})
export class GetAttainmentDepartmentComponent implements OnInit {

  course: any = null;
  department:any=null;
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
      year: this.fb.control('',Validators.required),
      semester: this.fb.control('',Validators.required),
      class: this.fb.control('',Validators.required),
      div: this.fb.control('',Validators.required),
      program: this.fb.control('',Validators.required),
      c_code: this.fb.control('',Validators.required),
      c_name: this.fb.control('',Validators.required)
    })
  }

  ngOnInit(): void {
  }

  getProgram() {
    this.service.getUserWithUserId().subscribe((user: any) => {
      console.log("departmentChart",user);
      
      const programDialogRef = this.dialog.open(SelectProgramByDepartmentIdComponent ,{width: "80%",height: "86vh",panelClass: 'full-width-dialog', data: {departmentId : user.hod.department.id}});
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
  
  getCourses() {
    const courseDialogRef = this.dialog.open(SelectCourseByProgramIdComponent ,{width: "80%",height: "86vh",panelClass: 'full-width-dialog', data: {programId : this.program.programId}});
    courseDialogRef.afterClosed().subscribe((result: any) => {
      this.course = result;
      this.Form.get("c_code").setValue(result.code);
      this.Form.get("c_name").setValue(result.name);
      this.Form.get("year").setValue(result.year);
      this.Form.get("semester").setValue(result.semester);
    })
  }
  
  classChanges(event: any) {
    if(event.value != "" && event.value != null && event.value != undefined) {
      this.divisions = event.value.divisions;
    }
  }

  submitForm(){ 
    const dialogRef = this.dialog.open(GetFinalAttainmentChartComponent ,{width: "100vw",height: "90vh",panelClass: 'full-width-dialog', data: {
  
      academicYear: this.Form.get("academic_year").value,
      divisionId: this.Form.get("div").value.id,
      divisionName: this.Form.get("div").value.divisionName,
      program: this.Form.get("program").value,
      c_name:this.Form.get("c_name").value,
      class:this.Form.get("class").value,
      courseId: this.course.courseId,
      userId: localStorage.getItem("userId")
    }});
    dialogRef.afterClosed().subscribe((result : any) => { });
  }
}
