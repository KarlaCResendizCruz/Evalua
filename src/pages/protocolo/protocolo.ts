import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-protocolo',
  templateUrl: 'protocolo.html',
})
export class ProtocoloPage {

  protocolo:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private view: ViewController,
  ) {
    this.protocolo = this.navParams.get("data");
  }

  ionViewDidLoad() {
    
  }

  closeModal(){
    this.view.dismiss();
  }

}
