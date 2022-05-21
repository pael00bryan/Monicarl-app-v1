import { Admin } from './../../../auth/models/account.model';
import { Component, OnInit } from '@angular/core';
import { Request, UserRequest } from './../../../auth/models/requests.model';
import { RequestsService } from './../../../auth/api/requests/requests.service';
import { SupabaseService } from './../../../auth/api/supabase/supabase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private api: RequestsService, private apiUser: SupabaseService) {}
  count!: {
    approved: number;
    declined: number;
    pending: number;
  };
  request!: Request;
  requests!: Request[];

  admin!: Admin;
  admins!: Admin[];

  approveCount!: any;
  declineCount!: any;
  userCount!: any;

  ngOnInit() {
    this.api
      .getRequestStatusApproveCount()
      .then(data => (this.approveCount = <number>data.count!));
    this.api
      .getRequestStatusDeclineCount()
      .then(data => (this.declineCount = <number>data.count!));
    this.apiUser
      .getUserCount()
      .then(data => (this.userCount = <number>data.count!));
    this.apiUser.getAdmins().then(data => this.admins = data.admins!);
  }

  getUserRequest() {
    this.api.getRequests().then(data => this.requests == data.requests);
  }
}
