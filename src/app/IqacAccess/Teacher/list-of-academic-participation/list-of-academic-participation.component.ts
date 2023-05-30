import { Component, OnInit,ViewChild } from '@angular/core';
import { ServiceService } from 'src/app/service.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-list-of-academic-participation',
  templateUrl: './list-of-academic-participation.component.html',
  styleUrls: ['./list-of-academic-participation.component.scss']
})
export class ListOfAcademicParticipationComponent implements OnInit {
  displayedColumns: string[] = ['academic_year','teacher','academic_body','university','member_type','upload_cert','examination','univer_college','subject','upload_letter'];

  constructor(    public service: ServiceService
    ) { }
    dataSource!:MatTableDataSource<ListOfAcademicParticipationComponent>;
    
    @ViewChild('paginator') paginator!: MatPaginator;

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.fetchData();
  }
  fetchData() {
    this.service.getUserWithUserId().subscribe((user: any) => {
      console.log("aaa",user)
      this.service.getData("/academic-participation/college/" + user.college.id).subscribe((res: any) => {
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
