import { AfterViewInit, Component, NgZone, OnInit } from '@angular/core';
import { VgApiService } from '@videogular/ngx-videogular/core';
import { ActivatedRoute } from '@angular/router';
import { DbOperationsService } from 'src/app/services/db-operations.service';
import { ArtWork } from 'src/app/models/artwork';
import { VScore, Points, Score} from 'src/app/models/score';
import { User } from 'src/app/models/user';
import { IMedia } from 'src/app/interfaces/imedia';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss']
})
export class ScoreComponent implements OnInit, AfterViewInit {

  photoGraphForm: any;


  work: ArtWork = new ArtWork();
  score: Score = new Score();
  vScore: VScore = new VScore();

  // vStory: VStory = new VStory();
  // vCreativity: VCreativity = new VCreativity();
  // vEdit: VEdit = new VEdit();
  // vTechnical: VTechnical = new VTechnical();

  composition: Points = new Points();
  lighting: Points = new Points();
  clarity: Points = new Points();
  theme: Points = new Points();
  uniqueness: Points = new Points();
  message: Points = new Points();
  impression: Points = new Points();
  inspirational: Points = new Points();
  impact: Points = new Points();
  details: Points = new Points();

  vMessage: Points = new Points();
  useOfEquipments: Points = new Points();
  useOfTechniques: Points = new Points();
  execution: Points = new Points();
  scene: Points = new Points();
  audioClarity: Points = new Points();
  pictureClarity: Points = new Points();
  stability: Points = new Points();

  currentUser: string = '';

  poor: number = 2;
  fair: number = 4;
  satisfactory: number = 6;
  good: number = 8;
  excellent: number = 10;

  artworkId: string;
  userCode: string;

 
  video = "assets/videos/resilience.mp4";
  id: number = 1601554584181;
  templateChecked = true;

  role: string = '';

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


  constructor(
    public ngZone: NgZone,
    private route: ActivatedRoute,
    private dbOperations: DbOperationsService) {
     
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.getArtWorkDetails(this.id.toString());
    });

  }

  ngAfterViewInit() {
    this.dbOperations.getCurrentUser().subscribe(user => {
      this.currentUser = user.uid;
      this.getAdminRole();
    })
  }

  onSubmit(form) {
    if (form.valid) {
      if(this.work.type === 'video') {
        this.vScore.artworkId = this.id.toString();
        this.vScore.vTechnical.composition = this.composition;
        this.vScore.vTechnical.stability = this.stability;
        this.vScore.vTechnical.pcitureClarity = this.pictureClarity;
        this.vScore.vTechnical.lighting = this.lighting;
        this.vScore.vTechnical.audioClarity = this.audioClarity;
        this.vScore.vEdit.scene = this.scene;
        this.vScore.vEdit.execution = this.execution;
        this.vScore.vStory.message = this.message;
        this.vScore.vCreativity.useoftechniques = this.impact;
        this.vScore.vCreativity.useofequipments = this.inspirational;
        this.vScore.scoredDate = new Date().getDate().toString();
        this.vScore.scoredTime = new Date().getTime().toString();
        this.vScore.scoredBy = this.currentUser;

        console.log('score' + this.score);
        console.log(JSON.stringify(form.value))
        const param = JSON.stringify(this.score);
        this.dbOperations.scoresCollections().doc(this.score.artworkId).set(param);
        form.reset();
      } else {
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
        this.score.scoredBy = this.currentUser;
        console.log('score' + this.score);
        console.log(JSON.stringify(form.value))
        const param = JSON.stringify(this.score);
        this.dbOperations.scoresCollections().doc(this.score.artworkId).set(param);
        form.reset();
      }
    }
 
  }

  onItemChange(value) {
    console.log(" Value is : ", value);
  }

  onPlayerReady(api: VgApiService) {
    this.api = api;
    this.api.getDefaultMedia().subscriptions
      .loadedMetadata.subscribe(this.playVideo.bind(this));
    this.api.getDefaultMedia().subscriptions.ended.subscribe(this.nextVideo.bind(this));
  }

  playVideo() {
    this.api.play();
  }

  nextVideo() {
    this.currentIndex++;

    if (this.currentIndex === this.playlist.length) {
      this.currentIndex = 0;
    }

    this.currentItem = this.playlist[this.currentIndex];
  }

  onClickPlaylistItem(item: IMedia, index: number) {
    this.currentIndex = index;
    this.currentItem = item;
  }


  getArtWorkDetails(id: string) {
    this.dbOperations.artworksCollection()
      .ref.where('id', '==', id).onSnapshot(data => {
        data.docs.forEach(d => {
          const work = d.data() as ArtWork;
          this.video = work.url;
          this.work = work;

        })
      })

  }

  approveArtwork() {
    this.dbOperations.artworksCollection().doc(this.work.artworkId)
    .update({'status': 'approved'});
  }

  declineArtwork() {
    this.dbOperations.artworksCollection().doc(this.work.artworkId)
    .update({'status': 'declined'});
  }

  featureArtwork() {
    this.dbOperations.artworksCollection().doc(this.work.artworkId)
    .update({'status': 'feature'});
  }

  exhibitArtwork() {
    this.dbOperations.artworksCollection().doc(this.work.artworkId)
    .update({'status': 'exhibit'});
  }


  getAdminRole() {
    this.dbOperations.usersCollection()
    .ref.where('userId', '==', this.currentUser).onSnapshot(data => {
      data.docs.forEach(d => {
        const id = d.id;
        const u = d.data() as User;
        console.log("sign in trial " + u.userId);
        this.ngZone.run(() => {
          if (u.role === 'moderator') {
            this.role = 'moderator'
          }else if(u.role = 'admin') {
            this.role = 'admin'
          }else {
            this.role = 'artist'
          }
          console.log("role " + this.role);
        })
      })
    })
  
  }

}
