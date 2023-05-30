import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DownloadService } from 'src/app/download.service';
import { EditBookBankComponent } from 'src/app/edit/library/edit-book-bank/edit-book-bank.component';
import { EditIlmsInfoComponent } from 'src/app/edit/library/edit-ilms-info/edit-ilms-info.component';
import { EditJournalSubscriptionComponent } from 'src/app/edit/library/edit-journal-subscription/edit-journal-subscription.component';
import { EditOnlineResourcesComponent } from 'src/app/edit/library/edit-online-resources/edit-online-resources.component';
import { EditPurchasedBooksComponent } from 'src/app/edit/library/edit-purchased-books/edit-purchased-books.component';
import { EditRareBooksComponent } from 'src/app/edit/library/edit-rare-books/edit-rare-books.component';
import { EditResourcesVisuallyComponent } from 'src/app/edit/library/edit-resources-visually/edit-resources-visually.component';
import { ServiceService } from 'src/app/service.service';
import { ViewResourceListComponent } from 'src/app/View/view-resource-list/view-resource-list.component';
import { AddscreenshotComponent } from 'src/app/Addnew/library/addscreenshot/addscreenshot.component';
import { MatPaginator } from '@angular/material/paginator';
import { EditCriteriaReportComponent } from 'src/app/edit/edit-criteria-report/edit-criteria-report.component';
import { ViewCriteriaReportsComponent } from 'src/app/View/view-criteria-reports/view-criteria-reports.component';
import { ViewCriteriaQuantitativeComponent } from 'src/app/View/view-criteria-quantitative/view-criteria-quantitative.component';
import { EditCriquantitativeReportComponent } from 'src/app/edit/edit-criquantitative-report/edit-criquantitative-report.component';
@Component({
  selector: 'app-criteria4',
  templateUrl: './criteria4.component.html',
  styleUrls: ['./criteria4.component.scss']
})
export class Criteria4Component implements OnInit {


  department: any = null;


  year_detail:any = null;
  committee: any = null;
  displayedColumns_ilms: string[] =['name','nature_of_automation','year','vendor_name','purchase_receipt','maintenance_bill',
  // 'edit','delete'
];


  displayedColumns_bookbank: string[] = ['academic_year','benefited_students','books_issued','total_cost','fee_collected','upload_studentlist',
  // 'edit','delete'
];
  displayedColumns_onlineresources: string[] = ['year','r_type','r_name','subs_date','subs_amount','no_of_users','receipt','usage_report',
  // 'edit','delete'
];
  displayedColumns_purchase: string[] = ['year','booktype','totalbooks','amountpaid','invoiceno','date','view_upload_list',
  // 'edit','delete'
];
  displayedColumns_rare: string[] = [
    // 'total_books',
  'accession_number','book_title','author','publisher','public_year',
  // 'edit','delete'
];
  displayedColumns_resourecesvisually: string[] = [
    'total_books','audio_books',
    'braillie_list','audio_list','view_resources',
    // 'edit',
    // 'delete'
  ];
  displayedColumns_journals: string[] = ['year','j_type','j_name','isbn_no','period','subs_date','subs_amount','j_mode','receipt',
  // 'edit','delete'
];
  displayedColumns_usagereport: string[] = ['academic_year','resource_name','total_users','upload_usage_report',
  // 'edit','delete'
];

displayedColumns: string[] = [   'Sr_no', 'academicYear','screenshot',  'view_ss'];
displayedColumns_qualN: string[] = [
  'year',
  'name',
  'type',
  'number',
  'title',
  'view',
  'edit',
  // 'delete'
    ];
    displayedColumns_quanT: string[] = [
      'year',
      'name',
      'type',
      'number',
      'title',
      'view',
      'edit',
      // 'delete'
        ];

  dataSource_ilms!:MatTableDataSource<Criteria4Component>;
  dataSource_bookbank!:MatTableDataSource<Criteria4Component>;
  @ViewChild('paginator1') paginator1: MatPaginator;
  dataSource_onlineresources!:MatTableDataSource<Criteria4Component>;
  @ViewChild('paginator2') paginator2: MatPaginator;
  dataSource_purchase!:MatTableDataSource<Criteria4Component>;
  @ViewChild('paginator3') paginator3: MatPaginator;
  dataSource_rare!:MatTableDataSource<Criteria4Component>;
  @ViewChild('paginator4') paginator4!: MatPaginator;
  dataSource_resourecesvisually!:MatTableDataSource<Criteria4Component>;
  @ViewChild('paginator5') paginator5: MatPaginator;
  dataSource_journals!:MatTableDataSource<Criteria4Component>;
  @ViewChild('paginator6') paginator6: MatPaginator;
  dataSource_usagereport!:MatTableDataSource<Criteria4Component>;
  @ViewChild('paginator7') paginator7: MatPaginator;
  dataSource!:MatTableDataSource<Criteria4Component>
  @ViewChild('paginator8') paginator8: MatPaginator;
  dataSource_qualN!:MatTableDataSource<Criteria4Component>;
  dataSource_qual!:MatTableDataSource<Criteria4Component>;
  dataSource_quanT!:MatTableDataSource<Criteria4Component>;
  constructor(

  public dialog : MatDialog,
  public service : ServiceService,
  public router: Router,
  public download: DownloadService
  ) { }

 ngOnInit(): void {
   this.fetch_ilms();
   this.fetchC_bookbank();
   this.fetch_journals();
   this.fetch_onlineresources();
   this.fetch_purchase();
   this.fetch_rare();
   this.fetch_usagereport();
   this.fetch_resourecesvisually();
   this.fetchCommittee();
   this.fetchCriQual();
    this.fetchCriQualN();
    this.fetchCriQuanT();
  }

  formatDate(date) {
    const options:any = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    };
  }

  export_ilms(){

    var fileName = "Report Of ILMS details";
    // let data = this.download_data;
    let data: any = null;
    if(this.dataSource_ilms.filter != ""){
      data = this.dataSource_ilms.filteredData;
    }else{
      data = this.dataSource_ilms.data;
    }
    data = data.map((e)=>{
        return {
  'ILMS Name	':e.name,
  'Nature Of Automation	'	:e.natureOfAutomation,
  'Year':e.year,
  'Vendor Name':e.vendorName,
  // 'Publisher':e.publishers,
  // 'Edition':e.edition,
  //'Volume':e.volume,
  //'Duration':this.formatDate(e.startDate) +" To "+ this.formatDate(e.endDate),
  // 'Supporting agency':e.supportingAgency,

        }
    });
    this.download.exportAsExcelFile(data,fileName);

  }

  export_bookbank(){

    var fileName = "Report Of Book Bank";
    // let data = this.download_data;
    let data: any = null;
    if(this.dataSource_bookbank.filter != ""){
      data = this.dataSource_bookbank.filteredData;
    }else{
      data = this.dataSource_bookbank.data;
    }
    data = data.map((e)=>{
        return {
  'Academic year		':e.academicYear,
  'Total students benefited	'	:e.benefitedStudent,
  'Total books issued	':e.booksIssued,
  'Total cost of books	':e.costOfBooks,
  'Total fee collected':e.feeCollected
  // 'Publisher':e.publishers,
  // 'Edition':e.edition,
  //'Volume':e.volume,
  //'Duration':this.formatDate(e.startDate) +" To "+ this.formatDate(e.endDate),
  // 'Supporting agency':e.supportingAgency,

        }
    });
    this.download.exportAsExcelFile(data,fileName);

  }
  export_onlineresources(){

    var fileName = "Report Of Online Resources ";
    // let data = this.download_data;
    let data: any = null;
    if(this.dataSource_onlineresources.filter != ""){
      data = this.dataSource_onlineresources.filteredData;
    }else{
      data = this.dataSource_onlineresources.data;
    }
    data = data.map((e)=>{
        return {
  'Year		':e.year,
  'Resource Type	'	:e.otherType,
  'Resource Name		':e.resourceName,
  // 'ISBN/ISSN no	':e.issnNo,
  // 'Period':e.period,
  'Subscription Date':e.date,
  'Subscription Amount':e.amount,
  'Number Of User':e.noOfUsers,
  // 'Publisher':e.publishers,
  // 'Edition':e.edition,
  //'Volume':e.volume,
  //'Duration':this.formatDate(e.startDate) +" To "+ this.formatDate(e.endDate),
  // 'Supporting agency':e.supportingAgency,

        }
    });
    this.download.exportAsExcelFile(data,fileName);

  }
  export_journals(){

    var fileName = "Report Of Subscription Of Journals";
    // let data = this.download_data;
    let data: any = null;
    if(this.dataSource_journals.filter != ""){
      data = this.dataSource_journals.filteredData;
    }else{
      data = this.dataSource_journals.data;
    }
    data = data.map((e)=>{
        return {
  'Year		':e.year,
  'Journal Type	'	:e.otherType,
  'Journal Name		':e.journalName,
  'ISBN/ISSN no	':e.issnNo,
  'Period':e.period,
  'Subscription Date': e.date,
  'Subscription Amount':e.amount,
  'Journal Mode':e.mode,
  // 'Publisher':e.publishers,
  // 'Edition':e.edition,
  //'Volume':e.volume,
  //'Duration':this.formatDate(e.startDate) +" To "+ this.formatDate(e.endDate),
  // 'Supporting agency':e.supportingAgency,

        }
    });
    this.download.exportAsExcelFile(data,fileName);

  }
  export_purchase(){
    var fileName = "Report Of Purchase Of Books";
    // let data = this.download_data;
    let data: any = null;
    if(this.dataSource_purchase.filter != ""){
      data = this.dataSource_purchase.filteredData;
    }else{
      data = this.dataSource_purchase.data;
    }
    data = data.map((e)=>{
        return {
  'Year		':e.year,
  'Book Type	'	:e.otherType,
  'Total Books		':e.totalBooks,
  'Amount Paid':e.amountPaid,
  'Invoice Number':e.invoiceNo,
  'Date': e.date,
  // 'Subscription Amount':e.amount,
  // 'Journal Mode':e.mode,
  // 'Publisher':e.publishers,
  // 'Edition':e.edition,
  //'Volume':e.volume,
  //'Duration':this.formatDate(e.startDate) +" To "+ this.formatDate(e.endDate),
  // 'Supporting agency':e.supportingAgency,

        }
    });
    this.download.exportAsExcelFile(data,fileName);


  }
  export_rare(){

    var fileName = "Report Of Rare Books";
    // let data = this.download_data;
    let data: any = null;
    if(this.dataSource_rare.filter != ""){
      data = this.dataSource_rare.filteredData;
    }else{
      data = this.dataSource_rare.data;
    }
    data = data.map((e)=>{
        return {
  'Accession No		':e.accessionNo,
  'Book title	'	:e.bookTitle,
  'Author (s)		':e.author,
  'Publisher':e.publisher,
  'Publication year':e.publicationYear,


        }
    });
    this.download.exportAsExcelFile(data,fileName);

  }
  export_resourcesvisually(){

    var fileName = "Report Of Resources for Visually Impared ";
  // let data = this.download_data;
  let data: any = null;
  if(this.dataSource_resourecesvisually.filter != ""){
    data = this.dataSource_resourecesvisually.filteredData;
  }else{
    data = this.dataSource_resourecesvisually.data;
  }
  data = data.map((e)=>{
      return {
'Total Books 		':e.totalBooks,
'Audio Books / CDs '	:e.audioBooks,

      }
  });
  this.download.exportAsExcelFile(data,fileName);
}
  export_usagereport(){

    var fileName = "Usage Report";
    // let data = this.download_data;
    let data: any = null;
    if(this.dataSource_usagereport.filter != ""){
      data = this.dataSource_usagereport.filteredData;
    }else{
      data = this.dataSource_usagereport.data;
    }
    data = data.map((e)=>{
        return {
  'Academic year 		':e.academicYear,
  'Resource Name '	:e.onlineResource?.resourceName,
  'Total Users':e.totalUsers

        }
    });
    this.download.exportAsExcelFile(data,fileName);


  }


  /////////////////////////////////////////////// ilms ////////////////////////////////
  applyFilter_ilms(event: any) {
    this.dataSource_ilms.filterPredicate = (data: any, filter) => {
      const dataStr =JSON.stringify(data).toLowerCase();
      return dataStr.indexOf(filter) != -1;
    }
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource_ilms.filter = filterValue.trim().toLowerCase();
    if (this.dataSource_ilms.paginator) {
      this.dataSource_ilms.paginator.firstPage();
    }
  }
  edit_ilms(row){
    const dialogRef = this.dialog.open(EditIlmsInfoComponent,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data: row});
  }

  delete_ilms(row){
    // console.log(row);
    // if(confirm("Do you want to delete this user ?")) {


  //     Swal.fire({
  //       title: 'Are you sure?',
  //       text: "You won't be able to revert this!",
  //       icon: 'info',
  //       showCancelButton: true,
  //       confirmButtonColor: '#3085d6',
  //       cancelButtonColor: '#d33',
  //       confirmButtonText: 'Yes, delete it!'
  //     }).then((result) => {
  //       if (result.isConfirmed) {
  //     this.service.deleteData('/supplier/'+row['id']).subscribe(response => {
  //       location.reload();
  //   },err => {
  //     // console.log(err);
  //     if(err.status == 409){
  //       Swal.fire({
  //         title: "Supplier cannot be deleted",
  //         text: "Stock In entry has been made against this supplier",
  //         icon: 'warning'
  //       });
  //     }
  //   });
  // }
  // });


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
  fetchCommittee() {

    this.service.getUserWithUserId().subscribe((user : any) => {
     // console.log(user);
      this.service.getData("/library-screenshot/college/" + user.college.id).subscribe((res: any) => {
        const getPos:any = this.compute_screen(res);
        getPos.then((response: any) => {
                  this.dataSource = new MatTableDataSource(
                            JSON.parse(
                                      JSON.stringify(
                                                response
                                      )
                            )

                  );
                  console.log(this.dataSource.data)

                  this.dataSource.paginator = this.paginator8;
              //  this.dataSource.sort = this.sort;
        });
      }, (err: any) => {
        console.warn("No committee available!!");
      })
    }, (err : any) => {
      console.log(err);
    });
  }

  async compute_screen(data: any) {
    return new Promise(resolve => {
              for (var i = 0; i < data.length; i++) {
                        data[i].pos = i + 1;
                        if (i == data.length - 1) {
                                  resolve(data);
                        }
              }
    });
  }

  fetch_ilms() {

    this.service.getUserWithUserId().subscribe((user : any) => {
      // console.log(user);
       this.service.getData("/ilms-info/college/" + user.college.id).subscribe((res: any) => {
         const getPos:any = this.compute_ilms(res);
         getPos.then((response: any) => {
                   this.dataSource_ilms = new MatTableDataSource(
                             JSON.parse(
                                       JSON.stringify(
                                                 response
                                       )
                             )

                   );
                   console.log(this.dataSource_ilms.data)

               //     this.dataSource.paginator = this.paginator;
               //  this.dataSource.sort = this.sort;
         });
       }, (err: any) => {
         console.warn("No committee available!!");
       })
     }, (err : any) => {
       console.log(err);
     });
  }

  async compute_ilms(data: any) {
    return new Promise(resolve => {
              for (var i = 0; i < data.length; i++) {
                        data[i].pos = i + 1;
                        if (i == data.length - 1) {
                                  resolve(data);
                        }
              }
    });
  }


  /////////////////////////////////////////////// bookbank ////////////////////////////////
  applyFilter_bookbank(event: any) {
    this.dataSource_bookbank.filterPredicate = (data: any, filter) => {
      const dataStr =JSON.stringify(data).toLowerCase();
      return dataStr.indexOf(filter) != -1;
    }
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource_bookbank.filter = filterValue.trim().toLowerCase();
    if (this.dataSource_bookbank.paginator) {
      this.dataSource_bookbank.paginator.firstPage();
    }
  }
  edit_bookbank(row){
    const dialogRef = this.dialog.open(EditBookBankComponent,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data: row});
  }

  delete_bookbank(row){
    // console.log(row);
    // if(confirm("Do you want to delete this user ?")) {


  //     Swal.fire({
  //       title: 'Are you sure?',
  //       text: "You won't be able to revert this!",
  //       icon: 'info',
  //       showCancelButton: true,
  //       confirmButtonColor: '#3085d6',
  //       cancelButtonColor: '#d33',
  //       confirmButtonText: 'Yes, delete it!'
  //     }).then((result) => {
  //       if (result.isConfirmed) {
  //     this.service.deleteData('/supplier/'+row['id']).subscribe(response => {
  //       location.reload();
  //   },err => {
  //     // console.log(err);
  //     if(err.status == 409){
  //       Swal.fire({
  //         title: "Supplier cannot be deleted",
  //         text: "Stock In entry has been made against this supplier",
  //         icon: 'warning'
  //       });
  //     }
  //   });
  // }
  // });


  }



  fetchC_bookbank() {

    this.service.getUserWithUserId().subscribe((user : any) => {
      // console.log(user);
       this.service.getData("/book-bank/college/" + user.college.id).subscribe((res: any) => {
         const getPos:any = this.compute_bookbank(res);
         getPos.then((response: any) => {
                   this.dataSource_bookbank = new MatTableDataSource(
                             JSON.parse(
                                       JSON.stringify(
                                                 response
                                       )
                             )

                   );
                   console.log(this.dataSource_bookbank.data)

                   this.dataSource_bookbank.paginator = this.paginator1;
               //  this.dataSource.sort = this.sort;
         });
       }, (err: any) => {
         console.warn("No committee available!!");
       })
     }, (err : any) => {
       console.log(err);
     });
  }

  async compute_bookbank(data: any) {
    return new Promise(resolve => {
              for (var i = 0; i < data.length; i++) {
                        data[i].pos = i + 1;
                        if (i == data.length - 1) {
                                  resolve(data);
                        }
              }
    });
  }



  /////////////////////////////////////////////// online resourcs ////////////////////////////////

  applyFilter_onlineresources(event: any) {
    this.dataSource_onlineresources.filterPredicate = (data: any, filter) => {
      const dataStr =JSON.stringify(data).toLowerCase();
      return dataStr.indexOf(filter) != -1;
    }
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource_onlineresources.filter = filterValue.trim().toLowerCase();
    if (this.dataSource_onlineresources.paginator) {
      this.dataSource_onlineresources.paginator.firstPage();
    }
  }
  edit_onlineresources(row){
    const dialogRef = this.dialog.open(EditOnlineResourcesComponent,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data: row});
  }

  delete_onlineresources(row){
    // console.log(row);
    // if(confirm("Do you want to delete this user ?")) {


  //     Swal.fire({
  //       title: 'Are you sure?',
  //       text: "You won't be able to revert this!",
  //       icon: 'info',
  //       showCancelButton: true,
  //       confirmButtonColor: '#3085d6',
  //       cancelButtonColor: '#d33',
  //       confirmButtonText: 'Yes, delete it!'
  //     }).then((result) => {
  //       if (result.isConfirmed) {
  //     this.service.deleteData('/supplier/'+row['id']).subscribe(response => {
  //       location.reload();
  //   },err => {
  //     // console.log(err);
  //     if(err.status == 409){
  //       Swal.fire({
  //         title: "Supplier cannot be deleted",
  //         text: "Stock In entry has been made against this supplier",
  //         icon: 'warning'
  //       });
  //     }
  //   });
  // }
  // });


  }



  fetch_onlineresources() {

    this.service.getUserWithUserId().subscribe((user : any) => {
      // console.log(user);
       this.service.getData("/online-resource/college/" + user.college.id).subscribe((res: any) => {
         const getPos:any = this.compute_onlineresources(res);
         getPos.then((response: any) => {
                   this.dataSource_onlineresources = new MatTableDataSource(
                             JSON.parse(
                                       JSON.stringify(
                                                 response
                                       )
                             )

                   );
                   console.log(this.dataSource_onlineresources.data)

                   this.dataSource_onlineresources.paginator = this.paginator2;
               //  this.dataSource.sort = this.sort;
         });
       }, (err: any) => {
         console.warn("No committee available!!");
       })
     }, (err : any) => {
       console.log(err);
     });
  }

  async compute_onlineresources(data: any) {
    return new Promise(resolve => {
              for (var i = 0; i < data.length; i++) {
                        data[i].pos = i + 1;
                        if (i == data.length - 1) {
                                  resolve(data);
                        }
              }
    });
  }


  /////////////////////////////////////////////// purchase ////////////////////////////////


  applyFilter_purchase(event: any) {
    this.dataSource_purchase.filterPredicate = (data: any, filter) => {
      const dataStr =JSON.stringify(data).toLowerCase();
      return dataStr.indexOf(filter) != -1;
    }
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource_purchase.filter = filterValue.trim().toLowerCase();
    if (this.dataSource_purchase.paginator) {
      this.dataSource_purchase.paginator.firstPage();
    }
  }
  edit_purchase(row){
    const dialogRef = this.dialog.open(EditPurchasedBooksComponent,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data: row});
  }

  delete_purchase(row){
    // console.log(row);
    // if(confirm("Do you want to delete this user ?")) {


  //     Swal.fire({
  //       title: 'Are you sure?',
  //       text: "You won't be able to revert this!",
  //       icon: 'info',
  //       showCancelButton: true,
  //       confirmButtonColor: '#3085d6',
  //       cancelButtonColor: '#d33',
  //       confirmButtonText: 'Yes, delete it!'
  //     }).then((result) => {
  //       if (result.isConfirmed) {
  //     this.service.deleteData('/supplier/'+row['id']).subscribe(response => {
  //       location.reload();
  //   },err => {
  //     // console.log(err);
  //     if(err.status == 409){
  //       Swal.fire({
  //         title: "Supplier cannot be deleted",
  //         text: "Stock In entry has been made against this supplier",
  //         icon: 'warning'
  //       });
  //     }
  //   });
  // }
  // });


  }



  fetch_purchase() {

    this.service.getUserWithUserId().subscribe((user : any) => {
      // console.log(user);
       this.service.getData("/purchased-book/college/" + user.college.id).subscribe((res: any) => {
         const getPos:any = this.compute_purchase(res);
         getPos.then((response: any) => {
                   this.dataSource_purchase = new MatTableDataSource(
                             JSON.parse(
                                       JSON.stringify(
                                                 response
                                       )
                             )

                   );
                   console.log(this.dataSource_purchase.data)

                   this.dataSource_purchase.paginator = this.paginator3;
               //  this.dataSource.sort = this.sort;
         });
       }, (err: any) => {
         console.warn("No committee available!!");
       })
     }, (err : any) => {
       console.log(err);
     });
  }

  async compute_purchase(data: any) {
    return new Promise(resolve => {
              for (var i = 0; i < data.length; i++) {
                        data[i].pos = i + 1;
                        if (i == data.length - 1) {
                                  resolve(data);
                        }
              }
    });
  }


  /////////////////////////////////////////////// rare ////////////////////////////////
  applyFilter_rare(event: any) {
    this.dataSource_rare.filterPredicate = (data: any, filter) => {
      const dataStr =JSON.stringify(data).toLowerCase();
      return dataStr.indexOf(filter) != -1;
    }
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource_rare.filter = filterValue.trim().toLowerCase();
    if (this.dataSource_rare.paginator) {
      this.dataSource_rare.paginator.firstPage();
    }
  }
  edit_rare(row){
    const dialogRef = this.dialog.open(EditRareBooksComponent,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data: row});
  }

  delete_rare(row){
    // console.log(row);
    // if(confirm("Do you want to delete this user ?")) {


  //     Swal.fire({
  //       title: 'Are you sure?',
  //       text: "You won't be able to revert this!",
  //       icon: 'info',
  //       showCancelButton: true,
  //       confirmButtonColor: '#3085d6',
  //       cancelButtonColor: '#d33',
  //       confirmButtonText: 'Yes, delete it!'
  //     }).then((result) => {
  //       if (result.isConfirmed) {
  //     this.service.deleteData('/supplier/'+row['id']).subscribe(response => {
  //       location.reload();
  //   },err => {
  //     // console.log(err);
  //     if(err.status == 409){
  //       Swal.fire({
  //         title: "Supplier cannot be deleted",
  //         text: "Stock In entry has been made against this supplier",
  //         icon: 'warning'
  //       });
  //     }
  //   });
  // }
  // });


  }



  fetch_rare() {

    this.service.getUserWithUserId().subscribe((user : any) => {
      // console.log(user);
       this.service.getData("/rare-book/college/" + user.college.id).subscribe((res: any) => {
         const getPos:any = this.compute_rare(res);
         getPos.then((response: any) => {
                   this.dataSource_rare = new MatTableDataSource(
                             JSON.parse(
                                       JSON.stringify(
                                                 response
                                       )
                             )

                   );
                   console.log(this.dataSource_rare.data)

                   this.dataSource_rare.paginator = this.paginator4;
               //  this.dataSource.sort = this.sort;
         });
       }, (err: any) => {
         console.warn("No committee available!!");
       })
     }, (err : any) => {
       console.log(err);
     });
  }

  async compute_rare(data: any) {
    return new Promise(resolve => {
              for (var i = 0; i < data.length; i++) {
                        data[i].pos = i + 1;
                        if (i == data.length - 1) {
                                  resolve(data);
                        }
              }
    });
  }




  /////////////////////////////////////////////// resourcesvisually ////////////////////////////////


  applyFilter_resourecesvisually(event: any) {
    this.dataSource_resourecesvisually.filterPredicate = (data: any, filter) => {
      const dataStr =JSON.stringify(data).toLowerCase();
      return dataStr.indexOf(filter) != -1;
    }
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource_resourecesvisually.filter = filterValue.trim().toLowerCase();
    if (this.dataSource_resourecesvisually.paginator) {
      this.dataSource_resourecesvisually.paginator.firstPage();
    }
  }
  edit_resourecesvisually(row){
    const dialogRef = this.dialog.open(EditResourcesVisuallyComponent,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data: row});
  }

  delete_resourecesvisually(row){
    // console.log(row);
    // if(confirm("Do you want to delete this user ?")) {


  //     Swal.fire({
  //       title: 'Are you sure?',
  //       text: "You won't be able to revert this!",
  //       icon: 'info',
  //       showCancelButton: true,
  //       confirmButtonColor: '#3085d6',
  //       cancelButtonColor: '#d33',
  //       confirmButtonText: 'Yes, delete it!'
  //     }).then((result) => {
  //       if (result.isConfirmed) {
  //     this.service.deleteData('/supplier/'+row['id']).subscribe(response => {
  //       location.reload();
  //   },err => {
  //     // console.log(err);
  //     if(err.status == 409){
  //       Swal.fire({
  //         title: "Supplier cannot be deleted",
  //         text: "Stock In entry has been made against this supplier",
  //         icon: 'warning'
  //       });
  //     }
  //   });
  // }
  // });


  }



  fetch_resourecesvisually() {

    this.service.getUserWithUserId().subscribe((user : any) => {
      // console.log(user);
       this.service.getData("/online-visually-impared/college/" + user.college.id).subscribe((res: any) => {
         const getPos:any = this.compute_resourecesvisually(res);
         getPos.then((response: any) => {
                   this.dataSource_resourecesvisually = new MatTableDataSource(
                             JSON.parse(
                                       JSON.stringify(
                                                 response
                                       )
                             )

                   );
                   console.log(this.dataSource_resourecesvisually.data)

                   this.dataSource_resourecesvisually.paginator = this.paginator5;
               //  this.dataSource.sort = this.sort;
         });
       }, (err: any) => {
         console.warn("No committee available!!");
       })
     }, (err : any) => {
       console.log(err);
     });
  }

  viewResources(element: any) {
    const dialogRef = this.dialog.open(ViewResourceListComponent ,{width: "80%",height: "86vh",panelClass: 'full-width-dialog', data: element});
    dialogRef.afterClosed().subscribe(result => {
      this.fetch_resourecesvisually();
    });
  }

  async compute_resourecesvisually(data: any) {
    return new Promise(resolve => {
              for (var i = 0; i < data.length; i++) {
                        data[i].pos = i + 1;
                        if (i == data.length - 1) {
                                  resolve(data);
                        }
              }
    });
  }


  /////////////////////////////////////////////// journals ////////////////////////////////


  applyFilter_journals(event: any) {
    this.dataSource_journals.filterPredicate = (data: any, filter) => {
      const dataStr =JSON.stringify(data).toLowerCase();
      return dataStr.indexOf(filter) != -1;
    }
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource_journals.filter = filterValue.trim().toLowerCase();
    if (this.dataSource_journals.paginator) {
      this.dataSource_journals.paginator.firstPage();
    }
  }
  edit_journals(row){
    const dialogRef = this.dialog.open(EditJournalSubscriptionComponent,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data: row});
  }

  delete_journals(row){
    // console.log(row);
    // if(confirm("Do you want to delete this user ?")) {


  //     Swal.fire({
  //       title: 'Are you sure?',
  //       text: "You won't be able to revert this!",
  //       icon: 'info',
  //       showCancelButton: true,
  //       confirmButtonColor: '#3085d6',
  //       cancelButtonColor: '#d33',
  //       confirmButtonText: 'Yes, delete it!'
  //     }).then((result) => {
  //       if (result.isConfirmed) {
  //     this.service.deleteData('/supplier/'+row['id']).subscribe(response => {
  //       location.reload();
  //   },err => {
  //     // console.log(err);
  //     if(err.status == 409){
  //       Swal.fire({
  //         title: "Supplier cannot be deleted",
  //         text: "Stock In entry has been made against this supplier",
  //         icon: 'warning'
  //       });
  //     }
  //   });
  // }
  // });


  }



  fetch_journals() {

    this.service.getUserWithUserId().subscribe((user : any) => {
      // console.log(user);
       this.service.getData("/journal-subscription/college/" + user.college.id).subscribe((res: any) => {
         const getPos:any = this.compute_journals(res);
         getPos.then((response: any) => {
                   this.dataSource_journals = new MatTableDataSource(
                             JSON.parse(
                                       JSON.stringify(
                                                 response
                                       )
                             )

                   );
                   console.log(this.dataSource_journals.data)

                   this.dataSource_journals.paginator = this.paginator6;
               //  this.dataSource.sort = this.sort;
         });
       }, (err: any) => {
         console.warn("No committee available!!");
       })
     }, (err : any) => {
       console.log(err);
     });
  }

  async compute_journals(data: any) {
    return new Promise(resolve => {
              for (var i = 0; i < data.length; i++) {
                        data[i].pos = i + 1;
                        if (i == data.length - 1) {
                                  resolve(data);
                        }
              }
    });
  }



  /////////////////////////////////////////////// usagereport ////////////////////////////////


  applyFilter_usagereport(event: any) {
    this.dataSource_usagereport.filterPredicate = (data: any, filter) => {
      const dataStr =JSON.stringify(data).toLowerCase();
      return dataStr.indexOf(filter) != -1;
    }
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource_usagereport.filter = filterValue.trim().toLowerCase();
    if (this.dataSource_usagereport.paginator) {
      this.dataSource_usagereport.paginator.firstPage();
    }
  }
  edit_usagereport(row){
    const dialogRef = this.dialog.open(EditRareBooksComponent,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data: row});
  }

  delete_usagereport(row){
    // console.log(row);
    // if(confirm("Do you want to delete this user ?")) {


  //     Swal.fire({
  //       title: 'Are you sure?',
  //       text: "You won't be able to revert this!",
  //       icon: 'info',
  //       showCancelButton: true,
  //       confirmButtonColor: '#3085d6',
  //       cancelButtonColor: '#d33',
  //       confirmButtonText: 'Yes, delete it!'
  //     }).then((result) => {
  //       if (result.isConfirmed) {
  //     this.service.deleteData('/supplier/'+row['id']).subscribe(response => {
  //       location.reload();
  //   },err => {
  //     // console.log(err);
  //     if(err.status == 409){
  //       Swal.fire({
  //         title: "Supplier cannot be deleted",
  //         text: "Stock In entry has been made against this supplier",
  //         icon: 'warning'
  //       });
  //     }
  //   });
  // }
  // });


  }



  fetch_usagereport() {

    this.service.getUserWithUserId().subscribe((user : any) => {
      // console.log(user);
       this.service.getData("/annual-report-resource/college/" + user.college.id).subscribe((res: any) => {
         const getPos:any = this.compute_usagereport(res);
         getPos.then((response: any) => {
                   this.dataSource_usagereport = new MatTableDataSource(
                             JSON.parse(
                                       JSON.stringify(
                                                 response
                                       )
                             )

                   );
                   console.log(this.dataSource_usagereport.data)

                   this.dataSource_usagereport.paginator = this.paginator7;
               //  this.dataSource.sort = this.sort;
         });
       }, (err: any) => {
         console.warn("No committee available!!");
       })
     }, (err : any) => {
       console.log(err);
     });
  }

  async compute_usagereport(data: any) {
    return new Promise(resolve => {
              for (var i = 0; i < data.length; i++) {
                        data[i].pos = i + 1;
                        if (i == data.length - 1) {
                                  resolve(data);
                        }
              }
    });
  }

  // viewAchievements(){
  //   const dialogRef = this.dialog.open(NewDetailsComponent ,{width: "70%",height: "86vh",panelClass: 'full-width-dialog'});
  // }

  fetchCriQual(){
    this.service.getUserWithUserId().subscribe((user: any) => {
      console.log("THIS USER",user);
      this.service.getData(`/cri-qual`).subscribe((res : any) => {
        console.log("DATA NEW",res)
        const getPos:any = this.compute_qual(res);
        getPos.then((response: any) => {
          this.dataSource_qual = new MatTableDataSource(
            JSON.parse(
              JSON.stringify(response)
            )
          );
  
          console.log(this.dataSource_qual.data)
          // this.college = this.dataSource_qual.data;
          // console.log(this.college[0].college.name)
              //     this.dataSource.paginator = this.paginator;
              //  this.dataSource.sort = this.sort;
        });
      }, (err: any) => {
        console.warn(err);
      });
    }, (err: any) => {
      console.warn(err);
    });
  
  
  
  }
  
  fetchCriQualN(){
    this.service.getUserWithUserId().subscribe((user: any) => {
      this.service.getData(`/cri-qual`).subscribe((res: any) => {
        console.log(res);
        let finaldata: any[] = [];
        for (let i = 0; i < res.length; i++) {
  
          this.service.getData("/crh/" + res[i].crh.id).subscribe((result: any) => {
            if(res[i].crh.criteriaName=="Criterion-IV")
            {finaldata.push(
              {
                
                // user: result,
                approval: res[i]
              }
            );
            }
            if(!(i < res.length-1)) {
              this.process_appr(finaldata);
            }
          })
        
        }
      }, (err: any) => {
        alert(err.error?.message);
      });
  
    }, (err: any) => {
      console.warn(err);
    });
  
  }
  process_appr(data) {
    console.log("PP",data);
    const getPos:any = this.compute_qual(data);
        getPos.then((response: any) => {
          this.dataSource_qualN = new MatTableDataSource(
            JSON.parse(
              JSON.stringify(response)
            )
          );
          console.log(this.dataSource_qualN.data)
                  // this.dataSource_approval.paginator = this.paginator3;
              //  this.dataSource.sort = this.sort;
        });
  }
  async compute_qual(data: any) {
    return new Promise(resolve => {
              for (var i = 0; i < data.length; i++) {
                        data[i].pos = i + 1;
                        if (i == data.length - 1) {
                                  resolve(data);
                        }
              }
    });
  }
  
  viewdetailsN(element: any){const dialogRef = this.dialog.open(ViewCriteriaReportsComponent ,{width: "85%",height: "86vh",panelClass: 'full-width-dialog', data: element.approval});
      dialogRef.afterClosed().subscribe((result : any) => {
         this.fetchCriQualN();
      });
  
      }
  
      editN(row){
        const dialogRef = this.dialog.open(EditCriteriaReportComponent,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data: row.approval});
        dialogRef.afterClosed().subscribe((result : any) => {
          this.fetchCriQual();
       });
      }
  
  //Quantitative
fetchCriQuanT(){
  this.service.getUserWithUserId().subscribe((user: any) => {
    this.service.getData(`/cri-quant`).subscribe((res: any) => {
      console.log(res);
      let finaldata: any[] = [];
      for (let i = 0; i < res.length; i++) {

        this.service.getData("/crh/" + res[i].crh.id).subscribe((result: any) => {
          if(res[i].crh.criteriaName=="Criterion-IV")
          {finaldata.push(
            {
              
              // user: result,
              approval: res[i]
            }
          );
          }
          if(!(i < res.length-1)) {
            this.process_quant(finaldata);
          }
        })
      
      }
    }, (err: any) => {
      alert(err.error?.message);
    });

  }, (err: any) => {
    console.warn(err);
  });

}
process_quant(data) {
  console.log("PP",data);
  const getPos:any = this.compute_quant(data);
      getPos.then((response: any) => {
        this.dataSource_quanT = new MatTableDataSource(
          JSON.parse(
            JSON.stringify(response)
          )
        );
        console.log(this.dataSource_quanT.data)
                // this.dataSource_approval.paginator = this.paginator3;
            //  this.dataSource.sort = this.sort;
      });
}
async compute_quant(data: any) {
  return new Promise(resolve => {
            for (var i = 0; i < data.length; i++) {
                      data[i].pos = i + 1;
                      if (i == data.length - 1) {
                                resolve(data);
                      }
            }
  });
}

viewdetailsL(element: any){const dialogRef = this.dialog.open(ViewCriteriaQuantitativeComponent ,{width: "85%",height: "86vh",panelClass: 'full-width-dialog', data: element.approval});
    dialogRef.afterClosed().subscribe((result : any) => {
       this.fetchCriQualN();
    });

    }

    editL(row){
      const dialogRef = this.dialog.open(EditCriquantitativeReportComponent,{width: "70%",height: "86vh",panelClass: 'full-width-dialog',data: row.approval});
      dialogRef.afterClosed().subscribe((result : any) => {
        this.fetchCriQual();
     });
    }


  
  
  


}
