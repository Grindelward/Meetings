import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListMeetingsPage } from './list-meetings';

@NgModule({
  declarations: [
    ListMeetingsPage,
  ],
  imports: [
    IonicPageModule.forChild(ListMeetingsPage),
  ],
})
export class ListMeetingsPageModule {}
