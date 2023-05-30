import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ServiceService } from '../service.service';
import { NewStudentAwardComponent } from '../View/new-student-award/new-student-award.component';
import { AddTeachingPlanComponent } from '../Addnew/Teachers/add-teaching-plan/add-teaching-plan.component';
import { Router } from '@angular/router';
import { ViewTeachingPlanComponent } from '../View/view-teaching-plan/view-teaching-plan.component';
import { EditTeachingPlanComponent } from '../edit/teacher/edit-teaching-plan/edit-teaching-plan.component';
import { DownloadService } from '../download.service';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';



@Component({
  selector: 'app-teachingplan',
  templateUrl: './teachingplan.component.html',
  styleUrls: ['./teachingplan.component.scss']
})
export class TeachingplanComponent implements OnInit {


  committee: any = null;
  displayedColumns: string[] = ['a_year','sem','c_name', 'month', 'view', 'edit',
  'delete'];
  dataSource!:MatTableDataSource<TeachingplanComponent>;
  @ViewChild('paginator') paginator!: MatPaginator;


  constructor(

    public dialog : MatDialog,
    public service : ServiceService,
    public router: Router,
    public download: DownloadService

  ) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.fetchteachingplan();
  }

  addDetails(){}

  addNewteachingplan(){
    const dialogRef = this.dialog.open(AddTeachingPlanComponent ,{width: "80%",height: "86vh",panelClass: 'full-width-dialog', data : {"committeeId": 2}});
    dialogRef.afterClosed().subscribe(result => {
      this.fetchteachingplan();
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

  edit(row){
    const dialogRef = this.dialog.open(EditTeachingPlanComponent,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data: row});
    dialogRef.afterClosed().subscribe(result => {
      this.fetchteachingplan();
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
          this.service.deleteData('/teaching-plan/' + row['id']).subscribe(response => {
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



  fetchteachingplan() {
    this.service.getUserWithUserId().subscribe((user: any) => {
      this.service.getData("/teaching-plan/user/"+user.userId).subscribe((res: any) => {
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

                  this.dataSource.paginator = this.paginator;
              //  this.dataSource.sort = this.sort;
        });
      }, (err: any) => {
        console.warn("No committee available!!");
      })
    }, (err: any) => {
      alert("User authentication expired!!. Login again to continue.");
      this.router.navigateByUrl("");
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

  viewStudentAward(){
    const dialogRef = this.dialog.open(NewStudentAwardComponent ,{width: "70%",height: "86vh",panelClass: 'full-width-dialog'});
    dialogRef.afterClosed().subscribe(result => {
      this.fetchteachingplan();
    });
  }

  viewDetail(element : any) {
    const dialogRef = this.dialog.open(ViewTeachingPlanComponent ,{width: "70%",height: "86vh",panelClass: 'full-width-dialog', data: element});
    dialogRef.afterClosed().subscribe((result: any) => {
      this.fetchteachingplan();
    })
  }
  export(){
    var fileName = "Teaching Plan";
    // let data = this.download_data;
    let data: any = null;
    if(this.dataSource.filter != ""){
      data = this.dataSource.filteredData;
    }else{
      data = this.dataSource.data;
    }
    data = data.map((e)=>{
        return {
'Academic Year	':e.academicDetail?.academicYear,
'Semester':e.academicDetail?.course?.semester,
'	Course Name':e.academicDetail?.course?.name,
'Month':e.semester,


        }
    });
    this.download.exportAsExcelFile(data,fileName);
  }




}



  // export interface PeriodicElement {
  //   a_year:string;
  //   name_of_award: string;
  //   awarding_agency:string;
  //   nature:string;
  //   level: string;
  //   // n_students: number;
  //   // s_agency: string;

  // }

  // const ELEMENT_DATA: PeriodicElement[] = [
  //   {a_year:'2021',name_of_award:'Best Demo',awarding_agency:'Agency1', nature:'Gold medal' , level: 'National'},

  // ];
