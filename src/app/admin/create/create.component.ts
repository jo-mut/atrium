import { Component, OnInit } from '@angular/core';
import { DbOperationsService } from 'src/app/services/db-operations.service';
import { Observable } from 'rxjs';
import { ArtWork } from 'src/app/models/artwork';
import { Upload } from 'src/app/models/upload';
import { QuerySnapshot, DocumentData } from '@angular/fire/firestore/interfaces';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CreateModalComponent } from '../create-modal/create-modal.component';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  artworks: ArtWork[] = [];
  exhibitions: ArtWork[] = [];

  constructor(private dbOperations: DbOperationsService) { }

  ngOnInit() {
    this.getExhibitions();

  }
  // Get a list of archived artwork
  getExhibitions() {
    this.dbOperations.getAllExhibitions()
      .onSnapshot(snapshot => snapshot.forEach(doc => {
        const data = doc.data();
        const id = doc.id;
        let work = { id, ...data } as ArtWork;
        this.exhibitions.push(work);
      }));
  }

}
