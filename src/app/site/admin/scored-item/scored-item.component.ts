import { Component, Input, NgZone, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ArtWork } from 'src/app/models/artwork';
import { Score } from 'src/app/models/score';
import { User } from 'src/app/models/user';
import { DbOperationsService } from 'src/app/services/db-operations.service';

class ScoredItem {
  name: string
  date: string;
  country: string;
  category: string;
  totalScore: string;
  number: string;
}

@Component({
  selector: 'app-scored-item',
  templateUrl: './scored-item.component.html',
  styleUrls: ['./scored-item.component.scss']
})
export class ScoredItemComponent implements OnInit {

  @Input() score: Score;
  artwork: ArtWork = new ArtWork();
  user: User = new User();
  scoredItem: ScoredItem = new ScoredItem();

  constructor(
    public ngZone: NgZone,
    private dbOperations: DbOperationsService
  ) { }

  ngOnInit(): void {
    this.getArtWorkDetails(this.score.scoreId)
  }

  getArtWorkDetails(id: string) {
    this.dbOperations.artworksCollection()
      .ref.where('id', '==', id).onSnapshot(data => {
        data.docs.forEach(d => {
          const work = d.data() as ArtWork;
          this.ngZone.run(() => {
            of(work.shotDate).subscribe(date => {
              this.scoredItem.date = date
              console.log(this.scoredItem.date)
  
            })
            if (work.type === 'image') {
              of('Photography').subscribe(type => {
                this.scoredItem.category = type
                console.log(this.scoredItem.category)
              })
            }
  
            if (work.type === 'video') {
              of('Videography').subscribe(type => {
                this.scoredItem.category = type
                console.log(this.scoredItem.category)
              })
            }
          })
         
          this.getUserProfile(work.userId);

        })
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
                .subscribe(name =>  {
                  this.scoredItem.name = name
                })
            })
            
            // console.log(of(user.firstName + ' ' + user.lastName));
            let roles = user.role;
          })
        }
      })
  };

}
