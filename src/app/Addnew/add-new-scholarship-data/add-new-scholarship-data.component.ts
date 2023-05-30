import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceService } from 'src/app/service.service';
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-new-scholarship-data',
  templateUrl: './add-new-scholarship-data.component.html',
  styleUrls: ['./add-new-scholarship-data.component.scss']
})
export class AddNewScholarshipDataComponent implements OnInit {

  fileUpload = new FormData();
  uploads:any[] = [];
  studentList: any[] = [];
  committeeId : any = null;
  yearControl = new FormControl('', Validators.required);
  public add_new_recognition: FormArray = this.fb.array([]);
  public uploadData: FormData = new FormData();

  level: level [] = [
    {level: '2021', },
    {level: '2020', },
    {level: '2019', },
    {level: '2018', },
    {level: '2017', },
    {level: '2016', },
  ];

  schemes: any [] = [
    {title: 'SC scholarship'},
    {title: 'SC free ship'},
    {title: 'ST Scholarship'},
    {title: 'ST Freeship'},
    {title: 'OBC scholarship'},
    {title: 'OBC freeship'},
    {title: 'Minority scholarship'},
    {title: 'UGC scholarship'},
    {title:'NET/JRF fellowship'},
    {title:'Other'},

  ];

  scholarshipTypes: any [] = [
    {value: 'Government'},
    {value: 'Institutional'}
    ];

  // achievementNatures: any[] = [
  //   {value: 'Gold_medal',title: 'Gold medal'},
  //   {value: 'Silver_medal',title: 'Silver medal'},
  //   {value: 'Bronze_medal',title: 'Bronze medal'},
  //   {value: 'Certificate',title: 'Certificate'},
  //   {value: 'First_prize',title: 'First prize'},
  //   {value: 'Second_prize',title: 'Second prize'},
  //   {value: 'Third_prize',title: 'Third prize'},
  //   {value: 'Other',title: 'Other'}
  // ];
  Form: FormGroup;
  constructor(

    private fb: FormBuilder,
    public service: ServiceService,
    private dialogRef: MatDialogRef<AddNewScholarshipDataComponent>,
    @Inject(MAT_DIALOG_DATA) public data : any
  ) {
    this.committeeId = data.committeeId;
    this.Form = this.fb.group({
      achievementYear: this.fb.control('', Validators.required),
      scholarshipType: this.fb.control('',Validators.required),
     add_new_recognition:this.fb.array([this.createadd_new_recognition()],Validators.required),
    })
   }

  ngOnInit(): void {
  }

  get add_new_recognitionControl() {
    this.add_new_recognition = this.Form.get('add_new_recognition') as FormArray;
    return this.add_new_recognition.controls;
  }

  createadd_new_recognition(): FormGroup {
    return this.fb.group({

      scheme:this.fb.control(''),
      OtherName:this.fb.control(''),
      awardingAgency: this.fb.control('',Validators.required),
      noOfStudents:this.fb.control('',[Validators.required,Validators.pattern(new RegExp("[0-9]"))]),
      amount: this.fb.control('',[Validators.required,Validators.pattern(new RegExp("[0-9]"))]),
      //date:this.fb.control('',Validators.required),
      // achievementLevel: this.fb.control('',Validators.required),
      // achievementNature: this.fb.control('',Validators.required)
    });
  }

  addadd_new_recognition(): void {
    this.add_new_recognition = this.Form.get('add_new_recognition') as FormArray;
    this.add_new_recognition.push(this.createadd_new_recognition());
  }

  removeadd_new_recognition(i: number) {
    this.add_new_recognition.removeAt(i);

  }

  upload(event: any,i:number){
    // this.document = event.target.files[0];
    this.uploads[i] = event.target.files[0];
    // console.log(event);
  }

  studentListUpload(event: any,i:number){
    // this.document = event.target.files[0];
    this.studentList[i] = event.target.files[0];
    // console.log(event);
  }
  selectScholarship(event: any){
    console.log("evemt value",event.value,this.Form)
    // this.document = event.target.files[0];
    // this.studentList[i] = event.target.files[0];
    // console.log(event);
  }
  selectScheme(event: any){
    let add_new_recognition = this.Form.controls['add_new_recognition'].value;
    console.log("evemt value",add_new_recognition
    // this.Form.get(['add_new_recognition','scheme']).value
    )
    // this.document = event.target.files[0];
    // this.studentList[i] = event.target.files[0];
    // console.log(event);
  }

  upload1(event: any){
    // this.document = event.target.files[0];
    // this.uploads[i] = event.target.files[0];
    console.log(event);
  }

  submitForm(){

    let scholarshipList: any[] = [];
    for(let i =0;i<this.add_new_recognition.length;i++){

      let ext =  this.uploads[i]?.name.split('.').pop();
      let filename: any = null;
      if(this.uploads[i] != undefined && this.uploads[i] != null ) {
        filename = uuidv4() + "." + ext
        this.fileUpload.append("files", this.uploads[i], filename)
      } else {
        console.log(`At index ${i} document not provided.`);
      }

      let studentExt =  this.studentList[i]?.name.split('.').pop();
      let studentFilename: any = null;
      if(this.uploads[i] != undefined && this.studentList[i] != null ) {
        studentFilename = uuidv4() + "." + studentExt
        this.fileUpload.append("files", this.studentList[i], studentFilename)
      } else {
        console.log(`At index ${i} document not provided.`);
      }


      scholarshipList.push({
        scholarshipScheme: this.Form.get('scholarshipType').value==='Government' && 
        this.add_new_recognition.at(i).get("scheme")?.value!=='Other'?this.add_new_recognition.at(i).get("scheme")?.value:this.add_new_recognition.at(i).get("OtherName")?.value,
        noOfStudent: this.add_new_recognition.at(i).get("noOfStudents")?.value,
        awardingAgency: this.add_new_recognition.at(i).get("awardingAgency")?.value,
        amount: this.add_new_recognition.at(i).get("amount")?.value,
        sanctionLetter: filename,
        studentList: studentFilename,
        // achievementNature: this.add_new_recognition.at(i).get("achievementNature")?.value
      });
    }

    let data = {
      academicYear: this.Form.get("achievementYear")?.value,
      scholarshipType: this.Form.get("scholarshipType")?.value,
      scholarshipData: scholarshipList
    }
    console.log(data);

    this.service.postData("/scholarship", data).subscribe((res: any) => {
      console.log(res);

      if(this.fileUpload.getAll("files").length > 0){
        this.service.postData("/upload", this.fileUpload).subscribe(res2 => {
          console.log(res2);
        });
      }

    }, (err: any) => {
      console.warn("Error try again later!!" +err);
    }, () => {
      this.dialogRef.close();
    });
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
interface level {
  level: string;
}
