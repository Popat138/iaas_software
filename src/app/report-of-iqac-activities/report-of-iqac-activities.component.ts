import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { AddNewIqacReportComponent } from '../Addnew/add-new-iqac-report/add-new-iqac-report.component';
import { DownloadService } from '../download.service';
import { EditIqacMeetingsComponent } from '../edit/iqac/edit-iqac-meetings/edit-iqac-meetings.component';
import { EditIqacReportComponent } from '../edit/iqac/edit-iqac-report/edit-iqac-report.component';
import { ServiceService } from '../service.service';
import { TestreportComponent } from '../testreport/testreport.component';
import { IqactestreportComponent } from '../iqactestreport/iqactestreport.component';

@Component({
  selector: 'app-report-of-iqac-activities',
  templateUrl: './report-of-iqac-activities.component.html',
  styleUrls: ['./report-of-iqac-activities.component.scss']
})
export class ReportOfIqacActivitiesComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    public service: ServiceService,
    public download: DownloadService,
  ) { }


  displayedColumns: string[] = [
    'a_year',
    'title',
    'dates',
    'n_teachers',
    'n_students',
    's_agency',
    //'report',
    //'photograph',
    'viewReport',
    'participants',
    'edit',
    'delete'

  ];
    committee : any = null;
    dataSource!:MatTableDataSource<ReportOfIqacActivitiesComponent>;

  ngOnInit(): void {
    this.fetchData();
  }

  testreport(element){
    console.log(element)
    const dialogRef = this.dialog.open(IqactestreportComponent ,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data:element});
    dialogRef.afterOpened().subscribe((result : any) => {
      //  result = this.test;
      //  console.log(result)
    });

  }

  addactivities(){
    const dialogRef = this.dialog.open(AddNewIqacReportComponent ,{width: "70%",height: "86vh",panelClass: 'full-width-dialog'});
    dialogRef.afterClosed().subscribe((result : any) => {
       this.fetchData();
    });
  }

  formatDate(date) {
    const options:any = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    };

    date = new Date(date).toLocaleString("en-IN", options);
    // console.log("gg", date);

    return date;
  }

  fetchData() {

    this.service.getData("/iqac-report/type/IQAC_ACTIVITIES").subscribe((res : any) => {
      console.log("PHOTO",res);
      const getPos:any = this.compute(res);
      getPos.then((response: any) => {
        this.dataSource = new MatTableDataSource(
          JSON.parse(JSON.stringify(response))
        );
        console.table(this.dataSource.data)
            //  this.dataSource.paginator = this.paginator;
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
    const dialogRef = this.dialog.open(EditIqacReportComponent,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data: row});
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
      this.service.deleteData('/iqac-report/'+row['id']).subscribe(response => {
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
    var fileName = "Report of IQAC Activities";
    // let data = this.download_data;
    let data: any = null;

    if(this.dataSource.filter != ""){
      data = this.dataSource.filteredData;
    }else{
      data = this.dataSource.data;
    }
    data = data.map((e)=>{
        return {
'Title':e.title,
'Duration':this.formatDate(e.fromDate)+" to "+this.formatDate(e.toDate),
'Teachers count':e.noOfTeachers,
'Students count':e.noOfStudent,
'Supporting agency':e.supportingAgency
        }
    });
    this.download.exportAsExcelFile(data,fileName);
  }


}
