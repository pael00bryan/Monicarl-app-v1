import { User } from './../../../auth/models/account.model';
import { SupabaseService } from './../../../auth/api/supabase/supabase.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { AnyAaaaRecord } from 'dns';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  userFormGroup = new FormGroup({
    firstname: new FormControl(''),
    middlename: new FormControl(''),
    lastname: new FormControl(''),
    username: new FormControl(''),
    cellnumber: new FormControl(''),
    birthdate: new FormControl(''),
    password: new FormControl(''),
    token: new FormControl(uuidv4())
  });

  searchData: string = '';
  setSelectedUser!: User;

  user!: User;
  users!: User[];

  constructor(private api: SupabaseService) {}

  ngOnInit() {
    this.fetchUsers();
  }

  onDeleteRow(id: string) {
    this.api.deleteUser(id).then(data => console.log(data.error));
    this.fetchUsers();
  }

  onUpdateRow() {
    this.user.id = this.setSelectedUser.id;
    this.setSelectedUser = this.userFormGroup.value;
    this.updateUser();
    this.fetchUsers();
  }
  // GET
  fetchUsers() {
    this.api.getUsers().then(data => (this.users = data.users!));
    this.clearUser();
  }

  // CREATE
  createUser() {
    console.log(this.userFormGroup.value);
    this.api.addUser(this.userFormGroup.value);
    this.clearUser();
  }

  //UPDATE
  updateUser() {
    this.api.updateUser(
      this.user.id,
      this.setSelectedUser.firstname,
      this.setSelectedUser.middlename,
      this.setSelectedUser.lastname,
      this.setSelectedUser.username,
      this.setSelectedUser.password,
      this.setSelectedUser.cellnumber,
      this.setSelectedUser.birthdate
    );
  }

  clearUser() {
    this.user = new User();
  }

  selectedUser(user: User) {
    // console.log(this.users.filter(x => x.id === user));
    this.setSelectedUser = user;
    console.log(this.setSelectedUser);
    if (this.users.find(x => x.id === user.id)) {
      console.log(user.id);
    }
    this.clearUser();
  }
}
