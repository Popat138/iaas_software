import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { AddNewCriteriaComponent } from '../Addnew/add-new-criteria/add-new-criteria.component';
import { DownloadService } from '../download.service';
import { EditCreateCriteriaComponent } from '../edit/iqac/edit-create-criteria/edit-create-criteria.component';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-create-criteria',
  templateUrl: './create-criteria.component.html',
  styleUrls: ['./create-criteria.component.scss']
})
export class CreateCriteriaComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    public service: ServiceService,
    public download: DownloadService

  ) { }
displayedColumns: string[] = [
    'dept_name',
    'crh_name',
    'crh_email',
    'crh_paswd',
    'edit',
    'delete'
       ];
       committee:any=null;
       dataSource!:MatTableDataSource<CreateCriteriaComponent>;
  ngOnInit(): void {
    this.fetchData();
  }
createdepartment(){
    const dialogRef = this.dialog.open(AddNewCriteriaComponent ,{width: "100vw",height: "90vh",panelClass: 'full-width-dialog'});
    dialogRef.afterClosed().subscribe((result : any) => {
       this.fetchData();
    });
  }
 fetchData() {

    this.service.getData("/user/role/Crh/college/" + 1).subscribe((res : any) => {
      const getPos:any = this.compute(res);
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
      console.warn(err);
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
  edit(row){
    const dialogRef = this.dialog.open(EditCreateCriteriaComponent,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data: row});
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
      this.service.deleteData('/crh/'+row.crh.id).subscribe(response => {
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
