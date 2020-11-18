import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ArtWork } from 'src/app/models/artwork';
import { Observable, of } from 'rxjs';
import { VgApiService } from '@videogular/ngx-videogular/core';


@Component({
  selector: 'app-artwork-modal',
  templateUrl: './artwork-modal.component.html',
  styleUrls: ['./artwork-modal.component.scss']
})
export class ArtworkModalComponent implements OnInit {
  artwork: ArtWork = new ArtWork();
  modalType: string = '';
  consentForm: string = '';
  api: VgApiService;

  constructor(
    public dialogRef: MatDialogRef<ArtworkModalComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.artwork = this.data.artwork
    this.modalType = this.data.modalType;
    if(this.modalType === 'image') {
    }

    if(this.modalType === 'video') {
      this.consentForm = this.artwork.subjectConsentForm;
    }

    if(this.modalType === 'artist') {
      this.consentForm = this.artwork.artistConsentForm;
    }

    if(this.modalType === 'subject') {
      this.consentForm = this.artwork.subjectConsentForm;
    }
  }

  onPlayerReady(api: VgApiService) {
    this.api = api;
    this.api.getDefaultMedia().subscriptions
      .loadedMetadata.subscribe(this.playVideo.bind(this));
  }

  playVideo() {
    this.api.pause();
  }

}
