import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ServiceService } from 'src/app/service.service';
import { ViewDiplomaStudentDetailsComponent } from 'src/app/View/view-diploma-student-details/view-diploma-student-details.component';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-list-of-diploma-students',
  templateUrl: './list-of-diploma-students.component.html',
  styleUrls: ['./list-of-diploma-students.component.scss']
})
export class ListOfDiplomaStudentsComponent implements OnInit {
  committee : any =null;
  displayedColumns: string[] = ['year','name','type','ctype','view_student',
  // 'category',
 ];

  dataSource!:MatTableDataSource<ListOfDiplomaStudentsComponent>;
  
  @ViewChild('paginator') paginator!: MatPaginator;
  constructor(
    public dialog : MatDialog,
    public service : ServiceService

  ) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.fetchCommittee();
  }
  viewDiplomaStudent(element: any) {
    const dialogRef = this.dialog.open(ViewDiplomaStudentDetailsComponent ,{width: "80%",height: "86vh",panelClass: 'full-width-dialog', data : element});
    dialogRef.afterClosed().subscribe(result => {
      this.fetchCommittee();
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
      this.service.getData("/diploma-program/college/"+user.college.id).subscribe((res: any) => {
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




}
