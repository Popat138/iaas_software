import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/service.service';
import { HttpClient } from '@angular/common/http';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-view-criteria-quantitative',
  templateUrl: './view-criteria-quantitative.component.html',
  styleUrls: ['./view-criteria-quantitative.component.scss']
})
export class ViewCriteriaQuantitativeComponent implements OnInit {
  course: any = null;
  fileUpload = new FormData();
  uploads:any = null;
  pgFile:any = null;
  ugFile:any = null;
  college;
  association;
  address;
  crh:any=null;
  teacher:any=null;
  user:any=null;
  userId:any=null;
  public item_data :any[] = [];
  public Form: FormGroup;
  types: any =[
    "AQAR",
    "SSR",
    ];
  year: Year[] = [
    {year: '2018', },
    {year: '2019', },
    {year: '2020', },
    {year: '2021', },
  ];

  constructor(
    private fb: FormBuilder,
    public service: ServiceService,
    @Inject(MAT_DIALOG_DATA) public data : any,
    public dialogRef: MatDialogRef<ViewCriteriaQuantitativeComponent>,
    private http: HttpClient,
    public router: Router
  ) {
    this.Form = this.fb.group({
      academicYear: this.fb.control('',Validators.required),
      type:this.fb.control('',Validators.required),
      title:this.fb.control('',Validators.required),
      name:this.fb.control('',Validators.required),
      number_of_students:this.fb.control('',[Validators.required,Validators.pattern(new RegExp("[0-9]"))]),
      breif_report:this.fb.control('',Validators.required),
      link_any:this.fb.control('',Validators.required)
    })

   }

  ngOnInit(): void {
    this.getData();
  }
getData(){
  console.log("VIEWV DATA",this.data)
  this.Form.get("academicYear").setValue(this.data.academicYear);
  this.Form.get("name").setValue(this.data.crh.criteriaName);
  this.Form.get("title")?.setValue(this.data.metricTitle);
  this.Form.get("type")?.setValue(this.data.metricFor);
  this.Form.get("number_of_students")?.setValue(this.data.metricNo);
  this.Form.get("breif_report")?.setValue(this.data.ansBrief);
  this.Form.get("link_any")?.setValue(this.data.anyLink);
  this.http.get(`${this.service.BASE_URL}/resources/uploads/${this.data?.documentOne}`,{responseType: 'blob'}).subscribe(data => {
    this.uploads = data;
    this.uploads.name = this.data?.documentOne;

    
  });

  this.http.get(`${this.service.BASE_URL}/resources/uploads/${this.data?.documentTwo}`,{responseType: 'blob'}).subscribe(data => {
    this.pgFile = data;
    this.pgFile.name = this.data?.documentTwo;
   
  });

  
this.http.get(`${this.service.BASE_URL}/resources/uploads/${this.data?.documentThree}`,{responseType: 'blob'}).subscribe(data => {
  this.ugFile = data;
  this.ugFile.name = this.data?.documentThree;
 
});
}


}
interface Year {
  year: String;
}

interface Role {
  role: String;
}