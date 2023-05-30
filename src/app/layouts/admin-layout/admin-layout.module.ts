import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
//import { LibraryComponent } from "src/app/library/library.component";
import { AdminLayoutRoutes } from "./admin-layout.routing";
import {MatSidenavModule} from '@angular/material/sidenav';
import { AdminLayoutComponent } from "./admin-layout.component";
import { MaterialModule } from 'src/app/material';

@NgModule({

  imports:[
    CommonModule,
    MatSidenavModule,
    MaterialModule,
    RouterModule.forChild(AdminLayoutRoutes)
  ],
  declarations:[
    AdminLayoutComponent
  ]
})

export class AdminLayoutModule {}
