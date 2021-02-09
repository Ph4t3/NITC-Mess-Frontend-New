import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages/pages.component';
import { SignInComponent } from './pages/auth/sign-in/sign-in.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { AssignMessComponent } from './pages/assign-mess/assign-mess.component';
import { ManageStudentComponent } from './pages/manage-student/manage-student.component';
import { EnrolledStudentsComponent } from './pages/enrolled-students/enrolled-students.component';
import { AddDueComponent } from './pages/add-due/add-due.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'enrolled-students',
      },
      {
        path: 'add-due',
        component: AddDueComponent,
      },
      {
        path: 'assign-mess',
        component: AssignMessComponent,
      },
      {
        path: 'manage-student/:id',
        component: ManageStudentComponent,
      },
      {
        path: 'manage-student',
        component: ManageStudentComponent,
      },
      {
        path: 'enrolled-students',
        component: EnrolledStudentsComponent,
      },
    ],
  },
  { path: 'sign-in', component: SignInComponent },
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
