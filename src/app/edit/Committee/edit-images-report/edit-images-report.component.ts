import { Component, OnInit, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ServiceService } from 'src/app/service.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-images-report',
  templateUrl: './edit-images-report.component.html',
  styleUrls: ['./edit-images-report.component.scss']
})
export class EditImagesReportComponent implements OnInit {
  public Form: FormGroup;
  // public caption: FormArray = this.fb.array([]);
  // public dialogrefS: MatDialogRef<AddImagesComponent>

  urls = new Array<string>();
  photograph;
  caption;
  constructor(private fb: FormBuilder, 
    public service: ServiceService, 
    public dialogref: MatDialogRef<EditImagesReportComponent>,
    @Inject(MAT_DIALOG_DATA) public data : any,
    private http: HttpClient,) {
    this.Form = this.fb.group({
      caption:this.fb.array([]),
      // captionName: this.fb.control('',Validators.required),
   })
  }
  get captionControl() {
    this.caption = this.Form.get('caption') as FormArray;
    return this.caption.controls;
  }
  ngOnInit(): void {
    console.log("ÏMAGES",this.data);
    console.log("Captions",this.data.committeeId.photographs)
    // this.getImage();
  }
  addCaption(): void {
    this.caption = this.Form.get('caption') as FormArray;
    this.caption.push(this.createCaption());
  }
  getImage(){
    console.log("ÏMAGES 11",this.data)
    // let rowdata = this.data.row;
    // console.log("ROW",rowdata);
    this.data.committeeId.captions.forEach((element,i)=>{
      this.caption[i].caption=element.caption;
      this.caption[i].id=element.id;
    }
    )

    this.data.committeeId.photographs.forEach((element, index) => {
      this.http.get(`${this.service.BASE_URL}/resources/uploads/${element.photo}`,{responseType: 'blob'}).subscribe(data => {
        this.photograph[index] = data;
        this.photograph[index].name = element.photo;
        this.caption[index].value = element.caption;
        // this.caption[index].id=element.caption.is;

      });
     
         });
        }
    
  submitForm(){
    console.log("Caption added",this.caption.value)
    var data=[
      { id:this.caption.id,
        caption:this.caption,photograph:this.photograph}
    ]
       
    this.dialogref.close(data);
  }
  createCaption(): FormGroup {
    return this.fb.group({
      caption: this.fb.control('',Validators.required),

    });
  }
  photgraphUpload(event: any){
    this.urls = [];
    this.photograph=event.target.files
    let files = event.target.files;
    if (files) {
      for (let file of files) {
        this.addCaption();
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.urls.push(e.target.result);
        }
        reader.readAsDataURL(file);
        
      }
    }
  }



}
