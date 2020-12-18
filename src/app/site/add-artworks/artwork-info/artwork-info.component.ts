import { Component, OnInit, ViewChild, ElementRef, NgZone, HostListener, Input } from '@angular/core';
import { ArtWork } from 'src/app/models/artwork';
import { ExtraDetails } from 'src/app/models/extraDetails';
import { FormControl } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { DbOperationsService } from 'src/app/services/db-operations.service';


@Component({
  selector: 'app-artwork-info',
  templateUrl: './artwork-info.component.html',
  styleUrls: ['./artwork-info.component.scss']
})
export class ArtworkInfoComponent implements OnInit {

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
  submit = false;

  constructor(
    private router: Router,
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

  public OnDateChange(event): void {
    this.artwork.shotDate = event;
  }


  goForward() {
    console.log(this.artwork)
    console.log('consent form ' + this.dbOperations.consentForm)
    console.log(this.dbOperations.temporaryArtwork)
    console.log(this.dbOperations.file)
    this.dbOperations.temporaryArtwork = this.artwork;
    this.router.navigateByUrl('/confirm-submission')
  }

  getCurrentUser() {
    this.currentUser = localStorage.getItem('currentUser');
  }

}
