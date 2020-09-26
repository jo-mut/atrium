import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { HostProfileModalComponent } from '../admin/host-profile-modal/host-profile-modal.component';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  hosts: any[] = [];
  constructor(private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.projectHost();
  }

  lauchHostModal(host) {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = false;
    dialogConfig.id = "modal-component";
    // dialogConfig.height = "60%";
    dialogConfig.width = '400px';
    dialogConfig.data = { 'info': host.bio, 'img': host.img, 'name': host.name }
    // https://material.angular.io/components/dialog/overview
    const modalDialog = this.matDialog.open(HostProfileModalComponent, dialogConfig);
  }


  projectHost() {
    this.hosts = [
      {
        id: 0,
        img: 'assets/images/gallery/hosts/bobby.jpg',
        title: 'Project Lead',
        name: 'Bobby Pall',
        lessInfo: ` Bobby Pall is a modern day photographic artist who believes ...`,
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
        id: 1,
        img: 'assets/images/gallery/hosts/george.jpg',
        title: 'Writer/Documentary Filmmaker',
        name: 'George Muiruri',
        lessInfo: ` I have had innumerable restarts in my life; start and ...`,
        bio: `I have had innumerable restarts in my life; start and stop periods. Start periods that birthed new life; stop periods at junctions seeking direction.  Each, the genesis of a new opportunity, a new perception, a new idea, a new love, a new…, a new… 
        I am a creator; a documentary filmmaker intertwined with a writer. The writer in me manifested three years before the filmmaker was born. Over the past 10 years of my filmmaking journey, I have had the good fortune of creating short documentary pieces for profit and non-profit organizations.
        Covid-19 has brought me to another junction, only this time, this is not a restart. I already know what I need to do for the foreseeable future, and ‘African Resilience in the Wake of a Pandemic’, a photography and videography campaign under the Mastercard Foundation COVID-19 Public Awareness Campaign has provided the impetus. I am excited to be part of the Campaign.
        `
      },
      {
        id: 2,
        img: 'assets/images/gallery/hosts/edna.jpg',
        title: 'Finance Specialist/Economist',
        name: 'Edna Kalumbini, MA',
        lessInfo: `I am Edna Kalumbini and I see myself as a high-impact,...`,
        bio: `I am Edna Kalumbini and I see myself as a high-impact, solutions-oriented, team player and Finance Specialist. Accounting and management of the project accounts is my forte and I excel in delivering monthly financial reports, accounts reconciliation, planning and financial forecasting. My skills and expertise in bringing order to projects have benefited the organisations I have supported in the private sector and the non-profit sector. 
        I am now excited to be part of the team that gets to share with the world the beauty of African Art, shared by the Youth in Africa in ‘African Resilience in the Wake of a Pandemic’, a photography and videography campaign under the Mastercard Foundation COVID-19 Public Awareness Campaign. 
        `

      },
      {
        id: 3,
        img: 'assets/images/gallery/hosts/lucy.jpg',
        title: 'Editor/Writer',
        name: 'Lucy Mwangi',
        lessInfo: `My name is Lucy Mwangi and I am excited to provide a brief ...`,
        bio: `   My name is Lucy Mwangi and I am excited to provide a brief insight into who I am and what drives me. I am a storytelling enthusiast that has lent her skills in the end-to-end production of over 20 publications that strive to tell the African story from an African perspective. Over the last two decades, I have partnered with research organisations, profit organisations, publishing houses, and independent writers/authors to provide editorial and communication expertise.
        It is now a real pleasure to lend my skills and years of experience to ensure the success of ‘African Resilience in the Wake of a Pandemic’, a photography and videography campaign under the Mastercard Foundation COVID-19 Public Awareness Campaign. The Campaign is a great opportunity to witness and celebrate as the Youth of Africa use their creativity to open up about how Covid-19 has affected their lives. It is a privilege to work on this Campaign.`

      },
      {
        id: 4,
        img: 'assets/images/gallery/hosts/christine.jpg',
        name: 'Christine Njoki Kuriah, MPA',
        title: 'Operations and Systems Development',
        lessInfo: `I am Christine Njoki Kuriah and I am delighted to tell ...`,
        bio: `I am Christine Njoki Kuriah and I am delighted to tell you a little bit about myself.I am a passionate individual who champions causes that promote social justice and equality, civil rights and democracy.For the past two decades, I have partnered with organizations around the globe to bring my operations and systems development/ management and resource mobilization expertise to both the non - profit and public service sectors in the Healthcare, Education, Advocacy and Community Development fields.
        Now, I am excited to use some of my professional skills and experience and be a part of ‘African Resilience in the Wake of a Pandemic’, photography and videography campaign under the MasterCard Foundation Covid - 19 Public Awareness Campaign.I get to see and hear, first - hand, the dynamic stories told by the Youth in Africa, through photographs and videos, about their deeply personal experiences as they navigate life through this global pandemic.What better way is there for them to express themselves in an honest and authentic way while letting us into their world as they convey their stories ? I am honoured to be a part of this amazing Campaign.
        `
      }, {
        id: 5,
        img: 'assets/images/gallery/hosts/xotichil.jpg',
        name: 'Xochitl Ramirez',
        title: 'Industrial Designer and, Public Policy and Social Project Developer',
        lessInfo: `My twenty(20) years as a Designer have taught me that ... `,
        bio: `My twenty(20) years as a Designer have taught me that being creative and designing out of the box is about the passion for creativity that one nurtures in their inner - most being and is not limited to the equipment or software at hand.I am a risk taker who is passionate about empowering all people regardless of race, age, or creeds.This is me, Xochitl Ramirez—creativity and social development are my two great passions.
         It is a privilege to be part of this interdisciplinary team that has taken on the task of ensuring the success of ‘African Resilience in the Wake of a Pandemic’, a photography and videography campaign under the Mastercard Foundation COVID - 19 Public Awareness Campaign.I am eager to participate in putting the creative storytelling capabilities of young African through the lens. 
        `
      },
    ]
  }


}
