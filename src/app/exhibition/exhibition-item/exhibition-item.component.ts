import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ArtWork } from 'src/app/models/artwork';
import { DbOperationsService } from 'src/app/services/db-operations.service';
import { MatVideoComponent } from 'mat-video/lib/video.component';
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
    this.dbOperations.getExhibitions()
      .onSnapshot(snapshot => snapshot.forEach(doc => {
        const data = doc.data();
        const id = doc.id;
        let work = { id, ...data } as ArtWork;
        this.artworks.push(work);
      }) )
  }

  getSelectedArtwork(id: number) {
    this.router.navigateByUrl('/main/exhibition/' + id);

  }

}
