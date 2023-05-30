import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AddNewRecognitionsComponent } from '../Addnew/add-new-recognitions/add-new-recognitions.component';
import { EditRecognitionsComponent } from '../edit/Committee/edit-recognitions/edit-recognitions.component';
import { ServiceService } from '../service.service';
import { NewDetailsComponent } from '../View/new-details/new-details.component';

@Component({
  selector: 'app-recognitions-achievements',
  templateUrl: './recognitions-achievements.component.html',
  styleUrls: ['./recognitions-achievements.component.scss']
})
export class RecognitionsAchievementsComponent implements OnInit {



  committee : any =null;
  displayedColumns: string[] = ['a_year','name_of_award','awarding_agency', 'level', 'certificate','edit','delete'];

  dataSource!:MatTableDataSource<RecognitionsAchievementsComponent>;



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
    const dialogRef = this.dialog.open(AddNewRecognitionsComponent ,{width: "80%",height: "86vh",panelClass: 'full-width-dialog', data : {"committeeId": this.committee.id}});
    dialogRef.afterClosed().subscribe(result => {
      this.fetchCommittee();
    });
  }


  edit(row){
    const dialogRef = this.dialog.open(EditRecognitionsComponent,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data: row});
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
      console.log("achivemnet111",res2)
      this.committee = res2;
      this.service.getData("/achievement/committee/" + res2.id).subscribe((res: any) => {
      // let achievement = res.achievements;

      const getPos:any = this.compute(res);
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

  viewAchievements(){
    const dialogRef = this.dialog.open(NewDetailsComponent ,{width: "70%",height: "86vh",panelClass: 'full-width-dialog'});
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
