import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceService } from 'src/app/service.service';
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-add-new-student-data',
  templateUrl: './add-new-student-data.component.html',
  styleUrls: ['./add-new-student-data.component.scss']
})
export class AddNewStudentDataComponent implements OnInit {

  studentDataList: any = null;

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

  // achievementNatures: any[] = [
  //   {value: 'Gold_medal',title: 'Gold medal'},
  //   {value: 'Silver_medal',title: 'Silver medal'},
  //   {value: 'Bronze_medal',title: 'Bronze medal'},
  //   {value: 'Certificate',title: 'Certificate'},
  //   {value: 'First_prize',title: 'First prize'},
  //   {value: 'Second_prize',title: 'Second prize'},
  //   {value: 'Third_prize',title: 'Third prize'},
  //   {value: 'Other',title: 'Other'}
  // ];
  Form: FormGroup;
  constructor(

    private fb: FormBuilder,
    public service: ServiceService,
    private dialogRef: MatDialogRef<AddNewStudentDataComponent>,
    @Inject(MAT_DIALOG_DATA) public data : any
  ) {
    this.committeeId = data.committeeId;
    this.Form = this.fb.group({
      academicYear:this.fb.control('',Validators.required),
      // studentData:this.fb.array([this.createStudentData()],Validators.required),
    })
   }

  ngOnInit(): void {
  }

  // get studentDataControl() {
  //   this.studentData = this.Form.get('studentData') as FormArray;
  //   return this.studentData.controls;
  // }

  // createStudentData(): FormGroup {
  //   return this.fb.group({
  //     class:this.fb.control('',Validators.required),
  //     division: this.fb.control({value: '', disabled: true},Validators.required),
  //     //date:this.fb.control('',Validators.required),
  //     subject: this.fb.control({value: '', disabled: true},Validators.required),
  //     // achievementNature: this.fb.control('',Validators.required)
  //   });
  // }

  // addStudentData(): void {
  //   this.studentData = this.Form.get('studentData') as FormArray;
  //   this.studentData.push(this.createStudentData());
  // }

  // removeStudentData(i: number) {
  //   this.studentData.removeAt(i);

  // }

  upload(event: any,i:number){
    // this.document = event.target.files[0];
    this.uploads[i] = event.target.files[0];
    console.log(event);
  }

  upload1(event: any){
    // this.service.excelToJson(event).subscribe((res:any) => {
    //   this.studentDataList = res;
    //   console.log(this.studentDataList);
    // });
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
      let data = XLSX.utils.sheet_to_json(ws, { range: 4 });
      this.studentDataList = data;
      console.log(this.studentDataList);
    };
    reader.readAsBinaryString(target.files[0]);
  }

  // fetchData() {
  //   this.service.getData("/program-detail").subscribe((res: any) => {
  //     console.log(res);
  //     this.classes = res;
  //   }, (err: any) => {
  //     console.log(err);
  //   });
  // }

  // classChanges(event: any, i: any) {
  //   this.studentData = this.Form.get('studentData') as FormArray;
  //   if(event.value != "" && event.value != null && event.value != undefined) {
  //     this.studentData.at(i).get("division")?.enable();
  //   } else {
  //     this.studentData.at(i).get("division")?.disable();
  //   }
  // }

  // divisionChanges(event: any, i: any) {
  //   this.studentData = this.Form.get('studentData') as FormArray;
  //   if(event.value != "" && event.value != null && event.value != undefined) {
  //     this.studentData.at(i).get("subject")?.enable();
  //   } else {
  //     this.studentData.at(i).get("subject")?.disable();
  //   }
  // }

  // fetchDivision(i:any): any {
  //   let data = this.studentData.at(i).get("class")?.value;
  //   if(data != null || data != undefined) {
  //     return data.divisions;
  //   }
  //   return null;
  // }

  // fetchsubject(i:any): any {
  //   let data = this.studentData.at(i).get("division")?.value;
  //   if(data != null || data != undefined) {
  //     return data.subjects;
  //   }
  //   return null;
  // }

  submitStudentData() {

    let studentList: any[] = [];
    let parentList:any[] =[];
    this.studentDataList.forEach((student: any) => {

    //   var dateParts = student['Admission Date']?.split("/");

    //   var admissionDate = dateParts!= null ? new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]) : null;

      studentList.push({
        firstName: student['First name']?.trim(),
        middleName: student['Middle name']?.trim(),
        lastName: student['Last name']?.trim(),
        phone: student['Phone No.'],
        email: student['E-Mail']?.trim(),
        gender: student['Gender'],
        password: 123456,
        student: {
          academicYear: this.Form.get("academicYear")?.value,
          enrollmentNo : student['Enrollment No.'],
          rollNo: student['Roll No.'],
          aadharNumber: student['Adhar Card No.'],
          caste: student['Caste'],
          category: student['Category'],
          correspondenceAddress: student['Correspondence Address'],
          degreeApplied: student['Degree Applied'],
          medium: student['Medium'],
          studentClass: student['Class']?.trim(),
          feeCategory: student['Fee Category'],
          nameOfTheExam: student['Name Of The Exam'],
          seatNo: student['Seat No.'],
          universityOrBoard: student['University/Board'],
          percentage: student['Percentage'],
          annualIncome: student['Annual Income'],
          admissionDate: student['Admission Date'],
          fatherOrGuardianName: student["Father's/Guardian's Name"],
          studentDivision: student['Division'],
          relation: student['Relation'],
          classLastAttended: student['Class Last Attended'],
          generalSubject: student['General Subject'],
          specialSubject: student['Special Subject'],
          permanentAddress: student['Permanent Address'],
          alternateNumber: student['Mobile No.'],
          documentSubmitted: student["Document's Submitted"],
          parentOccupation: student['Parents Occupation'],
          officePhoneNo: student['Phone No.(Office)'],
          officeAddress: student['Office Address'],
          registerNumber: student['Register No.'],
          birthDate: student['Birth Date'],
          birthPlace: student['Birth Place'],
          motherName: student["Mother's Name"],
          eligibilityNo: student['Eligibility No'],
          studentIdNo: student['Student ID No'],
          previousClass: student['Previous Class'],
          nationality: student['Nationality'],
          admissionFormNo: student['Admission Form No'],
          religion: student['Religion'],
          area: student['Area'],
          studentStatus: student['Student Status']
        }
      });

      
      if(student["Parent email"] != null && student["Parent email"] != undefined && student["Parent email"] != "") {
        parentList.push({
          firstName: student["Father's/Guardian's Name"],
          email: student["Parent email"],
          password: 123456
        })
      }
    });

    let data = {
      academicYear: this.Form.get("academicYear")?.value,
      studentList: studentList
    }

    this.service.getUserWithUserId().subscribe((user: any) => {
      this.service.postData("/student-data/college/" + user.college.id, data).subscribe((res: any) => {
        console.log(res);
  
        if(parentList.length > 0) {
          this.service.postData("/user/parent/bulk/college/" + user.college.id, parentList).subscribe((res2:any) => {
            console.log(res2)
          }, (err2: any) => {
            console.warn(err2);
            this.dialogRef.close();
          }, () => {
            this.dialogRef.close();
          })
        } else{
          this.dialogRef.close();
        }
      }, (err: any) => {
        console.log(err);
        if(err.error.httpStatus == "NOT_FOUND") {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.error.message,
          });
        }else if(err.error.httpStatus == "CONFLICT") {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.error.message,
          });
        }
         else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error try again later abcd!!!',
          });
        }
        this.dialogRef.close();
      });
    })

    // this.service.postData("/user/bulk/student/college/"+1, studentList).subscribe((users:any) => {
    //   console.log(users);
    //   this.dialogRef.close();
    // }, (err: any) => {
    //   console.log(err);
    // });
  }

  // submitForm(){

  //   let rollCallList: any[] = [];
  //   for(let i =0;i<this.studentData.length;i++){

  //     let ext =  this.uploads[i]?.name.split('.').pop();
  //     let filename: any = null;
  //     if(this.uploads[i] != undefined && this.uploads[i] != null ) {
  //       filename = uuidv4() + "." + ext
  //       this.fileUpload.append("files", this.uploads[i], filename)
  //     } else {
  //       console.log(`At index ${i} document not provided.`);
  //     }

  //     rollCallList.push({
  //       subject: this.studentData.at(i).get("subject")?.value,
  //       rollCallList: filename
  //     });

  //   }
  //   let data = {
  //     academicYear: this.Form.get("academicYear")?.value,
  //     roleCallList: rollCallList
  //   }
  //   // console.log(data);
  //   // console.log(this.fileUpload.getAll("files"));

  //   this.service.postData("/student-data/", data).subscribe((res: any) => {
  //     console.log(res);

  //     if(this.fileUpload.getAll("files").length > 0){
  //       this.service.postData("/upload", this.fileUpload).subscribe(res2 => {
  //         console.log(res2);
  //       });
  //     }

  //   }, (err: any) => {
  //     console.warn("Error try again later!!" +err);
  //   }, () => {
  //     this.submitStudentData();
  //   });

  // }


}
interface level {
  level: string;
}
