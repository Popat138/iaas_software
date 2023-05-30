import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AddNewDepartmentAwardComponent } from 'src/app/Addnew/add-new-department-award/add-new-department-award.component';
import { AddResultsPgComponent } from 'src/app/Addnew/Department/add-results-pg/add-results-pg.component';
import { EditResultPgComponent } from 'src/app/edit/Department/edit-result-pg/edit-result-pg.component';
import { EditResultUgComponent } from 'src/app/edit/Department/edit-result-ug/edit-result-ug.component';
import { ServiceService } from 'src/app/service.service';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-list-of-ug-results',
  templateUrl: './list-of-ug-results.component.html',
  styleUrls: ['./list-of-ug-results.component.scss']
})
export class ListOfUgResultsComponent implements OnInit {




  committee : any =null;
   
  displayedColumns1: string[] =['year','prog_name','students_addmitted','students_appear','students_pass',
  // 'edit_resultug',
  'delete_resultug'];
 

  department : any = null;

  resultsug_dataSource!:MatTableDataSource<ListOfUgResultsComponent>;
  
  @ViewChild('paginator') paginator!: MatPaginator;



  constructor(

    public dialog : MatDialog,
    public service : ServiceService

  ) { }

  ngOnInit(): void {

    this.resultsug_dataSource = new MatTableDataSource();

    this.fetchCommittee();
  }

  addDetails(){}



  edit_resultug(row){
    const dialogRef = this.dialog.open(EditResultUgComponent,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data: row});
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
      this.service.deleteData('/ug-result/'+row['id']).subscribe(response => {
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



  applyFilter(event: any) {
    this.resultsug_dataSource.filterPredicate = (data: any, filter) => {
      const dataStr =JSON.stringify(data).toLowerCase();
      return dataStr.indexOf(filter) != -1;
    }
    const filterValue = (event.target as HTMLInputElement).value;
    this.resultsug_dataSource.filter = filterValue.trim().toLowerCase();
    if (this.resultsug_dataSource.paginator) {
      this.resultsug_dataSource.paginator.firstPage();
    }
  }

  viewDepartmentAward(){

  }



  addNewdResultsUg(){

    const dialogRef = this.dialog.open(AddResultsPgComponent ,{width: "80%",height: "86vh",panelClass: 'full-width-dialog', data : this.department});
    dialogRef.afterClosed().subscribe(result => {
      this.fetchCommittee();
    });
  }



  fetchCommittee() {

    this.service.getData("/user/" + localStorage.getItem("userId")).subscribe((user: any) =>  {
    this.service.getData("/ug-result/college/" + user.college.id).subscribe((res: any) => {
      const getPos:any = this.compute(res);
      getPos.then((response: any) => {
                this.resultsug_dataSource = new MatTableDataSource(
                          JSON.parse(
                                    JSON.stringify(
                                              response
                                    )
                          )

                );console.table(this.resultsug_dataSource.data)

                this.resultsug_dataSource.paginator = this.paginator;
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



  export interface PeriodicElement {
    a_year:string;
    name_of_award: string;
    awarding_agency:string;
    level: string;

    // n_students: number;
    // s_agency: string;

  }

  const ELEMENT_DATA: PeriodicElement[] = [
    {a_year:'2021',name_of_award:'Best Demo',awarding_agency:'Agency1', level: 'International'},

  ];

