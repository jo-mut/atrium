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
  videoArtworks: ArtWork[] = [];
  splash = '';
  id: number = 1595330004864;
  image = "https://firebasestorage.googleapis.com/v0/b/atrium-870a8.appspot.com/o/site-data%2Fartist%20during%20covid%2019.jpg?alt=media&token=fd448fc4-e8e3-44f3-bc0b-f9a5aaebff00";
  video = "https://firebasestorage.googleapis.com/v0/b/atrium-870a8.appspot.com/o/site%2FItsUpToUs%20Promo%20Final%20Cut.mp4?alt=media&token=e947661b-8e03-4548-b47c-3269d068be3b";
  videosource = <any>document.getElementById('theaterVideo');

  // images = [
  //   'https://firebasestorage.googleapis.com/v0/b/atrium-870a8.appspot.com/o/site-data%2Fartist%20during%20covid%2019.jpg?alt=media&token=fd448fc4-e8e3-44f3-bc0b-f9a5aaebff00',
  //   'https://firebasestorage.googleapis.com/v0/b/atrium-870a8.appspot.com/o/site-data%2Fartist%20during%20covid%2019.jpg?alt=media&token=fd448fc4-e8e3-44f3-bc0b-f9a5aaebff00',
  //   'https://firebasestorage.googleapis.com/v0/b/atrium-870a8.appspot.com/o/site-data%2Fchef%20covid%2019.jpg?alt=media&token=a0a473e6-3e1e-4e48-9bd0-ed67f31d2739',
  //   'https://firebasestorage.googleapis.com/v0/b/atrium-870a8.appspot.com/o/site-data%2Fsocial%20distance%20pandemic.jpg?alt=media&token=cd117c33-f18a-437e-979b-c3c86259abc5',
  //   'https://firebasestorage.googleapis.com/v0/b/atrium-870a8.appspot.com/o/site-data%2Fhome%20schoolind%20during%20pandemic.jpg?alt=media&token=58b1c390-d8c4-42e6-885d-a011474bb8ba',
  //   'https://firebasestorage.googleapis.com/v0/b/atrium-870a8.appspot.com/o/site-data%2Fhome%20schoolind%20during%20pandemic.jpg?alt=media&token=58b1c390-d8c4-42e6-885d-a011474bb8ba',
  //   'https://firebasestorage.googleapis.com/v0/b/atrium-870a8.appspot.com/o/site-data%2Fmothers%20covid%2019.jpg?alt=media&token=0982d57d-6afc-4857-bb3a-76c7582cc24b',
  //   'https://firebasestorage.googleapis.com/v0/b/atrium-870a8.appspot.com/o/site-data%2Fsanitizing%20during%20pandemic.jpg?alt=media&token=962e55db-4b00-4dbc-a6ab-8793a13f12d6',
  //   'https://firebasestorage.googleapis.com/v0/b/atrium-870a8.appspot.com/o/site-data%2Fcobbler%20pandemic.jpg?alt=media&token=67df849a-a8b9-40a0-adca-4a31ad2c9146',
  //   'https://firebasestorage.googleapis.com/v0/b/atrium-870a8.appspot.com/o/site-data%2Ftailor%20pandemic.jpg?alt=media&token=22f8a676-85fd-4f7a-96ed-c3624e76d6c2',
  //   'https://firebasestorage.googleapis.com/v0/b/atrium-870a8.appspot.com/o/site-data%2Fcobbler%20pandemic.jpg?alt=media&token=67df849a-a8b9-40a0-adca-4a31ad2c9146',
  //   'https://firebasestorage.googleapis.com/v0/b/atrium-870a8.appspot.com/o/site-data%2Fentrepreneur%20covid19.jpg?alt=media&token=32422549-f76c-4d37-828f-fa2af6b25509',
  //   'https://firebasestorage.googleapis.com/v0/b/atrium-870a8.appspot.com/o/site-data%2Fpicture9.png?alt=media&token=f891885d-ce11-4be1-9050-67d3d3c260fd',
  //   'https://firebasestorage.googleapis.com/v0/b/atrium-870a8.appspot.com/o/site-data%2Fsanitizing%20during%20pandemic.jpg?alt=media&token=962e55db-4b00-4dbc-a6ab-8793a13f12d6',
  //   'https://firebasestorage.googleapis.com/v0/b/atrium-870a8.appspot.com/o/site-data%2Fmwalimu.png?alt=media&token=26f2695b-6cc7-4802-93ab-7d0de530e2a9',
  //   'https://firebasestorage.googleapis.com/v0/b/atrium-870a8.appspot.com/o/site-data%2Fsocial%20distance%20pandemic.jpg?alt=media&token=cd117c33-f18a-437e-979b-c3c86259abc5',
  //   'https://firebasestorage.googleapis.com/v0/b/atrium-870a8.appspot.com/o/site-data%2Fhome%20schoolind%20during%20pandemic.jpg?alt=media&token=58b1c390-d8c4-42e6-885d-a011474bb8ba',
  // ]

  constructor(public dbOperations: DbOperationsService,
    public route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getExhibitions();
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

  getVideo(videoId: string) {
    console.log(videoId)
    this.dbOperations.artworksCollection()
      .ref.where('type', '==', 'video')
      .onSnapshot(data => {
        this.videoArtworks = data.docChanges().map(e => {
          const data = e.doc.data();
          const id = e.doc.id;
          console.log({ ...data })
          return { id, ...data } as ArtWork;
        });
      })

  }

  getVideos() {
    this.dbOperations.artworksCollection()
      .ref.where('type', '==', 'video')
      .onSnapshot(data => {
        this.videoArtworks = data.docChanges().map(e => {
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
      const WALL_HEIGHT = 15;
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
            wall.setAttribute('height', WALL_WIDTH.toString());
            wall.setAttribute('depth', WALL_SIZE.toString());
            wall.setAttribute('position', position);
            wall.setAttribute('color', '#fff');
            wall.setAttribute('material', 'src: #wall; repeat: 4 4');
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

    document.querySelector('#wall').addEventListener('mouseenter', function () {
      this.setAttribute('material', 'color', 'red');
      console.log('I was clicked!');
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
