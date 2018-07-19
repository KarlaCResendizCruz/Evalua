import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-avioncito',
  templateUrl: 'avioncito.html',
})
export class AvioncitoPage {

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
      this.resultado = "A bailar";
    }
    else if (this.rubrica == "2" ){
      this.resultado = "Sigamos jugando";
    }
    else if (this.rubrica == "3" ){
      this.resultado = "Excelente";
    }

        
    var resultados = {
      nivel: this.nivel,
      titulo: 'Evaluación: Juguemos al avioncito',
      evaluacion: this.resultado,
      img:'avioncito/avioncito.png',
      recomendacion: 'Evaluar cada 4 semanas.',
    };

    var modalPage = this.modalCtrl.create('ResultadosPage', { data: resultados } ); 
    modalPage.present(); 

    this.rubrica = "1";

  }


  protocolo(){

    var slider = [
      {
        titulo: "Evaluación: Juguemos al avioncito",
        texto: "<strong>Material:</strong><br><strong>a) </strong>Suelo plano y liso.<br><strong>b) </strong>Tiza para pintar o lona impresa.<br>Sugerimos la impresión de una lona, pero se puede realizar si esta dibujado en el patio escolar (recuerda que por lo menos los cuadros deben de ser de 20cmx40cm).",
        imagen: "assets/imgs/avioncito/avioncito.png",
      },
      {
        titulo: "",
        texto: "<strong>Recomendaciones:</strong><br><br> Solicite al alumno usar ropa cómoda y trabajar en una superficie plana y no lisa.",
        imagen: "assets/imgs/sprotocolo/aplicacion.png",
      },
      {
        titulo: "",
        texto: "<strong>Procedimiento:</strong><br> El alumno saltará de ida y vuelta por la figura del avioncito. Recordando que cuando es un cuadro se coloca un pie y cuando son dos se separan los pies cayendo en ambos cuadros, tratando no pisar líneas.",
        imagen: "assets/imgs/sprotocolo/determinacion.png",
      },
      {
        titulo: "",
        texto: '<strong>Observaciones Pedagógicas:</strong><br> El alumno puede descalzarse si gusta. El mantener el reto es importante en esta prueba.',
        imagen: "assets/imgs/sprotocolo/book.png",
      },
    ];

    var modalPage = this.modalCtrl.create('SprotocoloPage', { data: slider } ); 
    modalPage.present(); 
  }


}
