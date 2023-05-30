import { HttpClient } from '@angular/common/http';
import { Component, OnInit,Inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceService } from 'src/app/service.service';
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-edit-award',
  templateUrl: './edit-award.component.html',
  styleUrls: ['./edit-award.component.scss']
})
export class EditAwardComponent implements OnInit {

  deptid : any = null;
  yearControl = new FormControl('', Validators.required);
  public add_new_recognition: FormArray = this.fb.array([]);


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
  fileUpload = new FormData();
  uploads:any = null;
  department : any = null;
   assignedCategoryData: any;
   assignedUserData:any;
   file:any;
   public Form: FormGroup;
   public uploadData: FormData = new FormData();

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditAwardComponent>,
    private service: ServiceService,
    private http: HttpClient,
   @Inject(MAT_DIALOG_DATA) public data : any,
  ) {
    this.department = data;
    console.log(this.department.id);
    // this.deptid = data.deptid;
    this.Form = this.fb.group({
      years:this.fb.control('',Validators.required),
      name_of_award:this.fb.control('',Validators.required),
      awarding_agency: this.fb.control('',Validators.required),
      name_of_student:this.fb.control('',Validators.required),
      achievementLevel : this.fb.control('',Validators.required),
      achievementNature: this.fb.control('',Validators.required)

    })
   }

  ngOnInit(): void {

    this.getData();
  }

  getData() {
    console.log(this.data);
    this.Form.get("years").setValue(this.data.year);
    this.Form.get("name_of_award").setValue(this.data.nameOfAward);
    this.Form.get("awarding_agency").setValue(this.data.awardingAgency);
    this.Form.get("name_of_student").setValue(this.data.nameOfStudent);
    this.Form.get("achievementLevel").setValue(this.data.achievementLevel);
    this.Form.get("achievementNature").setValue(this.data.achievementNature);

    this.http.get(`${this.service.BASE_URL}/resources/uploads/${this.data.achievementCertificate}`,{responseType: 'blob'}).subscribe(data => {
      this.uploads = data;
      this.uploads.name = this.data.achievementCertificate;
    });
  }


  get add_new_recognitionControl() {
    this.add_new_recognition = this.Form.get('add_new_recognition') as FormArray;
    return this.add_new_recognition.controls;
  }

  upload(event: any){
    this.uploads = event.target.files[0];
  }

  createadd_new_recognition(): FormGroup {
    return this.fb.group({

      years:this.fb.control('',Validators.required),
      name_of_award:this.fb.control('',Validators.required),
      awarding_agency: this.fb.control('',Validators.required),
      name_of_student:this.fb.control('',Validators.required),
      achievementLevel : this.fb.control('',Validators.required),
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


  submitForm(){

    Swal.fire({
      title: 'Do u wish to continue ?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {

        // let data :any[] = [];
        // for(let i =0;i<this.add_new_recognition.length;i++){

        this.service.getUserWithUserId().subscribe((user: any) => {
          let ext =  this.uploads?.name.split('.').pop();
          let filename: any = null;
          if(this.uploads != undefined && this.uploads != null ) {
            filename = uuidv4() + "." + ext
            this.fileUpload.append("files", this.uploads, filename)
          } else {
            console.log(`document not provided.`);
          }


          let data = {
            id: this.data.id,
            year: this.Form.get("years")?.value,
            nameOfAward: this.Form.get("name_of_award")?.value,
            awardingAgency: this.Form.get("awarding_agency")?.value,
            nameOfStudent:this.Form.get("name_of_student")?.value,
            achievementLevel: this.Form.get("achievementLevel")?.value,
            achievementNature: this.Form.get("achievementNature")?.value,
            achievementCertificate:filename,
            department: {
              id: user.hod.department.id
            }
          }; 

          console.log(data);
        this.service.putData("/achievement/", data).subscribe((res: any) => {

          if(this.fileUpload.getAll("files").length > 0){
            this.service.postData("/upload", this.fileUpload).subscribe(res2 => {
              console.log(res2);
            });
          }
          this.dialogRef.close();
        }, (err: any) => {
          console.warn("Error try again later!!");
        }, () => {
          this.dialogRef.close();
        })
        }, (err: any) => {
          console.log(err);
        });

}
});

  }

}
interface level {
  level: string;
}
