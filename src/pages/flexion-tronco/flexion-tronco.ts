import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-flexion-tronco',
  templateUrl: 'flexion-tronco.html',
})
export class FlexionTroncoPage {

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

    if (this.rubrica == "A" ){
      this.resultado = "¡Sigamos haciendo trabajo de flexibilidad!";
    }
    else if (this.rubrica == "B" ){
      this.resultado = "¡Muy bien, juguemos!";
    }
    else if (this.rubrica == "C" ){
      this.resultado = "¡Será el hombre elástico!";
    }

        
    var resultados = {
      nivel: this.nivel,
      titulo: 'Evaluación: Flexión del tronco con piernas juntas',
      evaluacion: this.resultado,
      img:'flexion_tronco/piernasjuntas.png',
      recomendacion: 'Evaluar cada 4 semanas.',
    };

    var modalPage = this.modalCtrl.create('ResultadosPage', { data: resultados } ); 
    modalPage.present(); 

    this.rubrica = "0";

  }


  protocolo(){

    var slider = [
      {
        titulo: "Evaluación: Flexión del tronco con piernas juntas",
        texto: "<strong>Material:</strong><br><strong>a) </strong>Superficie limpia y no deslizante.<br><strong>b) </strong>Un banco o escalón amplio.",
        imagen: "assets/imgs/flexion_tronco/flexion-tronco-frente.png",
      },
      {
        titulo: "",
        texto: "<strong>Recomendaciones:</strong><br><br> El alumno debe usar ropa cómoda.",
        imagen: "assets/imgs/sprotocolo/aplicacion.png",
      },
      {
        titulo: "",
        texto: "<strong>Procedimiento:</strong><br><br> Solicite al alumno subir al banco y establecer una posición recta con piernas juntas, deberá realizar una flexión profunda al frente de sus manos a la punta de sus pies.",
        imagen: "assets/imgs/flexion_tronco/flexion-tronco-piernasjuntas.png",
      },
      {
        titulo: "",
        texto: '<strong>Observaciones Pedagógicas:</strong><br><br> Realiza una fase previa de calentamiento, la prueba es dolorosa si no se realiza con cuidado, sobre todo a los que no tienen un trabajo adecuado de flexibilidad.',
        imagen: "assets/imgs/sprotocolo/book.png",
      }
    ];

    var modalPage = this.modalCtrl.create('SprotocoloPage', { data: slider } ); 
    modalPage.present(); 
  }

}
