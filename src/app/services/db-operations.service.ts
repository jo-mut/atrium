import { Injectable } from '@angular/core';
import { ArtWork } from '../models/artwork';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize, tap, mapTo } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { Curator } from '../models/curator';


@Injectable({
  providedIn: 'root'
})
export class DbOperationsService {
  downloadURL: any;
  docId: string;
  userId: string;
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
    return this.authState
  }

  generatePushId(): string {
    return this.firebase.createPushId();
  }

  usersCollection() {
    return this.firestore.collection('users');
  }

  usersCollectionById(userId: string) {
    let userRef = this.firestore.collection('users');
    return userRef.ref.where('userId', '==', userId);
  }

  curatorsCollection() {
    return this.firestore.collection('curators');
  }

  // Return document snapshot of every document
  artworksFirestoreCollection() {
    return this.firestore.collection<ArtWork>('artworks');
  }

  getFeaturedArtworks() {
    let featuredRef = this.artworksFirestoreCollection();
    return featuredRef.ref.where('status', '==', 'featured')
  }

  getArtworkReviewedBy(userId: string) {
    let reviewedRef = this.artworksFirestoreCollection();
    return reviewedRef.ref.where('reviewedBy', '==', userId)
  }

  getArtworkApprovedBy(userId: string) {
    let approvedRef = this.artworksFirestoreCollection();
    return approvedRef.ref.where('approvedBy', '==', userId)
  }

  getArtworkScores(artworkId: string) {
    let approvedRef = this.scoresCollections();
    return approvedRef.ref.where('artworkId', '==', artworkId)
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

  scoresCollections() {
    return this.firestore.collection('scores');
  }

  createCurator(curator: Curator, file: File) {
    const path = `curators/images/${Date.now() + ''}_${file?.name}`;
    // Reference to storage bucket
    const ref = this.storage.ref(path);
    // The main task
    const task = this.storage.upload(path, file);
    // Progress monitoring
    const percentage = task.percentageChanges();
    task.snapshotChanges().pipe(finalize(async () => {
      let downloadUrl = await ref.getDownloadURL().toPromise();
      curator.profileImage = downloadUrl;
      const param = JSON.parse(JSON.stringify(curator));
      this.curatorsCollection().doc(curator.curatorId).set(param);
    })
    ).subscribe();

    return percentage;
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
          artwork.userId = this.userId;
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
