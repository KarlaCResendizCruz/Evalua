import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@IonicPage()
@Component({
  selector: 'page-ccadera',
  templateUrl: 'ccadera.html',
})
export class CcaderaPage {

  eneable_preescolar:boolean = false; //Deshabilita secciones si el nivel de preeescolar esta activo
  eneable_alllevel:boolean = true; //Se Habilita el contenido para los demás niveles

  nivel:any;      //Objeto recibido por parametros, guarda el nivel escolar

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

      if( this.nivel == "Preescolar2" ){
        this.eneable_preescolar = true;
        this.eneable_alllevel = false;
      }

      this.crearform(); //Se llama a la función desde el inicio de la vista
  }

  crearform() {
    //Validación del formulario
    this.datos = this.fbuilder.group({
      genero:['',[Validators.required]],
      CCINT:['',[Validators.required,
        Validators.minLength(2),
        Validators.maxLength(6),
        Validators.pattern(/^[0-9]+(.[0-9]+)?$/)]],
      CCAD:['',[Validators.required,
        Validators.minLength(2),
        Validators.maxLength(6),
        Validators.pattern(/^[0-9]+(.[0-9]+)?$/)]],
    });
  }

  ionViewDidLoad(){

  }
    

  calcular() {

    if (this.datos.value.genero == 'femenino'){
      var indicador = 0.8;
    }
    if (this.datos.value.genero == 'masculino'){
        indicador = 1;
    }
    var ICC =  Number(this.datos.value.CCINT) /  Number(this.datos.value.CCAD);
    
    //Comparaciones , obtiene el resultado a mostrar dependiendo la desviación
    if ( ICC >= indicador){
      this.interpretacion = "Riesgo creciente de enfermedad cardiaca coronaria";
      this.estado = "conriesgo_coronaria";
    }
    else{
      this.interpretacion = "Sin Riesgo creciente de enfermedad cardiaca coronaria";
      this.estado = "sinriesgo_coronaria";
    }

    
    var resultados = {
      nivel: this.level.charAt(0).toUpperCase() + this.level.slice(1),
      titulo: 'Evaluación: Relación Cintura-Cadera',
      evaluacion: this.interpretacion + "<br><strong>Índice: </strong>" + ICC.toFixed(2),
      img: 'cintura_cadera\\' + this.estado + '.png',
      recomendacion: 'Realizar evaluación en 3 momentos (inicio, intermedio y final del ciclo escolar).',
    };

    var modalPage = this.modalCtrl.create('ResultadosPage', { data: resultados } ); 
    modalPage.present(); 
    this.crearform(); //Se vuelve a llamar a la función del formulario.

  }

  ccintura(){

    var slider = [
      {
        titulo: "Circunferencia de Cintura",
        texto: "<strong>Definición:</strong><br>Máxima circunferencia de la cintura.<br>Línea horizontal en punto medio entre la última costilla y la cresta iliaca.",
        imagen: "assets/imgs/cintura_talla/relacion-talla-cintura.png",
      },
      {
        titulo: "",
        texto: "<strong>Instrumento:</strong><br>Cinta métrica <br><br> <strong>Unidad de medida:</strong><br>Centímetros(cm)",
        imagen: "assets/imgs/sprotocolo/book.png",
      },
      {
        titulo: "",
        texto: "<strong>Determinación:</strong><br>Persona en posición erecta, con los miembros superiores a ambos lados del cuerpo, las palmas y dedos de las manos rectos y extendidos hacia abajo, mirando hacia el frente, en bipedestación, con el peso distribuido equitativamente en ambos pies (posición de atención antropométrica).",
        imagen: "assets/imgs/sprotocolo/determinacion.png",
      },
      {
        titulo: "",
        texto: '<strong>Aplicación:</strong><br><strong>a)</strong> Descripción general del cuerpo<br><strong>b)</strong> Tamaño de ropa y equipo de protección personal.<br><strong>c)</strong> Distribución de espacios de trabajo.<br><strong>d)</strong> Diseño de equipo: Sistemas de soporte y vestido de la parte inferior, distancias horizontales de espacios de trabajo.<br>',
        imagen: "assets/imgs/sprotocolo/aplicacion.png",
      }
    ];

    var modalPage = this.modalCtrl.create('SprotocoloPage', { data: slider } ); 
    modalPage.present(); 
  }

  ccadera(){

    var slider = [
      {
        titulo: "Circunferencia de Cadera",
        texto: "<strong>Definición:</strong><br>Máxima circunferencia de la cadera.<br> Línea horizontal a nivel de la máxima protuberancia posterior de los glúteos (5 centímetros por debajo de la cintura).",
        imagen: "assets/imgs/cintura_cadera/indice-cinturacadera.png",
      },
      {
        titulo: "",
        texto: "<strong>Instrumento:</strong><br>Cinta métrica <br><br> <strong>Unidad de medida:</strong><br>Centímetros(cm)",
        imagen: "assets/imgs/sprotocolo/book.png",
      },
      {
        titulo: "",
        texto: "<strong>Determinación:</strong><br>Persona en posición erecta, con los miembros superiores a ambos lados del cuerpo, las palmas y dedos de las manos rectos y extendidos hacia abajo, mirando hacia el frente, en bipedestación, con el peso distribuido equitativamente en ambos pies (posición de atención antropométrica).",
        imagen: "assets/imgs/sprotocolo/determinacion.png",
      },
      {
        titulo: "",
        texto: '<strong>Aplicación:</strong><br><strong>a)</strong> Descripción general del cuerpo<br><strong>b)</strong> Tamaño de ropa y equipo de protección personal.<br><strong>c)</strong> Distribución de espacio de trabajo.<br><strong>d)</strong> Diseño de equipo: Sistemas de soporte y vestido de la parte inferior, distancias horizontales de espacios de trabajo.<br>',
        imagen: "assets/imgs/sprotocolo/aplicacion.png",
      }
    ];

    var modalPage = this.modalCtrl.create('SprotocoloPage', { data: slider } ); 
    modalPage.present(); 
  }

}
