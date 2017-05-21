import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateMeetingPage } from './create-meeting';

@NgModule({
  declarations: [
    CreateMeetingPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateMeetingPage),
  ],
  exports: [
    CreateMeetingPage
  ]
})
export class CreateMeetingPageModule {}
