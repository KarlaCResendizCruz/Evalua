import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CrecimientoPage } from '../crecimiento/crecimiento';
import { AntropometriaPage } from '../antropometria/antropometria';



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

    this.navCtrl.push(CrecimientoPage, {data:this.nivel});
  }

  linkantropometria(){
   
    this.navCtrl.push(AntropometriaPage, {data:this.nivel});
  }

}
