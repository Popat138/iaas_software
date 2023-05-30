import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ServiceService } from 'src/app/service.service';
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-edit-purchased-books',
  templateUrl: './edit-purchased-books.component.html',
  styleUrls: ['./edit-purchased-books.component.scss']
})
export class EditPurchasedBooksComponent implements OnInit {

  uploads:any = null;
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
    public dialogRef: MatDialogRef<EditPurchasedBooksComponent>,
    private http: HttpClient,
  )
  {
    // this.userid = data.userid;
    this.Form = this.fb.group({
      // other_type: this.fb.control('',Validators.required),
      // name_of_prog: this.fb.control('',Validators.required),
      // year: this.fb.control('',Validators.required),
      // other:this.fb.array([this.createother()]),
      year: this.fb.control('',Validators.required),
      other_type: this.fb.control('',Validators.required),
      total_books: this.fb.control('',Validators.required),
      amount_paid: this.fb.control('',Validators.required),
      invoice_no: this.fb.control('',Validators.required),
      date: this.fb.control('',Validators.required),
    })
   }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    console.log(this.data);
    
    this.Form.get("year").setValue(this.data.year);
    this.Form.get("other_type").setValue(this.data.otherType);
    this.Form.get("total_books").setValue(this.data.totalBooks);
    this.Form.get("amount_paid").setValue(this.data.amountPaid);
    this.Form.get("invoice_no").setValue(this.data.invoiceNo);
    this.Form.get("date").setValue(this.data.date);

    this.http.get(`${this.service.BASE_URL}/resources/uploads/${this.data.accessionNumbers}`,{responseType: 'blob'}).subscribe(data => {
      this.uploads = data;
      this.uploads.name = this.data.accessionNumbers;
    });
  }

  get otherControl() {
    this.other = this.Form.get('other') as FormArray;
    return this.other.controls;
  }

  upload(event: any){
    this.uploads = event.target.files[0];
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

 

  // let purchasedBooks: any[] =[];
  // for (let i = 0; i<this.other.length; i++) {
    let ext =  this.uploads?.name.split('.').pop();
    let filename: any = null;
    if(this.uploads != undefined && this.uploads != null ) {
      filename = uuidv4() + "." + ext
      this.fileUpload.append("files", this.uploads, filename)
    } else {
      console.log(` document not provided.`);
    }
    
    // purchasedBooks.push({
      let data = { 
        id: this.data.id,
        year: this.Form.get("year").value,
        otherType: this.Form.get("other_type").value,
        totalBooks: this.Form.get("total_books").value,
        amountPaid: this.Form.get("amount_paid").value,
        invoiceNo: this.Form.get("invoice_no").value,
        date: this.Form.get("date").value,
        accessionNumbers: filename,
        user: {
          userId: localStorage.getItem("userId")
        }
      }
    // });
  // }

  this.service.putData("/purchased-book", data).subscribe((res: any) => {
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
}

interface other_type {
  other_type: String;
 }

