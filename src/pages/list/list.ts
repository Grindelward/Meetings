import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Contacts, Contact } from '@ionic-native/contacts';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  selectedItem: any;
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;
  contactsfound: Array<Contact>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private contacts: Contacts) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
    this.contactsfound = [];

    // Let's populate this page with some filler content for funzies
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];

    this.items = [];
    for (let i = 1; i < 11; i++) {
      this.items.push({
        title: 'Item ' + i,
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }
  }

  findfn(val) {
     this.contacts.find(['*'], {filter: val}).then((contacts) => {
         this.contactsfound = contacts;
        // alert(JSON.stringify(contacts[0]));
     })

 }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(ListPage, {
      item: item
    });
  }
}
