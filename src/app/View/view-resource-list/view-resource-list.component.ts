import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ServiceService } from 'src/app/service.service';

@Component({
  selector: 'app-view-resource-list',
  templateUrl: './view-resource-list.component.html',
  styleUrls: ['./view-resource-list.component.scss']
})
export class ViewResourceListComponent implements OnInit {

  constructor(

    public dialog : MatDialog,
    public service : ServiceService,
    @Inject(MAT_DIALOG_DATA) public data : any
  ) { }

  displayedColumns: string[] = [
  'softwareName',
  'vendorName',
  'receipt',
];
  scholarshipData : any = null;
  dataSource!:MatTableDataSource<any>;

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    console.log(this.data);
    this.setData();
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
    const getPos:any = this.compute(this.data.resources);
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
