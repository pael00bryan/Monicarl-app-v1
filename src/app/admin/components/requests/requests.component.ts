import { SupabaseService } from './../../../auth/api/supabase/supabase.service';
import { User } from './../../../auth/models/account.model';
import { Request } from './../../../auth/models/requests.model';
import { RequestsService } from './../../../auth/api/requests/requests.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {
  showEntry!: any[];

  private user!: User;
  users!: User[];

  request!: Request;
  requests!: any[];

  statusSelected = ["Pending", "Approved", "Decline"];

  constructor(private api: RequestsService, private accountApi: SupabaseService) {}

  ngOnInit() {
    this.getUserRequests();
  }

  getUserRequests() {
    this.api.getRequests().then(data => (this.requests = data.requests!));
    this.accountApi.getUsers().then(data => (this.users = data.users!));
  }

  saveRequest(id: string) {
   if(this.request.id == id){
    if(this.request.status == "pending"){
      this.request.status = "0";
    }else if(this.request.status == "approve"){
      this.request.status = "1";
    }else if(this.request.status == "decline"){
      this.request.status = "2";
    }
    
    this.api.updateRequest(this.request.id,this.request.status);

   }else{
     alert("Bad Expectation")
   }
  }

  changeRequestStatus(status:any, id:string){
    this.request.status = status.target.value;
    this.request.id = id;
  }
  setRequestData(request: Request){
    this.request = request;
  }
  
  intersection(requestUser_id:string): string {
    let name: string = "Not a User";
    
    for(let x of this.users){
      if(x.id == requestUser_id){
        name =  x.firstname + " " + x.middlename + " " + x.lastname;
      }
    }
    return name;
  }
}
