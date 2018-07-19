import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { AmbProvider } from '../../providers/amb/amb';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-amb',
  templateUrl: 'amb.html',
})
export class AmbPage {

  eneable_preescolar:boolean = false; //Deshabilita secciones si el nivel de preeescolar esta activo
  eneable_alllevel:boolean = true; //Se Habilita el contenido para los demás niveles

  nivel:any;      //Objeto recibido por parametros, guarda el nivel escolar
  edades:any = [];    //array de edades dependiendo el nivel escolar

  //Objeto del API Rest
  medidas_amb;

  //Varibles para las operaciones
  areas:any;    //Variable vector de áreas
  perceptiles:any;  //Vector, perceptiles del área
  restas:any = [7];     //Vector, contiene las restas del área de la tabla menos área ingresada
  absolutos:any = [7];  //Vector, valores absolutos
  minimo:number = 0;
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
    public ambprovider: AmbProvider,
    public modalCtrl: ModalController,
    private fbuilder:FormBuilder
  ) {

    this.nivel = this.navParams.get('data'); //Parametros recibidos de la vista anterior

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

    this.crearform(); //Se llama a la función desde el inicio de mi vista
  }

  crearform() {
    //Validación del formulario
    this.datos = this.fbuilder.group({
      genero:['',[Validators.required]],
      PB:['',[Validators.required,
        Validators.minLength(2),
        Validators.maxLength(6),
        Validators.pattern(/^[0-9]+(.[0-9]+)?$/)]],
      PT:['',[Validators.required,
        Validators.minLength(2),
        Validators.maxLength(6),
        Validators.pattern(/^[0-9]+(.[0-9]+)?$/)]],
      years:[this.edades[0],[Validators.required]],
      meses:[0,[Validators.required]],
    });
  }

  cambiogenero(){
    this.item.gender = this.datos.value.genero;
    this.ambprovider.getAMB(this.item.gender)
    .subscribe(
      (data) => {
        this.medidas_amb = data;
      }, (error) => {
        console.log(error);
      }
    )
  }

  ionViewDidLoad(){

  }
   

  calcular() {

    //Edad del formulario
    var edad = Number(this.datos.value.years);
 
    //Ciclo para obtener valores correspondientes al área
    for (let area of this.medidas_amb) {
      if( area.years == edad){ //Busqueda de años en tabla

        //Arreglo donde se guardan los valores de las medidas, desviación -3,-2,-1,0,1,2,3
        this.areas = [
          Number(area.p5),
          Number(area.p10),
          Number(area.p15),
          Number(area.p25), 
          Number(area.p50),
          Number(area.p75),
          Number(area.p85),
          Number(area.p90),
          Number(area.p95)
        ];
        //Arreglo donde se guardan las desviaciónes 5,10,15,25,50,75,85,90,95
        this.perceptiles = [Number(area.years),5,10,15,25,50,75,85,90,95];
      }
    }
   
    var subt = ((Number(this.datos.value.PB) - Math.PI) * Number(this.datos.value.PT) );
    var AMB = (Math.pow(subt,2)) / ( 4 * Math.PI);

    //Ciclo, recorrer todas las áreas de una edad
    for (var i = 0; i < (this.areas).length; i++) {
      //Vector, se guarda en un nuevo vector el residuo del area calculada y áre da la tabla
      this.restas[i] =  AMB - this.areas[i];
      //Vector, se obtienen valores absolutos del vector de restas
      this.absolutos[i] = Math.abs(this.restas[i]);       
    }

    //Inicialización de comparador
    this.minimo = this.absolutos[0];
    //Ciclo, determinar el número menor
    for (var j = 0; j < (this.absolutos).length; j++) {
      if(this.minimo > this.absolutos[j]){
        this.minimo = this.absolutos[j];
      }
    }

    var indice = this.absolutos.indexOf(this.minimo); //Indice del valor más cercano
    var final = this.perceptiles[indice + 1]; //Busqueda del tipo del perceptil
    
    //Comparaciones , obtiene el resultado a mostrar dependiendo del perceptil
    if ( final <= 5){
      this.interpretacion = "Reserva proteica muy baja desnutrición proteica";
      this.estado = "reservamuybaja";
    }
    if ( final > 6 || final <= 10 ){
      this.interpretacion = "Reserva proteica baja";
      this.estado = "reservabaja";
    }
    if ( final > 11 || final <= 90 ){
      this.interpretacion = "Reserva proteica normal";
      this.estado = "reservanormal";
    }
    if ( final >= 91 ){
      this.interpretacion = "Reserva proteica alta";
      this.estado = "reservaalta";
    }

    var resultados = {
      nivel: this.level.charAt(0).toUpperCase() + this.level.slice(1),
      titulo: 'Evaluación: Área muscular del brazo',
      evaluacion: this.interpretacion,
      img: 'area_muscular\\' + this.level + '_' + this.estado + '.png',
      recomendacion: 'Realizar evaluación en 3 momentos (inicio, intermedio y final del ciclo escolar).',
    };

    var modalPage = this.modalCtrl.create('ResultadosPage', { data: resultados } ); 
    modalPage.present(); 
    this.crearform(); //Se vuelve a llamar a la función del formulario.

  }

  //Procolo
  perimetro(){

    var slider = [
      {
        titulo: "Perímetro del brazo",
        texto: "<strong>Definición:</strong><br>La circunferencia braquial(CB), también llamada perímetro o circunferencia de brazo relajado, es una medida antropométrica que,...",
        imagen: "assets/imgs/perimetro_brazo/perimetro1.png",
      },
      {
        titulo: "",
        texto: "... en combinación con la determinación de pliegues cutáneos como el pliegue tricipital son indicadores de masa magra o muscular que permiten estimar la composición corporal del individuo.",
        imagen: "assets/imgs/perimetro_brazo/perimetro2.png",
      },
      {
        titulo: "",
        texto: "<strong>Instrumento:</strong><br>Cinta métrica <br><br> <strong>Unidad de medida:</strong><br>Centímetros(cm)",
        imagen: "assets/imgs/sprotocolo/book.png",
      },
      {
        titulo: "",
        texto: "<strong>Determinación:</strong><br>Marca media del brazo, se localiza el punto medio del brazo, flexionando el brazo hasta formar un ángulo de 90°. El medido se coloca tras el sujeto y se marca el punto medio de la longitud del brazo, localizando el acromion y el extremo distal del húmero a nivel del codo.",
        imagen: "assets/imgs/perimetro_brazo/perimetro3.png",
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

  //Procolo
  ptricipital(){

    var slider = [
      {
        titulo: "Pliegue Tricipital",
        texto: "<strong>Definición:</strong><br>Doble capa de piel y tejido adiposo sub- yacente, en la zona tricipital del brazo.",
        imagen: "assets/imgs/area_muscular/pliegue-tricipital.png",
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

  amb(){

    var slider = [
      {
        titulo: "Área muscular del brazo",
        texto: "<strong>Definición:</strong><br>Es una medida antropométrica que, en combinación con la determinación de pliegues cutáneos como el pliegue tricipital, son indicadores de masa magra o muscular que permiten estimar la composición corporal del individuo.",
        imagen: "assets/imgs/area_muscular/perimetrodebrazo.png",
      },
      {
        titulo: "",
        texto: "<strong>Instrumento:</strong><br>Cinta métrica <br><br> <strong>Unidad de medida:</strong><br>Calculadora del área muscular del brazo (AMB)",
        imagen: "assets/imgs/sprotocolo/book.png",
      },
      {
        titulo: "",
        texto: "<strong>Determinación:</strong><br>Medir el Perímetro del brazo relajado PB (cm) y el pliegue cutáneo tricipital PT (cm) se mide con el niño de pie el brazo debe estar relajado a lo largo del cuerpo y con las palmas hacia adelante alrededor del brazo en el punto donde se había hecho la marca. ",
        imagen: "assets/imgs/sprotocolo/determinacion.png",
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

}
