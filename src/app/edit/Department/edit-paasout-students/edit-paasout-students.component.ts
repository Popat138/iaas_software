import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { SelectResearchProgramListByDepartmentComponent } from 'src/app/common/select-research-program-list-by-department/select-research-program-list-by-department.component';
import { ServiceService } from 'src/app/service.service';
import { v4 as uuidv4 } from 'uuid';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-edit-paasout-students',
  templateUrl: './edit-paasout-students.component.html',
  styleUrls: ['./edit-paasout-students.component.scss']
})
export class EditPaasoutStudentsComponent implements OnInit {

  guides: any [] = [];
  program: any = null;
  fileUpload = new FormData();
  other_type : other_type[] = [
    {other_type: 'PhD', },
    {other_type: 'MPhil', },

  ]

  uploads:any = null;
  public Form: FormGroup;
  public other : FormArray = this.fb.array([]);
  constructor(
    private fb: FormBuilder,
    public service: ServiceService,
    @Inject(MAT_DIALOG_DATA)
    public data : any,
    public dialogRef: MatDialogRef<EditPaasoutStudentsComponent>,
    public dialog: MatDialog,
    private http: HttpClient,
  )
  {
    // this.userid = data.userid;
    this.Form = this.fb.group({
      other_type: this.fb.control('',Validators.required),
      name_of_prog: this.fb.control('',Validators.required),
      year: this.fb.control('',Validators.required),
      // other:this.fb.array([this.createother()]),
      name_of_student: this.fb.control('',Validators.required),
    category: this.fb.control('',Validators.required),
    name_of_guide: this.fb.control('',Validators.required),
    date_of_registration: this.fb.control('',Validators.required),
    title_of_topic: this.fb.control('',Validators.required),
    date_of_declaration: this.fb.control('',Validators.required),
    })
   }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    console.log(this.data);

    this.program = this.data.program;
    this.guides = this.data.guides;
    this.service.getData("/research-program/program/" + this.data.program.programId).subscribe((res: any) => {
      // this.programDetails = res;
      console.log("PPT",res);
      let guidesData = []
      res.forEach(element => {
        element.guides.forEach(element2 => {
          guidesData.push(element2);
        });
        // guidesData.concat(element.guides);
      });
      this.guides = guidesData;

    });
    this.service.getData("/admitted-research-declaration/guide/"+this.data.guide.id).subscribe((res2: any) => {
      console.log("PPTXXX",res2);
    });

    this.Form.get("name_of_prog").setValue(this.data.program.programName);
    this.Form.get("other_type").setValue(this.data.program.programLevel);
    this.Form.get("year").setValue(this.data.year);
    this.Form.get("name_of_student").setValue(this.data.studentName);
    this.Form.get("category").setValue(this.data.category);
    this.Form.get("name_of_guide").setValue(this.data.guide.id);
    this.Form.get("date_of_registration").setValue(this.data.registrationDate);
    this.Form.get("title_of_topic").setValue(this.data.topicTitle);
    this.Form.get("date_of_declaration").setValue(this.data.declarationDate);

    this.http.get(`${this.service.BASE_URL}/resources/uploads/${this.data.document}`,{responseType: 'blob'}).subscribe(data => {
      this.uploads = data;
      this.uploads.name = this.data.document;
  });
  }

  get otherControl() {
    this.other = this.Form.get('other') as FormArray;
    return this.other.controls;
  }

  createother(): FormGroup {
    return this.fb.group({
    name_of_student: this.fb.control('',Validators.required),
    category: this.fb.control('',Validators.required),
    name_of_guide: this.fb.control('',Validators.required),
    date_of_registration: this.fb.control('',Validators.required),
    title_of_topic: this.fb.control('',Validators.required),
    date_of_declaration: this.fb.control('',Validators.required),
  });
  }

  addother(): void {
    this.other = this.Form.get('other') as FormArray;
    this.other.push(this.createother());
  }

  removeother(i: number) {
    this.other.removeAt(i);
  }

  upload(event: any){
    this.uploads = event.target.files[0];
  }



  submitForm(){

    // let studentData: any[] = [];
    // for(let i = 0; i<this.other.length; i++) {

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
        studentName: this.Form.get("name_of_student")?.value,
        category: this.Form.get("category")?.value,
        registrationDate: this.Form.get("date_of_registration")?.value,
        topicTitle: this.Form.get("title_of_topic")?.value,
        declarationDate: this.Form.get("date_of_declaration")?.value,
        document: filename,
        // researchProgram: {
        //   id: this.data.guide.researchProgram.id
        // },
        guide: {
          id: this.Form.get("name_of_guide")?.value
        }
      };
    // }

      this.service.putData("/admitted-research-declaration", data).subscribe((res: any) => {
      console.log(res);
      if(this.fileUpload.getAll("files").length > 0){
        this.service.postData("/upload", this.fileUpload).subscribe(res2 => {
          console.log(res2);
        });
      }
      }, (err: any) => {

        console.log(err);
        console.warn("Error try again later!!");
                        },
        () => {
      this.dialogRef.close();
    })
}


getProgram() {

  this.service.getUserWithUserId().subscribe((user: any) => {
    // console.log(user.hod)
    const programDialogRef = this.dialog.open(SelectResearchProgramListByDepartmentComponent ,{width: "80%",height: "86vh",panelClass: 'full-width-dialog', data: {departmentId : user.hod.department.id}});
  programDialogRef.afterClosed().subscribe((result: any) => {
    console.log("PPPPPT",result);
    if(result != undefined) {
      this.guides = result.guides;
      this.program = result;
      this.Form.get("name_of_prog").setValue(result.programDetail.program.programName);
      this.Form.get("other_type").setValue(result.programDetail.program.programLevel);
      this.Form.get("year").setValue(result.year);
      
      // this.service.getData("/program-detail/program/" + result.programId).subscribe((res: any) => {
      //   this.programDetails = res;
      //   console.log(res);
      // })
      this.service.getData("/research-program/program/" + result.programId).subscribe((res: any) => {
        // this.programDetails = res;
        console.log(res);
        let guidesData = []
        res.forEach(element => {
          element.guides.forEach(element2 => {
            guidesData.push(element2);
          });
          // guidesData.concat(element.guides);
        });
        this.guides = guidesData;

      })
      
    }
  })
  });

  
}

}

interface other_type {
  other_type: String;
 }

