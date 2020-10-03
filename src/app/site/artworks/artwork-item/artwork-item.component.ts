import {Component, Input, OnInit} from '@angular/core';
import {VgApiService} from "@videogular/ngx-videogular/core";
import { ArtWork } from 'src/app/models/artwork';

@Component({
  selector: 'app-artwork-item',
  templateUrl: './artwork-item.component.html',
  styleUrls: ['./artwork-item.component.scss']
})
export class ArtworkItemComponent implements OnInit {

  @Input() work: ArtWork;
  api: VgApiService;
  video = '';

  constructor() {
  }

  ngOnInit(): void {
    if(this.work.type === 'video') {
      this.video = this.work.url;
    console.log(this.video + 'work');
    }
  }

  onPlayerReady(api: VgApiService) {
    this.api = api;
    this.api.getDefaultMedia().subscriptions.loadedMetadata.subscribe(this.playVideo.bind(this));
  }

  playVideo() {
    this.api.pause();
  }

  onMouseOver(): void {
    this.api.play();
  }

  onMouseOut(): void {
    this.api.pause();
  }

}
