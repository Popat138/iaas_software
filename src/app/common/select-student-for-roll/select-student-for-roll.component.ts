import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/service.service';
import { DownloadService } from 'src/app/download.service';
@Component({
  selector: 'app-select-student-for-roll',
  templateUrl: './select-student-for-roll.component.html',
  styleUrls: ['./select-student-for-roll.component.scss']
})
export class SelectStudentForRollComponent implements OnInit {
  divisionId: any = null;
  academicYear:any=null;
  studentData : any = null;
  displayedColumns: string[] = ['academicYear','enrollmentNumber', 'rollNumber','firstName','middleName','lastName','div'];

  dataSource!:MatTableDataSource<SelectStudentForRollComponent>;
  constructor(
    private router: Router,
    private service: ServiceService,
    public download: DownloadService,
    @Inject(MAT_DIALOG_DATA) public data : any,
    public dialogRef : MatDialogRef<SelectStudentForRollComponent>
  ) {
    this.divisionId = data.divisionId;
    this.academicYear=data.academicYear;
   }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.fetchData();
  }
  fetchData() {
    this.service.getData(`/user/academicYear/${this.academicYear}/division/${this.divisionId}`).subscribe((res: any) => {
      console.log(res);
      this.studentData = res;
      const getPos:any = this.compute(res);
      getPos.then((response: any) => {
        this.dataSource = new MatTableDataSource(
          JSON.parse(
            JSON.stringify(
              response
            )
          )
        );
        console.log(this.dataSource.data);

            //     this.dataSource.paginator = this.paginator;
            //  this.dataSource.sort = this.sort;
      });
  
    }, (err: any) => {
      alert("Error try again later!!!");
      this.dialogRef.close();
    });
}

selectElement(element: any) {
  this.dialogRef.close(element);
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
  var fileName = "Student data";
  // let data = this.download_data;
  let data: any = null;
  if(this.dataSource.filter != ""){
    data = this.dataSource.filteredData;
  }else{
    data = this.dataSource.data;
  }
  data = data.map((e)=>{
      return {
        'Academic year':e?.student?.academicYear,
        'Roll NO.':e?.student?.rollNo,
         'Student Name':e?.firstName + "  " + e?.middleName + " "+e?.lastName,
          // 'Middle name':e?.user?.middleName,
          // 'Last name':e?.user?.lastName,
          'Email':e?.email,
          'Class':e?.student?.streamDetail?.streamClass,
          'Division':e?.student?.division?.divisionName
      }
  });
  this.download.exportAsExcelFile(data,fileName);
}


}
