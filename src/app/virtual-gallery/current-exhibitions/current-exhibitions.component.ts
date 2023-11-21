import { Component, OnInit } from '@angular/core';
import { AFRAME } from 'aframe';
import { ActivatedRoute, Router } from "@angular/router";
import * as THREE from 'three';
import { DbOperationsService } from 'src/app/services/db-operations.service';
import { ArtWork } from 'src/app/models/artwork';
import { User } from 'src/app/models/user';



@Component({
  selector: 'app-current-exhibitions',
  templateUrl: './current-exhibitions.component.html',
  styleUrls: ['./current-exhibitions.component.scss']
})

export class CurrentExhibitionsComponent implements OnInit {

  images: ArtWork[] = [];
  videos: ArtWork[] = [];
  imageUsers: string[] = [];
  videoUsers: string[] = [];

  splash = '';
  id: number = 1595330004864;


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
      this.playVideoWhenUserEntersRoom();

    }

  }

  getExhibitions() {
    this.dbOperations.artworksCollection()
      .ref.where('status', '==', 'exhibited')
      .onSnapshot(data => {
        data.docChanges().map(e => {
          const artwork = e.doc.data() as ArtWork;
          const id = e.doc.id;

          return { ...artwork }
        });
      })

  }

  getGalleryVideo() {
    this.router.navigateByUrl('/project/home/' + this.id);

  }


  getImages() {
    this.dbOperations.artworksCollection()
      .ref.where('type', '==', 'image').where('status', '==', 'exhibited')
      .onSnapshot(data => {
        this.images = data.docChanges().map(e => {
          const artwork = e.doc.data() as ArtWork;
          const id = e.doc.id;
          console.log(artwork.id + 'images id')
          this.getExhibitingImageProfiles(artwork.userId)
          return artwork;
        });
        console.log(this.images.length + ' images')
      })
  }

  getVideos() {
    this.dbOperations.artworksCollection()
      .ref.where('type', '==', 'video').where('status', '==', 'exhibited')
      .onSnapshot(data => {
        this.videos = data.docChanges().map(e => {
          const artwork = e.doc.data() as ArtWork;
          const id = e.doc.id;
          console.log(artwork.id + ' video id')
          this.getExhibitingVideoProfiles(artwork.userId)
          return artwork;

        });
        console.log(this.videos.length + ' videos')
      })
  }

  getExhibitingVideoProfiles(userId: string) {
    this.dbOperations.usersCollection()
      .ref.where('userId', '==', userId)
      .onSnapshot(data => {
        data.docChanges().map(e => {
          const user = e.doc.data() as User;
          const id = e.doc.id;
          console.log(user.code + ' user code')
          let firstName =  user.firstName;
          let lastName = user.lastName;
          let fullname = firstName + ' ' + lastName
          this.videoUsers.push(fullname)
          return user;

        });
        console.log(this.videos.length + ' users')
      })
  }


  getExhibitingImageProfiles(userId: string) {
    this.dbOperations.usersCollection()
      .ref.where('userId', '==', userId)
      .onSnapshot(data => {
        data.docChanges().map(e => {
          const user = e.doc.data() as User;
          const id = e.doc.id;
          let firstName =  user.firstName;
          let lastName = user.lastName;
          let fullname = firstName + ' ' + lastName
          this.imageUsers.push(fullname)
          console.log(user.code + ' user code')
          return user;

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
        4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
        4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
        4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
        4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
        4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
        4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
        4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
        4, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
        4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
        4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
        4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
        4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
        4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
        4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
        4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
        4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
        4, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
        4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
        4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4,

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

    // AFRAME.registerComponent('videoplayer', {
    //   init: function () {
    //     let videoplay = () => {
    //       console.log('i was clicked')
    //       this.videosource.play();

    //     }

    //     this.el.addEventListener('click', videoplay);

    //   }
    // });

    // AFRAME.registerComponent('videopause', {
    //   init: function () {
    //     let videopause = () => {
    //       this.videosource.play();
    //       console.log('i was clicked')
    //     }

    //     this.el.addEventListener('click', videopause);

    //   }
    // });




    let vid1 = <any>document.getElementById('theaterVideo1');
    let vid2 = <any>document.getElementById('theaterVideo2');
    let vid3 = <any>document.getElementById('theaterVideo3');
    let vid4 = <any>document.getElementById('theaterVideo4');
    let vid5 = <any>document.getElementById('theaterVideo5');
    let vid6 = <any>document.getElementById('theaterVideo6');
    let vid7 = <any>document.getElementById('theaterVideo7');
    let vid8 = <any>document.getElementById('theaterVideo8');
    let vid9 = <any>document.getElementById('theaterVideo9');
    let vid10 = <any>document.getElementById('theaterVideo10');
    let vid11 = <any>document.getElementById('theaterVideo11');
    let vid12 = <any>document.getElementById('theaterVideo12');


    vid1.pause();
    vid2.pause();
    vid3.pause();
    vid4.pause();
    vid5.pause();
    vid6.pause();
    vid7.pause();
    vid8.pause();
    vid9.pause();
    vid10.pause();
    vid11.pause();
    vid12.pause();
    // AFRAME.registerComponent('listener', {

    //   init: function () {
    //     const userPosition = this.el.getAttribute('position')["z"];

    //     if (userPosition <= 16) {
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
