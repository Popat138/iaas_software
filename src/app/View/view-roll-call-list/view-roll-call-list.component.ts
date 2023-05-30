import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ServiceService } from 'src/app/service.service';

@Component({
  selector: 'app-view-roll-call-list',
  templateUrl: './view-roll-call-list.component.html',
  styleUrls: ['./view-roll-call-list.component.scss']
})
export class ViewRollCallListComponent implements OnInit {

  constructor(

    public dialog : MatDialog,
    public service : ServiceService,
    @Inject(MAT_DIALOG_DATA) public data : any
  ) { }

  displayedColumns: string[] = [
  'class',
  'division',
  'subject',
  'rollCallList',
];
  scholarshipData : any = null;
  dataSource!:MatTableDataSource<any>;

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.processData();
  }

  processData() {
    for(let i=0; i<this.data.roleCallList.length; i++) {
      this.service.getData("/division/subject/" +this.data.roleCallList[i].subject.id).subscribe((division: any) => {
        this.data.roleCallList[i].division = division;
        this.service.getData("/program-detail/division/" +division.id).subscribe((programDetail: any) => {
          this.data.roleCallList[i].programClass = programDetail.programClass;
          if(i+1 == this.data.roleCallList.length) { this.setData(); }
        });
      });
    };
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

  setData() {
    const getPos:any = this.compute(this.data.roleCallList);
    getPos.then((response: any) => {
      this.dataSource = new MatTableDataSource(
        JSON.parse(
          JSON.stringify(
            response
          )
        )
      );
      // console.table(this.dataSource.data)
      //  this.dataSource.paginator = this.paginator;
      //  this.dataSource.sort = this.sort;
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
