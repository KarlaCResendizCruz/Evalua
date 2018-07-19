import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-resultados',
  templateUrl: 'resultados.html',
})
export class ResultadosPage {

  resultado:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private view: ViewController, 
    public loadingCtrl: LoadingController   

  ) {

    this.resultado = this.navParams.get("data");
    this.presentLoading();
  }

  ionViewDidLoad() {

  }

  presentLoading() {
    const loader = this.loadingCtrl.create({
      content: "Por favor espere...",
      duration: 8
    });
    loader.present();
  }

  closeModal(){
    this.view.dismiss();
  }
  
}
