import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-new-details',
  templateUrl: './new-details.component.html',
  styleUrls: ['./new-details.component.scss']
})
export class NewDetailsComponent implements OnInit {


  year_detail:any = null;
  committee: any = null;
  displayedColumns: string[] =
   ['a_year',
    //'details',
    'duration',
    'n_teachers',
    'n_students',
   's_agency',
    //'report'
  ];
  // dataSource = ELEMENT_DATA;


  dataSource!:MatTableDataSource<NewDetailsComponent>;


  constructor(

    @Inject(MAT_DIALOG_DATA) public data: any

  ) {

    this.year_detail = data;

  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.fetchdata();
  }

  fetchdata(){

    let reports = this.year_detail.reportOfActivities;
    console.log(reports)
    reports.map((element:any) => {
      element.academicYear = this.year_detail.academicYear
    });
    const getPos:any = this.compute(reports);
    getPos.then((response: any) => {
              this.dataSource = new MatTableDataSource(
                        JSON.parse(
                                  JSON.stringify(
                                            response
                                  )
                        )

              );
              // console.table(this.dataSource.data)

          //     this.dataSource.paginator = this.paginator;
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

}
