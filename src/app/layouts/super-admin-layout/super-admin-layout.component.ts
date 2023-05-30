import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SuperAdminAddNewCollegeComponent } from 'src/app/Addnew/super-admin-add-new-college/super-admin-add-new-college.component';
import { ServiceService } from 'src/app/service.service';
import { EditAdminCollegeComponent } from 'src/app/edit/edit-admin-college/edit-admin-college.component';

@Component({
  selector: 'app-super-admin-layout',
  templateUrl: './super-admin-layout.component.html',
  styleUrls: ['./super-admin-layout.component.scss']
})
export class SuperAdminLayoutComponent implements OnInit {

  displayedColumns: string[] = ['id', 'Asso',
  'college_name','address','description',
  // 'duration',
  // 'n_teachers',
  // 'n_students',
  // 's_agency',
  'college_code','image','edit' ];
  committee : any = null;
  dataSource!:MatTableDataSource<SuperAdminLayoutComponent>;



  constructor(

    public dialog: MatDialog,
    private router: Router,
    public service: ServiceService

  ) { }

  ngOnInit(): void {
    this.verifyUser();
  }

  logout(){
    this.router.navigateByUrl('');
    localStorage.clear();
    if(localStorage.length==0){
        this.router.navigate(
          [""], 
          { 
            replaceUrl: true 
          });
    }
  }
  edit(row){
    const dialogRef = this.dialog.open(EditAdminCollegeComponent,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data: row});
    dialogRef.afterClosed().subscribe((result : any) => {
      this.fetchCollege();
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

  verifyUser(){
    this.service.getData("/user/"+ localStorage.getItem("userId")).subscribe((res: any) => {
      if(res.role.roleName !== "SuperAdmin") {
        alert("Unathurized access!!");
        this.router.navigateByUrl("");
      }else {
        this.fetchCollege();
      }
    }, (err: any) => {
      alert("Unathurized access!!");
      this.router.navigateByUrl("");
    });
  }

  fetchCollege() {
    this.service.getData("/college").subscribe((res: any) => {
      this.committee = res
      // let yeardetail = res.yearDetails;
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

  addNewDetails(){
    const dialogRef = this.dialog.open(SuperAdminAddNewCollegeComponent ,{width: "70%",height: "86vh",panelClass: 'full-width-dialog', data : {"committeeId": 2}});
    dialogRef.afterClosed().subscribe(result => {
      this.fetchCollege();
    });
  }

}
