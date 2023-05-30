import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/service.service';

@Component({
  selector: 'app-parents-feedback',
  templateUrl: './parents-feedback.component.html',
  styleUrls: ['./parents-feedback.component.scss']
})
export class ParentsFeedbackComponent implements OnInit {


  public Form: FormGroup;
  constructor(
    private fb: FormBuilder,
    public service: ServiceService,
    public dialogRef: MatDialogRef<ParentsFeedbackComponent>,
    public dialog: MatDialog,
    public router: Router
    ) { 
      this.Form = this.fb.group({
        details: this.fb.control('',Validators.required),
        link:this.fb.control('',Validators.required),
      })
    }

  ngOnInit(): void {
  }

submitForm(){
  let finalData: any = {
    details: this.Form.get("details").value,
    link: this.Form.get("link").value
  }
  console.log(finalData);

  this.service.postData( `/parent-feedback`, finalData ).subscribe((res: any) => {
    console.log(res);
  }, (err: any) => {
    console.log(err);
    this.dialogRef.close();
  }, () => {
  this.dialogRef.close();
 });
}

}
