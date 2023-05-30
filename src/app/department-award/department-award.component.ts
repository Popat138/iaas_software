import { HttpClient } from '@angular/common/http';
import { Component, OnInit,Inject, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AddNewRecognitionsComponent } from '../Addnew/add-new-recognitions/add-new-recognitions.component';
import { ServiceService } from '../service.service';
import { AddNewDepartmentAwardComponent } from '../Addnew/add-new-department-award/add-new-department-award.component';
import { AddResultsUgComponent } from '../Addnew/Department/add-results-ug/add-results-ug.component';
import { AddResultsPgComponent } from '../Addnew/Department/add-results-pg/add-results-pg.component';
import { AddHigherEducationComponent } from '../Addnew/Department/add-higher-education/add-higher-education.component';
import { AddPlacementDetailsComponent } from '../Addnew/Department/add-placement-details/add-placement-details.component';
import { AddCompetativeExamsComponent } from '../Addnew/Department/add-competative-exams/add-competative-exams.component';
import { AddInternshipDetailsComponent } from '../Addnew/Department/add-internship-details/add-internship-details';
import { EditAwardComponent } from '../edit/Department/edit-award/edit-award.component';
import { EditResultUgComponent } from '../edit/Department/edit-result-ug/edit-result-ug.component';
import { EditResultPgComponent } from '../edit/Department/edit-result-pg/edit-result-pg.component';
import { EditHigherEduComponent } from '../edit/Department/edit-higher-edu/edit-higher-edu.component';
import { EditPlacementComponent } from '../edit/Department/edit-placement/edit-placement.component';
import { EditComponentComponent } from '../edit/Department/edit-component/edit-component.component';
import { EditInternshipComponent } from '../edit/Department/edit-internship/edit-internship.component';
import Swal from 'sweetalert2';
import { SelectProgramByDepartmentIdComponent } from '../common/select-program-by-department-id/select-program-by-department-id.component';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-department-award',
  templateUrl: './department-award.component.html',
  styleUrls: ['./department-award.component.scss']
})


export class DepartmentAwardComponent implements OnInit {


  committee : any =null;
  displayedColumns: string[] = ['a_year','name_of_student','name_of_award','achievementNature','awarding_agency', 'level','report','edit','delete'];
  displayedColumns1: string[] = ['year','prog_name','students_addmitted','students_appear','students_pass','edit_resultug','delete_resultug'];
  displayedColumns2: string[] =['year','prog_name','students_addmitted','students_appear','students_pass','edit_resultpg','delete_resultpg'];
  displayedColumns3: string[] = ['year','name_of_student','program','admmission_to_prog','name_of_institute','report_upload','edit_higheredu','delete_higheredu'];
  displayedColumns4: string[] = ['year','programme','prog_code','name_of_student','student_contact','job_title','details_of_organization','pay_package','report_upload','edit_placement','delete_placement'];

  displayedColumns5: string[] = ['year','reg_no','name_of_student','qualifying_exam','date', 'name_of_org','report_upload','edit_competative','delete_competative'];
  displayedColumns6: string[] = ['year','program', 'program_code', 'course','course_code','name_of_student','job_title','details_of_org','report_upload','edit_internship','delete_internship'];
  department : any = null;
  dataSource!:MatTableDataSource<DepartmentAwardComponent>;
  resultsug_dataSource!:MatTableDataSource<DepartmentAwardComponent>;
  resultspg_dataSource!:MatTableDataSource<DepartmentAwardComponent>;
  higher_edu_dataSource!:MatTableDataSource<DepartmentAwardComponent>;
  placement_dataSource!:MatTableDataSource<DepartmentAwardComponent>;
  competative_dataSource!:MatTableDataSource<DepartmentAwardComponent>;
  internship_dataSource!: MatTableDataSource<DepartmentAwardComponent>;
  @ViewChild('paginator1') paginator1: MatPaginator;
  @ViewChild('paginator2') paginator2: MatPaginator;
  @ViewChild('paginator3') paginator3: MatPaginator;
  @ViewChild('paginator4') paginator4: MatPaginator;
  @ViewChild('paginator5') paginator5: MatPaginator;
  @ViewChild('paginator6') paginator6: MatPaginator;
  @ViewChild('paginator7') paginator7: MatPaginator;

  constructor(

    public dialog : MatDialog,
    public service : ServiceService

  ) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.resultsug_dataSource = new MatTableDataSource();
    this.resultspg_dataSource = new MatTableDataSource();
    this.higher_edu_dataSource = new MatTableDataSource();
    this.placement_dataSource = new MatTableDataSource();
    this.competative_dataSource = new MatTableDataSource();
    this.internship_dataSource = new MatTableDataSource();
    this.service.getData("/user/" + localStorage.getItem("userId")).subscribe((res: any) =>  {
      this.department = res.hod.department;
      this.fetchCommittee();
      this.fetchUGResult();
      this.fetchPGResult();
      this.fetchHigherEducation();
      this.fetchPlacementDetails();
      this.fetchCompetitiveExam();
      this.fetchInternshipDetails();
    });
  }

  addDetails(){}


  edit(row){
    const dialogRef = this.dialog.open(EditAwardComponent,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data: row});
    dialogRef.afterClosed().subscribe((result: any) => {
      this.fetchCommittee();
    });
  }

  edit_resultug(row){
    const dialogRef = this.dialog.open(EditResultUgComponent,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data: row});
    dialogRef.afterClosed().subscribe((result: any) => {
      this.fetchUGResult();
    });
  }

  edit_resultpg(row){
    const dialogRef = this.dialog.open(EditResultPgComponent,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data: row});
    dialogRef.afterClosed().subscribe((result: any) => {
      this.fetchPGResult();
    });
  }

  edit_higheredu(row){
    const dialogRef = this.dialog.open(EditHigherEduComponent,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data: row});
    dialogRef.afterClosed().subscribe((result: any) => {
      this.fetchHigherEducation();
    });
  }

  edit_placement(row){
    const dialogRef = this.dialog.open(EditPlacementComponent,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data: row});
    dialogRef.afterClosed().subscribe((result: any) => {
      this.fetchPlacementDetails();
    });
  }

  edit_competative(row){
    const dialogRef = this.dialog.open(EditComponentComponent,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data: row});
    dialogRef.afterClosed().subscribe((result: any) => {
      this.fetchCompetitiveExam();
    });
  }

  edit_internship(row){
    const dialogRef = this.dialog.open(EditInternshipComponent,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data: row});
    dialogRef.afterClosed().subscribe((result: any) => {
      this.fetchInternshipDetails();
    });
  }

  delete(row){
    // console.log(row);

      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
      this.service.deleteData('/achievement/'+row['id']).subscribe(response => {
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
  }
  });


  }

  delete_resultug(row){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
    this.service.deleteData('/ug-result/'+row['id']).subscribe(response => {
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
}
});

  }

  delete_resultpg(row){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
    this.service.deleteData('/pg-result/'+row['id']).subscribe(response => {
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
}
});
  }


  delete_higheredu(row){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
    this.service.deleteData('/higher-education/'+row['id']).subscribe(response => {
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
}
});
    
  }

  delete_placement(row){

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
    this.service.deleteData('/placement-detail/'+row['id']).subscribe(response => {
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
}
});
  }

  delete_competative(row){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
    this.service.deleteData('/competitive-exam/'+row['id']).subscribe(response => {
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
}
});
  }
  delete_internship(row){

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
    this.service.deleteData('/internship-detail/'+row['id']).subscribe(response => {
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
}
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

  viewDepartmentAward(){

  }

  addNewdepartmentAward(){

    const dialogRef = this.dialog.open(AddNewDepartmentAwardComponent ,{width: "80%",height: "86vh",panelClass: 'full-width-dialog', data : this.department});
    dialogRef.afterClosed().subscribe(result => {
      this.fetchCommittee();
    });
  }

  addNewdResultsUg(){

    const dialogRef = this.dialog.open(AddResultsUgComponent ,{width: "80%",height: "86vh",panelClass: 'full-width-dialog', data : this.department});
    dialogRef.afterClosed().subscribe(result => {
      this.fetchUGResult();
    });
  }

  addNewdResultsPg(){

    const dialogRef = this.dialog.open(AddResultsPgComponent ,{width: "80%",height: "86vh",panelClass: 'full-width-dialog', data : this.department});
    dialogRef.afterClosed().subscribe(result => {
      this.fetchPGResult();
    });
  }

  addNewHigherEducation(){

    const dialogRef = this.dialog.open(AddHigherEducationComponent ,{width: "80%",height: "86vh",panelClass: 'full-width-dialog', data : this.department});
    dialogRef.afterClosed().subscribe(result => {
      this.fetchHigherEducation();
    });
  }

  addNewPlacementDetails(){

    const dialogRef = this.dialog.open(AddPlacementDetailsComponent ,{width: "80%",height: "86vh",panelClass: 'full-width-dialog', data : this.department});
    dialogRef.afterClosed().subscribe(result => {
      this.fetchPlacementDetails();
    });
  }

  addNewCompetativeExams(){

    const dialogRef = this.dialog.open(AddCompetativeExamsComponent ,{width: "80%",height: "86vh",panelClass: 'full-width-dialog', data : this.department});
    dialogRef.afterClosed().subscribe(result => {
      this.fetchCompetitiveExam();
    });
  }

  addNewInternshipDetails(){

    const dialogRef = this.dialog.open(AddInternshipDetailsComponent ,{width: "80%",height: "86vh",panelClass: 'full-width-dialog', data : this.department});
    dialogRef.afterClosed().subscribe(result => {
      this.fetchInternshipDetails();
    });
  }

  fetchCommittee() {

    
    this.service.getData("/department/"+this.department.id).subscribe((res: any) => {
      this.committee = res;
      let achievement = res.achievements;
      const getPos:any = this.compute(achievement);
      getPos.then((response: any) => {
                this.dataSource = new MatTableDataSource(
                          JSON.parse(
                                    JSON.stringify(
                                              response
                                    )
                          )

                );console.table(this.dataSource.data)

                this.dataSource.paginator = this.paginator1;
            //  this.dataSource.sort = this.sort;
      });
    }, (err: any) => {
      console.warn("No committee available!!");
    })

  }

  fetchUGResult() {
    this.service.getData("/ug-result/department/"+this.department.id).subscribe((res: any) => {
      const getPos:any = this.compute(res);
      getPos.then((response: any) => {
                this.resultsug_dataSource = new MatTableDataSource(
                          JSON.parse(
                                    JSON.stringify(
                                              response
                                    )
                          )

                );console.log(this.resultsug_dataSource.data)

                this.resultsug_dataSource.paginator = this.paginator2;
            //  this.dataSource.sort = this.sort;
      });
    }, (err: any) => {
      console.warn("No committee available!!");
    })

  }
///
applyFilter_ug(event: any) {
  this.resultsug_dataSource.filterPredicate = (data: any, filter) => {
    const dataStr =JSON.stringify(data).toLowerCase();
    return dataStr.indexOf(filter) != -1;
  }
  const filterValue = (event.target as HTMLInputElement).value;
  this.resultsug_dataSource.filter = filterValue.trim().toLowerCase();
  if (this.resultsug_dataSource.paginator) {
    this.resultsug_dataSource.paginator.firstPage();
  }
}

///
  fetchPGResult() {
    this.service.getData("/pg-result/department/"+this.department.id).subscribe((res: any) => {
      const getPos:any = this.compute(res);
      getPos.then((response: any) => {
                this.resultspg_dataSource = new MatTableDataSource(
                          JSON.parse(
                                    JSON.stringify(
                                              response
                                    )
                          )

                );console.log(this.resultspg_dataSource.data)

                this.resultspg_dataSource.paginator = this.paginator3;
            //  this.dataSource.sort = this.sort;
      });
    }, (err: any) => {
      console.warn("No committee available!!");
    })

  }
  /////
  applyFilter_pg(event: any) {
    this.resultspg_dataSource.filterPredicate = (data: any, filter) => {
      const dataStr =JSON.stringify(data).toLowerCase();
      return dataStr.indexOf(filter) != -1;
    }
    const filterValue = (event.target as HTMLInputElement).value;
    this.resultspg_dataSource.filter = filterValue.trim().toLowerCase();
    if (this.resultspg_dataSource.paginator) {
      this.resultspg_dataSource.paginator.firstPage();
    }
  }

  ////

  fetchHigherEducation() {
    this.service.getData("/higher-education/department/"+this.department.id).subscribe((res: any) => {
      const getPos:any = this.compute(res);
      getPos.then((response: any) => {
                this.higher_edu_dataSource = new MatTableDataSource(
                          JSON.parse(
                                    JSON.stringify(
                                              response
                                    )
                          )

                );console.log(this.higher_edu_dataSource.data)

                this.higher_edu_dataSource.paginator = this.paginator4;
            //  this.dataSource.sort = this.sort;
      });
    }, (err: any) => {
      console.warn("No committee available!!");
    })
  }
  ////
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

  ///

  fetchPlacementDetails() {
    this.service.getData("/placement-detail/department/"+this.department.id).subscribe((res: any) => {
      const getPos:any = this.compute(res);
      getPos.then((response: any) => {
                this.placement_dataSource = new MatTableDataSource(
                          JSON.parse(
                                    JSON.stringify(
                                              response
                                    )
                          )

                );console.log(this.placement_dataSource.data)

                this.placement_dataSource.paginator = this.paginator5;
            //  this.dataSource.sort = this.sort;
      });
    }, (err: any) => {
      console.warn("No committee available!!");
    })
  }
////
applyFilter_place(event: any) {
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
///
  fetchCompetitiveExam() {
    this.service.getData("/competitive-exam/department/"+this.department.id).subscribe((res: any) => {
      const getPos:any = this.compute(res);
      console.log("res",res)
      getPos.then((response: any) => {
                this.competative_dataSource = new MatTableDataSource(
                          JSON.parse(
                                    JSON.stringify(
                                              response
                                    )
                          )

                );console.log(this.competative_dataSource.data)

                this.competative_dataSource.paginator = this.paginator6;
            //  this.dataSource.sort = this.sort;
      });
    }, (err: any) => {
      console.warn("No committee available!!");
    })
  }
////
applyFilter_comp(event: any) {
  this.competative_dataSource.filterPredicate = (data: any, filter) => {
    const dataStr =JSON.stringify(data).toLowerCase();
    return dataStr.indexOf(filter) != -1;
  }
  const filterValue = (event.target as HTMLInputElement).value;
  this.competative_dataSource.filter = filterValue.trim().toLowerCase();
  if (this.competative_dataSource.paginator) {
    this.competative_dataSource.paginator.firstPage();
  }
}
///
  fetchInternshipDetails() {
    this.service.getData("/internship-detail/department/"+this.department.id).subscribe((res: any) => {
      const getPos:any = this.compute(res);
      getPos.then((response: any) => {
                this.internship_dataSource = new MatTableDataSource(
                          JSON.parse(
                                    JSON.stringify(
                                              response
                                    )
                          )

                );console.log(this.internship_dataSource.data)

                this.internship_dataSource.paginator = this.paginator7;
            //  this.dataSource.sort = this.sort;
      });
    }, (err: any) => {
      console.warn("No committee available!!");
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
///
applyFilter_intern(event: any) {
  this.internship_dataSource.filterPredicate = (data: any, filter) => {
    const dataStr =JSON.stringify(data).toLowerCase();
    return dataStr.indexOf(filter) != -1;
  }
  const filterValue = (event.target as HTMLInputElement).value;
  this.internship_dataSource.filter = filterValue.trim().toLowerCase();
  if (this.internship_dataSource.paginator) {
    this.internship_dataSource.paginator.firstPage();
  }
}
/////
  viewAchievements(){
    const dialogRef = this.dialog.open(AddNewDepartmentAwardComponent ,{width: "70%",height: "86vh",panelClass: 'full-width-dialog'});
  }

}



  export interface PeriodicElement {
    a_year:string;
    name_of_award: string;
    awarding_agency:string;
    level: string;

    // n_students: number;
    // s_agency: string;

  }

  const ELEMENT_DATA: PeriodicElement[] = [
    {a_year:'2021',name_of_award:'Best Demo',awarding_agency:'Agency1', level: 'International'},

  ];

