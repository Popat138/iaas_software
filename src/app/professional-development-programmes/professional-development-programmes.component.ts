import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { AddNewDevelopmentProgramComponent } from '../Addnew/add-new-development-program/add-new-development-program.component';
import { DownloadService } from '../download.service';
import { EditDevelopmentProgrammeComponent } from '../edit/iqac/edit-development-programme/edit-development-programme.component';
import { ServiceService } from '../service.service';
import { TestreportComponent } from '../testreport/testreport.component';
import { IqactestreportComponent } from '../iqactestreport/iqactestreport.component';
@Component({
  selector: 'app-professional-development-programmes',
  templateUrl: './professional-development-programmes.component.html',
  styleUrls: ['./professional-development-programmes.component.scss']
})
export class ProfessionalDevelopmentProgrammesComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    public service: ServiceService,
    public download: DownloadService
  ) { }


  displayedColumns: string[] = [
    'academic_year',
    'title',
    'dates',
    'n_teachers',
    'n_staff',
    's_agency',
    //'report',
    //'photograph',
    'viewReport',
    'participants',
    'edit',
    'delete'

  ];
    committee : any = null;
    dataSource!:MatTableDataSource<ProfessionalDevelopmentProgrammesComponent>;

  ngOnInit(): void {
    this.fetchData();
  }

  addnewprogram(){
    const dialogRef = this.dialog.open(AddNewDevelopmentProgramComponent ,{width: "70%",height: "86vh",panelClass: 'full-width-dialog'});
    dialogRef.afterClosed().subscribe((result : any) => {
       this.fetchData();
    });
  }

  //upload_cert() {}
  testreport(element){
    console.log(element)
    const dialogRef = this.dialog.open(IqactestreportComponent ,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data:element});
    dialogRef.afterOpened().subscribe((result : any) => {
      //  result = this.test;
      //  console.log(result)
    });

  }

  fetchData() {

    this.service.getData("/iqac-report/type/DEVELOPMENT_PROGRAM").subscribe((res : any) => {
      console.log("r es",res)
      const getPos:any = this.compute(res);
      getPos.then((response: any) => {
        this.dataSource = new MatTableDataSource(
          JSON.parse(JSON.stringify(response))
        );
        console.table(this.dataSource.data)
            //  this.dataSource.paginator = this.paginator;
            //  this.dataSource.sort = this.sort;
      });
    }, (err: any) => {
      console.warn(err);
    });

  }

  edit(row){
    const dialogRef = this.dialog.open(EditDevelopmentProgrammeComponent,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data: row});
    dialogRef.afterClosed().subscribe((result : any) => {
      this.fetchData();
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
      this.service.deleteData('/iqac-report/'+row['id']).subscribe(response => {
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


  formatDate(date) {
    const options:any = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    };

    date = new Date(date).toLocaleString("en-IN", options);
    // console.log("gg", date);

    return date;
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


  export(){
    var fileName = "Professional-development-programmes";
    // let data = this.download_data;
    let data: any = null;
    if(this.dataSource.filter != ""){
      data = this.dataSource.filteredData;
    }else{
      data = this.dataSource.data;
    }
    data = data.map((e)=>{
        return {
'Academic Year':e.academicYear,
'Title':e.title,
'Duration':this.formatDate(e.fromDate) + " To " + this.formatDate(e.toDate),
'Teachers count	':e.noOfTeachers,
'Staff count	':e.noOfStudent,
'Supporting agency':e.supportingAgency

        }
    });
    this.download.exportAsExcelFile(data,fileName);
  }


}
