import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { AddJournalScubscriptionComponent } from '../Addnew/library/add-journal-scubscription/add-journal-scubscription.component';
import { EditJournalSubscriptionComponent } from '../edit/library/edit-journal-subscription/edit-journal-subscription.component';
import { ServiceService } from '../service.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-journalsubscription',
  templateUrl: './journalsubscription.component.html',
  styleUrls: ['./journalsubscription.component.scss']
})
export class JournalsubscriptionComponent implements OnInit {




  committee : any =null;
  displayedColumns: string[] = [

    'year',
    'j_type',
    'j_name',
    'isbn_no',
    'period',
    'subs_date',
    'subs_amount',
    'j_mode',
    'receipt',
    'edit',
    'delete'

  ];

  dataSource!:MatTableDataSource<JournalsubscriptionComponent>;
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

  addpgcourses(){
    const dialogRef = this.dialog.open(AddJournalScubscriptionComponent ,{width: "80%",height: "86vh",panelClass: 'full-width-dialog'});
    dialogRef.afterClosed().subscribe(result => {
      this.fetchCommittee();
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
  edit(row){
    const dialogRef = this.dialog.open(EditJournalSubscriptionComponent,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data: row});
    dialogRef.afterClosed().subscribe(result => {
      this.fetchCommittee();
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
      this.service.deleteData('/journal-subscription/'+row['id']).subscribe(response => {
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



  fetchCommittee() {

    this.service.getUserWithUserId().subscribe((user : any) => {
     // console.log(user);
      this.service.getData("/journal-subscription/college/" + user.college.id).subscribe((res: any) => {
        const getPos:any = this.compute(res);
        getPos.then((response: any) => {
                  this.dataSource = new MatTableDataSource(
                            JSON.parse(
                                      JSON.stringify(
                                                response
                                      )
                            )

                  );
                  console.log(this.dataSource.data)

                  this.dataSource.paginator = this.paginator;
              //  this.dataSource.sort = this.sort;
        });
      }, (err: any) => {
        console.warn("No committee available!!");
      })
    }, (err : any) => {
      console.log(err);
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
