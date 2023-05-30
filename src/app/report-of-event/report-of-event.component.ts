import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AddNewDepartmentAwardComponent } from '../Addnew/add-new-department-award/add-new-department-award.component';
import { AddNewDepartmentEventComponent } from '../Addnew/add-new-department-event/add-new-department-event.component';
import { EditReportOfEventComponent } from '../edit/Department/edit-report-of-event/edit-report-of-event.component';
import { ServiceService } from '../service.service';
import { TestreportComponent } from '../testreport/testreport.component';
import { ViewActivityReportComponent } from '../View/view-activity-report/view-activity-report.component';
@Component({
  selector: 'app-report-of-event',
  templateUrl: './report-of-event.component.html',
  styleUrls: ['./report-of-event.component.scss']
})
export class ReportOfEventComponent implements OnInit {


  department: any = null;
  year_detail:any = null;
  committee: any = null;
  displayedColumns: string[] =
   ['academic_year',
   'Department',
    'title',
    'duration',
    'n_teachers',
    'n_students',
   's_agency',
    //'report',
    // 'photograph',
    'newsReport',
    'participants','edit','delete'
  ];
  // dataSource = ELEMENT_DATA;


  dataSource!:MatTableDataSource<ReportOfEventComponent>;


  constructor(

    public dialog : MatDialog,
    public service : ServiceService,
    public router: Router
    //@Inject(MAT_DIALOG_DATA) public data: any

  ) {

   // this.year_detail = data;

  }

  edit(row){
    const dialogRef = this.dialog.open(EditReportOfEventComponent,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data: row});
    dialogRef.afterClosed().subscribe((result: any) => {
      this.fetchdata();
    });
  }
  testreport(element){
    console.log(element)
    const dialogRef = this.dialog.open(ViewActivityReportComponent ,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data:element});
    dialogRef.afterOpened().subscribe((result : any) => {
      //  result = this.test;
      //  console.log(result)
    });

  }

  delete(row){
    //  console.log("ROW",row);
  
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
      this.service.deleteData(`/event-report/` +row['id']).subscribe(response => {
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

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.fetchdata();
  }


  addNewEventData(){
    const dialogRef = this.dialog.open(AddNewDepartmentEventComponent ,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data : this.department});
    dialogRef.afterClosed().subscribe((result: any) => {
      this.fetchdata();
    });
  }


  fetchdata(){

    this.service.getData("/user/" + localStorage.getItem("userId")).subscribe((res: any) =>  {
      this.department = res.hod.department;
      console.log("this.department",this.department)
      this.service.getData("/event-report/department/" + this.department.id).subscribe((reports: any) => {
      const getPos:any = this.compute(reports);
      getPos.then((response: any) => {
                this.dataSource = new MatTableDataSource(
                  response
                          // JSON.parse(
                          //           JSON.stringify(
                          //                     response
                          //           )
                          // )

                );
                console.table(this.dataSource.data)

            //     this.dataSource.paginator = this.paginator;
            // this.dataSource.sort = this.sort;
      });
      });
    }, (err: any) => {
      alert("User detail not available!");
      this.router.navigateByUrl("");
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

}
