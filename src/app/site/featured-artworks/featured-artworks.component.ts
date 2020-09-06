import { Component, OnInit, AfterContentInit, AfterViewInit } from '@angular/core';
import { ArtWork } from 'src/app/models/artwork';
import { DbOperationsService } from 'src/app/services/db-operations.service';

@Component({
  selector: 'app-featured-artworks',
  templateUrl: './featured-artworks.component.html',
  styleUrls: ['./featured-artworks.component.scss']
})
export class FeaturedArtworksComponent implements OnInit, AfterViewInit {

  artworks: ArtWork[];

  constructor(public dbOperations: DbOperationsService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.getArchivedArtWorks();
  }

  // Get a list of archived artwork
  private getArchivedArtWorks() {
    this.dbOperations.artworksFirestoreCollection()
    .snapshotChanges().subscribe(d => {
      this.artworks = d.map(e => {
          const data = e.payload.doc.data();
          const id = e.payload.doc.id;
          return {id, ...data} as ArtWork;
      });
    });

  }
}
