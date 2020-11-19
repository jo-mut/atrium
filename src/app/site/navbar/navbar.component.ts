import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbOperationsService } from 'src/app/services/db-operations.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  private hidden = false
  checked = 0;
  role: string = '';
  action: string = 'Submit';
  login = 'Log In'
  loggedIn: boolean;
  userId: string = null;
  showSubmit: boolean = false;
  showAuthButton: boolean = true;
  // activeLink: any;
  private authState: Observable<firebase.User>;

  constructor(private router: Router,
    public ngZone: NgZone,
    private authService: AuthService,
    private dbOperations: DbOperationsService) { }

  ngOnInit(): void {
    this.authState = this.authService.afAuth.authState;
    this.userId = localStorage.getItem('currentUser');

    // this.activeLink = {
    //   "color": "teal"
    // }

  }



  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    if (this.userId != null) {
      this.getUserRole(this.userId);

      if (this.role === 'admin') {
        this.login = 'Log Out'
        this.showAuthButton = true;
      }

      if (this.role === 'artist') {
        this.action = 'Submit'
        this.showSubmit = true;
        this.showAuthButton = true;
      }

    } else {
      this.login = 'Submit'
      this.showSubmit = false;
      this.showAuthButton = true;
    }

  }

  showHideSidebar() {
    if (this.hidden) {
      this.hidden = false;
    } else {
      this.hidden = true;
    }
  }


  goToSubmitArtworks() {
    if (this.userId != null) {
      console.log(this.userId + ' current user')
      this.navigateUserAdmin(this.userId)
    } else {
      console.log(this.userId + ' current user')
      this.router.navigateByUrl('/create-profile')
    }
  }

  getUserRole(userId: string) {
    this.dbOperations.usersCollectionById(userId)
      .get().then(data => {
        if (!data.empty) {
          data.forEach(e => {
            console.log('AUTHSTATE USER', e.data);
            const data = e.data();
            const id = e.id;
            let u = { ...data } as User;
            let roles = u.role;

            console.log(roles)
            if (roles.includes('moderator')) {
              this.action = 'Console'
              this.role = 'admin'
              this.login = 'Log Out'
              this.showAuthButton = true;
              this.showSubmit = true;



              console.log('AUTHSTATE USER', 'admin');
            } else if (roles.includes('scoring')) {
              this.action = "Score"
              this.role = 'admin'
              this.login = 'Log Out'
              this.showSubmit = true;
              this.showAuthButton = true;


            } else if (roles.includes('selection')) {
              this.action = "Select"
              this.role = 'admin'
              this.login = 'Log Out'
              this.showAuthButton = true;
              this.showSubmit = true;



            } else if (roles.includes('filtering')) {
              this.action = "Filter"
              this.role = 'admin'
              this.login = 'Log Out'
              this.showAuthButton = true;
              this.showSubmit = true;



            } else if (roles.includes('artist')) {
              console.log('AUTHSTATE USER', 'artist');
              this.action = "Submit"
              this.role = 'artist';
              this.login = 'Log Out'
              this.showSubmit = true;
              this.showAuthButton = false;

            } else {
              // nothing happens
            }

          })
        }
      })
  };

  logOut() {
    if (this.userId != null) {
      console.log(this.userId)
      this.authService.logout().then((res) => {
        this.userId = null;
        this.login = 'Submit'
        this.showSubmit = false;
        localStorage.setItem('currentUser', '');
        this.router.navigateByUrl('/project/home')

      }).catch((err) => {

      })

    } else {
      this.login = 'Submit'
      this.router.navigateByUrl('/create-profile')
    }
  }

  navigateUserAdmin(userId: string) {
    this.dbOperations.usersCollectionById(userId)
      .get().then(data => {
        if (!data.empty) {
          data.forEach(e => {
            console.log('AUTHSTATE USER', e.data);
            const data = e.data();
            const id = e.id;
            let user = { ...data } as User;
            let roles = user.role;

            console.log(roles)
            if (roles.includes('moderator')) {
              this.action = 'Console'
              this.router.navigateByUrl('/project/admin')
              console.log('AUTHSTATE USER', 'admin');
            } else if (roles.includes('scoring')) {
              this.action = "Score"
              this.router.navigateByUrl('/project/admin/score')
            } else if (roles.includes('selection')) {
              this.action = "Select"
              this.router.navigateByUrl('/project/admin/select-artworks')
            } else if (roles.includes('filtering')) {
              this.action = "Filter"
              this.router.navigateByUrl('/project/admin/filter-artworks')
            } else if (roles.includes('artist')) {
              console.log('AUTHSTATE USER', 'artist');
              this.crossCheckUserProfileSubmitedDetails(user)
              this.action = "Submit"
            } else {
              this.router.navigateByUrl('/project/add-artworks')
              this.crossCheckUserProfileSubmitedDetails(user)
              this.action = "Submit"
            }

          })
        }
      })
  };

  crossCheckUserProfileSubmitedDetails(user: User) {
    if (user.address == null && user.birthDate == null &&
      user.country == null && user.firstName == null && user.lastName == null
      && user.gender == null && user.nationality == null && user.phoneNumber == null) {
      this.router.navigateByUrl('/create-profile')
    } else {
      this.router.navigateByUrl('/project/add-artworks')
    }
  }

}
