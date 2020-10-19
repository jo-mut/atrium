import { Component, NgZone, OnInit } from '@angular/core';
import { DbOperationsService } from 'src/app/services/db-operations.service';
import { ArtWork } from 'src/app/models/artwork';
import { User } from 'src/app/models/user';
import {
  NavigationCancel, NavigationEnd, NavigationError,
  NavigationStart, Router, Event
} from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Score } from 'src/app/models/score';

@Component({
  selector: 'app-select-artworks',
  templateUrl: './select-artworks.component.html',
  styleUrls: ['./select-artworks.component.scss']
})
export class SelectArtworksComponent implements OnInit {

  scored: ArtWork[] = [];
  message: string;
 
  constructor(
    public ngZone: NgZone,
    private router: Router,
    private dbOperations: DbOperationsService
  ) { }

  ngOnInit(): void {
    this.getScoredArtworks();
  }

  getScoredArtworks() {
    this.scored = [];
    this.dbOperations.artworksCollection()
    .ref.where('status', '==', 'scored')
    .onSnapshot(data => {
     if(data.empty) {
       this.message = 'There are no scored to select'
     } else {
      data.forEach(doc => {
        this.dbOperations.getFirestore().doc(doc.ref)
        .snapshotChanges().subscribe(artwork => {
         const data = artwork.payload.data() as ArtWork;        
         let work = { ...data };
         this.scored.push(work);
         console.log(work)
        })
       })
     }
    })
  }
}
