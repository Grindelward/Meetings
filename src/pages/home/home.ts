import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { AngularFireAuth } from "angularfire2/auth";


/**
 * Generated class for the HomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  books: FirebaseListObservable<any[]>;

  constructor(private afAuth: AngularFireAuth, private toast: ToastController,
    public navCtrl: NavController, public navParams: NavParams, angFire: AngularFireDatabase) {
    
    this.books = angFire.list('/Books');   
  }
  
  ionViewWillLoad() {
    this.afAuth.authState.subscribe(data => {
      if(data && data.email && data.uid){
        this.toast.create({
          message: `Welcome ${data.email}`,
          duration: 3000 
        }).present();
      }
      else{
        this.toast.create({
          message: `Not auth`,
          duration: 3000 
        }).present();
      }
    });
  
  }

  logout(){
    this.afAuth.auth.signOut()
    this.navCtrl.push('LoginPage')
  }

}
