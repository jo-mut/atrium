import { Injectable } from '@angular/core';
import { ArtWork } from '../models/artwork';
import { AngularFirestore, QuerySnapshot, DocumentData, CollectionReference } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize, tap } from 'rxjs/operators';
import { Upload } from 'src/app/models/upload';


@Injectable({
  providedIn: 'root'
})
export class DbOperationsService {
  downloadURL;
  docId: string;

  constructor(private firestore: AngularFirestore,
    private storage: AngularFireStorage) {

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
    return this.firestore.collection('artworks')
      .doc('images').collection('images');
  }


  // Return document snapshot of every document
  getArchivedArtWorks() {
    return this.firestore.collection('artworks')
      .doc('images').collection('images')
  
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
  uploadImages(files: File[]): Upload{
    let upload: Upload = new Upload();
    for(let file of files) {
    // The storage path
    const path = `artworks/images/${Date.now()}_${file.name}`;
    // Reference to storage bucket
    const ref = this.storage.ref(path)
    // The main task
    let task = this.storage.upload(path, file);
    // The document id
    this.docId = this.generateId();
    // Progress monitoring
    let percentage = task.percentageChanges();
    let snapshot = task.snapshotChanges().pipe(
      // The file's download URL
      finalize(async () => {
        this.downloadURL = await ref.getDownloadURL().toPromise();
        let artwork = new ArtWork();
        artwork.title = '';
        artwork.id = this.docId;
        artwork.type = file?.type;
        artwork.url = this.downloadURL;
        artwork.description = '';
        artwork.status = 'archived';
        artwork.width = '';
        artwork.height = '';
        artwork.createdAt = new Date().toISOString();
        artwork.updatedAt = '';
        console.log(artwork)
        const param = JSON.parse(JSON.stringify(artwork));
        this.createArtworksPath().doc(this.docId).set(param);
      }),
    );

    upload.name = file?.name;
    upload.bytes = snapshot;
    upload.lastmodified = file?.lastModified + '';
    upload.percentage = percentage;
    }

    return upload;
  }

}
