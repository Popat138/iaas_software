import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ServiceService } from 'src/app/service.service';
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-addscreenshot',
  templateUrl: './addscreenshot.component.html',
  styleUrls: ['./addscreenshot.component.scss']
})
export class AddscreenshotComponent implements OnInit {
  
  public Form: FormGroup;
  constructor(
    private fb: FormBuilder,
    public service: ServiceService,
    public dialogRef: MatDialogRef<AddscreenshotComponent>
    ) { 
      this.Form = this.fb.group({
        academicYear: this.fb.control(''),
        screenshot: this.fb.control(''),

    })
  }
  uploads:any = null;
  accession:any = null;
  bookIssue:any = null;
  bookBank:any = null;
  stockVerification:any = null;
  bookFacility:any = null;
  bookReservation:any = null;
  libraryDues:any = null;
  membershipReport:any = null;
  fileUpload = new FormData();
  level: Level [] = [
    {level: 'ILMS Homepage', },
    {level: 'Accession Registration', },
    {level: 'Book Issue return', },
    {level: 'Book Bank Iaaue return', },
    {level: 'Stock verification', },
    {level: 'Serach Book faciltiy', },
    {level: 'Book Reservation', },
    {level: 'Library dues', },
    {level: 'Student Membership Report', },
  ];

  year: Year[] = [
    {year: '2018-2019', },
    {year: '2019-2020', },
    {year: '2020-2021', },
    {year: '2021-2022', },
  ];




  upload(event: any){
    this.uploads = event.target.files[0];
  }

  uploadAccession(event: any){
    console.log(event.target.files[0]);
    this.accession = event.target.files[0];
  }
  
  uploadBookIssue(event: any){
    console.log(event.target.files[0]);
    this.bookIssue = event.target.files[0];
  }
  
  uploadBookBank(event: any){
    console.log(event.target.files[0]);
    this.bookBank = event.target.files[0];
  }
  
  uploadStockVerification(event: any){
    console.log(event.target.files[0]);
    this.stockVerification = event.target.files[0];
  }
  
  uploadBookFacility(event: any){
    console.log(event.target.files[0]);
    this.bookFacility = event.target.files[0];
  }
  
  uploadBookReservation(event: any){
    console.log(event.target.files[0]);
    this.bookReservation = event.target.files[0];
  }
  
  uploadLibraryDues(event: any){
    console.log(event.target.files[0]);
    this.libraryDues = event.target.files[0];
  }

  uploadMembershipReport(event: any){
    console.log(event.target.files[0]);
    this.membershipReport = event.target.files[0];
  }

submitForm(){

  let ext =  this.uploads?.name.split('.').pop();
    let filename: any = null;
    if(this.uploads != undefined && this.uploads != null ) {
      filename = uuidv4() + "." + ext
      this.fileUpload.append("files", this.uploads, filename)
    } else {
      console.log(` document not provided.`);
    }

  let accessionext =  this.accession?.name.split('.').pop();
    let accessionFilename: any = null;
    if(this.accession != undefined && this.accession != null ) {
      accessionFilename = uuidv4() + "." + accessionext
      this.fileUpload.append("files", this.accession, accessionFilename)
    } else {
      console.log(` document not provided.`);
    }

  let bookIssueext =  this.bookIssue?.name.split('.').pop();
    let bookIssueFilename: any = null;
    if(this.bookIssue != undefined && this.bookIssue != null ) {
      bookIssueFilename = uuidv4() + "." + bookIssueext
      this.fileUpload.append("files", this.bookIssue, bookIssueFilename)
    } else {
      console.log(` document not provided.`);
    }
  
  let bookBankext =  this.bookBank?.name.split('.').pop();
    let bookBankFilename: any = null;
    if(this.bookBank != undefined && this.bookBank != null ) {
      bookBankFilename = uuidv4() + "." + bookBankext
      this.fileUpload.append("files", this.bookBank, bookBankFilename)
    } else {
      console.log(` document not provided.`);
    }

  let stockVerificationext =  this.stockVerification?.name.split('.').pop();
    let stockVerificationFilename: any = null;
    if(this.stockVerification != undefined && this.stockVerification != null ) {
      stockVerificationFilename = uuidv4() + "." + stockVerificationext
      this.fileUpload.append("files", this.stockVerification, stockVerificationFilename)
    } else {
      console.log(` document not provided.`);
    }

  let bookFacilityext =  this.bookFacility?.name.split('.').pop();
    let bookFacilityFilename: any = null;
    if(this.bookFacility != undefined && this.bookFacility != null ) {
      bookFacilityFilename = uuidv4() + "." + bookFacilityext
      this.fileUpload.append("files", this.bookFacility, bookFacilityFilename)
    } else {
      console.log(` document not provided.`);
    }

  let membershipReportext =  this.membershipReport?.name.split('.').pop();
    let membershipReportFilename: any = null;
    if(this.membershipReport != undefined && this.membershipReport != null ) {
      membershipReportFilename = uuidv4() + "." + membershipReportext
      this.fileUpload.append("files", this.membershipReport, membershipReportFilename)
    } else {
      console.log(` document not provided.`);
    }

  let libraryDuesext =  this.libraryDues?.name.split('.').pop();
    let libraryDuesFilename: any = null;
    if(this.libraryDues != undefined && this.libraryDues != null ) {
      libraryDuesFilename = uuidv4() + "." + libraryDuesext
      this.fileUpload.append("files", this.libraryDues, libraryDuesFilename)
    } else {
      console.log(` document not provided.`);
    }

  let bookReservationext =  this.bookReservation?.name.split('.').pop();
    let bookReservationFilename: any = null;
    if(this.bookReservation != undefined && this.bookReservation != null ) {
      bookReservationFilename = uuidv4() + "." + bookReservationext
      this.fileUpload.append("files", this.bookReservation, bookReservationFilename)
    } else {
      console.log(` document not provided.`);
    }

  let data = {
    academicYear: this.Form.get("academicYear").value,
    bookIssueReturn: this.Form.get("screenshot").value,
    ilmsHomePage: filename,
    // accessionRegistration: accessionFilename,
    // bookIssueReturn: bookIssueFilename,
    // bookBankIssueReturn: bookBankFilename,
    // stockVerification: stockVerificationFilename,
    // searchBookFacility: bookFacilityFilename,
    // studentMembershipReport: membershipReportFilename,
    // libraryDues: libraryDuesFilename,
    // bookReservation: bookReservationFilename,
  }
  
  console.log(data);

    this.service.postData("/library-screenshot/user/" + localStorage.getItem("userId"), data).subscribe((res: any) => {
      //console.log(res);
      if(this.fileUpload.getAll("files").length > 0){
        this.service.postData("/upload", this.fileUpload).subscribe(res2 => {
          //console.log(res2);
        });
      }
    }, (err: any) => {
      console.log(err);
    }, () => {
      this.dialogRef.close();
    });
    Swal.fire({
      title: 'Submitted Successfully?',
      text: "Congratulations!",
      icon: 'info',
      // showCancelButton: true,
      // confirmButtonColor: '#3085d6',
      // cancelButtonColor: '#d33',
      // confirmButtonText: 'Yes, delete it!'
    })
}
 
  ngOnInit(): void {
  }

}

interface Level {
  level: String;
}
interface Year {
  year: String;
}