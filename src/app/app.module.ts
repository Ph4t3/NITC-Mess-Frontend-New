import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from './shared/shared.module';
import { AgGridModule } from 'ag-grid-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppInterceptor } from './shared/utils/app-network-interceptor';

import { SignInComponent } from './pages/auth/sign-in/sign-in.component';
import { PagesComponent } from './pages/pages.component';
import { AssignMessComponent } from './pages/assign-mess/assign-mess.component';
import { ButtonRendererComponent } from './shared/components/ButtonRenderer.component';
import { ManageStudentComponent } from './pages/manage-student/manage-student.component';
import { EnrolledStudentsComponent } from './pages/enrolled-students/enrolled-students.component';
import { AddDueComponent } from './pages/add-due/add-due.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    PagesComponent,
    AssignMessComponent,
    ButtonRendererComponent,
    ManageStudentComponent,
    EnrolledStudentsComponent,
    AddDueComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    FontAwesomeModule,
    AgGridModule.withComponents([]),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
