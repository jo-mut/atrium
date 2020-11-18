import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { VgApiService } from '@videogular/ngx-videogular/core';
import { ArtWork } from 'src/app/models/artwork';
import { DbOperationsService } from 'src/app/services/db-operations.service';
import { ArtworkModalComponent } from '../artwork-modal/artwork-modal.component';

@Component({
  selector: 'app-filter-item',
  templateUrl: './filter-item.component.html',
  styleUrls: ['./filter-item.component.scss']
})
export class FilterItemComponent implements OnInit {

  @Input() artwork: ArtWork;

  category: string;
  url: string;
  date: string;
  country: string;
  subjectConsent: string;
  artistConsent: string;

  api: VgApiService;


  constructor(
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
    this.date = this.artwork.shotDate;
    this.country = this.artwork.place;
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
