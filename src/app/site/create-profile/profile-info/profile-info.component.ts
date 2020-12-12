import { Component, HostListener, NgZone, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { DbOperationsService } from 'src/app/services/db-operations.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss']
})
export class ProfileInfoComponent implements OnInit {

  user: User;
  maxDate: Date = null;
  minDate = new Date(1985, 0, 1);
  genders: string[] = ['Male', 'Female', 'Other', 'Prefer not to say'];
  formWidth: any = 100;
  headingSize = '2.0em';
  currentUser = '';

  constructor(public ngZone: NgZone,
    private authService: AuthService,
    private dbOperations: DbOperationsService,
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    private router: Router) { }

  ngOnInit(): void {
    this.getScreenSize();
    this.currentUser = localStorage.getItem('currentUser');
    this.user = this.authService.user;
    let timeIn18yrs = Date.now() - 1088640000000
    // get year, date, and month from timestamp;
    let d = new Date(timeIn18yrs);
    let yr = d.getFullYear();
    let date = d.getDate();
    let month = d.getMonth();
    this.maxDate = new Date(yr, date, month)
  }

  saveUserProfileInfo() {
    this.authService.saveUserProfileInfo(this.user)

  }

  selectOption(event) {
    console.log(event);
    this.user.gender = event;
  }

  public OnDateChange(event): void {
    let date: string = new DatePipe('en').transform(event, 'yyyy/MM/dd');
    console.log(event)
    let timeDiff = Math.abs(Date.now() - event.getTime());
    let age = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365.25);
    this.user.birthDate = date.toString();
    // if (age < 18) {
    //   // window.alert('Sorry! The minimum age to participate is 18yrs old')
    //   this.user.birthDate = 'younger than 18yrs'
    // } else {
   
    //   console.log(this.user.birthDate)
    // }
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
