import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OlvidastecontPage } from '../olvidastecont/olvidastecont';
import { NivelesPage } from '../niveles/niveles';

/**
 * Generated class for the IniciosePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-iniciose',
  templateUrl: 'iniciose.html',
})
export class IniciosePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IniciosePage');
  }

  linkolvidastecont(){
    this.navCtrl.push(OlvidastecontPage);
  }

  linkniveles(){
    this.navCtrl.push(NivelesPage);
  }


}
