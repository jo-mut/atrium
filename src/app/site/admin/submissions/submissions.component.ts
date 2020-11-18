import { Component, NgZone, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { User } from 'firebase';
import { ArtWork } from 'src/app/models/artwork';
import { DbOperationsService } from 'src/app/services/db-operations.service';

@Component({
  selector: 'app-submissions',
  templateUrl: './submissions.component.html',
  styleUrls: ['./submissions.component.scss']
})
export class SubmissionsComponent implements OnInit {

  artists: User[] = []
  submittingArtists = new Set();
  id: number;
  loading = false;
  message: string;

  currentUser: string = '';

  constructor(
    public ngZone: NgZone,
    public router: Router,
    public firestore: AngularFirestore,
    public dbOperations: DbOperationsService) { }

  ngOnInit(): void {
    this.getArtWorks();
  }

  ngAfterViewInit() {
  }


  // Get a list of archived artwork
  getArtWorks() {
    this.dbOperations.artworksCollection()
    .snapshotChanges().subscribe(d => {
      d.map(e => {
        const data = e.payload.doc.data();
        const id = e.payload.doc.id;
        console.log({ ...data })
        this.getSubmittingUsers(data.userId);
      });
    });
  }

  getSubmittingUsers(userId: string) {
    this.dbOperations.usersCollection()
      .ref.where('userId', '==', userId)
      .onSnapshot(data => {
        if (data.empty) {
          this.message = 'There are no artworks to filter'
        } else {
          let changes = data.docChanges();
          if (changes) {
            changes.forEach(artwork => {
              const data = artwork.doc.data() as User;
              let user = { ...data };
              this.artists.push(user);
              // this.artists.add(user);
              console.log(user)
            })
          }
        }
      })
  }
}
