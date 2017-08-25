import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Meeting } from "../../models/meeting";
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { AngularFireAuth } from "angularfire2/auth";
import { Calendar } from '@ionic-native/calendar';



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

  constructor(public afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams, public  angFire: AngularFireDatabase, private calendar: Calendar) {
    this.meeting.members = []; // place for members must be defined as array at begins
    this.meeting.organizator = this.afAuth.auth.currentUser.email //organizator is currentUser, needed for validation member list organizator is always member
   
    this.users = angFire.list('/Users'); //list for members you could invite
    this.calendar.createCalendar('MyCalendar').then(
      (msg) => { console.log(msg); },
      (err) => { console.log(err); }
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateMeetingPage');
  }

  confirmMeeting(meeting: Meeting){
    this.meetings = this.angFire.list('/Meetings'); 
    this.meetings.push(meeting) // pushing into firebase database

  this.calendar.createEvent(meeting.topic, meeting.address, meeting.description, new Date(), new Date())
  this.calendar.openCalendar(meeting.date)

  }

  print = function() {
   // console.log(this.meeting);
  }
  

}
