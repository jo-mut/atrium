import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { HostProfileModalComponent } from '../admin/host-profile-modal/host-profile-modal.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-call',
  templateUrl: './call.component.html',
  styleUrls: ['./call.component.scss']
})
export class CallComponent implements OnInit {
  dotAnimation: boolean = true;
  contentAnimation: boolean = true;
  size: number = 40;
  mobileWidthThreshold: number = 640;
  landingImages = [];

  covidPhotos: any[]= [];
  purpose: string;


  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: ['<', '>'],
    responsive: {
      0: {
        items: 1 
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }

  constructor(
    private matDialog: MatDialog,
    private config: NgbCarouselConfig
  ) { 
    this.getLandinPageImages();
    this.carouselConfig();
    this.purposeOfCompetion();

  }

  ngOnInit(): void {
  }

  onExpand(event) {
    console.log(event);
  }

  getLandinPageImages() {
    this.landingImages =  [
      'assets/images/gallery/sample/poster1.png',
      'assets/images/gallery/sample/poster2.png',
      'assets/images/gallery/sample/poster3.png',
      'assets/images/gallery/sample/poster4.png',
      'assets/images/gallery/sample/poster5.png',     
 
    ]
  }

  carouselConfig() {
    this.config.interval = 4000;
    this.config.wrap = false;
    this.config.keyboard = false;
    this.config.pauseOnHover = false;
    this.config.wrap = false;
  }

  lauchMoreInfoModal(info) {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = false;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "60%";
    dialogConfig.width = "60%";
    dialogConfig.data = { 'info': info }
    // https://material.angular.io/components/dialog/overview
    const modalDialog = this.matDialog.open(HostProfileModalComponent, dialogConfig);
  }

  purposeOfCompetion() {
    this.purpose = `As part of the COVID-19 Recovery and Resilience Program, Mastercard Foundation is running a public
    awareness campaign to share timely, accurate information about the coronavirus, how it is spread, and how
    young people are adapting to their new reality. The Campaign seeks to enhance dissemination, understanding
    and uptake of public health information as a key outcome. The Campaign targets to reach the majority of
    populations, making use of multi-communication
    channels and tactics. The goal is to engage young people across seven countries (Kenya, Uganda, Ethiopia,
    Rwanda, Nigeria, Ghana and Senegal) to share stories about their personal experiences navigating life
    during the global pandemic. The storytelling should take the form of photographs and videos. Bobby Pall
    Photography (The Organizer) is partnering with the Foundation on this Campaign that provides
    photographers and videographers with the opportunity to actively participate in the COVID-19 Recovery and
    Resilience Programme and to acquire international exposure when their work is published in the
    online/virtual
    gallery. By choosing to participate in this Campaign, the Entrant agrees to the following official
    guidelines and rules, which create a contract between him/her and the Organizer. The theme of the
    photography and videography campaign is: ‘African Resilience in the Wake of a Pandemic’.
    Please read the guidelines and rules carefully before submitting your entry`;

    // if(this.showPurpose) {
    //   this.showPurpose = false;
    //   this.purpose;
    // }else{
    //   this.showPurpose = true;
    //   this.purpose.substring(0, 600);
    // }

    return this.purpose.substring(0, 600);
  }

}
