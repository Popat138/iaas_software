import { Component, NgModule } from '@angular/core';
import { RouterModule, ROUTES, Routes } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { CommitteeLayoutComponent } from './layouts/committee-layout/committee-layout.component';
import { DepartmentEventLayoutComponent } from './layouts/department-event-layout/department-event-layout.component';
import { IqacLayoutComponent } from './layouts/iqac-layout/iqac-layout.component';
import { LibraryLayoutComponent } from './layouts/library-layout/library-layout.component';
import { OfficeLayoutComponent } from './layouts/office-layout/office-layout.component';
import { SuperAdminLayoutComponent } from './layouts/super-admin-layout/super-admin-layout.component';
import { SuperAdminLayoutRoutes } from './layouts/super-admin-layout/super-admin-layout.routing';
import { TeacherLayoutComponent } from './layouts/teacher-layout/teacher-layout.component';
import { LibraryComponent } from './library/library.component';
// import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { LoginComponent } from './login/login.component';
import { TeachingplanComponent } from './teachingplan/teachingplan.component';
// import { TeacherLayoutComponent } from './layout/teacher-layout/teacher-layout.component';
import { CritriaLayoutComponent } from './layouts/critria-layout/critria-layout.component';

const routes : Routes = [

  {
    path: '',
    component:  LoginComponent
  },
  {

    path: 'admin-layout',
    component: AdminLayoutComponent,
    children: [
        {
      path: '',
      loadChildren: ()=> import('./layouts/admin-layout/admin-layout.module').then(path => path.AdminLayoutModule)}]
    },
    {

      path: 'teacher-layout',
      component: TeacherLayoutComponent,
      children: [
          {
        path: '',
        loadChildren: ()=> import('./layouts/teacher-layout/teacher-layout.module').then(path => path.TeacherLayoutModule)}]
      },
      {
        path: 'committee-layout',
        component:  CommitteeLayoutComponent,
        children: [
          {
        path: '',
        loadChildren: ()=> import('./layouts/committee-layout/committee-layout.module').then(path => path.CommitteeLayoutModule)}]
      },
      {
        path: 'office-layout',
        component:  OfficeLayoutComponent,
        children: [
          {
        path: '',
        loadChildren: ()=> import('./layouts/office-layout/office-layout.module').then(path => path.OfficeLayoutModule)}]
      },

      {
        path: 'department-event-layout',
        component: DepartmentEventLayoutComponent,
        children: [
          {
        path: '',
        loadChildren: ()=> import('./layouts/department-event-layout/department-event-layout.module').then(path => path.DepartmentEventLayoutModule)}]
      },


      {
        path: 'super-admin-layout',
        component: SuperAdminLayoutComponent,
        children: [
          {
        path: '',
        loadChildren: ()=> import('./layouts/super-admin-layout/super-admin-layout.module').then(path => path.SuperAdminLayoutModule)}]
      },

      {
        path: 'iqac-layout',
        component: IqacLayoutComponent,
        children: [
          {
        path: '',
        loadChildren: ()=> import('./layouts/iqac-layout/iqac-layout.module').then(path => path.IqacLayoutModule)}]
      },
      {
        path: 'library-layout',
        component: LibraryLayoutComponent,
        children: [
          {
        path: '',
        loadChildren: ()=> import('./layouts/library-layout/library-layout.module').then(path => path.LibraryLayoutModule)}]
      },
      {
        path: 'critria-layout',
        component: CritriaLayoutComponent,
        children: [
          {
        path: '',
        loadChildren: ()=> import('./layouts/critria-layout/critria-layout.module').then(path => path.CritriaLayoutModule)}]
      },
      


]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
