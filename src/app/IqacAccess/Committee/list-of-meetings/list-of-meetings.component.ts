import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ServiceService } from 'src/app/service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-of-meetings',
  templateUrl: './list-of-meetings.component.html',
  styleUrls: ['./list-of-meetings.component.scss']
})
export class ListOfMeetingsComponent implements OnInit {


  committee;
  displayedColumns1: string[] = [
    'year',
    'committee',
    'date',
    'agenda',
    'details',
    // 'edit',
    'delete'

  ];

  dataSource1!:MatTableDataSource<ListOfMeetingsComponent>;
  constructor(

    public dialog : MatDialog,
    public service : ServiceService
  ) { }

  ngOnInit(): void {
    this.dataSource1 = new MatTableDataSource();
    this.fetchCommittee();
  }

  viewmeeting(){


  }

  editmeeting(row){

  }

  deletemeeting(row){
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
        this.service.deleteData('/meeting-record/'+row['id']).subscribe(response => {
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
  

  viewmeetingupload(){

  }


  fetchCommittee() {
    this.service.getUserWithUserId().subscribe((user:any) => {
      this.service.getData("/meeting-record/college/"+user.college.id).subscribe((res: any) => {
        const getPos:any = this.compute(res);
        getPos.then((response: any) => {
                  this.dataSource1 = new MatTableDataSource(
                            JSON.parse(
                                      JSON.stringify(
                                                response
                                      )
                            )
  
                  );console.table(this.dataSource1.data)
  
              //     this.dataSource.paginator = this.paginator;
              //  this.dataSource.sort = this.sort;
        });
      }, (err: any) => {
        console.warn("No committee available!!");
      })
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

  applyFilter(event: any) {
    this.dataSource1.filterPredicate = (data: any, filter) => {
      const dataStr =JSON.stringify(data).toLowerCase();
      return dataStr.indexOf(filter) != -1;
    }
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource1.filter = filterValue.trim().toLowerCase();
    if (this.dataSource1.paginator) {
      this.dataSource1.paginator.firstPage();
    }
  }
}
