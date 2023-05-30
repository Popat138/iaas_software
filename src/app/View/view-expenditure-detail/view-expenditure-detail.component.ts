import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ServiceService } from 'src/app/service.service';
import { DownloadService } from 'src/app/download.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-view-expenditure-detail',
  templateUrl: './view-expenditure-detail.component.html',
  styleUrls: ['./view-expenditure-detail.component.scss']
})
export class ViewExpenditureDetailComponent implements OnInit {

  constructor(

    public dialog : MatDialog,
    public service : ServiceService,
    public router: Router,
    public downloadService: DownloadService,
    @Inject(MAT_DIALOG_DATA) public data : any
  ) { }

  displayedColumns: string[] = [
    'pos',
  'item',
  'amount',
];
  scholarshipData : any = null;
  dataSource!:MatTableDataSource<any>;

  ngOnInit(): void {
    console.log(this.data);
    this.dataSource = new MatTableDataSource();
    this.fetchData();
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

  fetchData() {
    const getPos:any = this.compute(this.data.expenditures);
    getPos.then((response: any) => {
      this.dataSource = new MatTableDataSource(
        JSON.parse(
          JSON.stringify(
            response
          )
        )
      );
      console.table(this.dataSource.data)
      //  this.dataSource.paginator = this.paginator;
      //  this.dataSource.sort = this.sort;
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
  var fileName = "Expenditure detail";
  
     const data = this.data.expenditures.map((e) => {
      
      return {
       
        'Academic Year': this.data?.financialYear,
        'Facility': e.facility,
        'Expenditure item':e.item,
        'Amount (Rs)':e.amount,
        // 'Program Code': programCode,
        // 'Course Code': courseCode,
        // 'Course Name': courseName,
        // 'type':e.projectWork.type,
        // 'Roll number': e.user.student.rollNo,
        // 'Name of Student': `${e.user.firstName} ${e.user.middleName} ${e.user.lastName}`,
        // 'Title of Project': e.projectTitle
      }
    });
    
    this.downloadService.exportAsExcelFile(data, fileName);
  }

}
