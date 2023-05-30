import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ServiceService } from 'src/app/service.service';
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-book-bank',
  templateUrl: './add-book-bank.component.html',
  styleUrls: ['./add-book-bank.component.scss']
})
export class AddBookBankComponent implements OnInit {

  uploads:any[] = [];
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
    public dialogRef: MatDialogRef<AddBookBankComponent>
  )
  {
    // this.userid = data.userid;
    this.Form = this.fb.group({
      // total_books: this.fb.control('',Validators.required),
      // name_of_prog: this.fb.control('',Validators.required),
      // year: this.fb.control('',Validators.required),
      other:this.fb.array([this.createother()]),
    })
   }

   upload(event: any, i:number){
    this.uploads[i] = event.target.files[0];
  }

  ngOnInit(): void {}

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

  let bookBankList: any[] = [];
  for (let i = 0; i<this.other.length; i++) {
    let ext =  this.uploads[i]?.name.split('.').pop();
    let filename: any = null;
    if(this.uploads[i] != undefined && this.uploads[i] != null ) {
      filename = uuidv4() + "." + ext
      this.fileUpload.append("files", this.uploads[i], filename)
    } else {
      console.log(` document not provided.`);
    }
    
    bookBankList.push({
      academicYear: this.other.at(i).get("academic_year").value,
      benefitedStudent: this.other.at(i).get("benefited_students").value,
      booksIssued: this.other.at(i).get("books_issued").value,
      costOfBooks: this.other.at(i).get("cost_of_books").value,
      feeCollected: this.other.at(i).get("fee_collected").value,
      upload: filename
    });
  }

  this.service.postData("/book-bank/bulk/user/" + localStorage.getItem("userId"), bookBankList).subscribe((res: any) => {
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
