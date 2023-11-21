import { Component, OnInit, Input } from '@angular/core';
import { ArtWork } from 'src/app/models/artwork';
import { DbOperationsService } from 'src/app/services/db-operations.service';
import { ActivatedRoute } from '@angular/router';
import { VgApiService } from '@videogular/ngx-videogular/core';
import { ExtraDetails } from 'src/app/models/extraDetails';

@Component({
  selector: 'app-artworks-detail',
  templateUrl: './artworks-detail.component.html',
  styleUrls: ['./artworks-detail.component.scss']
})
export class ArtworksDetailComponent implements OnInit {

  work: ArtWork = new ArtWork;
  interview: ExtraDetails = new ExtraDetails();
  api: VgApiService;
  video = "http://static.videogular.com/assets/videos/elephants-dream.mp4";
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
    this.dbOperations.artworksCollection()
      .ref.where('id', '==', id).onSnapshot(data => {
        data.docs.forEach(d => {
          const id = d.id;
          const work = d.data() as ArtWork;
          this.video = work.url;
          this.work = work;
          this.getArtworkInterview(work.userId);
        })
      })

  }


  getArtworkInterview(userId: string) {
    this.dbOperations.interviewssCollection()
    .ref.where('userId', '==', userId).onSnapshot(data => {
      if(!data.empty) {
        data.forEach(d => {
          this.interview = d.data() as ExtraDetails
        })
      }
    })
  }

}