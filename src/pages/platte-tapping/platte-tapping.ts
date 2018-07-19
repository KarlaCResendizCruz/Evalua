import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-platte-tapping',
  templateUrl: 'platte-tapping.html',
})
export class PlatteTappingPage {

  data = '';
  nivel:any;
  rubrica:string ="1";
  resultado:string = "";

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl: ModalController,
  ) {
    this.nivel = this.navParams.get('data');
  }

  ionViewDidLoad() {

  }

  calificar_rubrica(){

    if (this.rubrica == "1" ){
      this.resultado = "Muy bien";
    }
    else if (this.rubrica == "2" ){
      this.resultado = "¡Qué bárbaro!";
    }

        
    var resultados = {
      nivel: this.nivel,
      titulo: 'Evaluación: Platte-Tapping',
      evaluacion: this.resultado,
      img:'platte_tapping/platte-tapping.png',
      recomendacion: 'Evaluar cada 4 semanas.',
    };

    var modalPage = this.modalCtrl.create('ResultadosPage', { data: resultados } ); 
    modalPage.present(); 

    this.rubrica = "1";

  }


  protocolo(){

    var slider = [
      {
        titulo: "Evaluación: Platte-Tapping",
        texto: "<strong>Material:</strong><br>.",
        imagen: "assets/imgs/platte_tapping/platte-tapping2.png",
      },
      {
        titulo: "",
        texto: "<strong>Recomendaciones:</strong><br><br> Solicite al alumno usar ropa cómoda y estar parado en una superficie plana.",
        imagen: "assets/imgs/sprotocolo/aplicacion.png",
      },
      {
        titulo: "",
        texto: "<strong>Procedimiento:</strong><br> El alumno se situará de pie frente a la mesa con los pies ligeramente separados. La mesa quedara a una altura ligeramente debajo del ombligo. Colocar la mano no dominante en el rectángulo central y la otra sobre el círculo.",
        imagen: "assets/imgs/platte_tapping/platte-tapping2.png",
      },
      {
        titulo: "",
        texto: "La prueba consiste en tocar alternativamente los 2 círculos en total de 25 veces cada uno, con la mano dominante tan deprisa como se pueda, pero manteniendo la mano dominante parada y en contacto permanente con el rectángulo.",
        imagen: "assets/imgs/platte_tapping/platte-tapping3.png",
      },
      {
        titulo: "",
        texto: "Se detendrá el cronometro en el contacto número 50.",
        imagen: "assets/imgs/platte_tapping/platte-tapping4.png",
      },
      {
        titulo: "",
        texto: '<strong>Observaciones Pedagógicas:</strong><br> Verifique que el alumno lo haga y toque bien, él que lo realiza puede gritar cuando termina “ya”',
        imagen: "assets/imgs/sprotocolo/book.png",
      },
    ];

    var modalPage = this.modalCtrl.create('SprotocoloPage', { data: slider } ); 
    modalPage.present(); 
  }

}
