import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ServiceService } from '../service.service';
import { AddLessonPlanComponent } from '../Addnew/Teachers/add-lesson-plan/add-lesson-plan.component';
import { EditLessonPlanComponent } from '../edit/teacher/edit-lesson-plan/edit-lesson-plan.component';
import { Router } from '@angular/router';
import { DownloadService } from '../download.service';
import { ViewLessonPlanComponent } from '../View/view-lesson-plan/view-lesson-plan.component';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-lesson-plan',
  templateUrl: './lesson-plan.component.html',
  styleUrls: ['./lesson-plan.component.scss']
})
export class LessonPlanComponent implements OnInit {
 committe:any=null;
 displayedColumn_less: string[] = ['a_year','programme','class','div','c_code','c_name','view','edit','delete'];
 dataSource!:MatTableDataSource<LessonPlanComponent>;
 @ViewChild('paginator') paginator!: MatPaginator;
  constructor(
    public dialog : MatDialog,
    public service : ServiceService,
    public router: Router,
    public download: DownloadService
  ) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.fetchlessonplan();
  }

  addNewLessonplan(){
    const dialogRef = this.dialog.open(AddLessonPlanComponent ,{width: "80%",height: "86vh",panelClass: 'full-width-dialog', data : {"committeeId": 2}});
    dialogRef.afterClosed().subscribe(result => {
      this.fetchlessonplan();
    });
  }
  
viewDetail(element){
  const dialogRef = this.dialog.open(ViewLessonPlanComponent ,{width: "80%",height: "86vh",panelClass: 'full-width-dialog', data: element});
    dialogRef.afterClosed().subscribe(result => {
      this.fetchlessonplan();
    });
}


  fetchlessonplan(){
    this.service.getUserWithUserId().subscribe((user: any) => {
      this.service.getData("/lesson-plan/user/"+user.userId).subscribe((res: any) => {
        const getPos:any = this.compute_les(res);
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
  async compute_les(data: any) {
    return new Promise(resolve => {
              for (var i = 0; i < data.length; i++) {
                        data[i].pos = i + 1;
                        if (i == data.length - 1) {
                                  resolve(data);
                        }
              }
    });
  }
///Edit update delete
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
  const dialogRef = this.dialog.open(EditLessonPlanComponent,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data: row});
  dialogRef.afterClosed().subscribe(result => {
    this.fetchlessonplan();
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
        this.service.deleteData('/lesson-plan/' + row['id']).subscribe(response => {
          
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


////

}
