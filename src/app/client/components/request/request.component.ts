import { RequestsService } from './../../../auth/api/requests/requests.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {

  constructor(private api: RequestsService) { }

  ngOnInit(): void {
    
  }

}
