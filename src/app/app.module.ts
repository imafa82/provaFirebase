import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';

import { AppComponent } from './app.component';
export const firebaseConfig = {
    apiKey: "AIzaSyAsD6qUZkS58eZsrpgBDDTFmqhkGaEQcpQ",
    authDomain: "fir-5bd3f.firebaseapp.com",
    databaseURL: "https://fir-5bd3f.firebaseio.com",
    projectId: "fir-5bd3f",
    storageBucket: "fir-5bd3f.appspot.com",
    messagingSenderId: "248805438501"
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
