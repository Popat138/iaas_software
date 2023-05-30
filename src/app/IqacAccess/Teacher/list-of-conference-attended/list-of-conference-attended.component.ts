import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AddSeminarsAttendedComponent } from 'src/app/Addnew/Teachers/add-seminars-attended/add-seminars-attended.component';
import { ServiceService } from 'src/app/service.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-list-of-conference-attended',
  templateUrl: './list-of-conference-attended.component.html',
  styleUrls: ['./list-of-conference-attended.component.scss']
})
export class ListOfConferenceAttendedComponent implements OnInit {


  displayedColumns: string[] = ['academic_year','teacher','level','type','workshop_title','course_place','duration','role','upload_cert',
  // 'edit','edit'
];

  constructor(
    private dialog: MatDialog,
    public service: ServiceService
  ) { }
  dataSource!:MatTableDataSource<ListOfConferenceAttendedComponent>;
  @ViewChild('paginator') paginator!: MatPaginator;
  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
   this.fetchData();
  }

  addseminar(){
    const dialogRef = this.dialog.open(AddSeminarsAttendedComponent ,{width: "85%",height: "86vh",panelClass: 'full-width-dialog'});
    dialogRef.afterClosed().subscribe((result : any) => {
       this.fetchData();
    });


  }

  edit_conferenceattended(){}
  delete_conferenceattended(){}

  fetchData() {
    this.service.getUserWithUserId().subscribe((user: any) => {
      console.log("teaher data",user);
      this.service.getData("/faculty-seminar/college/" + user.college.id).subscribe((res: any) => {
        console.log(res);
        res.forEach((element,key) => {
           this.service.getData("/user/teacher/"+element.teacher.teacherId).subscribe((data:any)=>{
  
            res[key].user=data
            if(!(key < res.length-1)) {
              this.process(res);
            }           })
        });
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
            // JSON.parse(
            //   JSON.stringify(response)
            // )
          );
          console.log(this.dataSource.data)

          this.dataSource.paginator = this.paginator;
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
