import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AddResearchPapersComponent } from '../Addnew/Teachers/add-research-papers/add-research-papers.component';
import { ServiceService } from '../service.service';
import { ViewResearchPaperComponent } from '../View/view-research-paper/view-research-paper.component';
import Swal from 'sweetalert2';
import { EditResearchPapersComponent } from '../edit/teacher/edit-research-papers/edit-research-papers.component';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-research-paper',
  templateUrl: './research-paper.component.html',
  styleUrls: ['./research-paper.component.scss']
})
export class ResearchPaperComponent implements OnInit {

  displayedColumns: string[] = ['academic_year','authors','type','paper_title','journal_name','volume','issn','view','edit', 'delete'];

  constructor(
    private dialog: MatDialog,
    public service: ServiceService
  ) { }
  dataSource!:MatTableDataSource<ResearchPaperComponent>;
  @ViewChild('paginator') paginator!: MatPaginator;
  

  ngOnInit(): void {
   this.fetchData();
  }

  addresearchpaper(){
    const dialogRef = this.dialog.open(AddResearchPapersComponent ,{width: "85%",height: "86vh",panelClass: 'full-width-dialog'});
    dialogRef.afterClosed().subscribe((result : any) => {
       this.fetchData();
    });


  }
  edit(row){
    const dialogRef = this.dialog.open(EditResearchPapersComponent,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data: row});
    dialogRef.afterClosed().subscribe((result : any) => {
      this.fetchData();
   });
  }

  viewDetail(element : any) {
    const dialogRef1 = this.dialog.open(ViewResearchPaperComponent ,{width: "85%",height: "86vh",panelClass: 'full-width-dialog', data: element});
    dialogRef1.afterClosed().subscribe((result : any) => {
       this.fetchData();
    });
  }

  fetchData() {
    this.service.getUserWithUserId().subscribe((user: any) => {
      this.service.getData("/research-publication/teacher/" + user.teacher.teacherId).subscribe((res: any) => {
        console.log(res);
        const getPos:any = this.compute(res);
        getPos.then((response: any) => {
          this.dataSource = new MatTableDataSource(
            JSON.parse(
              JSON.stringify(response)
            )
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

  delete(row){
    console.log(row);

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
      this.service.deleteData('/research-publication/'+row['id']).subscribe(response => {
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
