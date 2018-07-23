import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NivelesPage } from '../niveles/niveles';
import { OlvidastecontPage } from '../olvidastecont/olvidastecont';
import { RegistroPage } from '../registro/registro';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {
    this.graficar();
  }

  linkniveles(){
    this.navCtrl.push(NivelesPage);
  }

  linkolvidastecont(){
    this.navCtrl.push(OlvidastecontPage);
  }

  linkregistro(){
    this.navCtrl.push(RegistroPage);
  }

  graficar(){

  }

}
