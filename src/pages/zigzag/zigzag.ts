import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-zigzag',
  templateUrl: 'zigzag.html',
})
export class ZigzagPage {

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
      titulo: 'Evaluación: Carrera de Zig-Zag',
      evaluacion: this.resultado,
      img:'zigzag/zigzag1.png',
      recomendacion: 'Evaluar cada 4 semanas.',
    };

    var modalPage = this.modalCtrl.create('ResultadosPage', { data: resultados } ); 
    modalPage.present(); 

    this.rubrica = "1";

  }


  protocolo(){

    var slider = [
      {
        titulo: "Evaluación: Carrera de zig-zag",
        texto: "<strong>Material:</strong><br><strong>a) </strong>Seis postes, que no se caigan (sean seguros).",
        imagen: "assets/imgs/zigzag/zigzag.png",
      },
      {
        titulo: "",
        texto: "<strong>Recomendaciones:</strong><br><br> Solicite al alumno usar ropa cómoda y trabajar en una superficie plana y no lisa.",
        imagen: "assets/imgs/sprotocolo/aplicacion.png",
      },
      {
        titulo: "",
        texto: "<strong>Procedimiento:</strong><br> El alumno se colocará en posición de salida alta detrás de la línea de partida, colocada en el suelo. A partir de la línea de salida existirá un pasillo de 2 m de anchura y de 8 m de largo, donde estarán colocados seis postes (de forma asimétrica) cada 2 m.",
        imagen: "assets/imgs/zigzag/zigzag1.png",
      },
      {
        titulo: "",
        texto: "A la señal del controlador, el ejecutante deberá realizar un recorrido de ida y vuelta sobre el pasillo, sorteando en zigzag los postes.<br>Se cronometrará el tiempo marcado por el ejecutante en realizar el recorrido de ida y vuelta completo.",
        imagen: "assets/imgs/zigzag/zigzag2.png",
      },
      {
        titulo: "",
        texto: "El examinando no debe detenerse en la línea de llegada sino continuar varios metros más. Se sugiere colocar unos conos a 2m para señalar la salida. Se valorará el mejor tiempo de dos intentos. ",
        imagen: "assets/imgs/zigzag/zigzag3.png",
      },
      {
        titulo: "",
        texto: '<strong>Observaciones Pedagógicas:</strong><br> Se realizaran 3 intentos, anotándose el mejor de ellos.Recomendar al alumno que no tire los postes pero a la vez los pase de la forma más rápida.',
        imagen: "assets/imgs/sprotocolo/book.png",
      },
    ];

    var modalPage = this.modalCtrl.create('SprotocoloPage', { data: slider } ); 
    modalPage.present(); 
  }


}
