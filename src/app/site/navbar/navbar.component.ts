import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CreateModalComponent } from 'src/app/admin/create-modal/create-modal.component';
import { DbOperationsService } from 'src/app/services/db-operations.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  private hidden = false
  private authState: Observable<firebase.User>;


  constructor(private router: Router,
    private fauth: AngularFireAuth,
    private dbOperations: DbOperationsService,
    private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.authState = this.fauth.authState;
  }

  showHideSidebar() {
    if (this.hidden) {
      this.hidden = false;
    } else {
      this.hidden = true;
    }
  }

  openModal() {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = false;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "40%";
    dialogConfig.width = "60%";
    // https://material.angular.io/components/dialog/overview
    const modalDialog = this.matDialog.open(CreateModalComponent, dialogConfig);
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
    this.dbOperations.usersCollection(userId)
      .ref.where('userId', '==', userId).onSnapshot(data => {
        if(data != null) {
          data.forEach(e => {
            const data = e.data();
            const id = e.id;
            let user = { id, ...data } as User;
            if (user.role === 'admin') {
              this.router.navigateByUrl('/site/admin')
            }else {
              this.router.navigateByUrl('/site/add-artworks')
              console.log('AUTHSTATE USER', userId); //this works
            }
          })
        }
      })
  };

}
