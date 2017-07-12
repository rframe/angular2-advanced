import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AngularFireModule} from 'angularfire2';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {AngularFireDatabase} from "angularfire2/database";
import {AngularFireAuth} from 'angularfire2/auth';

export const firebaseConfig = {
  apiKey: "AIzaSyAvf141GZyKEj0IcV4G6QoxGEGc-zE3UUM",
  authDomain: "pepper-86a69.firebaseapp.com",
  databaseURL: "https://pepper-86a69.firebaseio.com",
  projectId: "pepper-86a69",
  storageBucket: "pepper-86a69.appspot.com",
  messagingSenderId: "768463169186"
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [AngularFireDatabase, AngularFireAuth],
  bootstrap: [AppComponent]
})
export class AppModule { }
