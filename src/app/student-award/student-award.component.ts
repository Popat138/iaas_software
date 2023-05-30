import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AddNewStudentAwardComponent } from '../Addnew/add-new-student-award/add-new-student-award.component';
import { EditStudentAwardComponent } from '../edit/Committee/edit-student-award/edit-student-award.component';
import { ServiceService } from '../service.service';
import { NewStudentAwardComponent } from '../View/new-student-award/new-student-award.component';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-student-award',
  templateUrl: './student-award.component.html',
  styleUrls: ['./student-award.component.scss']
})
export class StudentAwardComponent implements OnInit {

  committee: any = null;
  displayedColumns: string[] = ['title', 'a_year','name_of_award','awarding_agency', 'award_name','level', 'nature' , 'certificate','edit','delete'];
  dataSource!:MatTableDataSource<StudentAwardComponent>;
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


  //     Swal.fire({
  //       title: 'Are you sure?',
  //       text: "You won't be able to revert this!",
  //       icon: 'info',
  //       showCancelButton: true,
  //       confirmButtonColor: '#3085d6',
  //       cancelButtonColor: '#d33',
  //       confirmButtonText: 'Yes, delete it!'
  //     }).then((result) => {
  //       if (result.isConfirmed) {
  //     this.service.deleteData('/supplier/'+row['id']).subscribe(response => {
  //       location.reload();
  //   },err => {
  //     // console.log(err);
  //     if(err.status == 409){
  //       Swal.fire({
  //         title: "Supplier cannot be deleted",
  //         text: "Stock In entry has been made against this supplier",
  //         icon: 'warning'
  //       });
  //     }
  //   });
  // }
  // });


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
    this.service.getData("/committee/user/"+localStorage.getItem('userId')).subscribe((res2: any) => {
      console.log("studfent achivemnet",res2)
      this.committee = res2;
      this.service.getData("/student-achievement/committee/" + res2.id).subscribe((res: any) => {
      // this.committee = res;
      // let studentAchievement = res.studentAchievement;
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
    })
    }, (err: any) => {
      console.warn("No committee available!!");
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
