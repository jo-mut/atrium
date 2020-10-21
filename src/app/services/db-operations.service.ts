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
import { ExtraDetails } from '../models/extraDetails';
import { Score } from '../models/score';
import { TeamData } from '../site/team/team.component';
import { HomeData } from '../site/home/home.component';
import { StoriesData } from '../site/campaign/campaign.component';
import { Guidelines } from '../site/call/call.component';


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

  getFirestore() {
    return this.firestore;
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

  interviewssCollection() {
    return this.firestore.collection('interviews');
  }

  // Return document snapshot of every document
  artworksCollection() {
    return this.firestore.collection<ArtWork>('artworks');
  }

  getFeaturedArtworks() {
    let featuredRef = this.artworksCollection();
    return featuredRef.ref.where('status', '==', 'featured')
  }

  getTeamProfileImage() {
    return this.firestore.collection<TeamData>('site').doc('team')
  }

  getHomePageData() {
    return this.firestore.collection<HomeData>('site').doc('home')
  }

  getGuidelinesData() {
    return this.firestore.collection<Guidelines>('site').doc('guidelines');

  }

  getStoriesData() {
    return this.firestore.collection<StoriesData>('site').doc('stories');
  }


  getArtworkReviewedBy(userId: string) {
    let reviewedRef = this.artworksCollection();
    return reviewedRef.ref.where('reviewedBy', '==', userId)
  }

  getArtworkApprovedBy(userId: string) {
    let approvedRef = this.artworksCollection();
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
    return exhibitionsRef.ref.where('status', '==', 'featured');
  }

  getExhibitionDetail() {
    return this.firestore.collection('artworks');
  }

  scoresCollections() {
    return this.firestore.collection<Score>('scores');
  }

  createCurator(curator: Curator, file?: File) {
    let param = null;
    let percentage = null

    if (file != null) {
      const path = `curators/images/${Date.now() + ''}_${file?.name}`;
      // Reference to storage bucket
      const ref = this.storage.ref(path);
      // The main task
      const task = this.storage.upload(path, file);
      // Progress monitoring
      percentage = task.percentageChanges();
      task.snapshotChanges().pipe(finalize(async () => {
        let downloadUrl = await ref.getDownloadURL().toPromise();
        curator.profileImage = downloadUrl;
        param = JSON.parse(JSON.stringify(curator));
        this.curatorsCollection().doc(curator.curatorId).set(param);
      })
      ).subscribe();
    } else {
      this.curatorsCollection().doc(curator.curatorId).set(param);
    }

    return percentage;
  }

  uploadArtwork(file: File, artwork: ArtWork, extraDetails: ExtraDetails) {
    var promise = new Promise((resolve, reject) => {
      let param = null;
      let percentage = null
      if (file != null) {
        let path = ''
        this.docId = Date.now() + '';
        if (file.type.includes('video')) {
          artwork.type = 'video';
          path = `artworks/videos/${Date.now() + ''}_${file.name}`;
          console.log(path)
        }

        if (file.type.includes('image')) {
          artwork.type = 'image';
          path = `artworks/images/${Date.now() + ''}_${file.name}`;
          console.log(path)

        }
        // Reference to storage bucket
        const ref = this.storage.ref(path);
        // The main task
        const task = this.storage.upload(path, file);
        // Progress monitoring
        percentage = task.percentageChanges();
        const snapshot = task.snapshotChanges().pipe(finalize(async () => {
          let downloadUrl = await ref.getDownloadURL().toPromise();

          artwork.name = file.name;
          artwork.artworkId = this.generatePushId();
          artwork.id = this.docId;
          artwork.url = downloadUrl;
          artwork.status = 'filter';
          artwork.createdAt = new Date().toISOString();
          artwork.updatedAt = '';
          console.log(JSON.parse(JSON.stringify(artwork)))
          console.log(JSON.parse(JSON.stringify(extraDetails)))
          const extra = JSON.parse(JSON.stringify(extraDetails));
          const param = JSON.parse(JSON.stringify(artwork));

          this.artworksCollection().doc(artwork.artworkId).set(param);
          this.interviewssCollection().doc(artwork.artworkId).set(extra);
          this.router.navigateByUrl('project')

        })
        ).subscribe();
        artwork.name = file?.name;
        artwork.bytes = snapshot;
        artwork.lastModified = file?.lastModified + '';
        artwork.percentage = percentage;
        this.latestArtWorks.push(artwork);
      }

      return percentage;
    });
    return promise;
  }

}
