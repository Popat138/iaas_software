import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { DownloadService } from '../download.service';
import { ServiceService } from '../service.service';
import { AddNewStreamDetailsComponent } from '../Addnew/add-new-stream-details/add-new-stream-details.component';
import { stream } from 'xlsx';
import { EditStreamDetailComponent } from '../edit/iqac/edit-stream-detail/edit-stream-detail.component';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-stream-details',
  templateUrl: './stream-details.component.html',
  styleUrls: ['./stream-details.component.scss']
})
export class StreamDetailsComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    public service: ServiceService,
    public download: DownloadService

  ) { }

  displayedColumns: string[] = [
    's_name',
     'class',
    // 'no_of_div',
     'divisons',
    //  'subjects',
    // 'intake_capacity',
    // 'upload_cert',
    'edit',
    'delete'


  ];
  committee : any = null;
    dataSource!:MatTableDataSource<StreamDetailsComponent>;
    @ViewChild('paginator') paginator!: MatPaginator;
  ngOnInit(): void {
    this.fetchData();
  }

  addstreamdetails(){
    const dialogRef = this.dialog.open(AddNewStreamDetailsComponent ,{width: "85%",height: "86vh",panelClass: 'full-width-dialog'});
    dialogRef.afterClosed().subscribe((result : any) => {
       this.fetchData();
    });
  }

  edit(row){
    const dialogRef = this.dialog.open(EditStreamDetailComponent,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data: row});
    dialogRef.afterClosed().subscribe((result : any) => {
      this.fetchData();
   });
  }

  concatDivisions(element: any) {
    return element.divisions.map(e => e.divisionName).join();
  }

  fetchData() {

    this.service.getData("/stream-detail").subscribe((res : any) => {
      console.log("res",res)
      const getPos:any = this.compute(res);
      getPos.then((response: any) => {
        this.dataSource = new MatTableDataSource(
          JSON.parse(
            JSON.stringify(response)
          )
        );
        console.log(this.dataSource.data);
                this.dataSource.paginator = this.paginator;
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
      this.service.deleteData('/stream-detail/'+row['id']).subscribe(response => {
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
