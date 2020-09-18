import { Component, OnInit } from '@angular/core';
import { DbOperationsService } from 'src/app/services/db-operations.service';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { Curator } from 'src/app/models/curator';


@Component({
  selector: 'app-add-curator-modal',
  templateUrl: './add-curator-modal.component.html',
  styleUrls: ['./add-curator-modal.component.scss']
})
export class AddCuratorModalComponent implements OnInit {

  curator: Curator = new Curator();
  file: File;
  private authState: Observable<firebase.User>;

  constructor(
    private dbOperations: DbOperationsService) { }

  ngOnInit(): void {

  }

  onFileSelected(event) {
    this.file = event.target.files[0];
    console.log(this.file);
  }


  onSubmit(form) {
    if (this.file != null) {
      if (this.file.type.includes('image')) {
        this.createCuratorProfile();
        form.reset();
      } else {
        window.alert('Please upload an image file')
      }
    } else {
      window.alert('Please upload profile picture')
    }
  }

  createCuratorProfile() {
    this.dbOperations.getCurrentUser().subscribe(user => {
      if (user) {
        this.curator.authorizorId = user.uid;
        this.curator.curatorId = Date.now + '';
        console.log('AUTHSTATE USER', user.uid); //this works
        this.dbOperations.createCurator(this.curator, this.file);
      } else {
        console.log('AUTHSTATE USER EMPTY', user);
      }
    }, err => {
      console.log('Please try again')
    });
  }

}
