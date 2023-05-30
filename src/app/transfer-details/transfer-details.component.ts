import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AddTransferDetailsComponent } from '../Addnew/Teachers/add-transfer-details/add-transfer-details.component';
import { ServiceService } from '../service.service';
import Swal from 'sweetalert2';
import { EditTransferDetailComponent } from '../edit/teacher/edit-transfer-detail/edit-transfer-detail.component';
@Component({
  selector: 'app-transfer-details',
  templateUrl: './transfer-details.component.html',
  styleUrls: ['./transfer-details.component.scss']
})
export class TransferDetailsComponent implements OnInit {

  displayedColumns: string[] = ['teacher','date','transfer_order_no','transfer_form', 'transfer_to','document','edit','delete'];

  constructor(
    private dialog: MatDialog,
    public service: ServiceService
  ) { }
  dataSource!:MatTableDataSource<TransferDetailsComponent>;

  ngOnInit(): void {
   this.fetchData();
  }

  addtransferdetails(){
    const dialogRef = this.dialog.open(AddTransferDetailsComponent ,{width: "85%",height: "86vh",panelClass: 'full-width-dialog'});
    dialogRef.afterClosed().subscribe((result : any) => {
       this.fetchData();
    });


  }
  edit(row){
    const dialogRef = this.dialog.open(EditTransferDetailComponent,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data: row});
    dialogRef.afterClosed().subscribe((result: any) => {
      this.fetchData();
    });
  }

  fetchData() {
    this.service.getUserWithUserId().subscribe((user: any) => {
      this.service.getData("/teacher-transfer/teacher/" + user.teacher.teacherId).subscribe((res: any) => {
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

 //Delete appointment
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
      this.service.deleteData('/teacher-transfer/'+row['id']).subscribe(response => {
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




  //End of appointment delete
  
}
