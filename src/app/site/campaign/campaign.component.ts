import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { VgApiService } from '@videogular/ngx-videogular/core';
import { firestore } from 'firebase';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { IMedia } from 'src/app/interfaces/imedia';
import { ArtWork } from 'src/app/models/artwork';
import { DbOperationsService } from 'src/app/services/db-operations.service';
import { HostProfileModalComponent } from '../admin/host-profile-modal/host-profile-modal.component';

class StoriesData {
  images: any[];
  backgroundImage: string;
}

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.scss']
})
export class CampaignComponent implements OnInit {
  landingImages = [];
  artworks: ArtWork[] = [];
  artwork: ArtWork = new ArtWork();
  hoveredImage: any;
  backgroundImgs = ['1.png', '2.png', '3.png'];
  chosenImage: any;
  video = '';
  mobileWidthThreshold: number = 640;
  customOptions: OwlOptions;
  showMorePurpose = false;
  inspirationMore = false;


  inspiration: string;
  moreInspiation: string;
  morePurpose: string;
  purpose: string;

  showPurpose = false;
  showInspiration = false;
  headingSize = 2;
  id = 1597836027860;


  constructor(
    private config: NgbCarouselConfig,
    private matDialog: MatDialog,
    private dbOperations: DbOperationsService) {

    this.getScreenSize();
    // this.carouselConfig();
    this.purposeOfCompetion();
    this.getInspiration();
  }

  ngOnInit(): void {
    // this.getSampleArtworks();
    this.getArtWorkDetails(this.id.toString());
  }

  carouselConfig() {
    this.config.interval = 3000;
    this.config.keyboard = false;
    this.config.pauseOnHover = false;
    this.config.wrap = true;
  }



  getArtWorkDetails(id: string) {

    this.dbOperations.artworksCollection()
    .ref.where('id', '==', id).onSnapshot(data => {
      data.docs.forEach(d => {
        const work = d.data() as ArtWork;
        console.log(work)
        this.video = work.url;
        this.artwork = work;
      })
    })
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    let width = event.target.innerWidth;
    if (width < 800) {
      this.headingSize = 1.5;
    } 

    if(width > 800) {
      this.headingSize = 2.5;

    } 

    if (width > 1000) {
      this.headingSize = 3;
    }

    if (width > 1200) {
      this.headingSize = 4;
    }

  }

  getScreenSize() {
    let width = window.innerWidth;
    if (width < 800) {
      this.headingSize = 1.5;
    } 

    if(width > 800) {
      this.headingSize = 2.5;

    } 

    if (width > 1000) {
      this.headingSize = 3;
    }

    if (width > 1200) {
      this.headingSize = 4;
    }

  }


  getInspiration() {
    this.inspiration = `is a professional studio composed of highly experienced  professionals
    formed in response to the need for consolidated offerings of consulting services within the creative
    space. The team is composed of photographers, videographers, graphic designers, writers and professional
    editors that provide a comprehensive range of photography, videography and desktop publishing services.
    The establishment has been undertaking photography and videography services in Africa for over ten
    years. BPP has also been commissioned to undertake projects revolving around corporate image branding,
    book and press images, travel brochures, portraits and dynamic concepts for communication where reality
    meets memories. Some of the clients include, the United Nations, Footprints Press, Nikon, and the Kenya
    Red Cross Society. The elements that make BPP unique are commitment, innovation, creativity, professionalism, daring to do
    more and thinking outside the norm, integrity and purpose, world class workmanship, high end
    professional equipment and an understanding and belief that excellence is key.`

    // if(this.showInspiration) {
    //   this.inspiration;
    //   this.showInspiration = false;

    // }else{
    //   this.inspiration.substring(0, 600);
    //   this.showInspiration = true;
    // }

    return this.inspiration.substring(0, 600);
  }


  purposeOfCompetion() {
    this.purpose = `The goal is to engage young people across seven countries (Kenya, Uganda, Ethiopia,
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

    return this.purpose.substring(0, 600);
  }


  onMouseOver(image): void {
    this.hoveredImage = image;
  }

  onMouseOut(image): void {
    this.hoveredImage = null;
  }


  getOwlOptions() {
    this.customOptions = {
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
          items: 1
        },
        740: {
          items: 2
        },
        940: {
          items: 3
        }
      },
      nav: true
    }

  }




  showHostProfile() {

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


}
