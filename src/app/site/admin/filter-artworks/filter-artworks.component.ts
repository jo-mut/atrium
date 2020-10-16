import { Component, NgZone, OnInit } from '@angular/core';
import { DbOperationsService } from 'src/app/services/db-operations.service';
import { ArtWork } from 'src/app/models/artwork';
import { User } from 'src/app/models/user';
import {
  NavigationCancel, NavigationEnd, NavigationError,
  NavigationStart, Router, Event
} from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-filter-artworks',
  templateUrl: './filter-artworks.component.html',
  styleUrls: ['./filter-artworks.component.scss']
})
export class FilterArtworksComponent implements OnInit {

  artworks: ArtWork[] = [];
  id: number;
  loading = false;

  currentUser: string = '';

  constructor(
    public ngZone: NgZone,
    public router: Router,
    public firestore: AngularFirestore,
    public dbOperations: DbOperationsService) { }

  ngOnInit(): void {
    this.router.events.subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          console.log(this.loading);
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false;
          break;
        }
        default: {
          break;
        }
      }
    });
  }

  ngAfterViewInit() {
    this.getArtWorks();
  }


    // Get a list of archived artwork
    getArtWorks() {
      this.dbOperations.artworksCollection()
      .ref.where('status', '==', 'filter')
      .onSnapshot(data => {
        data.forEach(e => {
          const data = e.data();
          const id = e.id;
          let work = { id, ...data } as ArtWork;
          this.artworks.push(work);
          console.log(work)
        })
      })
    }

}
