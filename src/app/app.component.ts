import { Component } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'NAAC';

  htmlContent ='';

config: AngularEditorConfig = {
  editable: true,
  spellcheck: true,
  height: "15rem",
  minHeight: "5rem",
  placeholder: "Enter text here...",
  translate: "no",
  defaultParagraphSeparator: "p",
  defaultFontName: "Arial",
  toolbarHiddenButtons: [["bold"]],
  sanitize: false,
  customClasses: [
    {
      name: "quote",
      class: "quote"
    },
    {
      name: "redText",
      class: "redText"
    },
    {
      name: "titleText",
      class: "titleText",
      tag: "h1"
    }
  ]
};



}
