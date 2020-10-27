import { Component, OnInit, ViewChild, ElementRef, NgZone, HostListener } from '@angular/core';
import { ArtWork } from 'src/app/models/artwork';
import { Upload } from "../../interfaces/upload";
import { DbOperationsService } from "../../services/db-operations.service";
import { VgApiService } from "@videogular/ngx-videogular/core";
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { ExtraDetails } from 'src/app/models/extraDetails';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UploadModalComponent } from './upload-modal/upload-modal.component';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize, tap, mapTo } from 'rxjs/operators';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-add-artworks',
  templateUrl: './add-artworks.component.html',
  styleUrls: ['./add-artworks.component.scss']
})
export class AddArtworksComponent implements OnInit {
  @ViewChild('fileDropRef', { static: false }) fileDropEl: ElementRef;

  artwork: ArtWork = new ArtWork();
  extraDetails: ExtraDetails = new ExtraDetails();
  artworks: ArtWork[] = [];
  submittedWorks: ArtWork[] = [];
  files: any[] = [];
  file: File;
  pdfs: any[] = [];
  subjectConsentForm: File;
  artistConsentForm: File;
  uploadedDocuments: number = 0;
  private authState: Observable<firebase.User>;
  // maxDate = new Date(2002, 11, 31);
  // minDate = new Date(1, 0, 1);

  checkedTerms = false
  checkedPrivacy = false
  formWidth = 100;
  answered = false;
  currentUser = '';
  isLinear = true;


  constructor(
    private matDialog: MatDialog,
    private fauth: AngularFireAuth,
    private storage: AngularFireStorage,
    private dbOperations: DbOperationsService) {
  }


  lauchUploadProgressDialog(artwork: ArtWork) {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = false;
    dialogConfig.id = "modal-component";
    dialogConfig.width = '300px';
    dialogConfig.height = '30px';
    dialogConfig.data = { 'progress': artwork.percentage }

    // https://material.angular.io/components/dialog/overview
    const modalDialog = this.matDialog.open(UploadModalComponent, dialogConfig);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    let width = event.target.innerWidth;
    if (width > 800) {
      this.formWidth = 80;
    }

    if (width > 1000) {
      this.formWidth = 70;

    }

    if (width > 1200) {
      this.formWidth = 60;
    }

  }

  getScreenSize() {
    let width = window.innerWidth;
    if (width > 800) {
      this.formWidth = 80;
    }

    if (width > 1000) {
      this.formWidth = 70;

    }

    if (width > 1200) {
      this.formWidth = 60;
    }
  }

  ngOnInit() {
    this.getScreenSize();
    this.getCurrentUser();

  }

  goBack(stepper: MatStepper) {
    stepper.previous();
  }

  goForward(stepper: MatStepper) {
    stepper.next();
  }

  checkReadTermsValue() {
    console.log(this.checkedTerms)
    if (!this.checkedTerms) {
      this.checkedTerms = true;
    } else {
      this.checkedTerms = false;
    }

  }

  checkReadPrivacy() {
    if (!this.checkedPrivacy) {
      this.checkedPrivacy = true;
    } else {
      this.checkedPrivacy = false;
    }

  }

  getCurrentUser() {
    this.authState = this.fauth.authState;
    this.authState.subscribe(user => {
      if (user) {
        this.currentUser = user.uid;
        this.getSubmittedArtworks(this.currentUser);
        console.log('AUTHSTATE USER', user.uid); //this works
        this.getArtistInterview(this.currentUser);
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
          let work = { id, ...data } as ArtWork;
          this.submittedWorks.push(work);
          console.log(this.submittedWorks.length);
        })
      })
  }

  getArtistInterview(id: string) {
    this.dbOperations.interviewssCollection()
      .ref.where('userId', '==', id)
      .onSnapshot(data => {
        if (data != null) {
          this.answered = true;
        }
      })
  }

  onFileSelected(event) {
    this.file = event.target.files[0];
    if (this.file.type.includes('video')) {
      if (this.file.type == "video") {
      }
    } else if (this.file.type.includes('image')) {
      this.files.push(this.file);
    } else {

    }
  }

  onSubjectConsentSelected(event) {
    this.subjectConsentForm = event.target.files[0];
    console.log(this.subjectConsentForm + 'sibject form')

  }

  onArtistConsentSelected(event) {
    this.artistConsentForm = event.target.files[0];
    console.log(this.artistConsentForm + 'artist form')

  }


  downloadSubjectConsentForm() {
    const storageRef = this.storage.ref('consent/Subject Consent Form.pdf')
    storageRef.getDownloadURL().subscribe(data => {
      console.log(data)
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'blob';
      xhr.onload = function (event) {
        var blob = xhr.response;
      };
      xhr.open('GET', data);
      xhr.send();
    })
  }

  downloadArtistCOnsentForm() {
    const storageRef = this.storage.ref('consent/Artist Consent Form.pdf')
    storageRef.getDownloadURL().subscribe(data => {
      console.log(data)
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'blob';
      xhr.onload = function (event) {
        var blob = xhr.response;
      };
      xhr.open('GET', data);
      xhr.send();
    })
  }

  public OnDateChange(event): void {
    this.artwork.shotDate = event;
  }


  uploadSubjectConsentForm() {
    if (this.subjectConsentForm != null) {
      let ext = this.subjectConsentForm.name.substring(this.subjectConsentForm.name.lastIndexOf('.') + 1);
      if (ext === 'pdf') {
        this.artwork.userId = this.currentUser;
        this.extraDetails.userId = this.currentUser;
        const path = `artworks/documents/${Date.now() + ''}_${this.subjectConsentForm.name}`;
        // Reference to storage bucket
        const ref = this.storage.ref(path);
        // The main task
        const task = this.storage.upload(path, this.subjectConsentForm);
        // Progress monitoring
        let percentage = task.percentageChanges();
        const snapshot = task.snapshotChanges().pipe(finalize(async () => {
          let downloadUrl = await ref.getDownloadURL().toPromise();

          this.artwork.subjectConsentForm = downloadUrl;

        })
        ).subscribe(data => {
          if (data.bytesTransferred == data.totalBytes) {
            this.dbOperations.uploadArtwork(this.file, this.artwork, this.extraDetails)
              .then((res) => {
                console.log(this.artwork.percentage)
              }).catch((rej) => {
                window.alert(rej.message)
              })
            console.log('on dropped' + this.submittedWorks.length);
            const works = this.dbOperations.latestArtWorks;
          }
        });
        return percentage

      }
    }


  }

  uploadArtistConsentForm() {
    if (this.artistConsentForm != null) {
      let ext = this.artistConsentForm.name.substring(this.artistConsentForm.name.lastIndexOf('.') + 1);
      if (ext === 'pdf') {
        console.log(this.artistConsentForm)
        this.artwork.userId = this.currentUser;
        this.extraDetails.userId = this.currentUser;
        const path = `artworks/documents/${Date.now() + ''}_${this.artistConsentForm.name}`;
        // Reference to storage bucket
        const ref = this.storage.ref(path);
        // The main task
        const task = this.storage.upload(path, this.artistConsentForm);
        // Progress monitoring
        let percentage = task.percentageChanges();
        const snapshot = task.snapshotChanges().pipe(finalize(async () => {
          let downloadUrl = await ref.getDownloadURL().toPromise();

          this.artwork.artistConsentForm = downloadUrl;


        })
        ).subscribe(data => {
          if (data.bytesTransferred == data.totalBytes) {
            this.uploadSubjectConsentForm()
          }
        })

        return percentage

      }
    }

  }


  uploadConsentForms() {
    var promise = new Promise((resolve, reject) => {
      for (let pdf of this.pdfs) {
        if (pdf.name === 'subjectConsent') {
          let ext = this.file.name.substring(this.file.name.lastIndexOf('.') + 1);
          this.artwork.userId = this.currentUser;
          this.extraDetails.userId = this.currentUser;
          const path = `artworks/documents/${Date.now() + ''}_${pdf.file.name}`;
          // Reference to storage bucket
          const ref = this.storage.ref(path);
          // The main task
          const task = this.storage.upload(path, pdf.file);
          // Progress monitoring
          let percentage = task.percentageChanges();
          const snapshot = task.snapshotChanges().pipe(finalize(async () => {
            let downloadUrl = await ref.getDownloadURL().toPromise();

            this.artwork.subjectConsentForm = downloadUrl;

          })
          ).subscribe();
          return percentage
        }

        if (pdf.name === 'artistConsent') {
          let ext = this.file.name.substring(this.file.name.lastIndexOf('.') + 1);
          this.artwork.userId = this.currentUser;
          this.extraDetails.userId = this.currentUser;
          const path = `artworks/documents/${Date.now() + ''}_${pdf.file.name}`;
          // Reference to storage bucket
          const ref = this.storage.ref(path);
          // The main task
          const task = this.storage.upload(path, pdf.file);
          // Progress monitoring
          let percentage = task.percentageChanges();
          const snapshot = task.snapshotChanges().pipe(finalize(async () => {
            let downloadUrl = await ref.getDownloadURL().toPromise();

            this.artwork.artistConsentForm = downloadUrl;


          })
          ).subscribe();
          return percentage
        }

      }
    });

    return promise;
  }

  onSubmit() {
    if (this.submittedWorks.length <= 2) {
      console.log(this.artwork.shotDate);
      console.log(this.artistConsentForm)
      if (this.checkedPrivacy && this.checkReadTermsValue) {
        this.uploadArtistConsentForm();

        // if (this.file != null) {
        //   let ext = this.file.name.substring(this.file.name.lastIndexOf('.') + 1);
        //   if (ext === 'png' || ext === 'jpg' || ext === ' JPEG'
        //     || ext === 'mp4' || ext === 'mov') {
        //     this.dbOperations.uploadArtwork(this.file, this.artwork, this.extraDetails)
        //       .then((res) => {
        //         form.reset;
        //       }).catch((rej) => {
        //         window.alert('Upload failed')
        //       })
        //     console.log('on dropped' + this.submittedWorks.length);
        //     const works = this.dbOperations.latestArtWorks;

        //     console.log('on dropped' + { ...works });
        //   } else {
        //     window.alert('Please upload either jpg, .png, .mov or .mp4 file')
        //   }
        // } else {
        //   window.alert('Please upload profile picture')
        // }
      } else {
        window.alert('Confirm that you have read the Terms and Conditions')
      }
    } else {
      window.alert('You can only submit two pieces of your artwork')

    }
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

      // this.dbOperations.uploadImages(this.file, this.artwork);
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
    if (submitterArtworks + additionalArtworks >= 10) {
      window.confirm('You can only submit 10 pieces of artwork')
    } else {
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

}
