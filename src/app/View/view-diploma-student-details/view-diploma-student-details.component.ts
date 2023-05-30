import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ServiceService } from 'src/app/service.service';
import { DownloadService } from 'src/app/download.service';

@Component({
  selector: 'app-view-diploma-student-details',
  templateUrl: './view-diploma-student-details.component.html',
  styleUrls: ['./view-diploma-student-details.component.scss']
})
export class ViewDiplomaStudentDetailsComponent implements OnInit {
  displayedColumns: string[] = ['year','program','course','level','studentName','class','Category','Email','Mobile No.'];
  dataSource!:MatTableDataSource<ViewDiplomaStudentDetailsComponent>;
  constructor(
    public download: DownloadService,
    public service: ServiceService,
    @Inject(MAT_DIALOG_DATA) public data : any,
    public dialogRef: MatDialogRef<ViewDiplomaStudentDetailsComponent>
  ) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.data.admittedStudents);
    console.log(this.data);
    console.log("Department",this.data.departmentName)
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
    var fileName = "List of diploma/Certificate/Ad-on courses Students";
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
        'Academic year':this.data.year,
        'Programme':this.data.program.programName,
        'Course Name':this.data.diplomaName,
        'Course type':this.data.diplomaLevel,
        'Student name	':item.user.firstName+" "+item.user.middleName+" " + item.user.lastName,
        'Class':item.programDetail.programClass,
        'Category':item.user.student.category,
        'Email ID':item.user.email,
        'Moble No':item.user.phone,    

      } 
  });
  this.download.exportAsExcelFile(data,fileName);
  }

}


