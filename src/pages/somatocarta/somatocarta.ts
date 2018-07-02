import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

declare var google;

@IonicPage()
@Component({
  selector: 'page-somatocarta',
  templateUrl: 'somatocarta.html',
})
export class SomatocartaPage {
  
  somatocarta:any; 
  
  constructor( 
    public navCtrl: NavController, 
    public navParams: NavParams,
    private view: ViewController,
  ) {
    
    this.somatocarta = this.navParams.get("data");
   
    
  }


  closeModal(){
    this.view.dismiss();
  }

  graficar() {
    
    var data = google.visualization.arrayToDataTable([
      ['ID', 'Life Expectancy', 'Fertility Rate', 'Region',     'Population'],
      ['CAN',    8,              8,      'North America',  0],
      ['DEU',    7,              7,      'Europe',         0],
      ['EGY',    6,              6,      'Middle East',    0],
      ['CAN',    5,              5,      'North America',  0],
      ['DEU',    4,              4,      'Europe',         0],
      ['EGY',    3,              3,      'Middle East',    0],
      ['CAN',    2,              2,      'North America',  0],
      ['DEU',    1,              1,      'Europe',         1],
      ['EGY',    0,              0,      'Middle East',    0],
      ['CAN',    -1,             -1,      'North America',  0],
      ['DEU',    -2,             -2,      'Europe',         0],
      ['EGY',    -3,             -3,      'Middle East',    0],
      ['CAN',    -4,             -4,      'North America',  0],
      ['DEU',    -5,             -5,      'Europe',         0],
      ['EGY',    -6,             -6,      'Middle East',    0],
      ['EGY',    -7,             -7,      'Middle East',    0],
      ['EGY',    -8,             -8,      'Middle East',    0],
    ]);

    var options = {
      title: 'Somatocarta',
      //hAxis: {title: 'Life Expectancy'},
      //vAxis: {title: 'Fertility Rate'},
      bubble: {textStyle: {fontSize: 11}}
    };

    var chart = new google.visualization.BubbleChart(document.getElementById('series_chart_div'));
    chart.draw(data, options);

  }

  ionViewDidLoad() {
    console.log(this.somatocarta);
  }



  

}
