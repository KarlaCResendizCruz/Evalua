import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RegistroPage } from '../registro/registro';
import { IniciosePage } from '../iniciose/iniciose';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
}) 
export class HomePage {

  splash = true;
  tabBarElement: any;

  constructor(public navCtrl: NavController) {
    this.tabBarElement = document.querySelector('.tabbar');

  }

  ionViewDidLoad() {
    this.tabBarElement.style.display = 'none';
    setTimeout(() => {
      this.splash = false;
      this.tabBarElement.style.display = 'flex';
    }, 4000);

  }

  linkregistro(){
    this.navCtrl.push(RegistroPage);
  }

  linkiniciose(){
    this.navCtrl.push(IniciosePage);
  }


}
