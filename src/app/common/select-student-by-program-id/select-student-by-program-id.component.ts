import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/service.service';

@Component({
  selector: 'app-select-student-by-program-id',
  templateUrl: './select-student-by-program-id.component.html',
  styleUrls: ['./select-student-by-program-id.component.scss']
})
export class SelectStudentByProgramIdComponent implements OnInit {

  programId: any = null;
  displayedColumns: string[] = ['firstName','middleName','lastName','email', 'phone', 'select'];

  dataSource!:MatTableDataSource<SelectStudentByProgramIdComponent>;

  constructor(
    private router: Router,
    private service: ServiceService,
    @Inject(MAT_DIALOG_DATA) public data : any,
    public dialogRef : MatDialogRef<SelectStudentByProgramIdComponent>
  ) {
    this.programId = data.programId;
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.fetchData();
  }

  fetchData() {
    // this.service.getUserWithUserId().subscribe((user: any) => {
      this.service.getData("/user/student/program/" + this.programId).subscribe((res: any) => {
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
    // }, (err: any) => {
    //   alert("User authentication expired!!. Login again to continue.");
    //   this.router.navigateByUrl("");
    // });
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

}
