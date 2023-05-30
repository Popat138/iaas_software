import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-teach-feedback',
  templateUrl: './teach-feedback.component.html',
  styleUrls: ['./teach-feedback.component.scss']
})
export class TeachFeedbackComponent implements OnInit {

  displayedColumns_teacher: string[] =['a_year','teacher','program','class','divison', 'subject', 'link',
  // 'delete'
];
  dataSource_teacher!:MatTableDataSource<TeachFeedbackComponent>;
  constructor(
    private router: Router,
    public service: ServiceService,
    public dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.fetchTeacherFeedback();
  }

  delete_teacher(row){
    this.service.deleteData("/teacher-feedback/" + row.feedback.id).subscribe((res: any) => {
      this.fetchTeacherFeedback();
    }, (err: any) => {
      console.log(err);
    });
  }
  
  
  fetchTeacherFeedback() {
    this.service.getData("/teacher-feedback/user/" + localStorage.getItem("userId")).subscribe((res: any) => {
      console.log(res);
      this.processTeacherFeedback(res);
      // return
      // let teacherFeedback: any[] =[];
      // res.forEach((element, i) => {
      //   this.service.getData("/stream-detail/division/" + element.academicDetail.division.id).subscribe((programDetail: any) => {
      //     console.log(programDetail);
      //     teacherFeedback.push({
      //       feedback: element,
      //       streamClass: programDetail.streamClass
      //     });
  
      //     if (!(i < res.length-1)) {
      //       this.processTeacherFeedback(teacherFeedback);
      //     }
      //   });
      // });
      
      
  
    }, (err: any) => {
      alert("Error try again later!!!");
    });
  }
  
  processTeacherFeedback(data) {
    const getPos:any = this.compute(data);
      getPos.then((response: any) => {
        this.dataSource_teacher = new MatTableDataSource(
          JSON.parse(
            JSON.stringify(
              response
            )
          )
        );
        console.log(this.dataSource_teacher.data);
  
            //     this.dataSource.paginator = this.paginator;
            //  this.dataSource.sort = this.sort;
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
