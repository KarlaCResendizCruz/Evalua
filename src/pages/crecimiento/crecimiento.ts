import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TallaPage } from '../talla/talla';
import { PesoPage } from '../peso/peso';


@IonicPage()
@Component({
  selector: 'page-crecimiento',
  templateUrl: 'crecimiento.html',
})
export class CrecimientoPage {
  
  data = '';
  nivel:any;
  
  eneable_peso:boolean = true;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams
  ) {

    this.nivel = this.navParams.get('data');

    if( this.nivel == 'Secundaria' || this.nivel == 'Preparatoria'){
      this.eneable_peso = false;
    }

  }

  ionViewDidLoad() {
    
  }

  linktalla(){
    this.navCtrl.push(TallaPage, {data:this.nivel});
  }

  linkpeso(){
    this.navCtrl.push(PesoPage, {data:this.nivel});
  }

}
