import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { DbOperationsService } from 'src/app/services/db-operations.service';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.scss']
})
export class ArtistsComponent implements OnInit {
  artists: User[] = [];

  constructor(private dbOperations: DbOperationsService) { }

  ngOnInit(): void {
    this.getArtist()
  }

  getArtist() {

    this.dbOperations.usersCollection()
      .snapshotChanges().subscribe(d => {
        d.map(e => {
          const data = e.payload.doc.data() as User;
          console.log(data.role)
          if (!data.role.includes('admin')) {
            this.artists.push(data);
          }
        });
      });
  }

}
