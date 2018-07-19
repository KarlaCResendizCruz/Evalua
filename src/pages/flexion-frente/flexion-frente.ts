import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-flexion-frente',
  templateUrl: 'flexion-frente.html',
})
export class FlexionFrentePage {

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
      this.resultado = "Hagamos un poco más de fuerza.";
    }
    else if (this.rubrica == "2" ){
      this.resultado = "¡Tú puedes!, juguemos a los encantados.";
    }
    else if (this.rubrica == "3" ){
      this.resultado = "¡Qué control!.";
    }

    var resultados = {
      nivel: this.nivel,
      titulo: 'Evaluación: Flexión de tronco al frente cruzada de manos a pies',
      evaluacion: this.resultado,
      img:'flexion.png',
      recomendacion: 'Evaluar cada 4 semanas.',
    };

    var modalPage = this.modalCtrl.create('ResultadosPage', { data: resultados } ); 
    modalPage.present(); 

    this.rubrica = "1";

  }

  protocolo(){
 
    var slider = [
      {
        titulo: "Evaluación: Flexión de tronco al frente cruzada de manos a pies.",
        texto: "<strong>Material:</strong><br> Superficie llana y lisa, no resbalosa.",
        imagen: "assets/imgs/flexion_frente/flexion.png",
      },
      {
        titulo: "",
        texto: "<strong>Recomendaciones:</strong><br><br>El alumno puede estar en short y playera de esa manera se puede observar si no presenta ninguna anomalía en sus piernas.",
        imagen: "assets/imgs/sprotocolo/aplicacion.png",
      },
      {
        titulo: "",
        texto: "<strong>Procedimiento:</strong><br><br>El alumno debe partir de la posición inicial(PI) donde debe encontrarse parado separando piernas, un poco más que el ancho de sus hombros, manos horizontales. El alumno debe realizar una flexión al frente llevando la mano derecha a tocar el pie izquierdo, regresarlo a PI, y repetir ahora con mano izquierda a pie derecho. El alumno debe realizar 16 repeticiones.",
        imagen: "assets/imgs/sprotocolo/determinacion.png",
      },
      {
        titulo: "",
        texto: "<strong>Observe al alumno en sus movimientos</strong>",
        imagen: "assets/imgs/flexion_frente/flexiontronco1.png",
      },
      {
        titulo: "",
        texto: "<strong>Observe al alumno en sus movimientos</strong>",
        imagen: "assets/imgs/flexion_frente/flexiontronco2.png",
      },
      {
        titulo: "",
        texto: '<strong>Observaciones Pedagógicas:</strong><br><br>Profesor, El alumno debe de mantener en todo momento el equilibrio tanto a la flexión como a la recuperación, tal vez 1 error de ajuste puede permitírsele.',
        imagen: "assets/imgs/sprotocolo/determinacion.png",
      },
    ];

    var modalPage = this.modalCtrl.create('SprotocoloPage', { data: slider } ); 
    modalPage.present(); 
  }

  ionViewDidLoad() {

  }

}
