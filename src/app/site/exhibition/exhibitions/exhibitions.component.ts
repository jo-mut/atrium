import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {QuerySnapshot, DocumentData} from '@angular/fire/firestore/interfaces';
import {DbOperationsService} from 'src/app/services/db-operations.service';
import {ArtWork} from 'src/app/models/artwork';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {docChanges} from '@angular/fire/firestore';

@Component({
  selector: 'app-exhibitions',
  templateUrl: './exhibitions.component.html',
  styleUrls: ['./exhibitions.component.scss']
})
export class ExhibitionsComponent implements OnInit {
  exhibitions: ArtWork[] = [];

  constructor(public dbOperations: DbOperationsService,
              public router: Router) {
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
        const work = {id, ...data} as ArtWork;
        this.exhibitions.push(work);
      }));
  }

  getSelectedArtwork(id: number) {
    this.router.navigateByUrl('/site/exhibition/' + id);
  }
}
