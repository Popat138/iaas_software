import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/service.service';
import { ProjectWorkComponent } from 'src/app/project-work/project-work.component';
import { DownloadService } from 'src/app/download.service';
@Component({
  selector: 'app-view-project-work',
  templateUrl: './view-project-work.component.html',
  styleUrls: ['./view-project-work.component.scss']
})
export class ViewProjectWorkComponent implements OnInit {

  studentData: any[] = [];

  public Form: FormGroup;
  public other : FormArray = this.fb.array([]);
  constructor(
    private fb: FormBuilder,
    public service: ServiceService,
    @Inject(MAT_DIALOG_DATA) public data : any,
    public dialogRef: MatDialogRef<ViewProjectWorkComponent>,
    public dialog: MatDialog,
    public router: Router,
    public downloadService: DownloadService
  )
  {

    this.Form = this.fb.group({
      academic_year: this.fb.control('',Validators.required),
      year: this.fb.control('',Validators.required),
      semester: this.fb.control('',Validators.required),
      class: this.fb.control('',Validators.required),
      div: this.fb.control('',Validators.required),
      program: this.fb.control('',Validators.required),
      program_code:this.fb.control('',Validators.required),
      c_code: this.fb.control('',Validators.required),
      c_name: this.fb.control('',Validators.required),
      type: this.fb.control('',Validators.required),
      // month: this.fb.control('',Validators.required),
      other:this.fb.array([]),
    })
   }

  export() {
    var fileName = "List of Student Project Work";

    const academicYear = this.Form.get("academic_year").value;
    const program = this.Form.get("program").value;
    const programCode = this.Form.get("program_code").value;
    const courseCode = this.Form.get("c_code").value;
    const courseName = this.Form.get("c_name").value;

    const data = this.studentData.map((e) => {
      return {
        'Academic Year': academicYear,
        'Program': program,
        'Program Code': programCode,
        'Course Code': courseCode,
        'Course Name': courseName,
        'type':e.projectWork.type,
        'Roll number': e.user.student.rollNo,
        'Name of Student': `${e.user.firstName} ${e.user.middleName} ${e.user.lastName}`,
        'Title of Project': e.projectTitle
      }
    });
    this.downloadService.exportAsExcelFile(data, fileName);
  }


  ngOnInit(): void {
    console.log(this.data);
    this.getData();
  }

  get otherControl() {
    this.other = this.Form.get('other') as FormArray;
    return this.other.controls;
  }

  createother(): FormGroup {
    return this.fb.group({
    roll_no: this.fb.control('',Validators.required),
    name_of_students: this.fb.control('',Validators.required),
    title_of_project: this.fb.control('',Validators.required),

  });
  }


  addother(): void {
    this.other = this.Form.get('other') as FormArray;
    this.other.push(this.createother());
  }

  removeother(i: number) {
    this.other.removeAt(i);
  }

  getData() {
    this.service.getData("//stream-detail/stream//" + this.data.academicDetail.division.id).subscribe((streamDetail: any) => {
      console.log(streamDetail);
      this.Form.get("academic_year").setValue(this.data.academicDetail.academicYear);
      this.Form.get("year").setValue(this.data.academicDetail.course.year);
      this.Form.get("semester").setValue(this.data.academicDetail.course.semester);
      this.Form.get("div").setValue(this.data.academicDetail.division.divisionName);
      this.Form.get("program").setValue(this.data.academicDetail.course.program.programName);
      this.Form.get("program_code").setValue(this.data.academicDetail.course.program.programCode)
      this.Form.get("c_code").setValue(this.data.academicDetail.course.code);
      this.Form.get("c_name").setValue(this.data.academicDetail.course.name);
      this.Form.get("class").setValue(this.data.academicDetail.streamDetail.streamClass);

      
    }, (err: any) => {
      console.log(err);
      alert("Error try again later!!")
    });

    this.service.getData("/student-project/project-work/" + this.data.id).subscribe((studentData: any) => {
      console.log(studentData);
      this.studentData = studentData;
      this.Form.get("type").setValue(this.studentData[0].projectWork.type);
      for(let i = 0; i< this.studentData.length; i++) {
        // this.Form.get("type").setValue(this.studentData[i].projectWork.type);
        this.other.push(
          this.fb.group({
            roll_no: this.fb.control(this.studentData[i].user.student.rollNo,Validators.required),
            name_of_students: this.fb.control(this.studentData[i].user.firstName + this.studentData[i].user.middleName + this.studentData[i].user.lastName,Validators.required),
            title_of_project: this.fb.control(this.studentData[i].projectTitle,Validators.required)
          })
        );
      }
    }, (err: any) => {
      console.log(err);
      alert("Error try again later!!");
    });
  }





  
}
