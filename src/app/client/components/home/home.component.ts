import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../../auth/services/auth/auth.service';
import { SupabaseService } from './../../../auth/api/supabase/supabase.service';
import { User } from './../../../auth/models/account.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user!: User;
  users!: User[];

  constructor(private auth: AuthService, private api: SupabaseService) {}

  ngOnInit() {
    this.api
    .getUserByToken(this.auth.getToken()!)
    .then(data => (this.users = data.users!));
  }
  
}
