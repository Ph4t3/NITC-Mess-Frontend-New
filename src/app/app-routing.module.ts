import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages/pages.component';
import { SignInComponent } from './pages/auth/sign-in/sign-in.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AssignMessComponent } from './pages/assign-mess/assign-mess.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'assign-mess',
        component: AssignMessComponent,
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
