import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceService } from 'src/app/service.service';

@Component({
  selector: 'app-new-year-details',
  templateUrl: './new-year-details.component.html',
  styleUrls: ['./new-year-details.component.scss']
})
export class NewYearDetailsComponent implements OnInit {

  element : any = null;
  document:any=null;
  final_data:any;
  public item_data :any[] = [];
  yearControl = new FormControl('', Validators.required);
  public academic_calander: FormArray = this.fb.array([]);
  public add_details: FormArray = this.fb.array([]);
  public Form: FormGroup;
  roleControl = new FormControl('', Validators.required);
  public meeting_details: FormArray = this.fb.array([]);
  public report_activity: FormArray = this.fb.array([]);
  //selectFormControl = new FormControl('', Validators.required);
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
    public dialogRef: MatDialogRef<NewYearDetailsComponent>
    // private http: HttpClient,

  ) {
    this.element = data;
    this.Form = this.fb.group({
      academicYear: this.fb.control('',Validators.required),
      add_details: this.fb.array([this.createAddress()],Validators.required),
      academic_calander: this.fb.array([],Validators.required),
      meeting_details: this.fb.array([],Validators.required),
      report_activity: this.fb.array([])
    })
   }

  ngOnInit(): void {
    // this.http.get('/assets/img/placeholder.jpg',{responseType: 'blob'}).subscribe(data => {
    //   this.document = data;
      //this.image.name = 'placeholder.jpg';
  // });
  this.setData();
  }
  setData() {
    console.log(this.element);
    this.Form.get("academicYear")?.setValue(this.element.academicYear);

    this.academic_calander = this.Form.get('academic_calander') as FormArray;
      for(let i =0;i<this.element.academicCalenders.length;i++){
        this.academic_calander.push(
          this.fb.group({
            title: this.fb.control(this.element.academicCalenders[i].titleOfActivity,Validators.required),
            from_date:this.fb.control(this.element.academicCalenders[i].fromDate,Validators.required),
            to_date: this.fb.control(this.element.academicCalenders[i].toDate,Validators.required),
          })
        );
      }

      this.meeting_details = this.Form.get('meeting_details') as FormArray;
      for(let i =0;i<this.element.meetingRecords.length;i++){
        this.meeting_details.push(
          this.fb.group({
            agenda: this.fb.control(this.element.meetingRecords[i].agenda,Validators.required),
            date:this.fb.control(this.element.meetingRecords[i].meetingDate,Validators.required),
          })
        ); 
      }

      this.report_activity = this.Form.get('report_activity') as FormArray;
      for(let i =0;i<this.element.reportOfActivities.length;i++){
        this.report_activity.push(
          this.fb.group({
            title:this.fb.control(this.element.reportOfActivities[i].titleOfActivity,Validators.required),
            f_date:this.fb.control(this.element.reportOfActivities[i].fromDate,Validators.required),
            t_date:this.fb.control(this.element.reportOfActivities[i].toDate,Validators.required),
            number_of_students:this.fb.control(this.element.reportOfActivities[i].noOfStudent,Validators.required),
            number_of_teachers:this.fb.control(this.element.reportOfActivities[i].noOfTeachers,Validators.required),
            breif_report:this.fb.control(this.element.reportOfActivities[i].reportBrief,Validators.required),
            supporting_agency:this.fb.control(this.element.reportOfActivities[i].supportingAgency,Validators.required),
          })
        ); 
      }
  }

//////////////////////////////////////////////////////////////////////////////////////

  get report_activityControl() {
    this.report_activity = this.Form.get('report_activity') as FormArray;
    return this.report_activity.controls;
  }

  createreport_activity(): FormGroup {
    return this.fb.group({

      title:this.fb.control('',Validators.required),
      f_date:this.fb.control('',Validators.required),
      t_date:this.fb.control('',Validators.required),
      number_of_students:this.fb.control('',Validators.required),
      number_of_teachers:this.fb.control('',Validators.required),
      breif_report:this.fb.control('',Validators.required),
      supporting_agency:this.fb.control('',Validators.required),
      upload:this.fb.control('')

    });
  }

  addreport_activity(): void {
    this.report_activity = this.Form.get('report_activity') as FormArray;
    this.report_activity.push(this.createreport_activity());
  }

  removereport_activity(i: number) {
    this.report_activity.removeAt(i);

  }



///////////////////////////////////////////////////////////////////////////////////



  get meeting_detailsControl() {
    this.meeting_details = this.Form.get('meeting_details') as FormArray;
    return this.meeting_details.controls;
  }

  createmeeting_details(): FormGroup {
    return this.fb.group({
      agenda: this.fb.control('',Validators.required),
      date:this.fb.control('',Validators.required),

    });
  }

  addmeeting_details(): void {
    this.meeting_details = this.Form.get('meeting_details') as FormArray;
    this.meeting_details.push(this.createmeeting_details());
  }

  removemeeting_details(i: number) {
    this.meeting_details.removeAt(i);

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

  upload(event: Event){
    // this.document = event.target.files[0];
    console.log(event);
  }

  ////////////////////////////////////////////////////////////////////////////////////////



  submitForm(){

//     // this.item_data = [];
//     // for(let i =0;i<this.academic_calander.length;i++){
//     //   this.item_data.push({
//     //     title: this.academic_calander.at(i).get("title")?.value,
//     //     from_date: this.academic_calander.at(i).get("from_date")?.value,
//     //     to_date: this.academic_calander.at(i).get("to_date")?.value,
//     //     // Quantity: this.academic_calander.at(i).get("Quantity").value,
//     //     // Rate: this.academic_calander.at(i).get("Rate").value,
//     //     // amount: this.itemTableRows.at(i).get("amount").value
//     //   })
//     // }

//     let academicCalender = {
//       titleOfActivity : "fddtydyt",
//       fromDate: "2021-11-19T18:17:09.000+00:00",
//       toDate: "2021-11-19T18:17:09.000+00:00"
//   }

//     let meetingRecord = {
//       agenda : "yftyfuu",
//       MeetingDate : "2021-11-19T18:17:09.000+00:00",
//       document : "tydtyfu"
//   }

//     let reportOfActivitie = {
//       titleOfActivity : "gftyfuyfuidt7dty",
//       fromDate : "2021-11-19T18:17:09.000+00:00",
//       toDate : "2021-11-19T18:17:09.000+00:00",
//       noOfTeachers : 52,
//       noOfStudent : 46,
//       reportBrief : "ftyfuyxsryd",
//       supportingAgency : "srtstysdut",
//       photographs : [
//           {
//               photo : "ytdytstd"
//           }
//       ],
//       newsReports : [
//           {
//               news : "dtysytsys"
//           }
//       ],
//       listOfParticipants : [
//           {
//               participant : "tysdtydydty"
//           }
//       ]
//   }

//     let studentAchievement = {
//       nameOfStudent : "srtstydyt",
//       awardingAgency : "drdytdt",
//       achievementNature : "tydtydtdty",
//       achievementLevel : "International",
//       studentCertificate : "str7td7yf67"
//   }

//   let academicCalenderList: any[] = [];
//   for(let i =0;i<this.academic_calander.length;i++){
//     academicCalenderList.push({
//       titleOfActivity: this.academic_calander.at(i).get("title")?.value,
//       fromDate: this.academic_calander.at(i).get("from_date")?.value,
//       toDate: this.academic_calander.at(i).get("to_date")?.value
//     })
//   }

//   let meetingRecordList: any[] = [];
//   for(let i =0;i<this.meeting_details.length;i++){
//     meetingRecordList.push({
//       agenda: this.meeting_details.at(i).get("agenda")?.value,
//       MeetingDate: this.meeting_details.at(i).get("date")?.value
//       //TODO Need to add document
//     })
//   }

//   let reportOfActivitieList : any[] = [];
//   for(let i =0;i<this.report_activity.length;i++){
//     reportOfActivitieList.push({
//       titleOfActivity: this.report_activity.at(i).get("title")?.value,
//       fromDate : this.report_activity.at(i).get("f_date")?.value,
//       toDate : this.report_activity.at(i).get("t_date")?.value,
//       noOfTeachers : this.report_activity.at(i).get("number_of_teachers")?.value,
//       noOfStudent : this.report_activity.at(i).get("number_of_students")?.value,
//       reportBrief : this.report_activity.at(i).get("breif_report")?.value,
//       supportingAgency : this.report_activity.at(i).get("supporting_agency")?.value
//       //TODO Need to add document
//     })
//   }

//   let data : any = {
//     academicYear : this.Form.get("academicYear")?.value,
//     academicCalenders : academicCalenderList,
//     meetingRecords : meetingRecordList,
//     reportOfActivities : reportOfActivitieList
// }

//   // console.log(data);

//   this.service.postData("/year-detail/committee/"+ this.committeeId, data).subscribe((res: any) => {
//     console.log(res);
//   }, (err: any) => {
//     console.warn("Error try again later!!");
//   }, () => {
//     this.dialogRef.close();
//   })

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