import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { ImcProvider } from '../../providers/imc/imc';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@IonicPage()
@Component({
  selector: 'page-imc',
  templateUrl: 'imc.html',
})
export class ImcPage {

  eneable_preescolar:boolean = false; //Deshabilita secciones si el nivel de preeescolar esta activo
  eneable_alllevel:boolean = true; //Se Habilita el contenido para los demás niveles

  nivel:any;      //Objeto recibido por parametros, guarda el nivel escolar
  edades:any = [];    //array de edades dependiendo el nivel escolar

  //Objeto del API Rest
  medida_imc;

  //Varibles para las operaciones
  suma_edad:number; //Variable de años y meses
  indices:any;    //Variable vector de las medidas
  desviaciones:any;  //Vector, desviaones de estandar del imc
  restas:any = [7];     //Vector, contiene las restas del imc de la tabla menos imc cálculado
  absolutos:any = [7];  //Vector, valores absolutos
  minimo:number = 0;
  interpretacion:string = '';
  descripcion:string = '';
  datos:FormGroup; //Creación de un objeto del tipo FormGroup


  //Arreglo , se guarda el género seleccionado
  item:any = {
    gender:''
  }  

  letra:string = '';
  level:string = '';
  estado:string = '';

  constructor(

    public navCtrl: NavController, 
    public navParams: NavParams, 
    public imcprovider: ImcProvider,
    public modalCtrl: ModalController,
    private fbuilder:FormBuilder

  ) {

    this.nivel = this.navParams.get('data'); //Parametros recibidos de la vista anterior

    //Habilita las edades correspondientes a cada nivel
    if( this.nivel == "Preescolar" || this.nivel == "Preescolar1" ){
      this.edades = [ 3, 4];
      this.eneable_preescolar = true;
      this.eneable_alllevel = false;
      this.level = "preescolar";
      
    }

    else if( this.nivel == "Preescolar2" ){
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
      talla:['',[Validators.required,
        Validators.minLength(2),
        Validators.maxLength(6),
        Validators.pattern(/^[0-9]+(.[0-9]+)?$/)]],
      peso:['',[Validators.required,
        Validators.minLength(2),
        Validators.maxLength(6),
        Validators.pattern(/^[0-9]+(.[0-9]+)?$/)]],
      years:[this.edades[0],[Validators.required]],
      meses:[0,[Validators.required]],
    });
  }

  cambiogenero(){
    this.item.gender = this.datos.value.genero;
    this.imcprovider.getIMC(this.item.gender)
    .subscribe(
      (data) => {
        this.medida_imc = data;
      }, (error) => {
        console.log(error);
      }
    )

    if( this.datos.value.genero == 'femenino'){
      this.letra = 'f';
    }
    else if( this.datos.value.genero == 'masculino'){
      this.letra = 'm';
    }
    
  }

  ionViewDidLoad(){

  }
   

  calcular() {

    console.log(this.medida_imc);
    // Suma de años(meses) y meses del formuario
    this.suma_edad = (Number(this.datos.value.years) * 12) + Number(this.datos.value.meses);
    
    //Ciclo para obtener valores correspondientes a la talla
    for (let desviacion of this.medida_imc) {
      if( desviacion.id == this.suma_edad){ //Busqueda de meses en tabla

        //Arreglo donde se guardan los valores de las medidas, desviación -3,-2,-1,0,1,2,3
        this.indices = [
          Number(desviacion.dm3),
          Number(desviacion.dm2),
          Number(desviacion.dm1),
          Number(desviacion.media), 
          Number(desviacion.d1),
          Number(desviacion.d2),
          Number(desviacion.d3)
        ];
        //Arreglo donde se guardan las desviaciónes -3,-2,-1,0,1,2,3
        this.desviaciones = [Number(desviacion.id),-3,-2,-1,0,1,2,3];
      }
    }
   
    //conversión de centrimetros a metros
    var metros = (Number(this.datos.value.talla))/100;
    //calculo del índice de masa corporal
    var imc = (Number(this.datos.value.peso))/(Math.pow(metros,2));

    //Ciclo, recorrer todas la medidas de una sola edad en meses
    for (var i = 0; i < (this.indices).length; i++) {
      //Vector, se guarda en un nuevo vector e residuo de la tallas de la desviación y talla ingresada
      this.restas[i] =  imc - this.indices[i];
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
    var final = this.desviaciones[indice + 1]; //Busqueda del tipo de desviación
    
    //Comparaciones , obtiene el resultado a mostrar dependiendo la desviación
    if ( final == -3){
      this.interpretacion = "Delgadez severa";
      this.estado = 'delgadezsevera';
    }
    if ( final == -2){
      this.interpretacion = "Delgadez";
      this.estado = 'delgadez';
    }
    if ( final == -1 || final == 0 || final == 1){
      this.interpretacion = "Normal";
      this.estado = 'normal';
    } 
    if ( final == 2){
      this.interpretacion = "Sobrepeso";
      this.estado = 'sobrepeso';
    }
    if ( final == 3){
      this.interpretacion = 'Obesidad';
      this.estado = 'obesidad';
    }
    
    var resultados = {
      nivel: this.level.charAt(0).toUpperCase() + this.level.slice(1),
      titulo: 'Evaluación: Índice de masa corporal',
      evaluacion: this.interpretacion + '<br> <strong> IMC: </strong>' + imc.toFixed(2) + ' kg/m<sup>2</sup>',
      img: 'imc\\' + this.level + '_' + this.estado + '.png',
      recomendacion: 'Evaluar en 3 momentos (inicio, intermedio y final del ciclo escolar)',
    };

    var modalPage = this.modalCtrl.create('ResultadosPage', { data: resultados } ); 
    modalPage.present(); 
    this.crearform(); //Se vuelve a llamar a la función del formulario.

  }

  //Procolos
  peso(){

    var slider = [
      {
        titulo: "Peso",
        texto: "<strong>Definición (a):</strong><br>Vector que tiene magnitud y dirección, y apunta aproximadamente hacia el centro de la Tierra.",
        imagen: "assets/imgs/peso/peso_protocoloa.png",
      },
      {
        titulo: "Peso",
        texto: "<strong>Definición (b):</strong><br>Fuerza con la cual un cuerpo actúa sobre un punto de apoyo, originado por la aceleración de la gravedad, cuando actúa sobre la masa del cuerpo.",
        imagen: "assets/imgs/peso/peso_protocolob.png",
      },
      {
        titulo: "",
        texto: "<strong>Instrumento:</strong><br>Báscula (balanza, pesa)<br><br> <strong>Unidad de medida:</strong><br>Kilogramo (kg)",
        imagen: "assets/imgs/sprotocolo/book.png",
      },
      {
        titulo: "",
        texto: "<strong>Determinación:</strong><br>Persona en posición erecta, con los miembros superiores a ambos lados del cuerpo, las palmas y dedos de las manos rectos y extendidos hacia abajo, mirando hacia el frente, en bipedestación, con el peso distribuido equitativamente en ambos pies.(posición de atención antropométrica).",
        imagen: "assets/imgs/sprotocolo/determinacion.png",
      },
      {
        titulo: "",
        texto: '<strong>Aplicación:</strong><br><strong>a)</strong> Descripción general del cuerpo, Valoración nutricional<br><strong>b)</strong> Tamaño de ropa y equipo de protección personal.<br><strong>c)</strong> Distribución de espacios de trabajo.',
        imagen: "assets/imgs/sprotocolo/aplicacion.png",
      }
    ];

    var modalPage = this.modalCtrl.create('SprotocoloPage', { data: slider } ); 
    modalPage.present(); 
  }

  
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

    
  imc(){
 
    var slider = [
      {
        titulo: "Índice de Masa Corporal",
        texto: "<strong>Definición:</strong><br>Es una fórmula que se calcula dividiendo el peso, expresado siempre en Kg, entre la altura, siempre en metros al cuadrado.",
        imagen: "assets/imgs/imc/primariaf_sobrepeso.png",
      },
      {
        titulo: "",
        texto: "<strong>Instrumento:</strong><br>Báscula (balanza, pesa)<br><br> <strong>Unidad de medida:</strong><br>Kilogramo (kg)<br>Metros (m<sup>2</sup>) <br> IMC = Peso (kg) / Talla (m<sup>2</sup>)",
        imagen: "assets/imgs/sprotocolo/book.png",
      },
      {
        titulo: "",
        texto: "<strong>Determinación:</strong><br>Persona en posición erecta, con los miembros superiores a ambos lados del cuerpo, las palmas y dedos de las manos rectos y extendidos hacia abajo, mirando hacia el frente, en bipedestación, con el peso distribuido equitativamente en ambos pies.(posición de atención antropométrica).",
        imagen: "assets/imgs/sprotocolo/determinacion.png",
      },
      {
        titulo: "",
        texto: '<strong>Aplicación:</strong><br><strong>a)</strong> Descripción general del cuerpo<br><strong>b)</strong> Tamaño de ropa y equipo de protección personal.<br><strong>c)</strong> Distribución de espacios de trabajo.<br>',
        imagen: "assets/imgs/sprotocolo/aplicacion.png",
      }
    ];

    var modalPage = this.modalCtrl.create('SprotocoloPage', { data: slider } ); 
    modalPage.present(); 
  }

}
