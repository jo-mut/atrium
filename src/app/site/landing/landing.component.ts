import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {

  }

  navigateToGallery() {
    this.router.navigateByUrl('/site/exhibitions');
  }

  navigateToRegistration() {
    this.router.navigateByUrl('auth/sign-in');
  }


}
