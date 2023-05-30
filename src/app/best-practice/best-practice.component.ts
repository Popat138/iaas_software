import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AddNewDepartmentAwardComponent } from '../Addnew/add-new-department-award/add-new-department-award.component';
import { AddNewDepartmentEventComponent } from '../Addnew/add-new-department-event/add-new-department-event.component';
import { EditReportOfEventComponent } from '../edit/Department/edit-report-of-event/edit-report-of-event.component';
import { ServiceService } from '../service.service';
import { TestreportComponent } from '../testreport/testreport.component';
import { AddBestPracticeComponent } from '../Addnew/Department/add-best-practice/add-best-practice.component';
import { EditBestPracticeComponent } from '../edit/Department/edit-best-practice/edit-best-practice.component';
import { ReportbestpracticeComponent } from '../reportbestpractice/reportbestpractice.component';
@Component({
  selector: 'app-best-practice',
  templateUrl: './best-practice.component.html',
  styleUrls: ['./best-practice.component.scss']
})
export class BestPracticeComponent implements OnInit {
  department: any = null;
  year_detail:any = null;
  committee: any = null;
  displayedColumns: string[] =
   ['academic_year',
   'Department',
    'title','newsReport','delete','edit'
    
  ];
  dataSource!:MatTableDataSource<BestPracticeComponent>;
  constructor(
    public dialog : MatDialog,
    public service : ServiceService,
    public router: Router
  ) { }

  ngOnInit(    
  ): void {
    this.dataSource = new MatTableDataSource();
    this.fetchdata();
  }
  addNewPractice(){
    const dialogRef = this.dialog.open(AddBestPracticeComponent ,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data : this.department});
    dialogRef.afterClosed().subscribe((result: any) => {
      this.fetchdata();
    });
  }
  bestreport(element){
    console.log(element)
    const dialogRef = this.dialog.open(ReportbestpracticeComponent ,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data:element});
    dialogRef.afterOpened().subscribe((result : any) => {
      //  result = this.test;
      //  console.log(result)
    });
}
  edit(row){
    const dialogRef = this.dialog.open(EditBestPracticeComponent,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data: row});
    dialogRef.afterClosed().subscribe((result: any) => {
      this.fetchdata();
    }); 
  }
  delete(row){
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
    this.service.deleteData(`/best-practice/` +row['id']).subscribe(response => {
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
  fetchdata(){
    this.service.getData("/user/" + localStorage.getItem("userId")).subscribe((res: any) =>  {
      this.department = res.hod.department;
      console.log("this.department",this.department)
      this.service.getData("/best-practice/department/" + this.department.id).subscribe((reports: any) => {
      const getPos:any = this.compute(reports);
      getPos.then((response: any) => {
                this.dataSource = new MatTableDataSource(
                  response
                          // JSON.parse(
                          //           JSON.stringify(
                          //                     response
                          //           )
                          // )

                );
                console.table(this.dataSource.data)

            //     this.dataSource.paginator = this.paginator;
            // this.dataSource.sort = this.sort;
      });
      });
    }, (err: any) => {
      alert("User detail not available!");
      this.router.navigateByUrl("");
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



}
