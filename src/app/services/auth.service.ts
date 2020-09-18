import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFirestoreDocument } from '@angular/fire/firestore/public_api';
import { User } from '../models/user';
import { SignUpComponent } from '../auth/sign-up/sign-up.component';
import { DbOperationsService } from './db-operations.service';
import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { finalize, tap, mapTo } from 'rxjs/operators';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  downloadUrl: any = null;
  private authState: Observable<firebase.User>;

  constructor(
    private storage: AngularFireStorage,
    public dbOperations: DbOperationsService,
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) { }


  // Sign in with email/password
  signIn(email, password) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          console.log('signed in')
        });
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  // Sign up with email/password
  signUp(user: User) {
    if (user != null) {
      return this.afAuth.createUserWithEmailAndPassword(user.email, user.password)
        .then((result) => {
          this.saveUserProfileInfo(user);
          window.alert(result.additionalUserInfo);
        }).catch((error) => {
          window.alert(error.message)
        })
    } else {
      console.log('auth sign up ' + null);
    }
  }

  // Send email verfificaiton when new user sign up
  // sendVerificationMail() {
  //   return this.afAuth.currentUser.sendEmailVerification()
  //   .then(() => {
  //     this.router.navigate(['verify-email-address']);
  //   })
  // }

  // Reset Forggot password
  forgotPassword(passwordResetEmail) {
    return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      }).catch((error) => {
        window.alert(error)
      })
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? true : false;
  }


  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  setUserData(user: User) {
    console.log("set user data " + user.email);
    this.authState = this.afAuth.authState;
    this.authState.subscribe(currentUser => {
      if (currentUser.uid) {
        user.userId = currentUser.uid;
        user.role = "artist"
        // const path = `users/images/${Date.now() + ''}_${file?.name}`;
        // // Reference to storage bucket
        // const ref = this.storage.ref(path);
        // // The main task
        // const task = this.storage.upload(path, file);
        // // Progress monitoring
        // const percentage = task.percentageChanges();
        // task.snapshotChanges().pipe(finalize(async () => {
        //     this.downloadUrl = await ref.getDownloadURL().toPromise();
        //     console.log("download url " + this.downloadUrl);
        //   })
        //   ).subscribe();

        //   return percentage;
      }
    },
      err => {
        console.log('Please try again')
      });

  }

  saveUserProfileInfo(user: User) {
    console.log("set user data " + user.email);
    this.authState = this.afAuth.authState;
    this.authState.subscribe(currentUser => {
      if (currentUser.uid) {
        user.userId = currentUser.uid;
        user.role = "artist"
        const userRef = this.dbOperations
          .usersCollection().doc(user.userId);
        const param = JSON.parse(JSON.stringify(user));
        return userRef.set(param)
          .then((result) => {
            // sign in user after profile has been saved
            this.navigateAfterSignIn(user);
          }).catch((error) => {
            window.alert(error.message);
          })
      }
    },
      err => {
        console.log('Please try again')
      });

  }

  navigateAfterSignIn(user: User) {
    console.log("sign in trial " + user.email);
    this.afAuth.signInWithEmailAndPassword(user.email, user.password)
      .then((result) => {
        this.ngZone.run(() => {
          this.getUserProfileInfo(user);
        });
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  getUserProfileInfo(user: User) {
    return this.dbOperations.usersCollection()
      .ref.where('id', '==', user.userId).onSnapshot(data => {
        data.docs.forEach(d => {
          const id = d.id;
          const user = d.data() as User;
          if (user.role === 'admin') {
            this.router.navigateByUrl('/project/admin')
          } else {
            this.router.navigateByUrl('/project/add-artworks')
          }
        })
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
