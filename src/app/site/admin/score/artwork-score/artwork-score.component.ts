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
  selector: 'app-artwork-score',
  templateUrl: './artwork-score.component.html',
  styleUrls: ['./artwork-score.component.scss']
})
export class ArtworkScoreComponent implements OnInit, AfterViewInit {

  photoGraphForm: any;
  work: ArtWork = new ArtWork();
  score: Score = new Score();
  totalScore: string;
  currentUser: string = '';

  artworkId: string;
  userCode: string;


  video = "assets/videos/resilience.mp4";
  id: number = 1601554584181;
  templateChecked = true;
  role: string = '';
  api: VgApiService;


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


  onPlayerReady(api: VgApiService) {
    this.api = api;
    this.api.getDefaultMedia().subscriptions
      .loadedMetadata.subscribe(this.playVideo.bind(this));
  }

  playVideo() {
    this.api.play();
  }


  getArtWorkDetails(id: string) {
    this.dbOperations.artworksCollection()
      .ref.where('id', '==', id).onSnapshot(data => {
        data.docs.forEach(d => {
          const work = d.data() as ArtWork;
          this.video = work.url;
          this.work = work;
          this.getArtWorkScores(work.id)
        })
      })

  }

  getArtWorkScores(id: string) {
    this.dbOperations.scoresCollections()
      .ref.where('scoreId', '==', id).onSnapshot(data => {
        data.docs.forEach(d => {
          const score = d.data() as Score;
          this.score = score;
          console.log(score)
          const totalComposition = score.technique.composition;
          const wowfactor = score.wowFactor.details;
          const creativity = score.creativity.impression;

          // this.totalScore = totalComposition + wowfactor + creativity;

        })
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
