import { Component, OnInit } from '@angular/core';
import { ArtWork } from '../../models/artwork';
import { DbOperationsService } from '../../services/db-operations.service';
import { QuerySnapshot, DocumentData } from '@angular/fire/firestore/interfaces';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-archives',
  templateUrl: './archives.component.html',
  styleUrls: ['./archives.component.scss']
})
export class ArchivesComponent implements OnInit {
  artworks: ArtWork[];

  constructor(public dbOperations: DbOperationsService) { }

  ngOnInit(): void {
    this.getArchivedArtWorks();
  }

  // Get a list of archived artwork
  private getArchivedArtWorks() {
    this.dbOperations.artworksCollection()
    .snapshotChanges().subscribe(d => {
      this.artworks = d.map(e => {
          const data = e.payload.doc.data();
          const id = e.payload.doc.id;
          return {id, ...data} as ArtWork;
      })
    })

  }

}
