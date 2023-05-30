import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { AddNewCommitteeComponent } from '../Addnew/add-new-committee/add-new-committee.component';
import { DownloadService } from '../download.service';
import { EditCreateCommitteeComponent } from '../edit/iqac/edit-create-committee/edit-create-committee.component';
import { ServiceService } from '../service.service';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-create-committee',
  templateUrl: './create-committee.component.html',
  styleUrls: ['./create-committee.component.scss']
})
export class CreateCommitteeComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    public service: ServiceService,
    public download: DownloadService
  ) { }


  displayedColumns: string[] = [
    'comm_name',
    // 'specialization',
    // 'establish_year',
    'chairman_name',
    'chairman_email',
    'chiarman_paswd',
    'edit',
    'delete'
   ];
    committee : any = null;
    dataSource!:MatTableDataSource<CreateCommitteeComponent>;
    @ViewChild('paginator') paginator!: MatPaginator;

  ngOnInit(): void {
    this.fetchData();
  }

  createcommittee(){
    const dialogRef = this.dialog.open(AddNewCommitteeComponent ,{width: "85%",height: "86vh",panelClass: 'full-width-dialog'});
    dialogRef.afterClosed().subscribe((result : any) => {
       this.fetchData();
    });
  }

  getChairmainData(rowData: any) {
    let index = rowData?.committeeMembers.findIndex(e => e.user.role.roleName == "Committee_chairman");
    return rowData.committeeMembers[index].user;
  }

  fetchData() {

    this.service.getData("/committee/college/"+1).subscribe((res : any) => {
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
    const dialogRef = this.dialog.open(EditCreateCommitteeComponent,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data: row});
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
      this.service.deleteData('/committee/'+row['id']).subscribe(response => {
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
    var fileName = "Committee";
    // let data = this.download_data;
    let data: any = null;
    if(this.dataSource.filter != ""){
      data = this.dataSource.filteredData;
    }else{
      data = this.dataSource.data;
    }
    data = data.map((e)=>{
        return {

'Committee Name':e.name,
'Chairman Email-id':this.getChairmainData(e).email,
'Chairman Password':this.getChairmainData(e).password,

        }
    });
    this.download.exportAsExcelFile(data,fileName);
  }


}
