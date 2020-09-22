import { Component, OnInit, HostListener, ViewChild, NgZone } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DbOperationsService } from 'src/app/services/db-operations.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'src/app/models/user';

export interface DialogData {
  animal: string;
  name: string;
}


@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.scss']
})
export class SiteComponent implements OnInit {

  opened = true;
  @ViewChild('sidenav', { static: true }) sidenav: MatSidenav;
  private authState: Observable<firebase.User>;

  hide: any;
  role: string;
  scrollTop = 0;
  hideNav = false;

  constructor(private router: Router,
    public ngZone: NgZone,
    private fauth: AngularFireAuth,
    private dbOperations: DbOperationsService) { }

  ngOnInit(): void {
    this.authState = this.fauth.authState;
    console.log(window.innerWidth)
    if (window.innerWidth > 768) {
      this.sidenav.fixedTopGap = 55;
      this.opened = false;
    } else {
      this.sidenav.fixedTopGap = 55;
      this.opened = true;
    }
  }


  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (event.target.innerWidth < 768) {
      this.sidenav.fixedTopGap = 55;
      this.opened = false;
    } else {
      this.sidenav.fixedTopGap = 55
      this.opened = true;
    }
  }

  onScroll(event) {
    this.hideNav = this.scrollTop < event.target.scrollTop;
    this.scrollTop = event.target.scrollTop;
  }

  isBiggerScreen() {
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (width < 768) {
      this.hide = true;
    } else {
      this.hide = false;
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
