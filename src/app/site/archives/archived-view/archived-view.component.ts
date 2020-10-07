import { Component, OnInit } from '@angular/core';
import { DbOperationsService } from 'src/app/services/db-operations.service';
import { ArtWork } from 'src/app/models/artwork';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-archived-view',
  templateUrl: './archived-view.component.html',
  styleUrls: ['./archived-view.component.scss']
})
export class ArchivedViewComponent implements OnInit {

  artwork: ArtWork = new ArtWork();
  id: number;

  constructor(private route: ActivatedRoute,
     private dbOperations: DbOperationsService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
    this.getArchivedArtWorkById(this.id.toString());
  }

  getArchivedArtWorkById(id: string) {
    this.dbOperations.artworksCollection()
    .ref.where('id', '==', id).onSnapshot(data => {
      data.docs.forEach(d => {
        const id = d.id;
        const work = d.data() as ArtWork;
        console.log(id);
        this.artwork = {id, ...work}
      })
    })

}

}
