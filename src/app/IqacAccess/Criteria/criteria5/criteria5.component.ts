import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AddNewDepartmentAwardComponent } from 'src/app/Addnew/add-new-department-award/add-new-department-award.component';
import { AddResultsPgComponent } from 'src/app/Addnew/Department/add-results-pg/add-results-pg.component';
import { DownloadService } from 'src/app/download.service';
import { EditStudentAwardComponent } from 'src/app/edit/Committee/edit-student-award/edit-student-award.component';
import { EditHigherEduComponent } from 'src/app/edit/Department/edit-higher-edu/edit-higher-edu.component';
import { EditPlacementComponent } from 'src/app/edit/Department/edit-placement/edit-placement.component';
import { EditScholarshipComponent } from 'src/app/edit/Office/edit-scholarship/edit-scholarship.component';
import { ServiceService } from 'src/app/service.service';
import { TestreportComponent } from 'src/app/testreport/testreport.component';
import { NewStudentAwardComponent } from 'src/app/View/new-student-award/new-student-award.component';
import { ViewScholarshipDetailComponent } from 'src/app/View/view-scholarship-detail/view-scholarship-detail.component';
import { EditSummerWinterComponent } from 'src/app/edit/Department/edit-summer-winter/edit-summer-winter.component';
import { MatPaginator } from '@angular/material/paginator';
import { EditCriteriaReportComponent } from 'src/app/edit/edit-criteria-report/edit-criteria-report.component';
import { ViewCriteriaReportsComponent } from 'src/app/View/view-criteria-reports/view-criteria-reports.component';
import { ViewCriteriaQuantitativeComponent } from 'src/app/View/view-criteria-quantitative/view-criteria-quantitative.component';
import { EditCriquantitativeReportComponent } from 'src/app/edit/edit-criquantitative-report/edit-criquantitative-report.component';
import { ViewActivityReportComponent } from 'src/app/View/view-activity-report/view-activity-report.component';

@Component({
  selector: 'app-criteria5',
  templateUrl: './criteria5.component.html',
  styleUrls: ['./criteria5.component.scss']
})
export class Criteria5Component implements OnInit {

  year_detail:any = null;
  committee : any =null;

  displayedColumns_higher: string[] = ['year','name_of_student','program','admmission_to_prog','name_of_institute','report_upload',
  // 'edit_higheredu','delete_higheredu'
];
  displayedColumns_placement: string[] = ['year','programme','prog_code','name_of_student','job_title','details_of_org','pay_package','report_upload',
  // 'edit_placement','delete_placement'
];
  displayedColumns_competative: string[] = ['year','program','program_code','reg_no','name_of_student','qualifying_exam','date', 'name_of_org','report_upload',
  // 'edit_competative','delete_competative'
];
  displayedColumns_activity: string[] = ['year','committee',
  'title',
  'fromDate',
  'toDate',
  'details',
  'participants',
  // 'edit','delete'
];
  displayedColumns_scholarship: string[] = ['academicYear','scholarshipType','view',
  // 'edit','delete'
];
  displayedColumns: string[] = ['a_year','title','name_of_award','award_name','awarding_agency', 'level' ,'nature', 'certificate',
  // 'edit','delete'
];
displayedColumns_school: string[] =['academic_year',
'Department','title','duration','n_teachers','n_students','s_agency',
//'photograph',
'newsReport','participants',
// 'edit','delete'
];
displayedColumns_qualN: string[] = [
  'year',
  'name',
  'type',
  'number',
  'title',
  'view',
  'edit',
  // 'delete'
    ];
    displayedColumns_quanT: string[] = [
      'year',
      'name',
      'type',
      'number',
      'title',
      'view',
      'edit',
      // 'delete'
        ];

  department : any = null;

  dataSource_activity!:MatTableDataSource<Criteria5Component>;
  higher_edu_dataSource!:MatTableDataSource<Criteria5Component>;
  placement_dataSource!:MatTableDataSource<Criteria5Component>;
  competative_dataSource!:MatTableDataSource<Criteria5Component>;
  scholarship_dataSource!:MatTableDataSource<Criteria5Component>;
  dataSource!:MatTableDataSource<Criteria5Component>;
  dataSource_school!:MatTableDataSource<Criteria5Component>;
  dataSource_qualN!:MatTableDataSource<Criteria5Component>;
  dataSource_qual!:MatTableDataSource<Criteria5Component>;
  dataSource_quanT!:MatTableDataSource<Criteria5Component>;
  @ViewChild('paginator1') paginator1: MatPaginator;
  @ViewChild('paginator2') paginator2: MatPaginator;
  @ViewChild('paginator3') paginator3: MatPaginator;
  @ViewChild('paginator4') paginator4: MatPaginator;
  @ViewChild('paginator5') paginator5: MatPaginator;
  @ViewChild('paginator6') paginator6: MatPaginator;
  @ViewChild('paginator7') paginator7: MatPaginator;
  constructor (
    public dialog : MatDialog,
    public service : ServiceService,
    public router: Router,
    public download: DownloadService
    )
    { }

  ngOnInit(): void {

    this.higher_edu_dataSource = new MatTableDataSource();
    this.fetch_higher();
    this.fetch_placement();
    this.fetch_competative();
    this.fetch_award();
    this.fetchactivity();
    this.fetchData_scholarship();
    this.fetchdata_school();
    this.fetchCriQual();
    this.fetchCriQualN();
    this.fetchCriQuanT();

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

  // formatDate(date) {
  //   const options:any = {
  //     day: "2-digit",
  //     month: "2-digit",
  //     year: "numeric"
  //   };
  // }

  export_activity(){
    var fileName = "Activity List Criteria 5";
    // let data = this.download_data;
    let data: any = null;

    if(this.dataSource_activity.filter != ""){
      data = this.dataSource_activity.filteredData;
    }else{
      data = this.dataSource_activity.data;
    }
    data = data.map((e)=>{
        return {
'Title':e.titleOfActivity,
'Duration':this.formatDate(e.fromDate) + " to " +this.formatDate(e.toDate) ,
'Teachers count':e.noOfTeachers,
'Students count':e.noOfStudent,
'Supporting agency':e.supportingAgency
        }
    });
    this.download.exportAsExcelFile(data,fileName);
  }

  export_higher(){

    var fileName = "Report of Progression to Higher Education";
    // let data = this.download_data;
    let data: any = null;

    if(this.higher_edu_dataSource.filter != ""){
      data = this.higher_edu_dataSource.filteredData;
    }else{
      data = this.higher_edu_dataSource.data;
    }
    data = data.map((e)=>{
        return {
'Year':e.year,
'Name of student enrolling into higher education	':e.user.firstName + "  "+ e.user.middleName+" "+e.user.lastName,
'Program graduated from':e.program.programName,
'Name of Institution joined':e.nameOfInstitute,
'Name of programme admitted to':e.admissionToProgram

        }
    });
    this.download.exportAsExcelFile(data,fileName);




  }
  export_placement(){

    var fileName = "Report of Placement";
    // let data = this.download_data;
    let data: any = null;

    if(this.placement_dataSource.filter != ""){
      data = this.placement_dataSource.filteredData;
    }else{
      data = this.placement_dataSource.data;
    }
    data = data.map((e)=>{
        return {
'Year':e.year,
'Program graduated from':e.program.programName,
'Prog. code':e.program.programCode,
'Name of Student	':e.user.firstName + "  "+ e.user.middleName+" "+e.user.lastName,
'Job Title':e.jobTitle,
'	Details of organization':e.detailOfOrganization,
'Pay package at appointment (In INR per annum)':e.payPackage,
// 'Name of Institute':e.nameOfInstitute
        }
    });
    this.download.exportAsExcelFile(data,fileName);

  }
  export_exams(){
    var fileName = "Report of Competative Exams ";
    // let data = this.download_data;
    let data: any = null;

    if(this.competative_dataSource.filter != ""){
      data = this.competative_dataSource.filteredData;
    }else{
      data = this.competative_dataSource.data;
    }
    data = data.map((e)=>{
        return {
'Year':e.year,
'Programme':e.program.programName,
'Registration Number for exam':e.regiNumber,
'Name of Student	':e.user.firstName + "  "+ e.user.middleName + "  " + e.user.lastName,
'Qualitfying Exam':e.exams,
'Date':e.date,
'Name of organization':e.nameOfOrganization,
// 'Name of Institute':e.nameOfInstitute
        }
    });
    this.download.exportAsExcelFile(data,fileName);


  }
  export_award(){

    var fileName = "Report of Award ";
    // let data = this.download_data;
    let data: any = null;

    if(this.dataSource.filter != ""){
      data = this.dataSource.filteredData;
    }else{
      data = this.dataSource.data;
    }
    data = data.map((e)=>{
        return {
      'Year':e.year,
      'Title':e.title,
      'Name of Student	':e.nameOfStudent,
      'Name of Award':e.awardName,
      'Awarding agency':e.awardingAgency,
      'Level':e.achievementLevel,
      'Nature of Award':e.achievementNature.replace("_" , " "),
// 'Name of Institute':e.nameOfInstitute
        }
    });
    this.download.exportAsExcelFile(data,fileName);

  }
  export_scholarship(){

    var fileName = "Report of Scholarship ";
    // let data = this.download_data;
    let data: any = null;

    if(this.scholarship_dataSource.filter != ""){
      data = this.scholarship_dataSource.filteredData;
    }else{
      data = this.scholarship_dataSource.data;
    }
    data = data.map((e)=>{
        return {
'Academic Year':e.academicYear,
'Scholarship Type':e.scholarshipType,

// 'Name of Institute':e.nameOfInstitute
        }
    });
    this.download.exportAsExcelFile(data,fileName);


  }


  //////////////////////////////////////higher EDUCAITON ( UG TO PG)///////////////////////////

  edit_higheredu(row){
    const dialogRef = this.dialog.open(EditHigherEduComponent,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data: row});
  }

  delete_higheredu(row){}

  applyFilter_higher(event: any) {
    this.higher_edu_dataSource.filterPredicate = (data: any, filter) => {
      const dataStr =JSON.stringify(data).toLowerCase();
      return dataStr.indexOf(filter) != -1;
    }
    const filterValue = (event.target as HTMLInputElement).value;
    this.higher_edu_dataSource.filter = filterValue.trim().toLowerCase();
    if (this.higher_edu_dataSource.paginator) {
      this.higher_edu_dataSource.paginator.firstPage();
    }
  }

  fetch_higher() {

    this.service.getData("/user/" + localStorage.getItem("userId")).subscribe((user: any) =>  {
      this.service.getData("/higher-education/college/"+user.college.id).subscribe((res: any) => {
        const getPos:any = this.compute(res);
        getPos.then((response: any) => {
                  this.higher_edu_dataSource = new MatTableDataSource(
                            JSON.parse(
                                      JSON.stringify(
                                                response
                                      )
                            )

                  );console.table(this.higher_edu_dataSource.data)

                  this.higher_edu_dataSource.paginator = this.paginator2;
              //  this.dataSource.sort = this.sort;
        });
      }, (err: any) => {
        console.warn("No committee available!!");
      })

    })
  }

  async compute_higher(data: any) {
    return new Promise(resolve => {
              for (var i = 0; i < data.length; i++) {
                        data[i].pos = i + 1;
                        if (i == data.length - 1) {
                                  resolve(data);
                        }
              }
    });
  }

  /////////////////////////////////////// Placement ///////////////////////////

  edit_placement(row){
    const dialogRef = this.dialog.open(EditPlacementComponent,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data: row});
  }

  delete_placement(row){}

  applyFilter_placement(event: any) {
    this.placement_dataSource.filterPredicate = (data: any, filter) => {
      const dataStr =JSON.stringify(data).toLowerCase();
      return dataStr.indexOf(filter) != -1;
    }
    const filterValue = (event.target as HTMLInputElement).value;
    this.placement_dataSource.filter = filterValue.trim().toLowerCase();
    if (this.placement_dataSource.paginator) {
      this.placement_dataSource.paginator.firstPage();
    }
  }

  fetch_placement() {

    this.service.getData("/user/" + localStorage.getItem("userId")).subscribe((user: any) =>  {
      this.service.getData("/placement-detail/college/"+user.college.id).subscribe((res: any) => {
        const getPos:any = this.compute(res);
        getPos.then((response: any) => {
                  this.placement_dataSource = new MatTableDataSource(
                            JSON.parse(
                                      JSON.stringify(
                                                response
                                      )
                            )

                  );console.table(this.placement_dataSource.data)

                  this.placement_dataSource.paginator = this.paginator3;
              //  this.dataSource.sort = this.sort;
        });
      }, (err: any) => {
        console.warn("No committee available!!");
      })

    })
  }

  async compute_placement(data: any) {
    return new Promise(resolve => {
              for (var i = 0; i < data.length; i++) {
                        data[i].pos = i + 1;
                        if (i == data.length - 1) {
                                  resolve(data);
                        }
              }
    });
  }
/////

viewreport(element){
  console.log(element)
  const dialogRef = this.dialog.open(ViewActivityReportComponent ,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data:element});
  dialogRef.afterOpened().subscribe((result : any) => {
    //  result = this.test;
    //  console.log(result)
  });


}



  //////////////////////////////////Comopetative exam //////////////////////
  edit_competative(row){
    const dialogRef = this.dialog.open(EditPlacementComponent,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data: row});
  }

  delete_competative(row){}

  applyFilter_competative(event: any) {
    this.competative_dataSource.filterPredicate = (data: any, filter) => {
      const dataStr =JSON.stringify(data).toLowerCase();
      return dataStr.indexOf(filter) != -1;
    }
    const filterValue = (event.target as HTMLInputElement).value;
    this.competative_dataSource.filter = filterValue.trim().toLowerCase();
    if (this.placement_dataSource.paginator) {
      this.competative_dataSource.paginator.firstPage();
    }
  }

  fetch_competative() {

    this.service.getData("/user/" + localStorage.getItem("userId")).subscribe((user: any) =>  {
      this.service.getData("/competitive-exam/college/"+user.college.id).subscribe((res: any) => {
        const getPos:any = this.compute(res);
        getPos.then((response: any) => {
                  this.competative_dataSource = new MatTableDataSource(
                            JSON.parse(
                                      JSON.stringify(
                                                response
                                      )
                            )

                  );console.table(this.competative_dataSource.data)

                  this.competative_dataSource.paginator = this.paginator4;
              //  this.dataSource.sort = this.sort;
        });
      }, (err: any) => {
        console.warn("No committee available!!");
      })

    })
  }

  async compute_competative(data: any) {
    return new Promise(resolve => {
              for (var i = 0; i < data.length; i++) {
                        data[i].pos = i + 1;
                        if (i == data.length - 1) {
                                  resolve(data);
                        }
              }
    });
  }

  fetchdata_school(){

    this.service.getData("/school-report/criteriaName/criteria5").subscribe((res: any) =>  {
      const getPos:any = this.compute_school(res);
      getPos.then((response: any) => {
                this.dataSource_school = new MatTableDataSource(
                          JSON.parse(
                                    JSON.stringify(
                                              response
                                    )
                          )

                );
                console.table(this.dataSource_school.data)

                this.dataSource_school.paginator = this.paginator7;
            // this.dataSource.sort = this.sort;
      });
    }, (err: any) => {
      alert("User detail not available!");
      this.router.navigateByUrl("");
    });

  }
  async compute_school(data: any) {
    return new Promise(resolve => {
              for (var i = 0; i < data.length; i++) {
                        data[i].pos = i + 1;
                        if (i == data.length - 1) {
                                  resolve(data);
                        }
              }
    });
}




  //////////////////////////////AWARD /////////////////////////////////
  edit(row){
    const dialogRef = this.dialog.open(EditStudentAwardComponent,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data: row});
  }


  delete(row){
    // console.log(row);
    // if(confirm("Do you want to delete this user ?")) {


  //     Swal.fire({
  //       title: 'Are you sure?',
  //       text: "You won't be able to revert this!",
  //       icon: 'info',
  //       showCancelButton: true,
  //       confirmButtonColor: '#3085d6',
  //       cancelButtonColor: '#d33',
  //       confirmButtonText: 'Yes, delete it!'
  //     }).then((result) => {
  //       if (result.isConfirmed) {
  //     this.service.deleteData('/supplier/'+row['id']).subscribe(response => {
  //       location.reload();
  //   },err => {
  //     // console.log(err);
  //     if(err.status == 409){
  //       Swal.fire({
  //         title: "Supplier cannot be deleted",
  //         text: "Stock In entry has been made against this supplier",
  //         icon: 'warning'
  //       });
  //     }
  //   });
  // }
  // });


  }

  applyFilter_award(event: any) {
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


  fetch_award() {
    this.service.getUserWithUserId().subscribe((user: any) => {
      this.service.getData("/student-achievement/criteriaName/criteria5").subscribe((res: any) => {
        const getPos:any = this.compute(res);
        getPos.then((response: any) => {
                  this.dataSource = new MatTableDataSource(
                            JSON.parse(
                                      JSON.stringify(
                                                response
                                      )
                            )

                  );console.table(this.dataSource.data)

                  this.dataSource.paginator = this.paginator6;
              //  this.dataSource.sort = this.sort;
        });
      }, (err: any) => {
        console.warn("No committee available!!");
      })
    })
  }

  async compute_award(data: any) {
    return new Promise(resolve => {
              for (var i = 0; i < data.length; i++) {
                        data[i].pos = i + 1;
                        if (i == data.length - 1) {
                                  resolve(data);
                        }
              }
    });
  }

  viewStudentAward(){
    const dialogRef = this.dialog.open(NewStudentAwardComponent ,{width: "70%",height: "86vh",panelClass: 'full-width-dialog'});
  }





  /////////////////////Activity Report//////////////////////////////////



  viewactivity(element){
    console.log(element)
    const dialogRef = this.dialog.open(ViewActivityReportComponent ,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data:element});
    dialogRef.afterOpened().subscribe((result : any) => {
      //  result = this.test;
      //  console.log(result)
    });

  }

  editactivity(row){
   // const dialogRef = this.dialog.open(EditCommitteeDetailsComponent,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data: row});
  }


  deleteactivity(row){
    // console.log(row);
    // if(confirm("Do you want to delete this user ?")) {


  //     Swal.fire({
  //       title: 'Are you sure?',
  //       text: "You won't be able to revert this!",
  //       icon: 'info',
  //       showCancelButton: true,
  //       confirmButtonColor: '#3085d6',
  //       cancelButtonColor: '#d33',
  //       confirmButtonText: 'Yes, delete it!'
  //     }).then((result) => {
  //       if (result.isConfirmed) {
  //     this.service.deleteData('/supplier/'+row['id']).subscribe(response => {
  //       location.reload();
  //   },err => {
  //     // console.log(err);
  //     if(err.status == 409){
  //       Swal.fire({
  //         title: "Supplier cannot be deleted",
  //         text: "Stock In entry has been made against this supplier",
  //         icon: 'warning'
  //       });
  //     }
  //   });
  // }
  // });


  }

  fetchactivity() {
    this.service.getData("/activity-report/criteriaName/criteria5").subscribe((res: any) => {
      const getPos:any = this.compute_activity(res);
      getPos.then((response: any) => {
                this.dataSource_activity = new MatTableDataSource(
                          JSON.parse(
                                    JSON.stringify(
                                              response
                                    )
                          )

                );console.table(this.dataSource_activity.data)

                this.dataSource_activity.paginator = this.paginator1;
            //  this.dataSource.sort = this.sort;
      });
    }, (err: any) => {
      console.warn("No committee available!!");
    })
  }

  async compute_activity(data: any) {
    return new Promise(resolve => {
              for (var i = 0; i < data.length; i++) {
                        data[i].pos = i + 1;
                        if (i == data.length - 1) {
                                  resolve(data);
                        }
              }
    });
  }

  applyFilter_activity(event: any) {
    this.dataSource_activity.filterPredicate = (data: any, filter) => {
      const dataStr =JSON.stringify(data).toLowerCase();
      return dataStr.indexOf(filter) != -1;
    }
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource_activity.filter = filterValue.trim().toLowerCase();
    if (this.dataSource_activity.paginator) {
      this.dataSource_activity.paginator.firstPage();
    }
  }

/////////////////////Scholar ship ////////////////////////////////

  edit_scholarship(row){
    const dialogRef = this.dialog.open(EditScholarshipComponent,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data: row});
  }


 delete_scholarship(row){
    // console.log(row);
    // if(confirm("Do you want to delete this user ?")) {


  //     Swal.fire({
  //       title: 'Are you sure?',
  //       text: "You won't be able to revert this!",
  //       icon: 'info',
  //       showCancelButton: true,
  //       confirmButtonColor: '#3085d6',
  //       cancelButtonColor: '#d33',
  //       confirmButtonText: 'Yes, delete it!'
  //     }).then((result) => {
  //       if (result.isConfirmed) {
  //     this.service.deleteData('/supplier/'+row['id']).subscribe(response => {
  //       location.reload();
  //   },err => {
  //     // console.log(err);
  //     if(err.status == 409){
  //       Swal.fire({
  //         title: "Supplier cannot be deleted",
  //         text: "Stock In entry has been made against this supplier",
  //         icon: 'warning'
  //       });
  //     }
  //   });
  // }
  // });

  }



  applyFilter(event: any) {
    this.scholarship_dataSource.filterPredicate = (data: any, filter) => {
      const dataStr =JSON.stringify(data).toLowerCase();
      return dataStr.indexOf(filter) != -1;
    }
    const filterValue = (event.target as HTMLInputElement).value;
    this.scholarship_dataSource.filter = filterValue.trim().toLowerCase();
    if (this.scholarship_dataSource.paginator) {
      this.scholarship_dataSource.paginator.firstPage();
    }
  }

  // addNewStudentData(){

  //   const dialogRef = this.dialog.open(AddNewScholarshipDataComponent ,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data : {"committeeId":2}});
  //   dialogRef.afterClosed().subscribe((result: any) => {
  //     this.fetchData();
  //   });
  // }

  fetchData_scholarship(){
    this.service.getData("/scholarship").subscribe((res: any) => {
      const getPos:any = this.compute(res);
      getPos.then((response: any) => {
        this.scholarship_dataSource = new MatTableDataSource(
          JSON.parse(
            JSON.stringify(response)
          )
        );
        console.table(this.scholarship_dataSource.data)
                this.scholarship_dataSource.paginator = this.paginator5;
            //  this.dataSource.sort = this.sort;
      });
    }, (err: any) => {
      console.log(err);
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

  viewScholarshipDetail(rowData : any){
    const dialogRef = this.dialog.open(ViewScholarshipDetailComponent ,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data : rowData});
    dialogRef.afterClosed().subscribe((result: any) => {
      this.fetchData_scholarship();
    });
  }
export_summer(){

  var fileName = "Report Of Summer/Winter School  Criteria 3";
  // let data = this.download_data;
  let data: any = null;
  if(this.dataSource_school.filter != ""){
    data = this.dataSource_school.filteredData;
  }else{
    data = this.dataSource_school.data;
  }
  data = data.map((e)=>{
      return {
        'Academic Year':e.year,
        'Department':e.department.departmentName,
'Name of Capacity building program':e.title,
'Duration':this.formatDate(e.fromDate)+ " to "+this.formatDate(e.toDate),
//'Teacher Count':e.noOfTeachers,
'Number of students enrolled':e.noOfStudent,
'Name of the agencies/consultants involved with contact details':e.supportingAgency,

      }
  });
  this.download.exportAsExcelFile(data,fileName);
}

fetchCriQual(){
  this.service.getUserWithUserId().subscribe((user: any) => {
    console.log("THIS USER",user);
    this.service.getData(`/cri-qual`).subscribe((res : any) => {
      console.log("DATA NEW",res)
      const getPos:any = this.compute_qual(res);
      getPos.then((response: any) => {
        this.dataSource_qual = new MatTableDataSource(
          JSON.parse(
            JSON.stringify(response)
          )
        );

        console.log(this.dataSource_qual.data)
        // this.college = this.dataSource_qual.data;
        // console.log(this.college[0].college.name)
            //     this.dataSource.paginator = this.paginator;
            //  this.dataSource.sort = this.sort;
      });
    }, (err: any) => {
      console.warn(err);
    });
  }, (err: any) => {
    console.warn(err);
  });



}

fetchCriQualN(){
  this.service.getUserWithUserId().subscribe((user: any) => {
    this.service.getData(`/cri-qual`).subscribe((res: any) => {
      console.log(res);
      let finaldata: any[] = [];
      for (let i = 0; i < res.length; i++) {

        this.service.getData("/crh/" + res[i].crh.id).subscribe((result: any) => {
          if(res[i].crh.criteriaName=="Criterion-V")
          {finaldata.push(
            {
              
              // user: result,
              approval: res[i]
            }
          );
          }
          if(!(i < res.length-1)) {
            this.process_appr(finaldata);
          }
        })
      
      }
    }, (err: any) => {
      alert(err.error?.message);
    });

  }, (err: any) => {
    console.warn(err);
  });

}
process_appr(data) {
  console.log("PP",data);
  const getPos:any = this.compute_qual(data);
      getPos.then((response: any) => {
        this.dataSource_qualN = new MatTableDataSource(
          JSON.parse(
            JSON.stringify(response)
          )
        );
        console.log(this.dataSource_qualN.data)
                // this.dataSource_approval.paginator = this.paginator3;
            //  this.dataSource.sort = this.sort;
      });
}
async compute_qual(data: any) {
  return new Promise(resolve => {
            for (var i = 0; i < data.length; i++) {
                      data[i].pos = i + 1;
                      if (i == data.length - 1) {
                                resolve(data);
                      }
            }
  });
}

viewdetailsN(element: any){const dialogRef = this.dialog.open(ViewCriteriaReportsComponent ,{width: "85%",height: "86vh",panelClass: 'full-width-dialog', data: element.approval});
    dialogRef.afterClosed().subscribe((result : any) => {
       this.fetchCriQualN();
    });

    }

    editN(row){
      const dialogRef = this.dialog.open(EditCriteriaReportComponent,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data: row.approval});
      dialogRef.afterClosed().subscribe((result : any) => {
        this.fetchCriQual();
     });
    }
  //Quantitative
  fetchCriQuanT(){
    this.service.getUserWithUserId().subscribe((user: any) => {
      this.service.getData(`/cri-quant`).subscribe((res: any) => {
        console.log(res);
        let finaldata: any[] = [];
        for (let i = 0; i < res.length; i++) {
  
          this.service.getData("/crh/" + res[i].crh.id).subscribe((result: any) => {
            if(res[i].crh.criteriaName=="Criterion-V")
            {finaldata.push(
              {
                
                // user: result,
                approval: res[i]
              }
            );
            }
            if(!(i < res.length-1)) {
              this.process_quant(finaldata);
            }
          })
        
        }
      }, (err: any) => {
        alert(err.error?.message);
      });
  
    }, (err: any) => {
      console.warn(err);
    });
  
  }
  process_quant(data) {
    console.log("PP",data);
    const getPos:any = this.compute_quant(data);
        getPos.then((response: any) => {
          this.dataSource_quanT = new MatTableDataSource(
            JSON.parse(
              JSON.stringify(response)
            )
          );
          console.log(this.dataSource_quanT.data)
                  // this.dataSource_approval.paginator = this.paginator3;
              //  this.dataSource.sort = this.sort;
        });
  }
  async compute_quant(data: any) {
    return new Promise(resolve => {
              for (var i = 0; i < data.length; i++) {
                        data[i].pos = i + 1;
                        if (i == data.length - 1) {
                                  resolve(data);
                        }
              }
    });
  }
  
  viewdetailsL(element: any){const dialogRef = this.dialog.open(ViewCriteriaQuantitativeComponent ,{width: "85%",height: "86vh",panelClass: 'full-width-dialog', data: element.approval});
      dialogRef.afterClosed().subscribe((result : any) => {
         this.fetchCriQualN();
      });
  
      }
  
      editL(row){
        const dialogRef = this.dialog.open(EditCriquantitativeReportComponent,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data: row.approval});
        dialogRef.afterClosed().subscribe((result : any) => {
          this.fetchCriQual();
       });
      }
  
  






}


