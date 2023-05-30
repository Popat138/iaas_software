import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AddNewDepartmentEventComponent } from 'src/app/Addnew/add-new-department-event/add-new-department-event.component';
import { EditReportOfEventComponent } from 'src/app/edit/Department/edit-report-of-event/edit-report-of-event.component';
import { ServiceService } from 'src/app/service.service';
import { TestreportComponent } from 'src/app/testreport/testreport.component';
import Swal from 'sweetalert2';
import { ReportbestpracticeComponent } from 'src/app/reportbestpractice/reportbestpractice.component';
import { EditBestPracticeComponent } from 'src/app/edit/Department/edit-best-practice/edit-best-practice.component';

@Component({
  selector: 'app-list-of-best-practices',
  templateUrl: './list-of-best-practices.component.html',
  styleUrls: ['./list-of-best-practices.component.scss']
})
export class ListOfBestPracticesComponent implements OnInit {
  department: any = null;
  year_detail:any = null;
  committee: any = null;
  displayedColumns: string[] =
   ['academic_year',
   'Department',
    'title','newsReport','delete','edit'
    
  ];
  constructor(
    public dialog : MatDialog,
    public service : ServiceService,
    public router: Router
  ) { }
  dataSource!:MatTableDataSource<ListOfBestPracticesComponent>;
  ngOnInit(): void {this.dataSource = new MatTableDataSource();
    this.fetchdata();
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
      this.service.getData("/best-practice/college/" + res.college.id).subscribe((reports: any) => {
      const getPos:any = this.compute(reports);
      getPos.then((response: any) => {
                this.dataSource = new MatTableDataSource(
                          JSON.parse(
                                    JSON.stringify(
                                              response
                                    )
                          )

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
