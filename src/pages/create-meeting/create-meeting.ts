import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { Meeting } from "../../models/meeting";
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { AngularFireAuth } from "angularfire2/auth";
import { Calendar } from '@ionic-native/calendar';
import { AutocompletePage } from "../autocomplete/autocomplete";
import { ListMeetingsPage } from "../list-meetings/list-meetings";



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
  missing =[];

  constructor(public afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams, public angFire: AngularFireDatabase,
     private calendar: Calendar, public modalCtrl: ModalController, public alertCtrl: AlertController, private toast: ToastController) {
    this.meeting.members = []; // place for members must be defined as array at begins
    this.meeting.organizator = this.afAuth.auth.currentUser.email //organizator is currentUser, needed for validation member list organizator is always member
    this.address = { place: '' };
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
    try{



    this.missing= [];
    var required = ['topic', 'description', 'starts', 'ends', 'address']
    this.meetings = this.angFire.list('/Meetings'); 
    var flag = true;

    //removing checked and unchecked member
    for (let i of Object.keys(meeting.members)) {
      if(!meeting.members[i]){
        delete meeting.members[i]
      }
    }

    for(let i of required){
      if(!meeting[i]){
        this.missing.push(i)
      }
    }
    

    if(this.missing.length > 0){
      
        flag = false;
        var textMesage = 'Some required fields not set, please fill fields: '

        for(let i of this.missing){
          textMesage += (i + ', ')
        }

        let confirm = this.alertCtrl.create({
          title: 'Error creating meeting',
          message: textMesage,
          buttons: [
            {
              text: 'Close',
              handler: () => {
                console.log('Close clicked');
                
              }
            }
          ]
        });
        confirm.present();
        
    }

    if(Date.parse(meeting.starts) > Date.parse(meeting.ends)){
      flag = false;
    let confirm = this.alertCtrl.create({
      title: 'Error creating meeting',
      message: 'Starts date cannot be later than ends',
      buttons: [
        {
          text: 'Close',
          handler: () => {
            console.log('Close clicked');
            
          }
        }
      ]
    });
    confirm.present();
   }

    if (flag){
        this.meetings.push(meeting) // pushing into firebase database
        this.calendar.createEvent(meeting.topic, meeting.address, meeting.description, new Date(meeting.starts), new Date(meeting.ends))
        this.navCtrl.push(ListMeetingsPage);
        this.toast.create({
          message: `Meeting ${meeting.topic}, created successfully!!!`,
          duration: 3000 
        }).present();
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

  showAddressModal () {
    let modal = this.modalCtrl.create(AutocompletePage);
    modal.onDidDismiss(data => {
      this.meeting.address = data;
    });
    modal.present();
  }


}
