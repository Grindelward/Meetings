import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the MeetingDetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-meeting-details',
  templateUrl: 'meeting-details.html',
})
export class MeetingDetailsPage {
  meeting;
  membersConfirmed = [];
  membersNonConfirmed = [];

    constructor(
  
      public params: NavParams,
      public viewCtrl: ViewController
    ) {
      
      this.meeting = params.get('meeting')
      
      if(this.meeting.members){
        var keys = Object.keys(this.meeting.members)
        for(var i = 0; i < keys.length; i++ ){
            var k = keys[i]
            if(this.meeting.members[k]){
              this.membersNonConfirmed.push(k)
            }else{
              this.membersConfirmed.push(k)
            }
        }
      }
      

  
    }
  
    dismiss() {
      this.viewCtrl.dismiss();
    }

}
