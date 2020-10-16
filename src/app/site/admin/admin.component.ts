import { Component, OnInit } from '@angular/core';
import {ArtWork} from "../../models/artwork";
import {DbOperationsService} from "../../services/db-operations.service";
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  artworks: ArtWork[];

  constructor(
    public router: Router,
    public dbOperations: DbOperationsService,) { }

  ngOnInit(): void {
    this.getAllExhibitions();
  }


  // Get a list of archived artwork
  private getAllExhibitions() {
    this.dbOperations.artworksCollection()
      .snapshotChanges().subscribe(d => {
      this.artworks = d.map(e => {
        const data = e.payload.doc.data();
        const id = e.payload.doc.id;
        return {id, ...data} as ArtWork;
      });
    });

  }

  navigateToFilterArtworks() {
    this.router.navigateByUrl("project/admin/filter-artworks")
  }

  
  navigateToScoringArtworks() {
    this.router.navigateByUrl("project/admin/score")
  }

  
  navigateToAllCurators() {
    this.router.navigateByUrl("project/admin/curators")
  }

  
  navigateToScoredArtworks() {
    this.router.navigateByUrl("project/admin/scored-artworks")
  }
}
