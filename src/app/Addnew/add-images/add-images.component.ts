import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-images',
  templateUrl: './add-images.component.html',
  styleUrls: ['./add-images.component.scss']
})
export class AddImagesComponent implements OnInit {
  public Form: FormGroup;
  public caption: FormArray = this.fb.array([]);
  // public dialogrefS: MatDialogRef<AddImagesComponent>

  urls = new Array<string>();
  photograph;
  constructor(private fb: FormBuilder, public dialogref: MatDialogRef<AddImagesComponent>) {
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
  }
  addCaption(): void {
    this.caption = this.Form.get('caption') as FormArray;
    this.caption.push(this.createCaption());
  }
  submitForm(){
    var data=[
      {caption:this.caption,photograph:this.photograph}
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
