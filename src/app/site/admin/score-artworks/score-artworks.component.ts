import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArtWork } from 'src/app/models/artwork';
import { DbOperationsService } from 'src/app/services/db-operations.service';

@Component({
  selector: 'app-score-artworks',
  templateUrl: './score-artworks.component.html',
  styleUrls: ['./score-artworks.component.scss']
})
export class ScoreArtworksComponent implements OnInit {

  artworks: ArtWork[] = [];
  id: number;
  loading = false;
  message: string;

  currentUser: string = '';

  constructor(
    public router: Router,
    public dbOperations: DbOperationsService) { }

  ngOnInit(): void {
  
  }

  ngAfterViewInit() {
    this.getArtWorks();
  }


  // Get a list of archived artwork
  getArtWorks() {
    this.artworks = [];
    this.dbOperations.artworksCollection()
    .ref.where('status', '==', 'approved')
    .onSnapshot(data => {
      if(data.empty) {
        this.message = 'There are no artworks to score'
      } else {
        data.forEach(e => {
          const data = e.data();
          const id = e.id;
          let work = { id, ...data } as ArtWork;
          this.artworks.push(work);
        })
      }
    })
  }
}
