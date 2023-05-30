import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AddCourseOutcomeMappingComponent } from '../Addnew/add-course-outcome-mapping/add-course-outcome-mapping.component';
import { CoPoAttainmentComponent } from '../edit/teacher/co-po-attainment/co-po-attainment.component';
import { ServiceService } from '../service.service';
import { ViewCourseOutcomeMappingComponent } from '../View/view-course-outcome-mapping/view-course-outcome-mapping.component';
import { ViewCoPoMappingComponent } from '../View/view-co-po-mapping/view-co-po-mapping.component';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-course-outcome-mapping',
  templateUrl: './course-outcome-mapping.component.html',
  styleUrls: ['./course-outcome-mapping.component.scss']
})
export class CourseOutcomeMappingComponent implements OnInit {

  displayedColumns: string[] = ['a_year','year','sem','class','div','c_name', 'view', 
  'edit',
  'delete'
];
  dataSource!:MatTableDataSource<CourseOutcomeMappingComponent>;
  @ViewChild('paginator') paginator!: MatPaginator;
  constructor(
    public dialog : MatDialog,
    public service : ServiceService,
    public router: Router

  ) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.fetchteachingplan();
  }

  addCoPoMapping(){
    const dialogRef = this.dialog.open(AddCourseOutcomeMappingComponent ,{width: "80%",height: "86vh",panelClass: 'full-width-dialog'});
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


  fetchteachingplan() {
    this.service.getUserWithUserId().subscribe((user: any) => {
      this.service.getData("/course-outcome-mapping/user/"+user.userId).subscribe((res: any) => {
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
        alert("No CO - PO Mapping available!!");
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

  viewDetail(element : any) {
    const dialogRef = this.dialog.open(ViewCourseOutcomeMappingComponent ,{width: "70%",height: "86vh",panelClass: 'full-width-dialog', data: element});
    dialogRef.afterClosed().subscribe((result: any) => {
      this.fetchteachingplan();
    })
  }
  viewDetails(element : any) {
    const dialogRef = this.dialog.open(ViewCoPoMappingComponent ,{width: "70%",height: "86vh",panelClass: 'full-width-dialog', data: element});
    dialogRef.afterClosed().subscribe((result: any) => {
      this.fetchteachingplan();
    })
  }

  edit(row) {
    const dialogRef = this.dialog.open(CoPoAttainmentComponent ,{width: "80%",height: "86vh",panelClass: 'full-width-dialog', data: row});
    dialogRef.afterClosed().subscribe(result => {
      this.fetchteachingplan();
    });
  }

  delete(row) {
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
      this.service.deleteData('/course-outcome-mapping/'+row['id']).subscribe(response => {
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

}
