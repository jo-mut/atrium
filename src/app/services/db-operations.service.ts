import {Injectable} from '@angular/core';
import {ArtWork} from '../models/artwork';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize, tap, mapTo} from 'rxjs/operators';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AngularFireDatabase} from '@angular/fire/database';


@Injectable({
  providedIn: 'root'
})
export class DbOperationsService {
  downloadURL: any;
  docId: string;
  userId: any;
  latestArtWorks: ArtWork[] = [];

  private authState: Observable<firebase.User>;


  constructor(private firestore: AngularFirestore,
              private fauth: AngularFireAuth,
              private router: Router,
              private firebase: AngularFireDatabase,
              private storage: AngularFireStorage) {
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.authState = this.fauth.authState;
    this.authState.subscribe(user => {
        if (user) {
          this.userId = user;
          console.log('AUTHSTATE USER', user.uid); //this works
        } else {
          console.log('AUTHSTATE USER EMPTY', user);
          this.userId = null;
        }
      },
      err => {
        console.log('Please try again')
      });
  }



  generatePushId(): string {
    return this.firebase.createPushId();
  }

  usersCollection(userId: string) {
    return this.firestore.collection('users');
  }

  // Return document snapshot of every document
  artworksFirestoreCollection() {
    return this.firestore.collection<ArtWork>('artworks');
  }

  getUserSubmittedArtworks(id: string) {
    return this.firestore.collection<ArtWork>('artworks')
    .ref.where('userId', '==', id)

  }

  getAllExhibitions() {
    let exhibitionsRef = this.firestore.collection('artworks');
    return exhibitionsRef.ref.where('status', '==', 'exhibition');
  }

  getExhibitionDetail() {
    return this.firestore.collection('artworks');
  }

  // cloud storage operations
  uploadImages(files: File[]) {
    files.forEach(file => {
      // create a new artwork
      const artwork = new ArtWork();
      // The storage path
      this.docId = Date.now() + '';
      const path = `artworks/images/${Date.now() + ''}_${file.name}`;
      // Reference to storage bucket
      const ref = this.storage.ref(path);
      // The main task
      const task = this.storage.upload(path, file);
      // Progress monitoring
      const percentage = task.percentageChanges();
      const snapshot = task.snapshotChanges().pipe(
        // The file's download URL
        finalize(async () => {
          this.downloadURL = await ref.getDownloadURL().toPromise();
          artwork.type = file?.type;
          artwork.title = '';
          artwork.type = 'image';
          artwork.artworkId = this.generatePushId();
          artwork.id = this.docId;
          artwork.url = this.downloadURL;
          artwork.description = '';
          artwork.status = 'exhibition';
          artwork.userId = this.userId.uid;
          artwork.createdAt = new Date().toISOString();
          artwork.updatedAt = '';
          console.log(artwork);
          const param = JSON.parse(JSON.stringify(artwork));
          this.artworksFirestoreCollection().add(param);
        })
      );

      artwork.name = file?.name;
      artwork.bytes = snapshot;
      artwork.lastModified = file?.lastModified + '';
      artwork.percentage = percentage;
      this.latestArtWorks.push(artwork);
    });
  }

}
