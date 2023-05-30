import { HttpClient } from '@angular/common/http';
import { Component,Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceService } from 'src/app/service.service';
import {v4 as uuidv4} from 'uuid';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-edit-research-papers',
  templateUrl: './edit-research-papers.component.html',
  styleUrls: ['./edit-research-papers.component.scss']
})
export class EditResearchPapersComponent implements OnInit {
  public Form: FormGroup;
  constructor(
    private fb: FormBuilder,
    public service: ServiceService,
    public dialogref: MatDialogRef<EditResearchPapersComponent>,
    @Inject(MAT_DIALOG_DATA) public data : any,
    private http: HttpClient,
  ) { 
    this.Form = this.fb.group({
    academicYear: this.fb.control('',Validators.required),
    type: this.fb.control('',Validators.required),
    title: this.fb.control('',Validators.required),
    author: this.fb.control('',Validators.required),
    journalName: this.fb.control('',Validators.required),
    volume: this.fb.control('',Validators.required),
    issue: this.fb.control('',Validators.required),
    page: this.fb.control('',Validators.required),
    year: this.fb.control('',Validators.required),
    issn: this.fb.control('',Validators.required),
    approved: this.fb.control('',Validators.required),
    role: this.fb.control('',Validators.required),
    link: this.fb.control('')
  })

   }

   year: Year[] = [
    {year: '2018-2019', },
    {year: '2019-2020', },
    {year: '2020-2021', },
    {year: '2021-2022', },
  ];

  types: any[] = [
    {value: 'Research_Article', title: 'Research Article', },
    {value: 'Review_Article', title: 'Review Article', }
  ];

  roles: any[] = [
    {value: 'First Author', },
    {value: 'C-author', },
    {value: 'Editor', },
    {value: 'Author', }
  ];
  ngOnInit(): void {
    this.getData();
  }
 getData(){
   console.log(this.data);
  this.Form.get("academicYear").setValue(this.data.academicYear);
  this.Form.get("type").setValue(this.data.researchPublicationType);
  this.Form.get("title").setValue(this.data.titleOfPaper);
  this.Form.get("author").setValue(this.data.author);
  this.Form.get("journalName").setValue(this.data.journalName);
  this.Form.get("volume").setValue(this.data.volume);
  this.Form.get("issue").setValue(this.data.issue);
  this.Form.get("page").setValue(this.data.pageNo);
  this.Form.get("year").setValue(this.data.year);
  this.Form.get("issn").setValue(this.data.issnNo);
  this.Form.get("approved").setValue(this.data.approvedByUGS);
  this.Form.get("role").setValue(this.data.role);
  this.Form.get("link").setValue(this.data.linkOfResearchPaper);
 }

 submitForm(){

  let data = {
    id:this.data.id,
    academicYear: this.Form.get("academicYear").value,
    researchPublicationType: this.Form.get("type").value,
    titleOfPaper: this.Form.get("title").value,
    author: this.Form.get("author").value,
    journalName: this.Form.get("journalName").value,
    volume: this.Form.get("volume").value,
    issue: this.Form.get("issue").value,
    pageNo: this.Form.get("page").value,
    year: this.Form.get("year").value,
    issnNo: this.Form.get("issn").value,
    approvedByUGS: this.Form.get("approved").value,
    role: this.Form.get("role").value,
    linkOfResearchPaper: this.Form.get("link").value,
  };

  this.service.getUserWithUserId().subscribe((user: any) => {
    this.service.postData("/research-publication/teacher/" + user.teacher.teacherId , data).subscribe((res2: any) => {
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

}
interface Year {
  year: String;
}