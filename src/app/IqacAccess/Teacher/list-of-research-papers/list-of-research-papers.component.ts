import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AddResearchPapersComponent } from 'src/app/Addnew/Teachers/add-research-papers/add-research-papers.component';
import { ServiceService } from 'src/app/service.service';
import { ViewResearchPaperComponent } from 'src/app/View/view-research-paper/view-research-paper.component';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-list-of-research-papers',
  templateUrl: './list-of-research-papers.component.html',
  styleUrls: ['./list-of-research-papers.component.scss']
})
export class ListOfResearchPapersComponent implements OnInit {


  displayedColumns: string[] = ['academic_year', 'authors','type','paper_title','journal_name','volume','issn','view'];

  constructor(
    private dialog: MatDialog,
    public service: ServiceService
  ) { }
  dataSource!:MatTableDataSource<ListOfResearchPapersComponent>;

  @ViewChild('paginator') paginator!: MatPaginator;
  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
   this.fetchData();
  }

  // addresearchpaper(){
  //   const dialogRef = this.dialog.open(AddResearchPapersComponent ,{width: "85%",height: "86vh",panelClass: 'full-width-dialog'});
  //   dialogRef.afterClosed().subscribe((result : any) => {
  //      this.fetchData();
  //   });


  // }

  viewDetail(element : any) {
    const dialogRef1 = this.dialog.open(ViewResearchPaperComponent ,{width: "85%",height: "86vh",panelClass: 'full-width-dialog', data: element});
    dialogRef1.afterClosed().subscribe((result : any) => {
       this.fetchData();
    });
  }

  fetchData() {
    this.service.getUserWithUserId().subscribe((user: any) => {
      this.service.getData("/research-publication/college/" + user.college.id).subscribe((res: any) => {
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
}
