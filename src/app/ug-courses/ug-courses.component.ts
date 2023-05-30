import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { AddDepartmenetDetailsComponent } from '../Addnew/Department/add-departmenet-details/add-departmenet-details.component';
import { AddUgCoursesComponent } from '../Addnew/Department/add-ug-courses/add-ug-courses.component';
import { DownloadService } from '../download.service';
import { EditUgCoursesComponent } from '../edit/Department/edit-ug-courses/edit-ug-courses.component';
import { ServiceService } from '../service.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-ug-courses',
  templateUrl: './ug-courses.component.html',
  styleUrls: ['./ug-courses.component.scss']
})
export class UgCoursesComponent implements OnInit {

  committee : any =null;
  displayedColumns: string[] = ['ug_prog','code','year','sem','c_code','c_name','year_of_intro','prog_type','edit','delete'];

  dataSource!:MatTableDataSource<UgCoursesComponent>;
  @ViewChild('paginator') paginator!: MatPaginator;



  constructor(

    public dialog : MatDialog,
    public service : ServiceService,
    public download: DownloadService

  ) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.fetchCommittee();
  }

  addDetails(){}

  addugcourses(){
    const dialogRef = this.dialog.open(AddUgCoursesComponent ,{width: "80%",height: "86vh",panelClass: 'full-width-dialog'});
    dialogRef.afterClosed().subscribe(result => {
      this.fetchCommittee();
    });
  }


  edit(row){
    const dialogRef = this.dialog.open(EditUgCoursesComponent,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data: row});
    dialogRef.afterClosed().subscribe(result => {
      this.fetchCommittee();
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
      this.service.deleteData('/course/'+row['courseId']).subscribe(response => {
        location.reload();
    },err => {
      console.log(err);
      if(err.status == 409){
        Swal.fire({
          title: "Course cannot be deleted",
          text: "Course entry already exist in some other entry!!",
          icon: 'warning'
        });
      }
    });
  }
  });


  }



  applyFilter(event: any) {
    // this.dataSource.filterPredicate = (data: any, filter) => {
    //   const dataStr =JSON.stringify(data).toLowerCase();
    //   return dataStr.indexOf(filter) != -1;
    // }
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  fetchCommittee() {


    this.service.getUserWithUserId().subscribe((user : any) => {
      console.log(user);
      this.service.getData("/course/programLevel/Undergraduate/department/" + user.hod.department.id).subscribe((res: any) => {
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
    }, (err : any) => {
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

  // viewAchievements(){
  //   const dialogRef = this.dialog.open(NewDetailsComponent ,{width: "70%",height: "86vh",panelClass: 'full-width-dialog'});
  // }


  export(){
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
