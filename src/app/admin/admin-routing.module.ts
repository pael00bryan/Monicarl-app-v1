import { UsersComponent } from './components/users/users.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RequestsComponent } from './components/requests/requests.component';
import { User } from '../auth/models/account.model';

const routes: Routes = [
  {path: '', component: DashboardComponent, 
  children:[
    { path : 'home', component: HomeComponent },
    { path : 'requests', component: RequestsComponent },
    { path : 'users', component: UsersComponent},
    { path : '', redirectTo: '/admin/home', pathMatch: 'full'},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
