import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/service.service';
import { DownloadService } from 'src/app/download.service';
import { AddNewTeachingMethodsComponent } from 'src/app/Addnew/Teachers/add-new-teaching-methods/add-new-teaching-methods.component';
import { TeachingmethodreportComponent } from 'src/app/teachingmethodreport/teachingmethodreport.component';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-list-of-teaching-methods',
  templateUrl: './list-of-teaching-methods.component.html',
  styleUrls: ['./list-of-teaching-methods.component.scss']
})
export class ListOfTeachingMethodsComponent implements OnInit {
  committee: any = null;
  displaycolumns_methods:string[]=['a_year','dept','teacher','resource','link_one','link_two','method','title','number_of_students','newsReport'];
  dataSource!: MatTableDataSource<ListOfTeachingMethodsComponent>;
  
  @ViewChild('paginator') paginator!: MatPaginator;
  constructor(
    private dialog: MatDialog,
    public router: Router,
    public service: ServiceService,
    public download: DownloadService
  ) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.fetchteachingMethod()
  }

  addNewMethods(){
    const dialogRef = this.dialog.open(AddNewTeachingMethodsComponent ,{width: "80%",height: "86vh",panelClass: 'full-width-dialog', data : {"committeeId": 2}});
      dialogRef.afterClosed().subscribe(result => {
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
      this.service.getData("/teaching-methods/college/" + user.college.id).subscribe((res: any) => {
        
        console.log("methods",res);
        console.log(res);
        res.forEach((element,key) => {
           this.service.getData("/user/teacher/"+element.teacher.teacherId).subscribe((data:any)=>{

            res[key].user=data
            if(!(key < res.length-1)) {
              this.process(res);
            }           })
        });
        console.log("final teacher",res)
      }, (err: any) => {
        alert(err.error?.message);
      });

    }, (err: any) => {
      console.warn(err);
    });
  
  }
  process(data) {
    const getPos:any = this.compute(data);
        getPos.then((response: any) => {
          this.dataSource = new MatTableDataSource(
            response
          );
          console.log(this.dataSource.data)
                  this.dataSource.paginator = this.paginator;
              //  this.dataSource.sort = this.sort;
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
