import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AddNewStudentAwardComponent } from 'src/app/Addnew/add-new-student-award/add-new-student-award.component';
import { EditStudentAwardComponent } from 'src/app/edit/Committee/edit-student-award/edit-student-award.component';
import { ServiceService } from 'src/app/service.service';
import { NewStudentAwardComponent } from 'src/app/View/new-student-award/new-student-award.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-of-student-achievements',
  templateUrl: './list-of-student-achievements.component.html',
  styleUrls: ['./list-of-student-achievements.component.scss']
})
export class ListOfStudentAchievementsComponent implements OnInit {

  department: any = null;
  committee: any = null;
  displayedColumns: string[] = [
    // 'title',
     'a_year','name_of_student','name_of_award','achievementNature','awarding_agency', 'level' , 'certificate',
    //  'edit',
     'delete'];
  dataSource!:MatTableDataSource<ListOfStudentAchievementsComponent>;



  constructor(

    public dialog : MatDialog,
    public service : ServiceService

  ) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.fetchCommittee();
  }

  addDetails(){}

  addNewStudentsAward(){
    const dialogRef = this.dialog.open(AddNewStudentAwardComponent ,{width: "70%",height: "86vh",panelClass: 'full-width-dialog', data : {"committeeId": this.committee.id}});
    dialogRef.afterClosed().subscribe(result => {
      this.fetchCommittee();
    });
  }

  edit(row){
    const dialogRef = this.dialog.open(EditStudentAwardComponent,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data: row});
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
      this.service.deleteData('/achievement/'+row['id']).subscribe(response => {
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
      this.service.getData("/achievement").subscribe((res: any) => {
        const getPos:any = this.compute(res);
        getPos.then((response: any) => {
                  this.dataSource = new MatTableDataSource(
                            JSON.parse(
                                      JSON.stringify(
                                                response
                                      )
                            )

                  );console.table(this.dataSource.data)

              //     this.dataSource.paginator = this.paginator;
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

  viewStudentAward(){
    const dialogRef = this.dialog.open(NewStudentAwardComponent ,{width: "70%",height: "86vh",panelClass: 'full-width-dialog'});
  }

}



  export interface PeriodicElement {
    a_year:string;
    name_of_award: string;
    awarding_agency:string;
    nature:string;
    level: string;
    // n_students: number;
    // s_agency: string;

  }

  const ELEMENT_DATA: PeriodicElement[] = [
    {a_year:'2021',name_of_award:'Best Demo',awarding_agency:'Agency1', nature:'Gold medal' , level: 'National'},

  ];
