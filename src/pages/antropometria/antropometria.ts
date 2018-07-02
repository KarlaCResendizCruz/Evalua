import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ImcPage } from '../imc/imc';
import { PerimetroPage } from '../perimetro/perimetro';
import { CinturaPage } from '../cintura/cintura';
import { AmbPage } from '../amb/amb';
import { CcaderaPage } from '../ccadera/ccadera';
import { MasaPage } from '../masa/masa';
import { SomatotipoPage } from '../somatotipo/somatotipo';

@IonicPage()
@Component({
  selector: 'page-antropometria',
  templateUrl: 'antropometria.html',
})
export class AntropometriaPage {

  data = '';
  nivel:any;

  nivel_preescolar:string = "preescolar1";
  eneable_preescolar:boolean = false;
  eneable_alllevel:boolean = false;
  eneable_preparatoria:boolean = false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams

  ) {

    this.nivel = this.navParams.get('data');

    if( this.nivel == 'Preescolar'){
      this.eneable_preescolar = true;
    }

    else if( this.nivel == 'Primaria' || this.nivel == 'Secundaria' ){
      this.eneable_alllevel = true;
    }

    else if( this.nivel == 'Preparatoria' ){
      this.eneable_alllevel = true;
      this.eneable_preparatoria = true;
    }

  }

  ionViewDidLoad() {
    
  }

  linkimc(){
    this.navCtrl.push(ImcPage);
  }

  linkperimetro(){
    this.navCtrl.push(PerimetroPage);
  }

  linkcintura(){
    this.navCtrl.push(CinturaPage);
  }

  linkamb(){
    this.navCtrl.push(AmbPage);
  }

  linkccadera(){
    this.navCtrl.push(CcaderaPage);
  }

  linkmasa(){
    this.navCtrl.push(MasaPage);
  }

  linksomatotipo(){
    this.navCtrl.push(SomatotipoPage);
  }


}
