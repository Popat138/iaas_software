import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ServiceService } from 'src/app/service.service';
import { AddNewIqacReportComponent } from '../add-new-iqac-report/add-new-iqac-report.component';
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-grade-sheet',
  templateUrl: './add-grade-sheet.component.html',
  styleUrls: ['./add-grade-sheet.component.scss']
})
export class AddGradeSheetComponent implements OnInit {
  user: any[] = [];
  fileUpload = new FormData();
  photograph:any=null;
  newsReport:any=null;
  participantList:any=null;
  final_data:any;
  // public HEROES:any[] = [];
  public item_data :any[] = [];
  

  role: Role[] = [

    {role: 'Chairman'},
    {role: 'Coordinator'},
    {role: 'Member – teacher'},
    {role: 'Member – staff'},
    {role: 'Member – student'},
    {role: 'Member - alumni'},

  ];
 HEROES:any[] = [
    {id: 1, name:'Superman'},
    {id: 2, name:'Batman'},
    {id: 5, name:'BatGirl'},
    {id: 3, name:'Robin'},
    {id: 4, name:'Flash'}
];


  metricOne:{
    '1.1.1',
    '1.1.2',
    '1.1.3'
  }
  metricId:any[]=[
    {
      dataIndex:"name",
      edit:false
    },
    {
      dataIndex:"mTitle",
      edit:false
    },
    {
      dataIndex:"mType",
      edit:false
    },
    {
      dataIndex:"mbenchmark",
      edit:false
    },
    {
      dataIndex:"mweightage",
      edit:false
    },
    {
      dataIndex:"ProbableScore",
      edit:true
    },
    {
      dataIndex:"CalculatedScore",
      edit:true
    }
  ]
 metric:any[] = [
    {id: 1, name:'1.1.1',mTitle:"Curriculum delivery Policy",mType:"Qualitative",mbenchmark:"---",mweightage:20,ProbableScore:Number,CalculatedScore:Number},
    {id: 2, name:'1.1.2',mTitle:"Curriculum delivery Policy",mType:"Qualitative",mbenchmark:"0-0 to 40 <br> 1 - 41 to 50 <br> 2 - 51 to 60",mweightage:20,ProbableScore:Number,CalculatedScore:Number},
    {id: 3, name:'1.1.3',mTitle:"Curriculum delivery Policy",mType:"Qualitative",mbenchmark:"---",mweightage:10,ProbableScore:Number,CalculatedScore:Number},
    {id: 4, name:'1.1.4',mTitle:"Curriculum delivery Policy",mType:"Qualitative",mbenchmark:"---",mweightage:10,ProbableScore:Number,CalculatedScore:Number},
    {id: 5, name:'1.2.1',mTitle:"Curriculum delivery Policy",mType:"Qualitative",mbenchmark:"---",mweightage:5,ProbableScore:Number,CalculatedScore:Number},
    {id: 5, name:'1.2.2',mTitle:"Curriculum delivery Policy",mType:"Qualitative",mbenchmark:"---",mweightage:10,ProbableScore:Number,CalculatedScore:Number},
    {id: 7, name:'1.2.3',mTitle:"Curriculum delivery Policy",mType:"Qualitative",mbenchmark:"0-0 to 40  ;  1 - 41 to 50 <br> 2 - 51 to 60 ; 3 - 61 to 70 <br> 4 - >70",mweightage:20,ProbableScore:Number,CalculatedScore:Number},
    {id: 8, name:'1.3.1',mTitle:"Curriculum delivery Policy",mType:"Qualitative",mbenchmark:"---",mweightage:10,ProbableScore:Number,CalculatedScore:Number},
    {id: 9, name:'1.3.2',mTitle:"Curriculum delivery Policy",mType:"Qualitative",mbenchmark:"---",mweightage:5,ProbableScore:Number,CalculatedScore:Number},
    {id: 10, name:'1.3.3',mTitle:"Curriculum delivery Policy",mType:"Qualitative",mbenchmark:"---",mweightage:10,ProbableScore:Number,CalculatedScore:Number},
  ];
  // public Form: FormGroup;
  public agenda: FormArray = this.fb.array([]);

  year: Year[] = [
    {year: '2018-2019', },
    {year: '2019-2020', },
    {year: '2020-2021', },
    {year: '2021-2022', },
  ];

  public Form: FormGroup;
  public other : FormArray = this.fb.array([]);
  public ug : FormArray = this.fb.array([]);
  constructor(

    private fb: FormBuilder,
    public service: ServiceService,
    public dialogRef: MatDialogRef<AddNewIqacReportComponent>
  ) {
    this.Form = this.fb.group({
      academicYear: this.fb.control('',Validators.required),
      date:this.fb.control('',Validators.required),
      // number_of_students:this.fb.control('',[Validators.required]),
      // number_of_teachers:this.fb.control('',[Validators.required]),
      // breif_report:this.fb.control('',Validators.required),
      // supporting_agency:this.fb.control('',Validators.required),
      oneForm:this.fb.array([]),
    })
   }

  ngOnInit(): void {
   
  }
  get ugControl() {
    
    this.ug = this.Form.get('ug') as FormArray;
     return this.ug.controls;
 
  }
 
  createug(): FormGroup {
    return this.fb.group({
     //  academic_year:this.fb.control('',Validators.required),
    met_number:this.fb.control(''),
    met_title:this.fb.control(''),
    met_type:this.fb.control(''),
    met_bench:this.fb.control(''),
    met_weightage:this.fb.control(''),
    met_value:this.fb.control(''),
    met_cal:this.fb.control(''),
     });
  }
 
  addug(): void {
    this.ug = this.Form.get('ug') as FormArray;
    for(let i=0;i<this.metric.length;i++)
    {
    this.ug.push(this.createug());
    }
  }
  change(event: any,i:number){
    console.log(event.target.value,i)
    var val1= this.Form.get("met_weightage").value;
    var val2= this.Form.get("met_value").value;
    var total=val1*val2;
    this.Form.get("totalMarks").setValue(total)
  }

 }


interface Year {
  year: String;
}

interface Role {
  role: String;
}


