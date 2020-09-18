import {Component, OnInit, ViewChild, ElementRef, NgZone} from '@angular/core';
import {ArtWork} from 'src/app/models/artwork';
import {Upload} from "../../interfaces/upload";
import {DbOperationsService} from "../../services/db-operations.service";
import {VgApiService} from "@videogular/ngx-videogular/core";
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { ExtraDetails } from 'src/app/models/extraDetails';

@Component({
  selector: 'app-add-artworks',
  templateUrl: './add-artworks.component.html',
  styleUrls: ['./add-artworks.component.scss']
})
export class AddArtworksComponent implements OnInit {
  @ViewChild('fileDropRef', {static: false}) fileDropEl: ElementRef;

  artwork: ArtWork = new ArtWork();
  extraDetails: ExtraDetails =  new ExtraDetails();
  artworks: ArtWork[] = [];
  submittedWorks: ArtWork[] = [];
  files: any[] = [];
  file: File;
  currentIndex = 0;
  api: VgApiService;
  video: string;
  private authState: Observable<firebase.User>;


  constructor(
    private fauth: AngularFireAuth,
    private dbOperations: DbOperationsService) {

  }

  ngOnInit() {
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.authState = this.fauth.authState;
    this.authState.subscribe(user => {
        if (user) {
          this.getSubmittedArtworks(user.uid);
          console.log('AUTHSTATE USER', user.uid); //this works
        } else {
          console.log('AUTHSTATE USER EMPTY', user);
        }
      },
      err => {
        console.log('Please try again')
      });
  }

  getSubmittedArtworks(id: string) {
    this.dbOperations.getUserSubmittedArtworks(id)
    .onSnapshot(data => {
      data.forEach(e => {
        const data = e.data();
        const id = e.id;
        let work = {id, ...data} as ArtWork;
        this.submittedWorks.push(work);
        console.log(this.submittedWorks.length);
    })
    })
  }

  onFileSelected(event) {
    this.file = event.target.files[0];
    console.log(this.file);
  }

  onSubmit(form) {
    form.reset();
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
    console.log('on dropped' + files.length);
    this.prepareFilesList(files);
  }

  /**
   * Delete file from files list
   * @param index (File index)
   */
  deleteFile(index: number) {
    if (this.files[index].progress < 100) {
      console.log('Upload in progress.');
      return;
    }
    this.files.splice(index, 1);
  }

  /**
   * Simulate the upload process
   */
  uploadFilesSimulator(index: number) {
    if (index === this.files.length) {
      return;
    } else {

      this.dbOperations.uploadImages(this.files);
      console.log('on dropped' + this.submittedWorks.length);
      const works = this.dbOperations.latestArtWorks;
      this.artworks = works;
      console.log('on dropped' + this.files.length);
      // if (this.artworks[index].bytes === 100) {
      //   index++;
      // } else {
      //   console.log(this.artworks);
      // }
    }
  }


  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  prepareFilesList(files: Array<any>) {
    const submitterArtworks = this.artworks.length;
    const additionalArtworks = files.length;
    if(submitterArtworks + additionalArtworks >= 10) {
      window.confirm('You can only submit 10 pieces of artwork')
    }else{
      for (const item of files) {
        // if (item?.type === 'image' || item?.type === 'video') {
        //   item.progress = 0;
        //   this.files.push(item);
        // }

        item.progress = 0;
        this.files.push(item);
      }
      this.fileDropEl.nativeElement.value = '';
      this.uploadFilesSimulator(0);
    }

  }

  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  formatBytes(bytes, decimals = 2) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  onPlayerReady(api: VgApiService) {
    this.api = api;
    this.api.getDefaultMedia().subscriptions.loadedMetadata.subscribe(this.playVideo.bind(this));
  }

  playVideo() {
    this.api.play();
  }

}
