import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { AddNewScholarshipDataComponent } from '../Addnew/add-new-scholarship-data/add-new-scholarship-data.component';
import { EditScholarshipComponent } from '../edit/Office/edit-scholarship/edit-scholarship.component';
import { ServiceService } from '../service.service';
import { ViewScholarshipDetailComponent } from '../View/view-scholarship-detail/view-scholarship-detail.component';

@Component({
  selector: 'app-scholarship-data',
  templateUrl: './scholarship-data.component.html',
  styleUrls: ['./scholarship-data.component.scss']
})
export class ScholarshipDataComponent implements OnInit {


  constructor(

    public dialog : MatDialog,
    public service: ServiceService
  ) { }

  ngOnInit(): void {
    this.fetchData();
  }

  displayedColumns: string[] = [
    'academicYear',
    'scholarshipType',
    'view',
    // 'edit',
    'delete'
    // 'n_teachers',
    // 'n_students',
    // 's_agency',
    // 'upload_sanction',
    // 'upload_student'
   ];
    committee : any = null;
    dataSource!:MatTableDataSource<ScholarshipDataComponent>;


    edit(row){
      const dialogRef = this.dialog.open(EditScholarshipComponent,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data: row});
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
        this.service.deleteData('/scholarship/'+row['id']).subscribe(response => {
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

    addNewStudentData(){

      const dialogRef = this.dialog.open(AddNewScholarshipDataComponent ,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data : {"committeeId":2}});
      dialogRef.afterClosed().subscribe((result: any) => {
        this.fetchData();
      });
    }

    fetchData(){
      this.service.getData("/scholarship").subscribe((res: any) => {
        const getPos:any = this.compute(res);
        getPos.then((response: any) => {
          this.dataSource = new MatTableDataSource(
            JSON.parse(
              JSON.stringify(response)
            )
          );
          console.table(this.dataSource.data)
              //     this.dataSource.paginator = this.paginator;
              //  this.dataSource.sort = this.sort;
        });
      }, (err: any) => {
        console.log(err);
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

    viewScholarshipDetail(rowData : any){
      const dialogRef = this.dialog.open(ViewScholarshipDetailComponent ,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data : rowData});
      dialogRef.afterClosed().subscribe((result: any) => {
        this.fetchData();
      });
    }
}
