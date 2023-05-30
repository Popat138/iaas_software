import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { AddDiplomaComponent } from '../Addnew/Department/add-diploma/add-diploma.component';
import { EditDiplomaAndOtherCoursesComponent } from '../edit/Department/edit-diploma-and-other-courses/edit-diploma-and-other-courses.component';
import { ServiceService } from '../service.service';
import { ViewDiplomaStudentDetailsComponent } from '../View/view-diploma-student-details/view-diploma-student-details.component';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-diploma-and-other-courses',
  templateUrl: './diploma-and-other-courses.component.html',
  styleUrls: ['./diploma-and-other-courses.component.scss']
})
export class DiplomaAndOtherCoursesComponent implements OnInit {


  committee : any =null;
  displayedColumns: string[] = ['year','name','type','ctype','view_student',
  // 'category',
  'edit','delete'];

  dataSource!:MatTableDataSource<DiplomaAndOtherCoursesComponent>;
  @ViewChild('paginator') paginator!: MatPaginator;


  constructor(

    public dialog : MatDialog,
    public service : ServiceService

  ) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.fetchCommittee();
  }

  addDetails(){}

  addcourses(){
    const dialogRef = this.dialog.open(AddDiplomaComponent ,{width: "80%",height: "86vh",panelClass: 'full-width-dialog'});
    dialogRef.afterClosed().subscribe(result => {
      this.fetchCommittee();
    });
  }

  edit(row){
    const dialogRef = this.dialog.open(EditDiplomaAndOtherCoursesComponent,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data: row});
    dialogRef.afterClosed().subscribe(result => {
      this.fetchCommittee();
    });
  }

  viewDiplomaStudent(element: any) {
    const dialogRef = this.dialog.open(ViewDiplomaStudentDetailsComponent ,{width: "80%",height: "86vh",panelClass: 'full-width-dialog', data : element});
    dialogRef.afterClosed().subscribe(result => {
      this.fetchCommittee();
    });
  }
  delete(row){
    console.log(row);

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
      this.service.deleteData('/diploma-program/'+row['id']).subscribe(response => {
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


  fetchCommittee() {

    this.service.getUserWithUserId().subscribe((user: any) => {
      this.service.getData("/diploma-program/department/"+user.hod.department.id).subscribe((res: any) => {
        const getPos:any = this.compute(res);
        getPos.then((response: any) => {
                  this.dataSource = new MatTableDataSource(
                            JSON.parse(
                                      JSON.stringify(
                                                response
                                      )
                            )
  
                  );console.table(this.dataSource.data)
  
                  this.dataSource.paginator = this.paginator;
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
  export(){
//     var fileName = "Program";
//     // let data = this.download_data;
//     let data: any = null;
//     if(this.dataSource.filter != ""){
//       data = this.dataSource.filteredData;
//     }else{
//       data = this.dataSource.data;
//     }
//     data = data.map((e)=>{
//         return {
// 'Year':e.program.programName,
// 'Name of Students	':e.nameOfDept,
// 'Class':e.achievementLevel,
// 'Category':e.semester,

//         }
//     });
//     this.download.exportAsExcelFile(data,fileName);
  }





}



  export interface PeriodicElement {
    a_year:string;
    name_of_award: string;
    // awarding_agency:string;
    // level: string;
    // n_students: number;
    // s_agency: string;

  }

  // const ELEMENT_DATA: PeriodicElement[] = [
  //   {a_year:'2021',name_of_award:'Best Demo',awarding_agency:'Agency1', level: 'International'},

  // ];
