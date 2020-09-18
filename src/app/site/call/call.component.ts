import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-call',
  templateUrl: './call.component.html',
  styleUrls: ['./call.component.scss']
})
export class CallComponent implements OnInit {
  dotAnimation: boolean = true;
  contentAnimation: boolean = true;
  size: number = 40;
  mobileWidthThreshold: number = 640;
  countries: any[] = [];

  covidPhotos: any[]= [];


  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: ['<', '>'],
    responsive: {
      0: {
        items: 1 
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }

  constructor() { }

  ngOnInit(): void {
    this.participatingCountries();
  }

  onExpand(event) {
    console.log(event);
  }

  getLandinPageImages() {
    this.covidPhotos =  [
      'assets/images/gallery/sample/cart.jpg',
      'assets/images/gallery/sample/cart.jpg',
      'assets/images/gallery/sample/cart.jpg',
      'assets/images/gallery/sample/cart.jpg',
      'assets/images/gallery/sample/cart.jpg',
      'assets/images/gallery/sample/cart.jpg',
      'assets/images/gallery/sample/cart.jpg',
      'assets/images/gallery/sample/cart.jpg'      
 
    ]
  }

  participatingCountries() {
    this.countries = [
      {
        id:1,
        flag:'assets/images/flags/kenya-flag-xl.png',
        alt:'Image_1',
        title:'Image_1',
        name: 'Kenya'
      },
      {
        id:2,
        flag:'assets/images/flags/rwanda-flag-xl.png',
        alt:'Image_2',
        title:'Image_3',
        name: 'Rwanda'

      },
      {
        id:3,
        flag:'assets/images/flags/senegal-flag-xl.png',
        alt:'Image_3',
        title:'Image_3',
        name: 'Senegal'

      },
      {
        id:4,
        flag:'assets/images/flags/tanzania-flag-xl.png',
        alt:'Image_4',
        title:'Image_4',
        name: 'Tanzania'

      },
      {
        id:5,
        flag:'assets/images/flags/uganda-flag-xl.png',
        alt:'Image_5',
        title:'Image_5',
        name: 'Uganda'
      },
      {
        id:5,
        flag:'assets/images/flags/nigeria-flag-xl.png',
        alt:'Image_5',
        title:'Image_5',
        name: 'Nigeria'
      }
    ]
  }

}
