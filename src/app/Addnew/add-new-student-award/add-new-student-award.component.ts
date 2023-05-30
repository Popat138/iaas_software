import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceService } from 'src/app/service.service';
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-new-student-award',
  templateUrl: './add-new-student-award.component.html',
  styleUrls: ['./add-new-student-award.component.scss']
})
export class AddNewStudentAwardComponent implements OnInit {


  fileUpload = new FormData();
  uploads:any[] = [];
  committeeId : any = null;
  yearControl = new FormControl('', Validators.required);
  public add_new_recognition: FormArray = this.fb.array([]);
  public uploadData: FormData = new FormData();


  level: level [] = [
    {level: 'International', },
    {level: 'National', },
    {level: 'State', },
    {level: 'University', },
    {level: 'Local_body', },
    {level: 'NGO', },
  ];

  achievementNatures: any[] = [
    {value: 'Gold_medal',title: 'Gold medal'},
    {value: 'Silver_medal',title: 'Silver medal'},
    {value: 'Bronze_medal',title: 'Bronze medal'},
    {value: 'Certificate',title: 'Certificate'},
    {value: 'First_prize',title: 'First prize'},
    {value: 'Second_prize',title: 'Second prize'},
    {value: 'Third_prize',title: 'Third prize'},
    {value: 'Other',title: 'Other'}
  ];

  // level: level [] = [
  //   {value: 'International',title: 'International'},
  //   {value: 'National', title: 'National'},
  //   {value: 'State', title: 'State'},
  //   {value: 'University', title: 'University'},
  //   {value: 'Local_body', title: 'Local Body'},
  //   {value: 'NGO', title: 'NGO'},
  // ];
   Form: FormGroup;


  constructor(

    private fb: FormBuilder,
    private service: ServiceService,
    private dialogRef: MatDialogRef<AddNewStudentAwardComponent>,
    @Inject(MAT_DIALOG_DATA) public data : any
  ) {
    this.committeeId = data.committeeId;
    this.Form = this.fb.group({
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
      title: this.fb.control('',Validators.required),
      years:this.fb.control('',Validators.required),
      name_of_award:this.fb.control('',Validators.required),
      award_name:this.fb.control('',Validators.required),
      awarding_agency: this.fb.control('',Validators.required),
      //date:this.fb.control('',Validators.required),
      achievementLevel: this.fb.control('',Validators.required),
      achievementNature: this.fb.control('',Validators.required)
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
    console.log(event);
  }

  submitForm(){

    let fileName = null;

    let studentAchievementList: any[] = [];
    for(let i =0;i<this.add_new_recognition.length;i++){
      fileName = null;
      if(this.uploads[i] != undefined && this.uploads[i] != null ){
      let ext =  this.uploads[i]?.name.split('.').pop();
      fileName = uuidv4() + "." + ext;
      this.fileUpload.append("files", this.uploads[i], fileName)
    }

      studentAchievementList.push({
        title: this.add_new_recognition.at(i).get("title")?.value,
        year: this.add_new_recognition.at(i).get("years")?.value,
        nameOfStudent: this.add_new_recognition.at(i).get("name_of_award")?.value,
        awardName:this.add_new_recognition.at(i).get("award_name")?.value,
        awardingAgency: this.add_new_recognition.at(i).get("awarding_agency")?.value,
        achievementLevel: this.add_new_recognition.at(i).get("achievementLevel")?.value,
        achievementNature: this.add_new_recognition.at(i).get("achievementNature")?.value,
        studentCertificate: fileName
      });
    }
    console.log(studentAchievementList);

    this.service.postData("/student-achievement/bulk/committee/"+ this.committeeId, studentAchievementList).subscribe((res: any) => {
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
