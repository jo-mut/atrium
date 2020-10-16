import { Component, NgZone, OnInit } from '@angular/core';
import { DbOperationsService } from 'src/app/services/db-operations.service';
import { ArtWork } from 'src/app/models/artwork';
import { User } from 'src/app/models/user';
import {
  NavigationCancel, NavigationEnd, NavigationError,
  NavigationStart, Router, Event
} from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-artworks',
  templateUrl: './artworks.component.html',
  styleUrls: ['./artworks.component.scss']
})
export class ArtworksComponent implements OnInit {

  artworks: ArtWork[] = [];
  id: number;
  loading = false;

  currentUser: string = '';

  constructor(
    public ngZone: NgZone,
    public router: Router,
    public firestore: AngularFirestore,
    public dbOperations: DbOperationsService) { }

  ngOnInit(): void {
    
  }

  ngAfterViewInit() {
    this.dbOperations.getCurrentUser().subscribe(user => {
      this.currentUser = user.uid;
      this.getAdminRole();

    })
  }


  // Get a list of archived artwork
  getArchivedArtWorks(roles: any[]) {
    if (roles.includes('moderator')) {
      this.dbOperations.artworksCollection()
        .snapshotChanges().subscribe(d => {
          this.artworks = d.map(e => {
            const data = e.payload.doc.data();
            const id = e.payload.doc.id;
            console.log({ ...data })
            return { id, ...data } as ArtWork;
          });
        });

    } else if (roles.includes('admin')) {
      this.dbOperations.artworksCollection()
        .ref.where('status', '==', 'approved')
        .where('scored', '==', 'scored')
        .onSnapshot(data => {
          data.docs.forEach(d => {
            const id = d.id;
            const work = d.data() as ArtWork;
            this.artworks.push(work);
          })
        })
    } else {
      this.dbOperations.artworksCollection()
        .ref.where('status', '==', 'featured')
        .onSnapshot(data => {
          data.forEach(e => {
            const data = e.data();
            const id = e.id;
            let work = { id, ...data } as ArtWork;
            this.artworks.push(work);
          })
        })
    }
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
            let roles = user.role;
            this.ngZone.run(() => {
              if(roles.includes('artist')){
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
          let roles = u.role;
          this.ngZone.run(() => {
            this.getArchivedArtWorks(roles);
          })
        })
      })

  }

}
