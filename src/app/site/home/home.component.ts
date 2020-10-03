import { Component, HostListener, OnInit } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],

})
export class HomeComponent implements OnInit {
  countries: any[] = [];

  headingSize = 4;

  constructor() {
    this.getScreenSize();

  }


  ngOnInit(): void {
    this.participatingCountries();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    let width = event.target.innerWidth;
    if (width < 800) {
      this.headingSize = 1.5;
    } 

    if(width > 800) {
      this.headingSize = 2.5;

    } 

    if (width > 1000) {
      this.headingSize = 3;
    }

    if (width > 1200) {
      this.headingSize = 4;
    }

  }

  getScreenSize() {
    let width = window.innerWidth;
    if (width < 800) {
      this.headingSize = 1.5;
    } 

    if(width > 800) {
      this.headingSize = 2.5;

    } 

    if (width > 1000) {
      this.headingSize = 3;
    }

    if (width > 1200) {
      this.headingSize = 4;
    }
  }


  participatingCountries() {
    this.countries = [
      {
        id:1,
        flag:'assets/images/flags/kenya-flag-xl.png',
        name: 'Kenya'
      },
      {
        id:2,
        flag:'assets/images/flags/rwanda-flag-xl.png',
        name: 'Rwanda'

      },
      {
        id:3,
        flag:'assets/images/flags/senegal-flag-xl.png',
        name: 'Senegal'

      },
      {
        id:4,
        flag:'assets/images/flags/ghana-flag-xl.png',
        name: 'Ghana'

      },
      {
        id:5,
        flag:'assets/images/flags/uganda-flag-xl.png',
        name: 'Uganda'
      },
      {
        id:6,
        flag:'assets/images/flags/nigeria-flag-xl.png',
        name: 'Nigeria'
      },
      {
        id:7,
        flag:'assets/images/flags/ethiopia-flag-xl.png',
        name: 'Ethiopia'
      }
    ]
  }
 
}
