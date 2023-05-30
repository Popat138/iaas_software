import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/service.service';
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-edit-ilms-info',
  templateUrl: './edit-ilms-info.component.html',
  styleUrls: ['./edit-ilms-info.component.scss']
})
export class EditIlmsInfoComponent implements OnInit {

  uploads:any = null;
  agreementCopy: any = null;
  maintenanceBill: any = null;
  fileUpload = new FormData();
  public Form: FormGroup;
  constructor(

    private fb: FormBuilder,
    public service: ServiceService,
    @Inject(MAT_DIALOG_DATA)
    public data : any,
    public dialogRef: MatDialogRef<EditIlmsInfoComponent>,
    private http: HttpClient,


  ) {
    // this.userid = data.userid;
    this.Form = this.fb.group({
      name: this.fb.control('',Validators.required),
      nature_of_automation: this.fb.control('',Validators.required),
      version: this.fb.control('',Validators.required),
      year_of_automation: this.fb.control('',Validators.required),
      vendor_name: this.fb.control('',Validators.required),
      year: this.fb.control('',Validators.required),
    //  academic_calander: this.fb.array([this.createacademic_calander()]),
      // meeting_details: this.fb.array([this.createmeeting_details()]),
      // report_activity: this.fb.array([this.createreport_activity()])
    })
   }

   upload(event: any){
    this.uploads = event.target.files[0];
  }

  uploadAgreementCopy(event : any) {
    this.agreementCopy = event.target.files[0];
  }

  uploadMaintenance(event: any) {
    this.maintenanceBill = event.target.files[0];
  }


  ngOnInit(): void {
    this.getData();
  }

  getData() {
    console.log(this.data);
    this.Form.get("name").setValue(this.data.name);
    this.Form.get("nature_of_automation").setValue(this.data.natureOfAutomation);
    this.Form.get("version").setValue(this.data.version);
    this.Form.get("year_of_automation").setValue(this.data.yearOfAutomation);
    this.Form.get("vendor_name").setValue(this.data.vendorName);
    this.Form.get("year").setValue(this.data.year);


    this.http.get(`${this.service.BASE_URL}/resources/uploads/${this.data.purchaseReceipt}`,{responseType: 'blob'}).subscribe(data => {
      this.uploads = data;
      this.uploads.name = this.data.purchaseReceipt;
  });

  this.http.get(`${this.service.BASE_URL}/resources/uploads/${this.data.agreementCopy}`,{responseType: 'blob'}).subscribe(data => {
    this.agreementCopy = data;
    this.agreementCopy.name = this.data.agreementCopy;
});

this.http.get(`${this.service.BASE_URL}/resources/uploads/${this.data.maintenanceBill}`,{responseType: 'blob'}).subscribe(data => {
  this.maintenanceBill = data;
  this.maintenanceBill.name = this.data.maintenanceBill;
});
  }

  submitForm(){

    let ext =  this.uploads?.name.split('.').pop();
    let filename: any = null;
    if(this.uploads != undefined && this.uploads != null ) {
      filename = uuidv4() + "." + ext
      this.fileUpload.append("files", this.uploads, filename)
    } else {
      console.log(` document not provided.`);
    }

    let agreementExt =  this.agreementCopy?.name.split('.').pop();
    let agreementFilename: any = null;
    if(this.agreementCopy != undefined && this.agreementCopy != null ) {
      agreementFilename = uuidv4() + "." + agreementExt
      this.fileUpload.append("files", this.agreementCopy, agreementFilename)
    } else {
      console.log(` document not provided.`);
    }

    let maintenanceExt =  this.maintenanceBill?.name.split('.').pop();
    let maintenanceFilename: any = null;
    if(this.maintenanceBill != undefined && this.maintenanceBill != null ) {
      maintenanceFilename = uuidv4() + "." + maintenanceExt
      this.fileUpload.append("files", this.maintenanceBill, maintenanceFilename)
    } else {
      console.log(` document not provided.`);
    }

  let data : any = {
    id: this.data.id,
    name : this.Form.get("name")?.value,
    natureOfAutomation : this.Form.get("nature_of_automation")?.value,
    version : this.Form.get("version")?.value,
    yearOfAutomation : this.Form.get("year_of_automation")?.value,
    vendorName : this.Form.get("vendor_name")?.value,
    year: this.Form.get("year")?.value,
    purchaseReceipt: filename,
    agreementCopy: agreementFilename,
    maintenanceBill: maintenanceFilename,
    user: {
      userId: localStorage.getItem("userId")
    }
   // paswd : this.Form.get("paswd")?.value,
  }

  this.service.putData("/ilms-info", data).subscribe((res: any) => {
  console.log(res);
  if(this.fileUpload.getAll("files").length > 0){
    this.service.postData("/upload", this.fileUpload).subscribe(res2 => {
      console.log(res2);
    });
  }
  }, (err: any) => {
  console.warn("Error try again later!!");
  }, () => {
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
