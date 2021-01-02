import { Component, OnInit } from '@angular/core';
import { AFRAME } from 'aframe';
import { ActivatedRoute, Router } from "@angular/router";
import { ArtWork } from '../models/artwork';
import { DbOperationsService } from '../services/db-operations.service';


@Component({
  selector: 'app-virtual-gallery',
  templateUrl: './virtual-gallery.component.html',
  styleUrls: ['./virtual-gallery.component.scss']
})
export class VirtualGalleryComponent implements OnInit {

  images: ArtWork[] = [];
  videos: ArtWork[] = [];
  splash = '';
  id: number = 1595330004864;
  // video = "https://firebasestorage.googleapis.com/v0/b/atrium-870a8.appspot.com/o/site%2FItsUpToUs%20Promo%20Final%20Cut.mp4?alt=media&token=e947661b-8e03-4548-b47c-3269d068be3b";
  videosource = <any>document.getElementById('theaterVideo');


  constructor(public dbOperations: DbOperationsService,
    private router: Router,
    public route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getImages();
    this.getVideos();
    this.generate()
    let scene = <any>document.querySelector('a-scene');
    if (scene && scene.hasLoaded) {
      // scene is loaded
      this.playVideoWhenUserEntersRoom()
    }

  }

  getExhibitions() {
    this.dbOperations.artworksCollection()
      .ref.where('status', '==', 'exhibit')
      .onSnapshot(data => {
        this.images = data.docChanges().map(e => {
          const data = e.doc.data() as ArtWork;
          const id = e.doc.id;

          return { ...data }
        });
      })

  }

  getGalleryVideo() {
    this.router.navigateByUrl('/project/home/' + this.id);

  }


  getImages() {
    this.dbOperations.artworksCollection()
      .ref.where('type', '==', 'image').where('status', '==', 'exhibit')
      .onSnapshot(data => {
        this.images = data.docChanges().map(e => {
          const data = e.doc.data();
          const id = e.doc.id;
          return { id, ...data } as ArtWork;
        });
        console.log(this.images.length + ' videos')
      })
  }

  getVideos() {
    this.dbOperations.artworksCollection()
      .ref.where('type', '==', 'video').where('status', '==', 'exhibit')
      .onSnapshot(data => {
        this.videos = data.docChanges().map(e => {
          const data = e.doc.data();
          const id = e.doc.id;
          console.log({ ...data } + 'videos')
          return { id, ...data } as ArtWork;
        });
      })
  }

  generate() {
    // This wall-generator was inspiried by Shane Hudon's post
    // https://24ways.org/2016/first-steps-in-vr/

    // Walls generator
    // This will auto generate a map. Right now it needs to be an equal height and width
    // Numbers are used to create the map

    // NUMBER KEY:
    // 0 = no walls
    // 1 = normal wall
    // 2 = black wall
    // 3 = secret wall
    // 4 = brick walls
    // 8 = user start position
    // 9 = console log position


    const map = {
      "data": [


        4, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4,
        4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
        4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
        4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
        4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
        4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
        4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
        4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
        4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
        4, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4,
        4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
        4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
        4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
        4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
        4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
        4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
        4, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
        4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
        4, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4,
        4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
        4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
        4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
        4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
        4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
        4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
        4, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
        4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
        4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4,

      ],
      "height": 29,
      "width": 29
    }


    document.querySelector('a-scene').addEventListener('render-target-loaded', () => {

      const WALL_SIZE = 3;
      const WALL_HEIGHT = 25;
      const WALL_WIDTH = 10;

      const el = document.querySelector('#walls');
      let playerPos

      for (var x = 0; x < map.height; x++) {
        console.log(x)
        for (var y = 0; y < map.width; y++) {
          const i = (y * map.width) + x;
          const position = `${((x - (map.width) / 2) * WALL_SIZE)} 1.5 ${(y - (map.height) / 2) * WALL_SIZE}`;

          // if the number is 1 - 4, create a wall
          if (map.data[i] === 1 || map.data[i] == 2 || map.data[i] === 3 || map.data[i] === 4) {
            let wall = document.createElement('a-box');
            el.appendChild(wall);

            wall.setAttribute('width', WALL_SIZE.toString());
            wall.setAttribute('height', WALL_HEIGHT.toString());
            wall.setAttribute('depth', WALL_SIZE.toString());
            wall.setAttribute('position', position);
            wall.setAttribute('color', '#fff');
            wall.setAttribute('material', 'src: #wall; repeat: 1 1');
            wall.setAttribute('static-body', '');

          }
          // set player position if the number is a 2
          if (map.data[i] === 8) {
            playerPos = position;
          }

          if (map.data[i] === 9) {
            console.log(position);
          }
        }
      }
      document.querySelector('#player').setAttribute('position', playerPos);
    });


  }


  playVideoWhenUserEntersRoom() {

    // AFRAME.registerComponent('videoplayer', {
    //   init: function () {
    //     var sceneEl = document.querySelector('a-scene').querySelector('a-assets');
    //     var video = sceneEl.querySelector('video');
    //     var canvas = document.getElementsByClassName('a-canvas');
    //     canvas[0].addEventListener('click', function () {
    //       if (video.paused == true) {
    //         video.play();
    //       } else {
    //         video.pause();
    //       }
    //     }, false);
    //   }
    // });

    AFRAME.registerComponent('videoplayer', {
      init: function () {
        let videoplay = () => {
          console.log('i was clicked')
          this.videosource.play();

        }

        this.el.addEventListener('click', videoplay);

      }
    });

    // AFRAME.registerComponent('videopause', {
    //   init: function () {
    //     let videopause = () => {
    //       this.videosource.play();
    //       console.log('i was clicked')
    //     }

    //     this.el.addEventListener('click', videopause);

    //   }
    // });


    

    //   let vid = <any>document.getElementById('theaterVideo');
    // vid.pause();
    // AFRAME.registerComponent('listener', {

    //   init: function () {
    //     const userPosition = this.el.getAttribute('position')["z"];

    //     if(userPosition <= 16) {
    //       console.log('register component')

    //       vid.play()
    //     } else { 
    //       vid.pause()
    //     }

    //     this.el.addEventListener('mouseenter', function (evt) {
    //       vid.play();
    //     });
    //     this.el.addEventListener('mouseleave', function (evt) {
    //       console.log('mouse on video')

    //       vid.pause();
    //     });
    //   }
    // });

  }

  exitSplashDisplay() {
    // this.videosource.play();
    this.splash = 'none';
  }

}
