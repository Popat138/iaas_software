import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { SelectResearchProgramByDepartmentIdComponent } from 'src/app/common/select-research-program-by-department-id/select-research-program-by-department-id.component';
import { ServiceService } from 'src/app/service.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-add-research-programs',
  templateUrl: './add-research-programs.component.html',
  styleUrls: ['./add-research-programs.component.scss']
})
export class AddResearchProgramsComponent implements OnInit {


  program: any = null;
  fileUpload = new FormData();
  public programDetails: any = null;
  uploads:any[] = [];
  other_type : other_type[] = [
    {other_type: 'PhD', },
    {other_type: 'MPhil', },
    // {other_type: 'PG Diploma', },
    // {other_type: 'Certificate course', },
    // {other_type: 'Ad-on Course', }
  ]

  public Form: FormGroup;
  public other : FormArray = this.fb.array([]);
  constructor(
    private fb: FormBuilder,
    public service: ServiceService,
    @Inject(MAT_DIALOG_DATA)
    public data : any,
    public dialogRef: MatDialogRef<AddResearchProgramsComponent>,
    public dialog: MatDialog,
  )
  {
    // this.userid = data.userid;
    this.Form = this.fb.group({
      other_type: this.fb.control('',Validators.required),
      name_of_prog: this.fb.control('',Validators.required),
      year: this.fb.control('',Validators.required),
      class: this.fb.control('',Validators.required),
      other:this.fb.array([this.createother()]),
    })
   }

  ngOnInit(): void {}

  get otherControl() {
    this.other = this.Form.get('other') as FormArray;
    return this.other.controls;
  }

  createother(): FormGroup {
    return this.fb.group({
    name_of_guide: this.fb.control('',Validators.required),
    name_of_college: this.fb.control('',Validators.required),
    guide_letter_no: this.fb.control('',Validators.required),
    letter_date: this.fb.control('',Validators.required),
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


  submitForm(){

  // let data : any = {
  //   nameOfStudent : this.Form.get("name_of_student")?.value,
  //   class : this.Form.get("class")?.value,
  //   category: this.Form.get("category")?.value,
  //   otherType:this.Form.get("other_type")?.value,
  //   nameOfProg:this.Form.get("name_of_prog")?.value,
  //   year:this.Form.get("year")?.value,
  // }

  let guideList: any [] = [];
  for(let i = 0; i< this.other.length; i++) {

    let ext =  this.uploads[i]?.name.split('.').pop();
    let filename: any = null;
    if(this.uploads[i] != undefined && this.uploads[i] != null ) {
      filename = uuidv4() + "." + ext
      this.fileUpload.append("files", this.uploads[i], filename)
    } else {
      console.log(`At index ${i} document not provided.`);
    }

    guideList.push({
      guideName: this.other.at(i).get("name_of_guide").value,
      collegeName: this.other.at(i).get("name_of_college").value,
      letterNo: this.other.at(i).get("guide_letter_no").value,
      letterDate: this.other.at(i).get("letter_date").value,
      document: filename
    });
  }

  let finalData = {
    year:this.Form.get("year")?.value,
    guides: guideList
  }
  console.log(finalData);
  console.log(this.Form.get("class").value)

  this.service.getUserWithUserId().subscribe((user: any) => {
        this.service
      .postData(`/research-program/programDetail/${this.Form.get("class").value.id}/department/${user.hod.department.id}`, finalData)
      .subscribe((res: any) => {
      console.log(res);
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
  });


}

getProgram() {

  this.service.getUserWithUserId().subscribe((user: any) => {
    console.log(user.hod)
    const programDialogRef = this.dialog.open(SelectResearchProgramByDepartmentIdComponent ,{width: "80%",height: "86vh",panelClass: 'full-width-dialog', data: {departmentId : user.hod.department.id}});
  programDialogRef.afterClosed().subscribe((result: any) => {
    console.log(result);
    if(result != undefined) {
      this.program = result;
      this.Form.get("name_of_prog").setValue(result.programName);
      this.Form.get("other_type").setValue(result.programLevel);
      this.Form.get("year").setValue(result.startYear);
      
      this.service.getData("/program-detail/program/" + result.programId).subscribe((res: any) => {
        this.programDetails = res;
        console.log(res);
      })
    }
  })
  });

  
}

}

interface other_type {
  other_type: String;
 }

