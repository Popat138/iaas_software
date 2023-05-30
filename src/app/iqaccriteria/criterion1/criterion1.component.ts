import { Component, OnInit,ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DownloadService } from 'src/app/download.service';
import { EditDiplomaAndOtherCoursesComponent } from 'src/app/edit/Department/edit-diploma-and-other-courses/edit-diploma-and-other-courses.component';
import { EditPgCoursesComponent } from 'src/app/edit/Department/edit-pg-courses/edit-pg-courses.component';
import { EditUgCoursesComponent } from 'src/app/edit/Department/edit-ug-courses/edit-ug-courses.component';
import { EditProjectWorkComponent } from 'src/app/edit/teacher/edit-project-work/edit-project-work.component';
import { EditInternshipComponent } from 'src/app/edit/Department/edit-internship/edit-internship.component';
import { ServiceService } from 'src/app/service.service';
import { ViewProjectWorkComponent } from 'src/app/View/view-project-work/view-project-work.component';
import { ViewDiplomaStudentDetailsComponent } from 'src/app/View/view-diploma-student-details/view-diploma-student-details.component';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-criterion1',
  templateUrl: './criterion1.component.html',
  styleUrls: ['./criterion1.component.scss']
})
export class Criterion1Component implements OnInit {

 
  committee : any =null;
  displayedColumns: string[] = ['ug_prog','code','year','sem','c_code','c_name','year_of_intro','prog_type',
  // 'edit','delete'
];
  displayedColumns1: string[] = ['pg_prog','code','year','sem','c_code','c_name','year_of_intro','prog_type',
  // 'edit','delete'
];
  displayedColumns2: string[] = ['year','name','type','class','view_student'
  // 'category',
  // 'edit','delete'
];
  displayedColumns3: string[] = ['a_year','pcode','sem','class','div','c_code','c_name', 'view',
  // 'edit','delete'
];

  displayedColumns_internship: string[] = ['year','program','program_code','course','course_code','name_of_student','job_title','details_of_org','report_upload'
// 'edit_internship','delete_internship'
];
displayedColumns_Acadamic: string[] = ['academic_year','teacher','academic_body','university','member_type','upload_cert','examination','univer_college','subject','upload_letter'];

  dataSource!:MatTableDataSource<Criterion1Component>;
  dataSource_pg!:MatTableDataSource<Criterion1Component>;
  dataSource_other!:MatTableDataSource<Criterion1Component>;
  dataSource_project!:MatTableDataSource<Criterion1Component>;
  internship_dataSource!:MatTableDataSource<Criterion1Component>;
  Acadamic_dataSource!:MatTableDataSource<Criterion1Component>;
  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild('paginator1') paginator1: MatPaginator;
  @ViewChild('paginator2') paginator2: MatPaginator;
  @ViewChild('paginator3') paginator3: MatPaginator;
  @ViewChild('paginator4') paginator4: MatPaginator;
  @ViewChild('paginator5') paginator5: MatPaginator;
  constructor(

    public dialog : MatDialog,
    public service : ServiceService,
    public download: DownloadService

  ) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.dataSource_pg = new MatTableDataSource();
    this.dataSource_project = new MatTableDataSource();
    this.dataSource_other = new MatTableDataSource();
    this.dataSource_other = new MatTableDataSource();
    this.internship_dataSource = new MatTableDataSource();
    this.Acadamic_dataSource = new MatTableDataSource();

    this.fetchCommittee();
    this.fetchPG();
    this.fetchDiploma();
    this.fetchProjectWork();
    this.fetch_internship();
    this.fetchAcademic();

  }

  addDetails(){}



  ////for UG

  edit(row){
    const dialogRef = this.dialog.open(EditUgCoursesComponent,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data: row});
  }


  delete(row){

  }
  export_ug(){

    var fileName = "Ug Courses";
    // let data = this.download_data;
    let data: any = null;
    if(this.dataSource.filter != ""){
      data = this.dataSource.filteredData;
    }else{
      data = this.dataSource.data;
    }
    data = data.map((e)=>{
        return {
'UG Program':e.program.programName,
'Code':e.program.programCode,
'Year':e.year,
'Sem':e.semester,
'Course Name':e.name,
'Course Code':e.code,
'Year Of Introduction':e.yoi,
'Type':e.electiveType

        }
    });
    this.download.exportAsExcelFile(data,fileName);
  }

///// for pg

  edit_pg(row){
    const dialogRef = this.dialog.open(EditPgCoursesComponent,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data: row});

  }

  deletepg(row){

  }

  export_pg(){
    var fileName = "Pg Courses";
    // let data = this.download_data;
    let data: any = null;
    if(this.dataSource_pg.filter != ""){
      data = this.dataSource_pg.filteredData;
    }else{
      data = this.dataSource_pg.data;
    }
    data = data.map((e)=>{
        return {
'PG Program':e.program.programName,
'Code':e.program.programCode,
'Year':e.name,
'Sem':e.semester,
'Course Name':e.name,
'Course Code':e.code,
'Year Of Introduction':e.yoi,
'Type':e.electiveType

        }
    });
    this.download.exportAsExcelFile(data,fileName);
  }


/////for other

edit_other(row){
  const dialogRef = this.dialog.open(EditDiplomaAndOtherCoursesComponent,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data: row});
}


delete_other(row){


}

export(){
  var fileName = "Diploma and Other Program";
  // let data = this.download_data;
  let data: any = null;
  if(this.dataSource_project.filter != ""){
    data = this.dataSource_project.filteredData;
  }else{
    data = this.dataSource_project.data;
  }
  console.log(this.dataSource_project.data)
  data = data.map((e)=>{
      return {
// 'UG Program':e.program.programName,
// 'Code':e.program.programCode,
'Year':e.year,
//'Sem':e.academicDetail.course.semester,
'Program Name':e.program.programName,
'Program Type':e.program.programCode,
'Diploma/Certificate Course Name':e.diplomaName,
'Course Type':e.diplomaLevel,
'Student Name':e.admittedStudents[0].user.firstName+" "+e.admittedStudents[0].user.middleName+" "+e.admittedStudents[0].user.lastName,
'Student Email':e.admittedStudents[0].user.email,
'Student Phone':e.admittedStudents[0].user.phone,

// 'Year Of Introduction':e.yoi,
// 'Type':e.electiveType

      }
  });
  this.download.exportAsExcelFile(data,fileName);
}

///Excel file internship
export_internship(){
  var fileName = "Student Internship detail";
  let data: any = null;
  if(this.internship_dataSource.filter != ""){
    data = this.internship_dataSource.filteredData;
  }else{
    data = this.internship_dataSource.data;
  }
  console.log(this.internship_dataSource.data)
  data = data.map((e)=>{
      return {
// 'UG Program':e.program.programName,
// 'Code':e.program.programCode,
'Year':e.year,
'Programme':e.program.programName,
'Prog. Code':e.program.programCode,
'Course Name':e.course.name,
'Course Code':e.course.code,
'Name of Student':e.user.firstName+" "+e.user.middleName+" "+e.user.lastName,
'Job Title':e.jobTitle,
'Detail of POrganization':e.detailOfOrganization,
//'Sem':e.academicDetail.course.semester,

// 'Year Of Introduction':e.yoi,
// 'Type':e.electiveType

      }
  });
  this.download.exportAsExcelFile(data,fileName);

}

export_Academic(){
  var fileName = "Teacher Participation Academic Bodies";
  let data: any = null;
  if(this.Acadamic_dataSource.filter != ""){
    data = this.Acadamic_dataSource.filteredData;
  }else{
    data = this.Acadamic_dataSource.data;
  }
  console.log(this.Acadamic_dataSource.data)
  data = data.map((e)=>{
      return {
// 'UG Program':e.program.programName,
// 'Code':e.program.programCode,
'Academic Year':e.academicYear,
'Teacher Name	':e.user.firstName + " " + e.user.middleName +" "+e.user.lastName,
'Name of Academic Body':e.roleMember+","+e.academicBody + "," + e.university,
'Evaluation or Syllabus Design ':e.examType + " in " +e.subjectExam +","+e.univerCollege,
// 'Mmeber Type': e.roleMember

      }
  });
  this.download.exportAsExcelFile(data,fileName);

}

////





////////////////for project work///

edit_project(row){
  const dialogRef = this.dialog.open(EditProjectWorkComponent,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data: row});

}

delete_project(row){

}

viewProjectDetail(element: any){
  const dialogRef = this.dialog.open(ViewProjectWorkComponent ,{width: "70%",height: "86vh",panelClass: 'full-width-dialog', data: element});
}

viewDiplomaStudent(element: any) {
  const dialogRef = this.dialog.open(ViewDiplomaStudentDetailsComponent ,{width: "80%",height: "86vh",panelClass: 'full-width-dialog', data : element});
  dialogRef.afterClosed().subscribe(result => {
    this.fetchDiploma();
  });
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


  fetchCommittee() {


    this.service.getUserWithUserId().subscribe((user : any) => {
      console.log(user);
      this.service.getData("/course/programLevel/Undergraduate/college/" + user.college.id).subscribe((res: any) => {
        const getPos:any = this.compute(res);
        getPos.then((response: any) => {
                  this.dataSource = new MatTableDataSource(
                            JSON.parse(
                                      JSON.stringify(
                                                response
                                      )
                            )

                  );
                  console.log(this.dataSource.data)

                  this.dataSource.paginator = this.paginator1;
              //  this.dataSource.sort = this.sort;
        });
      }, (err: any) => {
        console.warn("No committee available!!");
      })
    }, (err : any) => {
      console.log(err);
    });
  }

  fetchPG() {

    this.service.getUserWithUserId().subscribe((user : any) => {
     // console.log(user);
      this.service.getData("/course/programLevel/Postgraduate/college/" + user.college.id).subscribe((res: any) => {
        const getPos:any = this.compute(res);
        getPos.then((response: any) => {
                  this.dataSource_pg = new MatTableDataSource(
                            JSON.parse(
                                      JSON.stringify(
                                                response
                                      )
                            )

                  );
                  console.log(this.dataSource_pg.data)

                  this.dataSource_pg.paginator = this.paginator2;
              //  this.dataSource.sort = this.sort;
        });
      }, (err: any) => {
        console.warn("No committee available!!");
      })
    }, (err : any) => {
      console.log(err);
    });
  }

  fetchDiploma() {

    this.service.getUserWithUserId().subscribe((user: any) => {
      this.service.getData("/diploma-program/college/"+user.college.id).subscribe((res: any) => {
        const getPos:any = this.compute(res);
        getPos.then((response: any) => {
                  this.dataSource_project = new MatTableDataSource(
                            JSON.parse(
                                      JSON.stringify(
                                                response
                                      )
                            )

                  );console.table(this.dataSource_project.data)

                  this.dataSource_project.paginator = this.paginator3;
              //  this.dataSource.sort = this.sort;
        });
      }, (err: any) => {
        console.warn("No committee available!!");
      })
    })
  }

  fetchProjectWork() {
    this.service.getUserWithUserId().subscribe((user: any) => {
      this.service.getData("/project-work/college/"+user.college.id).subscribe((res: any) => {
        const getPos:any = this.compute(res);
        getPos.then((response: any) => {
                  this.dataSource_other = new MatTableDataSource(
                            JSON.parse(
                                      JSON.stringify(
                                                response
                                      )
                            )

                  );console.table(this.dataSource_other.data)

                  this.dataSource_other.paginator = this.paginator4;
              //  this.dataSource.sort = this.sort;
        });
      }, (err: any) => {
        console.warn("No committee available!!");
      })
    })
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

  // viewAchievements(){
  //   const dialogRef = this.dialog.open(NewDetailsComponent ,{width: "70%",height: "86vh",panelClass: 'full-width-dialog'});
  // }


  export_project(){
    var fileName = "Project Work";
    // let data = this.download_data;
    let data: any = null;
    if(this.dataSource_other.filter != ""){
      data = this.dataSource_other.filteredData;
    }else{
      data = this.dataSource_other.data;
    }
      console.log(this.dataSource_other.data)
    data = data.map((e)=>{
        return {
// 'UG Program':e.program.programName,
// 'Code':e.program.programCode,
'Academic Year':e.academicDetail.academicYear,
'Programme':e.academicDetail.course.program.programName,
'Programme code':e.academicDetail.course.program.programCode,
'Course Code':e.academicDetail.course.code,
'Course Name':e.academicDetail.course.name,
// 'Year Of Introduction':e.yoi,
// 'Type':e.electiveType

        }
    });
    this.download.exportAsExcelFile(data,fileName);
  }
 //Internship Component
 
 fetch_internship() {

  this.service.getData("/user/" + localStorage.getItem("userId")).subscribe((user: any) =>  {
  this.service.getData("/internship-detail/college/"+user.college.id).subscribe((res: any) => {
    const getPos:any = this.compute(res);
    getPos.then((response: any) => {
              this.internship_dataSource = new MatTableDataSource(
                        JSON.parse(
                                  JSON.stringify(
                                            response
                                  )
                        )

              );console.table(this.internship_dataSource.data)

              this.internship_dataSource.paginator = this.paginator5;
          //  this.dataSource.sort = this.sort;
    });
  }, (err: any) => {
    console.warn("No committee available!!");
  })

})
}
fetchAcademic() {
  this.service.getUserWithUserId().subscribe((user: any) => {
    console.log("aaa",user)
    this.service.getData("/academic-participation/college/" + user.college.id).subscribe((res: any) => {
      console.log(res);
      res.forEach((element,key) => {
         this.service.getData("/user/teacher/"+element.teacher.teacherId).subscribe((data:any)=>{

          res[key].user=data
          if(!(key < res.length-1)) {
            this.process(res);
          }           })
      });
      console.log("final teacher",res)
    }, (err: any) => {
      alert(err.error?.message);
    });

  }, (err: any) => {
    console.warn(err);
  });
}
process(data) {
  const getPos:any = this.compute(data);
      getPos.then((response: any) => {
        this.Acadamic_dataSource = new MatTableDataSource(
          response
        );
        console.log(this.Acadamic_dataSource.data)
                this.Acadamic_dataSource.paginator = this.paginator;
            //  this.dataSource.sort = this.sort;
      });
}



}//End of Program



