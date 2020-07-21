import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DbOperationsService } from 'src/app/services/db-operations.service';
import { ArtWork } from 'src/app/models/artwork';

@Component({
  selector: 'app-exhibition-detail',
  templateUrl: './exhibition-detail.component.html',
  styleUrls: ['./exhibition-detail.component.scss']
})
export class ExhibitionDetailComponent implements OnInit {

  exhibitions: ArtWork[] = [];
  id: number;
  constructor(private route: ActivatedRoute, private router: Router,
    private dbOperations: DbOperationsService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.getExhibition(this.id.toString());
    });
  }

  getSelectedArtwork(artwork: ArtWork) {
    this.router.navigateByUrl('/main/exhibition/exhibition-detail/' + artwork.id);
  }

  getExhibition(id: string) {
    let exhibitions = this.exhibitions;
    this.dbOperations.getExhibitionDetail()
    .ref.where('id', '==', id).onSnapshot(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          const data = doc.data();
          const id = doc.id;
          let work = { id, ...data } as ArtWork;
          exhibitions.push(work);
          console.log({...work})
        })
      })
  }



}
