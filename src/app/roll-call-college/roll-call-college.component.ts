import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddStudentRollListComponent } from '../Addnew/Teachers/add-student-roll-list/add-student-roll-list.component';
import { SelectStudentByDivisionComponent } from '../common/select-student-by-division/select-student-by-division.component';
@Component({
  selector: 'app-roll-call-college',
  templateUrl: './roll-call-college.component.html',
  styleUrls: ['./roll-call-college.component.scss']
})
export class RollCallCollegeComponent implements OnInit {

  user: any = null;
  course: any = null;
  program: any = null;
  divisions: any = null;
  programDetails: any = null;
  studentData:any=null;
  streams:any=null;
  classData:any;
  
  year: any[] = [
    {year: '2018-2019', },
    {year: '2019-2020', },
    {year: '2020-2021', },
    {year: '2021-2022', },
  ];
  public Form: FormGroup;
  displayedColumns: string[] = ['academicYear','enrollmentNumber', 'rollNumber','firstName','lastName','div','select'];
  dataSource!:MatTableDataSource<RollCallCollegeComponent>;
  dataSource_S!:MatTableDataSource<RollCallCollegeComponent>;
  selection = new SelectionModel<RollCallCollegeComponent>(true, []);
  constructor(
    private fb: FormBuilder,
    public service: ServiceService,
    public dialog: MatDialog,
    public router: Router
  ) { 
    this.Form = this.fb.group({
      academic_year: this.fb.control('',Validators.required),
      // year: this.fb.control('',Validators.required),
      // semester: this.fb.control('',Validators.required),
      class: this.fb.control('',Validators.required),
      div: this.fb.control('',Validators.required),
      stream: this.fb.control('',Validators.required),
      // c_code: this.fb.control('',Validators.required),
      // c_name: this.fb.control('',Validators.required)
    })
  }

  ngOnInit(): void {
    this.fetchStream1();
  }

  classChanges(event: any) {
    if(event.value != "" && event.value != null && event.value != undefined) {
      this.divisions = event.value.divisions;
    }
  }

fetchStream(){
  this.service.getData("/stream-detail").subscribe((res : any) => {
    console.log("res",res)
    this.programDetails = res;
    const getPos:any = this.compute(res);
    getPos.then((response: any) => {
      this.dataSource = new MatTableDataSource(
        JSON.parse(
          JSON.stringify(response)
        )
      );
      console.log(this.dataSource.data);
          //     this.dataSource.paginator = this.paginator;
          //  this.dataSource.sort = this.sort;
    });
  }, (err: any) => {
    console.warn(err);
  });

}
removeSelectedRows(){}

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

submitForm(){
  console.log("div==>",this.Form.get("div").value.id);
  console.log(this.fetchClass());
  this.service.getData(`/user/academicYear/${this.Form.get("academic_year").value}/division/${this.Form.get("div").value.id}`).subscribe((res: any) => {
    console.log(res);
    this.studentData = res;
    const getPos:any = this.compute_data(res);
    getPos.then((response: any) => {
      this.dataSource_S = new MatTableDataSource(
        JSON.parse(
          JSON.stringify(
            response
          )
        )
      );
      console.log(this.dataSource_S.data);

          //     this.dataSource.paginator = this.paginator;
          //  this.dataSource.sort = this.sort;
    });

  }, (err: any) => {
    alert("Error try again later!!!");
    // this.dialogRef.close();
  });
}

async compute_data(data: any) {
  return new Promise(resolve => {
            for (var i = 0; i < data.length; i++) {
                      data[i].pos = i + 1;
                      if (i == data.length - 1) {
                                resolve(data);
                      }
            }
  });
}

fetchClass(): any {
  let data = this.Form.get("stream")?.value;
  console.log("Class",data);
  if (data !== undefined && data.id !== undefined) {
    this.service.getData("/stream-detail/stream/" + data.id).subscribe((res: any) => {
      console.log("CLASS",res);
      if (res != null && res != undefined) {
        this.classData = res
      }
      // this.departments = res;
    }, (err: any) => {
      alert("Error try again later!!! Second");
    });
  }

}
changeStream(event: any) {
  // this.department = this.Form.get('department')
  if (event.value != "" && event.value != null && event.value != undefined) {
    this.Form.get("class")?.enable();
    this.fetchClass()
  } else {
    this.Form.get("class")?.disable();
  }
}
fetchStream1() {
  this.service.getData("/stream").subscribe((res: any) => {
    console.log(res);
    this.streams = res;
  }, (err: any) => {
    alert("Error try again!!!");
  });
}

isAllSelected() {
  const numSelected = this.selection.selected.length;
  const numRows = this.dataSource_S.data.length;
  return numSelected === numRows;
}

/** Selects all rows if they are not all selected; otherwise clear selection. */
masterToggle() {
  this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource_S.data.forEach(row => this.selection.select(row));
}

logSelection(event:any) {
  this.selection.selected.forEach(s => console.log(event));
}
checkboxLabel(row: RollCallCollegeComponent): string {  
  if (!row) {  
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;  
  }  
  return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.user + 1}`;  
}  

//////
DeleteData() {  
  // debugger;  
  let student: any[] =[];
  const numSelected = this.selection.selected;  
  console.log("NUMBER",numSelected)

  numSelected.forEach((element, i) => {
    student.push({
      user: element,
     // streamClass: programDetail.programClass
    });
  });

  console.log("STUDENT",student)

  if (student.length > 0) {  
      if (confirm("Are you sure to delete items ")) 
      student.forEach((element,i)=>{
      {  this.service.deleteData('/user/'+ element.user.userId).subscribe(result => {  
              // alert(result);  
              location.reload();
                
          })  
      }  
       });  
      }else {  
      alert("Select at least one row");  
  }  
}  











}

