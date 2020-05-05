import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  private hidden: boolean = false

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  showHideSidebar() {
    if (this.hidden) {
      this.hidden = false;
    }else {
      this.hidden = true;
    }
  }

  logout() {
    this.router.navigateByUrl('/sign-in')
  }


}
