import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ArtWork } from 'src/app/models/artwork';
import { DbOperationsService } from 'src/app/services/db-operations.service';

@Component({
  selector: 'app-follow-up',
  templateUrl: './follow-up.component.html',
  styleUrls: ['./follow-up.component.scss']
})
export class FollowUpComponent implements OnInit {

  artworks: ArtWork[] = []
  id: number;
  loading = false;
  message: string;

  currentUser: string = '';

  constructor(
    public router: Router,
    public firestore: AngularFirestore,
    public dbOperations: DbOperationsService) { }
  ngOnInit(): void {
    this.getFollowUp()
  }

  getFollowUp() {
    this.dbOperations.artworksCollection()
      .ref.where('status', '==', 'follow-up')
      .onSnapshot(follow => {
        if (follow != null) {
          follow.forEach(artwork => {
            const data = artwork.data() as ArtWork;
            this.artworks.push(data);
          })
        }

      })
  }
}
