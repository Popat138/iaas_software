import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ServiceService } from 'src/app/service.service';

@Component({
  selector: 'app-edit-rare-books',
  templateUrl: './edit-rare-books.component.html',
  styleUrls: ['./edit-rare-books.component.scss']
})
export class EditRareBooksComponent implements OnInit {

  uploads:any = null;
  other_type : other_type[] = [

    {other_type: 'e-journals', },
    {other_type: 'e-Shodh Sindhu', },
    {other_type: 'Shodhganga Membership', },
    {other_type: 'e-books', },
    {other_type: 'Databases', },
    {other_type: 'Remote access to e-resources', },


  ]

  public Form: FormGroup;
  public other : FormArray = this.fb.array([]);
  constructor(
    private fb: FormBuilder,
    public service: ServiceService,
    @Inject(MAT_DIALOG_DATA)
    public data : any,
    public dialogRef: MatDialogRef<EditRareBooksComponent>
  )
  {
    // this.userid = data.userid;
    this.Form = this.fb.group({
      //  total_books: this.fb.control('',Validators.required),
      // name_of_prog: this.fb.control('',Validators.required),
      // year: this.fb.control('',Validators.required),
      // other:this.fb.array([this.createother()]),
      accession_no: this.fb.control('',Validators.required),
    book_title: this.fb.control('',Validators.required),
    author: this.fb.control('',Validators.required),
    publisher: this.fb.control('',Validators.required),
    publication_year: this.fb.control('',Validators.required),
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
    this.Form.get("accession_no").setValue(this.data.accessionNo);
    this.Form.get("book_title").setValue(this.data.bookTitle);
    this.Form.get("author").setValue(this.data.author);
    this.Form.get("publisher").setValue(this.data.publisher);
    this.Form.get("publication_year").setValue(this.data.publicationYear);
  }

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

  // let rareBooks: any[] =[];
  // for (let i = 0; i<this.other.length; i++) {
    
  //   rareBooks.push({
      let data = {
        id: this.data.id,
        accessionNo: this.Form.get("accession_no").value,
        bookTitle: this.Form.get("book_title").value,
        author: this.Form.get("author").value,
        publisher: this.Form.get("publisher").value,
        publicationYear: this.Form.get("publication_year").value,
        user: {
          userId: localStorage.getItem("userId")
        }
      }
  //   });
  // }

  this.service.putData("/rare-book", data).subscribe((res: any) => {
  console.log(res);
  }, (err: any) => {

    console.warn("Error try again later!!");
                    },
    () => {
  this.dialogRef.close();
 })
}
}

interface other_type {
  other_type: String;
 }

 interface  period {
  period: String;
 }
