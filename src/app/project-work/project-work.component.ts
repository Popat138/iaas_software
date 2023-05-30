import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { AddProjectWorkComponent } from '../Addnew/Teachers/add-project-work/add-project-work.component';
import { EditProjectWorkComponent } from '../edit/teacher/edit-project-work/edit-project-work.component';
import { ServiceService } from '../service.service';
import { NewStudentAwardComponent } from '../View/new-student-award/new-student-award.component';
import { ViewProjectWorkComponent } from '../View/view-project-work/view-project-work.component';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-project-work',
  templateUrl: './project-work.component.html',
  styleUrls: ['./project-work.component.scss']
})
export class ProjectWorkComponent implements OnInit {


  committee: any = null;
  displayedColumns: string[] = ['a_year','program','sem','year','class','div','c_name', 'view','edit','delete'];
  dataSource!:MatTableDataSource<ProjectWorkComponent>;
  @ViewChild('paginator') paginator!: MatPaginator;
  constructor(

    public dialog : MatDialog,
    public service : ServiceService

  ) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.fetchteachingplan();
  }

  addDetails(){}

  addNewproject(){
    const dialogRef = this.dialog.open(AddProjectWorkComponent ,{width: "80%",height: "86vh",panelClass: 'full-width-dialog', data : {"committeeId": 2}});
    dialogRef.afterClosed().subscribe(result => {
      this.fetchteachingplan();
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
    const dialogRef = this.dialog.open(EditProjectWorkComponent,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data: row});
  }

  delete(row){
     console.log("ROW",row);
     let projectList:any[]=[];
     
     
      

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
          this.service.getData("/student-project/project-work/"+row['id']).subscribe((response: any) => {
            response.forEach((element, i) => {   
            projectList.push(
            element.id,
            this.service.deleteData('/student-project/'+ element.id).subscribe(result => {  
              // alert(result);  
              // location.reload();
               
          })  
    
          );
        });
          });
    
        this.service.deleteData('/project-work/'+row['id']).subscribe(response => {
        location.reload();
   } ,err => {
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


  fetchteachingplan() {
    this.service.getData("/project-work/user/"+localStorage.getItem('userId')).subscribe((res: any) => {
      console.log("resPonse",res)
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

  viewProjectDetail(element: any){
    const dialogRef = this.dialog.open(ViewProjectWorkComponent ,{width: "70%",height: "86vh",panelClass: 'full-width-dialog', data: element});
  }

}



  // export interface PeriodicElement {
  //   a_year:string;
  //   name_of_award: string;
  //   awarding_agency:string;
  //   nature:string;
  //   level: string;
  //   // n_students: number;
  //   // s_agency: string;

  // }

  // const ELEMENT_DATA: PeriodicElement[] = [
  //   {a_year:'2021',name_of_award:'Best Demo',awarding_agency:'Agency1', nature:'Gold medal' , level: 'National'},

  // ];
