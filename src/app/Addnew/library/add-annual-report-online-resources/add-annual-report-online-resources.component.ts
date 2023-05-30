import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { SelectOnlineResourceByCollegeIdComponent } from 'src/app/common/select-online-resource-by-college-id/select-online-resource-by-college-id.component';
import { ServiceService } from 'src/app/service.service';
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-annual-report-online-resources',
  templateUrl: './add-annual-report-online-resources.component.html',
  styleUrls: ['./add-annual-report-online-resources.component.scss']
})
export class AddAnnualReportOnlineResourcesComponent implements OnInit {

  resources: any[] = [];
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
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<AddAnnualReportOnlineResourcesComponent>
  )
  {
    // this.userid = data.userid;
    this.Form = this.fb.group({
     //  total_books: this.fb.control('',Validators.required),
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

  getOnlineResources(i: number) {
    const dialogRef = this.dialog.open(SelectOnlineResourceByCollegeIdComponent ,{width: "80%",height: "86vh",panelClass: 'full-width-dialog'});
    dialogRef.afterClosed().subscribe((result) => {
      if(result != undefined) {
        console.log(result);
        this.resources[i] = result;
        this.other.at(i).get("resource_name").setValue(result.resourceName);
      }
    });
  }

  createother(): FormGroup {
    return this.fb.group({



    academic_year: this.fb.control('',Validators.required),
    resource_name: this.fb.control('',Validators.required),
    total_users: this.fb.control('',Validators.required),
    // cost_of_books: this.fb.control('',Validators.required),
    // fee_collected: this.fb.control('',Validators.required),
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

  let annualReportList: any[] = [];
  for (let i = 0; i<this.other.length; i++) {
    let ext =  this.uploads[i]?.name.split('.').pop();
    let filename: any = null;
    if(this.uploads[i] != undefined && this.uploads[i] != null ) {
      filename = uuidv4() + "." + ext
      this.fileUpload.append("files", this.uploads[i], filename)
    } else {
      console.log(` document not provided.`);
    }
    
    annualReportList.push({
      academicYear: this.other.at(i).get("academic_year").value,
      // resourceName: this.other.at(i).get("resource_name").value,
      onlineResource: {
        id: this.resources[i].id
      },
      totalUsers: this.other.at(i).get("total_users").value,
      usageReport: filename
    });
  }


  this.service.postData("/annual-report-resource/bulk/user/" + localStorage.getItem("userId"), annualReportList).subscribe((res: any) => {
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
