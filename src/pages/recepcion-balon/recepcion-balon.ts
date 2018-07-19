import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-recepcion-balon',
  templateUrl: 'recepcion-balon.html',
})
export class RecepcionBalonPage {

  data = '';
  nivel:any;
  rubrica:string ="0";
  resultado:string = "";

  constructor(
    
    public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl: ModalController,

  ) {
    this.nivel = this.navParams.get('data');
  }

  calificar_rubrica(){

    if (this.rubrica == "0" ){
      this.resultado = "¡A trabajar!,¡a cachar!.";
    }
    else if (this.rubrica == "1" ){
      this.resultado = "Con más pelotas debemos jugar.";
    }
    else if (this.rubrica == "2" ){
      this.resultado = "El uso del balón deberás.";
    }
    else if (this.rubrica == "3" ){
      this.resultado = "La anticipación es tu labor.";
    }
    else if (this.rubrica == "4" ){
      this.resultado = "¡Estas listo(a) para aprender!.";
    }

    var resultados = {
      nivel: this.nivel,
      titulo: 'Evaluación: Recepción del balón.',
      evaluacion: this.resultado,
      img:'recepcion.png',
      recomendacion: 'Evaluar cada 4 semanas.',
    };

    var modalPage = this.modalCtrl.create('ResultadosPage', { data: resultados } ); 
    modalPage.present(); 

    this.rubrica = "0";

  }



  protocolo(){
 
    var slider = [
      {
        titulo: "Evaluación: Recepción de balón.",
        texto: "<strong>Material:</strong><br><ul><li>Balón de voleibol de 65cm de circunferencia</li><li>265gr de peso y presión interior de 0.3kg/cm<sup>2</sup> .<li>2 aros de 70cm de diámetro.</li></ul>",
        imagen: "assets/imgs/recepcion_balon/recepciondebalon-1.png",
      },
      {
        titulo: "",
        texto: "<strong>Recomendaciones:</strong><br><br>Se recomienda el uso de ropa deportiva para mejor movilidad.",
        imagen: "assets/imgs/sprotocolo/aplicacion.png",
      },
      {
        titulo: "",
        texto: "<strong>Procedimiento:</strong><br><br>Se realizan dos lanzamientos: <br> La distancia entre el adulto y el niño (ambos dentro del aro) es de 3 metros. <br> <ul><li>En la primera prueba el participante tiene que atrapar el balón con los brazos, presionándolo contra el pecho.</li><li>En el segundo solo con ambas manos.</li></ul>El lanzamiento del balón se realiza de abajo arriba y dirigido suavemente al centro del aro que ocupa el alumno.",
        imagen: "assets/imgs/sprotocolo/determinacion.png",
      },
      {
        titulo: "",
        texto: "<strong>Observe a su alumno</strong>",
        imagen: "assets/imgs/recepcion_balon/recepciondebalon-1.png",
      },
      {
        titulo: "",
        texto: "<strong>Observe a su alumno</strong>",
        imagen: "assets/imgs/recepcion_balon/recepciondebalon-2.png",
      },
      {
        titulo: "",
        texto: '<strong>Observaciones Pedagógicas:</strong><br><strong>Fase de ajuste al vuelo:</strong>Se desarrolla en el tiempo en el que el móvil está en el aire una vez ha salido de las manos del lanzador.<br>Incluye los movimientos globales o segmentarios del cuerpo del receptor para acomodarse a la velocidad, trayectoria y distancia del móvil.',
        imagen: "assets/imgs/sprotocolo/book.png",
      },
      {
        titulo: "",
        texto: 'Estos movimientos deben presentar dos características para ser registrados como tales:<br> <ul><li>Ser claramente intencionales, por lo que no se consideran válidos los movimientos de reacción o de otro tipo que no respondan a este objetivo.</li><li>Que no se retarden en el tiempo, ya que la función de ajuste es un proceso anticipatorio.</li></ul><br><strong>Nota:</strong>Es a partir de los 7 años que todos realizan ajuste de vuelo.',
        imagen: "assets/imgs/sprotocolo/book.png",
      },
    ];

    var modalPage = this.modalCtrl.create('SprotocoloPage', { data: slider } ); 
    modalPage.present(); 
  }

  ionViewDidLoad() {
   
  }

}
