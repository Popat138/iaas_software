import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { AddNewRollCallDataComponent } from '../Addnew/add-new-roll-call-data/add-new-roll-call-data.component';
import { EditRollCallDataComponent } from '../edit/Office/edit-roll-call-data/edit-roll-call-data.component';
import { ServiceService } from '../service.service';
import { ViewRollCallListComponent } from '../View/view-roll-call-list/view-roll-call-list.component';

@Component({
  selector: 'app-roll-call-data',
  templateUrl: './roll-call-data.component.html',
  styleUrls: ['./roll-call-data.component.scss']
})
export class RollCallDataComponent implements OnInit {

  constructor(

    public dialog : MatDialog,
    private service : ServiceService

  ) { }

  displayedColumns: string[] = [
  'firstname',
  'middlename', 'lastname', 'email', 'phone' ,'delete'
];
  studentData : any = null;
  dataSource!:MatTableDataSource<RollCallDataComponent>;

  ngOnInit(): void {

    this.dataSource = new MatTableDataSource();
    this.fetchAluminiData();

  }

  fetchAluminiData() {
    this.service.getUserWithUserId().subscribe((user: any) => {
      this.service.getData("/user/role/Alumini/college/" + user.college.id).subscribe((res: any) => {
        const getPos:any = this.compute(res);
        getPos.then((response: any) => {
                  this.dataSource = new MatTableDataSource(
                            JSON.parse(
                                      JSON.stringify(
                                                response
                                      )
                            )
  
                  );
                  console.table(this.dataSource.data)
              //     this.dataSource.paginator = this.paginator;
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


edit(row){
  const dialogRef = this.dialog.open(EditRollCallDataComponent,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data: row});
}


delete(row){
  // console.log(row);
  // if(confirm("Do you want to delete this user ?")) {


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
    this.service.deleteData('/user/'+row['userId']).subscribe(response => {
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
  addNewAluminiData(){

     const dialogRef = this.dialog.open(AddNewRollCallDataComponent ,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data : {"committeeId":2}});
    // const dialogRef = this.dialog.open(AddNewStudentDataComponent ,{width: "70%",height: "86vh",panelClass: 'full-width-dialog'});
    dialogRef.afterClosed().subscribe((result: any) => {
      this.fetchAluminiData();
    });
  }

  rollcalllist(rowData : any){
    const dialogRef = this.dialog.open(ViewRollCallListComponent ,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data : rowData});
    dialogRef.afterClosed().subscribe((result: any) => {
      this.fetchAluminiData();
    });
  }

}
