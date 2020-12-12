import { Component, OnInit, ViewChild, ElementRef, NgZone, HostListener, Input } from '@angular/core';
import { ArtWork } from 'src/app/models/artwork';
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
import { AngularFireAuth } from '@angular/fire/auth';
import { DbOperationsService } from 'src/app/services/db-operations.service';

@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.scss']
})
export class UploadFilesComponent implements OnInit {

  @ViewChild('fileDropRef', { static: false }) fileDropEl: ElementRef;
  @Input() progress = 0;
  percentage: Observable<number>;
  artwork: ArtWork = new ArtWork();
  extraDetails: ExtraDetails = new ExtraDetails();
  artworks: ArtWork[] = [];
  submittedWorks: ArtWork[] = [];
  files: any[] = [];
  artworkFile: File;
  pdfs: any[] = [];
  consentForm: File;
  uploadedDocuments: number = 0;
  checkedTerms = false
  checkedPrivacy = false
  formWidth = 100;
  answered = false;
  currentUser = '';
  disabled = false;
  submit = true;


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
    this.goForward();
  }

  goForward() {
    if (this.artworkFile != null) {
      // let artExt = this.artworkFile.name.substring(this.artworkFile.name.lastIndexOf('.') + 1);
      // let consentExt = this.consentForm.name.substring(this.consentForm.name.lastIndexOf('.') + 1);

      if (!this.artworkFile.type.includes('video') && !this.artworkFile.type.includes('image')) {
      
        window.alert('Please upload photography/videography artwork')
      } else{
        this.dbOperations.file = this.artworkFile;

      }

    } else {
      this.submit = false;
      window.alert('Please upload photography/videography artwork')
    }

    if (this.consentForm != null) {
      this.dbOperations.consentForm = this.consentForm;

      // if (this.consentForm.type.includes('pdf')) {
        // this.dbOperations.consentForm = this.consentForm;
      // } else {
      //   window.alert('Your consent form is not a .pdf');
      //   this.submit = false;
      // }
    } else {
      this.submit = false;
      window.alert('Please upload your consent form')
    }

    if (this.submit) {
      this.dbOperations.temporaryArtwork = this.artwork;
      this.router.navigateByUrl('/artwork-info')
    }

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

  }


  onFileSelected(event) {
    let selectedFile = event.target.files[0];
    if (!selectedFile.type.includes('video') && !selectedFile.type.includes('image')) {
      window.alert('Please upload photography/videography artwork')
    } else {
      this.submit = true;
      this.artworkFile = selectedFile;
    }
  }

  onSubjectConsentSelected(event) {
    let selectedForm = event.target.files[0];

    let consentExt = selectedForm.name.substring(selectedForm.name.lastIndexOf('.') + 1);
    if (consentExt === "pdf") {
      this.submit = true;
      this.consentForm = selectedForm;
    } else {
      window.alert('Your consent form is not a .pdf');
    }

  }

  downloadConsentForm() {
    const storageRef = this.storage.ref('consent/PARTICIPANT CONSENT AND RELEASE FORM.pdf')
    storageRef.getDownloadURL().subscribe(data => {
      console.log(data)
      FileSaver(data, "subject-consent-form.pdf")
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'blob';
      xhr.onload = function (event) {
        var blob = xhr.response;
        FileSaver(blob, "PARTICIPANT CONSENT AND RELEASE FORM.pdf");

      };
      // xhr.open('GET', data);
      // xhr.send();
    })
  }

  downloadArtistCOnsentForm() {
    const storageRef = this.storage.ref('consent/PARTICIPANT CONSENT AND RELEASE FORM.pdf')
    storageRef.getDownloadURL().subscribe(data => {
      console.log(data)
      FileSaver(data, "PARTICIPANT CONSENT AND RELEASE FORM.pdf");

      var xhr = new XMLHttpRequest();
      xhr.responseType = 'blob';
      xhr.onload = function (event) {
        var blob = xhr.response;

      };
      // xhr.open('GET', data);
      // xhr.send();
    })
  }


  public OnDateChange(event): void {
    this.artwork.shotDate = event;
  }
}
