import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/service.service';

@Component({
  selector: 'app-select-student-by-division',
  templateUrl: './select-student-by-division.component.html',
  styleUrls: ['./select-student-by-division.component.scss']
})
export class SelectStudentByDivisionComponent implements OnInit {

  divisionId: any = null;
  academicYear:any=null;
  displayedColumns: string[] = ['academicYear','firstName','middleName','lastName','enrollmentNumber', 'rollNumber', 'select'];

  dataSource!:MatTableDataSource<SelectStudentByDivisionComponent>;

  constructor(
    private router: Router,
    private service: ServiceService,
    @Inject(MAT_DIALOG_DATA) public data : any,
    public dialogRef : MatDialogRef<SelectStudentByDivisionComponent>
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

  submitForm(){
    var data=[
      {firstName:this.data.firstName, middletName:this.data.middleName,lastName:this.data.lastName}
      // {caption:this.caption,photograph:this.photograph}
    ]
    
    this.dialogRef.close(data);
    
  }
  selectElement(element: any) {
    // this.submitForm()
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

}
