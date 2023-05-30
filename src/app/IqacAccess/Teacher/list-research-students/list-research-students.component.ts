import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { AddResearchStudentsComponent } from '../../../Addnew/Teachers/add-research-students/add-research-students.component';
import { EditResearchStudentComponent } from '../../../edit/teacher/edit-research-student/edit-research-student.component';
import { ServiceService } from '../../../service.service';
import { NewStudentAwardComponent } from '../../../View/new-student-award/new-student-award.component';
import { ViewPHDDeclaredStudentDetailsComponent } from '../../../View/view-phddeclared-student-details/view-phddeclared-student-details.component';
import { ViewPHDResearchStudentDetailsComponent } from '../../../View/view-phdresearch-student-details/view-phdresearch-student-details.component';
@Component({
  selector: 'app-list-research-students',
  templateUrl: './list-research-students.component.html',
  styleUrls: ['./list-research-students.component.scss']
})
export class ListResearchStudentsComponent implements OnInit {
  committee: any = null;
  displayedColumns: string[] = ['a_year','dept','teacher',
  // 'qualification','guide','rec_year',
  'view_registered_students','view_phd_declaratin','edit','delete'];
  dataSource!:MatTableDataSource<ListResearchStudentsComponent>;

  constructor(

    public dialog : MatDialog,
    public service : ServiceService

  ) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.fetchteachingplan();
  }
  addDetails(){}

  addNewresearchstudent(){
    const dialogRef = this.dialog.open(AddResearchStudentsComponent ,{width: "80%",height: "86vh",panelClass: 'full-width-dialog', data : {"committeeId": 2}});
    dialogRef.afterClosed().subscribe(result => {
      this.fetchteachingplan();
    });
  }

  viewRegisteredStudent(element: any ) {
    const dialogRef = this.dialog.open(ViewPHDResearchStudentDetailsComponent ,{width: "80%",height: "86vh",panelClass: 'full-width-dialog', data : element});
    dialogRef.afterClosed().subscribe(result => {
      this.fetchteachingplan();
    });
  }

  viewDeclaredStudent(element: any) {
    const dialogRef = this.dialog.open(ViewPHDDeclaredStudentDetailsComponent ,{width: "80%",height: "86vh",panelClass: 'full-width-dialog', data : element});
    dialogRef.afterClosed().subscribe(result => {
      this.fetchteachingplan();
    });
  }

  lengthvalidate(array:any[]):boolean{

    if(array.length > 0){
      return true;
    }
    else{return false}

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


  fetchteachingplan() {
    this.service.getData("/research-student").subscribe((res: any) => {
      console.log("data",res)
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

            //     this.dataSource.paginator = this.paginator;
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

  viewStudentAward(){
    const dialogRef = this.dialog.open(NewStudentAwardComponent ,{width: "70%",height: "86vh",panelClass: 'full-width-dialog'});
  }
  edit(row){
    const dialogRef = this.dialog.open(EditResearchStudentComponent,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data: row});
    dialogRef.afterClosed().subscribe(result => {
      this.fetchteachingplan();
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
      this.service.deleteData('/research-student/'+row['id']).subscribe(response => {
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


}
