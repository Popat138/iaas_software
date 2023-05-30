import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AddNewRecognitionsComponent } from 'src/app/Addnew/add-new-recognitions/add-new-recognitions.component';
import { EditRecognitionsComponent } from 'src/app/edit/Committee/edit-recognitions/edit-recognitions.component';
import { ServiceService } from 'src/app/service.service';
import { NewDetailsComponent } from 'src/app/View/new-details/new-details.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-of-award',
  templateUrl: './list-of-award.component.html',
  styleUrls: ['./list-of-award.component.scss']
})
export class ListOfAwardComponent implements OnInit {



  committee : any =null;
  displayedColumns_award: string[] = ['send_to','a_year',
  'committee','title',
  'nameOfStudent','name_of_award','award_name','awarding_agency', 'level', 'certificate',
  // 'edit',
  'delete'];

  dataSource_award!:MatTableDataSource<ListOfAwardComponent>;



  constructor(

    public dialog : MatDialog,
    public service : ServiceService

  ) { }

  ngOnInit(): void {
    this.dataSource_award = new MatTableDataSource();
    this.fetch_award();
  }

  addDetails(){}

  singleStatusSelection(row,event){
    const data = {
      send_to: row['send_to'],
        criteria_status: event.source.value
    }
    this.updateCriteria(row, event.value);
  }

  updateCriteria(row: any, value:string) {
    this.service.putData(`/student-achievement/studentAchievement/${row.id}/criteriaName/${value}`, null).subscribe((result) => {
      console.log(result);
      this.fetch_award();
    }, (err: any) => {
      console.log(err);
    })
  }

  addNewStudentsAward(){
    const dialogRef = this.dialog.open(AddNewRecognitionsComponent ,{width: "80%",height: "86vh",panelClass: 'full-width-dialog', data : {"committeeId": this.committee.id}});
    dialogRef.afterClosed().subscribe(result => {
      this.fetch_award();
    });
  }


  edit_award(row){
    const dialogRef = this.dialog.open(EditRecognitionsComponent,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data: row});
  }


  delete_award(row){
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
      this.service.deleteData('/achievement/'+row['id']).subscribe(response => {
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
    this.dataSource_award.filterPredicate = (data: any, filter) => {
      const dataStr =JSON.stringify(data).toLowerCase();
      return dataStr.indexOf(filter) != -1;
    }
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource_award.filter = filterValue.trim().toLowerCase();
    if (this.dataSource_award.paginator) {
      this.dataSource_award.paginator.firstPage();
    }
  }


  fetch_award() {
    this.service.getUserWithUserId().subscribe((user: any) => {
      this.service.getData("/student-achievement/college/"+user.college.id).subscribe((res: any) => {
        console.log("user",res)
        const getPos:any = this.compute(res);
        getPos.then((response: any) => {
                  this.dataSource_award = new MatTableDataSource(
                            JSON.parse(
                                      JSON.stringify(
                                                response
                                      )
                            )
  
                  );console.table(this.dataSource_award.data)
  
              //     this.dataSource.paginator = this.paginator;
              //  this.dataSource.sort = this.sort;
        });
      }, (err: any) => {
        console.warn("No committee available!!");
      })
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

  viewAchievements(){
    const dialogRef = this.dialog.open(NewDetailsComponent ,{width: "70%",height: "86vh",panelClass: 'full-width-dialog'});
  }

}



