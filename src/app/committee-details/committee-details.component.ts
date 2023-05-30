import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { AddNewCommitteeReportComponent } from '../Addnew/add-new-committee-report/add-new-committee-report.component';
import { AddNewDetailsComponent } from '../Addnew/add-new-details/add-new-details.component';
import { AddNewMeetingComponent } from '../Addnew/add-new-meeting/add-new-meeting.component';
import { EditActivityReportComponent } from '../edit/Committee/edit-activity-report/edit-activity-report.component';
import { EditCommitteeMeetingDetailsComponent } from '../edit/Committee/edit-committee-meeting-details/edit-committee-meeting-details.component';
import { EditAcademicCalenderComponent } from '../edit/edit-academic-calender/edit-academic-calender.component';
import { EditCommitteeDetailsComponent } from '../edit/edit-committee-details/edit-committee-details.component';
import { ServiceService } from '../service.service';
import { TestreportComponent } from '../testreport/testreport.component';
import { NewDetailsComponent } from '../View/new-details/new-details.component';
import { NewYearDetailsComponent } from '../View/new-year-details/new-year-details.component';
import { MatPaginator } from '@angular/material/paginator';
import { ViewActivityReportComponent } from '../View/view-activity-report/view-activity-report.component';

@Component({
  selector: 'app-committee-details',
  templateUrl: './committee-details.component.html',
  styleUrls: ['./committee-details.component.scss']
})

export class CommitteeDetailsComponent implements OnInit {

  displayedColumns: string[] = ['a_year',
  'title', 'fromDate', 'toDate' ,'edit','delete' ];

  displayedColumns1: string[] = [
    'year', 'committee',
    'title',
    'fromDate',
    'toDate',
    'details',
    'participants',
    'edit',
    'delete'


  ];

  displayedColumns2: string[] = [
    'year',
    'date',
    'agenda',
    'details',
    'edit',
    'delete'


  ];
  committee : any = null;
  dataSource!:MatTableDataSource<CommitteeDetailsComponent>;
  dataSource1!:MatTableDataSource<CommitteeDetailsComponent>;
  dataSource2!:MatTableDataSource<CommitteeDetailsComponent>;
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild('paginator1') paginator1: MatPaginator;
  @ViewChild('paginator2') paginator2: MatPaginator;
  constructor(

    public dialog : MatDialog,
    public service : ServiceService
  ) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.dataSource1 = new MatTableDataSource();
    this.fetchCommittee();
    this.fetchActvityReport();
    this.fetchMeeting();
  }

  addDetails(){}


  addNewactivity(){
    const dialogRef = this.dialog.open(AddNewCommitteeReportComponent ,{width: "70%",height: "86vh",panelClass: 'full-width-dialog', data : {"committeeId": this.committee.id}});
    dialogRef.afterClosed().subscribe(result => {
      this.fetchActvityReport();
    });
  }

  viewactivity(element){
    console.log("ELEMENT",element)
    const dialogRef = this.dialog.open(ViewActivityReportComponent ,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data:element});
    dialogRef.afterOpened().subscribe((result : any) => {
     result = this.committee.name;
      //  console.log(result)
    });


  }

  editactivity(row){
   const dialogRef = this.dialog.open(EditActivityReportComponent,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data:{"committeeId": this.committee.id, row: row} });
   dialogRef.afterClosed().subscribe(result => {
    this.fetchActvityReport();
  });
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


  addNewmeeting(){
    const dialogRef = this.dialog.open(AddNewMeetingComponent ,{width: "70%",height: "86vh",panelClass: 'full-width-dialog', data : {"committeeId": this.committee.id}});
    dialogRef.afterClosed().subscribe(result => {
      this.fetchMeeting();
    });
  }

  viewmeeting(){


  }

  editmeeting(row){
    const dialogRef = this.dialog.open(EditCommitteeMeetingDetailsComponent,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data: {"committeeId": this.committee.id, row: row}});
    dialogRef.afterClosed().subscribe(result => {
      this.fetchMeeting();
    });
  }

  deletemeeting(row){
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
    this.service.deleteData('/meeting-record/'+row['id']).subscribe(response => {
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

  viewmeetingupload(){

  }

  addNewDetails(){
    const dialogRef = this.dialog.open(AddNewDetailsComponent ,{width: "70%",height: "86vh",panelClass: 'full-width-dialog', data : {"committeeId": this.committee.id}});
    dialogRef.afterClosed().subscribe(result => {
      this.fetchCommittee();
    });
  }

  edit(row){
    const dialogRef = this.dialog.open(EditAcademicCalenderComponent,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data:{"committeeId": this.committee.id, row: row}});
    dialogRef.afterClosed().subscribe(result => {
      this.fetchCommittee();
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
      this.service.deleteData('/academic-calender/'+row['id']).subscribe(response => {
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

  fetchCommittee() {
    this.service.getData("/committee/user/"+localStorage.getItem('userId')).subscribe((committee: any) => {
      this.committee = committee;
      this.service.getData("/academic-calender/committee/" + this.committee.id).subscribe((res: any) => {
        console.log("committee",res)
        const getPos:any = this.compute(res);
        getPos.then((response: any) => {
          this.dataSource = new MatTableDataSource(
            JSON.parse(
              JSON.stringify(response)
            )
          );
          console.log("commetee",this.dataSource.data)
                  this.dataSource.paginator = this.paginator;
              //  this.dataSource.sort = this.sort;
        });
      }, (err: any) => {
        console.warn("No committee available!!");
      })
    }, (committeeErr: any) => {
      console.warn("No committee available!!");
    });
  }
  applyFilter_1(event: any) {
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

  fetchActvityReport() {
    this.service.getData("/committee/user/"+localStorage.getItem('userId')).subscribe((committee: any) => {
      this.committee = committee;
      console.log("this.department",this.committee)
      this.service.getData("/activity-report/committee/" + this.committee.id).subscribe((res: any) => {
        const getPos:any = this.compute_data(res);
        getPos.then((response: any) => {
          this.dataSource1 = new MatTableDataSource(
            response
            // JSON.parse(
            //   JSON.stringify(response)
            // )
          );
          console.log(this.dataSource1.data)
                  this.dataSource1.paginator = this.paginator1;
              //  this.dataSource.sort = this.sort;
        });
      }, (err: any) => {
        console.log(err);
        console.warn("No committee available!!");
      })
    }, (committeeErr: any) => {
      console.warn("No committee available!!");
    });
  }

  async compute_data(data: any) {
    return new Promise(resolve => {
              for (var i = 0; i < data.length; i++) {
                        data[i].pos = i + 1;
                        if (i == data.length - 1) {
                                  resolve(data);
                        }
              }
    });
}

applyFilter_2(event: any) {
  this.dataSource2.filterPredicate = (data: any, filter) => {
    const dataStr =JSON.stringify(data).toLowerCase();
    return dataStr.indexOf(filter) != -1;
  }
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource2.filter = filterValue.trim().toLowerCase();
  if (this.dataSource2.paginator) {
    this.dataSource2.paginator.firstPage();
  }
}
  fetchMeeting() {
    this.service.getData("/committee/user/"+localStorage.getItem('userId')).subscribe((committee: any) => {
      this.committee = committee;
      this.service.getData("/meeting-record/committee/" + this.committee.id).subscribe((res: any) => {
        const getPos:any = this.compute(res);
        getPos.then((response: any) => {
          this.dataSource2 = new MatTableDataSource(
            JSON.parse(
              JSON.stringify(response)
            )
          );
          console.log(this.dataSource2.data)
                  this.dataSource2.paginator = this.paginator2;
              //  this.dataSource.sort = this.sort;
        });
      }, (err: any) => {
        console.warn("No committee available!!");
      })
    }, (committeeErr: any) => {
      console.warn("No committee available!!");
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

  viewYearDetails(element : any){
    const dialogRef = this.dialog.open(NewYearDetailsComponent ,{width: "70%",height: "86vh",panelClass: 'full-width-dialog', data: element});
  }


  viewCommitteeDetails(element:any){
    const dialogRef = this.dialog.open(NewDetailsComponent ,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data:element});
  }

}
  // export interface PeriodicElement {
  //   a_year:string;
  //   title: string;
  //   duration:string;
  //   n_teachers: number;
  //   n_students: number;
  //   s_agency: string;

  // }

  // const ELEMENT_DATA: PeriodicElement[] = [
  //   {a_year:'This',title:'Test',duration:'Complete', n_teachers: 150, n_students: 117, s_agency: '123456',},

  // ];



  // applyFilter(filterValue: any) {
  //   this.dataSource.filterPredicate = (data: any, filter) => {
  //     const dataStr =JSON.stringify(data).toLowerCase();
  //     return dataStr.indexOf(filter) != -1;
  //   }
  //   // const filterValue = (event.target as HTMLInputElement).Value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }



