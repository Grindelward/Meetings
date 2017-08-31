import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { AngularFireAuth } from "angularfire2/auth";
import { MeetingDetailsPage } from "../meeting-details/meeting-details";
import { EditMeetingPage } from "../edit-meeting/edit-meeting";
import { Calendar } from "@ionic-native/calendar";
import { Meeting } from "../../models/meeting";
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

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public angFire: AngularFireDatabase,
              public afAuth: AngularFireAuth,
              public modalCtrl: ModalController,
              public alertCtrl: AlertController,
              private calendar: Calendar) 
  {
    this.currentUser = this.afAuth.auth.currentUser.displayName;
    
    this.myMeetings = angFire.list('/Meetings', {
      query: {
        orderByChild: 'organizator',
        equalTo: this.afAuth.auth.currentUser.email
      }
    })

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

  }

  changeConfirmStatus(meeting: Meeting, uid, status){
    try{
      this.angFire.database.ref('/Meetings/' + uid + '/members/' + this.currentUser ).set(status)

      if(!status){
       this.calendar.createEvent(meeting.topic, meeting.address, meeting.description, new Date(meeting.starts), new Date(meeting.ends))      
      }else{
        this.calendar.deleteEvent(meeting.topic, meeting.address, meeting.description, new Date(meeting.starts), new Date(meeting.ends))      
      }
    }catch(e){
      this.alertCtrl.create({
        title: 'Error!!!',
        message: e.message,
        buttons: [
          {
            text: 'Close',
            handler: () => {
              console.log('Close clicked');
              
            }
          }
        ]
      }).present();
      console.log(e);
    }
    
  }

  openModal(meeting) {
    try{
      let modal = this.modalCtrl.create(MeetingDetailsPage,  { meeting: meeting });
      modal.present();
    }catch(e){
      this.alertCtrl.create({
        title: 'Error!!!',
        message: e.message,
        buttons: [
          {
            text: 'Close',
            handler: () => {
              console.log('Close clicked');
              
            }
          }
        ]
      }).present();
      console.log(e);
    }
    
  }

  editModal(meeting, id){
    try{
      let modal = this.modalCtrl.create(EditMeetingPage,  { meeting: meeting, id: id });
      modal.present();
    }catch(e){
      this.alertCtrl.create({
        title: 'Error!!!',
        message: e.message,
        buttons: [
          {
            text: 'Close',
            handler: () => {
              console.log('Close clicked');
              
            }
          }
        ]
      }).present();
      console.log(e);
    }
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListMeetingsPage');
  }

  deleteMeeting(uid, meeting) {
    let confirm = this.alertCtrl.create({
      title: 'Delete this meeting?',
      message: 'Are you sure to delete this meeting, this action cannot be reversed',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Cancel clicked');
            
          }
        },
        {
          text: 'Delete',
          handler: () => {
            try{
            console.log('Agree clicked');
            this.calendar.deleteEvent(meeting['topic'], meeting['address'], meeting['description'], new Date(meeting['starts']), new Date(meeting['ends']))
            this.angFire.database.ref('/Meetings/' + uid ).remove()
          }catch(e){
            this.alertCtrl.create({
              title: 'Error!!!',
              message: e.message,
              buttons: [
                {
                  text: 'Close',
                  handler: () => {
                    console.log('Close clicked');
                    
                  }
                }
              ]
            }).present();
            console.log(e);
          }
          }
        }
      ]
    });
    confirm.present();
  }

}
