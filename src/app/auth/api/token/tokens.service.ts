import { AuthService } from './../../services/auth/auth.service';
import { Injectable } from '@angular/core';
import { environment } from './../../../../environments/environment';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { User, Admin } from './../../models/account.model';


@Injectable({
  providedIn: 'root'
})
export class TokensService {
  supabase: SupabaseClient = createClient(
    environment.supabaseUrl,
    environment.supabaseKey
  );

  constructor(private api: AuthService) {  }

  //Admin
  async getAdminByToken() {
    const { data: token, error } = await this.supabase
      .from<Admin>('admins')
      .select('*')
      .eq('token',this.api.getToken()!);
    return { token, error };
  }

}
