import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-caminar',
  templateUrl: 'caminar.html',
})
export class CaminarPage {

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
      this.resultado = "Caminemos en el campo, sobre la arena.";
    }
    else if (this.rubrica == "2" ){
      this.resultado = "Juguemos a las atrapadas.";
    }
    else if (this.rubrica == "3" ){
      this.resultado = "Muy bien todo un soldadito.";
    }
    
    var resultados = {
      nivel: this.nivel,
      titulo: 'Evaluación: Caminar',
      evaluacion: this.resultado,
      img:'caminar.png',
      recomendacion: 'Evaluar cada 4 semanas.',
    };

    var modalPage = this.modalCtrl.create('ResultadosPage', { data: resultados } ); 
    modalPage.present(); 
    this.rubrica = "1";

  }


  protocolo(){
 
    var slider = [
      {
        titulo: "Evaluación: Caminar",
        texto: "<strong>Material:</strong><br> Superficie llana y lisa, no resbalosa.",
        imagen: "assets/imgs/caminar/caminar.png",
      },
      {
        titulo: "",
        texto: "<strong>Recomendaciones:</strong><br><br>El alumno puede estar en short y playera de esa manera se puede observar si no presenta ninguna anomalía en sus piernas.",
        imagen: "assets/imgs/sprotocolo/aplicacion.png",
      },
      {
        titulo: "",
        texto: "<strong>Procedimiento:</strong><br><br>El profesor le pide  al niño que camine hacia el frente unos 5 metros de ida y vuelta, como se muestra en las siguientes imagenes. ",
        imagen: "assets/imgs/sprotocolo/determinacion.png",
      },
      {
        titulo: "",
        texto: "<strong>Observe al alumno en su caminar</strong>",
        imagen: "assets/imgs/caminar/caminar1.png",
      },
      {
        titulo: "",
        texto: "<strong>Observe al alumno en su caminar</strong>",
        imagen: "assets/imgs/caminar/caminar2.png",
      },
      {
        titulo: "",
        texto: "<strong>Observe al alumno en su caminar</strong>",
        imagen: "assets/imgs/caminar/caminar3.png",
      },
      {
        titulo: "",
        texto: "<strong>Observe al alumno en su caminar</strong>",
        imagen: "assets/imgs/caminar/caminar4.png",
      },
      {
        titulo: "",
        texto: "<strong>Observe al alumno en su caminar</strong>",
        imagen: "assets/imgs/caminar/caminar5.png",
      },
      {
        titulo: "",
        texto: '<strong>Observaciones Pedagógicas:</strong><br><br>Profesor; no debe valorar el giro de regreso. Se le recomienda que observe el caminado de espalda, de perfil y de frente, se debe de notar un ritmo natural en la consecución del paso, un pendular armónico de los brazos, así como la fijación de la cabeza al frente.',
        imagen: "assets/imgs/sprotocolo/determinacion.png",
      },
    ];

    var modalPage = this.modalCtrl.create('SprotocoloPage', { data: slider } ); 
    modalPage.present(); 
  }

}
