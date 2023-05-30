import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ServiceService } from 'src/app/service.service';
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-new-research-projects',
  templateUrl: './add-new-research-projects.component.html',
  styleUrls: ['./add-new-research-projects.component.scss']
})
export class AddNewResearchProjectsComponent implements OnInit {
  fileUpload = new FormData();
  uploads:any = null;
  fileName: string = "";
  user:any=null;
  toggle=true;
  public Form: FormGroup;
  constructor(

    private fb: FormBuilder,
    public service: ServiceService,
    public dialogref: MatDialogRef<AddNewResearchProjectsComponent>
  ) {
    this.Form = this.fb.group({
      academicYear: this.fb.control('',Validators.required),
      projectType: this.fb.control('',Validators.required),
      title: this.fb.control('',Validators.required),
      author: this.fb.control('',Validators.required),
      publisher: this.fb.control('',Validators.required),
      year_award: this.fb.control('',Validators.required),
      edition: this.fb.control('',Validators.required),
      role: this.fb.control('',Validators.required),
      agency: this.fb.control('',Validators.required),
      // com_any:this.fb.control(''),
    })
   }

   
    year: Year[] = [
    {year: '2018-2019', },
    {year: '2019-2020', },
    {year: '2020-2021', },
    {year: '2021-2022', },
  ];

  types: any[] = [
    {value: 'Research_Article', title: 'Reference book', },
    {value: 'Review_Article', title: 'Text book', },
    {value: 'Review_Article', title: 'Edited book', }
  ];

  roles: any[] = [
    {value: 'Principal Investigator', },
    {value: 'Co-investigator', },
    {value: 'Advisor', },
    
  ];
  projects: any[] = [
    {value: 'Major', },
    {value: 'Minor', },
    {value: 'Other', },
  ];

  agencys: any[] = [
    {title: 'Government',value:'Government' },
    {title: 'Non-government',value:'NonGovernment' },
    {title: 'Parent Institute',value:'ParentInstitute' },
  ];


  ngOnInit(): void {
    this.service.getUserWithUserId().subscribe((user: any) => {
      this.user = user;
    }, (err: any) => {
      console.log("Error try again later");
    })
  }

submitForm(){

    let ext =  this.uploads?.name.split('.').pop();
    let filename: any = null;
    if(this.uploads != undefined && this.uploads != null ) {
      filename = uuidv4() + "." + ext
      this.fileUpload.append("files", this.uploads, filename)
    } else {
      console.log(`Document not provided.`);
    }

    let data = {

      academicYear: this.Form.get("academicYear").value,
      projectType: this.Form.get("projectType").value,
      titleOfBook: this.Form.get("title").value,
      author: this.Form.get("author").value,
      publishers: this.Form.get("publisher").value,
      yearOfPublication: this.Form.get("year_award").value,
      edition: this.Form.get("edition").value,
      role: this.Form.get("role").value,
      agencyType: this.Form.get("agency").value,
      // comment:"Submitted by  " +this.user.firstName + "  " + this.user.lastName,
      document: filename

    };

    this.service.getUserWithUserId().subscribe((user: any) => {
      this.service.postData("/research-project/teacher/" + user.teacher.teacherId , data).subscribe((res2: any) => {
        if(this.fileUpload.getAll("files").length > 0){
          this.service.postData("/upload", this.fileUpload).subscribe(res2 => {
            // this.dialogref.close();
          });
        }
        this.dialogref.close();
      }, (err2 : any) => {
        alert("Error try again later!!");
        this.dialogref.close();
      });
    }, (err: any) => {
      console.warn(err);
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

  upload(event: any){
    this.uploads = event.target.files[0];
    this.fileName=event.target.files[0].name;
    this.toggle = !this.toggle;
  }

}
interface Year {
  year: String;
}
