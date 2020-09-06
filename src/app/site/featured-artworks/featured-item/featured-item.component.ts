import { Component, OnInit, Input } from '@angular/core';
import { ArtWork } from 'src/app/models/artwork';
import { VgApiService } from '@videogular/ngx-videogular/core';
import { IMedia } from 'src/app/interfaces/imedia';

@Component({
  selector: 'app-featured-item',
  templateUrl: './featured-item.component.html',
  styleUrls: ['./featured-item.component.scss']
})
export class FeaturedItemComponent implements OnInit {

  @Input() work: ArtWork;
  currentIndex = 0;
  api: VgApiService;
  video: string;

  constructor() {

  }

  ngOnInit(): void {
    console.log({...this.work} + 'work')
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
