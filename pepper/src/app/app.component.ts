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
  error;

  constructor(private db: AngularFireDatabase,
              private afAuth: AngularFireAuth,
              private http: Http) {
  }

  ngOnInit(): void {
    this.afAuth.authState.subscribe(authState => {
    })
  }

  register() {
    this.db.app.auth().createUserWithEmailAndPassword('rframe83@gmail.com', 'Testme12')
      .then(authState => {
        // authState.auth.sendEmailVerification();
        console.log('Register-then', authState)
      })
      .catch(error => console.log('Register-error', error));
  }

  login() {
    this.db.app.auth().signInWithEmailAndPassword('rframe83@gmail.com', 'Testme12')
      .then(authState => {console.log('Login-then', authState)})
      .catch(error => this.error = error.message);
  }

  logout() {
    this.db.app.auth().signOut();
  }
}





