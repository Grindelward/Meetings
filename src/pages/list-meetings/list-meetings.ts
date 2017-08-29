import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { AngularFireAuth } from "angularfire2/auth";
import { MeetingDetailsPage } from "../meeting-details/meeting-details";
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
              public alertCtrl: AlertController) 
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

  changeConfirmStatus(uid, status){
    this.angFire.database.ref('/Meetings/' + uid + '/members/' + this.currentUser ).set(status)
      console.log(uid + 'dasfddada: ' + status)

  }

  openModal(meeting) {
    
        let modal = this.modalCtrl.create(MeetingDetailsPage,  { meeting: meeting });
        modal.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListMeetingsPage');
  }

  deleteMeeting(uid) {
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
            console.log('Agree clicked');
            this.angFire.database.ref('/Meetings/' + uid ).remove()
          }
        }
      ]
    });
    confirm.present();
  }

}


// @Component({
//   template: 
//   ` <ion-header>
//   <ion-toolbar>
//     <ion-title>
//       Meeting details
//     </ion-title>
//     <ion-buttons start>
//       <button ion-button (click)="dismiss()">
//         <span ion-text color="primary" showWhen="ios">Cancel</span>
//         <ion-icon name="md-close" showWhen="android, windows"></ion-icon>
//       </button>
//     </ion-buttons>
//   </ion-toolbar>
// </ion-header>
// <ion-content>
//   <ion-list>
//       <ion-item>
//         <h2>{{meeting.organizator}}</h2>
//       </ion-item>
//   </ion-list>
// </ion-content>`
 

// })
// export class ModalContentPage {
//   meeting;

//   constructor(

//     public params: NavParams,
//     public viewCtrl: ViewController
//   ) {
    
//     this.meeting = params.get('meeting')
//     console.log(this.meeting)
//   }

//   dismiss() {
//     this.viewCtrl.dismiss();
//   }
// }
