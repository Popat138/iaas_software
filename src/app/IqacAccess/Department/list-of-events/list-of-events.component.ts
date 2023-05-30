import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AddNewDepartmentEventComponent } from 'src/app/Addnew/add-new-department-event/add-new-department-event.component';
import { EditReportOfEventComponent } from 'src/app/edit/Department/edit-report-of-event/edit-report-of-event.component';
import { ServiceService } from 'src/app/service.service';
import { TestreportComponent } from 'src/app/testreport/testreport.component';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-list-of-events',
  templateUrl: './list-of-events.component.html',
  styleUrls: ['./list-of-events.component.scss']
})
export class ListOfEventsComponent implements OnInit {


  department: any = null;
  year_detail:any = null;
  committee: any = null;
  displayedColumns: string[] =
   [
    'send_to',
    'Department',
    'academic_year',
     'title',
    'duration',
    'n_teachers',
    'n_students',
   's_agency',
    //'report',
    // 'photograph',
    'viewReport',
    'participants','edit','delete',
    // 'send_to_new'
  ];
  // dataSource = ELEMENT_DATA;


  dataSource!:MatTableDataSource<ListOfEventsComponent>;

  @ViewChild('paginator') paginator!: MatPaginator;
  singleStatusSelection(row,event){
    console.log(row);
    console.log(event);
    const data = {
      send_to: row['send_to'],
        criteria_status: event.source.value
    }
    this.updateCriteria(row, event.value);
  }


  doubleStatusSelection(row1,event){
    console.log(row1);
    console.log(event);
    const data = {
      send_to_new: row1['send_to_new'],
        criteria_status: event.source.value
    }
    this.updateCriteria1(row1, event.value);
  }



  constructor(

    public dialog : MatDialog,
    public service : ServiceService,
    public router: Router
    //@Inject(MAT_DIALOG_DATA) public data: any

  ) {

   // this.year_detail = data;

  }


  testreport_event(element){
    console.log(element)
    const dialogRef = this.dialog.open(TestreportComponent ,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data:element});
    dialogRef.afterOpened().subscribe((result : any) => {
      //  result = this.test;
      //  console.log(result)
    });

  }


  updateCriteria(row: any, value:string) {
    this.service.putData(`/event-report/reportOfEvent/${row.id}/criteriaName/${value}`, null).subscribe((result) => {
      console.log(result);
      this.fetchdata();
    }, (err: any) => {
      console.log(err);
    })
  }

  updateCriteria1(row1: any, value:string) {
    this.service.putData(`/event-report/reportOfEvent/${row1.id}/criteriaName/${value}`, null).subscribe((result) => {
      console.log(result);
      this.fetchdata();
    }, (err: any) => {
      console.log(err);
    })
  }

  edit(row){
    const dialogRef = this.dialog.open(EditReportOfEventComponent,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data: row});
    dialogRef.afterClosed().subscribe((result) => {
      this.fetchdata();
    });
  }


  delete(row){
    // console.log(row);
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
      this.service.deleteData('/event-report/'+row['id']).subscribe(response => {
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

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.fetchdata();
  }


  addNewEventData(){

    const dialogRef = this.dialog.open(AddNewDepartmentEventComponent ,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data : this.department});
    dialogRef.afterClosed().subscribe((result: any) => {
      this.fetchdata();
    });
  }


  fetchdata(){

    this.service.getData("/user/" + localStorage.getItem("userId")).subscribe((res: any) =>  {
      this.service.getData("/event-report/college/" + res.college.id).subscribe((reports: any) => {
      const getPos:any = this.compute(reports);
      getPos.then((response: any) => {
                this.dataSource = new MatTableDataSource(
                          JSON.parse(
                                    JSON.stringify(
                                              response
                                    )
                          )

                );
                console.table(this.dataSource.data)

                this.dataSource.paginator = this.paginator;
            // this.dataSource.sort = this.sort;
      });
      });
    }, (err: any) => {
      alert("User detail not available!");
      this.router.navigateByUrl("");
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
interface send_to {
  send_to: String;
 }

 interface send_to_new {
  send_to_new: String;
 }
