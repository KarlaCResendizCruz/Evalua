import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-viga-equilibrio',
  templateUrl: 'viga-equilibrio.html',
})
export class VigaEquilibrioPage {

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
      this.resultado = "Sigamos jugando.";
    }
    else if (this.rubrica == "2" ){
      this.resultado = "Corramos y juguemos.";
    }
    else if (this.rubrica == "3" ){
      this.resultado = "Casi eres un gimnasta.";
    }

        
    var resultados = {
      nivel: this.nivel,
      titulo: 'Evaluación: Caminando por la viga de equilibrio',
      evaluacion: this.resultado,
      img:'viga_equilibrio/viga-equilibrio.png',
      recomendacion: 'Evaluar cada 4 semanas.',
    };

    var modalPage = this.modalCtrl.create('ResultadosPage', { data: resultados } ); 
    modalPage.present(); 

    this.rubrica = "1";

  }


  protocolo(){

    var slider = [
      {
        titulo: "Evaluación: Caminando por la viga de equilibrio",
        texto: "<strong>Material:</strong><br><strong>a) </strong>Suelo plano y liso.<br><strong>b) </strong>Una viga de 5cm de ancho, de 5m (dos piezas), de 5cm de alto.",
        imagen: "assets/imgs/viga_equilibrio/viga-equilibrio.png",
      },
      {
        titulo: "",
        texto: "<strong>Recomendaciones:</strong><br><br>Solicite al alumno usar ropa cómoda.",
        imagen: "assets/imgs/sprotocolo/aplicacion.png",
      },
      {
        titulo: "",
        texto: "<strong>Procedimiento:</strong><br> El alumno caminará de ida y vuelta, en una viga de piso. De por lo menos 3m.",
        imagen: "assets/imgs/sprotocolo/determinacion.png",
      },
      {
        titulo: "",
        texto: '<strong>Observaciones Pedagógicas:</strong><br>Se sugiere observar de frente al alumno, contabilizar los desequilibrios realizados por el alumno.',
        imagen: "assets/imgs/sprotocolo/book.png",
      },
    ];

    var modalPage = this.modalCtrl.create('SprotocoloPage', { data: slider } ); 
    modalPage.present(); 
  }


}
