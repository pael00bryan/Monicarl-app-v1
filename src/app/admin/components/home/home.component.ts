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
  constructor( private api: RequestsService, private apiUser : SupabaseService ) {}
   count!: {
    approved: number;
    declined: number;
    pending: number;
  }
  request!: Request;
  requests!: Request[];

approveCount!: any;
declineCount!:any;
userCount!:any;

  ngOnInit() {
    this.api.getRequestStatusApproveCount().then(data => this.approveCount = <number> data.count!);
    this.api.getRequestStatusDeclineCount().then(data => this.declineCount = <number> data.count!);
    this.apiUser.getUserCount().then(data => this.userCount = <number> data.count!);
  }

  getUserRequest() {
    this.api.getRequests().then(data => this.requests == data.requests);
  }

  // statusCount() {
  //   // this.api.getRequestStatusCount().then(data => this.count.approved = <number> data.count!)
  //   let counter = 0;
  //   for( let i = 0; i < this.requests.length; i++){
  //     if(this.requests[i].status === '0'){
  //       counter + 1;
  //     }
  //   }
  //   console.log(counter, "Dunno if it really works!!!");
    
  // }
}
