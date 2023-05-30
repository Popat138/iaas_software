import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { AddOnlineResourcesComponent } from '../../Addnew/library/add-online-resources/add-online-resources.component';
import { EditOnlineResourcesComponent } from '../../edit/library/edit-online-resources/edit-online-resources.component';
import { ServiceService } from '../../service.service';

@Component({
  selector: 'app-select-online-resource-by-college-id',
  templateUrl: './select-online-resource-by-college-id.component.html',
  styleUrls: ['./select-online-resource-by-college-id.component.scss']
})
export class SelectOnlineResourceByCollegeIdComponent implements OnInit {

  committee : any =null;
  displayedColumns: string[] = [

    'year',
    'r_type',
    'r_name',
    //'isbn_no',
    //'period',
    'subs_date',
    'subs_amount',
    'no_of_users',
    'receipt',
    'usage_report',
    'select',

  ];

  dataSource!:MatTableDataSource<SelectOnlineResourceByCollegeIdComponent>;



  constructor(

    public dialog : MatDialog,
    public service : ServiceService,
    public dialogRef: MatDialogRef<SelectOnlineResourceByCollegeIdComponent>

  ) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.fetchCommittee();
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
  
  select(row) {
    this.dialogRef.close(row);
  }

  fetchCommittee() {

    this.service.getUserWithUserId().subscribe((user : any) => {
     // console.log(user);
      this.service.getData("/online-resource/college/" + user.college.id).subscribe((res: any) => {
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

              //     this.dataSource.paginator = this.paginator;
              //  this.dataSource.sort = this.sort;
        });
      }, (err: any) => {
        console.warn("No committee available!!");
      })
    }, (err : any) => {
      console.log(err);
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

  // viewAchievements(){
  //   const dialogRef = this.dialog.open(NewDetailsComponent ,{width: "70%",height: "86vh",panelClass: 'full-width-dialog'});
  // }

}



  export interface PeriodicElement {
    a_year:string;
    name_of_award: string;
    // awarding_agency:string;
    // level: string;
    // n_students: number;
    // s_agency: string;

  }