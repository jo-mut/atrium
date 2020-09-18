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
  video: string;

  constructor() {
  }

  ngOnInit(): void {
    console.log({...this.work} + 'work');
    this.video = this.work.url;
  }

  onPlayerReady(api: VgApiService) {
    this.api = api;
    this.api.getDefaultMedia().subscriptions.loadedMetadata.subscribe(this.playVideo.bind(this));
  }

  playVideo() {
    this.api.play();
  }

}
