import { Request } from './../../models/requests.model';
// import { async } from 'rxjs';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {
  
  supabase: SupabaseClient = createClient(
    environment.supabaseUrl,
    environment.supabaseKey
  );

  constructor() { }

  async getRequests(){
    const {data: requests, error} = await this.supabase
    .from <Request> ('requests')
    .select('*');
    return { requests, error };
  }

  async getRequestStatusApproveCount(){
    const {data, count, error} = await this.supabase
    .from('requests')
    .select('status',{count: 'exact'})
    .eq('status','1')
    return {data, count,error};
  }

  async getRequestStatusDeclineCount(){
    const {data, count, error} = await this.supabase
    .from('requests')
    .select('status',{count: 'exact'})
    .eq('status','2')
    return {data, count,error};
  }

  async updateRequest(id: string, requestStatus: string){
    const {data: requests, error} = await this.supabase
    .from('requests')
    .update({status: requestStatus})
    .eq('id', id);
    return { requests, error };
  }

}
