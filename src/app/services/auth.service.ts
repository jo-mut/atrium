import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFirestoreDocument } from '@angular/fire/firestore/public_api';
import { User } from '../models/user';
import { SignUpComponent } from '../auth/sign-up/sign-up.component';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
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
    return new Promise<any>((resolve, reject) => {
      return this.afAuth.createUserWithEmailAndPassword(user.email, user.password)
        .then((result) => {
          this.setUserData(user);
          return this.afAuth.signInWithEmailAndPassword(user.email, user.password)
            .then((result) => {
              this.ngZone.run(() => {
                console.log('signed in')
                this.proceedToAddArtworks();
              });
            }).catch((error) => {
              window.alert(error.message)
            })
        }).catch((error) => {
        })
    })
  }

  proceedToAddArtworks() {
    this.router.navigateByUrl('/site/add-artworks');
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

  // Sign in with Google
  googleAuth() {
    // return this.authLogin(new GoogleAuthProvider());
  }

  // Auth logic to run auth providers
  authLogin(provider) {
    return this.afAuth.signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          // this.router.navigate(['/main/exhibitions']);
        })
        this.setUserData(result.user);
      }).catch((error) => {
        window.alert(error)
      })
  }

  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  setUserData(user) {
    const userId = this.afs.collection('users').doc();
    console.log('saved user')
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${userId}`);
    user.id = userId;
    return userRef.set(user, {
      merge: true
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
