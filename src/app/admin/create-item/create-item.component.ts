import { Component, OnInit, Input } from '@angular/core';
import { ArtWork } from 'src/app/models/artwork';

@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.scss']
})
export class CreateItemComponent implements OnInit {
  @Input() exhibition: ArtWork;
  constructor() { }
  ngOnInit(): void {
    console.log({...this.exhibition})
  }

}
