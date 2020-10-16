import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbOperationsService } from 'src/app/services/db-operations.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  private hidden = false
  private authState: Observable<firebase.User>;
  checked = 0;
  role: string;
  action: string;

  currentUser: string;
  user: User = new User();

  constructor(private router: Router,
    public ngZone: NgZone,
    private fauth: AngularFireAuth,
    private dbOperations: DbOperationsService) { }

  ngOnInit(): void {
    this.authState = this.fauth.authState;
    this.authState.subscribe(u => {
      if(u != null) {
        this.getUserRole(u.uid);
      }
    }) 
  }

  ngDoCheck() {
  }

  showHideSidebar() {
    if (this.hidden) {
      this.hidden = false;
    } else {
      this.hidden = true;
    }
  }


  goToSubmitArtworks() {
    this.authState.subscribe(user => {
      this.ngZone.run(() => {
        if (user != null) {
          if (user.uid) {
            this.checkIfUserIsAdmin(user.uid)
          } else {
            this.router.navigateByUrl('/project/create-profile')
          }
        } else {
          this.router.navigateByUrl('/project/create-profile')
        }
      })

    },
      err => {
        console.log('Please try again')
      });

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
            }

            if (roles.includes('scoring')) {
              this.action = "Score"
            }

            if (roles.includes('selection')) {
              this.action = "Select"
            }

            if (roles.includes('filtering')) {
              this.action = "Filter"
            }

            if (roles.includes('artist')) {
              console.log('AUTHSTATE USER', 'artist');
            }
          })
        }
      })
  };

  checkIfUserIsAdmin(userId: string) {
    if (this.user.role.includes('moderator')) {
      this.action = 'Console'              
      console.log('AUTHSTATE USER', 'admin');
      this.router.navigateByUrl('/project/admin')
    }

    if (this.user.role.includes('scoring')) {
      this.action = "Score"
      this.router.navigateByUrl('/project/admin/score')
    }

    if (this.user.role.includes('selection')) {
      this.action = "Select"
      this.router.navigateByUrl('/project/admin/select-artworks')
    }

    if (this.user.role.includes('filtering')) {
      this.action = "Filter"
      this.router.navigateByUrl('/project/admin/filter-artworks')
    }

    if (this.user.role.includes('artist')) {
      this.action = "Submit"
      this.router.navigateByUrl('/project/add-artworks')
      console.log('AUTHSTATE USER', 'artist');
    }
  };


}
