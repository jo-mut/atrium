import { Component, Input, NgZone, OnInit } from '@angular/core';
import { DbOperationsService } from 'src/app/services/db-operations.service';
import { Observable, of } from 'rxjs';
import { Score } from 'src/app/models/score';
import { ArtWork } from 'src/app/models/artwork';
import { User } from 'src/app/models/user';
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
        this.scoredItem.date = date

      })

      of(this.artwork.url).subscribe(url => {
        this.scoredItem.url = url

      })

      if (this.artwork.type === 'image') {
        of('Photography').subscribe(type => {
          this.scoredItem.category = type
        })
      }

      if (this.artwork.type === 'video') {
        of('Videography').subscribe(type => {
          this.scoredItem.category = type
        })
      }
    })


  }


  getArtworkScore() {
    this.dbOperations.scoresCollections()
    .ref.where('id', '==', this.artwork.id)
    .onSnapshot(data => {
     if(data.empty) {
       this.message = 'There are no scored to select'
     } else {
      data.forEach(doc => {
        this.dbOperations.getFirestore().doc(doc.ref)
        .snapshotChanges().subscribe(s => {
         const data = s.payload.data() as Score;        
         let score = { ...data };
         this.score = score;
         console.log(score)
        })
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


  exhibitArtwork() {
    this.dbOperations.artworksCollection().doc(this.artwork.artworkId)
      .update({
        'status': 'exhibit',
        'updatedAt': new Date().getTime() + '',
      }).then(res => {
        // this.toaster.success('Filtering successful');
        // this.router.navigateByUrl("project/admin/artworks")

      }).catch(err => {
        // this.toaster.success('Filtering failed');
      })
  }

}
