import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { ServiceService } from 'src/app/service.service';
@Component({
  selector: 'app-student-for-project',
  templateUrl: './student-for-project.component.html',
  styleUrls: ['./student-for-project.component.scss']
})
export class StudentForProjectComponent implements OnInit {
  user: any = null;
  divisionId: any = null;
  academicYear:any=null;
  displayedColumns: string[] = ['academicYear','firstName','middleName','lastName','enrollmentNumber', 'rollNumber', 'select'];
  dataSource!:MatTableDataSource<StudentForProjectComponent>;
  selection = new SelectionModel<StudentForProjectComponent>(true, []);
  
  constructor(
    private router: Router,
    private service: ServiceService,
    @Inject(MAT_DIALOG_DATA) public data : any,
    public dialogRef : MatDialogRef<StudentForProjectComponent>
  ) {
    this.divisionId = data.divisionId;
    this.academicYear=data.academicYear;
   }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.fetchData(); 
  }
  fetchData() {
    this.service.getData(`/user/academicYear/${this.academicYear}/division/${this.divisionId}`).subscribe((res: any) => {
      console.log(res);

      const getPos:any = this.compute(res);
      getPos.then((response: any) => {
        this.dataSource = new MatTableDataSource(
          JSON.parse(
            JSON.stringify(
              response
            )
          )
        );
        console.log(this.dataSource.data);

            //     this.dataSource.paginator = this.paginator;
            //  this.dataSource.sort = this.sort;
      });
  
    }, (err: any) => {
      alert("Error try again later!!!");
      this.dialogRef.close();
    });
}

submitForm(){
  var data=[
    {firstName:this.data.firstName, middletName:this.data.middleName,lastName:this.data.lastName}
    // {caption:this.caption,photograph:this.photograph}
  ]
  
  this.dialogRef.close(data);
  
}
selectElement(element: any) {
  // this.submitForm()
     this.dialogRef.close(element);
     
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
////
isAllSelected() {
  const numSelected = this.selection.selected.length;
  const numRows = this.dataSource.data.length;
  return numSelected === numRows;
}

/** Selects all rows if they are not all selected; otherwise clear selection. */
masterToggle() {
  this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
}

logSelection(event:any) {
  this.selection.selected.forEach(s => console.log(event));
}
checkboxLabel(row: StudentForProjectComponent): string {  
  if (!row) {  
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;  
  }  
  return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.user + 1}`;  
}  


///
AddstudentData() {  
  // debugger;  
  let student: any[] =[];
  const numSelected = this.selection.selected;  
  console.log("NUMBER",numSelected)
  this.dialogRef.close(numSelected);
  // numSelected.forEach((element, i) => {
  //   student.push({
  //     user: element,
  //    // streamClass: programDetail.programClass
  //   });
  // });

  // console.log("STUDENT",student)
  // // this.dialogRef.close(student);
  // if (student.length > 0) {  
  //     if (confirm("Are you sure to add students")) 
  //     student.forEach((element,i)=>{
  //     {  
        
  //       // this.service.deleteData('/user/'+ element.user.userId).subscribe(result => {  
  //       //       // alert(result);  
  //       //       location.reload();
                
  //       //   })  
  //     }  
  //     // this.dialogRef.close(element);
  //      });  
  //      this.dialogRef.close(student);
  //     }else {  
  //     alert("Select at least one row");  
  // }  
}  


}
