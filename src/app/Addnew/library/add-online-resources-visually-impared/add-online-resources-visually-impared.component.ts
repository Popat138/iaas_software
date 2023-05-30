import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ServiceService } from 'src/app/service.service';
// import { AddNewAuditAndFinanceDataComponent } from '../../add-new-audit-and-finance-data/add-new-audit-and-finance-data.component';
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-online-resources-visually-impared',
  templateUrl: './add-online-resources-visually-impared.component.html',
  styleUrls: ['./add-online-resources-visually-impared.component.scss']
})
export class AddOnlineResourcesVisuallyImparedComponent implements OnInit {


  totalBook:any = null;
  audioBook:any = null;
  receipt: any[] = [];
  fileUpload = new FormData();
  other_type : other_type[] = [

    {other_type: 'e-journals', },
    {other_type: 'e-Shodh Sindhu', },
    {other_type: 'Shodhganga Membership', },
    {other_type: 'e-books', },
    {other_type: 'Databases', },
    {other_type: 'Remote access to e-resources', },


  ]

  // period : period[] = [


  //   {period: 'Monthly', },
  //   {period: 'Quarterly', },
  //   {period: 'Biannual', },
  //   {period: 'Other', },

  // ]


  public Form: FormGroup;
  public other : FormArray = this.fb.array([]);
  constructor(
    private fb: FormBuilder,
    public service: ServiceService,
    @Inject(MAT_DIALOG_DATA)
    public data : any,
    public dialogRef: MatDialogRef<AddOnlineResourcesVisuallyImparedComponent>
  )
  {
    // this.userid = data.userid;
    this.Form = this.fb.group({


       total_books: this.fb.control('',Validators.required),
       audio_books: this.fb.control('',Validators.required),
      // year: this.fb.control('',Validators.required),
      other:this.fb.array([this.createother()]),
    })
   }

   upload(event: any){
    this.totalBook = event.target.files[0];
  }

  uploadAudioBook(event: any){
    this.audioBook = event.target.files[0];
  }

  uploadReceipt(event: any, i:number){
    this.receipt[i] = event.target.files[0];
  }

  ngOnInit(): void {}

  get otherControl() {
    this.other = this.Form.get('other') as FormArray;
    return this.other.controls;
  }

  createother(): FormGroup {
    return this.fb.group({

    // year: this.fb.control('',Validators.required),
    // other_type: this.fb.control('',Validators.required),
    s_name: this.fb.control('',Validators.required),
    vendor_name: this.fb.control('',Validators.required),
    // s_amount: this.fb.control('',Validators.required),
    // no_of_users: this.fb.control('',Validators.required),

    // upload: this.fb.control('',Validators.required),
  });
  }

  addother(): void {
    this.other = this.Form.get('other') as FormArray;
    this.other.push(this.createother());
  }

  removeother(i: number) {
    this.other.removeAt(i);
  }

  submitForm(){

    let resourceList: any[] = [];
    
    for (let i = 0; i<this.other.length; i++) {
      let receiptExt =  this.receipt[i]?.name.split('.').pop();
      let receiptFilename: any = null;
      if(this.receipt[i] != undefined && this.receipt[i] != null ) {
        receiptFilename = uuidv4() + "." + receiptExt
        this.fileUpload.append("files", this.receipt[i], receiptFilename)
      } else {
        console.log(` document not provided.`);
      }
      
      resourceList.push({
        softwareName: this.other.at(i).get("s_name").value,
        vendorName: this.other.at(i).get("vendor_name").value,
        receipt: receiptFilename
      });
    }

    let ext =  this.totalBook?.name.split('.').pop();
    let filename: any = null;
    if(this.totalBook != undefined && this.totalBook != null ) {
      filename = uuidv4() + "." + ext
      this.fileUpload.append("files", this.totalBook, filename)
    } else {
      console.log(` document not provided.`);
    }

    let audioExt =  this.audioBook?.name.split('.').pop();
    let audioFilename: any = null;
    if(this.audioBook != undefined && this.audioBook != null ) {
      audioFilename = uuidv4() + "." + audioExt
      this.fileUpload.append("files", this.audioBook, audioFilename)
    } else {
      console.log(` document not provided.`);
    }

    let data = {
      totalBooks: this.Form.get("total_books").value,
      audioBooks: this.Form.get("audio_books").value,
      brailleLipiList:filename,
      audioBookList:audioFilename,
      resources: resourceList
    }

  this.service.postData("/online-visually-impared/user/" + localStorage.getItem("userId"), data).subscribe((res: any) => {
  console.log(res);
  if(this.fileUpload.getAll("files").length > 0){
    this.service.postData("/upload", this.fileUpload).subscribe(res2 => {
      console.log(res2);
    });
  }
  }, (err: any) => {

    console.warn("Error try again later!!");
                    },
    () => {
  this.dialogRef.close();
 })
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
}

interface other_type {
  other_type: String;
 }

 interface  period {
  period: String;
 }
