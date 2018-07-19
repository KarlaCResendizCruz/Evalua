import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-velocidad-agilidad',
  templateUrl: 'velocidad-agilidad.html',
})
export class VelocidadAgilidadPage {

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
      titulo: 'Evaluación: Velocidad de agilidad',
      evaluacion: this.resultado,
      img:'velocidad_agilidad/velocidad_agilidad1.png',
      recomendacion: 'Evaluar cada 4 semanas.',
    };

    var modalPage = this.modalCtrl.create('ResultadosPage', { data: resultados } ); 
    modalPage.present(); 

    this.rubrica = "0";

  }


  protocolo(){

    var slider = [
      {
        titulo: "Evaluación: Velocidad de agilidad",
        texto: "<strong>Material:</strong><br><strong>a) </strong>Superficie limpia y no deslizante.<br><strong>b) </strong>Cinta adhesiva.<br><strong>c) </strong>Cronómetro.<br><strong>d) </strong>Tres esponjas con colores diferentes.",
        imagen: "assets/imgs/velocidad_agilidad/velocidad_agilidad1.png",
      },
      {
        titulo: "",
        texto: "<strong>Recomendaciones:</strong><br><br> El alumno debe usar ropa cómoda, realizar la prueba en suelo no resbaloso y plano.",
        imagen: "assets/imgs/sprotocolo/aplicacion.png",
      },
      {
        titulo: "",
        texto: "<strong>Procedimiento:</strong><br><br> Dos líneas paralelas se dibujarán en el suelo (con cintas) a 10 metros de distancia. En la línea de salida hay una esponja (B) y en la línea opuesta hay dos esponjas (A, C).",
        imagen: "assets/imgs/velocidad_agilidad/agilidad_material.png",
      },
      {
        titulo: "",
        texto: "Cuando se indique la salida, el alumno (sin esponja) correrá lo más rápido posible a la otra línea y volverá a la línea de salida con la esponja (A), cruzando ambas líneas con los dos pies.",
        imagen: "assets/imgs/velocidad_agilidad/agilidad_inicio.png",
      },
      {
        titulo: "",
        texto: "La esponja (A) se cambiará por la esponja B en la línea de salida. Luego, irá corriendo lo más rápido posible a la línea opuesta, cambiará la esponja B por la esponja C y volverá corriendo a la línea de salida.",
        imagen: "assets/imgs/velocidad_agilidad/agilidad_final.png",
      },

      {
        titulo: "",
        texto: "<strong>Instrucciones:</strong><br><br>Preparé al alumno detrás de la línea de salida. Cuando indique el inicio, el alumno correrá   tan rápido como sea posible a la otra línea sin esponja y volverá a la línea de salida con la esponja A.",
        imagen: "assets/imgs/velocidad_agilidad/agilidad_material.png",
      },
      {
        titulo: "",
        texto: "Cruzará las dos líneas con los dos pies. Luego, cambiará la esponja A por la esponja B y volverá corriendo lo más rápido posible a la línea opuesta, donde deberá cambiar la esponja B por la C. ",
        imagen: "assets/imgs/velocidad_agilidad/agilidad_inicio.png",
      },
      {
        titulo: "",
        texto: "Por último, volverá de nuevo a la línea de salida sin reducir su velocidad hasta haberla cruzado.",
        imagen: "assets/imgs/velocidad_agilidad/agilidad_final.png",
      },

      {
        titulo: "",
        texto: '<strong>Observaciones Pedagógicas:</strong><br><br> Se deberá aprender la prueba, se recomienda practicarla tantas veces como sea necesario.',
        imagen: "assets/imgs/sprotocolo/book.png",
      }
    ];

    var modalPage = this.modalCtrl.create('SprotocoloPage', { data: slider } ); 
    modalPage.present(); 
  }

}
