import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AddTeachingDetailsComponent } from '../Addnew/Teachers/add-teaching-details/add-teaching-details.component';
import { EditTeachingDetailsComponent } from '../edit/teacher/edit-teaching-details/edit-teaching-details.component';
import { ServiceDetailsComponent } from '../service-details/service-details.component';
import { ServiceService } from '../service.service';
import { ViewTeachingDetailsComponent } from '../View/view-teaching-details/view-teaching-details.component';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-teaching-details',
  templateUrl: './teaching-details.component.html',
  styleUrls: ['./teaching-details.component.scss']
})
export class TeachingDetailsComponent implements OnInit {

  teacher :any = null;

  displayedColumns: string[] = ['academic_year','teacher','ug_cources','edit','delete'];

  constructor(
    private dialog: MatDialog,
    public service: ServiceService
  ) { }
  dataSource!:MatTableDataSource<TeachingDetailsComponent>;

  ngOnInit(): void {
   this.fetchData();
  }

  addservicedetails(){
    const dialogRef = this.dialog.open(AddTeachingDetailsComponent ,{width: "85%",height: "86vh",panelClass: 'full-width-dialog', data: this.teacher});
    dialogRef.afterClosed().subscribe((result : any) => {
       this.fetchData();
    });
  }
  viewDetail(element : any) {
    const dialogRef = this.dialog.open(ViewTeachingDetailsComponent ,{width: "70%",height: "86vh",panelClass: 'full-width-dialog', data: element});
    dialogRef.afterClosed().subscribe((result: any) => {
      this.fetchData();
    })
  }
  edit(row){
    const dialogRef = this.dialog.open(EditTeachingDetailsComponent,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data: row});
    dialogRef.afterClosed().subscribe(result => {
      this.fetchData();
    });
  }
fetchteachingplan(){


}

  fetchData() {
    this.service.getUserWithUserId().subscribe((user: any) => {
      this.teacher = user.teacher;
      this.service.getData("/teaching-detail/teacher/" + user.teacher.teacherId).subscribe((res: any) => {
        console.log("res details",res)
        res.forEach((element,key) => {
          this.service.getData("/user/teacher/"+element.teacher.teacherId).subscribe((data:any)=>{

           res[key].user=data
           if(!(key < res.length-1)) {
             this.process(res);
           }           })
       });
       console.log("final teachet",res)
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
              //     this.dataSource.paginator = this.paginator;
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
          this.service.deleteData('/teaching-detail/' + row['id']).subscribe(response => {
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
