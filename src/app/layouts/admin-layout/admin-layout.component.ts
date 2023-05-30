import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AluminiFeedbackComponent } from 'src/app/Addnew/Feedback/alumini-feedback/alumini-feedback.component';
import { ParentsFeedbackComponent } from 'src/app/Addnew/Feedback/parents-feedback/parents-feedback.component';
import { StudentSurveyComponent } from 'src/app/Addnew/Feedback/student-survey/student-survey.component';
import { TeacherFeedbackComponent } from 'src/app/Addnew/Feedback/teacher-feedback/teacher-feedback.component';
import { DownloadService } from 'src/app/download.service';
// import { ParentsFeedbackComponent } from 'src/app/Addnew/Feedback/parents-feedback/parents-feedback.component';
// import { StudentSurveyComponent } from 'src/app/Addnew/Feedback/student-survey/student-survey.component';
// import { TeacherFeedbackComponent } from 'src/app/Addnew/Feedback/teacher-feedback/teacher-feedback.component';
// import { EditStudentAwardComponent } from 'src/app/edit/Committee/edit-student-award/edit-student-award.component';
// import { EditAluminiFeedbackComponent } from 'src/app/edit/feedback/edit-alumini-feedback/edit-alumini-feedback.component';
// import { EditParentFeedbackComponent } from 'src/app/edit/feedback/edit-parent-feedback/edit-parent-feedback.component';
// import { EditStudentSurveyComponent } from 'src/app/edit/feedback/edit-student-survey/edit-student-survey.component';
// import { EditTeacherFeedbackComponent } from 'src/app/edit/feedback/edit-teacher-feedback/edit-teacher-feedback.component';
import { ServiceService } from 'src/app/service.service';


@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {

  user:any = null;
  userRole: any = null;

  showFiller = false;
  college;
  displayedColumns: string[] =['a_year','program','class','divison','link','delete'];
  displayedColumns_teacher: string[] =['a_year','teacher','program', 'dept','class','divison', 'subject', 'link','delete'];
  displayedColumns_parents: string[] =['details','link','delete'];
  displayedColumns_alumini: string[] =['details','link','delete'];
  dataSource!:MatTableDataSource<AdminLayoutComponent>;
  dataSource_teacher!:MatTableDataSource<AdminLayoutComponent>;
  dataSource_parent!:MatTableDataSource<AdminLayoutComponent>;
  dataSource_alumini!:MatTableDataSource<AdminLayoutComponent>;
  // student_access_dataSource!:MatTableDataSource<AdminLayoutComponent>;



  alumini_access_displayedColumns_alumini: string[] =['details','link'];

  student_access_displayedColums: string[] =['a_year','program','class','divison','link'];
  parent_access_displayedColumns_parents: string[] =['details','link'];

  constructor(
    private router: Router,
    public service: ServiceService,
    public dialog: MatDialog,
    public download: DownloadService
  ) { }

  ngOnInit(): void {

    this.service.getUserWithUserId().subscribe((res:any) =>
      {
       this.college =  res.college.name;
       this.user = res;
        console.log(this.user)
        this.userRole = res.role.roleName;
        console.log(this.college)


        if(this.userRole == "Feedback") {
          this.fetchStudentFeedback();
          this.fetchTeacherFeedback();
          this.fetchParentFeedback();
          this.fetchAluminiFeedback();
        } else if(this.userRole == "Alumini") {
          this.fetchAluminiFeedback();
        } else if(this.userRole == "Parent") {
          this.fetchParentFeedback();
        } else if(this.userRole == "Student") {
          this.fetchStudentAccessFeedback();
        }


      })

  }

  formatDate(date) {
    const options:any = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    };

    date = new Date(date).toLocaleString("en-IN", options);
    // console.log("gg", date);

    return date;
  }

  logout(){
    this.router.navigateByUrl('');
    localStorage.clear();
    if(localStorage.length==0){
        this.router.navigate(
          [""],
          {
            replaceUrl: true
          });
    }
  }

  applyFilter(event: any) {
    this.dataSource.filterPredicate = (data: any, filter) => {
      const dataStr =JSON.stringify(data).toLowerCase();
      return dataStr.indexOf(filter) != -1;
    }
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  fetchStudentFeedback() {
    this.service.getData("/student-feedback").subscribe((res: any) => {
      console.log(res);

      let studentFeedback: any[] =[];
      res.forEach((element, i) => {
        this.service.getData("/program-detail/division/" + element.academicDetail.division.id).subscribe((programDetail: any) => {
          console.log(programDetail);
          studentFeedback.push({
            feedback: element,
            // programClass: programDetail.programClass
          });

          if (!(i < res.length-1)) {
            this.processStudentFeedback(studentFeedback);
          }
        });
      });



    }, (err: any) => {
      alert("Error try again later!!!");
    });
  }

  fetchStudentAccessFeedback() {
    this.service
    .getData(
      `/student-feedback/academicYear/${this.user.student.academicYear}/division/${this.user.student.division.id}`
      ).subscribe((res: any) => {
      console.log(res);

      let studentFeedback: any[] =[];
      res.forEach((element, i) => {
        this.service.getData("/program-detail/division/" + element.academicDetail.division.id).subscribe((programDetail: any) => {
          console.log(programDetail);
          studentFeedback.push({
            feedback: element,
            programClass: programDetail.programClass
          });

          if (!(i < res.length-1)) {
            this.processStudentFeedback(studentFeedback);
          }
        });
      });
    }, (err: any) => {
      alert("No feedback available!!!");
    });
  }

  processStudentFeedback(data) {
    const getPos:any = this.compute(data);
      getPos.then((response: any) => {
        this.dataSource = new MatTableDataSource(
          JSON.parse(
            JSON.stringify(
              response
            )
          )
        );
        console.log(this.dataSource.data);

            //     this.dataSource.paginator = this.paginator;
            //  this.dataSource.sort = this.sort;
      });
  }

  async compute(data: any) {
    return new Promise(resolve => {
              for (var i = 0; i < data.length; i++) {
                        data[i].pos = i + 1;
                        if (i == data.length - 1) {
                                  resolve(data);
                        }
              }
    });
  }

  addstudentfeedback(){

  const dialogRef = this.dialog.open(StudentSurveyComponent ,{width: "90%",height: "86vh",panelClass: 'full-width-dialog'});
  dialogRef.afterClosed().subscribe((result : any) => {
    //  this.fetchData();
    this.fetchStudentFeedback();
  });

}


export_studentfeedback(){
  var fileName = "Student Feedback";
    // let data = this.download_data;
    let data: any = null;

    if(this.dataSource.filter != ""){
      data = this.dataSource.filteredData;
    }else{
      data = this.dataSource.data;
    }
    data = data.map((e)=>{
        return {
'Academic Year':e.feedback?.academicDetail?.academicYear,
'Program':e.feedback?.program?.programName,
'Class':e.programClass,
'Division':e.feedback?.academicDetail?.division?.divisionName,
'Link':e.feedback?.link
        }
    });
    this.download.exportAsExcelFile(data,fileName);
}
// edit(row){

//   const dialogRef = this.dialog.open(EditStudentSurveyComponent,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data: row});

// }
delete(row){
  this.service.deleteData("/student-feedback/" + row.feedback.id).subscribe((res: any) => {
    this.fetchTeacherFeedback();
  }, (err: any) => {
    console.log(err);
  });
}

/////////////////////////////////teacher/////////////////////////////////

applyFilter_teacher(event: any) {
  this.dataSource.filterPredicate = (data: any, filter) => {
    const dataStr =JSON.stringify(data).toLowerCase();
    return dataStr.indexOf(filter) != -1;
  }
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}
addteacherfeedback(){

  const dialogRef = this.dialog.open(TeacherFeedbackComponent ,{width: "90%",height: "86vh",panelClass: 'full-width-dialog'});
  dialogRef.afterClosed().subscribe((result : any) => {
    //  this.fetchData();
    this.fetchTeacherFeedback();
  });

}
export_teacherfeedback(){

  var fileName = "Teacher Feedback";
    // let data = this.download_data;
    let data: any = null;

    if(this.dataSource.filter != ""){
      data = this.dataSource_teacher.filteredData;
    }else{
      data = this.dataSource_teacher.data;
    }
    data = data.map((e)=>{
        return {
'Academic Year':e.feedback?.academicDetail?.academicYear,
'Program':e.feedback?.program?.programName,
'Class':e.programClass,
'Division':e.feedback?.academicDetail?.division?.divisionName,
'Subject': e.feedback?.subject?.name,
'Link':e.feedback?.link
        }
    });
    this.download.exportAsExcelFile(data,fileName);
}
// edit_teacher(row){

//   const dialogRef = this.dialog.open(EditTeacherFeedbackComponent,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data: row});

// }
delete_teacher(row){
  this.service.deleteData("/teacher-feedback/" + row.id).subscribe((res: any) => {
    location.reload();
  }, (err: any) => {
    console.log(err);
  });
}


fetchTeacherFeedback() {
  this.service.getData("/teacher-feedback").subscribe((res: any) => {
    console.log(res);

    let teacherFeedback: any[] =[];

    this.processTeacherFeedback(res);
    // return
    // res.forEach((element, i) => {
    //   this.service.getData("/program-detail/division/" + element.academicDetail.division.id).subscribe((programDetail: any) => {
    //     console.log(programDetail);
    //     teacherFeedback.push({
    //       feedback: element,
    //       programClass: programDetail.programClass
    //     });

    //     if (!(i < res.length-1)) {
    //       this.processTeacherFeedback(teacherFeedback);
    //     }
    //   });
    // });



  }, (err: any) => {
    alert("Error try again later!!!");
  });
}

processTeacherFeedback(data) {
  const getPos:any = this.compute(data);
    getPos.then((response: any) => {
      this.dataSource_teacher = new MatTableDataSource(
        // JSON.parse(
        //   JSON.stringify(
            response
        //   )
        // )
      );
      console.log(this.dataSource_teacher.data);

          //     this.dataSource.paginator = this.paginator;
          //  this.dataSource.sort = this.sort;
    });
}


/////////////////////////////////parents/////////////////////////////////

applyFilter_parents(event: any) {
  this.dataSource_parent.filterPredicate = (data: any, filter) => {
    const dataStr =JSON.stringify(data).toLowerCase();
    return dataStr.indexOf(filter) != -1;
  }
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource_parent.filter = filterValue.trim().toLowerCase();
  if (this.dataSource_parent.paginator) {
    this.dataSource_parent.paginator.firstPage();
  }
}
add_parent(){

  const dialogRef = this.dialog.open(ParentsFeedbackComponent ,{width: "90%",height: "86vh",panelClass: 'full-width-dialog'});
  dialogRef.afterClosed().subscribe((result : any) => {
    //  this.fetchData();
    this.fetchParentFeedback();
  });

}
export_parentk(){
  var fileName = "Parent Feedback";
    // let data = this.download_data;
    let data: any = null;

    if(this.dataSource.filter != ""){
      data = this.dataSource_parent.filteredData;
    }else{
      data = this.dataSource_parent.data;
    }
    data = data.map((e)=>{
        return {
'Details':e.details,
'Link':e?.link
        }
    });
    this.download.exportAsExcelFile(data,fileName);
}
// edit_parent(row){

//   const dialogRef = this.dialog.open(EditParentFeedbackComponent,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data: row});

// }
delete_parent(row){
  this.service.deleteData("/parent-feedback/" + row.id).subscribe((res: any) => {
    location.reload();
  }, (err: any) => {
    console.log(err);
  });
}

fetchParentFeedback() {
  this.service.getData("/parent-feedback").subscribe((res: any) => {
    console.log(res);

    const getPos:any = this.compute(res);
    getPos.then((response: any) => {
      this.dataSource_parent = new MatTableDataSource(
        JSON.parse(
          JSON.stringify(
            response
          )
        )
      );
      console.log(this.dataSource_parent.data);

          //     this.dataSource.paginator = this.paginator;
          //  this.dataSource.sort = this.sort;
    });

  }, (err: any) => {
    alert("Error try again later!!!");
  });
}

/////////////////////////////////alumini/////////////////////////////////

applyFilter_alumini(event: any) {
  this.dataSource_alumini.filterPredicate = (data: any, filter) => {
    const dataStr =JSON.stringify(data).toLowerCase();
    return dataStr.indexOf(filter) != -1;
  }
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource_alumini.filter = filterValue.trim().toLowerCase();
  if (this.dataSource_alumini.paginator) {
    this.dataSource_alumini.paginator.firstPage();
  }
}
add_alumini(){

  const dialogRef = this.dialog.open(AluminiFeedbackComponent ,{width: "90%",height: "86vh",panelClass: 'full-width-dialog'});
  dialogRef.afterClosed().subscribe((result : any) => {
    //  this.fetchData();
    this.fetchAluminiFeedback();
  });

}
export__alumini(){
  var fileName = "Alumini Feedback";
    // let data = this.download_data;
    let data: any = null;

    if(this.dataSource.filter != ""){
      data = this.dataSource_parent.filteredData;
    }else{
      data = this.dataSource_parent.data;
    }
    data = data.map((e)=>{
        return {
'Details':e.details,
'Link':e?.link
        }
    });
    this.download.exportAsExcelFile(data,fileName);
}
// edit_alumini(row){
//   const dialogRef = this.dialog.open(EditAluminiFeedbackComponent,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data: row});
// }
delete_alumini(row){
  this.service.deleteData("/alumini-feedback/" + row.id).subscribe((res: any) => {
    location.reload();
  }, (err: any) => {
    console.log(err);
  });
}

fetchAluminiFeedback() {
  this.service.getData("/alumini-feedback").subscribe((res: any) => {
    console.log(res);

    const getPos:any = this.compute(res);
    getPos.then((response: any) => {
      this.dataSource_alumini = new MatTableDataSource(
        JSON.parse(
          JSON.stringify(
            response
          )
        )
      );
      console.log(this.dataSource_alumini.data);

          //     this.dataSource.paginator = this.paginator;
          //  this.dataSource.sort = this.sort;
    });

  }, (err: any) => {
    alert("Error try again later!!!");
  });
}











////////////////////////////////////////////////////////////////////////

}

