import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { AddFacultyDevelopmentProgramsComponent } from '../Addnew/Teachers/add-faculty-development-programs/add-faculty-development-programs.component';
import { EditFacultyDevelopmentProgramComponent } from '../edit/teacher/edit-faculty-development-program/edit-faculty-development-program.component';
// import { EditDevelopmentProgrammeComponent } from '../edit/Department/edit-development-programme/edit-development-programme.component';
import { ServiceDetailsComponent } from '../service-details/service-details.component';
import { ServiceService } from '../service.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-faculty-development-program',
  templateUrl: './faculty-development-program.component.html',
  styleUrls: ['./faculty-development-program.component.scss']
})
export class FacultyDevelopmentProgramComponent implements OnInit {
  displayedColumns: string[] = ['academic_year','teacher','type','course_title','course_place','duration','upload_cert','edit','delete'];

  constructor(
    private dialog: MatDialog,
    public service: ServiceService
  ) { }
  dataSource!:MatTableDataSource<FacultyDevelopmentProgramComponent>;
  @ViewChild('paginator') paginator!: MatPaginator;
  ngOnInit(): void {
   this.fetchData();
  }

  addfacultyprogram(){
    const dialogRef = this.dialog.open(AddFacultyDevelopmentProgramsComponent ,{width: "85%",height: "86vh",panelClass: 'full-width-dialog'});
    dialogRef.afterClosed().subscribe((result : any) => {
       this.fetchData();
    });
  }

  edit(row){
    const dialogRef = this.dialog.open(EditFacultyDevelopmentProgramComponent,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data: row});
    dialogRef.afterClosed().subscribe((result : any) => {
      this.fetchData();
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
      this.service.deleteData('/faculty-program/'+row['id']).subscribe(response => {
        this.ngOnInit();
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
//Fetch FDP Data
  fetchData() {
    this.service.getUserWithUserId().subscribe((user: any) => {
      this.service.getData("/faculty-program/teacher/" + user.teacher.teacherId).subscribe((res: any) => {
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
          this.dataSource = new MatTableDataSource(
            JSON.parse(
              JSON.stringify(response)
            )
          );
          console.log(this.dataSource.data)
                  this.dataSource.paginator = this.paginator;
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
}
  // export interface PeriodicElement {
  //   f_Name:string;
  //   Name: string;
  //   l_Name:string;
  //   DOB: string;
  //   Addhar_no: number;
  //   Pancard_no: string;

  // }

  // const ELEMENT_DATA: PeriodicElement[] = [
  //   {f_Name:'This',Name:'Test',l_Name:'Complete', DOB: '1/10/2002', Addhar_no: 9876543210, Pancard_no: '123456',},

  // ];
