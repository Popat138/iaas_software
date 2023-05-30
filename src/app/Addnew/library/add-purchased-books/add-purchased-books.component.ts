import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ServiceService } from 'src/app/service.service';
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-purchased-books',
  templateUrl: './add-purchased-books.component.html',
  styleUrls: ['./add-purchased-books.component.scss']
})
export class AddPurchasedBooksComponent implements OnInit {

  uploads:any[] = [];
  fileUpload = new FormData();
  other_type : other_type[] = [

    {other_type: 'Text Books', },
    {other_type: 'Reference books', },
    {other_type: 'Competitive exam', },
    {other_type: 'Other', },


  ]


  public Form: FormGroup;
  public other : FormArray = this.fb.array([]);
  constructor(
    private fb: FormBuilder,
    public service: ServiceService,
    @Inject(MAT_DIALOG_DATA)
    public data : any,
    public dialogRef: MatDialogRef<AddPurchasedBooksComponent>
  )
  {
    // this.userid = data.userid;
    this.Form = this.fb.group({
      // other_type: this.fb.control('',Validators.required),
      // name_of_prog: this.fb.control('',Validators.required),
      // year: this.fb.control('',Validators.required),
      other:this.fb.array([this.createother()]),
    })
   }

  ngOnInit(): void {}

  get otherControl() {
    this.other = this.Form.get('other') as FormArray;
    return this.other.controls;
  }

  upload(event: any, i: number){
    this.uploads[i] = event.target.files[0];
  }
  createother(): FormGroup {
    return this.fb.group({
    year: this.fb.control('',Validators.required),
    other_type: this.fb.control('',Validators.required),
    total_books: this.fb.control('',Validators.required),
    amount_paid: this.fb.control('',Validators.required),
    invoice_no: this.fb.control('',Validators.required),
    date: this.fb.control('',Validators.required),
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

 

  let purchasedBooks: any[] =[];
  for (let i = 0; i<this.other.length; i++) {
    let ext =  this.uploads[i]?.name.split('.').pop();
    let filename: any = null;
    if(this.uploads[i] != undefined && this.uploads[i] != null ) {
      filename = uuidv4() + "." + ext
      this.fileUpload.append("files", this.uploads[i], filename)
    } else {
      console.log(` document not provided.`);
    }
    
    purchasedBooks.push({
      year: this.other.at(i).get("year").value,
      otherType: this.other.at(i).get("other_type").value,
      totalBooks: this.other.at(i).get("total_books").value,
      amountPaid: this.other.at(i).get("amount_paid").value,
      invoiceNo: this.other.at(i).get("invoice_no").value,
      date: this.other.at(i).get("date").value,
      accessionNumbers: filename
    });
  }

  this.service.postData("/purchased-book/bulk/user/" + localStorage.getItem("userId"), purchasedBooks).subscribe((res: any) => {
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

