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
  eneable_alllevel:boolean = false;
  eneable_preescolar:boolean = false;
  eneable_preparatoria:boolean = false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams

  ) {

    this.nivel = this.navParams.get('data');

    if( this.nivel == 'Preescolar'){
      this.eneable_preescolar = true;
    }

    else if ( this.nivel == 'Primaria' ){
      this.eneable_alllevel = true;
    }

    else if ( this.nivel == 'Secundaria' ){
      this.eneable_alllevel = true;
    }

    else if ( this.nivel == 'Preparatoria' ){
      this.eneable_alllevel = true;
      this.eneable_preparatoria = true;
    }

  }

  ionViewDidLoad() {

  }

  cambiopreescolar(){
    if ( this.nivel_preescolar == 'preescolar1'){
      this.nivel = 'Preescolar1';
    }
    else if ( this.nivel_preescolar == 'preescolar2'){
      this.nivel = 'Preescolar2';
    }
  }

  linkimc(){
    this.navCtrl.push( ImcPage , {data:this.nivel});
  }

  linkperimetro(){
    this.navCtrl.push( PerimetroPage , {data:this.nivel});
  }

  linkcintura(){
    this.navCtrl.push( CinturaPage , {data:this.nivel});
  }

  linkamb(){
    this.navCtrl.push( AmbPage , {data:this.nivel});
  }

  linkccadera(){
    this.navCtrl.push( CcaderaPage , {data:this.nivel});
  }

  linkmasa(){
    this.navCtrl.push( MasaPage , {data:this.nivel});
  }

  linksomatotipo(){
    this.navCtrl.push( SomatotipoPage , {data:this.nivel});
  }


}
