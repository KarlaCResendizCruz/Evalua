import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EvaluacionesPage } from '../evaluaciones/evaluaciones';

@IonicPage()
@Component({
  selector: 'page-niveles',
  templateUrl: 'niveles.html',
})
export class NivelesPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams
  ) {
  }

  ionViewDidLoad() {
  
  }

  linkevaluaciones(level){

    let data = {
       nivel: level,
    };

    this.navCtrl.push(EvaluacionesPage, data);
  }

}
