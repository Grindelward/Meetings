import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SQLite, SQLiteObject} from '@ionic-native/sqlite'

/**
 * Generated class for the MeetingsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-meetings',
  templateUrl: 'meetings.html',
})
export class MeetingsPage {
  meetings: Array<{id: any, name: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private sqlite: SQLite) {

    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        db.executeSql('create table if not exists meetings (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, date DATE)', {})
          .then(() => console.log('Executed SQL'))
          .catch(e => console.log(e));
          db.executeSql('insert into meetings (name) VALUES ("TEST")', {})
            .then(() => console.log('Executed SQL'))
            .catch(e => console.log(e));
      })
      .catch(e => console.log(e));



  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MeetingsPage');
  }

  refresh(){

    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
            db.executeSql('select * from meetings', {})
            .then((data) => {
          this.meetings = [];
          if(data.rows.length > 0) {
              for(var i = 0; i < data.rows.length; i++) {
                  this.meetings.push({name: data.rows.item(i).name, id: data.rows.item(i).id});
              }
          }
      }, (error) => {
          console.log("ERROR: " + JSON.stringify(error));
      });

            })
  };

}
