import {Component, OnDestroy, OnInit} from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import {AngularFireAuth, AngularFireAuthProvider, AngularFireAuthModule, AUTH_PROVIDERS} from 'angularfire2/auth';
// import {} from 'angularfire2/angularfire2';
import {Subscription} from 'rxjs/Subscription';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take'
import {Observable} from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import AuthCredential = firebase.auth.AuthCredential;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  cuisines: FirebaseListObservable<any[]>;
  restaurants: Observable<any[]>;
  displayName;
  photoUrl;

  constructor(private db: AngularFireDatabase, public afAuth: AngularFireAuth) {
  }

  ngOnInit(): void {
    this.afAuth.authState.subscribe(x => {
      if (!x) {
        console.log('Not Logged In');
        this.displayName = null;
        this.photoUrl = null;
        return;
      }

      console.log('Logged In', x);
      this.displayName = x.displayName
      this.photoUrl = x.photoURL
    })
  }

  login() {
    const facebook = (new firebase.auth.FacebookAuthProvider()
      .addScope('public_profile') as firebase.auth.FacebookAuthProvider)
      .addScope('user_friends');
    this.afAuth.auth.signInWithPopup(facebook)
      .then((authState => {
        this.db.object((`users/${authState.user.uid}`))
          .update({accessToken: authState.credential.accessToken});
      }))
  }

  logout() {
    this.afAuth.auth.signOut().then(x => {console.log('user is signed out')});
  }
}





