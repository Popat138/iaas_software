import { Component, OnInit } from '@angular/core';
import { AddNewAuditAndFinanceDataComponent } from 'src/app/Addnew/add-new-audit-and-finance-data/add-new-audit-and-finance-data.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { EditAuditFinanceComponent } from 'src/app/edit/Office/edit-audit-finance/edit-audit-finance.component';
import { ViewExpenditureDetailComponent } from 'src/app/View/view-expenditure-detail/view-expenditure-detail.component';
import { ViewMaintenanceExpenditureDetailComponent } from 'src/app/View/view-maintenance-expenditure-detail/view-maintenance-expenditure-detail.component';
import { ServiceService } from 'src/app/service.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-list-of-audit-finance',
  templateUrl: './list-of-audit-finance.component.html',
  styleUrls: ['./list-of-audit-finance.component.scss']
})
export class ListOfAuditFinanceComponent implements OnInit {

  constructor(
    public dialog : MatDialog,
    public service: ServiceService 
  ) { }

  ngOnInit(): void {
    this.fetchData();
  }
  displayedColumns: string[] = [
    'scheme',
    'no_of_students',
    'amount',
    'upload_student',
    'edit',
    'delete'
   ];
   committee : any = null;
   dataSource!:MatTableDataSource<ListOfAuditFinanceComponent>;

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

  addNewAuditData(){
    const dialogRef = this.dialog.open(AddNewAuditAndFinanceDataComponent ,{width: "70%",height: "86vh",panelClass: 'full-width-dialog'});
    dialogRef.afterClosed().subscribe((result : any) => {
      this.fetchData();
    });
  }

  fetchData() {
    this.service.getData("/finance").subscribe((res : any) => {
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
    const dialogRef = this.dialog.open(EditAuditFinanceComponent,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data: row});
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
      this.service.deleteData('/finance/'+row['id']).subscribe(response => {
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

  expenditure(element: any, facility: string){
    let rowdata = JSON.parse(JSON.stringify(element));
    rowdata.expenditures = rowdata.expenditures.filter(el => el.facility == facility);
    const dialogRef = this.dialog.open(ViewExpenditureDetailComponent ,{width: "70%",height: "86vh",panelClass: 'full-width-dialog', data: rowdata});
    dialogRef.afterClosed().subscribe((result : any) => {
      this.fetchData();
    });
  }

  MaintainenceExpenditure(rowdata: any){
    const dialogRef = this.dialog.open(ViewMaintenanceExpenditureDetailComponent ,{width: "70%",height: "86vh",panelClass: 'full-width-dialog', data: rowdata});
    dialogRef.afterClosed().subscribe((result : any) => {
      this.fetchData();
    });
  }



}
