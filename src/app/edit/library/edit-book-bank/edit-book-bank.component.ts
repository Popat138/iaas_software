import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ServiceService } from 'src/app/service.service';
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-edit-book-bank',
  templateUrl: './edit-book-bank.component.html',
  styleUrls: ['./edit-book-bank.component.scss']
})
export class EditBookBankComponent implements OnInit {

  uploads:any = null;
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
    public dialogRef: MatDialogRef<EditBookBankComponent>,
    private http: HttpClient,
  )
  {
    // this.userid = data.userid;
    this.Form = this.fb.group({
      // total_books: this.fb.control('',Validators.required),
      // name_of_prog: this.fb.control('',Validators.required),
      // year: this.fb.control('',Validators.required),
      // other:this.fb.array([this.createother()]),
      academic_year: this.fb.control('',Validators.required),
    benefited_students: this.fb.control('',Validators.required),
    books_issued: this.fb.control('',Validators.required),
    cost_of_books: this.fb.control('',Validators.required),
    fee_collected: this.fb.control('',Validators.required),
    })
   }

   upload(event: any){
    this.uploads = event.target.files[0];
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    console.log(this.data);
    this.Form.get("academic_year").setValue(this.data.academicYear);
     this.Form.get("benefited_students").setValue(this.data.benefitedStudent);
    this.Form.get("books_issued").setValue(this.data.booksIssued);
    this.Form.get("cost_of_books").setValue(this.data.costOfBooks);
    this.Form.get("fee_collected").setValue(this.data.feeCollected);

    this.http.get(`${this.service.BASE_URL}/resources/uploads/${this.data.upload}`,{responseType: 'blob'}).subscribe(data => {
      this.uploads = data;
      this.uploads.name = this.data.upload;
    });
  }

  get otherControl() {
    this.other = this.Form.get('other') as FormArray;
    return this.other.controls;
  }

  createother(): FormGroup {
    return this.fb.group({
  // Academic year 
  // Total students benefited 
  // Total books issued 
  // Total cost of books 
  // Total fee collected from students



    academic_year: this.fb.control('',Validators.required),
    benefited_students: this.fb.control('',Validators.required),
    books_issued: this.fb.control('',Validators.required),
    cost_of_books: this.fb.control('',Validators.required),
    fee_collected: this.fb.control('',Validators.required),
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

  // let data : any = {


  //   Programme : this.Form.get("")?.value,
  //   name_of_student : this.Form.get("")?.value,
  //   category : this.Form.get("")?.value,
  //   name_of_guide: this.Form.get("")?.value,
  //   registration : this.Form.get("")?.value,
  //   title_of_topic : this.Form.get("")?.value,

  //   other_type:this.Form.get("")?.value,
  //   name_of_prog:this.Form.get("")?.value,
  //   year:this.Form.get("")?.value,

  // }

  // let bookBankList: any[] = [];
  // for (let i = 0; i<this.other.length; i++) {
    let ext =  this.uploads?.name.split('.').pop();
    let filename: any = null;
    if(this.uploads != undefined && this.uploads != null ) {
      filename = uuidv4() + "." + ext
      this.fileUpload.append("files", this.uploads, filename)
    } else {
      console.log(` document not provided.`);
    }
    
    // bookBankList.push({
      let data = {
        id: this.data.id,
        academicYear: this.Form.get("academic_year").value,
      benefitedStudent: this.Form.get("benefited_students").value,
      booksIssued: this.Form.get("books_issued").value,
      costOfBooks: this.Form.get("cost_of_books").value,
      feeCollected: this.Form.get("fee_collected").value,
      upload: filename,
      user: {
        userId: localStorage.getItem("userId")
      }
      }
  //   });
  // }

  this.service.putData("/book-bank", data).subscribe((res: any) => {
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

