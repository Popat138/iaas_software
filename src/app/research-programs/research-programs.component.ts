import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { AddResearchProgramsComponent } from '../Addnew/Department/add-research-programs/add-research-programs.component';
import { AddResearchPapersComponent } from '../Addnew/Teachers/add-research-papers/add-research-papers.component';
import { EditResearchProgramComponent } from '../edit/Department/edit-research-program/edit-research-program.component';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-research-programs',
  templateUrl: './research-programs.component.html',
  styleUrls: ['./research-programs.component.scss']
})
export class ResearchProgramsComponent implements OnInit {



  committee : any =null;
  guides:[]=null;
  displayedColumns: string[] = ['year','programName','programType','class','guide','upload_cert','edit','delete'];

  dataSource!:MatTableDataSource<ResearchProgramsComponent>;



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
      this.service.deleteData('/guide/'+row['id']).subscribe(response => {
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
      this.service.getData("/research-program/department/" + user.hod.department.id).subscribe((res: any) => {
        console.log(res)
        let guidesData = []
        res.forEach((element) => {
          element.guides.forEach(element2 => {
            element2.data= element;
            guidesData.push(element2);
          });
        });
        console.log("guidesData",guidesData)
        const getPos:any = this.compute(guidesData);
        getPos.then((response: any) => {
                  this.dataSource = new MatTableDataSource(response);
                  // console.log(this.dataSource.data)
  
              //     this.dataSource.paginator = this.paginator;
              //  this.dataSource.sort = this.sort;
        });
      }, (err: any) => {
        console.warn("No committee available!!");
      })
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
