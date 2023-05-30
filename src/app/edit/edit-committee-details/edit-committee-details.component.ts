import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceService } from 'src/app/service.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-edit-committee-details',
  templateUrl: './edit-committee-details.component.html',
  styleUrls: ['./edit-committee-details.component.scss']
})
export class EditCommitteeDetailsComponent implements OnInit {

  fileUpload = new FormData();
  uploads:any[] = [];
  photograph:any[] = [];
  newsReport:any[] = [];
  participantList:any [] = [];

  rowData : any;
  public academic_calander: FormArray = this.fb.array([]);
  public add_details: FormArray = this.fb.array([]);
  public Form: FormGroup;
  public meeting_details: FormArray = this.fb.array([]);
  public report_activity: FormArray = this.fb.array([]);

  year: any[] = [
    {year: '2018', },
    {year: '2019', },
    {year: '2020', },
    {year: '2021', },
  ];

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data : any,
    public service: ServiceService,
    public dialogRef: MatDialogRef<EditCommitteeDetailsComponent>
  ) { 
    this.rowData = data;
    this.Form = this.fb.group({
      academicYear: this.fb.control('',Validators.required),
      // add_details: this.fb.array([this.createAddress()]),
      academic_calander: this.fb.array([]),
      meeting_details: this.fb.array([]),
      report_activity: this.fb.array([])
    })
   }

  ngOnInit(): void {
    this.assignData();
  }

//////////////////////////////////////////////////////////////////////////////////////

  assignData() {
    this.Form.get("academicYear").setValue(this.rowData.academicYear);

    this.academic_calander = this.Form.get('academic_calander') as FormArray;
    for(let i =0; i<this.rowData.academicCalenders.length; i++){

     this.academic_calander.push(
        this.fb.group({
          title: this.fb.control(this.rowData.academicCalenders[i].titleOfActivity,Validators.required),
          from_date:this.fb.control(this.rowData.academicCalenders[i].fromDate,Validators.required),
          to_date: this.fb.control(this.rowData.academicCalenders[i].toDate,Validators.required),
        })
      )
    }

    this.meeting_details = this.Form.get('meeting_details') as FormArray;
    for(let i =0; i<this.rowData.meetingRecords.length; i++){
      this.service.getFile(this.rowData.meetingRecords[i].document).subscribe((res:any) => {
        this.uploads[i] = res;
      }, (err : any) => {
        console.warn("Error try again later");
      });
      this.meeting_details.push(
        this.fb.group({
          agenda: this.fb.control(this.rowData.meetingRecords[i].agenda,Validators.required),
          date:this.fb.control(this.rowData.meetingRecords[i].meetingDate,Validators.required),
        })
      );
    }

    this.report_activity = this.Form.get('report_activity') as FormArray;
    for(let i =0; i<this.rowData.reportOfActivities.length; i++){
      this.report_activity.push(
        this.fb.group({
          title:this.fb.control(this.rowData.reportOfActivities[i].titleOfActivity,Validators.required),
          f_date:this.fb.control(this.rowData.reportOfActivities[i].fromDate,Validators.required),
          t_date:this.fb.control(this.rowData.reportOfActivities[i].toDate,Validators.required),
          number_of_students:this.fb.control(this.rowData.reportOfActivities[i].noOfStudent,[Validators.required,Validators.pattern(new RegExp("[0-9]"))]),
          number_of_teachers:this.fb.control(this.rowData.reportOfActivities[i].noOfTeachers,[Validators.required,Validators.pattern(new RegExp("[0-9]"))]),
          breif_report:this.fb.control(this.rowData.reportOfActivities[i].reportBrief,Validators.required),
          supporting_agency:this.fb.control(this.rowData.reportOfActivities[i].supportingAgency,Validators.required)
        })
      );
    }
  }

  get report_activityControl() {
    this.report_activity = this.Form.get('report_activity') as FormArray;
    return this.report_activity.controls;
  }

  createreport_activity(): FormGroup {
    return this.fb.group({
      title:this.fb.control('',Validators.required),
      f_date:this.fb.control('',Validators.required),
      t_date:this.fb.control('',Validators.required),
      number_of_students:this.fb.control('',[Validators.required,Validators.pattern(new RegExp("[0-9]"))]),
      number_of_teachers:this.fb.control('',[Validators.required,Validators.pattern(new RegExp("[0-9]"))]),
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

  let academicCalenderList: any[] = [];
  for(let i =0;i<this.academic_calander.length;i++){
    academicCalenderList.push({
      titleOfActivity: this.academic_calander.at(i).get("title")?.value,
      fromDate: this.academic_calander.at(i).get("from_date")?.value,
      toDate: this.academic_calander.at(i).get("to_date")?.value
    })
  }

  let meetingRecordList: any[] = [];
  for(let i =0;i<this.meeting_details.length;i++){

    let ext =  this.uploads[i]?.name.split('.').pop();
    let filename: any = null;
    if(this.uploads[i] != undefined && this.uploads[i] != null ) {
      filename = uuidv4() + "." + ext
      this.fileUpload.append("files", this.uploads[i], filename) 
    } else {
      console.log(`At index ${i} document not provided.`);
    }

    meetingRecordList.push({
      agenda: this.meeting_details.at(i).get("agenda")?.value,
      meetingDate: this.meeting_details.at(i).get("date")?.value,
      document: filename
    })
  }

  let reportOfActivitieList : any[] = [];
  for(let i =0;i<this.report_activity.length;i++){

    // let photographList : any[] = [];
    let photographExt =  this.photograph[i]?.name.split('.').pop();
    let photographFilename: any = null;
    if(this.photograph[i] != undefined && this.photograph[i] != null ) {
      photographFilename = uuidv4() + "." + photographExt;
      this.fileUpload.append("files", this.photograph[i], photographFilename) 
    } else {
      console.log(`At index ${i} document not provided.`);
    }
    // photographList.push({

    // });

    let newsReportExt =  this.newsReport[i]?.name.split('.').pop();
    let newsReportFilename: any = null;
    if(this.newsReport[i] != undefined && this.newsReport[i] != null ) {
      newsReportFilename = uuidv4() + "." + newsReportExt;
      this.fileUpload.append("files", this.newsReport[i], newsReportFilename) 
    } else {
      console.log(`At index ${i} document not provided.`);
    }

    let participantListExt =  this.participantList[i]?.name.split('.').pop();
    let participantListFilename: any = null;
    if(this.participantList[i] != undefined && this.participantList[i] != null ) {
      participantListFilename = uuidv4() + "." + participantListExt
      this.fileUpload.append("files", this.participantList[i], participantListFilename) 
    } else {
      console.log(`At index ${i} document not provided.`);
    }

    reportOfActivitieList.push({
      titleOfActivity: this.report_activity.at(i).get("title")?.value,
      fromDate : this.report_activity.at(i).get("f_date")?.value,
      toDate : this.report_activity.at(i).get("t_date")?.value,
      noOfTeachers : this.report_activity.at(i).get("number_of_teachers")?.value,
      noOfStudent : this.report_activity.at(i).get("number_of_students")?.value,
      reportBrief : this.report_activity.at(i).get("breif_report")?.value,
      supportingAgency : this.report_activity.at(i).get("supporting_agency")?.value,
      photographs: [{
        photo: photographFilename
      }],
      newsReports: [{
        news: newsReportFilename
      }],
      listOfParticipants: [{
        participant: participantListFilename
      }]
    })
  }

  let data : any = {
    id: this.rowData.id,
    academicYear : this.Form.get("academicYear")?.value,
    academicCalenders : academicCalenderList,
    meetingRecords : meetingRecordList,
    reportOfActivities : reportOfActivitieList
}

  // console.log(data);

  this.service.putData("/year-detail", data).subscribe((res: any) => {
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

  }


}
