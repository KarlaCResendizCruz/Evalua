import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-salto-horizontal',
  templateUrl: 'salto-horizontal.html',
})
export class SaltoHorizontalPage {

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
      this.resultado = "¡Continuemos jugando!";
    }
    else if (this.rubrica == "2" ){
      this.resultado = "¡Eres muy fuerte!";
    }
    else if (this.rubrica == "3" ){
      this.resultado = "¡Que bárbaro eres todo un canguro!";
    }

        
    var resultados = {
      nivel: this.nivel,
      titulo: 'Evaluación: Salto Horizontal',
      evaluacion: this.resultado,
      img:'salto_horizontal/salto.png',
      recomendacion: 'Evaluar cada 4 semanas.',
    };

    var modalPage = this.modalCtrl.create('ResultadosPage', { data: resultados } ); 
    modalPage.present(); 

    this.rubrica = "0";

  }


  protocolo(){

    var slider = [
      {
        titulo: "Evaluación: Salto Horizontal",
        texto: "<strong>Material:</strong><br><strong>a) </strong>Flexometro o regla.<br><strong>b) </strong>Cinta masquintape.<br><strong>c) </strong>Suelo llano y liso antiderrapante.",
        imagen: "assets/imgs/salto_horizontal/salto-inicio.png",
      },
      {
        titulo: "",
        texto: "<strong>Recomendaciones:</strong><br><br> El alumno debe usar ropa cómoda.",
        imagen: "assets/imgs/sprotocolo/aplicacion.png",
      },
      {
        titulo: "",
        texto: "<strong>Procedimiento:</strong><br><br> El alumno debe situarse con los pies ligeramente separados y a la misma línea de partida, con la ayuda del impulso de los brazos se ejecutará un salto hacia adelante sin salto ni carrera previa.",
        imagen: "assets/imgs/salto_horizontal/salto.png",
      },
      {
        titulo: "",
        texto: "Se debe impulsar con ambos pies a la vez y no pisar la línea de salida. La medición se efectuara desde la línea de impulso hasta la huella más cercana dejada tras el salto por cualquier parte del cuerpo.",
        imagen: "assets/imgs/salto_horizontal/salto-medio.png",
      },
      {
        titulo: "",
        texto: "El alumno no debe detenerse en la línea de llegada sino continuar varios metros más. Se sugiere colocar unos conos a 2m para señalar la salida. Se valorará el mejor tiempo de dos intentos.",
        imagen: "assets/imgs/salto_horizontal/salto-final.png",
      },
      {
        titulo: "",
        texto: '<strong>Observaciones Pedagógicas:</strong><br><br> Se realizaran 3 intentos, anotándose el mejor de ellos. Recomendar que no se deje caer el alumno.',
        imagen: "assets/imgs/sprotocolo/book.png",
      }
    ];

    var modalPage = this.modalCtrl.create('SprotocoloPage', { data: slider } ); 
    modalPage.present(); 
  }

}
