import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ServiceService } from 'src/app/service.service';
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-book-published',
  templateUrl: './add-book-published.component.html',
  styleUrls: ['./add-book-published.component.scss']
})
export class AddBookPublishedComponent implements OnInit {

  fileUpload = new FormData();
  uploads:any = null;
  fileName: string = "";
  toggle=true;
  public Form: FormGroup;
  constructor(

    private fb: FormBuilder,
    public service: ServiceService,
    public dialogref: MatDialogRef<AddBookPublishedComponent>
  ) {

    this.Form = this.fb.group({
      academicYear: this.fb.control('',Validators.required),
      type: this.fb.control('',Validators.required),
      title: this.fb.control(''),
      author: this.fb.control('',Validators.required),
      publisher: this.fb.control('',Validators.required),
      year: this.fb.control('',Validators.required),
      edition: this.fb.control('',Validators.required),
      role: this.fb.control('',Validators.required),
      publication: this.fb.control(''),
      titleOfPaper: this.fb.control(''),
      titleOfproceedings: this.fb.control(''),
      nameOfconference: this.fb.control(''),
      AffiliatingInstitute: this.fb.control(''),
    })

   }

   year: Year[] = [
    {year: '2018-2019', },
    {year: '2019-2020', },
    {year: '2020-2021', },
    {year: '2021-2022', },
  ];

  types: any[] = [
    {value: 'Reference_Book', title: 'Reference book', },
    {value: 'Text_Book', title: 'Text book', },
    {value: 'Chapter', title: 'Chapter', },
    {value: 'Proceeding', title: 'Proceeding', },
  ];

  roles: any[] = [
    {value: 'First Author', },
    {value: 'C-author', },
    {value: 'Editor', },
    {value: 'Author', }
  ];

  publications: any[] = [
    {value: 'Local', },
    {value: 'National', },
    {value: 'International', },
  ];

  ngOnInit(): void {
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
      bookType: this.Form.get("type").value,
      titleOfBook: this.Form.get("title").value,
      author: this.Form.get("author").value,
      publishers: this.Form.get("publisher").value,
      yearOfPublication: this.Form.get("year").value,
      edition: this.Form.get("edition").value,
      role: this.Form.get("role").value,
      publicationType: this.Form.get("publication").value,
      procTitle: this.Form.get("titleOfproceedings").value,
      procPaper: this.Form.get("titleOfPaper").value,
      procConference: this.Form.get("nameOfconference").value,
      afflInstitute: this.Form.get("AffiliatingInstitute").value,



      document: filename

    };

    this.service.getUserWithUserId().subscribe((user: any) => {
      this.service.postData("/book-publication/teacher/" + user.teacher.teacherId , data).subscribe((res2: any) => {
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
