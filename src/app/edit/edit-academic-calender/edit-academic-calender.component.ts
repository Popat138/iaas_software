import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceService } from 'src/app/service.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-edit-academic-calender',
  templateUrl: './edit-academic-calender.component.html',
  styleUrls: ['./edit-academic-calender.component.scss']
})
export class EditAcademicCalenderComponent implements OnInit {

  fileUpload = new FormData();
  uploads:any[] = [];
  photograph:any[] = [];
  newsReport:any[] = [];
  participantList:any [] = [];

  committeeId : any = null;
  document:any=null;
  final_data:any;
  public item_data :any[] = [];
  public academic_calander: FormArray = this.fb.array([]);
  public add_details: FormArray = this.fb.array([]);
  public Form: FormGroup;
  public meeting_details: FormArray = this.fb.array([]);
  public report_activity: FormArray = this.fb.array([]);
  year: Year[] = [
    {year: '2018', },
    {year: '2019', },
    {year: '2020', },
    {year: '2021', },
  ];


  role: Role[] = [

    {role: 'Chairman'},
    {role: 'Coordinator'},
    {role: 'Member – teacher'},
    {role: 'Member – staff'},
    {role: 'Member – student'},
    {role: 'Member - alumni'},

  ]
  constructor(

    private fb: FormBuilder,
    public service: ServiceService,
    @Inject(MAT_DIALOG_DATA) public data : any,
    public dialogRef: MatDialogRef<EditAcademicCalenderComponent>
    // private http: HttpClient,

  ) {
    this.Form = this.fb.group({
      academicYear: this.fb.control('',Validators.required),
      // add_details: this.fb.array([this.createAddress()]),
      // academic_calander: this.fb.array([this.createacademic_calander()]),
      // meeting_details: this.fb.array([this.createmeeting_details()]),
      // report_activity: this.fb.array([this.createreport_activity()])
      title: this.fb.control('',Validators.required),
      from_date:this.fb.control('',Validators.required),
      to_date: this.fb.control('',Validators.required),
    })
   }

  ngOnInit(): void {

    this.getData();
}

getData() {
  console.log(this.data.row);
  this.Form.get("academicYear").setValue(this.data.row?.year);
  this.Form.get("title").setValue(this.data.row?.titleOfActivity);
  this.Form.get("from_date").setValue(this.data.row?.fromDate);
  this.Form.get("to_date").setValue(this.data.row?.toDate);

   
  }




///////////////////////////////////////////////////////////////////////////////////////////



  get academic_calanderControl() {
    this.academic_calander = this.Form.get('academic_calander') as FormArray;
    return this.academic_calander.controls;
  }

  createacademic_calander(): FormGroup {
    return this.fb.group({
      title: this.fb.control('',Validators.required),
      from_date:this.fb.control('',Validators.required),
      to_date: this.fb.control('',Validators.required),
    });
  }

  addacademic_calander(): void {
    this.academic_calander = this.Form.get('academic_calander') as FormArray;
    this.academic_calander.push(this.createacademic_calander());
  }

  removeacademic_calander(i: number) {
    this.academic_calander.removeAt(i);
  }



//////////////////////////////////////////////////////////////////////////////////////////////


  get add_detailsControls() {
    this.add_details = this.Form.get('add_details') as FormArray;
    return this.add_details.controls;
  }

  createAddress(): FormGroup {
    return this.fb.group({
      name: this.fb.control('',Validators.required),
      role:this.fb.control('',Validators.required),
      mobile_no: this.fb.control('',Validators.required),
      email: this.fb.control('',Validators.required)
    });
  }
  addAddress(): void {
    this.add_details = this.Form.get('add_details') as FormArray;
    this.add_details.push(this.createAddress());
  }

  removeAddress(i: number) {
    this.add_details.removeAt(i);
  }

  upload(event: any, i: number){
    this.uploads[i] = event.target.files[0];
  }

  photgraphUpload(event: any, i: number){
    this.photograph[i] = event.target.files[0];
  }

  newsReportUpload(event: any, i: number){
    this.newsReport[i] = event.target.files[0];
  }

  participantListUpload(event: any, i: number){
    this.participantList[i] = event.target.files[0];
  }


  ////////////////////////////////////////////////////////////////////////////////////////



  submitForm(){

  let data : any = {
    id: this.data.row.id,
    year : this.Form.get("academicYear")?.value,
    titleOfActivity: this.Form.get("title")?.value,
    fromDate: this.Form.get("from_date")?.value,
    toDate: this.Form.get("to_date")?.value,
}

  console.log(data);

  this.service.putData("/academic-calender/committee/" + this.data.committeeId, data).subscribe((res: any) => {
    console.log(res);
    // if(this.fileUpload.getAll("files").length > 0){
    //   this.service.postData("/upload", this.fileUpload).subscribe(res2 => {
    //     console.log(res2);
    //   });
    // }
  }, (err: any) => {
    console.warn("Error try again later!!");
  }, () => {
    this.dialogRef.close();
  })

  }

fetchcommittee (){

    this.service.postData("/committee/user/"+localStorage.getItem('userId'), this.final_data).subscribe((res: any) => {
      console.log(res);
    }, (err: any) => {
      console.warn("No committee available!!");
    })

  }
}



interface Year {
  year: String;
}

interface Role {
  role: String;
}