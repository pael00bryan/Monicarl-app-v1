import { Observable } from 'rxjs';
import { User, Admin } from './../../../auth/models/account.model';
import { SupabaseService } from './../../../auth/api/supabase/supabase.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../../../auth/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  constructor(
    private auth: AuthService,
    private router: Router,
    private api: SupabaseService
  ) {}

  admin!: Admin;
  admins!: Admin[];
  user!: User;
  users!: User[];
  position!: string;

  ngOnInit() {
    this.api.getUsers().then(data => (this.users = data.users!));
    this.api.getAdmins().then(data => (this.admins = data.admins!));

    if (this.auth.isLoggedIn()) {
      this.router.navigate([this.auth.getPosition()]);
    }
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.checkDataComparison(this.loginForm.value);
      window.location.reload();
    }
  }

  checkDataComparison(inputData: { email: string; password: string }): boolean {
    for (let user of this.users) {
      if (
        user.username == inputData.email &&
        user.password == inputData.password
      ) {
        this.auth.login(user, 'client', true);
        return true;
      }
    }
    for (let admin of this.admins) {
      if (
        admin.username == inputData.email &&
        admin.password == inputData.password
      ) {
        // console.log(admin);
        this.auth.login(admin, 'admin', true);
        return true;
      }
    }
    alert('Not a user');
    return false;
  }
}
