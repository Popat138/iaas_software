import { Component, Inject,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ServiceService } from 'src/app/service.service';
import {v4 as uuidv4} from 'uuid';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-edit-resrearch-project-details',
  templateUrl: './edit-resrearch-project-details.component.html',
  styleUrls: ['./edit-resrearch-project-details.component.scss']
})
export class EditResrearchProjectDetailsComponent implements OnInit {

  fileUpload = new FormData();
  uploads:any = null;
  fileName: string = "";
  toggle=true;
  public Form: FormGroup;

  constructor(

    private fb: FormBuilder,
    public service: ServiceService,
    public dialogref: MatDialogRef<EditResrearchProjectDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data : any,
    private http: HttpClient,
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
    this.getData();
  }
  getData(
    ){
      console.log(this.data);
      this.Form.get("academicYear").setValue(this.data.academicYear);
      this.Form.get("projectType").setValue(this.data.projectType);
      this.Form.get("title").setValue(this.data.titleOfBook);
      this.Form.get("author").setValue(this.data.author);
      this.Form.get("publisher").setValue(this.data.publishers);
      this.Form.get("year_award").setValue(this.data.yearOfPublication);
      this.Form.get("edition").setValue(this.data.edition);
      this.Form.get("role").setValue(this.data.role);
      this.Form.get("agency").setValue(this.data.agencyType);
      this.http.get(`${this.service.BASE_URL}/resources/uploads/${this.data?.document}`,{responseType: 'blob'}).subscribe(data => {
        this.uploads = data;
        this.uploads.name = this.data?.document;
        this.fileName=this.uploads.name!=null?'Document exists':"";
      this.toggle=this.uploads.name!=null?(this.toggle):!this.toggle;
      });
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
        id:this.data.id,
        academicYear: this.Form.get("academicYear").value,
        projectType: this.Form.get("projectType").value,
        titleOfBook: this.Form.get("title").value,
        author: this.Form.get("author").value,
        publishers: this.Form.get("publisher").value,
        yearOfPublication: this.Form.get("year_award").value,
        edition: this.Form.get("edition").value,
        role: this.Form.get("role").value,
        agencyType: this.Form.get("agency").value,
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
