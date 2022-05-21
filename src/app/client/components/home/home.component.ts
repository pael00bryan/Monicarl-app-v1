import { FormGroup, FormControl } from '@angular/forms';
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

  requestForm = new FormGroup({
    user_id : new FormControl(''),
    loan_type : new FormControl(''),
    amount_money : new FormControl(''),
    request_reason : new FormControl(''),
    current_address : new FormControl(''),
    employment_address : new FormControl('')
  });

  ngOnInit() {
    this.api
    .getUserByToken(this.auth.getToken()!)
    .then(data => (this.users = data.users!));
  }
  
  sendRequest(){
    
  }
}
