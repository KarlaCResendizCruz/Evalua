import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@IonicPage()
@Component({
  selector: 'page-cintura',
  templateUrl: 'cintura.html',
})

export class CinturaPage {

  eneable_preescolar:boolean = false; //Deshabilita secciones si el nivel de preeescolar esta activo
  eneable_alllevel:boolean = true; //Se Habilita el contenido para los demás niveles

  nivel:any;      //Objeto recibido por parametros, guarda el nivel escolar
  edades:any = [];    //array de edades dependiendo el nivel escolar

  //Varibles para las operaciones
  // genero:string; //variable de genero
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

      //Habilita las edades correspondientes a cada nivel
  
      if( this.nivel == "Preescolar2" ){
        this.edades = [ 5, 6];
        this.eneable_preescolar = true;
        this.eneable_alllevel = false;
        this.level = "preescolar";
      }
  
      else if( this.nivel == "Primaria" ){
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
      this.crearform(); //Se llama a la función desde el inicio de la vista
  }

  crearform() {
    //Validación del formulario
    this.datos = this.fbuilder.group({
      talla:['',[Validators.required,
        Validators.minLength(2),
        Validators.maxLength(6),
        Validators.pattern(/^[0-9]+(.[0-9]+)?$/)]],
      cintura:['',[Validators.required,
        Validators.minLength(2),
        Validators.maxLength(6),
        Validators.pattern(/^[0-9]+(.[0-9]+)?$/)]],
      years:[this.edades[0],[Validators.required]],
      meses:[0,[Validators.required]],
    });
  }

  ionViewDidLoad(){
  }
    

  calcular() {

    var PCT =  Number(this.datos.value.cintura) /  Number(this.datos.value.talla);
    
    //Comparaciones , obtiene el resultado a mostrar dependiendo la desviación
    if ( PCT >= 0.50){
      this.interpretacion = "Riesgo cardiometabólico";
      this.estado = "corazon_conriesgo"
    }
    else{
      this.interpretacion = "Sin Riesgo Cardiometabólico";
      this.estado = "corazon_sinriesgo"
    }

    
    var resultados = {
      nivel: this.level.charAt(0).toUpperCase() + this.level.slice(1),
      titulo: 'Evaluación: Realación Cintura-Talla',
      evaluacion: this.interpretacion,
      img: 'cintura_talla\\' + this.estado + '.png',
      recomendacion: 'Realizar evaluación en 3 momentos (inicio, intermedio y final del ciclo escolar).',
    };

    var modalPage = this.modalCtrl.create('ResultadosPage', { data: resultados } ); 
    modalPage.present(); 

    this.crearform(); //Se vuelve a llamar a la función del formulario.

  }

  //Procolo
  talla(){

    var slider = [
      {
        titulo: "Talla",
        texto: "<strong>Definición:</strong><br>Estatura de una persona, medida desde la planta del pie hasta el vértice de la cabeza.",
        imagen: "assets/imgs/talla/talla_protocolo.png",
      },
      {
        titulo: "",
        texto: "<strong>Instrumento:</strong><br>Cinta métrica <br><br> <strong>Unidad de medida:</strong><br>Centímetros(cm)",
        imagen: "assets/imgs/sprotocolo/book.png",
      },
      {
        titulo: "",
        texto: "<strong>Determinación:</strong><br> Mide el tamaño del individuo desde la coronilla de la cabeza hasta los pies (talones), el niño se mide de pie (parado). La talla se toma en niños mayores de 24 meses.",
        imagen: "assets/imgs/sprotocolo/determinacion.png",
      },
      {
        titulo: "",
        texto: '<strong>Pasos:</strong><br><strong>a)</strong> Coloque el tallímetro en el suelo o sobre una mesa.<br><strong>b)</strong> Desdoble la plataforma fija, ajuste los soportes a sus respectivas bisagras.<br><strong>c)</strong> Coloque el tallador (Plataforma móvil o escuadra).<br><strong>d)</strong> Agregue la barra de extensión.',
        imagen: "assets/imgs/sprotocolo/pasos.png",
      },
      {
        titulo: "",
        texto: '<strong>Pasos:</strong><br><strong>e)</strong> Coloque el tallímetro de acuerdo a la edad del niño que va a medir. Si el niño tiene 25 meses o más el tallímetro se colocará parado. Antes de tomar los datos limpie de nuevo el cuerpo del tallímetro y la plataforma fija con un pedazo de papel.',
        imagen: "assets/imgs/sprotocolo/pasos.png",
      },
      {
        titulo: "",
        texto: '<strong>Pasos:</strong><br><strong>f)</strong> Se tomará de pié con los talones juntos, cuidando que el mentón se ubique recogido de manera que el borde inferior de la cavidad orbitaria se encuentre en línea horizontal con la parte superior del trago de la oreja./ Plano de Frankfurt ( Se utilizarán altímetros de precisión, controlados por el operador a través de una cinta métrica).',
        imagen: "assets/imgs/sprotocolo/pasos.png",
      },
      {
        titulo: "",
        texto: '<strong>Aplicación:</strong><br><strong>a)</strong> Descripción general del cuerpo<br><strong>b)</strong> Tamaño de ropa y equipo de protección personal.<br><strong>c)</strong> Distribución de espacios de trabajo.<br><strong>d)</strong> Diseño de equipo: distancias verticales de espacios de trabajo y cuartos para vivir y áreas de camas, literas, etc.<br>',
        imagen: "assets/imgs/sprotocolo/aplicacion.png",
      }
    ];

    var modalPage = this.modalCtrl.create('SprotocoloPage', { data: slider } ); 
    modalPage.present(); 
  }
  
  cintura(){

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

}
