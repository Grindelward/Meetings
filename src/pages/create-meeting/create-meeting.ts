import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Meeting } from "../../models/meeting";
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { AngularFireAuth } from "angularfire2/auth";
/**
 * Generated class for the CreateMeetingPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-meeting',
  templateUrl: 'create-meeting.html',
})
export class CreateMeetingPage {

  meeting = {} as Meeting;
  meetings: FirebaseListObservable<any[]>; 

  constructor(public afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams,  angFire: AngularFireDatabase) {

    this.meetings = angFire.list('/Meetings');  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateMeetingPage');
  }

  confirmMeeting(meeting: Meeting){
      meeting.organizator = this.afAuth.auth.currentUser.email
      this.meetings.push(meeting)
      console.log(this.meetings)

  }

}
