import { Component, Input, OnInit } from '@angular/core';
import { VgApiService } from '@videogular/ngx-videogular/core';
import { ArtWork } from 'src/app/models/artwork';
import { User } from 'src/app/models/user';
import { DbOperationsService } from 'src/app/services/db-operations.service';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss']
})
export class StoryComponent implements OnInit {
  @Input() story: ArtWork;
  description: string;
  user: User = new User();
  api: VgApiService;


  constructor(private dbOperations: DbOperationsService) { }

  ngOnInit(): void {
    console.log(this.story)
    this.description =  this.story.description.substring(0, 20);
    this.getProfileDetails(this.story.userId)
  }
  
  getProfileDetails(id: string) {
    this.dbOperations.usersCollection()
    .ref.where('userId', '==', id).onSnapshot(data => {
      data.docs.forEach(d => {
        const work = d.data() as User;
        this.user = work;

      })
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

}
