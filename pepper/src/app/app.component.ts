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
import {Http} from '@angular/http';

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

  constructor(private db: AngularFireDatabase,
              private afAuth: AngularFireAuth,
              private http: Http) {
  }

  ngOnInit(): void {
    this.afAuth.authState.subscribe(x => {
      if (!x) {
        this.displayName = null;
        this.photoUrl = null;
        return;
      }

      const facebookProvider = x.providerData.find(x => x.providerId === new firebase.auth.FacebookAuthProvider().providerId);
      let userRef = this.db.object(`/users/${x.uid}`);

      userRef.subscribe(user => {
        if(!!facebookProvider) {
          let url = `https://graph.facebook.com/v2.8/${facebookProvider.uid}?fields=first_name,last_name&access_token=${user.accessToken}`;
          this.http.get(url).subscribe(response => {
            let user = response.json();
            userRef.update({
              firstName: user.first_name,
              lastName: user.last_name
            });
          });
        }
      });

      this.displayName = x.displayName;
      this.photoUrl = x.photoURL;
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





