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

  constructor(private router: Router,
    public ngZone: NgZone,
    private fauth: AngularFireAuth,
    private dbOperations: DbOperationsService) { }

  ngOnInit(): void {
    this.authState = this.fauth.authState;
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

  checkIfUserIsAdmin(userId: string) {
    this.dbOperations.usersCollectionById(userId)
      .onSnapshot(data => {
        if (data != null) {
          data.forEach(e => {
            console.log('AUTHSTATE USER', e.data);
            const data = e.data();
            const id = e.id;
            let user = { ...data } as User;
            if (user.role === 'admin') {
              this.role = 'admin';
              console.log('AUTHSTATE USER', 'admin');
              this.router.navigateByUrl('/project/admin')
            } else {
              this.router.navigateByUrl('/project/add-artworks')
              console.log('AUTHSTATE USER', 'artist');
            }
          })
        }
      })
  };


}
