import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { AngularFireAuth } from "angularfire2/auth";

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

  currentUser: string;
  myMeetings:  FirebaseListObservable<any[]>;
  notConfirmed: FirebaseListObservable<any[]>;
  confirmed: FirebaseListObservable<any[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public angFire: AngularFireDatabase, public afAuth: AngularFireAuth) {
    this.currentUser = this.afAuth.auth.currentUser.displayName;

    this.myMeetings = angFire.list('/Meetings', {
      query: {
        orderByChild: 'organizator',
        equalTo: this.afAuth.auth.currentUser.email
      }
    });

    this.notConfirmed = angFire.list('/Meetings',{
      query: {
        orderByChild: "members/"+this.currentUser,
        equalTo: true //IMPORTANT!!! notConfirmed have value true, confirem have value false!!!!!!!!!
        
      }
    })

    this.confirmed = angFire.list('/Meetings',{
      query: {
        orderByChild: "members/"+this.currentUser,
        equalTo: false
      }
    })
    console.log(angFire.list('/Meetings'))

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListMeetingsPage');
  }

}
