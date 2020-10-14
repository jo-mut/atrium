import { AfterViewInit, Component, NgZone, OnInit } from '@angular/core';
import { VgApiService } from '@videogular/ngx-videogular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DbOperationsService } from 'src/app/services/db-operations.service';
import { ArtWork } from 'src/app/models/artwork';
import { VScore, Points, Score } from 'src/app/models/score';
import { User } from 'src/app/models/user';
import { IMedia } from 'src/app/interfaces/imedia';
// import { ToastrService } from 'ngx-toastr';
import { ExtraDetails } from 'src/app/models/extraDetails';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss']
})
export class ScoreComponent implements OnInit, AfterViewInit {

  photoGraphForm: any;


  work: ArtWork = new ArtWork();
  interview: ExtraDetails = new ExtraDetails();
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
    // private toaster: ToastrService,
    public ngZone: NgZone,
    private router: Router,
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
      if (this.work.type === 'video') {
        this.vScore.scoreId = this.id.toString();
        this.vScore.vTechnical.composition = form.value.composition;
        this.vScore.vTechnical.stability = form.value.stability;
        this.vScore.vTechnical.pcitureClarity = form.value.pcitureClarity;
        this.vScore.vTechnical.lighting = form.value.lighting;
        this.vScore.vTechnical.audioClarity = form.value.audioClarity;
        this.vScore.vEdit.scene = form.value.scene;
        this.vScore.vEdit.execution = form.value.execution;
        this.vScore.vStory.message = form.value.message;
        this.vScore.vCreativity.useoftechniques = form.value.useoftechniques;
        this.vScore.vCreativity.useofequipments = form.value.useofequipments;
        this.vScore.scoredDate = new Date().getDate().toString();
        this.vScore.scoredTime = new Date().getTime().toString();
        this.vScore.scoredBy = this.currentUser;
        this.vScore.type = 'video';

        console.log('score' + this.score);
        console.log(JSON.stringify(form.value))
        const param = JSON.parse(JSON.stringify(this.score));
        this.dbOperations.scoresCollections().doc(this.score.scoreId).set(param).then(() => {
          this.router.navigateByUrl('project/admin/artwork-score/' + this.work.id)
        }).catch(() => {
          window.alert('Failed to save the score')
        })
        form.reset();
      } else {
        this.score.scoreId = this.id.toString();
        this.score.technique.composition = form.value.composition;
        this.score.technique.clarity = form.value.clarity;
        this.score.technique.lighting = form.value.lighting;
        this.score.creativity.message = form.value.message
        this.score.creativity.theme = form.value.theme;
        this.score.creativity.uniquness = form.value.uniquness;
        this.score.creativity.impression = form.value.impression;
        this.score.wowFactor.details = form.value.details;
        this.score.wowFactor.impact = form.value.impact;
        this.score.wowFactor.inspirational = form.value.inspirational;
        this.score.scoredDate = new Date().getDate().toString();
        this.score.scoredTime = new Date().getTime().toString();
        this.score.scoredBy = this.currentUser;
        this.score.type = 'image';

        console.log('score ' + {...this.score});
        console.log(JSON.stringify(form.value.composition))
        const param = JSON.parse(JSON.stringify(this.score))
        this.dbOperations.scoresCollections().doc(this.score.scoreId).set(param).then(() => {
          this.router.navigateByUrl('project/admin/artwork-score/' + this.work.id)
        }).catch(() => {
          window.alert('Failed to save the score')
        })

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
  }

  playVideo() {
    this.api.play();
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
          this.getArtworkInterview(work.userId);
        })
      })

  }

  approveArtwork() {
    this.dbOperations.artworksCollection().doc(this.work.artworkId)
      .update({
        'status': 'approved',
        'reviewedBy': this.currentUser,
        'updatedAt': new Date().getTime() + '',
      }).then(res => {
        // this.toaster.success('Filtering successful');
        this.router.navigateByUrl('project/admin/artwork-score/' + this.work.id)
      }).catch(err => {
        // this.toaster.success('Filtering failed');

      })
  }

  declineArtwork() {
    this.dbOperations.artworksCollection().doc(this.work.artworkId)
      .update(
        {
          'status': 'declined',
          'reviewedBy': this.currentUser,
          'updatedAt': new Date().getTime() + '',
        }).then(res => {
          // this.toaster.success('Filtering successful');
          this.router.navigateByUrl("project/admin/artworks")
        }).catch(err => {
          // this.toaster.success('Filtering failed');
        })
  }

  featureArtwork() {
    this.dbOperations.artworksCollection().doc(this.work.artworkId)
      .update(
        {
          'status': 'feature',
          'reviewedBy': this.currentUser,
          'updatedAt': new Date().getTime() + '',
        }).then(res => {
          // this.toaster.success('Filtering successful');
          this.router.navigateByUrl("project/admin/artworks")

        }).catch(err => {
          // this.toaster.success('Filtering failed');
        })
  }

  exhibitArtwork() {
    this.dbOperations.artworksCollection().doc(this.work.artworkId)
      .update({
        'status': 'exhibit',
        'reviewedBy': this.currentUser,
        'updatedAt': new Date().getTime() + '',
      }).then(res => {
        // this.toaster.success('Filtering successful');
        this.router.navigateByUrl("project/admin/artworks")

      }).catch(err => {
        // this.toaster.success('Filtering failed');
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

  getAdminRole() {
    this.dbOperations.usersCollection()
      .ref.where('userId', '==', this.currentUser).onSnapshot(data => {
        data.docs.forEach(d => {
          const id = d.id;
          const u = d.data() as User;
          console.log("sign in trial " + u.userId);
          let roles = u.role;
          this.ngZone.run(() => {
            if (roles.includes('moderator')) {
              this.role = 'moderator'
            }
            if (roles.includes('admin')) {
              this.role = 'admin'
            }
            if (roles.includes('artist')) {
              this.role = 'artist'
            }
            console.log("role " + this.role);
          })
        })
      });
  }

}
