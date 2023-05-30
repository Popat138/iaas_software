import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { SelectResearchProgramListByDepartmentComponent } from 'src/app/common/select-research-program-list-by-department/select-research-program-list-by-department.component';
import { SelectResearchProgramByDepartmentIdComponent } from 'src/app/common/select-research-program-by-department-id/select-research-program-by-department-id.component';
import { ServiceService } from 'src/app/service.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-add-pass-out-students',
  templateUrl: './add-pass-out-students.component.html',
  styleUrls: ['./add-pass-out-students.component.scss']
})
export class AddPassOutStudentsComponent implements OnInit {

  guides: any [] = [];
  program: any = null;
  fileUpload = new FormData();
  other_type : other_type[] = [
    {other_type: 'PhD', },
    {other_type: 'MPhil', },

  ]

  uploads:any[] = [];
  public Form: FormGroup;
  public other : FormArray = this.fb.array([]);
  constructor(
    private fb: FormBuilder,
    public service: ServiceService,
    @Inject(MAT_DIALOG_DATA)
    public data : any,
    public dialogRef: MatDialogRef<AddPassOutStudentsComponent>,
    public dialog: MatDialog,
  )
  {
    // this.userid = data.userid;
    this.Form = this.fb.group({
      other_type: this.fb.control('',Validators.required),
      name_of_prog: this.fb.control('',Validators.required),
      year: this.fb.control('',Validators.required),
      other:this.fb.array([this.createother()]),
    })
   }

  ngOnInit(
    
  ): void {
    // this.getGuide();
    console.log("GUIDES",this.guides);
  }

  get otherControl() {
    this.other = this.Form.get('other') as FormArray;
    return this.other.controls;
  }

  createother(): FormGroup {
    return this.fb.group({
    name_of_student: this.fb.control('',Validators.required),
    // year:this.fb.control('',Validators.required),
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

  upload(event: any, i: number){
    this.uploads[i] = event.target.files[0];
  }

getGuide(){
  this.service.getUserWithUserId().subscribe((user: any) => {
    console.log("USER",user);
  this.service.getData("/research-program/department/" +user.hod.department.id).subscribe((res: any) => {
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
  
});
 
}

  submitForm(){

    let studentData: any[] = [];
    for(let i = 0; i<this.other.length; i++) {

      let ext =  this.uploads[i]?.name.split('.').pop();
      let filename: any = null;
      if(this.uploads[i] != undefined && this.uploads[i] != null ) {
        filename = uuidv4() + "." + ext
        this.fileUpload.append("files", this.uploads[i], filename)
      } else {
        console.log(`At index ${i} document not provided.`);
      }

      studentData.push({
        studentName: this.other.at(i).get("name_of_student")?.value,
        // year:this.other.at(i).get("year")?.value,
        year: this.Form.get("year").value,
        category: this.other.at(i).get("category")?.value,
        registrationDate: this.other.at(i).get("date_of_registration")?.value,
        topicTitle: this.other.at(i).get("title_of_topic")?.value,
        declarationDate: this.other.at(i).get("date_of_declaration")?.value,
        document: filename,
        
        guide: {
          id: this.other.at(i).get("name_of_guide")?.value?.id
        },
       
      });
    }

    console.log("form Submit",studentData)

      this.service.postData("/admitted-research-declaration/bulk/program/" + this.program.programId, studentData).subscribe((res: any) => {
      console.log("Submitted",res);
      if(this.fileUpload.getAll("files").length > 0){
        this.service.postData("/upload", this.fileUpload).subscribe(res2 => {
          console.log(res2);
        });
      }
      }, (err: any) => {

        console.warn("Error try again later!!");
                        },
        () => {
      this.dialogRef.close();
    })
}


getProgram() {

  this.service.getUserWithUserId().subscribe((user: any) => {
    // console.log(user.hod)
    const programDialogRef = this.dialog.open(SelectResearchProgramByDepartmentIdComponent ,{width: "80%",height: "86vh",panelClass: 'full-width-dialog', data: {departmentId : user.hod.department.id}});
  programDialogRef.afterClosed().subscribe((result: any) => {
    console.log("RESULT",result.programDetail);
    if(result != undefined) {
     // this.guides = result.guides;
      this.program = result;
      this.Form.get("name_of_prog").setValue(result.programName);
      this.Form.get("other_type").setValue(result.programLevel);
      // this.Form.get("year").setValue(result.year);
      
      // this.service.getData("/program-detail/program/" + result.programId).subscribe((res: any) => {
      //   this.programDetails = res;
      //   console.log(res);
      // })
      this.service.getData("/research-program/program/" + result.programId).subscribe((res: any) => {
        // this.programDetails = res;
        console.log("NEW GUIDE",res);
        let guidesData = []
        res.forEach(element => {
          element.guides.forEach(element2 => {
            guidesData.push(element2);
          });
          // guidesData.concat(element.guides);
        });
        this.guides = guidesData;

      })

    console.log("LIST",this.guides)


    }
  })
  });

  
}

}

interface other_type {
  other_type: String;
 }

