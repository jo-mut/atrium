import { Component, OnInit } from '@angular/core';
import { AFRAME } from 'aframe';
import { ArtWork } from "../../models/artwork";
import { DbOperationsService } from "../../services/db-operations.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-vr-gallery',
  templateUrl: './vr-gallery.component.html',
  styleUrls: ['./vr-gallery.component.scss']
})
export class VrGalleryComponent implements OnInit {

  exhibition: ArtWork = new ArtWork();
  id: number = 1595330004864;
  image = "https://firebasestorage.googleapis.com/v0/b/atrium-870a8.appspot.com/o/site-data%2Fartist%20during%20covid%2019.jpg?alt=media&token=fd448fc4-e8e3-44f3-bc0b-f9a5aaebff00";

  constructor(public dbOperations: DbOperationsService,
    public route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getExhibitionDetail(this.id.toString());
    this.generate()
    this.playVideoWhenUserEntersRoom();
  }

  getExhibitionDetail(id: string) {
    this.dbOperations.artworksCollection()
      .ref.where('id', '==', id).onSnapshot(data => {
        data.docs.forEach(d => {
          const id = d.id;
          const work = d.data() as ArtWork;
          this.exhibition = work;
          console.log(work.url);
        })
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
        4, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 4,
        4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
        4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
        4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
        4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
        4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
        4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
        4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
        4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
        4, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 4,
        4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
        4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
        4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
        4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
        4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
        4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
        4, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 4,
        4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
        4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 4, 
   
      
      ],
      "height": 19,
      "width": 19
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
  }

  playVideoWhenUserEntersRoom() {
    // play video when user enters room. Pause when leaving
    const videoPlayer = <any>document.getElementById('theaterVideo');
    videoPlayer.pause();
    AFRAME.registerComponent('listener', {
      tick: function () {
        const userPosition = this.el.getAttribute('position')["z"];
        if (userPosition <= -17) {
          this.videoPlayer.play();
        } else {
          this.videoPlayer.pause();
        }
      }
    });

    const enterButton = document.querySelector('.splash__button')
    const splash = document.querySelector('.splash');

    enterButton.addEventListener('click', () => {
      videoPlayer.play();
      videoPlayer.pause();
      // splash.style.display = 'none';
    });

  }


}
