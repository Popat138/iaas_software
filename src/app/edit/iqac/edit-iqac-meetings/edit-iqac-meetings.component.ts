import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceService } from 'src/app/service.service';
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-edit-iqac-meetings',
  templateUrl: './edit-iqac-meetings.component.html',
  styleUrls: ['./edit-iqac-meetings.component.scss']
})
export class EditIqacMeetingsComponent implements OnInit {

  fileUpload = new FormData();
  photograph:any=null;
  newsReport:any=null;
  participantList:any=null;
  final_data:any;
  public item_data :any[] = [];
  public Form: FormGroup;
  public agenda: FormArray = this.fb.array([]);

  year: Year[] = [
    {year: '2018-2019', },
    {year: '2019-2020', },
    {year: '2020-2021', },
    {year: '2021-2022', },
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
    public dialogRef: MatDialogRef<EditIqacMeetingsComponent>,
    @Inject(MAT_DIALOG_DATA) public rowdata: any
  ) {
    this.Form = this.fb.group({
      academicYear: this.fb.control('',Validators.required),
      date:this.fb.control('',Validators.required),
      number_of_students:this.fb.control('',[Validators.required]),
      number_of_teachers:this.fb.control('',[Validators.required]),
      breif_report:this.fb.control('',Validators.required),
      // supporting_agency:this.fb.control('',Validators.required),

      agenda:this.fb.array([]),

    })
   }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    console.log(this.rowdata);
    this.Form.get("academicYear").setValue(this.rowdata.academicYear);
    this.Form.get("date")?.setValue(this.rowdata.date);
    this.Form.get("number_of_teachers")?.setValue(this.rowdata.time);
    this.Form.get("number_of_students")?.setValue(this.rowdata.place);
    this.Form.get("breif_report")?.setValue(this.rowdata.introduction);

    this.agenda = this.Form.get('agenda') as FormArray;
    for(let i = 0; i<this.rowdata.agendas.length; i++) 
    {
      this.agenda.push(
        this.fb.group({
          // agendaId: this.fb.control(this.rowdata.agendas[i].id,Validators.required),
          agenda_no: this.fb.control(this.rowdata.agendas[i].agendaNo,Validators.required),
          agenda_name:this.fb.control(this.rowdata.agendas[i].agenda,Validators.required),
          discussion:this.fb.control(this.rowdata.agendas[i].discussion,Validators.required),
          action:this.fb.control(this.rowdata.agendas[i].actionTaken,Validators.required),
          decision:this.fb.control(this.rowdata.agendas[i].decision,Validators.required),
          proposer:this.fb.control(this.rowdata.agendas[i].proposer,Validators.required),
          seconder:this.fb.control(this.rowdata.agendas[i].seconder,Validators.required),
          preperation:this.fb.control(this.rowdata.agendas[i].prepBy),
          responsibility:this.fb.control(this.rowdata.agendas[i].compileBy),
        })
      );
    }
  }

get agendaControl() {
      this.agenda = this.Form.get('agenda') as FormArray;
      return this.agenda.controls;
    }

    createAgenda(): FormGroup {
      return this.fb.group({

        // agendaId: this.fb.control(''),
        agenda_no: this.fb.control('',Validators.required),
        agenda_name:this.fb.control('',Validators.required),
        discussion:this.fb.control('',Validators.required),
        action:this.fb.control(''),
        decision:this.fb.control('',Validators.required),
        proposer:this.fb.control('',Validators.required),
        seconder:this.fb.control('',Validators.required),
        preperation:this.fb.control(''),
        responsibility:this.fb.control(''),
      });
    }

    addAgenda(): void {
      this.agenda = this.Form.get('agenda') as FormArray;
      this.agenda.push(this.createAgenda());
    }

    removeagenda(i: number) {
      this.agenda.removeAt(i);

    }

  submitForm(){
    let agendaList: any[] = [];
    for(let i = 0; i< this.agenda.length; i++) {
      agendaList.push({
        // id: this.agenda.at(i).get("agendaId").value,
        agendaNo: this.agenda.at(i).get("agenda_no").value,
        agenda:this.agenda.at(i).get("agenda_name").value,
        discussion:this.agenda.at(i).get("discussion").value,
        actionTaken:this.agenda.at(i).get("action").value,
        decision:this.agenda.at(i).get("decision").value,
        proposer:this.agenda.at(i).get("proposer").value,
        seconder:this.agenda.at(i).get("seconder").value,
        prepBy:this.agenda.at(i).get("preperation").value,
        compileBy:this.agenda.at(i).get("responsibility").value
      });
    }

    let data : any = {
      id: this.rowdata.id,
      academicYear : this.Form.get("academicYear").value,
      date : this.Form.get("date")?.value,
      time : this.Form.get("number_of_teachers")?.value,
      place : this.Form.get("number_of_students")?.value,
      introduction : this.Form.get("breif_report")?.value,
      agendas: agendaList
    }
    console.log(data);

  this.service.putData("/iqac-meeting", data).subscribe((res: any) => {
    console.log(res);
    if(this.fileUpload.getAll("files").length > 0){
      this.service.postData("/upload", this.fileUpload).subscribe(res2 => {
        console.log(res2);
      });
    }
  }, (err: any) => {
    console.warn(err);
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

interface Year {
  year: String;
}

interface Role {
  role: String;
}
