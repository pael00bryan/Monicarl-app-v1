import { first } from 'rxjs/operators';
import { User, Admin } from './../../models/account.model';
import { async } from 'rxjs';
import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  supabase: SupabaseClient = createClient(
    environment.supabaseUrl,
    environment.supabaseKey
  );

  constructor() {}

  // USER

  async getUser() {
    const { data, error } = await this.supabase.from<User>('users').select('*');
    return { data, error };
  }

  async addUser(user: User) {
    const { data, error } = await this.supabase
      .from<User>('users')
      .insert(user);
    return { data, error };
  }

  async getUsers() {
    const { data: users, error } = await this.supabase
      .from<User>('users')
      .select('*');
    return { users, error };
  }

  async getUserCount() {
    const { data, count, error } = await this.supabase
      .from('users')
      .select('*', { count: 'exact' });
    return { data, count, error };
  }

  async updateUser(
    id: string,
    firstname: string,
    middlename: string,
    lastname: string,
    username: string,
    password: string,
    cellnumber: string,
    birthdate: Date
  ) {
    const { data, error } = await this.supabase
      .from('users')
      .update({
        firstname: firstname,
        middlename: middlename,
        lastname: lastname,
        username: username,
        password: password,
        cellnumber: cellnumber,
        birthdate: birthdate
      })
      .eq('id', id);
    return { data, error };
  }

  async getUserId() {
    let { data: users, error } = await this.supabase.from('users').select('id');
    return { users, error };
  }

  async deleteUser(id: string) {
    const { data: users, error } = await this.supabase
      .from('users')
      .delete()
      .eq('id', id);
    return { users, error };
  }

  // ADMIN

  async getAdmins() {
    const { data: admins, error } = await this.supabase
      .from<Admin>('admins')
      .select('*');
    return { admins, error };
  }

  async getAdminByToken(token:string){
    const { data: admins, error } = await this.supabase
    .from <Admin>('admins')
    .select('*')
    .eq('token', token)
    return { admins, error };
  }

  async getUserByToken(token:string){
    const { data: users, error } = await this.supabase
    .from <User>('users')
    .select('*')
    .eq('token', token)
    return { users, error };
  }
}
