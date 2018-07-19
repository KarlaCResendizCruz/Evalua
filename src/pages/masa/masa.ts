import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-masa',
  templateUrl: 'masa.html',
})
export class MasaPage {

  nivel:any;      //Objeto recibido por parametros, guarda el nivel escolar
  edades:any = [];    //array de edades dependiendo el nivel escolar

  //Varibles para las operaciones
  interpretacion:string = '';
  descripcion:string = '';

  datos:FormGroup; //Creación de un objeto del tipo FormGroup

  item:any = {
    gender:''
  }

  level:string = '';
  estado:string = '';
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private fbuilder:FormBuilder
  ) {

    this.nivel = this.navParams.get('data'); //Parametros recibidos de la vista anterior

    if( this.nivel == "Primaria" ){
      this.edades = [ 6, 7, 8, 9, 10, 11, 12 ];
      this.level = "primaria";
    }

    else if( this.nivel == "Secundaria" ){
      this.edades = [ 12, 13, 14, 15 ];
      this.level = "secundaria";
    }

    else if( this.nivel == "Preparatoria" ){
      this.edades = [ 16, 17];
      this.level = "preparatoria";
    }

    this.crearform(); //Se llama a la función desde el inicio de mi vista
  }

  crearform() {
    //Validación del formulario
    this.datos = this.fbuilder.group({
      genero:['',[Validators.required]],
      ptriceps:['',[Validators.required,
        Validators.minLength(2),
        Validators.maxLength(6),
        Validators.pattern(/^[0-9]+(.[0-9]+)?$/)]],
      pmuslo:['',[Validators.required,
        Validators.minLength(2),
        Validators.maxLength(6),
        Validators.pattern(/^[0-9]+(.[0-9]+)?$/)]],
      psuprailiaco:['',[Validators.required,
        Validators.minLength(2),
        Validators.maxLength(6),
        Validators.pattern(/^[0-9]+(.[0-9]+)?$/)]],
      ptorax:['',[Validators.required,
        Validators.minLength(2),
        Validators.maxLength(6),
        Validators.pattern(/^[0-9]+(.[0-9]+)?$/)]], 
      pabdomen:['',[Validators.required,
        Validators.minLength(2),
        Validators.maxLength(6),
        Validators.pattern(/^[0-9]+(.[0-9]+)?$/)]],
      years:[this.edades[0],[Validators.required]],
    });
  }

  ionViewDidLoad(){

  }

  calcular() {

    // Suma de años(meses) y meses del formuario
    var X2 = Number(this.datos.value.years);
    var comparador = this.datos.value.genero;
    var P1 = Number(this.datos.value.ptriceps); 
    var P2 = Number(this.datos.value.pmuslo);
    var P3 = Number(this.datos.value.psuprailiaco);
    var P4 = Number(this.datos.value.ptorax);
    var P5 = Number(this.datos.value.pabdomen);
    var DC, NR, B, L, S, X1;

    if( comparador = 'femenino' ){
      X1 = (P1 + P2) + P3;
      DC = 1.0994921 - 0.0009929*(X1) + 0.000023 * (Math.pow(X2,2)) - (0.0001392*X2);
      NR = 12;
      B = 15;
      L = 30;
      S = 36;
    }

    else if( comparador = 'masculino' ){
      X1 = P4 + P5 + P2;
      DC = 1.10938 - 0.0008267*X1 + 0.0000016 * (Math.pow(X1,2)) - (0.0002574*X2);
      NR = 5;
      B = 10;
      L = 25;
      S = 31;
    }

    var MG = ((4.95/ DC) - 4.5) * 100;

    
    //Comparaciones , obtiene el resultado a mostrar dependiendo la desviación
    if ( MG < NR ){
      this.interpretacion = "Muy bajo";
      this.estado = "muybaja";
    }
    if ( MG >= NR && MG <= B){
      this.interpretacion = "Bajo";
      this.estado = "baja";
    }
    if ( MG > B && MG <= L){
      this.interpretacion = "Leve";
      this.estado = "leve";
    } 
    if ( MG > L && MG <= S){
      this.interpretacion = "Superior";
      this.estado = "superior";
    }
    if ( MG > S){
      this.interpretacion = 'Obesidad';
      this.estado = "obesidad";
    }


    var resultados = {
      nivel: this.level.charAt(0).toUpperCase() + this.level.slice(1),
      titulo: 'Evaluación: % de Masa grasa',
      evaluacion: this.interpretacion + '<br>' + MG.toFixed(2) + '% de masa grasa',
      img: 'masa_grasa\\' + this.level + '_' + this.estado + '.png',
      recomendacion: 'Realizar evaluación en 3 momentos (inicio, intermedio y final del ciclo escolar).',
    };

    var modalPage = this.modalCtrl.create('ResultadosPage', { data: resultados } ); 
    modalPage.present(); 

    this.crearform(); //Se vuelve a llamar a la función del formulario.

  }

  //Procolo
  ptricipital(){

    var slider = [
      {
        titulo: "Pliegue Tricipital",
        texto: "<strong>Definición:</strong><br>Doble capa de piel y tejido adiposo sub- yacente, en la zona tricipital del brazo.",
        imagen: "assets/imgs/masa_grasa/pliegue-tricipital.png",
      },
      {
        titulo: "",
        texto: "<strong>Instrumento:</strong><br>Compás de pliegues cutáneos <br><br> <strong>Unidad de medida:</strong><br>Milímetros (mm)",
        imagen: "assets/imgs/sprotocolo/book.png",
      },
      {
        titulo: "",
        texto: "<strong>Determinación:</strong><br><strong>1) </strong>Persona en posición erecta, mirando hacia el frente, en bipedestación, con el peso distribuido equitativamente en ambos pies.",
        imagen: "assets/imgs/sprotocolo/determinacion.png",
      },
      {
        titulo: "",
        texto: "<strong>2) </strong>Punto medio acromioradial, en la parte anterior del brazo. El pliegue es vertical y corre paralelo al eje longitudinal del brazo marca línea media acromial-radial.",
        imagen: "assets/imgs/sprotocolo/determinacion.png",
      },
      {
        titulo: "",
        texto: '<strong>Aplicación:</strong><br><strong>a)</strong> Descripción general del cuerpo Valoración nutricional.',
        imagen: "assets/imgs/sprotocolo/aplicacion.png",
      }
    ];

    var modalPage = this.modalCtrl.create('SprotocoloPage', { data: slider } ); 
    modalPage.present(); 
  }

  pmuslo(){

    var slider = [
      {
        titulo: "Pliegue del Muslo",
        texto: "<strong>Definición:</strong><br>Doble capa de piel y tejido adiposo subyacente, en la zona anterior del muslo.",
        imagen: "assets/imgs/masa_grasa/pliegue-muslo.png",
      },
      {
        titulo: "",
        texto: "<strong>Instrumento:</strong><br>Compás de pliegues cutáneos <br><br> <strong>Unidad de medida:</strong><br>Milímetros (mm)",
        imagen: "assets/imgs/sprotocolo/book.png",
      },
      {
        titulo: "",
        texto: "<strong>Determinación:</strong><br><strong>1) </strong>El estudiado estará sentado apoyando los pies en el suelo y formando sus rodillas un ángulo de 90º. Si el antropometrista tiene dificultades en la toma de este pliegue, el estudiado puede sostener con ambas manos su muslo en esta posición, o contar con la ayuda de otro antropometrista que atrapará con sus 2 manos el pliegue.",
        imagen: "assets/imgs/sprotocolo/determinacion.png",
      },
      {
        titulo: "",
        texto: "<strong>2) </strong>Situado en el punto medio de la línea que une el pliegue inguinal y borde proximal de la rótula, en la cara anterior del muslo, el pliegue es longitudinal y corre a lo largo del eje mayor del fémur.",
        imagen: "assets/imgs/sprotocolo/determinacion.png",
      },
      {
        titulo: "",
        texto: '<strong>Aplicación:</strong><br>Descripción general del cuerpo Valoración nutricional.',
        imagen: "assets/imgs/sprotocolo/aplicacion.png",
      }
    ];

    var modalPage = this.modalCtrl.create('SprotocoloPage', { data: slider } ); 
    modalPage.present(); 
  }

  psuprailiaco(){

    var slider = [
      {
        titulo: "Pliegue Suprailiaco",
        texto: "<strong>Definición:</strong><br>Doble capa de piel y tejido adiposo subyacente, en la zona supraileaca del abdomen.",
        imagen: "assets/imgs/masa_grasa/pliegue-supraileaco.png",
      },
      {
        titulo: "",
        texto: "<strong>Instrumento:</strong><br>Compás de pliegues cutáneos <br><br> <strong>Unidad de medida:</strong><br>Milímetros (mm)",
        imagen: "assets/imgs/sprotocolo/book.png",
      },
      {
        titulo: "",
        texto: "<strong>Determinación:</strong><br>Localizado justo encima de la cresta ilíaca en la línea medio axilar. El pliegue corre hacia delante y hacia abajo, formando un ángulo de alrededor de 30-45º con la horizontal. Para facilitar la toma de esta medida, el estudiado colocará su mano derecha a través del pecho.",
        imagen: "assets/imgs/sprotocolo/determinacion.png",
      },
      {
        titulo: "",
        texto: '<strong>Aplicación:</strong><br>Descripción general del cuerpo Valoración nutricional.',
        imagen: "assets/imgs/sprotocolo/aplicacion.png",
      }
    ];

    var modalPage = this.modalCtrl.create('SprotocoloPage', { data: slider } ); 
    modalPage.present(); 
  }

  ptorax(){

    var slider = [
      {
        titulo: "Pliegue del Torax",
        texto: "<strong>Definición:</strong><br>Doble capa de piel y tejido adiposo sub- yacente, en la zona lateral del pecho.",
        imagen: "assets/imgs/masa_grasa/pliegue-torax-abdomen.png",
      },
      {
        titulo: "",
        texto: "<strong>Instrumento:</strong><br>Compás de pliegues cutáneos <br><br> <strong>Unidad de medida:</strong><br>Milímetros (mm)",
        imagen: "assets/imgs/sprotocolo/book.png",
      },
      {
        titulo: "",
        texto: "<strong>Determinación:</strong><br>Persona en posición erecta, mirando hacia el frente, en bipedestación, con el peso distribuido equitativamente en ambos pies. <br> Localizado en la línea axilar-pezón, lo más proximal al faldón axilar y oblicuo hacia abajo; se toma en el mismo lugar en ambos sexos.",
        imagen: "assets/imgs/sprotocolo/determinacion.png",
      },
      {
        titulo: "",
        texto: '<strong>Aplicación:</strong><br>Descripción general del cuerpo Valoración nutricional.',
        imagen: "assets/imgs/sprotocolo/aplicacion.png",
      }
    ];

    var modalPage = this.modalCtrl.create('SprotocoloPage', { data: slider } ); 
    modalPage.present(); 
  }


  pabdomen(){

    var slider = [
      {
        titulo: "Pliegue del Abdomen",
        texto: "<strong>Definición:</strong><br>Doble capa de piel y tejido adiposo subyacente, en la zona media del ab- domen.",
        imagen: "assets/imgs/masa_grasa/pliegue-torax-abdomen.png",
      },
      {
        titulo: "",
        texto: "<strong>Instrumento:</strong><br>Compás de pliegues cutáneos <br><br> <strong>Unidad de medida:</strong><br>Milímetros (mm)",
        imagen: "assets/imgs/sprotocolo/book.png",
      },
      {
        titulo: "",
        texto: "<strong>Determinación:</strong><br>Persona en posición erecta, mirando hacia el frente, en bipedestación, con el peso distribuido equitativamente en ambos pies.<br> Situado lateralmente a la derecha, junto a la cicatriz umbilical en su punto medio, el pliegue es vertical y corre paralelo al eje longitudinal del cuerpo. Para otros autores, está situado lateralmente a 3-5 cm. de la cicatriz umbilical.",
        imagen: "assets/imgs/sprotocolo/determinacion.png",
      },
      {
        titulo: "",
        texto: '<strong>Aplicación:</strong><br>Descripción general del cuerpo Valoración nutricional.',
        imagen: "assets/imgs/sprotocolo/aplicacion.png",
      }
    ];

    var modalPage = this.modalCtrl.create('SprotocoloPage', { data: slider } ); 
    modalPage.present(); 
  }

}
