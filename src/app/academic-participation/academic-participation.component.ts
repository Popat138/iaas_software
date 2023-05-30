import { Component, OnInit, ViewChild } from '@angular/core';
import { AddAcademicParticipationComponent } from '../Addnew/Teachers/add-academic-participation/add-academic-participation.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { ServiceService } from '../service.service';
import { EditAcademicBodyParticipationComponent } from '../edit/teacher/edit-academic-body-participation/edit-academic-body-participation.component';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-academic-participation',
  templateUrl: './academic-participation.component.html',
  styleUrls: ['./academic-participation.component.scss']
})
export class AcademicParticipationComponent implements OnInit {
  displayedColumns: string[] = ['academic_year','academic_body','university','member_type','period','upload_cert','examination','univer_college','subject','upload_letter','edit','delete'];
  constructor(
    private dialog: MatDialog,
    public service: ServiceService
  ) { }
  dataSource!:MatTableDataSource<AcademicParticipationComponent>;
  @ViewChild('paginator') paginator!: MatPaginator;
  ngOnInit(): void {
    this.fetchData();
  }


  addfacultyprogram(){
    const dialogRef = this.dialog.open(AddAcademicParticipationComponent ,{width: "85%",height: "86vh",panelClass: 'full-width-dialog'});
    dialogRef.afterClosed().subscribe((result : any) => {
       this.fetchData();
    });
  }

  edit(row){
    const dialogRef = this.dialog.open(EditAcademicBodyParticipationComponent,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data: row});
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
      this.service.deleteData('/academic-participation'+row['id']).subscribe(response => {
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
  fetchData() {
    this.service.getUserWithUserId().subscribe((user: any) => {
      this.service.getData("/academic-participation/teacher/" + user.teacher.teacherId).subscribe((res: any) => {
        console.log(res);
        this.process(res);
        // res.forEach((element,key) => {
        //    this.service.getData("/user/teacher/"+element.teacher.teacherId).subscribe((data:any)=>{

        //     res[key].user=data
        //     if(!(key < res.length-1)) {
        //       this.process(res);
        //     }           })
        // });
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
            response
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

  // applyFilter(event: any) {
  //   this.dataSource.filterPredicate = (data: any, filter) => {
  //     const dataStr =JSON.stringify(data).toLowerCase();
  //     return dataStr.indexOf(filter) != -1;
  //   }
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   };
  // }


}
  // applyFilter(event: any) {
  //   this.dataSource.filterPredicate = (data: any, filter) => {
  //     const dataStr =JSON.stringify(data).toLowerCase();
  //     return dataStr.indexOf(filter) != -1;
  //   }
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  



 



