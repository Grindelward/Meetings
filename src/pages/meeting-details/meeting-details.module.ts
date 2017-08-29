import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MeetingDetailsPage } from './meeting-details';

@NgModule({
  declarations: [
    MeetingDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(MeetingDetailsPage),
  ],
})
export class MeetingDetailsPageModule {}
