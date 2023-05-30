import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { AddNewDepartmentComponent } from '../Addnew/add-new-department/add-new-department.component';
import { DownloadService } from '../download.service';
import { EditCreateDepartmentComponent } from '../edit/iqac/edit-create-department/edit-create-department.component';
import { ServiceService } from '../service.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-create-department',
  templateUrl: './create-department.component.html',
  styleUrls: ['./create-department.component.scss']
})
export class CreateDepartmentComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    public service: ServiceService,
    public download: DownloadService
  ) { }


  displayedColumns: string[] = [
    // 'sr_no',
    'dept_name',
    'specialization',
    'establish_year',
    'hod_name',
    'hod_email',
    'hod_paswd',
    'edit',
    'delete'
   ];
    committee : any = null;
    dataSource!:MatTableDataSource<CreateDepartmentComponent>;
    @ViewChild('paginator') paginator!: MatPaginator;

  ngOnInit(): void {
    this.fetchData();
  }

  createdepartment(){
    const dialogRef = this.dialog.open(AddNewDepartmentComponent ,{width: "100vw",height: "90vh",panelClass: 'full-width-dialog'});
    dialogRef.afterClosed().subscribe((result : any) => {
       this.fetchData();
    });
  }

  fetchData() {

    this.service.getData("/user/role/Hod/college/" + 1).subscribe((res : any) => {
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
    const dialogRef = this.dialog.open(EditCreateDepartmentComponent,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data: row});
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
      this.service.deleteData('/department/'+row['id']).subscribe(response => {
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
    var fileName = "Department";
    // let data = this.download_data;
    let data: any = null;
    if(this.dataSource.filter != ""){
      data = this.dataSource.filteredData;
    }else{
      data = this.dataSource.data;
    }
    data = data.map((e)=>{
        return {
'Department Name ':e.hod?.department?.departmentName,
'Specialization':e.hod?.department?.specialization,
'Hod Email-id':e.email,
'Hod Password':e.password,
'Establishment year':e.hod?.department?.establishmentYear
        }
    });
    this.download.exportAsExcelFile(data,fileName);
  }


}
