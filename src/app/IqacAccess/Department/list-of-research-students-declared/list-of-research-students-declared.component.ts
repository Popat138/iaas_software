import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AddPassOutStudentsComponent } from 'src/app/Addnew/Department/add-pass-out-students/add-pass-out-students.component';
import { EditPaasoutStudentsComponent } from 'src/app/edit/Department/edit-paasout-students/edit-paasout-students.component';
import { ServiceService } from 'src/app/service.service';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-list-of-research-students-declared',
  templateUrl: './list-of-research-students-declared.component.html',
  styleUrls: ['./list-of-research-students-declared.component.scss']
})
export class ListOfResearchStudentsDeclaredComponent implements OnInit {

  
  committee : any =null;
  displayedColumns: string[] = ['year','Programme','name_of_student','name_of_guide','category','title_of_topic','date_of_registration','date_of_declaration','upload_cert',
  // 'edit',
  'delete'];

  dataSource!:MatTableDataSource<ListOfResearchStudentsDeclaredComponent>;

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

  addpassout(){
    const dialogRef = this.dialog.open(AddPassOutStudentsComponent ,{width: "80%",height: "86vh",panelClass: 'full-width-dialog'});
    dialogRef.afterClosed().subscribe(result => {
      this.fetchCommittee();
    });
  }


  edit(row){
    const dialogRef = this.dialog.open(EditPaasoutStudentsComponent,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data: row});
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
      this.service.deleteData('/admitted-research-declaration/'+row['id']).subscribe(response => {
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
    this.service.getUserWithUserId().subscribe((user:any) => {
      this.service.getData("/admitted-research-declaration/college/"+user.college.id).subscribe((res: any) => {
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
    }, (err:any) => {
      console.log(err);
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
