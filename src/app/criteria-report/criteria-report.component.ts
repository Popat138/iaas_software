import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { AddNewIqacMeetingsComponent } from '../Addnew/add-new-iqac-meetings/add-new-iqac-meetings.component';
import { DownloadService } from '../download.service';
import { EditIqacMeetingsComponent } from '../edit/iqac/edit-iqac-meetings/edit-iqac-meetings.component';
import { ServiceService } from '../service.service';
import { ViewIQACMeetingDetailComponent } from '../View/view-iqacmeeting-detail/view-iqacmeeting-detail.component';
import { AddNewIqacReportComponent } from '../Addnew/add-new-iqac-report/add-new-iqac-report.component';
import { AddCriteriaReportComponent } from '../Addnew/add-criteria-report/add-criteria-report.component';
import { ViewCriteriaReportsComponent } from '../View/view-criteria-reports/view-criteria-reports.component';
import { EditCriteriaReportComponent } from '../edit/edit-criteria-report/edit-criteria-report.component';
@Component({
  selector: 'app-criteria-report',
  templateUrl: './criteria-report.component.html',
  styleUrls: ['./criteria-report.component.scss']
})
export class CriteriaReportComponent implements OnInit {
  college;
  criteria;
  crh;
  constructor(
    private dialog: MatDialog,
    private service: ServiceService,
    public download: DownloadService,
  ) { }
  displayedColumns: string[] = [
    'year',
    'name',
    'type',
    'number',
    'title',
    'view',
    'edit',
    'delete'
      ];

  dataSource!:MatTableDataSource<CriteriaReportComponent>;
  ngOnInit(): void {
    this.fetchData();
  }
  addiqacmeetings(){
    this.fetchData();
    const dialogRef = this.dialog.open(AddCriteriaReportComponent ,{width: "85%",height: "86vh",panelClass: 'full-width-dialog',data : {"meetingId":2}});
     dialogRef.afterClosed().subscribe((result : any) => {
        this.fetchData();
     });
   }
 
   fetchData() {

    this.service.getUserWithUserId().subscribe((user: any) => {
    console.log("THIS USER",user);
    this.service.getData("/cri-qual/crh/"+user.crh.id).subscribe((res : any) => {
      console.log("DATA",res)
      const getPos:any = this.compute(res);
      getPos.then((response: any) => {
        this.dataSource = new MatTableDataSource(
          JSON.parse(
            JSON.stringify(response)
          )
        );

        //console.log(this.dataSource.data)
        this.college = this.dataSource.data;
        // console.log(this.college[0].college.name)
            //     this.dataSource.paginator = this.paginator;
            //  this.dataSource.sort = this.sort;
      });
    }, (err: any) => {
      console.warn(err);
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
    viewdetails(element: any){const dialogRef = this.dialog.open(ViewCriteriaReportsComponent ,{width: "85%",height: "86vh",panelClass: 'full-width-dialog', data: element});
    dialogRef.afterClosed().subscribe((result : any) => {
       this.fetchData();
    });

    }

    edit(row){
      const dialogRef = this.dialog.open(EditCriteriaReportComponent,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data: row});
      dialogRef.afterClosed().subscribe((result : any) => {
        this.fetchData();
     });
    }

    delete(row){
      console.log(row);
  
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
        this.service.deleteData('/cri-qual/'+row['id']).subscribe(response => {
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



