import { Component, NgZone, OnInit } from '@angular/core';
import { DbOperationsService } from 'src/app/services/db-operations.service';
import { ArtWork } from 'src/app/models/artwork';
import { User } from 'src/app/models/user';
import {
  NavigationCancel, NavigationEnd, NavigationError,
  NavigationStart, Router, Event
} from '@angular/router';

@Component({
  selector: 'app-artworks',
  templateUrl: './artworks.component.html',
  styleUrls: ['./artworks.component.scss']
})
export class ArtworksComponent implements OnInit {

  artworks: ArtWork[];
  id: number;
  loading = false;

  currentUser: string = '';
  role: string = '';

  constructor(
    public ngZone: NgZone,
    public router: Router,
    public dbOperations: DbOperationsService) { }

  ngOnInit(): void {
    this.router.events.subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          console.log(this.loading);
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false;
          break;
        }
        default: {
          break;
        }
      }
    });
  }

  ngAfterViewInit() {
    this.dbOperations.getCurrentUser().subscribe(user => {
      this.currentUser = user.uid;
      this.getAdminRole();

    })
  }


  // Get a list of archived artwork
  getArchivedArtWorks(role: string) {
    if (role === 'moderator') {
      this.dbOperations.artworksCollection()
        .snapshotChanges().subscribe(d => {
          this.artworks = d.map(e => {
            const data = e.payload.doc.data();
            const id = e.payload.doc.id;
            console.log({ ...data })
            return { id, ...data } as ArtWork;
          });
        });

    } else if(role === 'admin') {
      this.dbOperations.artworksCollection()
        .ref.where('status', '==', 'approved').onSnapshot(data => {
          data.docs.forEach(d => {
            const id = d.id;
            const work = d.data() as ArtWork;
            this.artworks.push(work);
          })
        })
    } else {
      this.dbOperations.artworksCollection()
        .ref.where('status', '==', 'featured').onSnapshot(data => {
          data.docs.forEach(d => {
            const id = d.id;
            const work = d.data() as ArtWork;
            this.artworks.push(work);
          })
        })
    }
  }


  // Get a list of archived artwork
  private getFeaturedArtworks() {
    this.dbOperations.getFeaturedArtworks()
      .onSnapshot(data => {
        data.docs.forEach(d => {
          const id = d.id;
          const work = d.data() as ArtWork;
          this.artworks.push(work);
        })
      })
  }

  getCurrentUserUID(artworkId: number) {
    this.dbOperations.getCurrentUser().subscribe(user => {
      if (user) {
        this.checkIfUserIsAdmin(user.uid, artworkId);
        console.log('AUTHSTATE USER', user.uid); //this works
      } else {
        console.log('AUTHSTATE USER EMPTY', user);
      }
    },
      err => {
        console.log('Please try again')
      });
  }

  checkIfUserIsAdmin(userId: string, artworkId: number) {
    this.dbOperations.usersCollectionById(userId)
      .onSnapshot(data => {
        if (data != null) {
          data.forEach(e => {
            const data = e.data();
            const id = e.id;
            let user = { ...data } as User;
            console.log(user.role);
            this.ngZone.run(() => {
              if (user.role === 'artist') {
                this.router.navigateByUrl('/project/admin/artworks/' + artworkId);
              } else {
                this.router.navigateByUrl('/project/admin/scores/' + artworkId);
              }
            })
          })
        }
      })
  };

  getAdminRole() {
    this.dbOperations.usersCollection()
      .ref.where('userId', '==', this.currentUser).onSnapshot(data => {
        data.docs.forEach(d => {
          const id = d.id;
          const u = d.data() as User;
          console.log("sign in trial " + u.userId);
          this.ngZone.run(() => {
            if (u.role === 'moderator') {
              this.role = 'moderator'
            } else if (u.role = 'admin') {
              this.role = 'admin'
            } else {
              this.role = 'artist'
            }
            this.getArchivedArtWorks(this.role);
          })
        })
      })

  }

}
