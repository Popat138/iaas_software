import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';


@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  constructor() { }

  //Export Data
  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    // console.log('worksheet',worksheet);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    XLSX.writeFile(workbook, excelFileName+'.xlsx', {
      bookType: "xlsx",
      type: "buffer"
    });
  }

  // Print Common
  printChart(id, event, name) {
    var eventHref = event.currentTarget;
    var url = document.getElementById(id) as HTMLCanvasElement;
    var dataURL = url.toDataURL("image/png");
    eventHref.download = name + ".png";
    eventHref.href = dataURL;
  }

  //Export to pdf
  exportAsPdfFile(data, name){
    // parentdiv is the html element which has to be converted to PDF
    html2canvas(data).then(canvas => {

      var pdf = new jsPDF('p', 'pt', [canvas.width, canvas.height]);

      var imgData  = canvas.toDataURL("image/jpeg", 1.0);
      pdf.addImage(imgData,0,0,canvas.width, canvas.height);
      pdf.save(name+'.pdf');

    });
  }
}
