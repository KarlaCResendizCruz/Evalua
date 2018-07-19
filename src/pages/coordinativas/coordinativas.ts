import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { VigaEquilibrioPage } from '../viga-equilibrio/viga-equilibrio';
import { AvioncitoPage } from '../avioncito/avioncito';
import { ZigzagPage } from '../zigzag/zigzag';
import { PlatteTappingPage } from '../platte-tapping/platte-tapping';
import { FlamencoPage } from '../flamenco/flamenco';


@IonicPage()
@Component({
  selector: 'page-coordinativas',
  templateUrl: 'coordinativas.html',
})
export class CoordinativasPage {

  data = '';
  nivel:any;

  nivel_preescolar:string = "preescolar1";
  nivel_primaria:string = "primaria1";
  enable_alllevel:boolean = false;
  enable_preescolar:boolean = false;
  enable_primaria:boolean = false;

  constructor(

    public navCtrl: NavController, 
    public navParams: NavParams
  
  ) {

    this.nivel = this.navParams.get('data');

    if( this.nivel == 'Preescolar'){
      this.enable_preescolar = true;
    }

    else if ( this.nivel == 'Primaria' ){
      this.enable_primaria = true;
    }

    else if ( this.nivel == 'Secundaria' || this.nivel == 'Preparatoria' ){
      this.enable_alllevel = true;
    }


  }

  ionViewDidLoad() {
  }


  linkviga(){
    this.navCtrl.push( VigaEquilibrioPage, {data:this.nivel});
  }

  linkavion(){
    this.navCtrl.push( AvioncitoPage, {data:this.nivel});
  }

  linkzigzag(){
    this.navCtrl.push( ZigzagPage, {data:this.nivel});
  }

  linkplatte(){
    this.navCtrl.push( PlatteTappingPage, {data:this.nivel});
  }

  linkflamenco(){
    this.navCtrl.push( FlamencoPage, {data:this.nivel});
  }

}
