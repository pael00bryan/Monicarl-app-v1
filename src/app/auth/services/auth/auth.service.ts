import { User, Admin } from './../../models/account.model';
import { SupabaseService } from './../../api/supabase/supabase.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user!: User;
  users!: User[];

  constructor(private router: Router, private UserApi: SupabaseService) {}

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getPosition(): string | null {
    return localStorage.getItem('position');
  }

  setPosition(position: string) {
    localStorage.setItem('position', position);
  }

  isLoggedIn(): boolean {
    // this.router.navigate([this.getPosition()]);
    return this.getToken() !== null;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('position');
    this.router.navigate(['login']);
  }

  login(account: User | Admin, position: string, auth: boolean) {
    if (auth) {
      this.setToken(account.token);
      this.setPosition(position);

      // console.log(account);
    }
    console.log(this.getToken());
    console.log(this.getPosition());
  }
}
