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
            let roles = user.role;
            if (roles.includes('moderator')) {
              this.role = 'admin';
              console.log('AUTHSTATE USER', 'admin');
              this.router.navigateByUrl('/project/admin')
            } 
            
            if(roles.includes('admin')) {
              this.router.navigateByUrl('/project/admin/artworks')
            }

            if(roles.includes('artist')) {
              this.router.navigateByUrl('/project/add-artworks')
              console.log('AUTHSTATE USER', 'artist');
            }
          })
        }
      })
  };


}
