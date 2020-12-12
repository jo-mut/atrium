import { Component, HostListener, NgZone, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { DbOperationsService } from 'src/app/services/db-operations.service';

@Component({
  selector: 'app-social-media-info',
  templateUrl: './social-media-info.component.html',
  styleUrls: ['./social-media-info.component.scss']
})
export class SocialMediaInfoComponent implements OnInit {

  formWidth: any = 100;
  headingSize = '2.0em';
  currentUser = '';
  user: User;
  facebook: string;
  youtube: string;
  instagram: string;
  others: string;
  social: string[] = [];


  constructor(public ngZone: NgZone,
    private authService: AuthService,
    private dbOperations: DbOperationsService,
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    private router: Router) { }

  ngOnInit(): void {
    this.user = this.authService.user;
    this.getScreenSize();
    this.currentUser = localStorage.getItem('currentUser');
  }

  saveUserSocialMediaInfo() {
    this.social.push(this.facebook);
    this.social.push(this.instagram);
    this.social.push(this.others);
    this.social.push(this.youtube);
    this.user.socialMedia = this.social;
    this.authService.saveUserSociaMediaInfo(this.user)
  }

  skipSocialMedia() {
    this.authService.skipSocialMedia();
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
}

