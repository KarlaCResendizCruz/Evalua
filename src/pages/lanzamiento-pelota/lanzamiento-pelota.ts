import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-lanzamiento-pelota',
  templateUrl: 'lanzamiento-pelota.html',
})
export class LanzamientoPelotaPage {

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

  calificar_rubrica(){

    if (this.rubrica == "1" ){
      this.resultado = "A jugar quemados.";
    }
    else if (this.rubrica == "2" ){
      this.resultado = "Un juego de futbis.";
    }
    else if (this.rubrica == "3" ){
      this.resultado = "Juguemos atrapadas, con diversos balones.";
    }
    else if (this.rubrica == "4" ){
      this.resultado = "Aprender más deportes de tiro, como beisbol, handball.";
    }

        
    var resultados = {
      nivel: this.nivel,
      titulo: 'Evaluación: Lanzamiento de pelota',
      evaluacion: this.resultado,
      img:'lpelota1.png',
      recomendacion: 'Evaluar cada 4 semanas.',
    };

    var modalPage = this.modalCtrl.create('ResultadosPage', { data: resultados } ); 
    modalPage.present(); 

    this.rubrica = "1";

  }



  protocolo(){
 
    var slider = [
      {
        titulo: "Evaluación: Lanzamiento de Pelota",
        texto: "<strong>Material:</strong><br><ul><li>Superficie llana y lisa que no resbale.</li><li>Pelota de esponja o de tenis.</li></ul> ",
        imagen: "assets/imgs/lanzamiento_pelota/lanzamiento1.png",
      },
      {
        titulo: "",
        texto: "<strong>Recomendaciones:</strong><br><br>Solicite el alumno usar ropa cómoda y realizar la prueba en un lugar seguro.",
        imagen: "assets/imgs/sprotocolo/aplicacion.png",
      },
      {
        titulo: "",
        texto: "<strong>Procedimiento:</strong><br><br>Solicite al alumno que lance la pelota lo más lejos posible, de preferencia hacia un muro.",
        imagen: "assets/imgs/sprotocolo/determinacion.png",
      },
      {
        titulo: "",
        texto: "<strong>Nota:</strong>Considere colocar a un alumno a recoger las pelotas, de preferencia se hallé una pared enfrente del que lanza. Con el propósito de no se preocupe de ir por la pelota y no realice oro movimiento más que el lanzar.",
        imagen: "assets/imgs/sprotocolo/determinacion.png",
      },
      {
        titulo: "",
        texto: "<strong>Observe a su alumno</strong>",
        imagen: "assets/imgs/lanzamiento_pelota/lanzamiento1.png",
      },
      {
        titulo: "",
        texto: "<strong>Observe a su alumno</strong>",
        imagen: "assets/imgs/lanzamiento_pelota/lanzamiento2.png",
      },
      {
        titulo: "",
        texto: '<strong>Observaciones Pedagógicas:</strong><br>El alumno debe de realizar un lanzamiento, lo más parecido al lanzamiento del pitcher de beisbol.',
        imagen: "assets/imgs/sprotocolo/book.png",
      },
    ];

    var modalPage = this.modalCtrl.create('SprotocoloPage', { data: slider } ); 
    modalPage.present(); 
  }

  ionViewDidLoad() {
    
  }

}
