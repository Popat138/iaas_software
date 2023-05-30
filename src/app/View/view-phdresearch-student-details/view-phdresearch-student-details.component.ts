import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ServiceService } from 'src/app/service.service';
import { DownloadService } from 'src/app/download.service';

@Component({
  selector: 'app-view-phdresearch-student-details',
  templateUrl: './view-phdresearch-student-details.component.html',
  styleUrls: ['./view-phdresearch-student-details.component.scss']
})
export class ViewPHDResearchStudentDetailsComponent implements OnInit {
  
  displayedColumns: string[] = ['studentName','title','registrationDate','researchCentre', 'view'];

  dataSource!:MatTableDataSource<ViewPHDResearchStudentDetailsComponent>;

  constructor(
    public download: DownloadService,
    public service: ServiceService,
    @Inject(MAT_DIALOG_DATA) public data : any,
    public dialogRef: MatDialogRef<ViewPHDResearchStudentDetailsComponent>
    ) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.data.phdRegisteredStudents);
    console.log(this.data);
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
  export(){
    var fileName = "List of PHD Registered Students With Teacher ";
    let data: any = null;
    if(this.dataSource.filter != ""){
      data = this.dataSource.filteredData;
    }else{
      data = this.dataSource.data;
    }
    console.log(this.data);

    data = data.map((item:any)=>{
      console.log(item)
      return {
        'Teacher name':this.data.user.firstName+" "+this.data.user.middleName+" "+this.data.user.lastName,
        'Student name	':item.studentName,
        'Title':item.title,
        'Registration Date':this.formatDate(item?.registrationDate),
        'Research Centre':item?.researchCentre,

      } 
  });
  this.download.exportAsExcelFile(data,fileName);
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

}
