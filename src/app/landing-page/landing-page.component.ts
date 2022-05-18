import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../auth/services/auth/auth.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private router: Router,

  ) {}
  ngOnInit() {
    if (this.auth.isLoggedIn()) {
      this.router.navigate([this.auth.getPosition()]);
    }
  }
}
