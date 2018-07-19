import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the SprotocoloPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sprotocolo',
  templateUrl: 'sprotocolo.html',
})
export class SprotocoloPage {

  slides:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private view: ViewController,
  ) {
    this.slides = this.navParams.get("data");
  }

  closeModal(){
    this.view.dismiss();
  }

}
