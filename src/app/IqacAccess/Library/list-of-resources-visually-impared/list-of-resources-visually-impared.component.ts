import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AddOnlineResourcesVisuallyImparedComponent } from 'src/app/Addnew/library/add-online-resources-visually-impared/add-online-resources-visually-impared.component';
import { EditResourcesVisuallyComponent } from 'src/app/edit/library/edit-resources-visually/edit-resources-visually.component';
import { ServiceService } from 'src/app/service.service';
import { ViewResourceListComponent } from 'src/app/View/view-resource-list/view-resource-list.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-of-resources-visually-impared',
  templateUrl: './list-of-resources-visually-impared.component.html',
  styleUrls: ['./list-of-resources-visually-impared.component.scss']
})
export class ListOfResourcesVisuallyImparedComponent implements OnInit {



  committee : any =null;
  displayedColumns: string[] = [

    'total_books','audio_books',
    'braillie_list','audio_list','view_resources',
    // 'edit',
    'delete'

  ];

  dataSource!:MatTableDataSource<ListOfResourcesVisuallyImparedComponent>;



  constructor(

    public dialog : MatDialog,
    public service : ServiceService

  ) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.fetchCommittee();
  }

  addDetails(){}



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
  edit(row){
    const dialogRef = this.dialog.open(EditResourcesVisuallyComponent,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data: row});
  }

  delete(row){
    // console.log(row);
    // if(confirm("Do you want to delete this user ?")) {


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
      this.service.deleteData('/online-visually-impared/'+row['id']).subscribe(response => {
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

  viewResources(element: any) {
    const dialogRef = this.dialog.open(ViewResourceListComponent ,{width: "80%",height: "86vh",panelClass: 'full-width-dialog', data: element});
    dialogRef.afterClosed().subscribe(result => {
      this.fetchCommittee();
    });
  }



  fetchCommittee() {

    this.service.getUserWithUserId().subscribe((user : any) => {
     // console.log(user);
      this.service.getData("/online-visually-impared/college/" + user.college.id).subscribe((res: any) => {
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



