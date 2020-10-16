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

  scores: Score[] = [];
 
  constructor(
    public ngZone: NgZone,
    private router: Router,
    private dbOperations: DbOperationsService
  ) { }

  ngOnInit(): void {
    this.getScoredArtworks();
  }

  getScoredArtworks() {
    this.dbOperations.scoresCollections()
    .snapshotChanges().subscribe(d => {
      this.scores = d.map(e => {
        const data = e.payload.doc.data();
        const id = e.payload.doc.id;
        console.log({ ...data })
        return { ...data } as Score;
      });
    });
  }
}
