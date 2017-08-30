import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController, NavParams } from 'ionic-angular';
import { Meeting } from "../../models/meeting";
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { AngularFireAuth } from "angularfire2/auth";
import { Calendar } from '@ionic-native/calendar';
import { AutocompletePage } from "../autocomplete/autocomplete";



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
  address;
  missing = {};

  constructor(public afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams, public  angFire: AngularFireDatabase, private calendar: Calendar, public modalCtrl: ModalController) {
    this.meeting.members = []; // place for members must be defined as array at begins
    this.meeting.organizator = this.afAuth.auth.currentUser.email //organizator is currentUser, needed for validation member list organizator is always member
    this.address = { place: '' };
    this.users = angFire.list('/Users'); //list for members you could invite
    this.calendar.createCalendar('MyCalendar').then(
      (msg) => { console.log(msg); },
      (err) => { console.log(err); }
    );
    this.missing= {};
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateMeetingPage');
  }

  confirmMeeting(meeting: Meeting){
    var required = ['topic', 'description', 'timeStarts', 'timeEnds', 'address']
    this.meetings = this.angFire.list('/Meetings'); 
    meeting.address = this.address.place;
    var flag = 1;
    for (let i of Object.keys(meeting.members)) {
      if(!meeting.members[i]){
        delete meeting.members[i]
      }
    }

    for(let i of required){
      if(!meeting[i]){
        this.missing[i] = true
      }
    }
    
    console.log(this.missing)
    
    Object.keys(this.missing).forEach (key=> {
      if ( this.missing[key] = true )
        flag = 0;
    });
    if (flag)
      {
        this.meetings.push(meeting) // pushing into firebase database
      }
    else{
      flag=1;
    }
        this.calendar.createEvent(meeting.topic, meeting.address, meeting.description, new Date(meeting.timeStarts), new Date(meeting.timeEnds))

    for(let i of required){
      if(!meeting[i]){
        this.missing[i] = true
      }
    }

  }

  showAddressModal () {
    let modal = this.modalCtrl.create(AutocompletePage);
    modal.onDidDismiss(data => {
      this.address.place = data;
    });
    modal.present();
  }


}
