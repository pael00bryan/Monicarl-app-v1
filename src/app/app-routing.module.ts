import { AuthGuard } from './auth/guards/auth/auth.guard';
import { ForgotPasswordComponent } from './landing-page/auth/forgot-password/forgot-password.component';
import { LoginComponent } from './landing-page/auth/login/login.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './errors/not-found/not-found.component';

const routes: Routes = [

  { path : '', component: LandingPageComponent },

  //AUTH
  { path : 'login', component: LoginComponent },
  { path : 'forgot-password', component: ForgotPasswordComponent },

  //ADMIN
  { path : 'admin', canActivate: [AuthGuard], loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule) },


  //CLIENT
  { path : 'client', canActivate: [AuthGuard], loadChildren: () => import('./client/client.module').then((m) => m.ClientModule) },

  //ERRORS
  { path : 'not-found', component: NotFoundComponent },
  { path : '**', redirectTo: '/', pathMatch: 'full' },


]

@NgModule({
  declarations: [
  ],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ]
})
export class AppRoutingModule { }