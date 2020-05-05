import { Component, OnInit } from '@angular/core';
import { DbOperationsService } from 'src/app/services/db-operations.service';
import { Observable } from 'rxjs';
import { ArtWork } from 'src/app/models/artwork';
import { Upload } from 'src/app/models/upload';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  files: File[] = [];
  artwork: ArtWork = null;
  uploads: Upload[] = [];

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
    for (let i = 0; i < files.length; i++) {
     this.files.push(files[i]);
    //  this.startUpload(files[i]);
     console.log(files[i]);
    }

    this.startUpload(files);


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

  startUpload(files: File[]) {
    this.uploads.push(this.dbOperations.uploadImages(files)); 
  }

  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  }


}
