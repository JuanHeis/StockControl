import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  favoriteColor?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  userUID: string;
  user: any;
  authState: any = null;
  public state: boolean = false;

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore, private router: Router) {
    //// Get auth data, then get firestore user document || null
    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges()
        } else {
          return of(null)
        }
      })
    )
  }
  ngOnInit() {
    this.afAuth.authState.subscribe(user => {
      if (user) { console.log("PANnn" + user.uid) }
    });
  }

  googleLogin() {
    const provider = new auth.GoogleAuthProvider()
    return this.socialSignIn(provider);
  }

  private socialSignIn(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then(credential => {
        this.authState = credential.user
        this.router.navigate(['/system'])
        this.updateUserData(credential.user)
      })
      .catch(error => console.log(error));
  }
  updateState() {
    this.state = !!this.authState;
  }

  private updateUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    }
    this.user = data;
    return userRef.set(data, { merge: true })
  }


  signOut() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/']);
    });
  }
}
