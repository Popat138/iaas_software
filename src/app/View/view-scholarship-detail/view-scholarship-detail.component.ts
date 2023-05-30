import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ServiceService } from 'src/app/service.service';
import { DownloadService } from 'src/app/download.service';
import { AddNewScholarshipDataComponent } from 'src/app/Addnew/add-new-scholarship-data/add-new-scholarship-data.component';
import { ScholarshipDataComponent } from 'src/app/scholarship-data/scholarship-data.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-view-scholarship-detail',
  templateUrl: './view-scholarship-detail.component.html',
  styleUrls: ['./view-scholarship-detail.component.scss']
})
export class ViewScholarshipDetailComponent implements OnInit {

  constructor(

    public dialog : MatDialog,
    public service : ServiceService,
    public download: DownloadService,
    public router: Router,
    @Inject(MAT_DIALOG_DATA) public data : any
  ) { }

  displayedColumns: string[] = [
  'scholarshipScheme',
  'awardingAgency',
  'noOfStudent',
  'amount',
  'sanctionLetter',
  'studentList'
];
  scholarshipData : any = null;
  dataSource!:MatTableDataSource<ViewScholarshipDetailComponent>;

  ngOnInit(): void {

    this.dataSource = new MatTableDataSource();
    this.fetchStudentData();

  }

  fetchStudentData() {
    const getPos:any = this.compute(this.data.scholarshipData);
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

  export(){
    var fileName = "List of Student Scholarship";
    let data: any = null;
    if(this.dataSource.filter != ""){
      data = this.dataSource.filteredData;
    }else{
      data = this.dataSource.data;
    }
    data = data.map((e)=>{
      return {
        'Academic Year':this.data.academicYear,
        'Scholarship Type':this.data.scholarshipType,
        'Scholarship Scheme':e?.scholarshipScheme,
        'Number of Students':e?.noOfStudent,
        'Amount of Scholarship (Rs)':e?.amount,
        'Awarding Agency':e?.awardingAgency

      }
  });
  this.download.exportAsExcelFile(data,fileName);
  }
}
