import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ArtWork } from 'src/app/models/artwork';
import { DbOperationsService } from 'src/app/services/db-operations.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-exhibition-item',
  templateUrl: './exhibition-item.component.html',
  styleUrls: ['./exhibition-item.component.scss']
})
export class ExhibitionItemComponent implements OnInit {

  @Input() public exhibition: ArtWork
  artworks: ArtWork[] = [];
  // @ViewChild('video') matVideo: MatVideoComponent;
  // video: HTMLVideoElement;


  constructor(private dbOperations: DbOperationsService,
    private router: Router) {
   }

  ngOnInit(): void {
    this.getExhibitions();
  }

  // Get a list of archived artwork
  getExhibitions() {
    this.dbOperations.getAllExhibitions()
      .onSnapshot(snapshot => snapshot.forEach(doc => {
        const data = doc.data();
        const id = doc.id;
        const work = { id, ...data } as ArtWork;
        this.artworks.push(work);
      }) )
  }

  getSelectedArtwork(id: number) {
    this.router.navigateByUrl('/view/' + id);
  }

}
