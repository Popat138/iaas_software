import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AddResearchProgramsComponent } from 'src/app/Addnew/Department/add-research-programs/add-research-programs.component';
import { EditResearchProgramComponent } from 'src/app/edit/Department/edit-research-program/edit-research-program.component';
import { ServiceService } from 'src/app/service.service';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-list-of-research-program',
  templateUrl: './list-of-research-program.component.html',
  styleUrls: ['./list-of-research-program.component.scss']
})
export class ListOfResearchProgramComponent implements OnInit {


  committee : any =null;
  displayedColumns: string[] = ['year','name_of_guide','name_of_college','guideship_letter_no',
  // 'edit',
  'delete'];

  dataSource!:MatTableDataSource<ListOfResearchProgramComponent>;

  @ViewChild('paginator') paginator!: MatPaginator;


  constructor(

    public dialog : MatDialog,
    public service : ServiceService

  ) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.fetchCommittee();
  }

  addDetails(){}

  addguide(){
    const dialogRef = this.dialog.open(AddResearchProgramsComponent ,{width: "80%",height: "86vh",panelClass: 'full-width-dialog'});
    dialogRef.afterClosed().subscribe(result => {
      this.fetchCommittee();
    });
  }


  edit(row){
    const dialogRef = this.dialog.open(EditResearchProgramComponent,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data: row});
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
      this.service.deleteData('/research-program/'+row['id']).subscribe(response => {
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


  fetchCommittee() {
    this.service.getUserWithUserId().subscribe((user: any) => {
      this.service.getData("/research-program/college/"+user.college.id).subscribe((res: any) => {
        const getPos:any = this.compute(res);
        getPos.then((response: any) => {
                  this.dataSource = new MatTableDataSource(
                            JSON.parse(
                                      JSON.stringify(
                                                response
                                      )
                            )
  
                  );console.table(this.dataSource.data)
  
                  this.dataSource.paginator = this.paginator;
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

  // viewAchievements(){
  //   const dialogRef = this.dialog.open(NewDetailsComponent ,{width: "70%",height: "86vh",panelClass: 'full-width-dialog'});
  // }

}



  export interface PeriodicElement {
    a_year:string;
    name_of_award: string;
    // awarding_agency:string;
    // level: string;
    // n_students: number;
    // s_agency: string;

  }

  // const ELEMENT_DATA: PeriodicElement[] = [
  //   {a_year:'2021',name_of_award:'Best Demo',awarding_agency:'Agency1', level: 'International'},

  // ];
