import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { AddNewCertificateCourseComponent } from '../Addnew/add-new-certificate-course/add-new-certificate-course.component';
import { DownloadService } from '../download.service';
import { EditCertificateCoursesComponent } from '../edit/iqac/edit-certificate-courses/edit-certificate-courses.component';
import { ServiceService } from '../service.service';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-certificate-cources',
  templateUrl: './certificate-cources.component.html',
  styleUrls: ['./certificate-cources.component.scss']
})
export class CertificateCourcesComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    private service: ServiceService,
    private download: DownloadService
  ) { }


  displayedColumns: string[] = [
    'faculty',
    'prog_name',
    'course_name',
    'duration',
    'course_lvl',
    'impl_year' ,
    'edit',
    'delete'

   ];
    committee : any = null;
    dataSource!:MatTableDataSource<CertificateCourcesComponent>;
    @ViewChild('paginator') paginator!: MatPaginator;

  ngOnInit(): void {

    this.fetchData();
  }

  certificatecourse(){
    const dialogRef = this.dialog.open(AddNewCertificateCourseComponent ,{width: "85%",height: "86vh",panelClass: 'full-width-dialog'});
    dialogRef.afterClosed().subscribe((result : any) => {
       this.fetchData();
    });
  }

  // getProgramName(element: any): any {
  //   this.service.getData("/program/course/" + element.courseId).subscribe((res : any) => {
  //     return res.programName;
  //   }, (err: any) => {
  //     console.warn("Error!!!!!!!!!!");
  //   });
  // }

  fetchData() {

    this.service.getData("/certificate-course/college/" + 1).subscribe((res : any) => {
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

  edit(row){
    const dialogRef = this.dialog.open(EditCertificateCoursesComponent,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data: row});
    dialogRef.afterClosed().subscribe((result : any) => {
      this.fetchData();
   });
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
      this.service.deleteData('/certificate-course/'+row['course_id']).subscribe(response => {
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

  export(){
    var fileName = "Certificate Course";
    // let data = this.download_data;
    let data: any = null;
    if(this.dataSource.filter != ""){
      data = this.dataSource.filteredData;
    }else{
      data = this.dataSource.data;
    }
    data = data.map((e)=>{
        return {
'Faculty':e.faculty,
'Program Name':e.program_name,
'Course Name':e.name,
'Duration':e.duration,
'Course Level':e.level,
'Implementation':e.implementation_year
        }
    });
    this.download.exportAsExcelFile(data,fileName);
  }



}
