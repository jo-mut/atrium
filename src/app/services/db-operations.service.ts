import { Injectable } from '@angular/core';
import { ArtWork } from '../models/artwork';
import { AngularFirestore, QuerySnapshot, DocumentData, CollectionReference } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize, tap, mapTo } from 'rxjs/operators';
import { Upload } from 'src/app/models/upload';
import { AngularFireAuth } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})
export class DbOperationsService {
  downloadURL;
  docId: string;
  userId;
  latestArtWork: ArtWork;
  latestUplaod: Upload;

  constructor(private firestore: AngularFirestore, private fauth: AngularFireAuth,
    private storage: AngularFireStorage) {
    this.userId = fauth.currentUser;
  }

  addArtWork(artwork: ArtWork): Promise<ArtWork> {
    return new Promise<ArtWork>((resolve, reject) => {
      this.firestore.collection('gallery').add(artwork)
        .then(res => { }, err => reject(err));
    })
  }

  artWorkDetail(id: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      return this.firestore.collection('gallery').doc<ArtWork>(id)
        .snapshotChanges().subscribe(data => {
          data.payload.data() as ArtWork;
          id: data.payload.id;
          return { id, ...data };
        })
    })
  }

  generateId() {
    return Date.now() + "";
  }

  createArtworksPath() {
    // return this.fauth.authState.subscribe(user => {
    //   if (user) {
    //     let id = user.uid;
    //     console.log(id);
    //     // return this.firestore.collection('artworks')
    //     // .doc('images').collection(id);
    //   }else {
    //     console.log('user is null')
    //   }
    // })

    return this.firestore.collection('artworks')
      .doc('images').collection(' ');
  }


  // Return document snapshot of every document
  getArchivedArtWorks() {
    return this.firestore.collection('artworks')
      .doc('images').collection(' ')

  }

  updateArtWork(id: string, artWork: ArtWork): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.firestore.collection('gallery').doc<ArtWork>(id).update(artWork)
        .then(res => { }, err => reject(err));
    })
  }

  deleteArtWork(id: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.firestore.collection('gallery').doc<ArtWork>(id).delete()
        .then(res => { }, err => reject(err));
    })
  }

  // cloud storage operations
  uploadImages(file: File) {
    let upload: Upload = new Upload();
    let artwork = new ArtWork();
    // The document id
    this.docId = this.generateId();
    // The storage path
    const path = `artworks/images/${this.docId}_${file.name}`;
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
        artwork.id = this.docId;
        artwork.url = this.downloadURL;
        artwork.description = '';
        artwork.status = '';
        artwork.width = '';
        artwork.height = '';
        artwork.userId = this.userId.uid;
        artwork.createdAt = new Date().toISOString();
        artwork.updatedAt = '';
        this.latestArtWork = artwork;
        console.log(artwork)
        const param = JSON.parse(JSON.stringify(artwork));
        this.createArtworksPath().doc(this.docId).set(param);
      })
    )


    upload.name = file?.name;
    upload.bytes = snapshot;
    upload.lastmodified = file?.lastModified + '';
    upload.percentage = percentage;
    this.latestUplaod = upload
  }

}
