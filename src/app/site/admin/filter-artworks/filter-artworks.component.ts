import { Component, NgZone, OnInit } from '@angular/core';
import { DbOperationsService } from 'src/app/services/db-operations.service';
import { ArtWork } from 'src/app/models/artwork';
import { User } from 'src/app/models/user';
import {
  NavigationCancel, NavigationEnd, NavigationError,
  NavigationStart, Router, Event
} from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { flatMap } from 'rxjs/operators';
import { async } from '@angular/core/testing';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-filter-artworks',
  templateUrl: './filter-artworks.component.html',
  styleUrls: ['./filter-artworks.component.scss']
})
export class FilterArtworksComponent implements OnInit {

  artworks: ArtWork[] = [];
  id: number;
  loading = false;
  message: string;

  currentUser: string = '';

  constructor(
    public ngZone: NgZone,
    public router: Router,
    public firestore: AngularFirestore,
    public dbOperations: DbOperationsService) { }

  ngOnInit(): void {
    this.getArtWorks();
  }

  ngAfterViewInit() {
  }


  // Get a list of archived artwork
  getArtWorks() {
    this.dbOperations.artworksCollection()
      .ref.where('status', '==', 'filter')
      .onSnapshot(data => {
        if (data.empty) {
          this.message = 'There are no artworks to filter'
        } else {
          let changes = data.docChanges();
          if (changes) {
            this.artworks = [];
            changes.forEach(artwork => {
              const data = artwork.doc.data() as ArtWork;
              let work = { ...data };
              this.artworks.push(work);
              console.log(work)
            })
          }
        }
      })
  }

}
