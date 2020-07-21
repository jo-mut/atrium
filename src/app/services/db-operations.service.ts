import { Injectable } from '@angular/core';
import { ArtWork } from '../models/artwork';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize, tap, mapTo } from 'rxjs/operators';
import { Upload } from 'src/app/models/upload';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';


@Injectable({
  providedIn: 'root'
})
export class DbOperationsService {
  downloadURL: any;
  docId: string;
  userId: any;
  latestArtWork: ArtWork;
  latestUplaod: Upload;
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

  createArtworksPath() {
    return this.firestore.collection('artworks');
  }

  // Return document snapshot of every document
  getArchivedArtWorks() {
    return this.firestore.collection<ArtWork>('artworks');
  }

  getArchivedArtWorkById() {
   return this.firestore.collection<ArtWork>('artworks');
  }

  getExhibitions() {
    let exhibitionsRef = this.firestore.collection('artworks');
    return exhibitionsRef.ref.where('status', '==', 'exhibition');
  }

  getAllExhibitions() {
    let exhibitionsRef = this.firestore.collection('artworks');
    return exhibitionsRef.ref.where('status', '==', 'exhibition')
  }

  getExhibitionDetail() {
    return this.firestore.collection('artworks');
  }

  // cloud storage operations
  uploadImages(file: File) {
    // create a new uploading process
    let upload: Upload = new Upload();
    // create a new artwork
    let artwork = new ArtWork();
    // The storage path
    this.docId = Date.now() + "";
    const path = `artworks/images/${ Date.now() + ""}_${file.name}`;
    // Reference to storage bucket
    const ref = this.storage.ref(path)
    // The main task
    let task = this.storage.upload(path, file);
    // Progress monitoring
    let percentage = task.percentageChanges();
    let snapshot = task.snapshotChanges().pipe(
      // The file's download URL
      finalize(async () => {
        this.downloadURL = await ref.getDownloadURL().toPromise();
        artwork.type = file?.type;
        artwork.title = '';
        artwork.type = 'image'
        artwork.exhibitionId =  this.generatePushId();
        artwork.id = this.docId;
        artwork.url = this.downloadURL;
        artwork.description = '';
        artwork.status = 'exhibition';
        artwork.userId = this.userId.uid;
        artwork.createdAt = new Date().toISOString();
        artwork.updatedAt = '';
        this.latestArtWork = artwork;
        console.log(artwork)
        const param = JSON.parse(JSON.stringify(artwork));
        this.createArtworksPath().add(param);
        this.router.navigateByUrl('/main/create');
      })
    )


    
    upload.name = file?.name;
    upload.bytes = snapshot;
    upload.lastmodified = file?.lastModified + '';
    upload.percentage = percentage;
    this.latestUplaod = upload
  }

}
