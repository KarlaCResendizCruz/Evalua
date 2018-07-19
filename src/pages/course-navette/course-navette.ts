import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-course-navette',
  templateUrl: 'course-navette.html',
})
export class CourseNavettePage {

  constructor(
    public navCtrl: NavController,
     public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CourseNavettePage');
  }

}
