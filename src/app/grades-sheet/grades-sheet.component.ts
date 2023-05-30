import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { AddNewIqacMeetingsComponent } from '../Addnew/add-new-iqac-meetings/add-new-iqac-meetings.component';
import { DownloadService } from '../download.service';
import { EditIqacMeetingsComponent } from '../edit/iqac/edit-iqac-meetings/edit-iqac-meetings.component';
import { ServiceService } from '../service.service';
import { AddGradeSheetComponent } from '../Addnew/add-grade-sheet/add-grade-sheet.component';

@Component({
  selector: 'app-grades-sheet',
  templateUrl: './grades-sheet.component.html',
  styleUrls: ['./grades-sheet.component.scss']
})
export class GradesSheetComponent implements OnInit {

  college;
  constructor(
    private dialog: MatDialog,
    private service: ServiceService,
    public download: DownloadService,

  ) { }

  ngOnInit(): void {
  }
  addnewgrades(){
    const dialogRef = this.dialog.open(AddGradeSheetComponent ,{width: "85%",height: "86vh",panelClass: 'full-width-dialog',data : {"meetingId":2}});
     dialogRef.afterClosed().subscribe((result : any) => {
        // this.fetchData();
     });
   }


}
