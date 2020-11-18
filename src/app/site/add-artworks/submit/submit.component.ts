import { Component, ElementRef, HostListener, Input, NgZone, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ArtWork } from 'src/app/models/artwork';
import { ExtraDetails } from 'src/app/models/extraDetails';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { DbOperationsService } from 'src/app/services/db-operations.service';
import { TermModalComponent } from '../../create-profile/term-modal/term-modal.component';
import { finalize, tap, mapTo } from 'rxjs/operators';

@Component({
  selector: 'app-submit',
  templateUrl: './submit.component.html',
  styleUrls: ['./submit.component.scss']
})
export class SubmitComponent implements OnInit {
  @ViewChild('fileDropRef', { static: false }) fileDropEl: ElementRef;
  @Input() progress = 0;
  percentage: Observable<number>;
  durationInSeconds = 5;
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
  uploadProgress: any = null;

  private authState: Observable<firebase.User>;

  checkedTerms = false
  checkedPrivacy = false
  formWidth = 100;
  answered = false;
  currentUser = '';
  disabled = false;
  isLinear = true;

  constructor(private authService: AuthService,
    public ngZone: NgZone,
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    private router: Router,
    private snackBar: MatSnackBar,
    private fauth: AngularFireAuth,
    private storage: AngularFireStorage,
    private dbOperations: DbOperationsService) {
  }

  ngOnInit(): void {
    this.getScreenSize();
    this.uploadArtwork(this.dbOperations.file, this.dbOperations.artwork, this.dbOperations.extraDetails)
  }

  uploadArtwork(file: File, artwork: ArtWork, extraDetails: ExtraDetails) {
    var promise = new Promise((resolve, reject) => {
      if (file != null) {
        let path = ''
        const docId = Date.now() + '';
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
        this.percentage = task.percentageChanges();
        const snapshot = task.snapshotChanges().pipe(finalize(async () => {
          let downloadUrl = await ref.getDownloadURL().toPromise();
          artwork.name = file.name;
          artwork.artworkId = this.dbOperations.generatePushId();
          artwork.id = docId;
          artwork.url = downloadUrl;
          artwork.status = 'filter';
          artwork.createdAt = new Date().toISOString();
          artwork.updatedAt = '';
          artwork.lastModified = file?.lastModified + '';

          console.log(JSON.parse(JSON.stringify(artwork)))
          console.log(JSON.parse(JSON.stringify(extraDetails)))
          const extra = JSON.parse(JSON.stringify(extraDetails));
          const param = JSON.parse(JSON.stringify(artwork));

          this.dbOperations.artworksCollection().doc(artwork.artworkId).set(param);
          this.dbOperations.interviewssCollection().doc(artwork.artworkId).set(extra);

        })
        ).subscribe(data => {
          this.uploadProgress = of(Math.round((data.bytesTransferred / data.totalBytes) * 100))
          console.log(this.uploadProgress)
          if (data.bytesTransferred == data.totalBytes) {
            this.router.navigateByUrl('/')
          }
        });

      }

      return this.percentage;
    });
    return promise;
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

  
  openSnackBar() {
    this.snackBar.openFromComponent(SubmitComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }
}
