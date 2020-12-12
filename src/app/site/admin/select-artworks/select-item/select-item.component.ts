import { Component, Input, NgZone, OnInit } from '@angular/core';
import { DbOperationsService } from 'src/app/services/db-operations.service';
import { Observable, of } from 'rxjs';
import { Score } from 'src/app/models/score';
import { ArtWork } from 'src/app/models/artwork';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { VgApiService } from '@videogular/ngx-videogular/core';
import { DatePipe } from '@angular/common';


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
  selector: 'app-select-item',
  templateUrl: './select-item.component.html',
  styleUrls: ['./select-item.component.scss']
})
export class SelectItemComponent implements OnInit {

  @Input() artwork: ArtWork;
  user: User = new User();
  score: Score = new Score();
  scoredItem: ScoredItem = new ScoredItem();
  message: string;
  spotlight: string = 'Spotlight'
  decline: string = "Decline"

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

      
      if (this.artwork.status === 'spotlight') {
        this.spotlight = 'Spotlight'
       } else if(this.artwork.status === 'spotlight-declined') {
         this.decline = 'Declined'
       } else {
         this.spotlight = 'Spotlight'
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


  selectToSpotlight() {
      this.dbOperations.artworksCollection().doc(this.artwork.artworkId)
      .update(
        {
          'status': 'spotlight',
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


  declineSpotlight() {
    this.dbOperations.artworksCollection().doc(this.artwork.artworkId)
      .update({
        'status': 'spotlight-declined',
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
