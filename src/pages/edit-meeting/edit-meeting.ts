import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, ModalController, ViewController } from 'ionic-angular';
import { AngularFireDatabase } from "angularfire2/database";
import { AutocompletePage } from "../autocomplete/autocomplete";
import { Calendar } from "@ionic-native/calendar";

/**
 * Generated class for the EditMeetingPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-meeting',
  templateUrl: 'edit-meeting.html',
})
export class EditMeetingPage {
  oldMeeting = {}
  meeting = {};
  id;

  constructor(public navCtrl: NavController, public params: NavParams, public angFire: AngularFireDatabase, public viewCtrl: ViewController,
     public alertCtrl: AlertController, private toast: ToastController, public modalCtrl: ModalController, private calendar: Calendar) {
    this.meeting = params.get('meeting')
    this.oldMeeting = Object.assign({}, params.get('meeting'))
    this.calendar.createCalendar('MyCalendar').then(
      (msg) => { console.log(msg); },
      (err) => { console.log(err); }
    );
    
    this.id = params.get('id')
  }

  update(){
    try{
    var missing= [];
    var required = ['topic', 'description', 'starts', 'ends', 'address']
    var flag = true;
    

    for(let i of required){
      if(!this.meeting[i]){
        missing.push(i)
      }
    }

    if(missing.length > 0){
      
        flag = false;
        var textMesage = 'Some required fields not set, please fill fields: '

        for(let i of missing){
          textMesage += (i + ', ')
        }

        let confirm = this.alertCtrl.create({
          title: 'Error updating meeting',
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

    if(Date.parse(this.meeting['starts']) > Date.parse(this.meeting['ends'])){
      flag = false;
    let confirm = this.alertCtrl.create({
      title: 'Error updating meeting',
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
      this.angFire.database.ref('/Meetings/' + this.id ).update(this.meeting)
        this.toast.create({
          message: `Meeting ${this.meeting['topic']}, updated successfully!!!`,
          duration: 3000 
        }).present();
        
        this.calendar.modifyEvent(this.oldMeeting['topic'], this.oldMeeting['address'], this.oldMeeting['description'], new Date(this.oldMeeting['starts']), new Date(this.oldMeeting['ends']),
        this.meeting['topic'], this.meeting['address'], this.meeting['description'], new Date(this.meeting['starts']), new Date(this.meeting['ends']))

        this.dismiss(); 
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditMeetingPage');
  }

  showAddressModal () {
    let modal = this.modalCtrl.create(AutocompletePage);
    modal.onDidDismiss(data => {
      this.meeting['address'] = data;
    });
    modal.present();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
