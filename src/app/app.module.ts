import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { CreateMeetingPage } from "../pages/create-meeting/create-meeting";
import { ListMeetingsPage } from "../pages/list-meetings/list-meetings";
import { AutocompletePage } from "../pages/autocomplete/autocomplete";


import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from "angularfire2/auth";

export const firebaseConfig = {
  apiKey: "AIzaSyAaRq099uf9IUl5aY7r2Go_02yJCQHKKU8",
  authDomain: "meetingproject-167114.firebaseapp.com",
  databaseURL: "https://meetingproject-167114.firebaseio.com",
  projectId: "meetingproject-167114",
  storageBucket: "meetingproject-167114.appspot.com",
  messagingSenderId: "349350804169"
};

@NgModule({
  declarations: [
    MyApp,
    CreateMeetingPage,
    ListMeetingsPage,
    AutocompletePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    CreateMeetingPage,
    ListMeetingsPage,
    AutocompletePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
