import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AddOneTimeFormComponent } from 'src/app/Addnew/Teachers/add-one-time-form/add-one-time-form.component';
import { ServiceService } from 'src/app/service.service';
import { ViewOneTimeFormComponent } from 'src/app/View/view-one-time-form/view-one-time-form.component';
import { MatPaginator } from '@angular/material/paginator';
import { ViewBiodataComponent } from 'src/app/View/view-biodata/view-biodata.component';
import { ViewBiodataiqacComponent } from 'src/app/View/view-biodataiqac/view-biodataiqac.component';

@Component({
  selector: 'app-list-of-teacher-info',
  templateUrl: './list-of-teacher-info.component.html',
  styleUrls: ['./list-of-teacher-info.component.scss']
})
export class ListOfTeacherInfoComponent implements OnInit {


  displayedColumns: string[] = ['f_Name','qualification','DOB', 'Addhar_no','Pancard_no','view','view_bio' ];

  constructor(
    private dialog: MatDialog,
    public service: ServiceService
  ) { }
  dataSource!:MatTableDataSource<ListOfTeacherInfoComponent>;
  
  @ViewChild('paginator') paginator!: MatPaginator;

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
   this.fetchData();

  }

  addonetimeform(){
    const dialogRef = this.dialog.open(AddOneTimeFormComponent ,{width: "85%",height: "86vh",panelClass: 'full-width-dialog'});
    dialogRef.afterClosed().subscribe((result : any) => {
       this.fetchData();
    });
  }
biodata(element:any){
  const dialogRef1 = this.dialog.open(ViewBiodataiqacComponent ,{width: "85%",height: "86vh",panelClass: 'full-width-dialog', data : element});
  dialogRef1.afterClosed().subscribe((result : any) => {
     this.fetchData();
  });

}
  viewDetail(element : any) {
    const dialogRef1 = this.dialog.open(ViewOneTimeFormComponent ,{width: "85%",height: "86vh",panelClass: 'full-width-dialog', data : element});
    dialogRef1.afterClosed().subscribe((result : any) => {
       this.fetchData();
    });
  }

  fetchData() {
    this.service.getUserWithUserId().subscribe((user : any) => {
      this.service.getData("/user/role/Teacher/college/" + user.college.id).subscribe((res: any) => {
        const getPos:any = this.compute(res);
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
      }, (err: any) => {
        alert("Error try again later!!!!!!!!");
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
