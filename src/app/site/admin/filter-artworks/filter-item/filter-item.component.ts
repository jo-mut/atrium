import { Component, Input, NgZone, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { VgApiService } from '@videogular/ngx-videogular/core';
import { ArtWork } from 'src/app/models/artwork';
import { DbOperationsService } from 'src/app/services/db-operations.service';
import { ArtworkModalComponent } from '../artwork-modal/artwork-modal.component';
import { DatePipe } from '@angular/common';
import { User } from 'src/app/models/user';
import { Observable, of } from 'rxjs';


@Component({
  selector: 'app-filter-item',
  templateUrl: './filter-item.component.html',
  styleUrls: ['./filter-item.component.scss']
})
export class FilterItemComponent implements OnInit {

  @Input() artwork: ArtWork;

  category: string;
  url: string;
  name: string;
  date: string;
  country: string;
  subjectConsent: string;
  artistConsent: string;

  api: VgApiService;
  background: string = 'white';
  follow = false;


  constructor(
    public ngZone: NgZone,
    private matDialog: MatDialog,
    private router: Router,
    private dbOperations: DbOperationsService
  ) { }

  ngOnInit(): void {
    if (this.artwork.type === 'image') {
      this.category = 'Photography'
    }

    if (this.artwork.type === 'video') {
      this.category = 'Videography'
    }

    if (this.artwork.subjectConsentForm != null) {
      this.subjectConsent = this.artwork.subjectConsentForm;
    }

    if (this.artwork.artistConsentForm != null) {
      this.artistConsent = this.artwork.artistConsentForm
    }

    this.url = this.artwork.url;
    this.date = new DatePipe('en').transform(this.artwork.id, 'yyyy/MM/dd');
    console.log(this.date)
    this.country = this.artwork.place;
    this.followUpBackground(this.artwork.status)
    this.getUserProfile(this.artwork.userId)
  }

 

  approveArtwork() {
    this.dbOperations.artworksCollection().doc(this.artwork.artworkId)
      .update({
        'status': 'approved',
        'updatedAt': new Date().getDate() + '',
      }).then(res => {
        // this.toaster.success('Filtering successful');
        // this.router.navigateByUrl('project/admin/filter-artworks/' + this.artwork.id)
      }).catch(err => {
        // this.toaster.success('Filtering failed');

      })
  }

  followUpBackground(status: string) {
    if(status === 'follow-up') {
      // this.background = 'lightgray'
      this.follow = true;
    }

  }

  declineArtwork() {
    this.dbOperations.artworksCollection().doc(this.artwork.artworkId)
      .update(
        {
          'status': 'declined',
          'updatedAt': new Date().getDate() + '',
        }).then(res => {
          // this.toaster.success('Filtering successful');
          // this.router.navigateByUrl("project/admin/filter-artworks")
        }).catch(err => {
          // this.toaster.success('Filtering failed');
        })
  }

  followUpArtwork() {
    this.dbOperations.artworksCollection().doc(this.artwork.artworkId)
      .update(
        {
          'status': 'follow-up',
          'updatedAt': new Date().getDate() + '',
        }).then(res => {
          // this.toaster.success('Filtering successful');
          // this.router.navigateByUrl("project/admin/filter-artworks")
        }).catch(err => {
          // this.toaster.success('Filtering failed');
        })
  }

  getUserProfile(userId: string) {
    this.dbOperations.usersCollectionById(userId)
      .onSnapshot(data => {
        if (data != null) {
          data.forEach(e => {
            const data = e.data();
            const id = e.id;
            let user = { ...data } as User;
            this.ngZone.run(() => {            
              of(user.firstName + ' ' + user.lastName)
                .subscribe(name =>  {
                  this.name = name
                })
            })
            
            // console.log(of(user.firstName + ' ' + user.lastName));
            let roles = user.role;
          })
        }
      })
  };

  onPlayerReady(api: VgApiService) {
    this.api = api;
    this.api.getDefaultMedia().subscriptions
      .loadedMetadata.subscribe(this.playVideo.bind(this));
  }

  playVideo() {
    this.api.pause();
  }

  lauchDialog(artwork: ArtWork, type: string) {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = false;
    dialogConfig.id = "modal-component";
    dialogConfig.width = '70%';
    dialogConfig.height = '90%';
    dialogConfig.data = { 'artwork': artwork, 'modalType': type}
    // https://material.angular.io/components/dialog/overview
    const modalDialog = this.matDialog.open(ArtworkModalComponent, dialogConfig);
  }


}
