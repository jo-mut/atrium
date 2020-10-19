import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArtWork } from 'src/app/models/artwork';
import { DbOperationsService } from 'src/app/services/db-operations.service';

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
  

  constructor(
    private router: Router,
    private dbOperations: DbOperationsService
  ) { }

  ngOnInit(): void {
    if(this.artwork.type === 'image') {
      this.category = 'Photography'
    }

    if(this.artwork.type === 'video') {
      this.category = 'Videography'
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

}
