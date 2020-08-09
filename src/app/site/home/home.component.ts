import { Component, OnInit } from '@angular/core';
import { DbOperationsService } from './../../services/db-operations.service';
import { ArtWork } from './../../models/artwork';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  photo = "assets/images/photo.png";
  artworks: ArtWork[] = [];
  constructor(private dbOperations: DbOperationsService) { }

  ngOnInit(): void {
    this.getSampleArtworks();
  }

   // Get a list of archived artwork
   getSampleArtworks() {
    this.dbOperations.getExhibitions()
      .onSnapshot(snapshot => snapshot.forEach(doc => {
        const data = doc.data();
        const id = doc.id;
        let work = { id, ...data } as ArtWork;
        this.artworks.push(work);
      }) )
  }


}
