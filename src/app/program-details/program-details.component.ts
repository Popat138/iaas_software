import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { AddNewProgramDetailsComponent } from '../Addnew/add-new-program-details/add-new-program-details.component';
import { DownloadService } from '../download.service';
import { EditProgramDetailsComponent } from '../edit/iqac/edit-program-details/edit-program-details.component';
import { ServiceService } from '../service.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-program-details',
  templateUrl: './program-details.component.html',
  styleUrls: ['./program-details.component.scss']
})
export class ProgramDetailsComponent implements OnInit {


  constructor(
    private dialog: MatDialog,
    public service: ServiceService,
    public download: DownloadService
  ) { }


  displayedColumns: string[] = [
    'prog_name',
    'class',
    'no_of_div',
    'divisons',
    // 'subjects',
    'intake_capacity',
    'upload_cert',
    'edit',
    'delete'


  ];
    committee : any = null;
    dataSource!:MatTableDataSource<ProgramDetailsComponent>;
    @ViewChild('paginator') paginator!: MatPaginator;

  ngOnInit(): void {
    this.fetchData();
  }

  addprogramdetails(){
    const dialogRef = this.dialog.open(AddNewProgramDetailsComponent ,{width: "85%",height: "86vh",panelClass: 'full-width-dialog'});
    dialogRef.afterClosed().subscribe((result : any) => {
       this.fetchData();
    });
  }

  concatDivisions(element: any) {
    return element.divisions.map(e => e.divisionName).join();
  }

  upload_cert() {}


  fetchData() {

    this.service.getData("/program-detail/college/" + 1).subscribe((res : any) => {
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

  edit(row){
    const dialogRef = this.dialog.open(EditProgramDetailsComponent,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data: row});
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
      this.service.deleteData('/program-detail/'+row['id']).subscribe(response => {
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
    var fileName = "Program Details";
    // let data = this.download_data;
    let data: any = null;
    if(this.dataSource.filter != ""){
      data = this.dataSource.filteredData;
    }else{
      data = this.dataSource.data;
    }
    data = data.map((e)=>{
        return {
'Program Name ':e.program.programName,
'Class':e.programClass,
'No of Div':e.divisions.length,
'Division':this.concatDivisions(e),
'Inatake Capacity':e.intakeCapacity
        }
    });
    this.download.exportAsExcelFile(data,fileName);
  }





}
