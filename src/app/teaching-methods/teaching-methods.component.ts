import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';
import { AddNewTeachingMethodsComponent } from '../Addnew/Teachers/add-new-teaching-methods/add-new-teaching-methods.component';
import { MatTableModule } from '@angular/material/table';
import { TeachingmethodreportComponent } from '../teachingmethodreport/teachingmethodreport.component';
import Swal from 'sweetalert2';
import { EditTeachingMethodsComponent } from '../edit/teacher/edit-teaching-methods/edit-teaching-methods.component';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-teaching-methods',
  templateUrl: './teaching-methods.component.html',
  styleUrls: ['./teaching-methods.component.scss']
})
export class TeachingMethodsComponent implements OnInit {
  committee: any = null;
  displaycolumns_methods:string[]=['a_year','resource','link_one','link_two','method','title','number_of_students','newsReport','edit','delete'];
  dataSource!: MatTableDataSource<TeachingMethodsComponent>;
  @ViewChild('paginator') paginator!: MatPaginator;
  constructor(
    public dialog : MatDialog,
    public router: Router,
    public service : ServiceService
  ) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.fetchteachingMethod();
      }

addNewMethods(){
  const dialogRef = this.dialog.open(AddNewTeachingMethodsComponent ,{width: "80%",height: "86vh",panelClass: 'full-width-dialog', data : {"committeeId": 2}});
    dialogRef.afterClosed().subscribe(result => {
      this.fetchteachingMethod();
    });
}
edit(row){
  const dialogRef = this.dialog.open(EditTeachingMethodsComponent,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data: row});
  dialogRef.afterClosed().subscribe((result: any) => {
    this.fetchteachingMethod();
  });
}
testreport(element){
  console.log(element)
  const dialogRef = this.dialog.open(TeachingmethodreportComponent ,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data:element});
  dialogRef.afterOpened().subscribe((result : any) => {
    //  result = this.test;
    //  console.log(result)
  });

}

fetchteachingMethod() {
  this.service.getUserWithUserId().subscribe((user: any) => {
    console.log("user",user)
    this.service.getData("/teaching-methods/teacher/" + user.teacher.teacherId).subscribe((res: any) => {
      
      console.log("methods",res);
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
  }, (err: any) => {
    alert("User authentication expired!!. Login again to continue.");
    this.router.navigateByUrl("");
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
    this.service.deleteData('/teaching-methods/'+row['id']).subscribe(response => {
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
