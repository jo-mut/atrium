import { Component, OnInit, ViewChild, ElementRef, NgZone, HostListener, Input } from '@angular/core';
import { ArtWork } from 'src/app/models/artwork';
import { AngularFireAuth } from '@angular/fire/auth';
import { ExtraDetails } from 'src/app/models/extraDetails';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize, tap, mapTo } from 'rxjs/operators';
import { MatStepper } from '@angular/material/stepper';
import { saveAs as FileSaver } from "file-saver";
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, of } from 'rxjs';
import { DbOperationsService } from 'src/app/services/db-operations.service';

@Component({
  selector: 'app-confirm-submission',
  templateUrl: './confirm-submission.component.html',
  styleUrls: ['./confirm-submission.component.scss']
})
export class ConfirmSubmissionComponent implements OnInit {


  artwork: ArtWork;
  percentage: Observable<number>;
  durationInSeconds = 5;
  extraDetails: ExtraDetails = new ExtraDetails();
  artworks: ArtWork[] = [];
  submittedWorks: ArtWork[] = [];
  files: any[] = [];
  artworkFile: File;
  pdfs: any[] = [];
  consentForm: File;
  uploadedDocuments: number = 0;
  private authState: Observable<firebase.User>;
  checkedTerms = false
  checkedPrivacy = false
  formWidth = 100;
  answered = false;
  currentUser = '';
  disabled = false;

  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private matDialog: MatDialog,
    private fauth: AngularFireAuth,
    private storage: AngularFireStorage,
    private dbOperations: DbOperationsService) {
  }


  ngOnInit() {
    this.getScreenSize();
    this.getCurrentUser();
    console.log(localStorage.getItem('currentUser'))

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

  onSubmit() {
    this.dbOperations.artwork = this.artwork;
    this.dbOperations.extraDetails = this.extraDetails;
    this.dbOperations.uploadSubjectConsentForm(this.dbOperations.consentForm, this.dbOperations.temporaryArtwork,
      this.dbOperations.file, this.dbOperations.extraDetails)
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
    this.currentUser = localStorage.getItem('currentUser');
    // this.getSubmittedArtworks(this.currentUser);
    // this.getArtistInterview(this.currentUser);
  }

  // getSubmittedArtworks(id: string) {
  //   this.dbOperations.getUserSubmittedArtworks(id)
  //     .onSnapshot(data => {
  //       data.forEach(e => {
  //         const data = e.data();
  //         const id = e.id;
  //         let work = { id, ...data } as ArtWork;
  //         this.submittedWorks.push(work);
  //       })
  //     })
  // }

  // getArtistInterview(id: string) {
  //   this.dbOperations.interviewssCollection()
  //     .ref.where('userId', '==', id)
  //     .onSnapshot(data => {
  //       if (data != null) {
  //         if (!data.empty) {
  //           this.answered = true;
  //         }
  //       }
  //     })
  // }

}
