import { Component, Inject, OnInit,ViewChild,ElementRef } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceService } from 'src/app/service.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import domtoimage from 'dom-to-image';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";  
declare var require: any;
const htmlToPdfmake = require("html-to-pdfmake");
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-view-biodataiqac',
  templateUrl: './view-biodataiqac.component.html',
  styleUrls: ['./view-biodataiqac.component.scss']
})
export class ViewBiodataiqacComponent implements OnInit {
  fileUpload = new FormData();
  uploads:any = null;
  papers:any[]=[];
  confpapers:any[]=[];
  confattend:any[]=[];
  confattendS:any[]=[];
  bookT:any[]=[];
  bodyA:any[]=[];
  proceeding:any[]=[];
  rproject:any[]=[];
  studentR:any[]=[];
  studentD:any[]=[];
  projectList:any[]=[];
  register:any[]=[];
  declaration:any[]=[];
  declFinal:any[]=[];
subject:any=null;
teach:any=null;
userteacher:any=null;
  adhaarFile: any = null;
  panFile: any = null;
  ugFile: any = null;
  pgFile:any = null;
  qualifingFile: any = null;
  researchFile:any=null;
  designation: any[] = [
    {title: 'Principal', value : 'Principal'},
    {title: 'Librarian', value : 'Librarian'},
    {title: 'Professor', value : 'Professor'},
    {title: 'Associate professor ', value : 'Associate_professor'},
    {title: 'Assistant professor', value : 'Assistant_professor'},
    {title: 'Physical Director', value : 'Physical_director'},
  ]
  level: Level [] = [
    {level: 'Yes', },
    {level: 'No', },

  ];
  public qualifications : FormArray = this.fb.array([]);
  public Form: FormGroup;
  dataSource_rp!:MatTableDataSource<ViewBiodataiqacComponent>;
  dataSource_st!:MatTableDataSource<ViewBiodataiqacComponent>;
  @ViewChild('pdfTable') pdfTable: ElementRef;

  constructor(
    private fb: FormBuilder,
    public service: ServiceService,
    @Inject(MAT_DIALOG_DATA) public data : any,
    private http: HttpClient,
    public dialogref: MatDialogRef<ViewBiodataiqacComponent>
  ) { 
    this.Form = this.fb.group({
      f_name: this.fb.control('',Validators.required),
      m_name: this.fb.control('',Validators.required),
      l_name: this.fb.control('',Validators.required),
      dob: this.fb.control('',Validators.required),
      addhar: this.fb.control('',Validators.required),
      pan_no: this.fb.control('',Validators.required),
      designation: this.fb.control('',Validators.required),

      degree:this.fb.control('',Validators.required),
      university: this.fb.control('',Validators.required),
      y_of_pass:this.fb.control('',Validators.required),
      specialization: this.fb.control('',Validators.required),
      grade: this.fb.control('',Validators.required),

      degree1:this.fb.control('',Validators.required),
      university1: this.fb.control('',Validators.required),
      y_of_pass1:this.fb.control('',Validators.required),
      specialization1: this.fb.control( '',Validators.required),
      grade1: this.fb.control('',Validators.required),

      net_set:this.fb.control(''),
      y_of_pass2:this.fb.control(''),
      subject:this.fb.control(''),
      grade2: this.fb.control(''),

      net_set1:this.fb.control(''),
      y_of_pass21:this.fb.control(''),
      subject11:this.fb.control(''),
      grade21: this.fb.control(''),

      degree2:this.fb.control(''),
      date_of_declaration:this.fb.control(''),
      subject1:this.fb.control(''),
      university2:this.fb.control(''),
      guide:this.fb.control(''),
      rec_year:this.fb.control(''),
      mobile:this.fb.control(''),
      gender:this.fb.control(''),
      tec_mobile:this.fb.control(''),
      tec_mail:this.fb.control(''),
      tec_address:this.fb.control(''),
      add_duty:this.fb.control(''),
    })
   }

   adhaarUpload(event: any){
    this.adhaarFile = event.target.files[0];
  }

   panUpload(event: any){
    this.panFile = event.target.files[0];
  }

   ugFileUpload(event: any){
    this.ugFile = event.target.files[0];
  }

   pgFileUpload(event: any){
    this.pgFile = event.target.files[0];
  }

   qualifingFileUpload(event: any){
    this.qualifingFile = event.target.files[0];
  }

  researchFileUpload(event: any){
    this.researchFile = event.target.files[0];
  }

  ngOnInit(): void {
  console.log("DATA",this.data);
  this.subject=this.data?.teacher?.department.departmentName;
  console.log("SUBJECT",this.subject);
  this.teach=this.data?.teacher?.teacherId;
  console.log("Teacher ID",this.teach);
  this.userteacher=this.data.userId;
  console.log("USER TEACHER",this.userteacher);
    this.Form.get("f_name").setValue(this.data?.firstName);
    this.Form.get("m_name").setValue(this.data?.middleName);
    this.Form.get("l_name").setValue(this.data?.lastName);
    this.Form.get("dob").setValue(this.data?.dob);
    this.Form.get("addhar").setValue(this.data?.teacher?.aadharNumber);
    this.Form.get("pan_no").setValue(this.data?.teacher?.panNumber);
    this.Form.get("designation").setValue(this.data?.teacher?.designation);
    this.Form.get("degree").setValue(this.data?.teacher?.ugQualification[0]?.degree);
    this.Form.get("university").setValue(this.data?.teacher?.ugQualification[0]?.university);
    this.Form.get("y_of_pass").setValue(this.data?.teacher?.ugQualification[0]?.yearOfPassing);
    this.Form.get("specialization").setValue(this.data?.teacher?.ugQualification[0]?.specialization);
    this.Form.get("grade").setValue(this.data?.teacher?.ugQualification[0]?.grade);
    this.Form.get("degree1").setValue(this.data?.teacher?.pgQualification[0]?.degree);
    this.Form.get("university1").setValue(this.data?.teacher?.pgQualification[0]?.university);
    this.Form.get("y_of_pass1").setValue(this.data?.teacher?.pgQualification[0]?.yearOfPassing);
    this.Form.get("specialization1").setValue(this.data?.teacher?.pgQualification[0]?.specialization);
    this.Form.get("grade1").setValue(this.data?.teacher?.pgQualification[0]?.grade);
    this.Form.get("net_set").setValue(this.data?.teacher?.entranceQualification[0]?.name);
    this.Form.get("y_of_pass2").setValue(this.data?.teacher?.entranceQualification[0]?.yearOfPassing);
    this.Form.get("subject").setValue(this.data?.teacher?.entranceQualification[0]?.subject);
    this.Form.get("grade2").setValue(this.data?.teacher?.entranceQualification[0]?.grade);
    this.Form.get("degree2").setValue(this.data?.teacher?.researchQualification[0]?.degree);
    this.Form.get("date_of_declaration").setValue(this.data?.teacher?.researchQualification[0]?.dateOfDeclaration);
    this.Form.get("subject1").setValue(this.data?.teacher?.researchQualification[0]?.subject);
    this.Form.get("university2").setValue(this.data?.teacher?.researchQualification[0]?.university);
    this.Form.get("guide").setValue(this.data?.teacher?.resGuide);
    this.Form.get("rec_year").setValue(this.data?.teacher?.recYear);
    this.Form.get("gender").setValue(this.data?.gender);
    this.Form.get("mobile").setValue(this.data?.phone);
    this.Form.get("tec_mail").setValue(this.data?.teacher?.tecMail);
    this.Form.get("tec_address").setValue(this.data.teacher?.tecAddress);
    this.Form.get("add_duty").setValue(this.data?.teacher?.addDuty);
    this.Form.get("net_set1").setValue(this.data?.teacher?.entranceQualification[1]?.name);
    this.Form.get("y_of_pass21").setValue(this.data?.teacher?.entranceQualification[1]?.yearOfPassing);
    this.Form.get("subject11").setValue(this.data?.teacher?.entranceQualification[1]?.subject);
    this.Form.get("grade21").setValue(this.data?.teacher?.entranceQualification[1]?.grade);
     this.fetchData();
     console.log("Papaers",this.papers);
     this.fetchConfP();
     console.log("CONFP",this.confpapers);
     this.fetchConfA();
     console.log("CONFA",this.confattend);
     this.fetchBook();
     console.log("Book",this.bookT);
     console.log("Prod",this.proceeding);
     this.fetchRproject();
     console.log("Book",this.rproject);
     this.fetchRstudent();
     console.log("Student",this.studentR);
     this.fetchBody();
     console.log("Student",this.bodyA);

  }
///Research Papers:
fetchData() {
  this.service.getUserWithUserId().subscribe((user: any) => {
    this.service.getData("/research-publication/teacher/" + this.teach).subscribe((res: any) => {
      console.log(res);
      res.forEach((element, i) => {
        this.papers.push({
          user: element,
         // streamClass: programDetail.programClass
        });
      });
    
      const getPos:any = this.compute_rp(res);
      getPos.then((response: any) => {
        this.dataSource_rp = new MatTableDataSource(
          JSON.parse(
            JSON.stringify(response)
          )
        );
        console.log(this.dataSource_rp.data)
                // this.dataSource_rp.paginator = this.paginator;
            //  this.dataSource.sort = this.sort;
      });
    }, (err: any) => {
      alert(err.error?.message);
    });
    
  }, (err: any) => {
    console.warn(err);
  });
}

async compute_rp(data: any) {
  return new Promise(resolve => {
            for (var i = 0; i < data.length; i++) {
                      data[i].pos = i + 1;
                      if (i == data.length - 1) {
                                resolve(data);
                      }
            }
  });
}

fetchConfP() {
  this.service.getUserWithUserId().subscribe((user: any) => {
    this.service.getData("/paper-presented/teacher/" + this.teach).subscribe((res: any) => {
      console.log(res);
      res.forEach((element, i) => {
        this.confpapers.push({
          user: element,
         // streamClass: programDetail.programClass
        });
      });
    
      const getPos:any = this.compute_rp(res);
      getPos.then((response: any) => {
        this.dataSource_rp = new MatTableDataSource(
          JSON.parse(
            JSON.stringify(response)
          )
        );
        console.log(this.dataSource_rp.data)
                // this.dataSource_rp.paginator = this.paginator;
            //  this.dataSource.sort = this.sort;
      });



    }, (err: any) => {
      alert(err.error?.message);
    });
    
  }, (err: any) => {
    console.warn(err);
  });
}

fetchConfA() {
  this.service.getUserWithUserId().subscribe((user: any) => {
    this.service.getData("/faculty-seminar/teacher/" +  this.teach).subscribe((res: any) => {
      console.log(res);
      res.forEach((element, i) => {
        if(element.facultySeminarLevel=='National' ||element.facultySeminarLevel=='International')
     {  this.confattend.push({
          user: element,
         // streamClass: programDetail.programClass
        });
      } else
      {
        this.confattendS.push({
          user: element,
         // streamClass: programDetail.programClass
        });
      }
     });
    
      const getPos:any = this.compute_rp(res);
      getPos.then((response: any) => {
        this.dataSource_rp = new MatTableDataSource(
          JSON.parse(
            JSON.stringify(response)
          )
        );
        console.log(this.dataSource_rp.data)
                // this.dataSource_rp.paginator = this.paginator;
            //  this.dataSource.sort = this.sort;
      });
    }, (err: any) => {
      alert(err.error?.message);
    });
    
  }, (err: any) => {
    console.warn(err);
  });
}
//Book publication
fetchBook() {
  this.service.getUserWithUserId().subscribe((user: any) => {
    this.service.getData("/book-publication/teacher/" +  this.teach).subscribe((res: any) => {
      console.log(res);
      res.forEach((element, i) => {
        if(element.bookType=='Proceeding')
     {  this.proceeding.push({
          user: element,
         // streamClass: programDetail.programClass
        });
      } else
      {
        this.bookT.push({
          user: element,
         // streamClass: programDetail.programClass
        });
      }
     });
    
      const getPos:any = this.compute_rp(res);
      getPos.then((response: any) => {
        this.dataSource_rp = new MatTableDataSource(
          JSON.parse(
            JSON.stringify(response)
          )
        );
        console.log(this.dataSource_rp.data)
                // this.dataSource_rp.paginator = this.paginator;
            //  this.dataSource.sort = this.sort;
      });
    }, (err: any) => {
      alert(err.error?.message);
    });
    
  }, (err: any) => {
    console.warn(err);
  });
}
//Research Projects
fetchRproject() {
  this.service.getUserWithUserId().subscribe((user: any) => {
    this.service.getData("/research-project/teacher/" +  this.teach).subscribe((res: any) => {
      console.log(res);
      res.forEach((element, i) => {
        
     {  this.rproject.push({
          user: element,
         // streamClass: programDetail.programClass
        });
      } 
     });
    
      const getPos:any = this.compute_rp(res);
      getPos.then((response: any) => {
        this.dataSource_rp = new MatTableDataSource(
          JSON.parse(
            JSON.stringify(response)
          )
        );
        console.log(this.dataSource_rp.data)
                // this.dataSource_rp.paginator = this.paginator;
            //  this.dataSource.sort = this.sort;
      });
    }, (err: any) => {
      alert(err.error?.message);
    });
    
  }, (err: any) => {
    console.warn(err);
  });
}

fetchRstudent() {
  this.service.getUserWithUserId().subscribe((user: any) => {
    this.service.getData("/research-student/user/" +  this.userteacher).subscribe((res: any) => {
      console.log("LENGHT",res);
           
      for(let j=0;j<res.length;j++){
        this.projectList.push({
          user: res[j],
         // streamClass: programDetail.programClass
        });
      }
       console.log("MY",this.projectList); 
     this.projectList.forEach((element, i) => {
           this.studentR.push({
           element,
           phddecl:element.user.phdDeclarations,
           phdreg:element.user.phdRegisteredStudents,
                      
        //    team.push
        //    team: element.phdRegisteredStudents,
        //    bheam:element.phdDeclarations,
        //  // streamClass: programDetail.programClass
        });
      
     });
     this.studentR.forEach((element,i)=>{
  this.studentD.push({
    user:element,
    team: element.phdreg,
    bheam:element.phddecl,
  })

     }); 
     
    console.log("Final", this.studentD);
    this.studentD.forEach((element,i)=>{
     if(this.studentD[i].team.length!=0){
    this.register.push({
      registered:element.team,
      
      // declared:element.bheam

    })
  }
  })
   console.log("Registered",this.register)

   this.studentD.forEach((element,i)=>{
    if(this.studentD[i].bheam.length!=0){
   this.declaration.push({
     declared:element.bheam
     
     
     // declared:element.bheam

   })
 }
  })

 console.log("Declared",this.declaration)
 this.declaration.forEach((element,i)=>{
  for(let j=0;j<this.declaration.length;j++)
  { if(element.declared[j]!=undefined)
   this.declFinal.push({
   declared:element.declared[j]
         // declared:element.bheam

 })
  }
})
console.log("Declared Final",this.declFinal)
  
      const getPos:any = this.compute_rp(res);
      getPos.then((response: any) => {
        this.dataSource_st = new MatTableDataSource(
          JSON.parse(
            JSON.stringify(response)
          )
        );
        console.log("Research",this.dataSource_st.data)
                // this.dataSource_rp.paginator = this.paginator;
            //  this.dataSource.sort = this.sort;
      });
    }, (err: any) => {
      alert(err.error?.message);
    });
    
  }, (err: any) => {
    console.warn(err);
  });
}
///Academic body participation

fetchBody() {
  this.service.getUserWithUserId().subscribe((user: any) => {
    this.service.getData("/academic-participation/teacher/" + this.teach).subscribe((res: any) => {
      console.log("Academic Body",res);
      res.forEach((element, i) => {
        if(element.academicBody!="")
        {  this.bodyA.push({
          user: element,
         // streamClass: programDetail.programClass
        });
          } 
     });
    
      const getPos:any = this.compute_rp(res);
      getPos.then((response: any) => {
        this.dataSource_rp = new MatTableDataSource(
          JSON.parse(
            JSON.stringify(response)
          )
        );
        console.log(this.dataSource_rp.data)
                // this.dataSource_rp.paginator = this.paginator;
            //  this.dataSource.sort = this.sort;
      });
    }, (err: any) => {
      alert(err.error?.message);
    });
    
  }, (err: any) => {
    console.warn(err);
  });
}




report5(){
 
  var data = document.getElementById('print');  
  html2canvas(data, { useCORS: true, allowTaint: true, scrollY: 0, scale:3 }).then((canvas) => {
    const image = { type: 'jpeg', quality: 1.4 };
    const margin = [0.5, 0.5];
    const filename = 'myfile.pdf';

    var imgWidth = 8.27;
    var pageHeight = 11.75;

    var innerPageWidth = imgWidth - margin[0] * 2;
    var innerPageHeight = pageHeight - margin[1] * 3.5;

    // Calculate the number of pages.
    var pxFullHeight = canvas.height;
    var pxPageHeight = Math.floor(canvas.width * (0.9*pageHeight / imgWidth));
    var nPages = Math.ceil(pxFullHeight / pxPageHeight);

    // Define pageHeight separately so it can be trimmed on the final page.
    var pageHeight = innerPageHeight;

    // Create a one-page canvas to split up the full image.
    var pageCanvas = document.createElement('canvas');
    var pageCtx = pageCanvas.getContext('2d');
    pageCanvas.width = canvas.width;
    pageCanvas.height = pxPageHeight;

    // Initialize the PDF.
    var pdf = new jsPDF('p', 'in', [8.27, 11.75]);
    for (var page = 0; page < nPages; page++) {
      // Trim the final page to reduce file size.
      if (page === nPages - 1 && pxFullHeight % pxPageHeight !== 0) {
        pageCanvas.height = pxFullHeight % pxPageHeight;
        pageHeight = (pageCanvas.height * innerPageWidth) / pageCanvas.width;
      }
      // Display the page.
      var w = pageCanvas.width;
      var h = pageCanvas.height;
      pdf.setFontSize(8)
      pageCtx.fillStyle = 'white';
      pageCtx.fillRect(0, 0, w, h);
      pageCtx.drawImage(canvas, 0, page * pxPageHeight, w, h, 0, 0, w, h);

      // Add the page to the PDF.
      if (page > 0) pdf.addPage();
      // debugger;
      var imgData = pageCanvas.toDataURL('image/' + image.type, image.quality);
      pdf.addImage(imgData, image.type, margin[1], margin[0]+0.2, innerPageWidth, pageHeight);
     
      // pdf.text( '||  ' +this.college,margin[0]+0.2,11,null,null);
      pdf.text(String(page+1) + '  ||',8.5-0.6,11,null,null);
    }

    pdf.save('Bio-data 0f'+this.data.firstName+" "+ this.data.lastName+'.pdf');
 
});
}

///pdfMake user
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
