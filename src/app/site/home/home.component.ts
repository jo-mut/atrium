import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DbOperationsService } from './../../services/db-operations.service';
import { ArtWork } from './../../models/artwork';
import { VgApiService } from '@videogular/ngx-videogular/core';
import { IMedia } from 'src/app/interfaces/imedia';
import { OwlOptions } from 'ngx-owl-carousel-o';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],

})
export class HomeComponent implements OnInit {
  landingImages = [];
  artworks: ArtWork[] = [];
  hoveredImage: any;
  backgroundImgs = ['1.png', '2.png', '3.png'];
  chosenImage: any;
  video = "assets/videos/kawasaki.mp4";
  mobileWidthThreshold: number = 640;
  hosts: any[] = [];
  customOptions: OwlOptions;

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


  constructor(private dbOperations: DbOperationsService) {
    this.getLandinPageImages();
   }

  ngOnInit(): void {
    this.getSampleArtworks();
    this.projectHost();
    
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
    // this.api.getDefaultMedia().subscriptions.ended.subscribe(this.nextVideo.bind(this));
  }

  getLandinPageImages() {
    this.landingImages =  [
      'assets/images/gallery/sample/cart.jpg',
      'assets/images/gallery/sample/cart.jpg',
      'assets/images/gallery/sample/cart.jpg',
      'assets/images/gallery/sample/cart.jpg',
      'assets/images/gallery/sample/cart.jpg',
      'assets/images/gallery/sample/cart.jpg',
      'assets/images/gallery/sample/cart.jpg',
      'assets/images/gallery/sample/cart.jpg'      
 
    ]
  }

  onMouseOver(image): void {
    this.hoveredImage = image;
  }

  onMouseOut(image): void {
    this.hoveredImage = null;
  }

  // nextVideo() {
  //   this.currentIndex++;

  //   if (this.currentIndex === this.playlist.length) {
  //     this.currentIndex = 0;
  //   }

  //   this.currentItem = this.playlist[this.currentIndex];
  // }

  playVideo() {
    this.api.play();
  }

  // onClickPlaylistItem(item: IMedia, index: number) {
  //   this.currentIndex = index;
  //   this.currentItem = item;
  // }

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

  }

  projectHost() {
    this.hosts = [
      {
        id:1,
        flag:'assets/images/gallery/hosts/bobby.jpg',
        title:'Project Lead',
        name: 'Bobby Pall',
        bio: `
        Bobby Pall is a modern day photographic artist who believes that photography is the ideal medium for communicating today’s issues. 
        My passion is to:
        TOUCH those who encounter my work
        MOVE to cause a change using the power of photography
        INSPIRE to be part of a proactive community
        I also seek to be a VOICE for those whose voices cannot be heard
        I have exhibited widely across the globe, showcasing powerful photographic images that depict the importance of photography as a powerful medium of communication, one example is the South Sudan Photographic Exhibition (Forgotten Faces) that documented issues of civil war. I collaborated with the UN HABITAT to communicate Millennium Development Goals (MDGs) to the youth in the slums in Nairobi that culminated in an exhibition and a coffee table book. I also partnered with the Kenya Red Cross Society on their ground-breaking coffee table book that detailed their positive humanitarian efforts in Kenya. I have also exhibited in India, Italy, France, Canada and several African countries.
        I am the author of Vanishing Songs of the Warriors, a coffee table book that focuses on the resilience, passion and beauty of indigenous communities. As Lead Photographer, I have also partnered with Footprints Press on the following coffee table books: Life Journeys; Scaling Heights, Life Journeys; Seeking Destiny, Wisdom of the Elders, Aspiration of a Generation; Youth of Kenya. These are books featuring role models of Kenya for posterity.`
      },
      {
        id:1,
        flag:'assets/images/gallery/hosts/george.jpg',
        title:'Writer/Documentary Filmmaker',
        name: 'George Muiruri',
        bio: `I have had innumerable restarts in my life; start and stop periods. Start periods that birthed new life; stop periods at junctions seeking direction.  Each, the genesis of a new opportunity, a new perception, a new idea, a new love, a new…, a new… 
        I am a creator; a documentary filmmaker intertwined with a writer. The writer in me manifested three years before the filmmaker was born. Over the past 10 years of my filmmaking journey, I have had the good fortune of creating short documentary pieces for profit and non-profit organizations.
        Covid-19 has brought me to another junction, only this time, this is not a restart. I already know what I need to do for the foreseeable future, and ‘African Resilience in the Wake of a Pandemic’, a photography and videography campaign under the Mastercard Foundation COVID-19 Public Awareness Campaign has provided the impetus. I am excited to be part of the Campaign.
        `
      },
      {
        id:2,
        flag:'assets/images/gallery/hosts/edna.jpg',
        title:'Finance Specialist/Economist',
        name: 'Edna Kalumbini, MA',
        bio: `I am Edna Kalumbini and I see myself as a high-impact, solutions-oriented, team player and Finance Specialist. Accounting and management of the project accounts is my forte and I excel in delivering monthly financial reports, accounts reconciliation, planning and financial forecasting. My skills and expertise in bringing order to projects have benefited the organisations I have supported in the private sector and the non-profit sector. 
        I am now excited to be part of the team that gets to share with the world the beauty of African Art, shared by the Youth in Africa in ‘African Resilience in the Wake of a Pandemic’, a photography and videography campaign under the Mastercard Foundation COVID-19 Public Awareness Campaign. 
        `

      },
      {
        id:4,
        flag:'assets/images/gallery/hosts/lucy.jpg',
        title:'Editor/Writer',
        name: 'Lucy Mwangi',
        bio: `My name is Lucy Mwangi and I am excited to provide a brief insight into who I am and what drives me. I am a storytelling enthusiast that has lent her skills in the end-to-end production of over 20 publications that strive to tell the African story from an African perspective. Over the last two decades, I have partnered with research organisations, profit organisations, publishing houses, and independent writers/authors to provide editorial and communication expertise.
        It is now a real pleasure to lend my skills and years of experience to ensure the success of ‘African Resilience in the Wake of a Pandemic’, a photography and videography campaign under the Mastercard Foundation COVID-19 Public Awareness Campaign. The Campaign is a great opportunity to witness and celebrate as the Youth of Africa use their creativity to open up about how Covid-19 has affected their lives. It is a privilege to work on this Campaign.
        `

      },
      {
        id:5,
        flag:'assets/images/gallery/hosts/christine.jpg',
        name: 'Christine Njoki Kuriah, MPA',
        title: 'Operations and Systems Development',
        bio: `I am Christine Njoki Kuriah and I am delighted to tell you a little bit about myself. I am a passionate individual who champions causes that promote social justice and equality, civil rights and democracy. For the past two decades, I have partnered with organizations around the globe to bring my operations and systems development/management and resource mobilization expertise to both the non-profit and public service sectors in the Healthcare, Education, Advocacy and Community Development fields.
        Now, I am excited to use some of my professional skills and experience and be a part of ‘African Resilience in the Wake of a Pandemic’, photography and videography campaign under the MasterCard Foundation Covid-19 Public Awareness Campaign. I get to see and hear, first-hand, the dynamic stories told by the Youth in Africa, through photographs and videos, about their deeply personal experiences as they navigate life through this global pandemic. What better way is there for them to express themselves in an honest and authentic way while letting us into their world as they convey their stories? I am honoured to be a part of this amazing Campaign.
        `
      }, {
        id:3,
        flag:'assets/images/gallery/hosts/xotichil.jpg',
        name: 'Xochitl Ramirez',
        title: 'Industrial Designer and, Public Policy and Social Project Developer',
        bio: `My twenty (20) years as a Designer have taught me that being creative and designing out of the box is about the passion for creativity that one nurtures in their inner-most being and is not limited to the equipment or software at hand. I am a risk taker who is passionate about empowering all people regardless of race, age, or creeds. This is me, Xochitl Ramirez—creativity and social development are my two great passions. 
        It is a privilege to be part of this interdisciplinary team that has taken on the task of ensuring the success of ‘African Resilience in the Wake of a Pandemic’, a photography and videography campaign under the Mastercard Foundation COVID-19 Public Awareness Campaign. I am eager to participate in putting the creative storytelling capabilities of young African through the lens. 
        `

      },
    ]
  }

}
