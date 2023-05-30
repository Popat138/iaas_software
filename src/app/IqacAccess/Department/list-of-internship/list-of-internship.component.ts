import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AddNewDepartmentAwardComponent } from 'src/app/Addnew/add-new-department-award/add-new-department-award.component';
import { AddResultsPgComponent } from 'src/app/Addnew/Department/add-results-pg/add-results-pg.component';
import { EditPlacementComponent } from 'src/app/edit/Department/edit-placement/edit-placement.component';
import { EditInternshipComponent } from 'src/app/edit/Department/edit-internship/edit-internship.component';
import { ServiceService } from 'src/app/service.service';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-list-of-internship',
  templateUrl: './list-of-internship.component.html',
  styleUrls: ['./list-of-internship.component.scss']
})
export class ListOfInternshipComponent implements OnInit {


  committee : any =null;

  displayedColumns4: string[] = ['year','program','program_code','course','course_code','name_of_student','job_title','details_of_org','report_upload'
  // 'edit_placement',
  ];


  department : any = null;

  internship_dataSource!:MatTableDataSource<ListOfInternshipComponent>;
  
  @ViewChild('paginator') paginator!: MatPaginator;



  constructor(

    public dialog : MatDialog,
    public service : ServiceService

  ) { }

  ngOnInit(): void {

    this.internship_dataSource = new MatTableDataSource();

    this.fetch_internship();
  }

  addDetails(){}



  edit_internship(row){
    const dialogRef = this.dialog.open(EditInternshipComponent,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data: row});
  }

  delete(row){
    // console.log(row);
    // if(confirm("Do you want to delete this user ?")) {


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
      this.service.deleteData('/internship-detail/'+row['id']).subscribe(response => {
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

  delete_resultug(row){}
  delete_resultpg(row){}
  delete_higheredu(row){}
  delete_placement(row){}
  delete_competative(row){}
  delete_internship(row){}



  applyFilter(event: any) {
    this.internship_dataSource.filterPredicate = (data: any, filter) => {
      const dataStr =JSON.stringify(data).toLowerCase();
      return dataStr.indexOf(filter) != -1;
    }
    const filterValue = (event.target as HTMLInputElement).value;
    this.internship_dataSource.filter = filterValue.trim().toLowerCase();
    if (this.internship_dataSource.paginator) {
      this.internship_dataSource.paginator.firstPage();
    }
  }

  viewDepartmentAward(){

  }



  addNewdResultsUg(){

    const dialogRef = this.dialog.open(AddResultsPgComponent ,{width: "80%",height: "86vh",panelClass: 'full-width-dialog', data : this.department});
    dialogRef.afterClosed().subscribe(result => {
      this.fetch_internship();
    });
  }



  fetch_internship() {

    this.service.getData("/user/" + localStorage.getItem("userId")).subscribe((user: any) =>  {
    this.service.getData("/internship-detail/college/"+user.college.id).subscribe((res: any) => {
      const getPos:any = this.compute(res);
      getPos.then((response: any) => {
                this.internship_dataSource = new MatTableDataSource(
                          JSON.parse(
                                    JSON.stringify(
                                              response
                                    )
                          )

                );console.table(this.internship_dataSource.data)

                this.internship_dataSource.paginator = this.paginator;
            //  this.dataSource.sort = this.sort;
      });
    }, (err: any) => {
      console.warn("No committee available!!");
    })

  })
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

  viewAchievements(){
    const dialogRef = this.dialog.open(AddNewDepartmentAwardComponent ,{width: "70%",height: "86vh",panelClass: 'full-width-dialog'});
  }

}
