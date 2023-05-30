import { Component, OnInit } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MatButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ServiceService } from '../service.service';
import {AddOneTimeFormComponent} from '../Addnew/Teachers/add-one-time-form/add-one-time-form.component';
import { ViewOneTimeFormComponent } from '../View/view-one-time-form/view-one-time-form.component';
import { EditOneTimeFormComponent } from '../edit/teacher/edit-one-time-form/edit-one-time-form.component';
import { ViewBiodataComponent } from '../View/view-biodata/view-biodata.component';
@Component({
  selector: 'app-one-time-form',
  templateUrl: './one-time-form.component.html',
  styleUrls: ['./one-time-form.component.scss']
})
export class OneTimeFormComponent implements OnInit {

  displayedColumns: string[] = ['f_Name','Name','l_Name', 'DOB', 'Addhar_no','Pancard_no','designation','view','biodata','edit'];

  constructor(
    private dialog: MatDialog,
    public service: ServiceService
  ) { }
  dataSource!:MatTableDataSource<OneTimeFormComponent>;

  ngOnInit(): void {
   this.fetchData();
  }

  addonetimeform(){
    const dialogRef = this.dialog.open(AddOneTimeFormComponent ,{width: "85%",height: "86vh",panelClass: 'full-width-dialog'});
    dialogRef.afterClosed().subscribe((result : any) => {
       this.fetchData();
    });
  }

  viewDetail(element : any) {
    const dialogRef1 = this.dialog.open(ViewOneTimeFormComponent ,{width: "85%",height: "86vh",panelClass: 'full-width-dialog', data : element});
    dialogRef1.afterClosed().subscribe((result : any) => {
       this.fetchData();
    });
  }
  viewBiodata(element : any) {
    const dialogRef1 = this.dialog.open(ViewBiodataComponent ,{width: "85%",height: "86vh",panelClass: 'full-width-dialog', data : element});
    dialogRef1.afterClosed().subscribe((result : any) => {
       this.fetchData();
    });
  }

  edit(row){
    const dialogRef = this.dialog.open(AddOneTimeFormComponent,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data: row});
    dialogRef.afterClosed().subscribe((result : any) => {
        console.log("result",result)
        if(result==="update"){
          window.location.reload();
        }
        else{
          this.fetchData();
        }
   });
  }
  fetchData() {
    this.service.getUserWithUserId().subscribe((user : any) => {
      this.service.getData("/user/" + user.userId).subscribe((res: any) => {
        console.log(res);
        let userList: any[] = [];
        userList.push(res);
  
        const getPos:any = this.compute(userList);
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
        alert("Error try again later!!!!!!!!");
      });
    }, (err: any) => {
      alert("Error try again later!!!!!!!!");
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
  // export interface PeriodicElement {
  //   f_Name:string;
  //   Name: string;
  //   l_Name:string;
  //   DOB: string;
  //   Addhar_no: number;
  //   Pancard_no: string;

  // }

  // const ELEMENT_DATA: PeriodicElement[] = [
  //   {f_Name:'This',Name:'Test',l_Name:'Complete', DOB: '1/10/2002', Addhar_no: 9876543210, Pancard_no: '123456',},

  // ];
