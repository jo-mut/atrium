import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtWork } from 'src/app/models/artwork';
import { Score, VScore } from 'src/app/models/score';
import { User } from 'src/app/models/user';
import { DbOperationsService } from 'src/app/services/db-operations.service';

@Component({
  selector: 'app-scored-artworks',
  templateUrl: './scored-artworks.component.html',
  styleUrls: ['./scored-artworks.component.scss']
})
export class ScoredArtworksComponent implements OnInit {

  scores: Score[] = [];
 
  constructor(
    public ngZone: NgZone,
    private router: Router,
    private route: ActivatedRoute,
    private dbOperations: DbOperationsService
  ) { }

  ngOnInit(): void {
    this.getScoredArtworks();
  }

  getScoredArtworks() {
    this.scores = [];
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