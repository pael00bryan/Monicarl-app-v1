import { SupabaseService } from './../../../auth/api/supabase/supabase.service';
import { User } from './../../../auth/models/account.model';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../../auth/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(private auth: AuthService, private api:SupabaseService) {}

  user!:User;
  users!: User[];

  ngOnInit() {
    this.api
    .getUserByToken(this.auth.getToken()!)
    .then(data => (this.users = data.users!));
  }

  logOut() {
    this.auth.logout();
  }
}
