import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { RequestComponent } from './components/request/request.component';

const routes: Routes = [
  { path : '', component: DashboardComponent, children: [
    { path: 'home', component: HomeComponent },
    { path: 'request', component: RequestComponent},
    { path: '', redirectTo: '/client/home', pathMatch: 'full' }
  ] },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
