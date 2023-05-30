import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceService } from 'src/app/service.service';
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-new-audit-and-finance-data',
  templateUrl: './add-new-audit-and-finance-data.component.html',
  styleUrls: ['./add-new-audit-and-finance-data.component.scss']
})
export class AddNewAuditAndFinanceDataComponent implements OnInit {


  fileUpload = new FormData();
  budgetUpload:any = null;
  auditReport:any = null;

  classes: any[] = [];
  divisions: any[] = [];
  subjects: any[] = [];
  committeeId : any = null;
  yearControl = new FormControl('', Validators.required);
  public physicalExpenditure: FormArray = this.fb.array([]);
  public academicExpenditure: FormArray = this.fb.array([]);
  public libraryExpenditure: FormArray = this.fb.array([]);
  public maintenanceExpenditure: FormArray = this.fb.array([]);
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
    private dialogRef: MatDialogRef<AddNewAuditAndFinanceDataComponent>,
    @Inject(MAT_DIALOG_DATA) public data : any
  ) {
    // this.committeeId = data.committeeId;
    this.Form = this.fb.group({
      academicYear:this.fb.control('',Validators.required),
      expenditureWithSalary:this.fb.control('',[Validators.required, Validators.pattern(new RegExp("[0-9]"))]),
      expenditureWithoutSalary:this.fb.control('',[Validators.required,Validators.pattern(new RegExp("[0-9]"))]),
      budgetOnPhysicalFacility:this.fb.control('',[Validators.required,Validators.pattern(new RegExp("[0-9]"))]),
      physicalExpenditure:this.fb.array([this.createPhysicalExpenditure()],Validators.required),
      budgetOnAcademicFacility:this.fb.control('',[Validators.required,Validators.pattern(new RegExp("[0-9]"))]),
      academicExpenditure:this.fb.array([this.createAcademicExpenditure()],Validators.required),
      budgetOnLibraryFacility:this.fb.control('',[Validators.required,Validators.pattern(new RegExp("[0-9]"))]),
      libraryExpenditure:this.fb.array([this.createLibraryExpenditure()],Validators.required),
      budgetOnMaintenanceFacility:this.fb.control('',[Validators.required,Validators.pattern(new RegExp("[0-9]"))]),
      maintenanceExpenditure:this.fb.array([this.createMaintenanceExpenditure()],Validators.required),
    })
   }

  ngOnInit(): void {
    this.fetchData();
  }


  ////Physical expenditure form array functions////
  get physicalExpenditureControl() {
    this.physicalExpenditure = this.Form.get('physicalExpenditure') as FormArray;
    return this.physicalExpenditure.controls;
  }

  createPhysicalExpenditure(): FormGroup {
    return this.fb.group({
      facility: this.fb.control('physical', Validators.required),
      item:this.fb.control('',Validators.required),
      amount: this.fb.control('',[Validators.required,Validators.pattern(new RegExp("[0-9]"))]),
    });
  }

  addPhysicalExpenditure(): void {
    this.physicalExpenditure = this.Form.get('physicalExpenditure') as FormArray;
    this.physicalExpenditure.push(this.createPhysicalExpenditure());
  }

  removePhysicalExpenditure(i: number) {
    this.physicalExpenditure.removeAt(i);

  }

  ////Academic expenditure form array functions////
  get academicExpenditureControl() {
    this.academicExpenditure = this.Form.get('academicExpenditure') as FormArray;
    return this.academicExpenditure.controls;
  }

  createAcademicExpenditure(): FormGroup {
    return this.fb.group({
      facility: this.fb.control('academic', Validators.required),
      item:this.fb.control('',Validators.required),
      amount: this.fb.control('',[Validators.required,Validators.pattern(new RegExp("[0-9]"))]),
    });
  }

  addAcademicExpenditure(): void {
    this.academicExpenditure = this.Form.get('academicExpenditure') as FormArray;
    this.academicExpenditure.push(this.createAcademicExpenditure());
  }

  removeAcademicExpenditure(i: number) {
    this.academicExpenditure.removeAt(i);

  }

  ////Library expenditure form array functions////
  get libraryExpenditureControl() {
    this.libraryExpenditure = this.Form.get('libraryExpenditure') as FormArray;
    return this.libraryExpenditure.controls;
  }

  createLibraryExpenditure(): FormGroup {
    return this.fb.group({
      facility: this.fb.control('library', Validators.required),
      item:this.fb.control('',Validators.required),
      amount: this.fb.control('',[Validators.required,Validators.pattern(new RegExp("[0-9]"))]),
    });
  }

  addLibraryExpenditure(): void {
    this.libraryExpenditure = this.Form.get('libraryExpenditure') as FormArray;
    this.libraryExpenditure.push(this.createLibraryExpenditure());
  }

  removeLibraryExpenditure(i: number) {
    this.libraryExpenditure.removeAt(i);
  }

  ////Library expenditure form array functions////
  get maintenanceExpenditureControl() {
    this.maintenanceExpenditure = this.Form.get('maintenanceExpenditure') as FormArray;
    return this.maintenanceExpenditure.controls;
  }

  createMaintenanceExpenditure(): FormGroup {
    return this.fb.group({
      facility: this.fb.control('', Validators.required),
      item:this.fb.control('',Validators.required),
      amount: this.fb.control('',[Validators.required,Validators.pattern(new RegExp("[0-9]"))]),
    });
  }

  addMaintenanceExpenditure(): void {
    this.maintenanceExpenditure = this.Form.get('maintenanceExpenditure') as FormArray;
    this.maintenanceExpenditure.push(this.createLibraryExpenditure());
  }

  removeMaintenanceExpenditure(i: number) {
    this.maintenanceExpenditure.removeAt(i);
  }

  // upload(event: any,i:number){
  //   this.uploads[i] = event.target.files[0];
  //   console.log(event);
  // }

  // upload1(event: any){
  //   // this.document = event.target.files[0];
  //   // this.uploads[i] = event.target.files[0];
  //   console.log(event);
  // }

  fetchData() {
    this.service.getData("/program-detail").subscribe((res: any) => {
      console.log(res);
      this.classes = res;
    }, (err: any) => {
      console.log(err);
    });
  }

  budget_upload(event: any) {
    this.budgetUpload = event.target.files[0];
  }

  audit_report_upload(event: any) {
    this.auditReport = event.target.files[0];
  }

  submitForm(){

    let expenditures: any[] = [];
    let maintenanceExpenditureList: any[] = [];

    let budgetExt =  this.budgetUpload?.name.split('.').pop();
    let budgetFilename: any = null;
    if(this.budgetUpload != undefined && this.budgetUpload != null ) {
      budgetFilename = uuidv4() + "." + budgetExt
      this.fileUpload.append("files", this.budgetUpload, budgetFilename) 
    } else {
      console.log(`Budget document not provided.`);
    }

    let auditExt =  this.auditReport?.name.split('.').pop();
    let auditFilename: any = null;
    if(this.auditReport != undefined && this.auditReport != null ) {
      auditFilename = uuidv4() + "." + auditExt
      this.fileUpload.append("files", this.auditReport, auditFilename) 
    } else { console.log(`Audit report document not provided.`); }

    for(let i =0;i<this.physicalExpenditure.length;i++){
      expenditures.push({
        item: this.physicalExpenditure.at(i).get("item")?.value,
        amount: this.physicalExpenditure.at(i).get("amount")?.value,
        facility: this.physicalExpenditure.at(i).get("facility")?.value,
      });
    }
    for(let i =0;i<this.academicExpenditure.length;i++){
      expenditures.push({
        item: this.academicExpenditure.at(i).get("item")?.value,
        amount: this.academicExpenditure.at(i).get("amount")?.value,
        facility: this.academicExpenditure.at(i).get("facility")?.value,
      });
    }
    for(let i =0;i<this.libraryExpenditure.length;i++){
      expenditures.push({
        item: this.libraryExpenditure.at(i).get("item")?.value,
        amount: this.libraryExpenditure.at(i).get("amount")?.value,
        facility: this.libraryExpenditure.at(i).get("facility")?.value,
      });
    }
    for(let i =0;i<this.maintenanceExpenditure.length;i++){
      maintenanceExpenditureList.push({
        item: this.maintenanceExpenditure.at(i).get("item")?.value,
        amount: this.maintenanceExpenditure.at(i).get("amount")?.value,
        facility: this.maintenanceExpenditure.at(i).get("facility")?.value,
      });
    }

    let data = {
      financialYear: this.Form.get("academicYear")?.value,
      budget: budgetFilename,
      expenditureWithSalary: this.Form.get("expenditureWithSalary")?.value,
      expenditureWithoutSalary: this.Form.get("expenditureWithoutSalary")?.value,
      auditReport: auditFilename,
      physicalFacilityBudget: this.Form.get("budgetOnPhysicalFacility")?.value,
      expenditures: expenditures,
      academicFacilityBudget: this.Form.get("budgetOnAcademicFacility")?.value,
      libraryFacilityBudget: this.Form.get("budgetOnLibraryFacility")?.value,
      maintenanceFacilityBudget: this.Form.get("budgetOnMaintenanceFacility")?.value,
      maintenanceExpenditure: maintenanceExpenditureList
    }
    // console.log(data);
    // console.log(this.fileUpload.getAll("files"));

    this.service.postData("/finance", data).subscribe((res: any) => {
      console.log(res);

      if(this.fileUpload.getAll("files").length > 0){
        this.service.postData("/upload", this.fileUpload).subscribe(res2 => {
          console.log(res2);
        });
      }

    }, (err: any) => {
      console.warn("Error try again later!!" +err);
    }, () => {
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
interface level {
  level: string;
}