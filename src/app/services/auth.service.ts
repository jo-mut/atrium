import { EventEmitter, Injectable, NgZone, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFirestoreDocument } from '@angular/fire/firestore/public_api';
import { User } from '../models/user';
import { SignUpComponent } from '../auth/sign-up/sign-up.component';
import { DbOperationsService } from './db-operations.service';
import { switchMap, window } from 'rxjs/operators';
import { finalize, tap, mapTo } from 'rxjs/operators';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { async } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { MatStepper } from '@angular/material/stepper';
import { auth, analytics } from 'firebase/app';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  downloadUrl: any = null;
  private authState: Observable<firebase.User>;
  emailSent = false;
  currentUser: string;
  user: User;

  constructor(
    private storage: AngularFireStorage,
    public dbOperations: DbOperationsService,
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {


  }

  async signIn(user: User) {
    this.afAuth.setPersistence(auth.Auth.Persistence.SESSION)
      .then((res) => {
        return this.afAuth.signInWithEmailAndPassword(user.email, user.password)
          .then((result) => {
            this.ngZone.run(() => {
              of(result.user.uid).subscribe(type => {
                this.currentUser = type;
                this.router.navigateByUrl('/artist-profile')
                localStorage.setItem('currentUser', this.currentUser);
              })
            });
          }).catch((error) => {

          })

      }).catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
      });



  }

  checkIfUserExists(user: User) {
    this.user = user;
    return this.dbOperations.usersCollection()
      .ref.where('email', '==', user.email).get().then((data) => {
        if (!data.empty) {
          data.forEach(d => {
            if (d.exists) {
              const id = d.id;
              const existingUser = d.data() as User;
              let roles = existingUser.role;
              localStorage.setItem('currentUser', existingUser.userId);
              console.log(existingUser.userId + ' current user')
              this.ngZone.run(() => {
                if (roles.includes('filtering')) {
                  this.router.navigateByUrl('/project/admin/filter-artworks')
                } else if (roles.includes('moderator')) {
                  this.router.navigateByUrl('/project/admin')
                } else if (roles.includes('artist')) {
                  this.router.navigateByUrl('/upload-files')
                } else if (roles.includes('scoring')) {
                  this.router.navigateByUrl('/project/admin/score')
                } else if (roles.includes('selection')) {
                  this.router.navigateByUrl('/project/admin/select-artworks')
                } else {
                  this.router.navigateByUrl('/artist-profile')
                }
              })
            }
          })
        } else {
          console.log('resgiter')
          this.register(user);
        }
      }).catch((reject) => {

      })
  }

  convertErrorMessage(code: string): string {
    switch (code) {
      case 'auth/user-disabled': {
        return 'Sorry your user is disabled.';
      }
      case 'auth/user-not-found': {
        return 'Sorry user not found.';
      }

      case 'auth/invalid-user-token': {
        return 'Could you please login in again'
      }

      case 'auth/email-already-in-use': {
        return 'Email already in use. Please enter your password to log in'
      }

      default: {
        return 'Login error try again later.';
      }
    }
  }

  register(user: User) {
    return this.afAuth.createUserWithEmailAndPassword(user.email, user.password)
    .then(d => {
      return this.signIn(user)
        .then((res) => {
          // stepper.next();
          user.userId = d.user.uid;
          user.password = '';
          this.currentUser = d.user.uid;
          localStorage.setItem('currentUser', user.userId);

          console.log(user.userId + ' user uid')
          const userRef = this.dbOperations
            .usersCollection().doc(user.userId);
          const param = JSON.parse(JSON.stringify(user));
          return userRef.set(param)
            .then((result) => {
              this.router.navigateByUrl('/artist-profile')
              console.log(user.userId + ' user uid signed in')
              // sign in user after profile has been saved
            }).catch((error) => {
              // window.alert(error.message);
            })

        }).catch((rej) => {

        })
    })

  }

  async sendEmailVerification() {
    // await this.afAuth.currentUser.sendEmailVerification()
    // this.router.navigate(['admin/verify-email']);
  }

  async sendPasswordResetEmail(passwordResetEmail: string) {
    return await this.afAuth.sendPasswordResetEmail(passwordResetEmail);
  }

  async logout() {
    await this.afAuth.signOut().then(res => {
      localStorage.removeItem('currentUser');
    }).catch((err => {

    }))
  }

  async signInAnonymously(user: User) {
    await this.afAuth.signInAnonymously().then((res) => {
      console.log(res.user.uid);
      user.userId = res.user.uid;
      user.password = '';
      console.log(user.userId)
      const userRef = this.dbOperations
        .usersCollection().doc(user.userId);
      const param = JSON.parse(JSON.stringify(user));
      return userRef.set(param)
        .then((result) => {
          this.getUserProfileInfo(user);
          // sign in user after profile has been saved
        }).catch((error) => {
          // window.alert(error.message);
        })

    }).catch((err) => {

    })
  }


  // Send email verfificaiton when new user sign up
  sendVerificationMail() {
    // return this.afAuth.currentUser.sendEmailVerification()
    // .then(() => {
    //   this.router.navigate(['verify-email-address']);
    // })
  }

  // Reset Forggot password
  forgotPassword(passwordResetEmail) {
    return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        // window.alert('Password reset email sent, check your inbox.');
      }).catch((error) => {
        // window.alert(error)
      })
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? true : false;
  }

  saveUserProfileInfo(user: User) {
    this.user = user;
    console.log("set user data " + user.email);
    this.authState = this.afAuth.authState;
    let userId = localStorage.getItem('currentUser');
    console.log("set user data " + userId);

    this.user.userId = userId;
    this.user.role.push('artist')
    this.user.password = '';
    this.user.code = Date.now() + '';
    // const userRef = this.dbOperations
    //   .usersCollection().doc(user.userId);
    const param = JSON.parse(JSON.stringify(this.user));
    this.dbOperations.usersCollection().doc(this.user.userId)
      .update(param).then((resolve) => {
        this.router.navigateByUrl('/social-links')
      }).catch((error) => {
        // window.alert(error.message);

      })

  }

  saveUserSociaMediaInfo(user: User) {
    this.user = user  
    // const userRef = this.dbOperations
    //   .usersCollection().doc(user.userId);
    const param = JSON.parse(JSON.stringify(this.user));
    this.dbOperations.usersCollection().doc(this.user.userId)
      .update(param).then((resolve) => {
        this.getUserProfileInfo(this.user) 
      }).catch((error) => {
        // window.alert(error.message);

      })

  }

  // navigateAfterSignIn(user: User) {
  //   console.log("sign in trial " + user.email);
  //   this.afAuth.signInWithEmailAndPassword(user.email, user.password)
  //     .then((result) => {
  //       this.ngZone.run(() => {
  //         this.getUserProfileInfo(user);
  //       });
  //     }).catch((error) => {
  //       window.alert(error.message)
  //     })
  // }

  getUserProfileInfo(user: User) {
    this.dbOperations.usersCollection()
      .ref.where('userId', '==', user.userId).get().then((data) => {
        data.docs.forEach(d => {
          const id = d.id;
          const u = d.data() as User;
          console.log("sign in trial " + u.userId);
          let roles = u.role;
          this.ngZone.run(() => {
            if (roles.includes('filtering')) {
              this.router.navigateByUrl('/project/admin/filter-artworks')
            }

            if (roles.includes('moderator')) {
              this.router.navigateByUrl('/project/admin')
            }

            if (roles.includes('artist')) {
              this.router.navigateByUrl('/upload-files')
            }

            if (roles.includes('scoring')) {
              this.router.navigateByUrl('/project/admin/score')
            }

            if (roles.includes('selection')) {
              this.router.navigateByUrl('/project/admin/select-artworks')
            }
          })
        })
      }).catch((reject) => {

      })
  }

  skipSocialMedia() {
    this.router.navigateByUrl('/upload-files')
  }

  // Sign out 
  signOut() {
    // return this.afAuth.signOut().then(() => {
    // localStorage.removeItem('user');
    // this.router.navigate(['/sign-in']);
    // })
  }

}
