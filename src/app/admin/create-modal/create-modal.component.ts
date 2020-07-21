import { Component, OnInit } from '@angular/core';
import { Upload } from 'src/app/models/upload';
import { DbOperationsService } from 'src/app/services/db-operations.service';
import { Router } from '@angular/router';
import { ArtWork } from 'src/app/models/artwork';


@Component({
  selector: 'app-create-modal',
  templateUrl: './create-modal.component.html',
  styleUrls: ['./create-modal.component.scss']
})
export class CreateModalComponent implements OnInit {
  uploads: Upload[] = [];
  newExhibitions: ArtWork[] = [];
  files: File[] = [];

  constructor(private dbOperations: DbOperationsService) { }

  ngOnInit(): void {
    
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
    for (let file of files) {
      this.dbOperations.uploadImages(file);
      let snapshot = this.dbOperations.latestUplaod.bytes;
      let upload = this.dbOperations.latestUplaod;
      let work = this.dbOperations.latestArtWork;
      this.uploads.push(upload);
      this.newExhibitions.push(work);
      console.log(this.uploads);

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
    this.uploads.push(this.dbOperations.latestUplaod)
  }

  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  }

}
