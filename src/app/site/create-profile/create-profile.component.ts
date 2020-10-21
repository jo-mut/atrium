import { Component, HostListener, NgZone, OnInit } from '@angular/core';
import { User } from "../../models/user";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { DbOperationsService } from 'src/app/services/db-operations.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TermModalComponent } from './term-modal/term-modal.component';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { invalid } from '@angular/compiler/src/render3/view/util';

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.scss']
})
export class CreateProfileComponent implements OnInit {

  user: User = new User();
  submissionUser = new User();
  file: File;
  private authState: Observable<firebase.User>;
  maxDate = new Date(2002, 11, 31);
  minDate = new Date(1995, 0, 1);
  isLinear = true;


  genders: string[] = ['Male', 'Female', 'Other', 'Prefer not to say'];
  facebook: string;
  youtube: string;
  instagram: string;
  others: string;
  social: string[] = [];
  currentUser: any;

  formWidth: any = 100;
  headingSize = '2.0em';
  disableProfileCreate = true;

  constructor(private authService: AuthService,
    public ngZone: NgZone,
    private matDialog: MatDialog,
    private dbOperations: DbOperationsService,
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    private router: Router) {
  }

  ngOnInit(): void {
    this.getScreenSize();
    this.afAuth.authState.subscribe(user => {
      this.currentUser = user;
    })

  }

  onFileSelected(event) {
    this.file = event.target.files[0];
    console.log(this.file);
  }

  public OnDateChange(event): void {
    let timeDiff = Math.abs(Date.now() - event.getTime());
    let age = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365.25);

    if (age < 18) {
      this.user.birthDate = null;
      window.alert('Sorry! The minimum age to participate is 18yrs old')
    } else {
      this.user.birthDate = event;
    }
  }

  selectOption(event) {
    console.log(event);
    this.user.gender = event;
  }

  goBack(stepper: MatStepper) {
    stepper.previous();
  }

  goForward(stepper: MatStepper) {
    stepper.next();

  }

  creatAcountAndGoForward(stepper: MatStepper) {
    this.authService.register(this.user, stepper).then(() => {
      this.authService.checkIfUserExists(this.user, stepper).then(() => {
        this.ngZone.run(() => {
          stepper.next();
        })
      })
    }).catch((error) => {
      console.log(error['code'])
      this.authService.signIn(this.user).then(() => {
        this.authService.checkIfUserExists(this.user, stepper).then(() => {
          this.ngZone.run(() => {
            stepper.next();
          })
        })
      })
    })
  }


  onSubmit() {
    this.social.push(this.facebook);
    this.social.push(this.instagram);
    this.social.push(this.others);
    this.social.push(this.youtube);
    this.user.socialMedia = this.social;
    console.log(this.user)
    this.authService.saveUserProfileInfo(this.user);
  }



  nextStep(user) {
    console.log('user ' + user);
  }

  // signUp(user: User) {
  //   var promise = new Promise((resolve, reject) => {
  //     console.log(user)
  //   // this.disableProfileCreate = true;


  //   return promise;
  // }

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

    if (width > 1000) {
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

    if (width > 1000) {
      this.formWidth = 70;

    }

    if (width > 1200) {
      this.formWidth = 60;
    }
  }

}
