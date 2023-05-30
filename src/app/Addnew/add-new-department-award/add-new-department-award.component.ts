import { HttpClient } from '@angular/common/http';
import { Component, OnInit,Inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceService } from 'src/app/service.service';
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-add-new-department-award',
  templateUrl: './add-new-department-award.component.html',
  styleUrls: ['./add-new-department-award.component.scss']
})
export class AddNewDepartmentAwardComponent implements OnInit {

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

  year: any[] = [
    {year: '2018-2019', },
    {year: '2019-2020', },
    {year: '2020-2021', },
    {year: '2021-2022', },
  ];
  
  fileUpload = new FormData();
  uploads:any[] = [];
  department : any = null;
   assignedCategoryData: any;
   assignedUserData:any;
   file:any;
   public Form: FormGroup;
   public uploadData: FormData = new FormData();

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddNewDepartmentAwardComponent>,
    private service: ServiceService,
    private http: HttpClient,
   @Inject(MAT_DIALOG_DATA) public data : any,
  ) {
    this.department = data;
    console.log(this.department.id);
    // this.deptid = data.deptid;
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

  upload(event: any, i: number){
    this.uploads[i] = event.target.files[0];
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

        let data :any[] = [];
        for(let i =0;i<this.add_new_recognition.length;i++){

          let ext =  this.uploads[i]?.name.split('.').pop();
          let filename: any = null;
          if(this.uploads[i] != undefined && this.uploads[i] != null ) {
            filename = uuidv4() + "." + ext
            this.fileUpload.append("files", this.uploads[i], filename)
          } else {
            console.log(`At index ${i} document not provided.`);
          }


          data.push({
            year: this.add_new_recognition.at(i).get("years")?.value,
            nameOfAward: this.add_new_recognition.at(i).get("name_of_award")?.value,
            awardingAgency: this.add_new_recognition.at(i).get("awarding_agency")?.value,
            nameOfStudent:this.add_new_recognition.at(i).get("name_of_student")?.value,
            achievementLevel: this.add_new_recognition.at(i).get("achievementLevel")?.value,
            achievementNature: this.add_new_recognition.at(i).get("achievementNature")?.value,
            achievementCertificate:filename
          }); }

        // let data = {
        //   achievements: achievementList
        // }

        // console.log(data);
      //  this.department = achievementList;
        console.log(this.department.id);
        this.service.postData("/achievement/bulk/department/"+ this.department.id, data).subscribe((res: any) => {

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
        // this.service.postData("/achievement/department/"+ this.deptid, achievementList).subscribe((res: any) => {
        //   console.log(res);
        // }, (err: any) => {
        //   console.warn("Error try again later!!");
        // }, () => {
        //    this.dialogRef.close();
        // });

      // this.uploadData.append("upload", this.file, this.file.name);
      // this.uploadData.append("years", this.Form.get("years").value);
      // this.uploadData.append("name_of_award", this.Form.get("name_of_award").value);
      // this.uploadData.append("awarding_agency", this.Form.get("awarding_agency").value);
      // this.uploadData.append("level", this.Form.get("level").value);

    //   // console.log(data);

    // this.service.postAllData(this.uploadData,'/product').subscribe(response => {
    //   if(this.assignedUserData != undefined)
    //   {
    //     this.assignedUserData.product_id = response['id'];
    //     this.service.postAllData(this.assignedUserData,'/user-product/bulkByProduct').subscribe(res1 => {

    //       if(this.assignedCategoryData != undefined){
    //         this.assignedCategoryData.product_id = response['id'];
    //         this.service.postAllData(this.assignedCategoryData,'/product-category/bulkByProduct').subscribe(res2 => {
    //             this.dialogRef.close();
    //             location.reload();
    //         });
    //       }

    //     });
    //   }else if(this.assignedCategoryData != undefined){
    //     this.assignedCategoryData.product_id = response['id'];
    //     this.service.postAllData(this.assignedCategoryData,'/product-category/bulkByProduct').subscribe(res2 => {
    //         this.dialogRef.close();
    //         location.reload();
    //     });
    //   }else{
    //     this.dialogRef.close();
    //     location.reload();
    //   }

    // });
}
});

  }

}
interface level {
  level: string;
}
interface Year {
  year: String;
}