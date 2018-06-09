import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CrecimientoPage } from '../crecimiento/crecimiento';
import { AntropometriaPage } from '../antropometria/antropometria';
import { HabilidadesbasicasPage } from '../habilidadesbasicas/habilidadesbasicas';
import { HabilidadescoordinativasPage } from '../habilidadescoordinativas/habilidadescoordinativas';
import { HabilidadescoondicionantesPage } from '../habilidadescoondicionantes/habilidadescoondicionantes';


/**
 * Generated class for the SecundariaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-secundaria',
  templateUrl: 'secundaria.html',
})
export class SecundariaPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SecundariaPage');
  }

  linkcrecimiento(){
    this.navCtrl.push(CrecimientoPage);
  }
  linkantropometria(){
    this.navCtrl.push(AntropometriaPage);
  }
  linkhabilidadesbasicas(){
    this.navCtrl.push(HabilidadesbasicasPage);
  }
  linkhabilidadescoordinativas(){
    this.navCtrl.push(HabilidadescoordinativasPage);
  }
  linkhabilidadescoondicionantes(){
    this.navCtrl.push(HabilidadescoondicionantesPage);
  }

}
