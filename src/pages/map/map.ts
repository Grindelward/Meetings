import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {
 GoogleMaps,
 GoogleMap
} from '@ionic-native/google-maps';

/**
 * Generated class for the MapPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public googleMaps: GoogleMaps) {
  }

ngAfterViewInit(){
  this.loadMap();
}


loadMap() {
 let element = document.getElementById('map');
 let map: GoogleMap = this.googleMaps.create(element, {});
 }


  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
    this.loadMap();
  }

}
