import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtWork } from 'src/app/models/artwork';
import { DbOperationsService } from 'src/app/services/db-operations.service';

@Component({
  selector: 'app-vr-video',
  templateUrl: './vr-video.component.html',
  styleUrls: ['./vr-video.component.scss']
})
export class VrVideoComponent implements OnInit {

  video = '';
  id: number;

  constructor(
    private route: ActivatedRoute,
    public dbOperations: DbOperationsService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.getVideos(this.id.toString());
      this.generate();
    });
  }

  getVideos(videoId: string) {
    console.log(videoId)
    this.dbOperations.artworksCollection()
      .ref.where('type', '==', 'video')
      .onSnapshot(data => {
        data.docChanges().map(e => {
          const data = e.doc.data()  as ArtWork;
          this.video = data.url;
          console.log({...data })
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
        4, 1, 1, 1, 1, 1, 1, 1, 2,
        4, 0, 0, 0, 0, 0, 0, 0, 2,
        4, 0, 0, 0, 0, 0, 0, 0, 2, 
        4, 0, 0, 0, 0, 0, 0, 0, 2, 
        4, 0, 0, 0, 0, 0, 0, 0, 2,
        4, 0, 0, 0, 0, 0, 0, 0, 2, 
        4, 0, 0, 0, 8, 0, 0, 0, 2, 
        4, 0, 0, 0, 0, 0, 0, 0, 2, 
        4, 0, 0, 0, 0, 0, 0, 0, 2,
      

      ],
      "height": 9,
      "width": 9
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

}
