import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators, FormArray, FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceService } from 'src/app/service.service';
import * as XLSX from 'xlsx';
import { AddNewStudentDataComponent } from '../add-new-student-data/add-new-student-data.component';

@Component({
  selector: 'app-add-new-roll-call-data',
  templateUrl: './add-new-roll-call-data.component.html',
  styleUrls: ['./add-new-roll-call-data.component.scss']
})
export class AddNewRollCallDataComponent implements OnInit {

  aluminiDataList: any = null;

  fileUpload = new FormData();
  uploads:any[] = [];

  classes: any[] = [];
  divisions: any[] = [];
  subjects: any[] = [];
  committeeId : any = null;
  yearControl = new FormControl('', Validators.required);
  public studentData: FormArray = this.fb.array([]);
  public uploadData: FormData = new FormData();

  academicYears: any [] = [
    {year: '2021', },
    {year: '2020', },
    {year: '2019', },
    {year: '2018', },
    {year: '2017', },
    {year: '2016', },
  ];

  Form: FormGroup;
  constructor(

    private fb: FormBuilder,
    public service: ServiceService,
    private dialogRef: MatDialogRef<AddNewStudentDataComponent>,
    @Inject(MAT_DIALOG_DATA) public data : any
  ) {
    this.committeeId = data.committeeId;
    this.Form = this.fb.group({
      // academicYear:this.fb.control('',Validators.required),
      // studentData:this.fb.array([this.createStudentData()],Validators.required),
    })
   }

  ngOnInit(): void {
  }

  upload(event: any,i:number){
    // this.document = event.target.files[0];
    this.uploads[i] = event.target.files[0];
    console.log(event);
  }

  upload1(event: any){
    const target: DataTransfer = <DataTransfer>(event.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {

      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      let data = XLSX.utils.sheet_to_json(ws, { range: 3 });
      this.aluminiDataList = data;
      console.log(this.aluminiDataList);
    };
    reader.readAsBinaryString(target.files[0]);
  }

  submitStudentData() {

    let aluminiList: any[] = [];
    this.aluminiDataList.forEach((student: any) => {

      aluminiList.push({
        firstName: student['First name']?.trim(),
        middleName: student['Middle name']?.trim(),
        lastName: student['Last name']?.trim(),
        phone: student['Phone No.'],
        email: student['E-Mail']?.trim(),
        password: 123456,
      });

    });

    this.service.getUserWithUserId().subscribe((user: any) => {
      this.service.postData("/user/alumini/bulk/college/" + user.college.id, aluminiList).subscribe((res: any) => {
        console.log(res);
  
        
      }, (err: any) => {
        console.warn(err);
        this.dialogRef.close();
      }, () => {
        this.dialogRef.close();
      });
    })
  }

}
interface level {
  level: string;
}