import { Component, OnInit, Input } from '@angular/core';
import { ArtWork } from 'src/app/models/artwork';

@Component({
  selector: 'app-archives-item',
  templateUrl: './archives-item.component.html',
  styleUrls: ['./archives-item.component.scss']
})
export class ArchivesItemComponent implements OnInit {
  @Input() public artwork: ArtWork;
  image: any;

  constructor() { }

  ngOnInit(): void {
    console.log(this.artwork.url + ' artwork url')
  }

}
