import { Component, HostListener, OnInit } from '@angular/core';
import { User } from "../../models/user";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { DbOperationsService } from 'src/app/services/db-operations.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TermModalComponent } from './term-modal/term-modal.component';

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.scss']
})
export class CreateProfileComponent implements OnInit {

  user: User = new User();
  file: File;
  private authState: Observable<firebase.User>;
  genders: string[] = ['Male', 'Female'];
  facebook: string;
  youtube: string;
  instagram: string;
  others: string;
  social: string[] = [];

  formWidth: any = 100;
  headingSize = '2.0em';

  constructor(private authService: AuthService,
    private matDialog: MatDialog,
    private dbOperations: DbOperationsService,
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    private router: Router) {
  }

  ngOnInit(): void {
   this.getScreenSize();
  }

  onFileSelected(event) {
    this.file = event.target.files[0];
    console.log(this.file);
  }

  public OnDateChange(event): void {
    this.user.birthDate = event;
  }

  selectOption(event) {
    this.user.gender = event;
  }

  onSubmit(form) {
    this.user.code = Date.now() + '';
    this.social.push(this.facebook);
    this.social.push(this.instagram);
    this.social.push(this.others);
    this.social.push(this.youtube);
    this.user.socialMedia = this.social;
    this.signUp(this.user, this.file);
    // form.reset();
  }

  signUp(user: User, file) {
    // console.log(user)
    this.authService.signUp(user)
      .then(res => {
        /* Call the SendVerificaitonMail() function when new user sign
        up and returns promise */
        // this.authService.sendVerificationMail();
      }).catch(error => {
        window.alert(error.message);
      });
  }

  lauchCuratorModal() {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = false;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "80%";
    dialogConfig.width = "50%";
    // https://material.angular.io/components/dialog/overview
    const modalDialog = this.matDialog.open(TermModalComponent, dialogConfig);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    let width = event.target.innerWidth;
    if (width > 800) {
      this.formWidth = 80;
    } 

    if(width > 1000) {
      this.formWidth = 70;

    } 

    if (width > 1200) {
      this.formWidth = 60;
    }

  }

  getScreenSize() {
    let width = window.innerWidth;
    if (width > 800) {
      this.formWidth = 80;
    } 

    if(width > 1000) {
      this.formWidth = 70;

    } 

    if (width > 1200) {
      this.formWidth = 60;
    }
  }

}
