import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { VgApiService } from '@videogular/ngx-videogular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { IMedia } from 'src/app/interfaces/imedia';
import { ArtWork } from 'src/app/models/artwork';
import { DbOperationsService } from 'src/app/services/db-operations.service';
import { HostProfileModalComponent } from '../admin/host-profile-modal/host-profile-modal.component';

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.scss']
})
export class CampaignComponent implements OnInit {
  landingImages = [];
  artworks: ArtWork[] = [];
  hoveredImage: any;
  backgroundImgs = ['1.png', '2.png', '3.png'];
  chosenImage: any;
  video = "assets/videos/resilience.mp4";
  mobileWidthThreshold: number = 640;
  customOptions: OwlOptions;
  showMorePurpose = false;
  inspirationMore = false;

  playlist: Array<IMedia> = [
    {
      title: 'Pale Blue Dot',
      src: 'http://static.videogular.com/assets/videos/videogular.mp4',
      type: 'video/mp4'
    },
    {
      title: 'Big Buck Bunny',
      src: 'http://static.videogular.com/assets/videos/big_buck_bunny_720p_h264.mov',
      type: 'video/mp4'
    },
    {
      title: 'Elephants Dream',
      src: 'http://static.videogular.com/assets/videos/elephants-dream.mp4',
      type: 'video/mp4'
    }
  ];

  currentIndex = 0;
  api: VgApiService;
  currentItem: IMedia = this.playlist[this.currentIndex];
  inspiration: string;
  moreInspiation: string;
  morePurpose: string;
  purpose: string;

  showPurpose = false;
  showInspiration = false;

  constructor(
    private config: NgbCarouselConfig,
    private matDialog: MatDialog,
    private dbOperations: DbOperationsService) {
    this.carouselConfig();
    this.purposeOfCompetion();
    this.getInspiration();
  }

  ngOnInit(): void {
    this.getSampleArtworks();

  }

  carouselConfig() {
    this.config.interval = 3000;
    this.config.keyboard = false;
    this.config.pauseOnHover = false;
    this.config.wrap = true;
  }

  // Get a list of archived artwork
  getSampleArtworks() {
    this.dbOperations.getAllExhibitions()
      .onSnapshot(snapshot => snapshot.forEach(doc => {
        const data = doc.data();
        const id = doc.id;
        let work = { id, ...data } as ArtWork;
        this.artworks.push(work);
      }))
  }

  onPlayerReady(api: VgApiService) {
    this.api = api;
    this.api.getDefaultMedia().subscriptions
      .loadedMetadata.subscribe(this.playVideo.bind(this));
    this.api.getDefaultMedia().subscriptions.ended.subscribe(this.nextVideo.bind(this));
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

  nextVideo() {
    this.currentIndex++;

    if (this.currentIndex === this.playlist.length) {
      this.currentIndex = 0;
    }

    this.currentItem = this.playlist[this.currentIndex];
  }

  playVideo() {
    this.api.play();
  }

  onClickPlaylistItem(item: IMedia, index: number) {
    this.currentIndex = index;
    this.currentItem = item;
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