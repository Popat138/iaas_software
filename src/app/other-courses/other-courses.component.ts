import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AddOtherCoursesComponent } from '../Addnew/Teachers/add-other-courses/add-other-courses.component';
import { ServiceDetailsComponent } from '../service-details/service-details.component';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-other-courses',
  templateUrl: './other-courses.component.html',
  styleUrls: ['./other-courses.component.scss']
})
export class OtherCoursesComponent implements OnInit {

  displayedColumns: string[] = ['academic_year','course_name','course_type'];

  constructor(
    private dialog: MatDialog,
    public service: ServiceService
  ) { }
  dataSource!:MatTableDataSource<OtherCoursesComponent>;

  ngOnInit(): void {
   // this.fetchData();
  }

  addothercourses(){
    const dialogRef = this.dialog.open(AddOtherCoursesComponent ,{width: "85%",height: "86vh",panelClass: 'full-width-dialog'});
    // dialogRef.afterClosed().subscribe((result : any) => {
    //    this.fetchData();
    //});


  }


  fetchData() {
    this.service.getData("/user/" + localStorage.getItem("userId")).subscribe((res: any) => {
      console.log(res);
      let userList: any[] = [];
      userList.push(res);

      const getPos:any = this.compute(userList);
      getPos.then((response: any) => {
        this.dataSource = new MatTableDataSource(
          JSON.parse(
            JSON.stringify(response)
          )
        );
        console.log(this.dataSource.data)
            //     this.dataSource.paginator = this.paginator;
            //  this.dataSource.sort = this.sort;
      });
    }, (err: any) => {
      alert("Error try again later!!!!!!!!");
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
