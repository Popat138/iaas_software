import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddStudentRollListComponent } from '../Addnew/Teachers/add-student-roll-list/add-student-roll-list.component';
import { SelectStudentByDivisionComponent } from '../common/select-student-by-division/select-student-by-division.component';
@Component({
  selector: 'app-roll-call-list',
  templateUrl: './roll-call-list.component.html',
  styleUrls: ['./roll-call-list.component.scss']
})
export class RollCallListComponent implements OnInit {
  user:any=null;
  divisionId: any = null;
  academicYear:any=null;
  committee : any =null;
  studentData : any = null;
  public Form: FormGroup;
  displayedColumns: string[] = ['academic_year','program','class', 'div','list'
];
  dataSource!:MatTableDataSource<RollCallListComponent>;
  dataSource_list!:MatTableDataSource<RollCallListComponent>;
  
  constructor(
    private fb: FormBuilder,
    public dialog : MatDialog,
    public service : ServiceService,
    // @Inject(MAT_DIALOG_DATA) public data : any,
    //public dialogRef : MatDialogRef<RollCallListComponent>
     ) {
           
       }
  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.fetchrollCall();
    //For Student Data
   // this.dataSource_list = new MatTableDataSource();
   // this.fetchStudentData();

     }
  addNewRollCall(){
    const dialogRef = this.dialog.open(AddStudentRollListComponent ,{width: "80%",height: "86vh",panelClass: 'full-width-dialog', data : {"committeeId": 2}});
    dialogRef.afterClosed().subscribe(result => {
      this.fetchrollCall();
    });
  }

  fetchrollCall(){
    this.service.getData("/roll-list/user/"+localStorage.getItem('userId')).subscribe((res: any) => {
      console.log("resPonse",res)
      // this.studentData = res;
      // console.log("Student",this.studentData)
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

///Student Data/////

fetchStudentData(){
  this.service.getData("/roll-list/user/"+localStorage.getItem('userId')).subscribe((res1: any) => {
    console.log("LETData",res1)
    this.studentData = res1;
    console.log("LETStudent",this.studentData)
   this.academicYear=this.studentData[0]?.academicDetail?.academicYear
   this.divisionId=this.studentData[0]?.academicDetail?.division.id
//
const programDialogRef = this.dialog.open(SelectStudentByDivisionComponent, { width: "80%", height: "86vh", panelClass: 'full-width-dialog', data: { divisionId:this.divisionId,academicYear:this.academicYear } });
programDialogRef.afterClosed().subscribe((result: any) => {
  this.user = result;
  console.log(result);
  // this.Form.get("student_name").setValue(result.firstName + result.middleName + result.lastName);
})

//


   this.service.getData(`/user/academicYear/${this.academicYear}/division/${this.divisionId}`).subscribe((res: any) => {
    console.log("CLASS",res);
    const getPos:any = this.compute_list(res);
    getPos.then((response: any) => {
      this.dataSource_list = new MatTableDataSource(
        JSON.parse(
          JSON.stringify(
            response
          )
        )
      );
      console.log(this.dataSource_list.data);

          //     this.dataSource.paginator = this.paginator;
          //  this.dataSource.sort = this.sort;
    });
  });
});
}


async compute_list(data: any) {
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
