import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ServiceService } from 'src/app/service.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-research-papers',
  templateUrl: './add-research-papers.component.html',
  styleUrls: ['./add-research-papers.component.scss']
})
export class AddResearchPapersComponent implements OnInit {

  public Form: FormGroup;
  constructor(

    private fb: FormBuilder,
    public service: ServiceService,
    public dialogref: MatDialogRef<AddResearchPapersComponent>
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
  }

  submitForm(){

    let data = {
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
