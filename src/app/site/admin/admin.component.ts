import { Component, OnInit } from '@angular/core';
import {ArtWork} from "../../models/artwork";
import {DbOperationsService} from "../../services/db-operations.service";
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  artworks: ArtWork[];

  constructor(public dbOperations: DbOperationsService,) { }

  ngOnInit(): void {
    this.getAllExhibitions();
  }


  // Get a list of archived artwork
  private getAllExhibitions() {
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
