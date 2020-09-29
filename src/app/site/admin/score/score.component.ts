import { Component, OnInit } from '@angular/core';
import { VgApiService } from '@videogular/ngx-videogular/core';
import { ActivatedRoute } from '@angular/router';
import { DbOperationsService } from 'src/app/services/db-operations.service';
import { ArtWork } from 'src/app/models/artwork';
import {
  Clarity, Composition, Creativity,
  Details, Impact, Impression, Inspirational,
  Lighting, Message, Score, Technique, Theme,
  Uniquness, WowFactor
} from 'src/app/models/score';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss']
})
export class ScoreComponent implements OnInit {

  photoGraphForm: any;


  work: ArtWork = new ArtWork();
  score: Score = new Score();
  technique: Technique = new Technique();
  creativity: Creativity = new Creativity();
  wowFactor: WowFactor = new WowFactor();
  composition: Composition = new Composition();
  lighting: Lighting = new Lighting();
  clarity: Clarity = new Clarity();
  theme: Theme = new Theme();
  uniqueness: Uniquness = new Uniquness();
  message: Message = new Message();
  impression: Impression = new Impression();
  inspirational: Inspirational = new Inspirational();
  impact: Impact = new Impact();
  details: Details = new Details();


  poor: number = 2;
  fair: number = 4;
  satisfactory: number = 6;
  good: number = 8;
  excellent: number = 10;

  artworkId: string;
  userCode: string;

  api: VgApiService;
  video = "assets/videos/kawasaki.mp4";
  id: number;
  templateChecked = true;


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

  onSubmit(form) {
    if (form.valid) {
      this.score.artworkId = this.id.toString();
      this.score.technique.composition = this.composition;
      this.score.technique.clarity = this.clarity;
      this.score.technique.lighting = this.lighting;
      this.score.creativity.message = this.message;
      this.score.creativity.theme = this.theme;
      this.score.creativity.uniquness = this.uniqueness;
      this.score.creativity.impression = this.impression;
      this.score.wowFactor.details = this.details;
      this.score.wowFactor.impact = this.impact;
      this.score.wowFactor.inspirational = this.inspirational;
      this.score.scoredDate = new Date().getDate().toString();
      this.score.scoredTime = new Date().getTime().toString();
      console.log('score' + this.score);
      console.log(JSON.stringify(form.value))
      this.getCurrentUserUID(form, this.score, this.work.userId);

    }
  }

  onItemChange(value) {
    console.log(" Value is : ", value);
  }

  onPlayerReady(api: VgApiService) {
    this.api = api;
    this.api.getDefaultMedia().subscriptions
      .loadedMetadata.subscribe(this.playVideo.bind(this));
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

  getCurrentUserUID(form, score: Score, artistId: string) {
    this.dbOperations.getCurrentUser().subscribe(user => {
      if (user) {
        console.log('AUTHSTATE USER', user.uid); //this works
        this.score.meanScore = null;
        this.score.scoredBy = user.uid;
        this.score.artistId = artistId;
        const param = JSON.parse(JSON.stringify(this.score));
        this.dbOperations.scoresCollections().doc(this.score.artworkId).set(param);
        form.reset();
      } else {
        console.log('AUTHSTATE USER EMPTY', user);
      }
    },
      err => {
        console.log('Please try again')
      });
  }

}
