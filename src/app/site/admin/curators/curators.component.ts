import { Component, OnInit } from '@angular/core';
import { Curator } from 'src/app/models/curator';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { AddCuratorModalComponent } from './add-curator-modal/add-curator-modal.component';
import { Router } from '@angular/router';
import { DbOperationsService } from 'src/app/services/db-operations.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-curators',
  templateUrl: './curators.component.html',
  styleUrls: ['./curators.component.scss']
})
export class CuratorsComponent implements OnInit {

  curators: Curator[] = [];
  private authState: Observable<firebase.User>;


  constructor(private router: Router,
    private dbOperations: DbOperationsService,
    private matDialog: MatDialog) { }

  ngOnInit(): void {
  }

  addCurator() {

  }

  goToSubmitArtworks() {
    this.authState.subscribe(user => {
      if (user.uid) {
        console.log('AUTHSTATE USER', user.uid);
        this.checkIfUserIsAdmin(user.uid)
      } else {
        console.log('AUTHSTATE USER EMPTY', user);
        this.router.navigateByUrl('/site/create-profile')
      }
    },
      err => {
        console.log('Please try again')
      });

  }

  checkIfUserIsAdmin(userId: string) {
    this.dbOperations.usersCollectionById(userId)
      .onSnapshot(data => {
        if(data != null) {
          data.forEach(e => {
            const data = e.data();
            const id = e.id;
            let user = {...data } as User;
            let roles = user.role;
            if (roles.includes('admin')) {
              this.router.navigateByUrl('/site/admin')
            }else {
              this.router.navigateByUrl('/site/add-artworks')
              console.log('AUTHSTATE USER', userId); //this works
            }
          })
        }
      })
  };

  lauchCuratorModal() {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = false;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "80%";
    dialogConfig.width = "50%";
    // https://material.angular.io/components/dialog/overview
    const modalDialog = this.matDialog.open(AddCuratorModalComponent, dialogConfig);
  }
}
