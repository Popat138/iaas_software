import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ViewActivityReportComponent } from 'src/app/View/view-activity-report/view-activity-report.component';
import { EditActivityReportComponent } from 'src/app/edit/Committee/edit-activity-report/edit-activity-report.component';
import { ServiceService } from 'src/app/service.service';
import { TestreportComponent } from 'src/app/testreport/testreport.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-of-activity-reports',
  templateUrl: './list-of-activity-reports.component.html',
  styleUrls: ['./list-of-activity-reports.component.scss']
})
export class ListOfActivityReportsComponent implements OnInit {


  committee;
  displayedColumns1: string[] = [
    'send_to',
   
    'year',
    'committee',
    'title',
    'fromDate',
    'toDate',
     'details',
     'participants',
    //  'send_to_new',
    // 'edit',
    // 'delete'


  ];


  dataSource1!:MatTableDataSource<ListOfActivityReportsComponent>;
  constructor(

    public dialog : MatDialog,
    public service : ServiceService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.dataSource1 = new MatTableDataSource();
    this.fetchCommittee();
  }


  singleStatusSelection(row,event){
    const data = {
      send_to: row['send_to'],
        criteria_status: event.source.value
    }
    this.updateCriteria(row, event.value);
  }

  updateCriteria(row: any, value:string) {
    this.service.putData(`/activity-report/reportOfActivities/${row.id}/criteriaName/${value}`, null).subscribe((result) => {
      console.log(result);
      this.fetchCommittee();
    }, (err: any) => {
      console.log(err);
    })
  }

  secondStatusSelection(row1,event){
    const data = {
      send_to_new: row1['send_to_new'],
        criteria_status1: event.source.value
    }
    this.updatesecondCriteria(row1, event.value);
  }

  updatesecondCriteria(row1: any, value:string) {
    this.service.putData(`/activity-report/reportOfActivities/${row1.id}/criteriaName/${value}`, null).subscribe((result1) => {
      console.log(result1);
      this.fetchCommittee();
    }, (err: any) => {
      console.log(err);
    })
  }






  viewactivity(element){
    console.log(element)
    const dialogRef = this.dialog.open(ViewActivityReportComponent ,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data:element});
    dialogRef.afterOpened().subscribe((result : any) => {
      //  result = this.test;
      //  console.log(result)
    });


  }

  editactivity(row){
   const dialogRef = this.dialog.open(EditActivityReportComponent,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data: row});
  }


  deleteactivity(row){
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
      this.service.deleteData('/activity-report/'+row['id']).subscribe(response => {
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

  fetchCommittee() {
    this.service.getData("/user/" + localStorage.getItem("userId")).subscribe((res: any) =>  {
      // this.department = res.hod.department;
      this.service.getData("/activity-report/college/" + res.college.id).subscribe((reports: any) => {
      const getPos:any = this.compute(reports);
      getPos.then((response: any) => {
                this.dataSource1 = new MatTableDataSource(
                          JSON.parse(
                                    JSON.stringify(
                                              response
                                    )
                          )

                );
                console.table(this.dataSource1.data)

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

  applyFilter(event: any) {
    this.dataSource1.filterPredicate = (data: any, filter) => {
      const dataStr =JSON.stringify(data).toLowerCase();
      return dataStr.indexOf(filter) != -1;
    }
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource1.filter = filterValue.trim().toLowerCase();
    if (this.dataSource1.paginator) {
      this.dataSource1.paginator.firstPage();
    }
  }
}
interface send_to {
  send_to: String;
  
 }

 interface send_to_new {
  send_to_new: String;
  
 }