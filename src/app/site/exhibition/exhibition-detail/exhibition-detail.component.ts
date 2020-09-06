import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DbOperationsService } from 'src/app/services/db-operations.service';
import { ArtWork } from 'src/app/models/artwork';
import { AFRAME } from 'aframe';


@Component({
  selector: 'app-exhibition-detail',
  templateUrl: './exhibition-detail.component.html',
  styleUrls: ['./exhibition-detail.component.scss']
})
export class ExhibitionDetailComponent implements OnInit {
  // @ViewChild('theaterVideo') videoPlayer: any;

  exhibitions: ArtWork[] = [];
  id: number;
  constructor(private route: ActivatedRoute, private router: Router,
    private dbOperations: DbOperationsService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      // this.getExhibition(this.id.toString());
      this.generate();
      this.playVideoWhenUserEntersRoom();
    });

  }

  getSelectedArtwork(artwork: ArtWork) {
    this.router.navigateByUrl('/main/exhibition/exhibition-detail/' + artwork.id);
  }

  getExhibition(id: string) {
    let exhibitions = this.exhibitions;
    this.dbOperations.getExhibitionDetail()
      .ref.where('id', '==', id).onSnapshot(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          const data = doc.data();
          const id = doc.id;
          let work = { id, ...data } as ArtWork;
          exhibitions.push(work);
          console.log({ ...work })
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
        0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0,
        0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0,
        0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0,
        0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0,
        0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0,
        0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0,
        0, 4, 4, 4, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0,
        4, 0, 0, 0, 4, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0,
        4, 0, 0, 0, 4, 4, 4, 1, 0, 8, 0, 0, 0, 0, 0, 1, 0, 0, 0,
        4, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0,
        0, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0
      ],
      "height": 19,
      "width": 19
    }


    document.querySelector('a-scene').addEventListener('render-target-loaded', () => {
      const WALL_SIZE = 3;
      const WALL_HEIGHT = 12;
      const el = document.querySelector('#walls');
      let playerPos

      for (var x = 0; x < map.height; x++) {
        for (var y = 0; y < map.width; y++) {

          const i = (y * map.width) + x;
          const position = `${((x - (map.width / 2)) * WALL_SIZE)} 1.5 ${(y - (map.height / 2)) * WALL_SIZE}`;

          // if the number is 1 - 4, create a wall
          if (map.data[i] === 1 || map.data[i] == 2 || map.data[i] === 3 || map.data[i] === 4) {
            let wall = document.createElement('a-box');
            el.appendChild(wall);

            wall.setAttribute('width', WALL_SIZE.toString());
            wall.setAttribute('height', WALL_HEIGHT.toString());
            wall.setAttribute('depth', WALL_SIZE.toString());
            wall.setAttribute('position', position);

            // black wall
            if (map.data[i] === 2) {
              wall.setAttribute('color', '#000');
              wall.setAttribute('static-body', '');
            }

            // secretwall
            else if (map.data[i] === 3) {
              wall.setAttribute('color', '#fff');
              wall.setAttribute('material', 'src: #wall-secret; repeat: 4 4');
            }

            // brick wall
            else if (map.data[i] === 4) {
              wall.setAttribute('color', '#fff');
              wall.setAttribute('material', 'src: #wall-brick; repeat: 2 2');
              wall.setAttribute('static-body', '');
            }

            else { // normal walls
              wall.setAttribute('color', '#fff');
              wall.setAttribute('material', 'src: #wall; repeat: 4 4');
              wall.setAttribute('static-body', '');
            }
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


  }

}
