import { Component, Input, OnInit } from '@angular/core';
import { ArtWork } from 'src/app/models/artwork';

@Component({
  selector: 'app-filter-item',
  templateUrl: './filter-item.component.html',
  styleUrls: ['./filter-item.component.scss']
})
export class FilterItemComponent implements OnInit {

  @Input() artwork: ArtWork;

  category: string;
  url: string;
  date: string;
  country: string;
  

  constructor() { }

  ngOnInit(): void {
    if(this.artwork.type === 'image') {
      this.category = 'Photography'
    }

    if(this.artwork.type === 'video') {
      this.category = 'Videography'
    }

    this.url = this.artwork.url;
    this.date = this.artwork.shotDate;
    this.country = this.artwork.place;
  }

}
