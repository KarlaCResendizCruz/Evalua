import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SaltoHorizontalPage } from '../salto-horizontal/salto-horizontal';
import { VelocidadAgilidadPage } from '../velocidad-agilidad/velocidad-agilidad';
import { FlexionTroncoPage } from '../flexion-tronco/flexion-tronco';
import { CourseNavettePage } from '../course-navette/course-navette';

@IonicPage()
@Component({
  selector: 'page-condicionantes',
  templateUrl: 'condicionantes.html',
})
export class CondicionantesPage {

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

  linksalto(){
    this.navCtrl.push( SaltoHorizontalPage, {data:this.nivel});
  }

  linkvelocidad(){
    this.navCtrl.push( VelocidadAgilidadPage, {data:this.nivel});
  }

  linkflexion(){
    this.navCtrl.push( FlexionTroncoPage, {data:this.nivel});
  }

  linkcourse(){
    this.navCtrl.push( CourseNavettePage, {data:this.nivel});
  }
  
}
