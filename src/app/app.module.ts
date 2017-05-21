import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { CreateMeetingPage } from '../pages/create-meeting/create-meeting';
import { MeetingsPage } from '../pages/meetings/meetings';
import { CalendarPage } from '../pages/calendar/calendar';
import { MapPage } from '../pages/map/map';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Contacts, Contact } from '@ionic-native/contacts';
import { SQLite } from '@ionic-native/sqlite';
import {
 GoogleMaps
} from '@ionic-native/google-maps';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    CreateMeetingPage,
    MeetingsPage,
    CalendarPage,
    MapPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    CreateMeetingPage,
    MeetingsPage,
    CalendarPage,
    MapPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Contacts,
    Contact,
    SQLite,
    GoogleMaps
  ]
})
export class AppModule {}
