import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { AddNewIqacMeetingsComponent } from '../Addnew/add-new-iqac-meetings/add-new-iqac-meetings.component';
import { DownloadService } from '../download.service';
import { EditIqacMeetingsComponent } from '../edit/iqac/edit-iqac-meetings/edit-iqac-meetings.component';
import { ServiceService } from '../service.service';
import { ViewIQACMeetingDetailComponent } from '../View/view-iqacmeeting-detail/view-iqacmeeting-detail.component';
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';

@Component({
  selector: 'app-iqac-meetings',
  templateUrl: './iqac-meetings.component.html',
  styleUrls: ['./iqac-meetings.component.scss']
})
export class IqacMeetingsComponent implements OnInit {

  college;
  constructor(
    private dialog: MatDialog,
    private service: ServiceService,
    public download: DownloadService,

  ) { }


  displayedColumns: string[] = [
    'year',
    'date',
    'place',
    'time',
    'details',
    'edit',
    'delete'


  ];
    committee : any = null;
    dataSource!:MatTableDataSource<IqacMeetingsComponent>;

  ngOnInit(): void {
    this.fetchData();
    this.service.getUserWithUserId();
  }

  addiqacmeetings(){
   const dialogRef = this.dialog.open(AddNewIqacMeetingsComponent ,{width: "85%",height: "86vh",panelClass: 'full-width-dialog',data : {"meetingId":2}});
    dialogRef.afterClosed().subscribe((result : any) => {
       this.fetchData();
    });
  }

  viewdetails(element: any) {
    const dialogRef = this.dialog.open(ViewIQACMeetingDetailComponent ,{width: "85%",height: "86vh",panelClass: 'full-width-dialog', data: element});
    dialogRef.afterClosed().subscribe((result : any) => {
       this.fetchData();
    });
  }


  fetchData() {

    // getUserWithUserId

    this.service.getData("/iqac-meeting/college/" + 1).subscribe((res : any) => {
      const getPos:any = this.compute(res);
      getPos.then((response: any) => {
        this.dataSource = new MatTableDataSource(
          JSON.parse(
            JSON.stringify(response)
          )
        );

        //console.log(this.dataSource.data)
        this.college = this.dataSource.data;
        console.log(this.college[0].college.name)
            //     this.dataSource.paginator = this.paginator;
            //  this.dataSource.sort = this.sort;
      });
    }, (err: any) => {
      console.warn(err);
    });





  }

  edit(row){
    const dialogRef = this.dialog.open(EditIqacMeetingsComponent,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data: row});
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
      this.service.deleteData('/iqac-meeting/'+row['id']).subscribe(response => {
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
    var fileName = "IQAC Meetings";
    // let data = this.download_data;
    let data: any = null;
    if(this.dataSource.filter != ""){
      data = this.dataSource.filteredData;
    }else{
      data = this.dataSource.data;
    }
    data = data.map((e)=>{
        return {
          'Year':e.academicYear,
          'Date':e.date,
          'Place':e.place,
          'Time':e.time,
        }
    });
    this.download.exportAsExcelFile(data,fileName);
  }

//   header = [['Customer Id', 'Customer Name', 'Mobile number', 'Customer Type']]

//   exportPdf()
//           {
//   let store: any[][] = [];
//     let tableData :any = this.dataSource.filteredData

//    tableData.map((e)=>{

//      store.push([e.id,e.fk_user_id.user_name,e.mobile,e.type]);

//   });console.log(tableData);

//     var pdf = new jsPDF();

//     pdf.setFontSize(20);
//     // pdf.text('stock balance', 11, 8);
//     pdf.setFontSize(12);
//     pdf.setTextColor(99);

//     (pdf as any).autoTable({
//     head: this.header,
//     body: store,
//     theme: 'striped',
//     tableLineWidth: 0.20,
//     bodyStyles: { lineColor: [189, 195, 199] },
//     headerStyles: {
//       // fillColor: [255, 255, 255],
//       // textColor: [0, 0, 0],
//       fontSize: 8,
//       padding: 0,
//   },
//     styles: {
//         fontSize: 8,
//         font: 'helvetica',
//         cellPadding: 2,
//         rowHeight: 2,
//     },
//     didDrawCell: data => {
//         // console.log(data.column.index)
//     }
//     })

//     // Open PDF document in browser's new tab
//     // pdf.output('dataurlnewwindow')

//     //Download PDF doc
//     pdf.save('Customer.pdf');
// }


}
