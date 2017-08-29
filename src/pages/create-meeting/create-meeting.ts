import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController, NavParams } from 'ionic-angular';
import { Meeting } from "../../models/meeting";
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { AngularFireAuth } from "angularfire2/auth";
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
  address; 

  constructor(public afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController, angFire: AngularFireDatabase) {

    this.meetings = angFire.list('/Meetings');  
    this.address = { place: '' };
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateMeetingPage');
  }

  confirmMeeting(meeting: Meeting){
      meeting.organizator = this.afAuth.auth.currentUser.email
      this.meetings.push(meeting)
      console.log(this.meetings)

  }

  showAddressModal () {
    let modal = this.modalCtrl.create(AutocompletePage);
    let me = this;
    modal.onDidDismiss(data => {
      this.address.place = data;
    });
    modal.present();
  }


}
