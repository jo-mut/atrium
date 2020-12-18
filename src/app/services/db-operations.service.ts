import { Injectable } from '@angular/core';
import { ArtWork } from '../models/artwork';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize, tap, mapTo } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import { Curator } from '../models/curator';
import { ExtraDetails } from '../models/extraDetails';
import { Score } from '../models/score';
import { TeamData } from '../site/team/team.component';
import { HomeData } from '../site/home/home.component';
import { StoriesData } from '../site/campaign/campaign.component';
import { Guidelines } from '../site/call/call.component';
import { Contact } from '../site/contact-us/contact-us.component';


@Injectable({
  providedIn: 'root'
})
export class DbOperationsService {
  downloadURL: any;
  docId: string;
  userId: string;
  temporaryArtwork: ArtWork;
  latestArtWorks: ArtWork[] = [];
  uploadingArtwork: ArtWork = new ArtWork();
  artwork: ArtWork = new ArtWork();
  extraDetails: ExtraDetails = new ExtraDetails();
  file: File;
  consentForm: File;
  percentage: Observable<number> = of(0)
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

  messageCollections() {
    return this.firestore.collection<Contact>('messages');
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

  uploadSubjectConsentForm(subjectConsentForm: any, artwork: ArtWork, 
    file: File, extraDetails: ExtraDetails) {
      console.log(subjectConsentForm)
      console.log(artwork)
      console.log(extraDetails)
      console.log(file)
      console.log(localStorage.getItem('currentUser'))
    if (subjectConsentForm != null) {
      // let ext = subjectConsentForm.name.substring(subjectConsentForm.name.lastIndexOf('.') + 1);
      // if (ext === 'pdf') {
       

      // }

      artwork.userId = localStorage.getItem('currentUser');
      extraDetails.userId = localStorage.getItem('currentUser');
      const path = `artworks/documents/${Date.now() + ''}_${subjectConsentForm.name}`;
      // Reference to storage bucket
      const ref = this.storage.ref(path);
      // The main task
      const task = this.storage.upload(path, subjectConsentForm);
      // Progress monitoring
      let percentage = task.percentageChanges();
      const snapshot = task.snapshotChanges().pipe(finalize(async () => {
        let downloadUrl = await ref.getDownloadURL().toPromise();
        artwork.subjectConsentForm = downloadUrl;

      })
      ).subscribe(data => {
        if (data.bytesTransferred == data.totalBytes) {
            this.artwork = artwork;
            this.extraDetails = extraDetails;
            this.file = file;
            this.router.navigateByUrl('/project/submit')
        }
      });
      return percentage
    }
  }

}
