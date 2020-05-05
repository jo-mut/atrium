import { Component, OnInit } from '@angular/core';
import { ArtWork } from '../models/artwork';
import { DbOperationsService } from '../services/db-operations.service';
import { QuerySnapshot, DocumentData } from '@angular/fire/firestore/interfaces';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-archives',
  templateUrl: './archives.component.html',
  styleUrls: ['./archives.component.scss']
})
export class ArchivesComponent implements OnInit {

  artworks: Observable<ArtWork>;

  constructor(public dbOperations: DbOperationsService) { }

  ngOnInit(): void {
    this.getArchivedArtWorks();
  }

  // Get a list of archived artwork
  private getArchivedArtWorks() {
    let artWork = new ArtWork();
    this.dbOperations.getArchivedArtWorks()
    .snapshotChanges().pipe(map(actions => actions.map(a => {
        const data = a.payload.doc.data() as ArtWork;
        const id = a.payload.doc.id;
        console.log(id)
        console.log(...data + ' artwork data')
        return { id, ...data };
      }))
    );
    // this.dbOperations.getArchivedArtWorks().get()
    // .toPromise().then((querySnapshot: QuerySnapshot<DocumentData>) => {
    //     if (!querySnapshot.empty) {
    //       for (const doc of querySnapshot.docs) {
    //         artWork.description = doc.data().description;
    //         artWork.id = doc.data().id;
    //         artWork.title = doc.data().title;
    //         artWork.url = doc.data().url;
    //         artWork.type = doc.data().type;
    //         artWork.createdAt = doc.data().createdAt;
    //         artWork.updatedAt = doc.data().updatedAt;
    //         artWork.height = doc.data().height;
    //         artWork.width = doc.data().width;
    //         artWork.status = doc.data().status;          
    //       }
    //     }
    //   }).catch(function (error) {
    //     console.log("Error getting document:", error);
    //   });
  }

}
