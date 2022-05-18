import { SupabaseService } from './../../../auth/api/supabase/supabase.service';
import { Admin } from './../../../auth/models/account.model';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../../auth/services/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(private auth: AuthService, private api: SupabaseService) {}
  admin!: Admin;
  admins!: Admin[];

  ngOnInit() {
    this.api
      .getAdminByToken(this.auth.getToken()!)
      .then(data => (this.admins = data.admins!));
  }

  logout() {
    this.auth.logout();
  }
}
