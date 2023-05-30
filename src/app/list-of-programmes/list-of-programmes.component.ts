import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { AddNewListOfProgrammesComponent } from '../Addnew/add-new-list-of-programmes/add-new-list-of-programmes.component';
import { DownloadService } from '../download.service';
import { EditListOfProgrammesComponent } from '../edit/iqac/edit-list-of-programmes/edit-list-of-programmes.component';
import { ServiceService } from '../service.service';
import { AddNewStreamComponent } from '../Addnew/add-new-stream/add-new-stream.component';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-list-of-programmes',
  templateUrl: './list-of-programmes.component.html',
  styleUrls: ['./list-of-programmes.component.scss']
})
export class ListOfProgrammesComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    public service: ServiceService,
    public download: DownloadService
  ) { }


  displayedColumns: string[] = [
    'faculty',
    'prog_code',
    'prog_name',
    'specialization',
    'prog_type',
    // 'duration',
    'prog_lvl',
    'impl_year',
    'upload_permi_letter',
    'upload_aff_letter' ,
    'edit',
    'delete'

  ];
    committee : any = null;
    dataSource!:MatTableDataSource<ListOfProgrammesComponent>;
    @ViewChild('paginator') paginator!: MatPaginator;

  ngOnInit(): void {
    this.fetchData();
  }

  addprogram(){
    const dialogRef = this.dialog.open(AddNewListOfProgrammesComponent ,{width: "100%",height: "86vh",panelClass: 'full-width-dialog'});
    dialogRef.afterClosed().subscribe((result : any) => {
       this.fetchData();
    });
  }

  export(){
    var fileName = "List Of Programmes";
    // let data = this.download_data;
    let data: any = null;
    if(this.dataSource.filter != ""){
      data = this.dataSource.filteredData;
    }else{
      data = this.dataSource.data;
    }
    data = data.map((e)=>{
        return {
          'Faculty':e.stream?.streamName,
           'Program Code':e.programCode,
            'Program Name':e.programName,
            'Specialization':e.specialization,
            'Program type':e.programType,
            'Program Level':e.programLevel,
            '	Implementation Year':e.startYear
        }
    });
    this.download.exportAsExcelFile(data,fileName);
  }


  upload_permi_letter() {}

    upload_aff_letter() {}
  fetchData() {

    this.service.getData("/program/college/" + 1).subscribe((res : any) => {
      console.log("res",res)
      const getPos:any = this.compute(res);
      getPos.then((response: any) => {
        this.dataSource = new MatTableDataSource(
          JSON.parse(
            JSON.stringify(response)
          )
        );
        console.log(this.dataSource.data)
                this.dataSource.paginator = this.paginator;
            //  this.dataSource.sort = this.sort;
      });
    }, (err: any) => {
      console.warn(err);
    });

  }

  edit(row){
    const dialogRef = this.dialog.open(EditListOfProgrammesComponent,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data: row});
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
      this.service.deleteData('/program/'+row['programId']).subscribe(response => {
        location.reload();
    },err => {
      // console.log(err);
      if(err.status == 409){
        Swal.fire({
          title: "Program cannot be deleted",
          text: "Program is used in some other entry!!",
          icon: 'warning'
        });
      }
    });
  }
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

}
