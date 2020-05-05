import { Component, OnInit, Input } from '@angular/core';
import { Exhibition } from 'src/app/models/exhibition';

@Component({
  selector: 'app-gallery-item',
  templateUrl: './gallery-item.component.html',
  styleUrls: ['./gallery-item.component.scss']
})
export class GalleryItemComponent implements OnInit {
  @Input() exhibition: Exhibition;
  constructor() { }

  ngOnInit(): void {
  }

}
