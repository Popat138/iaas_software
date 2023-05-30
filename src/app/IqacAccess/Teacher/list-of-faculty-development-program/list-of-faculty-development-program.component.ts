import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AddNewDevelopmentProgramComponent } from 'src/app/Addnew/add-new-development-program/add-new-development-program.component';
import { DownloadService } from 'src/app/download.service';
import { EditDevelopmentProgrammeComponent } from 'src/app/edit/iqac/edit-development-programme/edit-development-programme.component';
import { ServiceService } from 'src/app/service.service';
// import { TestReportComponent } from 'src/app/test-report/test-report.component';
import { TestreportComponent } from 'src/app/testreport/testreport.component';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-list-of-faculty-development-program',
  templateUrl: './list-of-faculty-development-program.component.html',
  styleUrls: ['./list-of-faculty-development-program.component.scss']
})
export class ListOfFacultyDevelopmentProgramComponent implements OnInit {


  constructor(
    private dialog: MatDialog,
    public service: ServiceService,
    public download: DownloadService
  ) { }


  displayedColumns: string[] = [

    'academic_year',
    'teacher',
    'type',
    'course_title',
    'course_place',
    'duration',
    //'report',
    //'photograph',
    'upload_cert',

  ];
    committee : any = null;
    dataSource!:MatTableDataSource<ListOfFacultyDevelopmentProgramComponent>;
    @ViewChild('paginator') paginator!: MatPaginator;
  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.fetchData();
  }
//Add New FDP program
  addnewprogram(){
    const dialogRef = this.dialog.open(AddNewDevelopmentProgramComponent ,{width: "85%",height: "86vh",panelClass: 'full-width-dialog'});
    dialogRef.afterClosed().subscribe((result : any) => {
        this.fetchData();
    });
  }
  testreport(element){
    console.log(element)
    const dialogRef = this.dialog.open(TestreportComponent ,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data:element});
    dialogRef.afterOpened().subscribe((result : any) => {
      //  result = this.test;
      //  console.log(result)
    });


  }
//Fetch FDP program data
  fetchData() {
    this.service.getUserWithUserId().subscribe((user: any) => {
      this.service.getData("/faculty-program/college/" + user.college.id).subscribe((res: any) => {
       
        res.forEach((element,key) => {
          this.service.getData("/user/teacher/"+element.teacher.teacherId).subscribe((data:any)=>{

           res[key].user=data
           if(!(key < res.length-1)) {
             this.process(res);
           }           })
       });
       console.log("final teachet",res)
      }, (err: any) => {
        console.warn(err);
      });
    })
  }
  process(data) {
    const getPos:any = this.compute(data);
        getPos.then((response: any) => {
          this.dataSource = new MatTableDataSource(
            response
            // JSON.parse(
            //   JSON.stringify(response)
            // )
          );
          console.log(this.dataSource.data)
                  this.dataSource.paginator = this.paginator;
              //  this.dataSource.sort = this.sort;
        });
  }
  edit(row){
    const dialogRef=this.dialog.open(EditDevelopmentProgrammeComponent,{width:"70%",height:"86vh",panelClass:'full-width-dialog',data:row});
  }
  
  delete(row){

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

      
//End of FDP fetchdata
  export(){
    var fileName = "Faculty-development-programmes";
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
 'Teacher Name':e.firstName+ " "+ e.middleName + " "+e.lastName,
 'Type of Faculty Development Program':e.facultyProgramType,
 'Title of Program':e.titleOfCourse,
 'Place of FDP':e.placeOfCourse,
 'Duration':this.formatDate(e.startDate) + " To " + this.formatDate(e.endDate),
        }
    });
    this.download.exportAsExcelFile(data,fileName);
  }

}

