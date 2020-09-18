import { Component, OnInit, Input } from '@angular/core';
import { ArtWork } from 'src/app/models/artwork';
import { DbOperationsService } from 'src/app/services/db-operations.service';
import { ActivatedRoute } from '@angular/router';
import { VgApiService } from '@videogular/ngx-videogular/core';

@Component({
  selector: 'app-artworks-detail',
  templateUrl: './artworks-detail.component.html',
  styleUrls: ['./artworks-detail.component.scss']
})
export class ArtworksDetailComponent implements OnInit {

  work: ArtWork = new ArtWork;
  api: VgApiService;
  video = "assets/videos/kawasaki.mp4";
  id: number;


  constructor(
    private route: ActivatedRoute,
    private dbOperations: DbOperationsService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.getArtWorkDetails(this.id.toString());
    });
  }

  onPlayerReady(api: VgApiService) {
    this.api = api;
    this.api.getDefaultMedia().subscriptions.loadedMetadata.subscribe(this.playVideo.bind(this));
  }

  playVideo() {
    this.api.play();
  }

  getArtWorkDetails(id: string) {
    this.dbOperations.artworksFirestoreCollection()
      .ref.where('id', '==', id).onSnapshot(data => {
        data.docs.forEach(d => {
          const id = d.id;
          const work = d.data() as ArtWork;
          this.video = work.url;
          this.work = work;
        })
      })

  }

}
