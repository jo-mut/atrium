import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFirestoreDocument } from '@angular/fire/firestore/public_api';
import { User } from '../models/user';
import { SignUpComponent } from '../auth/sign-up/sign-up.component';
import { DbOperationsService } from './db-operations.service';
import { Observable, from } from 'rxjs';
import { switchMap, window } from 'rxjs/operators';
import { finalize, tap, mapTo } from 'rxjs/operators';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { async } from '@angular/core/testing';
import { MatStepper } from '@angular/material/stepper';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  downloadUrl: any = null;
  private authState: Observable<firebase.User>;
  emailSent = false;
  currentUser = '';

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
    return this.afAuth.signInWithEmailAndPassword(user.email, user.password)
      .then((result) => {
        this.ngZone.run(() => {
          console.log('signed in')
        });
      }).catch((error) => {

      })

  }

  checkIfUserExists(user: User, stepper: MatStepper) {
    return new Promise((resolve, reject) => {
      this.dbOperations.usersCollection().get().subscribe(data => {
        if (!data.empty) {
          console.log('not null')
          this.dbOperations.usersCollection()
            .ref.where('email', '==', user.email).get().then((data) => {
              if (!data.empty) {
                data.forEach(d => {
                  if (d.exists) {
                    const id = d.id;
                    const existingUser = d.data() as User;
                    let roles = existingUser.role;
                    this.ngZone.run(() => {
                      if (roles.includes('admin')) {
                        this.router.navigateByUrl('/project/admin/artworks')
                      } else if (roles.includes('moderator')) {
                        this.router.navigateByUrl('/project/admin')
                      } else if (roles.includes('artist')) {
                        this.router.navigateByUrl('/project/add-artworks')
                      } else {
                        stepper.next();
                      }
                    })

                  }
                })
              } else {
                stepper.next();
                // this.register(user, stepper);
                console.log('resgiter')
              }
            }).catch((reject) => {

            })

        } else {
          stepper.next();
          // this.register(user, stepper);
        }
      })
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

  async register(user: User, stepper: MatStepper) {
    var result = await this.afAuth.createUserWithEmailAndPassword(user.email, user.password)
    if (result != null) {
      // this.sendEmailVerification();
      this.signIn(user)
        .then((res) => {
          user.userId = result.user.uid;
          user.password = '';
          console.log(user.userId)
          const userRef = this.dbOperations
            .usersCollection().doc(user.userId);
          const param = JSON.parse(JSON.stringify(user));
          return userRef.set(param)
            .then((result) => {
              stepper.next();
              // sign in user after profile has been saved
            }).catch((error) => {
              // window.alert(error.message);
            })

        }).catch((rej) => {

        })

    }
  }

  async sendEmailVerification() {
    // await this.afAuth.currentUser.sendEmailVerification()
    // this.router.navigate(['admin/verify-email']);
  }

  async sendPasswordResetEmail(passwordResetEmail: string) {
    return await this.afAuth.sendPasswordResetEmail(passwordResetEmail);
  }

  async logout() {
    await this.afAuth.signOut();
    // localStorage.removeItem('user');
    // this.router.navigate(['admin/']);
  }

  async signInAnonymously(user: User) {
    await this.afAuth.signInAnonymously().then((res) => {
      console.log(res.user.uid);
      user.userId = res.user.uid;
      user.role.push('artist')
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
    console.log("set user data " + user.email);
    this.authState = this.afAuth.authState;
    this.authState.subscribe(currentUser => {
      if (currentUser.uid) {
        user.userId = currentUser.uid;
        user.role.push('artist')
        user.password = '';
        user.code = Date.now() + '';
        // const userRef = this.dbOperations
        //   .usersCollection().doc(user.userId);
        const param = JSON.parse(JSON.stringify(user));
        this.dbOperations.getCurrentUser().subscribe(u => {
          this.dbOperations.usersCollection().doc(u.uid)
            .update(param).then((resolve) => {
              this.getUserProfileInfo(user);
            }).catch((error) => {
              // window.alert(error.message);

            })
        })
      }
    },
      err => {
        console.log('Please try again')
      });

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
            if (roles.includes('admin')) {
              this.router.navigateByUrl('/project/admin/artworks')
            }
            if (roles.includes('moderator')) {
              this.router.navigateByUrl('/project/admin')
            }
            if (roles.includes('artist')) {
              this.router.navigateByUrl('/project/add-artworks')
            }


          })
        })
      }).catch((reject) => {

      })
  }

  // Sign out 
  signOut() {
    return this.afAuth.signOut().then(() => {
      // localStorage.removeItem('user');
      this.router.navigate(['/sign-in']);
    })
  }

}
