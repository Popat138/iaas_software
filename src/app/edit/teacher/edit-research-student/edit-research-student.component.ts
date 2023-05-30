import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ServiceService } from 'src/app/service.service';
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-research-student',
  templateUrl: './edit-research-student.component.html',
  styleUrls: ['./edit-research-student.component.scss']
})
export class EditResearchStudentComponent implements OnInit {

  fileUpload = new FormData();
  registeredDocuments:any[] = [];
  declaredDocuments:any[] = [];
  fileName1: any[] = [];
  toggle1:any[]=[];
  fileName2: any[] = [];
  toggle2:any[]=[];
  public Form: FormGroup;
  public other : FormArray = this.fb.array([]);
  public declaration : FormArray = this.fb.array([]);
  constructor(
    private fb: FormBuilder,
    public service: ServiceService,
    @Inject(MAT_DIALOG_DATA) public data : any,
    public dialogRef: MatDialogRef<EditResearchStudentComponent>,
    private http: HttpClient,
  )
  {

    this.Form = this.fb.group({
      year: this.fb.control('',Validators.required),

     // month: this.fb.control('',Validators.required),
      other:this.fb.array([]),
      declaration:this.fb.array([]),
    })
   }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    console.log(this.data);
    this.Form.get("year").setValue(this.data?.academicYear);

    
    this.other = this.Form.get('other') as FormArray;
    this.data.phdRegisteredStudents.forEach((student, index) => {
      this.other.push(
        this.fb.group({
          id: this.fb.control(student.id),
          name: this.fb.control(student.studentName,Validators.required),
          date_of_registration: this.fb.control(student.registrationDate,Validators.required),
          title: this.fb.control(student.title,Validators.required),
          research_center: this.fb.control(student.researchCentre,Validators.required)
        })
      );

      this.http.get(`${this.service.BASE_URL}/resources/uploads/${student.certificate}`,{responseType: 'blob'}).subscribe(data => {
        this.registeredDocuments[index] = data;
        this.registeredDocuments[index].name = student.certificate;
        this.fileName1[index]= this.registeredDocuments[index].name!=null?'Document exists':"";
        this.toggle1[index]= this.registeredDocuments[index].name!=null?(this.toggle1[index]):!this.toggle1[index];
      });
    });

    
  this.declaration = this.Form.get('declaration') as FormArray;

    this.data.phdDeclarations.forEach((student, index) => {
      this.declaration.push(
        this.fb.group({
          id: this.fb.control(student.id),
          name: this.fb.control(student.studentName,Validators.required),
          date_of_registration: this.fb.control(student.registrationDate,Validators.required),
          date_of_declaration: this.fb.control(student.dateOfDeclaration,Validators.required),
          title: this.fb.control(student.title,Validators.required),
          research_center: this.fb.control(student.researchCentre,Validators.required),
        })
      );

      
      this.http.get(`${this.service.BASE_URL}/resources/uploads/${student.certificate}`,{responseType: 'blob'}).subscribe(data => {
        this.declaredDocuments[index] = data;
        this.declaredDocuments[index].name = student.certificate;
        this.fileName2[index]= this.declaredDocuments[index].name!=null?'Document exists':"";
        this.toggle2[index]= this.declaredDocuments[index].name!=null?(this.toggle2[index]):!this.toggle2[index];
      });
    });
  }

  get otherControl() {
    this.other = this.Form.get('other') as FormArray;
    return this.other.controls;
  }

  createother(): FormGroup {
    return this.fb.group({
      id: this.fb.control(''),
    name: this.fb.control('',Validators.required),
    date_of_registration: this.fb.control('',Validators.required),
    title: this.fb.control('',Validators.required),
    research_center: this.fb.control('',Validators.required),

   // assignments: this.fb.control('',Validators.required),
   // mode_of_teaching: this.fb.control('',Validators.required),


  });
  }

  reportUpload1(event: any, i: number){
    this.registeredDocuments[i] = event.target.files[0];
    this.fileName1[i]=event.target.files[0].name;
    this.toggle1[i] = !this.toggle1[i];
  }

  addother(): void {
    this.other = this.Form.get('other') as FormArray;
    this.other.push(this.createother());
  }

  removeother(i: number) {
    this.other.removeAt(i);
    this.registeredDocuments.splice(i,1);
  }

//////////////////////////////////////////////////////////////////////////////////////////////////////////


get declarationControl() {
  this.declaration = this.Form.get('declaration') as FormArray;
  return this.declaration.controls;
}

createdeclaration(): FormGroup {
  return this.fb.group({
    id: this.fb.control(''),
    name: this.fb.control('',Validators.required),
    date_of_registration: this.fb.control('',Validators.required),
    date_of_declaration: this.fb.control('',Validators.required),
    title: this.fb.control('',Validators.required),
    research_center: this.fb.control('',Validators.required),

 // assignments: this.fb.control('',Validators.required),
 // mode_of_teaching: this.fb.control('',Validators.required),


});
}

reportUpload2(event: any, i: number){
  this.declaredDocuments[i] = event.target.files[0];
  this.fileName2[i]=event.target.files[0].name;
    this.toggle2[i] = !this.toggle2[i];
  }

adddeclaration(): void {
  this.declaration = this.Form.get('declaration') as FormArray;
  this.declaration.push(this.createdeclaration());
}

removedeclaration(i: number) {
  this.declaration.removeAt(i);
  this.declaredDocuments.splice(i,1);
}




  submitForm(){

    let phdRegisteredStudents: any[] = [];
    let phdDeclaredStudents: any[] =[];

    for (let i = 0; i< this.other.length; i++) {

      let registeredDocumentExt =  this.registeredDocuments[i]?.name.split('.').pop();
      let registeredDocumentFilename: any = null;
      if(this.registeredDocuments[i] != undefined && this.registeredDocuments[i] != null ) {
        registeredDocumentFilename = uuidv4() + "." + registeredDocumentExt
        this.fileUpload.append("files", this.registeredDocuments[i], registeredDocumentFilename)
      } else {
        console.log(`At index ${i} document not provided.`);
      }

      phdRegisteredStudents.push({
        id: this.other.at(i).get("id").value,
        studentName: this.other.at(i).get("name").value,
        title: this.other.at(i).get("title").value,
        registrationDate: this.other.at(i).get("date_of_registration").value,
        researchCentre: this.other.at(i).get("research_center").value,
        certificate: registeredDocumentFilename
      });
    }

    for (let i = 0; i< this.declaration.length; i++) {

      let declaredDocumentExt =  this.declaredDocuments[i]?.name.split('.').pop();
      let declaredDocumentFilename: any = null;
      if(this.declaredDocuments[i] != undefined && this.declaredDocuments[i] != null ) {
        declaredDocumentFilename = uuidv4() + "." + declaredDocumentExt
        this.fileUpload.append("files", this.declaredDocuments[i], declaredDocumentFilename)
      } else {
        console.log(`At index ${i} document not provided.`);
      }

      phdDeclaredStudents.push({
        id: this.other.at(i).get("id").value,
        studentName: this.declaration.at(i).get("name").value,
        title: this.declaration.at(i).get("title").value,
        registrationDate: this.declaration.at(i).get("date_of_registration").value,
        dateOfDeclaration: this.declaration.at(i).get("date_of_declaration").value,
        researchCentre: this.declaration.at(i).get("research_center").value,
        certificate: declaredDocumentFilename
      });
    }

  let data : any = {

    id: this.data.id,
    academicYear: this.Form.get("year")?.value,
    phdRegisteredStudents: phdRegisteredStudents,
    phdDeclarations: phdDeclaredStudents,
    user: {
      userId: localStorage.getItem("userId")
    }
    // year:this.Form.get("")?.value,

  }

  this.service.putData("/research-student", data).subscribe((res: any) => {
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

interface other_type {
  other_type: String;
 }


