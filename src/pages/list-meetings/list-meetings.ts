import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";

/**
 * Generated class for the ListMeetingsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list-meetings',
  templateUrl: 'list-meetings.html',
})
export class ListMeetingsPage {

  meetings: FirebaseListObservable<any[]>; 

  constructor(public navCtrl: NavController, public navParams: NavParams,  angFire: AngularFireDatabase) {

    this.meetings = angFire.list('/Meetings')

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListMeetingsPage');
  }

}
