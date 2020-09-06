import { Component, OnInit } from '@angular/core';
import { DbOperationsService } from './../../services/db-operations.service';
import { ArtWork } from './../../models/artwork';
import { VgApiService } from '@videogular/ngx-videogular/core';
import { IMedia } from 'src/app/interfaces/imedia';
import { OwlOptions } from 'ngx-owl-carousel-o';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  photo = "assets/images/photo.png";
  artworks: ArtWork[] = [];

  backgroundImgs = ['1.png', '2.png', '3.png'];
  chosenImage: any;
  image = "https://cdn.pixabay.com/photo/2015/09/16/08/55/online-942406_960_720.jpg";
  video = "assets/videos/kawasaki.mp4";

  mobileWidthThreshold: number = 640;
  hosts: any[] = [];
  customOptions: OwlOptions;

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

  currentIndex = 0;
  api: VgApiService;
  currentItem: IMedia = this.playlist[this.currentIndex];


  constructor(private dbOperations: DbOperationsService) { }

  ngOnInit(): void {
    this.getSampleArtworks();
    this.projectHost();
  }

  // Get a list of archived artwork
  getSampleArtworks() {
    this.dbOperations.getAllExhibitions()
      .onSnapshot(snapshot => snapshot.forEach(doc => {
        const data = doc.data();
        const id = doc.id;
        let work = { id, ...data } as ArtWork;
        this.artworks.push(work);
      }))
  }

  onPlayerReady(api: VgApiService) {
    this.api = api;
    this.api.getDefaultMedia().subscriptions.loadedMetadata.subscribe(this.playVideo.bind(this));
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
    this.api.play();
  }

  onClickPlaylistItem(item: IMedia, index: number) {
    this.currentIndex = index;
    this.currentItem = item;
  }

  getOwlOptions() {
    this.customOptions = {
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

  }

  projectHost() {
    this.hosts = [
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
        name: 'Uganda'

      },
      {
        id:5,
        flag:'assets/images/flags/uganda-flag-xl.png',
        alt:'Image_5',
        title:'Image_5',
        name: 'Uganda'
      }
    ]
  }

}
