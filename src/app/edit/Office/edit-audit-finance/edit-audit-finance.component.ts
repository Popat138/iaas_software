import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceService } from 'src/app/service.service';
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-edit-audit-finance',
  templateUrl: './edit-audit-finance.component.html',
  styleUrls: ['./edit-audit-finance.component.scss']
})
export class EditAuditFinanceComponent implements OnInit {

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
    private dialogRef: MatDialogRef<EditAuditFinanceComponent>,
    @Inject(MAT_DIALOG_DATA) public data : any
  ) {
    // this.committeeId = data.committeeId;
    this.Form = this.fb.group({
      id:this.fb.control(''),
      academicYear:this.fb.control('',Validators.required),
      expenditureWithSalary:this.fb.control('',[Validators.required, Validators.pattern(new RegExp("[0-9]"))]),
      expenditureWithoutSalary:this.fb.control('',[Validators.required,Validators.pattern(new RegExp("[0-9]"))]),
      budgetOnPhysicalFacility:this.fb.control('',[Validators.required,Validators.pattern(new RegExp("[0-9]"))]),
      physicalExpenditure:this.fb.array([]),
      budgetOnAcademicFacility:this.fb.control('',[Validators.required,Validators.pattern(new RegExp("[0-9]"))]),
      academicExpenditure:this.fb.array([]),
      budgetOnLibraryFacility:this.fb.control('',[Validators.required,Validators.pattern(new RegExp("[0-9]"))]),
      libraryExpenditure:this.fb.array([]),
      budgetOnMaintenanceFacility:this.fb.control('',[Validators.required,Validators.pattern(new RegExp("[0-9]"))]),
      maintenanceExpenditure:this.fb.array([]),
    })
   }

  ngOnInit(): void {
    this.fetchData();
    this.getData();
  }

getData(){
  console.log("AUDIT",this.data);
  this.fetchData();
  console.log("ID",this.data.id)
  this.Form.get("academicYear").setValue(this.data.financialYear);
  this.Form.get("expenditureWithSalary").setValue(this.data.expenditureWithSalary);
  this.Form.get("expenditureWithoutSalary").setValue(this.data.expenditureWithoutSalary);
  this.Form.get("budgetOnPhysicalFacility").setValue(this.data.physicalFacilityBudget);
  this.Form.get("budgetOnAcademicFacility").setValue(this.data.academicFacilityBudget);
  this.Form.get("budgetOnLibraryFacility").setValue(this.data.libraryFacilityBudget);
  this.Form.get("budgetOnMaintenanceFacility").setValue(this.data.maintenanceFacilityBudget);
  this.physicalExpenditure = this.Form.get('physicalExpenditure') as FormArray;
  console.log("LENGHT",this.data.expenditures);

  this.data.expenditures.forEach(element=>{
      if(element.facility=='physical')
      {
       console.log("ELEMENT",element) 
       
       this.physicalExpenditure.push(
       this.fb.group({
        id:this.fb.control(element.id),
      facility: this.fb.control('physical', Validators.required),
      item:this.fb.control(element.item,Validators.required),
      amount: this.fb.control(element.amount,[Validators.required,Validators.pattern(new RegExp("[0-9]"))]),
    })
  )
  }

   });
    
   this.academicExpenditure = this.Form.get('academicExpenditure') as FormArray;

   this.data.expenditures.forEach(element=>{
    if(element.facility=='academic')
    {
     console.log("ELEMENT 2",element.id) 
     
     this.academicExpenditure.push(
     this.fb.group({
     id:this.fb.control(element.id),
    facility: this.fb.control('academic', Validators.required),
    item:this.fb.control(element.item,Validators.required),
    amount: this.fb.control(element.amount,[Validators.required,Validators.pattern(new RegExp("[0-9]"))]),
  })
)
}

 });


 this.libraryExpenditure = this.Form.get('libraryExpenditure') as FormArray;

   this.data.expenditures.forEach(element=>{
    
    if(element.facility=='library')
    {
     console.log("ELEMENT 3",element) 
     
     this.libraryExpenditure.push(
    
     this.fb.group({
      id:this.fb.control(element.id),
    facility: this.fb.control('library', Validators.required),
    item:this.fb.control(element.item,Validators.required),
    amount: this.fb.control(element.amount,[Validators.required,Validators.pattern(new RegExp("[0-9]"))]),
  })
)
}

 });


 console.log("Maintenance",this.data.maintenanceExpenditure);

 this.maintenanceExpenditure = this.Form.get('maintenanceExpenditure') as FormArray;
 console.log("ELEMENT 5",this.data.maintenanceExpenditure)
this.data.maintenanceExpenditure.forEach(element=>{
  console.log("ELEMENT 4",element) 
  this.maintenanceExpenditure.push(
  this.fb.group({
        id:this.fb.control(element.id),
    facility: this.fb.control(element.facility, Validators.required),
    item:this.fb.control(element.item,Validators.required),
    amount: this.fb.control(element.amount,[Validators.required,Validators.pattern(new RegExp("[0-9]"))]),
  })
  )
  
})



}
  ////Physical expenditure form array functions////
  get physicalExpenditureControl() {
    this.physicalExpenditure = this.Form.get('physicalExpenditure') as FormArray;
    return this.physicalExpenditure.controls;
  }

  createPhysicalExpenditure(): FormGroup {
    return this.fb.group({
      id:this.fb.control(''),
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
      id:this.fb.control(''),
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
      id:this.fb.control(''),
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
      id:this.fb.control(''),
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
    this.service.getData("/finance").subscribe((res: any) => {
      
      console.log("FACILITY",res);
      
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
    this.Delete();
    let expenditures: any[] = [];
    let maintenanceExpenditureList: any[] = [];

    let budgetExt =  this.budgetUpload?.name.split('.').pop();
    let budgetFilename: any = null;
    if(this.budgetUpload != undefined && this.budgetUpload != null ) {
      budgetFilename = uuidv4() + "." + budgetExt
      this.fileUpload.append("files", this.budgetUpload, budgetFilename) 
    } else {
      budgetFilename=this.data.budget;
      // console.log(`Budget document not provided.`);
    }

    let auditExt =  this.auditReport?.name.split('.').pop();
    let auditFilename: any = null;
    if(this.auditReport != undefined && this.auditReport != null ) {
      auditFilename = uuidv4() + "." + auditExt
      this.fileUpload.append("files", this.auditReport, auditFilename) 
    } else { 
      auditFilename=this.data.auditReport;
      // console.log(`Audit report document not provided.`);
     }
 
 /////
 
    for(let i =0;i<this.physicalExpenditure.length;i++){
      expenditures.push({
        // id:this.physicalExpenditure.at(i).get("id").value,
        item: this.physicalExpenditure.at(i).get("item")?.value,
        amount: this.physicalExpenditure.at(i).get("amount")?.value,
        facility: this.physicalExpenditure.at(i).get("facility")?.value,
      });
    }
    for(let i =0;i<this.academicExpenditure.length;i++){
      expenditures.push({
        // id: this.academicExpenditure.at(i).get("id").value,
        item: this.academicExpenditure.at(i).get("item")?.value,
        amount: this.academicExpenditure.at(i).get("amount")?.value,
        facility: this.academicExpenditure.at(i).get("facility")?.value,
      });
    }
    for(let i =0;i<this.libraryExpenditure.length;i++){
      expenditures.push({
        // id: this.libraryExpenditure.at(i).get("id").value,
        item: this.libraryExpenditure.at(i).get("item")?.value,
        amount: this.libraryExpenditure.at(i).get("amount")?.value,
        facility: this.libraryExpenditure.at(i).get("facility")?.value,
      });
    }
    for(let i =0;i<this.maintenanceExpenditure.length;i++){
      maintenanceExpenditureList.push({
        // id: this.maintenanceExpenditure.at(i).get("id").value,
        item: this.maintenanceExpenditure.at(i).get("item")?.value,
        amount: this.maintenanceExpenditure.at(i).get("amount")?.value,
        facility: this.maintenanceExpenditure.at(i).get("facility")?.value,
      });
    }
  console.log("ID@@",this.data.id)
    let data = {
      id: this.data.id,
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
    console.log("NEW DATA",data);
    // console.log(this.fileUpload.getAll("files"));

    this.service.putData("/finance", data).subscribe((res: any) => {
      // data.expenditures.finance.id = this.data.id;
      console.log("POST",res);
      
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

  Delete(){
    let expenditures: any[] = [];
    for(let i =0;i<this.physicalExpenditure.length;i++){
      expenditures.push({
        // id:this.physicalExpenditure.at(i).get("id").value,
        item: this.physicalExpenditure.at(i).get("item")?.value,
        amount: this.physicalExpenditure.at(i).get("amount")?.value,
        facility: this.physicalExpenditure.at(i).get("facility")?.value,
      });
    }
    for(let i =0;i<this.academicExpenditure.length;i++){
      expenditures.push({
        // id: this.academicExpenditure.at(i).get("id").value,
        item: this.academicExpenditure.at(i).get("item")?.value,
        amount: this.academicExpenditure.at(i).get("amount")?.value,
        facility: this.academicExpenditure.at(i).get("facility")?.value,
      });
    }
    for(let i =0;i<this.libraryExpenditure.length;i++){
      expenditures.push({
        // id: this.libraryExpenditure.at(i).get("id").value,
        item: this.libraryExpenditure.at(i).get("item")?.value,
        amount: this.libraryExpenditure.at(i).get("amount")?.value,
        facility: this.libraryExpenditure.at(i).get("facility")?.value,
      });
    }


    
  }
}

interface level {
  level: string;
}
