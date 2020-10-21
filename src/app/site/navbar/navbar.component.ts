import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbOperationsService } from 'src/app/services/db-operations.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
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
  role: string;
  action: string = 'Submit';

  currentUser: string;
  user: User = new User();

  constructor(private router: Router,
    public ngZone: NgZone,
    private authService: AuthService,
    private fauth: AngularFireAuth,
    private dbOperations: DbOperationsService) { }

  ngOnInit(): void {
    this.fauth.authState.subscribe(data => {
      if(data != null) {
        if (data.uid != null) {
          this.currentUser = data.uid;
          console.log(this.currentUser)
          this.getUserRole(this.currentUser);
        } else {
          console.log('user is empty')
        }
      } else {
        console.log('user is empty')

      }
    })

    this.getCurrentLoggedInUser()
  }

  ngDoCheck() {
   
  }

  getCurrentLoggedInUser() {
   console.log( this.authService.emittedUser.toString());
  }

  showHideSidebar() {
    if (this.hidden) {
      this.hidden = false;
    } else {
      this.hidden = true;
    }
  }


  goToSubmitArtworks() {
    this.fauth.authState.subscribe(data => {
      if(data != null) {
        if (data.uid != null) {
          console.log(this.currentUser)
          this.currentUser = data.uid;
          this.checkIfUserIsAdmin(this.currentUser)
        } else {
          console.log(this.currentUser)
          this.router.navigateByUrl('/project/create-profile')
        }
      } else {
        console.log(this.currentUser)
        this.router.navigateByUrl('/project/create-profile')
      }
    })
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
            this.user = u;
            let roles = this.user.role;

            console.log(roles)
            if (roles.includes('moderator')) {
              this.action = 'Console'
              console.log('AUTHSTATE USER', 'admin');
            } else if (roles.includes('scoring')) {
              this.action = "Score"
            } else if (roles.includes('selection')) {
              this.action = "Select"
            } else if (roles.includes('filtering')) {
              this.action = "Filter"
            } else if (roles.includes('artist')) {
              console.log('AUTHSTATE USER', 'artist');
            } else {
              this.action = "Submit"
            }
          })
        }
      })
  };

  checkIfUserIsAdmin(userId: string) {
    this.dbOperations.usersCollectionById(userId)
      .get().then(data => {
        if (!data.empty) {
          data.forEach(e => {
            console.log('AUTHSTATE USER', e.data);
            const data = e.data();
            const id = e.id;
            let u = { ...data } as User;
            this.user = u;
            let roles = this.user.role;

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
              this.router.navigateByUrl('/project/add-artworks')
            } else {
              this.action = "Submit"
            }
          })
        }
      })
  };


}
