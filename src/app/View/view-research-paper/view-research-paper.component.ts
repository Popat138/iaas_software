import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceService } from 'src/app/service.service';

@Component({
  selector: 'app-view-research-paper',
  templateUrl: './view-research-paper.component.html',
  styleUrls: ['./view-research-paper.component.scss']
})
export class ViewResearchPaperComponent implements OnInit {

  public Form: FormGroup;
  constructor(

    private fb: FormBuilder,
    public service: ServiceService,
    public dialogref: MatDialogRef<ViewResearchPaperComponent>,
    @Inject(MAT_DIALOG_DATA) public data : any,
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
      link: this.fb.control('',Validators.required)
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
    this.fetchData();
  }

  fetchData() {

    console.log(this.data);
    this.Form.get("academicYear").setValue(this.data?.academicYear);
    this.Form.get("type").setValue(this.data?.researchPublicationType);
    this.Form.get("title").setValue(this.data?.titleOfPaper);
    this.Form.get("author").setValue(this.data?.author);
    this.Form.get("journalName").setValue(this.data?.journalName);
    this.Form.get("volume").setValue(this.data?.volume);
    this.Form.get("issue").setValue(this.data?.issue);
    this.Form.get("page").setValue(this.data?.pageNo);
    this.Form.get("year").setValue(this.data?.year);
    this.Form.get("issn").setValue(this.data?.issnNo);
    this.Form.get("approved").setValue(this.data?.approvedByUGS);
    this.Form.get("role").setValue(this.data?.role);
  }

}

interface Year {
  year: String;
}
