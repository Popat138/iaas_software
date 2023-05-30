import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { AddCommitteeMembersComponent } from '../Addnew/add-committee-members/add-committee-members.component';
import { AddTeachersComponent } from '../Addnew/Department/add-teachers/add-teachers.component';
import { EditCreateTeacherComponent } from '../edit/Department/edit-create-teacher/edit-create-teacher.component';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-commitee-member',
  templateUrl: './commitee-member.component.html',
  styleUrls: ['./commitee-member.component.scss']
})
export class CommiteeMemberComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    public service: ServiceService )
     { }

  displayedColumns: string[] = [
    'teachers_name',
    // 'specialization',
    // 'establish_year',
    'teachers_email',
    'teachers_paswd','edit','delete'
   ];
    committee : any = null;
    dataSource!:MatTableDataSource<CommiteeMemberComponent>;

  ngOnInit(): void {
    this.fetchData();
   
  }

  createteachers(){
    const dialogRef = this.dialog.open(AddCommitteeMembersComponent ,{width: "100vw",height: "90vh",panelClass: 'full-width-dialog'});
    dialogRef.afterClosed().subscribe((result : any) => {
       this.fetchData();
    });
  }

  fetchData() {
    this.service.getUserWithUserId().subscribe((user:any) =>{
    this.service.getData("/user/AllTeacher/department/" + user.hod.department.id).subscribe((res : any) => {
      const getPos:any = this.compute(res);
      getPos.then((response: any) => {
        this.dataSource = new MatTableDataSource(
          JSON.parse(
            JSON.stringify(response)
          )
        );
        console.log(this.dataSource.data)
            //     this.dataSource.paginator = this.paginator;
            //  this.dataSource.sort = this.sort;
      });
    }, (err: any) => {
      console.warn(err);
    });
  })
}


  edit(row){
    const dialogRef = this.dialog.open(EditCreateTeacherComponent,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data: row});
    dialogRef.afterClosed().subscribe((result : any) => {
      this.fetchData();
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
      this.service.deleteData('/user/'+row['userId']).subscribe(response => {
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

}
