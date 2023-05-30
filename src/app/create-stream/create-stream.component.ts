import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ServiceService } from '../service.service';
import { DownloadService } from '../download.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AddNewStreamComponent } from '../Addnew/add-new-stream/add-new-stream.component';
import { TestreportComponent } from '../testreport/testreport.component';

@Component({
  selector: 'app-create-stream',
  templateUrl: './create-stream.component.html',
  styleUrls: ['./create-stream.component.scss']
})
export class CreateStreamComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    public service: ServiceService,
    public download: DownloadService
  ) { }
  
  
  displayedColumns: string[] = [
    's_name',
    
    'establish_year',
   
    // 'edit',
    'delete'
   ];
    committee : any = null;
    dataSource!:MatTableDataSource<CreateStreamComponent>;
  
  ngOnInit(): void {
    this.fetchData();
  }
  
  createstream(){
    const dialogRef = this.dialog.open(AddNewStreamComponent ,{width: "100vw",height: "90vh",panelClass: 'full-width-dialog'});
    dialogRef.afterClosed().subscribe((result : any) => {
       this.fetchData();
    });
  }
  
  fetchData() {
  
    this.service.getData("/stream").subscribe((res : any) => {
      console.log("res",res)
      const getPos:any = this.compute(res);
      getPos.then((response: any) => {
        this.dataSource = new MatTableDataSource(
          JSON.parse(
            JSON.stringify(response)
          )
        );
        console.log(this.dataSource.data)
          // this.dataSource.paginator = this.paginator;
           //this.dataSource.sort = this.sort;
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
  
  edit(row){
    const dialogRef = this.dialog.open(AddNewStreamComponent,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data: row});
    dialogRef.afterClosed().subscribe((result : any) => {
      this.fetchData();
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
      this.service.deleteData('/stream/'+row['id']).subscribe(response => {
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
  
  export(){
    var fileName = "Stream";
    // let data = this.download_data;
    let data: any = null;
    if(this.dataSource.filter != ""){
      data = this.dataSource.filteredData;
    }else{
      data = this.dataSource.data;
    }
    data = data.map((e)=>{
        return {
  'Stream Name ':e.streamName,
  
  'Establishment year':e.startYear,
        }
    });
    this.download.exportAsExcelFile(data,fileName);
  }
  
  
  }
  