import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceService } from 'src/app/service.service';
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-edit-faculty-development-program',
  templateUrl: './edit-faculty-development-program.component.html',
  styleUrls: ['./edit-faculty-development-program.component.scss']
})
export class EditFacultyDevelopmentProgramComponent implements OnInit {

  fileUpload = new FormData();
  uploads:any = null;
  fileName: string = "";
  toggle=true;
  public Form: FormGroup;
  constructor(

    private fb: FormBuilder,
    public service: ServiceService,
    public dialogref: MatDialogRef<EditFacultyDevelopmentProgramComponent>,
    @Inject(MAT_DIALOG_DATA) public data : any,
    private http: HttpClient,
  ) {

    this.Form = this.fb.group({

      academicYear: this.fb.control('',Validators.required),
      // f_name:this.fb.control('',Validators.required),
      // m_name: this.fb.control('',Validators.required),
      // l_name : this.fb.control('',Validators.required),
      type: this.fb.control('',Validators.required),
      title_of_conf: this.fb.control('',Validators.required),
      place: this.fb.control('',Validators.required),
      s_date: this.fb.control('',Validators.required),
      e_date: this.fb.control('',Validators.required)
    })

   }

   year: Year[] = [
    {year: '2018-2019', },
    {year: '2019-2020', },
    {year: '2020-2021', },
    {year: '2021-2022', },
  ];

  level: Level[] = [
    {level: 'University', },
    {level: 'State', },
    {level: 'National', },
    {level: 'International', },
  ];


  types: any[] = [
    {value: 'Refresher_Course', title: 'Refresher Course', },
    {value: 'Orientation_Course', title: 'Orientation Course', },
    {value: 'Training_programme', title: 'Training programme', },
    {value: 'Faculty_Development', title: 'Faculty Development', }
  ];

  roles: Value[] = [
    {value: 'person', },
    {value: 'participant', },
  ];



  ngOnInit(): void {
    this.getData();
  }
  
  getData() {
    console.log(this.data);
    this.Form.get("academicYear").setValue(this.data.academicYear);
    this.Form.get("type").setValue(this.data.facultyProgramType);
    // this.Form.get("f_name").setValue(this.data.firstName);
    // this.Form.get("m_name").setValue(this.data.middleName);
    // this.Form.get("l_name").setValue(this.data.lastName);
    this.Form.get("title_of_conf").setValue(this.data.titleOfCourse);
    this.Form.get("place").setValue(this.data.placeOfCourse);
    this.Form.get("s_date").setValue(this.data.startDate);
    this.Form.get("e_date").setValue(this.data.endDate);

    this.http.get(`${this.service.BASE_URL}/resources/uploads/${this.data?.document}`,{responseType: 'blob'}).subscribe(data => {
      this.uploads = data;
      this.uploads.name = this.data?.document;
      this.fileName=this.uploads.name!=null?'Document exists':"";
      this.toggle=this.uploads.name!=null?(this.toggle):!this.toggle;
    });
    }

  upload(event: any){
    this.uploads = event.target.files[0];
    this.fileName=event.target.files[0].name;
    this.toggle = !this.toggle;
  }

  submitForm(){

    let ext =  this.uploads?.name.split('.').pop();
    let filename: any = null;
    if(this.uploads != undefined && this.uploads != null ) {
      filename = uuidv4() + "." + ext
      this.fileUpload.append("files", this.uploads, filename)
    } else {
      console.log(this.data?.document);
    }


    let data = {
      id: this.data.id,
      academicYear: this.Form.get("academicYear").value,
      facultyProgramType: this.Form.get("type").value,
      // firstName: this.Form.get("f_name").value,
      // middleName:this.Form.get("m_name").value,
      // lastName:this.Form.get("l_name").value,
      titleOfCourse: this.Form.get("title_of_conf").value,
      placeOfCourse: this.Form.get("place").value,
      startDate: this.Form.get("s_date").value,
      endDate: this.Form.get("e_date").value,
      document: filename

    };

    this.service.getUserWithUserId().subscribe((user: any) => {
      this.service.putData("/faculty-program/teacher/" + user.teacher.teacherId, data).subscribe((res2: any) => {
        if(this.fileUpload.getAll("files").length > 0){
          this.service.postData("/upload", this.fileUpload).subscribe(res2 => {
            this.dialogref.close();
          });
        } else {
          this.dialogref.close();
        }
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

interface Level {
  level: String;
}

interface Value {
  value: String;
}
