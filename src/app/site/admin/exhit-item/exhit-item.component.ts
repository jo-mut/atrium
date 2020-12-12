import { Component, Input, NgZone, OnInit } from '@angular/core';
import { ArtWork } from 'src/app/models/artwork';
import { Score } from 'src/app/models/score';
import { User } from 'src/app/models/user';
import { DbOperationsService } from 'src/app/services/db-operations.service';
import { Observable, of } from 'rxjs';
import { DatePipe } from '@angular/common';
import { VgApiService } from '@videogular/ngx-videogular/core';
import { Router } from '@angular/router';


class ScoredItem {
  name: string
  date: string;
  country: string;
  category: string;
  totalScore: string;
  number: string;
  url: string;
}

@Component({
  selector: 'app-exhit-item',
  templateUrl: './exhit-item.component.html',
  styleUrls: ['./exhit-item.component.scss']
})
export class ExhitItemComponent implements OnInit {

 
  @Input() artwork: ArtWork;
  user: User = new User();
  score: Score = new Score();
  scoredItem: ScoredItem = new ScoredItem();
  message: string;
  exhibit: string = 'Exhibit'
  decline: string = 'Decline'

  api: VgApiService;

  constructor(
    private router: Router,
    public ngZone: NgZone,
    private dbOperations: DbOperationsService
  ) { }

  ngOnInit(): void {
    this.getArtWorkDetails()
    this.getArtworkScore();
    this.getUserProfile(this.artwork.userId);
  }

  getArtWorkDetails() {
    this.ngZone.run(() => {
      of(this.artwork.shotDate).subscribe(date => {
        this.scoredItem.date = new DatePipe('en').transform(this.artwork.id, 'yyyy/MM/dd');

      })

      of(this.artwork.url).subscribe(url => {
        this.scoredItem.url = url

      })

      if (this.artwork.type === 'image') {
        of('Photography').subscribe(type => {
          this.scoredItem.category = type
        })
      }

      if (this.artwork.status === 'exhibited') {
       this.exhibit = 'Exhibited'
      } else if(this.artwork.status === 'exhibition-declined') {
        this.decline = 'Declined'
      } else {
        this.exhibit = 'Exhibit'
        this.decline = 'Decline'
        // do nothing
      }

      if (this.artwork.type === 'video') {
        of('Videography').subscribe(type => {
          this.scoredItem.category = type
        })
      }
    })


  }


  getArtworkScore() {
    console.log("scoring")
    this.dbOperations.scoresCollections()
    .ref.where('scoreId', '==', this.artwork.id)
    .onSnapshot(data => {

     if(data.empty) {
       this.message = 'There are no scored to select'
     } else {
       data.forEach(d => {
        const score = d.data() as Score;
        this.score = score;
        this.scoredItem.totalScore = score.totalScore.toString();
        console.log(score + " score")
      })     
     }
    })
  }

  getUserProfile(userId: string) {
    this.dbOperations.usersCollectionById(userId)
      .onSnapshot(data => {
        if (data != null) {
          data.forEach(e => {
            const data = e.data();
            const id = e.id;
            let user = { ...data } as User;
            this.ngZone.run(() => {
              of(user.country).subscribe(country => {
                this.scoredItem.country = country
                console.log(this.scoredItem.country)
              })

              of(user.firstName + ' ' + user.lastName)
                .subscribe(name => {
                  this.scoredItem.name = name
                })
            })

            // console.log(of(user.firstName + ' ' + user.lastName));
            let roles = user.role;
          })
        }
      })
  };


  declineExhibtion() {
      this.dbOperations.artworksCollection().doc(this.artwork.artworkId)
      .update(
        {
          'status': 'exhibition-declined',
          'updatedAt': new Date().getTime() + '',
        }).then(res => {
          console.log('success')
          // this.toaster.success('Filtering successful');
          // this.router.navigateByUrl("project/admin/artworks")

        }).catch(err => {
          console.log(err.message)

          // this.toaster.success('Filtering failed');
        })
  }


  exhibitArtwork() {
    this.dbOperations.artworksCollection().doc(this.artwork.artworkId)
      .update({
        'status': 'exhibited',
        'updatedAt': new Date().getTime() + '',
      }).then(res => {
        // this.toaster.success('Filtering successful');
        // this.router.navigateByUrl("project/admin/artworks")

      }).catch(err => {
        // this.toaster.success('Filtering failed');
      })
  }

  onPlayerReady(api: VgApiService) {
    this.api = api;
    this.api.getDefaultMedia().subscriptions
      .loadedMetadata.subscribe(this.playVideo.bind(this));
  }

  playVideo() {
    this.api.pause();
  }

}
