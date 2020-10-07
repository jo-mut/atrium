import { Component, OnInit } from '@angular/core';
import { ArtWork } from 'src/app/models/artwork';
import { ActivatedRoute, Router } from '@angular/router';
import { DbOperationsService } from 'src/app/services/db-operations.service';

@Component({
  selector: 'app-archives-item-detail',
  templateUrl: './archives-item-detail.component.html',
  styleUrls: ['./archives-item-detail.component.scss']
})
export class ArchivesItemDetailComponent implements OnInit {

  artworks: ArtWork[] = [];
  id: number;
  constructor(private route: ActivatedRoute, private router: Router,
    private dbOperations: DbOperationsService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.getArchivedArtworById(this.id.toString());
    });
  }

  getSelectedArtwork(id: string) {
    this.router.navigateByUrl('/main/archived-exhibition/archived-exhibition-detail/' + id);
  }

  getArchivedArtworById(id: string) {
    this.dbOperations.artworksCollection()
    .ref.where('id', '==', id).onSnapshot(data => {
      data.forEach(e => {
        const data = e.data();
        const id = e.id;
        let work = {id, ...data} as ArtWork;
        this.artworks.push(work);
    })
    })
  }

}
