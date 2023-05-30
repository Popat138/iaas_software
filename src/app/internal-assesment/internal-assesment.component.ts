import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { AddInternalAssesmentComponent } from '../Addnew/add-internal-assesment/add-internal-assesment.component';
import { EditInternalAssesmentComponent } from '../edit/teacher/edit-internal-assesment/edit-internal-assesment.component';
// import { AddTestComponenet } from '../Addnew/add-test-componenet/add-test-componenet.component';
import { ServiceService } from '../service.service';
import { ViewInternalAssessmentComponent } from '../View/view-internal-assessment/view-internal-assessment.component';
// import { TestFormcontrolMatrixComponent } from '../Test/test-formcontrol-matrix/test-formcontrol-matrix.component';
// import { TestMatrixComponent } from '../Test/test-matrix/test-matrix.component';
import { MatPaginator } from '@angular/material/paginator';
import { ViewNewinternalAssessmentComponent } from '../View/view-newinternal-assessment/view-newinternal-assessment.component';

@Component({
  selector: 'app-internal-assesment',
  templateUrl: './internal-assesment.component.html',
  styleUrls: ['./internal-assesment.component.scss']
})
export class InternalAssesmentComponent implements OnInit {


  constructor(
    private dialog: MatDialog,
    public service: ServiceService
  ) { }


  displayedColumns: string[] = [
    'year',
    'prog_name',
    'c_code',
    'c_name',
    'class',
    'division',
    'test_type',
    'view',

    'edit',
    'delete'
   ];
    committee : any = null;
    dataSource!:MatTableDataSource<InternalAssesmentComponent>;
    @ViewChild('paginator') paginator!: MatPaginator;

  ngOnInit(): void {
    this.fetchData();
  }

  addinternalassesment(){
    const dialogRef = this.dialog.open(AddInternalAssesmentComponent ,{width: "100vw",height: "90vh",panelClass: 'full-width-dialog'});
    dialogRef.afterClosed().subscribe((result : any) => {
       this.fetchData();
    });
  }

  viewInternalAssessment(element: any) {
    const dialogRef = this.dialog.open(ViewNewinternalAssessmentComponent ,{width: "100vw",height: "90vh",panelClass: 'full-width-dialog', data: element});
    dialogRef.afterClosed().subscribe((result : any) => {
       this.fetchData();
    });
  }

  // addinternalassesment(){
  //   const dialogRef = this.dialog.open(AddTestComponenet ,{width: "100vw",height: "90vh",panelClass: 'full-width-dialog'});
  //   dialogRef.afterClosed().subscribe((result : any) => {
  //      this.fetchData();
  //   });
  // }

  fetchData() {

    this.service.getData(`/internal-assessment/user/${localStorage.getItem("userId")}`).subscribe((res : any) => {
      console.log("Data",res);
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

  edit(row: any) {
    const dialogRef = this.dialog.open(EditInternalAssesmentComponent,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data: row});
    dialogRef.afterClosed().subscribe((result : any) => {
      this.fetchData();
   });
  }

  delete(row) {
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
      this.service.deleteData('/internal-assessment/'+row['id']).subscribe(response => {
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
