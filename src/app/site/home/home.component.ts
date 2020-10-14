import { Component, HostListener, OnInit } from '@angular/core';
import { VgApiService } from '@videogular/ngx-videogular/core';
import { IMedia } from 'src/app/interfaces/imedia';
import { DbOperationsService } from 'src/app/services/db-operations.service';
import { Observable, of, Subject } from 'rxjs';

export interface HomeData {
  video: string;
  backgroundImage: string;
}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],

})
export class HomeComponent implements OnInit {

  playlist: Array<IMedia> = [
    {
      title: 'Pale Blue Dot',
      src: 'http://static.videogular.com/assets/videos/videogular.mp4',
      type: 'video/mp4'
    },
    {
      title: 'Big Buck Bunny',
      src: 'http://static.videogular.com/assets/videos/big_buck_bunny_720p_h264.mov',
      type: 'video/mp4'
    },
    {
      title: 'Elephants Dream',
      src: 'http://static.videogular.com/assets/videos/elephants-dream.mp4',
      type: 'video/mp4'
    }
  ];


  headingSize = 4;
  video = '';
  backgroundImage = '';
  currentIndex = 0;
  api: VgApiService;
  currentItem: IMedia = this.playlist[this.currentIndex];

  constructor(
    private dbOperations: DbOperationsService,
  ) {
    this.getScreenSize();

  }


  ngOnInit(): void {
    this.getHomeData();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    let width = event.target.innerWidth;
    if (width < 800) {
      this.headingSize = 1.5;
    }

    if (width > 800) {
      this.headingSize = 2.5;

    }

    if (width > 1000) {
      this.headingSize = 3;
    }

    if (width > 1200) {
      this.headingSize = 4;
    }

  }

  onPlayerReady(api: VgApiService) {
    this.api = api;
    this.api.getDefaultMedia().subscriptions
      .loadedMetadata.subscribe(this.playVideo.bind(this));
    this.api.getDefaultMedia().subscriptions.ended.subscribe(this.nextVideo.bind(this));
  }

  nextVideo() {
    this.currentIndex++;

    if (this.currentIndex === this.playlist.length) {
      this.currentIndex = 0;
    }

    this.currentItem = this.playlist[this.currentIndex];
  }

  playVideo() {
    this.api.pause();
  }

  onClickPlaylistItem(item: IMedia, index: number) {
    this.currentIndex = index;
    this.currentItem = item;
  }

  onMouseOver(): void {
    this.api.play();

  }

  onMouseOut(): void {
    this.api.pause();
  }



  getScreenSize() {
    let width = window.innerWidth;
    if (width < 800) {
      this.headingSize = 1.5;
    }

    if (width > 800) {
      this.headingSize = 2.5;

    }

    if (width > 1000) {
      this.headingSize = 3;
    }

    if (width > 1200) {
      this.headingSize = 4;
    }
  }

  getHomeData() {
    this.dbOperations.getHomePageData().snapshotChanges()
    .subscribe(e => {
      let homeData = e.payload.data() as HomeData;
      this.video = homeData.video;
      this.backgroundImage = homeData.backgroundImage;
    })
  }
}
