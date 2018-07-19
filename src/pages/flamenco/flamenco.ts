import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-flamenco',
  templateUrl: 'flamenco.html',
})
export class FlamencoPage {

  data = '';
  nivel:any;
  rubrica:string ="0";
  resultado:string = "";
  imgresultado:string = "";

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl: ModalController,
  ) {

    this.nivel = this.navParams.get('data');

    if(this.nivel == "Primaria"){
      this.imgresultado = "1";
    }

    else if(this.nivel == "Secundaria"){
      this.imgresultado = "2";
    }

    else if(this.nivel == "Preparatoria"){
      this.imgresultado = "3";
    }

  }

  ionViewDidLoad() {

  }

  calificar_rubrica(){

    if (this.rubrica == "0" ){
      this.resultado = "Muy bien";
    }
    else if (this.rubrica == "1" ){
      this.resultado = "Bien";
    }
    else if (this.rubrica == "2" ){
      this.resultado = "Continúa trabajando";
    }

        
    var resultados = {
      nivel: this.nivel,
      titulo: 'Evaluación: Equilibrio Flamenco',
      evaluacion: this.resultado,
      img:'flamenco/equilibrio-flamenco1.png',
      recomendacion: 'Evaluar cada 4 semanas.',
    };

    var modalPage = this.modalCtrl.create('ResultadosPage', { data: resultados } ); 
    modalPage.present(); 

    this.rubrica = "0";

  }


  protocolo(){

    var slider = [
      {
        titulo: "Evaluación: Equilibrio Flamenco",
        texto: "<strong>Material:</strong><br><strong>a) </strong>Una tabla de madera sin bordes de 3cm de ancho y 10cm de altura.",
        imagen: "assets/imgs/flamenco/equilibrio-flamenco1.png",
      },
      {
        titulo: "",
        texto: "<strong>Recomendaciones:</strong><br><br> Solicite al alumno usar ropa cómoda y estar parado en una superficie plana.",
        imagen: "assets/imgs/sprotocolo/aplicacion.png",
      },
      {
        titulo: "",
        texto: "<strong>Procedimiento:</strong><br> Posicione al alumno de manera erguida, un pie estará en el suelo y el otro apoyado longitudinalmente sobre la viga de 3 cm de ancho. El alumno flexionará la otra pierna hasta tomar la parte posterior del pie con la mano del mismo lado (posición de flamenco).",
        imagen: "assets/imgs/flamenco/equilibrio-flamenco1.png",
      },
      {
        titulo: "",
        texto: "Hasta que empiece la prueba el alumno puede apoyarse sobre su antebrazo para guardar el equilibrio. El test comenzará en el momento en el que suelte su brazo, el alumno deberá tratar de mantener el equilibrio el máximo tiempo posible. ",
        imagen: "assets/imgs/flamenco/equilibrio-flamenco2.png",
      },
      {
        titulo: "",
        texto: "Cada vez que pierda el equilibrio (agarre si antebrazo o suelte la pierna flexionada) se detendrá el cronómetro, y se conectará cuando vuelva a estar en equilibrio; así hasta que transcurra 1 minuto de equilibrio.",
        imagen: "assets/imgs/flamenco/equilibrio-flamenco3.png",
      },
      {
        titulo: "",
        texto: '<strong>Observaciones Pedagógicas:</strong><br> Cerciórese de que el alumno ha comprendido correctamente la ejecución de la prueba, haciendo hincapié en que el test se interrumpe en cada pérdida de equilibrio del sujeto, conectando inmediatamente el cronómetro cada vez que vuelva mantener el equilibrio de una forma continuada hasta un tiempo total de un minuto. ',
        imagen: "assets/imgs/sprotocolo/book.png",
      },
      {
        titulo: "",
        texto: '<strong>Observaciones Pedagógicas:</strong><br><strong>a) </strong>Tras  cada  interrupción,  debe  ayudarse  al  sujeto  a  colocarse  de nuevo en la posición correcta de partida.<br><strong>b) </strong>Se realizarán varios intentos previos antes de cronometrar al sujeto o de la prueba definitiva.<br><strong>c) </strong>Si el ejecutante cae más de 15 veces en los primeros 30 seg, se finaliza la prueba.',
        imagen: "assets/imgs/sprotocolo/book.png",
      },
    ];

    var modalPage = this.modalCtrl.create('SprotocoloPage', { data: slider } ); 
    modalPage.present(); 
  }

}
