import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CrecimientoPage } from '../crecimiento/crecimiento';
import { AntropometriaPage } from '../antropometria/antropometria';
import { BasicasPage } from '../basicas/basicas';
import { CoordinativasPage } from '../coordinativas/coordinativas';
import { CondicionantesPage } from '../condicionantes/condicionantes';



@IonicPage()
@Component({
  selector: 'page-evaluaciones',
  templateUrl: 'evaluaciones.html',
})



export class EvaluacionesPage {

  data = '';
  nivel:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    
  ) {
    this.nivel = this.navParams.get('nivel');
  }

  ionViewDidLoad() {
   
  }

  linkcrecimiento(){
    this.navCtrl.push( CrecimientoPage, {data:this.nivel});
  }

  linkantropometria(){
    this.navCtrl.push( AntropometriaPage, {data:this.nivel});
  }

  linkbasicas(){
    this.navCtrl.push( BasicasPage, {data:this.nivel});
  }

  linkcoordinativas(){
    this.navCtrl.push( CoordinativasPage, {data:this.nivel});
  }

  linkcondicionantes(){
    this.navCtrl.push( CondicionantesPage, {data:this.nivel});
  }

}
