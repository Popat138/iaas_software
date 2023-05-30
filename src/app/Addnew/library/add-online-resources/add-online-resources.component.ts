import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ServiceService } from 'src/app/service.service';
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-online-resources',
  templateUrl: './add-online-resources.component.html',
  styleUrls: ['./add-online-resources.component.scss']
})
export class AddOnlineResourcesComponent implements OnInit {


  uploads:any[] = [];
  uploadUsageReciept:any[] = [];
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
    public dialogRef: MatDialogRef<AddOnlineResourcesComponent>
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

   upload(event: any, i:number){
    this.uploads[i] = event.target.files[0];
  }

  uploadUsage(event: any, i:number) {
    this.uploadUsageReciept[i] = event.target.files[0];
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
    resource_name: this.fb.control('',Validators.required),
    s_date: this.fb.control('',Validators.required),
    s_amount: this.fb.control('',Validators.required),
    no_of_users: this.fb.control('',Validators.required),

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

  let onlineResearchList: any[] = [];
  for (let i = 0; i<this.other.length; i++) {
    let ext =  this.uploads[i]?.name.split('.').pop();
    let filename: any = null;
    if(this.uploads[i] != undefined && this.uploads[i] != null ) {
      filename = uuidv4() + "." + ext
      this.fileUpload.append("files", this.uploads[i], filename)
    } else {
      console.log(` document not provided.`);
    }

    let usageExt =  this.uploadUsageReciept[i]?.name.split('.').pop();
    let usageFilename: any = null;
    if(this.uploadUsageReciept[i] != undefined && this.uploadUsageReciept[i] != null ) {
      usageFilename = uuidv4() + "." + usageExt
      this.fileUpload.append("files", this.uploadUsageReciept[i], usageFilename)
    } else {
      console.log(` document not provided.`);
    }

    onlineResearchList.push({
      year: this.other.at(i).get("year").value,
      otherType: this.other.at(i).get("other_type").value,
      resourceName: this.other.at(i).get("resource_name").value,
      date: this.other.at(i).get("s_date").value,
      amount: this.other.at(i).get("s_amount").value,
      noOfUsers: this.other.at(i).get("no_of_users").value,
      subscriptionReceipt: filename,
      annualUsage: usageFilename
    });

  }

  this.service.postData("/online-resource/bulk/user/" + localStorage.getItem("userId"), onlineResearchList).subscribe((res: any) => {
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
