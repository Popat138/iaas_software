import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AddNewSchoolComponent } from '../Addnew/add-new-school/add-new-school.component';
import { EditSummerWinterComponent } from '../edit/Department/edit-summer-winter/edit-summer-winter.component';
import { ServiceService } from '../service.service';
import { TestreportComponent } from '../testreport/testreport.component';

@Component({
  selector: 'app-report-of-summer-winter-school',
  templateUrl: './report-of-summer-winter-school.component.html',
  styleUrls: ['./report-of-summer-winter-school.component.scss']
})
export class ReportOfSummerWinterSchoolComponent implements OnInit {

  department: any = null;


  year_detail:any = null;
  committee: any = null;
  displayedColumns: string[] =
   [ 'academic_year',
   'Department',
    'title',
    'duration',
    'n_teachers',
    'n_students',
   's_agency',
   //'photograph',
   'viewReport',
   'participants','edit','delete'
  ];
  // dataSource = ELEMENT_DATA;


  dataSource!:MatTableDataSource<ReportOfSummerWinterSchoolComponent>;


  constructor(

    public dialog : MatDialog,
    public service : ServiceService,
    public router: Router
    //@Inject(MAT_DIALOG_DATA) public data: any

  ) {

   // this.year_detail = data;

  }

  edit(row){
    const dialogRef = this.dialog.open(EditSummerWinterComponent,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data: row});
    dialogRef.afterClosed().subscribe((result: any) => {
      this.fetchdata();
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
      this.service.deleteData('/school-report/'+row['id']).subscribe(response => {
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

  testreport(element){
    console.log(element)
    const dialogRef = this.dialog.open(TestreportComponent ,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data:element});
    dialogRef.afterOpened().subscribe((result : any) => {
      //  result = this.test;
      //  console.log(result)
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

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.fetchdata();
  }


  addNewSchoolData(){

    const dialogRef = this.dialog.open(AddNewSchoolComponent ,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data : this.department});
    dialogRef.afterClosed().subscribe((result: any) => {
      this.fetchdata();
    });
  }


  fetchdata(){

    this.service.getData("/user/" + localStorage.getItem("userId")).subscribe((res: any) =>  {
      this.department = res.hod.department;
      console.log("this.department",this.department)
      this.service.getData("/school-report/department/" + this.department.id).subscribe((reports: any) => {
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
