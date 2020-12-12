import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtWork } from 'src/app/models/artwork';
import { Score } from 'src/app/models/score';
import { DbOperationsService } from 'src/app/services/db-operations.service';

@Component({
  selector: 'app-exhit-artworks',
  templateUrl: './exhit-artworks.component.html',
  styleUrls: ['./exhit-artworks.component.scss']
})
export class ExhitArtworksComponent implements OnInit {

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
     let changes = data.docChanges();
     if(changes) {
      if(data.empty) {
        this.message = 'There are no scored to select'
      } else {
        changes.forEach(artwork => {
          const data = artwork.doc.data() as ArtWork;        
          let work = { ...data };
          this.scored.push(work);
        })
      }
     }
    })
  }
}
