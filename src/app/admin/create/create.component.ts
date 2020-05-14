import { Component, OnInit } from '@angular/core';
import { DbOperationsService } from 'src/app/services/db-operations.service';
import { Observable } from 'rxjs';
import { ArtWork } from 'src/app/models/artwork';
import { Upload } from 'src/app/models/upload';
import { QuerySnapshot, DocumentData } from '@angular/fire/firestore/interfaces';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  files: File[] = [];
  artwork: ArtWork = null;
  uploads: Upload[] = [];
  artworks: ArtWork[] = [];

  constructor(private dbOperations: DbOperationsService) {}

  ngOnInit() {

  }

  /**
   * on file drop handler
   */
  onFileDropped($event) {
    this.prepareFilesList($event);
  }

  /**
   * handle file from browsing
   */
  fileBrowseHandler(files) {
    this.prepareFilesList(files);
  }

  /**
   * Delete file from files list
   * @param index (File index)
   */
  deleteFile(index: number) {
    this.files.splice(index, 1);
  }

  /**
   * Simulate the upload process
   */
  // uploadFilesSimulator(index: number) {
  //   setTimeout(() => {
  //     if (index === this.files.length) {
  //       return;
  //     } else {
  //       const progressInterval = setInterval(() => {
  //         if (this.files[index].progress === 100) {
  //           clearInterval(progressInterval);
  //           this.uploadFilesSimulator(index + 1);
  //         } else {
  //           this.files[index].progress += 5;
  //         }
  //       }, 200);
  //     }
  //   }, 1000);
  // }

  
  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  prepareFilesList(files: File[]) {
    for(let file of files) {
      this.dbOperations.uploadImages(file);
      let snapshot = this.dbOperations.latestUplaod.percentage;
      let upload = this.dbOperations.latestUplaod;
      let work = this.dbOperations.latestArtWork;
      while(this.isActive(snapshot.percentage)) {
        this.uploads.push(upload);
        this.artworks.push(work);
      }

    }

  }

  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  formatBytes(bytes, decimals?) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  startUpload(file: File) {
    this.uploads.push(this.dbOperations.uploadImages(file)) 
  }

  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  }


   // Get a list of archived artwork
   private getArchivedArtWorks() {
    let artWork = new ArtWork();
    this.dbOperations.getArchivedArtWorks().get()
    .toPromise().then((querySnapshot: QuerySnapshot<DocumentData>) => {
        if (!querySnapshot.empty) {
          for (const doc of querySnapshot.docs) {
            artWork.description = doc.data().description;
            artWork.id = doc.data().id;
            artWork.title = doc.data().title;
            artWork.url = doc.data().url;
            artWork.type = doc.data().type;
            artWork.createdAt = doc.data().createdAt;
            artWork.updatedAt = doc.data().updatedAt;
            artWork.height = doc.data().height;
            artWork.width = doc.data().width;
            artWork.status = doc.data().status;   
            artWork.status = doc.data().status;   
            this.artworks.push(artWork);    
          }
        }
      }).catch(function (error) {
        console.log("Error getting document:", error);
      });
  }

}
