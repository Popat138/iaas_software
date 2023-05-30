import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ServiceService } from 'src/app/service.service';
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-journal-scubscription',
  templateUrl: './add-journal-scubscription.component.html',
  styleUrls: ['./add-journal-scubscription.component.scss']
})
export class AddJournalScubscriptionComponent implements OnInit {


  uploads:any[] = [];
  fileUpload = new FormData();
  other_type : other_type[] = [

    {other_type: 'National', },
    {other_type: 'International', },
    // {other_type: 'Competitive exam', },
    // {other_type: 'Other', },


  ]

  period : period[] = [


    {period: 'Monthly', },
    {period: 'Quarterly', },
    {period: 'Biannual', },
    {period: 'Other', },

  ]


  public Form: FormGroup;
  public other : FormArray = this.fb.array([]);
  constructor(
    private fb: FormBuilder,
    public service: ServiceService,
    @Inject(MAT_DIALOG_DATA)
    public data : any,
    public dialogRef: MatDialogRef<AddJournalScubscriptionComponent>
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

   upload(event: any, i: number){
    this.uploads[i] = event.target.files[0];
  }

  ngOnInit(): void {}

  get otherControl() {
    this.other = this.Form.get('other') as FormArray;
    return this.other.controls;
  }

  createother(): FormGroup {
    return this.fb.group({

    year: this.fb.control('',Validators.required),
    other_type: this.fb.control('',Validators.required),
    journal_name: this.fb.control('',Validators.required),
    issn_no: this.fb.control('',Validators.required),
    period: this.fb.control('',Validators.required),
    s_date: this.fb.control('',Validators.required),
    s_amount: this.fb.control('',Validators.required),
    j_mode: this.fb.control('',Validators.required),
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

  let jounalSubscriptions: any[] =[];
  for (let i = 0; i<this.other.length; i++) {
    let ext =  this.uploads[i]?.name.split('.').pop();
    let filename: any = null;
    if(this.uploads[i] != undefined && this.uploads[i] != null ) {
      filename = uuidv4() + "." + ext
      this.fileUpload.append("files", this.uploads[i], filename)
    } else {
      console.log(` document not provided.`);
    }
    
    jounalSubscriptions.push({
      year: this.other.at(i).get("year").value,
      otherType: this.other.at(i).get("other_type").value,
      journalName: this.other.at(i).get("journal_name").value,
      issnNo: this.other.at(i).get("issn_no").value,
      period: this.other.at(i).get("period").value,
      date: this.other.at(i).get("s_date").value,
      amount: this.other.at(i).get("s_amount").value,
      mode: this.other.at(i).get("j_mode").value,
      subscriptionReceipt: filename
    });
  }

  this.service.postData("/journal-subscription/bulk/user/" + localStorage.getItem("userId"), jounalSubscriptions).subscribe((res: any) => {
  console.log(res);
  if(this.fileUpload.getAll("files").length > 0){
    this.service.postData("/upload", this.fileUpload).subscribe(res2 => {
      console.log(res2);
    });
  }
  }, (err: any) => {

    console.warn(err);
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
