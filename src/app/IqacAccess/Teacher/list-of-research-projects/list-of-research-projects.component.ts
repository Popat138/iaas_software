import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ServiceService } from 'src/app/service.service';
import { DownloadService } from 'src/app/download.service';
import { AddNewResearchProjectsComponent } from 'src/app/Addnew/Teachers/add-new-research-projects/add-new-research-projects.component';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-list-of-research-projects',
  templateUrl: './list-of-research-projects.component.html',
  styleUrls: ['./list-of-research-projects.component.scss']
})
export class ListOfResearchProjectsComponent implements OnInit {
  displayedColumns: string[] = ['academic_year','award_year','level','dept','title_of_book','authors','publisher','edition','agency','upload_cert'];
  constructor(
    private dialog: MatDialog,
    public service: ServiceService,
    public download: DownloadService
   
  ) { }
  dataSource!:MatTableDataSource<ListOfResearchProjectsComponent>;
  
  @ViewChild('paginator') paginator!: MatPaginator;
  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.fetchData();
  }
  addprojects(){
    const dialogRef = this.dialog.open(AddNewResearchProjectsComponent ,{width: "85%",height: "86vh",panelClass: 'full-width-dialog'});
    dialogRef.afterClosed().subscribe((result : any) => {
       this.fetchData();
    });
  }
  delete(row){
    console.log(row);

      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to delete this!",
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
      this.service.deleteData('/research-project/'+row['id']).subscribe(response => {
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
  fetchData() {
    this.service.getUserWithUserId().subscribe((user: any) => {
      this.service.getData("/research-project/college/" + user.college.id).subscribe((res: any) => {
        console.log(res);
        const getPos:any = this.compute(res);
        getPos.then((response: any) => {
          this.dataSource = new MatTableDataSource(
            JSON.parse(JSON.stringify(response)            )
          );
          console.log(this.dataSource.data)
                  this.dataSource.paginator = this.paginator;
              //  this.dataSource.sort = this.sort;
        });
      }, (err: any) => {
        alert(err.error?.message);
      });
      
    }, (err: any) => {
      console.warn(err);
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
