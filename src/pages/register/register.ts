import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { User } from "../../models/user";
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { AngularFireAuth } from "angularfire2/auth";

/**
 * Generated class for the RegisterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  user = {} as User;
  users: FirebaseListObservable<any[]>;

  constructor(private afAuth: AngularFireAuth,
    public navCtrl: NavController, public navParams: NavParams, angFire: AngularFireDatabase, private alertCtrl: AlertController) {
      this.users = angFire.list('/Users');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  async register(user: User){
    try{
      this.checkUsername(user)
        const result = await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
        
              if(result){
                result.updateProfile({
                  displayName: user.username,
                })
                this.users.push({email:user.email, username: user.username})
              }

              this.navCtrl.push('LoginPage')
  
      

    }catch(e){
      this.alertCtrl.create({
        title: 'Error creating user',
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

  checkUsername(user){
    if(!user['username'] ){
      throw new Error('Username is mandratory!');
    }

  }

}
