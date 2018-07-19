import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-lanzamiento-precision',
  templateUrl: 'lanzamiento-precision.html',
})
export class LanzamientoPrecisionPage {

  nivel:any; 
  tiros  = '0';
  resultado = "";
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl: ModalController,
  
  ) {
    this.nivel = this.navParams.get('data');
  }


  calificar_rubrica(){

    if ( (this.tiros <= '1') && (this.nivel == 'preescolar1' || this.nivel == 'Preescolar') )
      this.resultado = "Continuaremos trabajando.";
    
    if ( (this.tiros <= '1') && (this.nivel == 'preescolar2') )
         this.resultado = "A jugar indios y vaqueros";
    
    if ( (this.tiros >= '2') && (this.nivel == 'preescolar1' || this.nivel == 'Preescolar') ){
      this.resultado = "Que buen deportista.";
    }
    if ( (this.tiros >= '2') && (this.nivel == 'preescolar2') ){
         this.resultado = "¡Qué bárbaro!";
    }

    var resultados = {
      nivel: this.nivel,
      titulo: 'Evaluación: Lanzamiento de Precisión',
      evaluacion: this.resultado,
      img:'precision/precision.png',
      recomendacion: '',
    };

    var modalPage = this.modalCtrl.create('ResultadosPage', { data: resultados } ); 
    modalPage.present(); 
    this.tiros = "0";
  }

  ionViewDidLoad() {
  }

  protocolo(){
    var procedimeinto;
    if ( this.nivel == "preescolar1" || this.nivel == "Preescolar")
       procedimeinto = "<strong>Procedimiento:</strong><br>El alumno se encontrará parado a una distancia de 2 metros, tomará la pelota de tenis y con una mano la lanzará a un aro que se localizará colgado a una distancia de 2 mt y de un diámetro de 40 cm. a 50cm. <br> Tendrá 3 tiros, si se le facilita el lograrlo deberá de retroceder 0.50m ";
  
    else if ( this.nivel == "preescolar2"){
       procedimeinto = "<strong>Procedimiento:</strong><br>El alumno se encontrará parado a una distancia de 4 mt, tomará la pelota de tenis y con una mano la lanzará a un aro que se localizará colgado de un diámetro de 40 cm. a 50cm.<br> Tendrá 3 tiros, si se le facilita el lograrlo deberá de retroceder 0.50m ";
    }
    var slider = [
      {
        titulo: "Evaluación: Lanzamiento de Precisión",
        texto: "<strong>Material:</strong><br><strong>a) </strong>10 pelotas de tenis.<br><strong>b) </strong>1 aro de 40 a 50 cm de diámetro.<br><strong>c) </strong>Cualquier cinta con pegamento.",
        imagen: "assets/imgs/precision/precision.png",
      },
      {
        titulo: "",
        texto: "<strong>El aro:</strong><br><br>Suspender en algún lugar, puede ser el tablero de la cancha de basquetbol, una cuerda para suspenderlo y otra para fijarlo al piso.",
        imagen: "assets/imgs/sprotocolo/aplicacion.png",
      },
      {
        titulo: "",
        texto: "<strong>Recomendaciones:</strong><br><br>Solicite el alumno usar ropa cómoda y realizar la prueba en un lugar seguro.",
        imagen: "assets/imgs/sprotocolo/aplicacion.png",
      },
      {
        titulo: "",
        texto: procedimeinto,
        imagen: "assets/imgs/sprotocolo/determinacion.png",
      },
      {
        titulo: "",
        texto: "<strong>Observe a su alumno</strong>",
        imagen: "assets/imgs/precision/precision3.png",
      },
      {
        titulo: "",
        texto: '<strong>Observaciones Pedagógicas:</strong><br>Esta prueba, no solo está relacionada con la coordinación del brazo, sino también le permite al niño calcular distancias. Tal vez su forma de lanzar, no sea la adecuada, pero es un proceso de enseñanza.',
        imagen: "assets/imgs/sprotocolo/book.png",
      },
    ];

    var modalPage = this.modalCtrl.create('SprotocoloPage', { data: slider } ); 
    modalPage.present(); 
  }

}
