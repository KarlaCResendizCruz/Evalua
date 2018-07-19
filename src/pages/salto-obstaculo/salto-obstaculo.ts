import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-salto-obstaculo',
  templateUrl: 'salto-obstaculo.html',
})
export class SaltoObstaculoPage {

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
      this.resultado = "Estimular el salto, con más frecuencia, utilizar medios alternativos.";
    }
    else if (this.rubrica == "2" ){
      this.resultado = "Enseñar a saltar la cuerda.";
    }
    else if (this.rubrica == "3" ){
      this.resultado = "Mayor cantidad de experiencias, jugar deportes con salto; voleibol, basquetbol.";
    }
    else if (this.rubrica == "4" ){
      this.resultado = "Continuar trabajando deportes.";
    }

        
    var resultados = {
      nivel: this.nivel,
      titulo: 'Evaluación: Salto de obstaculo',
      evaluacion: this.resultado,
      img:'obstaculo.png',
      recomendacion: 'Evaluar cada 4 semanas.',
    };

    var modalPage = this.modalCtrl.create('ResultadosPage', { data: resultados } ); 
    modalPage.present(); 


    this.rubrica = "1";

  }



  protocolo(){
 
    var slider = [
      {
        titulo: "Evaluación: Salto de obstáculo.",
        texto: "<strong>Material:</strong><br>Un piso llano y plano, un obstáculo de una altura de 15 a 20cm. Procurando que este se desarme al impacto, y así evitar lesiones La superficie no resbalosa.",
        imagen: "assets/imgs/salto_obstaculo/salto1.png",
      },
      {
        titulo: "",
        texto: "<strong>Recomendaciones:</strong><br><br>se recomienda utilizar ropa cómoda y usa superficie plana.",
        imagen: "assets/imgs/sprotocolo/aplicacion.png",
      },
      {
        titulo: "",
        texto: "<strong>Procedimiento:</strong><br><br>Solicite al alumno que se coloque frente al obstáculo a una distancia de 20cm por lo mucho alejado de la valla, y le  solicitamos que la brinque, se anotan las observaciones ",
        imagen: "assets/imgs/sprotocolo/determinacion.png",
      },
      {
        titulo: "",
        texto: "<strong>Observe a su alumno</strong>",
        imagen: "assets/imgs/salto_obstaculo/salto1.png",
      },
      {
        titulo: "",
        texto: "<strong>Observe a su alumno</strong>",
        imagen: "assets/imgs/salto_obstaculo/salto2.png",
      },
      {
        titulo: "",
        texto: "<strong>Observe a su alumno</strong>",
        imagen: "assets/imgs/salto_obstaculo/salto3.png",
      },
      {
        titulo: "",
        texto: "<strong>Observe a su alumno</strong>",
        imagen: "assets/imgs/salto_obstaculo/salto4.png",
      },
      {
        titulo: "",
        texto: '<strong>Observaciones Pedagógicas:</strong><br>La mayoría de niños mayores de 8 años, no deberían de tener dificultad en realizarlo, pero dada las limitantes de actividad física en su entorno, las proponemos.',
        imagen: "assets/imgs/sprotocolo/book.png",
      },
    ];

    var modalPage = this.modalCtrl.create('SprotocoloPage', { data: slider } ); 
    modalPage.present(); 
  }

  ionViewDidLoad() {

  }

}
