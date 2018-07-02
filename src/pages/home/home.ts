import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NivelesPage } from '../niveles/niveles';


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

  graficar(){

  }

}
