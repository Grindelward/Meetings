import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { User } from "../../models/user";
import { AngularFireAuth } from "angularfire2/auth";

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {} as User;

  constructor(private afAuth: AngularFireAuth,
    public navCtrl: NavController, public navParams: NavParams, private toast: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  async login(user: User){
    try{

      this.afAuth.auth.signInWithEmailAndPassword(this.user.email, this.user.password)
      .then(o => {
        this.navCtrl.setRoot('HomePage');
      })
      .catch(err => {
        this.toast.create({
          message: `${err}`,
          duration: 3000 
        }).present();
      });

    }
    catch(e){
      console.error(e);
    }
    
  }
  
  register(){
    this.navCtrl.push('RegisterPage');
    console.log(' LoginPage register button');
  }

}
