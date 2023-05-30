import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ServiceService } from 'src/app/service.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-rare-books',
  templateUrl: './add-rare-books.component.html',
  styleUrls: ['./add-rare-books.component.scss']
})
export class AddRareBooksComponent implements OnInit {


  uploads:any = null;
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
    public dialogRef: MatDialogRef<AddRareBooksComponent>
  )
  {
    // this.userid = data.userid;
    this.Form = this.fb.group({
       total_books: this.fb.control('',Validators.required),
      // name_of_prog: this.fb.control('',Validators.required),
      // year: this.fb.control('',Validators.required),
      other:this.fb.array([this.createother()]),
    })
   }

   upload(event: any){
    this.uploads = event.target.files[0];
  }

  ngOnInit(): void {}

  get otherControl() {
    this.other = this.Form.get('other') as FormArray;
    return this.other.controls;
  }

  createother(): FormGroup {
    return this.fb.group({

    accession_no: this.fb.control('',Validators.required),
    book_title: this.fb.control('',Validators.required),
    author: this.fb.control('',Validators.required),
    publisher: this.fb.control('',Validators.required),
    publication_year: this.fb.control('',Validators.required),
    //no_of_users: this.fb.control('',Validators.required),

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

  let rareBooks: any[] =[];
  for (let i = 0; i<this.other.length; i++) {
    
    rareBooks.push({
      accessionNo: this.other.at(i).get("accession_no").value,
      bookTitle: this.other.at(i).get("book_title").value,
      author: this.other.at(i).get("author").value,
      publisher: this.other.at(i).get("publisher").value,
      publicationYear: this.other.at(i).get("publication_year").value,
    });
  }

  this.service.postData("/rare-book/bulk/user/" + localStorage.getItem("userId"), rareBooks).subscribe((res: any) => {
  console.log(res);
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
