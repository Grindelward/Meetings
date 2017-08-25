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
  users: FirebaseListObservable<any[]>;
  checked = {members:[]};

  constructor(public afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams, public  angFire: AngularFireDatabase) {
    this.meeting.members = []; // place for members must be defined as array at begins
    this.meeting.organizator = this.afAuth.auth.currentUser.email //organizator is currentUser, needed for validation member list organizator is always member
   
    this.users = angFire.list('/Users'); //list for members you could invite
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateMeetingPage');
  }

  confirmMeeting(meeting: Meeting){
    this.meetings = this.angFire.list('/Meetings');  

    for (let member in this.checked.members) {
      meeting.members.push({email: member, confirmed: false})
    }
    this.meetings.push(meeting) // pushing into firebase database

  }

  print = function() {
    console.log(this.meeting);
  }

}
