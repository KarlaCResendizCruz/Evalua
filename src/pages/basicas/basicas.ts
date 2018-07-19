import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CaminarPage } from '../caminar/caminar';
import { FlexionFrentePage } from '../flexion-frente/flexion-frente';
import { RecepcionBalonPage } from '../recepcion-balon/recepcion-balon';
import { SaltoObstaculoPage } from '../salto-obstaculo/salto-obstaculo';
import { LanzamientoPelotaPage } from '../lanzamiento-pelota/lanzamiento-pelota';
import { LanzamientoPrecisionPage } from '../lanzamiento-precision/lanzamiento-precision';

@IonicPage()
@Component({
  selector: 'page-basicas',
  templateUrl: 'basicas.html',
})
export class BasicasPage {

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

  cambiopreescolar(){
    if ( this.nivel_preescolar == 'preescolar1'){
      this.nivel = 'preescolar1';
    }
    else if ( this.nivel_preescolar == 'preescolar2'){
      this.nivel = 'preescolar2';
    }
  }

  ionViewDidLoad() {

  }

  linkcaminar(){
    this.navCtrl.push(CaminarPage, {data:this.nivel});
  }

  linkflexionfrente(){
    this.navCtrl.push(FlexionFrentePage , {data:this.nivel});
  }

  linkrecepcion(){
    this.navCtrl.push(RecepcionBalonPage , {data:this.nivel});
  }


  linkobstaculo(){
    this.navCtrl.push(SaltoObstaculoPage , {data:this.nivel});
  }

  linklpelota(){
    this.navCtrl.push(LanzamientoPelotaPage , {data:this.nivel});
  }

  linkprecision(){
    this.navCtrl.push(LanzamientoPrecisionPage , {data:this.nivel});
  }



}
