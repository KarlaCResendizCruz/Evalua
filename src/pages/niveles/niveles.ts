import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PreescolarPage } from '../preescolar/preescolar';
import { PrimariaPage } from '../primaria/primaria';
import { SecundariaPage } from '../secundaria/secundaria';
import { PreparatoriaPage } from '../preparatoria/preparatoria';

/** 
 * Generated class for the NivelesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-niveles',
  templateUrl: 'niveles.html',
})
export class NivelesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NivelesPage');
  }

  linkpreescolar(){
    this.navCtrl.push(PreescolarPage);
  }

  linkprimaria(){
    this.navCtrl.push(PrimariaPage);
  }

  linksecundaria(){
    this.navCtrl.push(SecundariaPage);
  }

  linkpreparatoria(){
    this.navCtrl.push(PreparatoriaPage);
  }

}
