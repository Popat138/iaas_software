import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  public BASE_URL = environment.base_url;
  public UPLOAD_EXTENSION = environment.uploads_extension;

  cart: any = [];

  constructor(
    private http : HttpClient,
    private router : Router
    ) { }

  postData(extendedUrl : any, data : any): Observable<any> {
    return this.http.post(this.BASE_URL + extendedUrl, data);
  }

  putData(extendedUrl : any, data : any): Observable<any> {
    return this.http.put(this.BASE_URL + extendedUrl, data);
  }

  put(extendedUrl : any, data : any, httpHeader: any): Observable<any> {
    return this.http.put(this.BASE_URL + extendedUrl, data, httpHeader);
  }

  getData(extendedUrl : any): Observable<any> {
    return this.http.get(this.BASE_URL + extendedUrl);
  }

  get(extendedUrl : any, httpHeader: any): Observable<any> {
    return this.http.get(this.BASE_URL + extendedUrl, httpHeader);
  }

  deleteData(extendedUrl: any): Observable<any> {
    return this.http.delete(this.BASE_URL + extendedUrl)
  }

  delete(extendedUrl: any, httpHeader: any): Observable<any> {
    return this.http.delete(this.BASE_URL + extendedUrl, httpHeader);
  }

  post(extendedUrl : any, data : any, httpHeader: any): Observable<any> {
    return this.http.post(this.BASE_URL + extendedUrl, data, httpHeader);
  }

  getFile(image: string): Observable<any> {
    return this.http.get(this.BASE_URL + this.UPLOAD_EXTENSION + image, {responseType: "blob"});
  }

  getUserWithUserId(): Observable<any> {
    let userId = localStorage.getItem('userId');
    return this.getData("/user/" + userId);
    // if (userId == undefined || userId == null || userId == "") {
    //   this.router.navigateByUrl("/login");
    // }else {
    //   // this.fetchUser(userId);
    //   return this.getData("/user/" + userId);
    // }
  }

  getAcademicYear():any[]{

    let academicYear: any[] = [];
    var startYear = 1950;
    var currentYear = new Date().getFullYear()+1;
     //console.log(currentYear - startYear);
    var diff = currentYear - startYear
    for(var i = 0; i < diff ;  i++){
      var next = startYear+1;
      var year = startYear + '-' + next.toString().slice(-2);
      academicYear.push(year);
      startYear++;
    }
    academicYear.reverse();
    return academicYear;


  }


  excelToJson(event: any): Observable<any> {
    /* wire up file reader */
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
      return data;
    };
    reader.readAsBinaryString(target.files[0]);
    return null;
  }
}
