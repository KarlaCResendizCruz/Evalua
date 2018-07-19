import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';


@IonicPage()
@Component({
  selector: 'page-somatotipo',
  templateUrl: 'somatotipo.html',
})
export class SomatotipoPage {

  nivel:any;      //Objeto recibido por parametros, guarda el nivel escolar
  edades:any = [];    //array de edades dependiendo el nivel escolar
  //Varibles para las operaciones
  datos:FormGroup; //Creación de un objeto del tipo FormGroup

  item:any = {
    gender:''
  }

  constructor(

    public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private fbuilder: FormBuilder,
  ) {

    this.nivel = this.navParams.get('data'); //Parametros recibidos de la vista anterior
    this.crearform(); //Se llama a la función desde el inicio de mi vista
  }

  crearform() {
    //Validación del formulario
    this.datos = this.fbuilder.group({
      talla:['',[Validators.required,
        Validators.minLength(2),
        Validators.maxLength(6),
        Validators.pattern(/^[0-9]+(.[0-9]+)?$/)]],
      peso:['',[Validators.required,
        Validators.minLength(2),
        Validators.maxLength(6),
        Validators.pattern(/^[0-9]+(.[0-9]+)?$/)]],
      PT:['',[Validators.required,
        Validators.minLength(2),
        Validators.maxLength(6),
        Validators.pattern(/^[0-9]+(.[0-9]+)?$/)]],
      PSUB:['',[Validators.required,
        Validators.minLength(2),
        Validators.maxLength(6),
        Validators.pattern(/^[0-9]+(.[0-9]+)?$/)]],
      PSPR:['',[Validators.required,
        Validators.minLength(2),
        Validators.maxLength(6),
        Validators.pattern(/^[0-9]+(.[0-9]+)?$/)]],
      DH:['',[Validators.required,
        Validators.minLength(2),
        Validators.maxLength(6),
        Validators.pattern(/^[0-9]+(.[0-9]+)?$/)]],
      DF:['',[Validators.required,
        Validators.minLength(2),
        Validators.maxLength(6),
        Validators.pattern(/^[0-9]+(.[0-9]+)?$/)]],
      PP:['',[Validators.required,
        Validators.minLength(2),
        Validators.maxLength(6),
        Validators.pattern(/^[0-9]+(.[0-9]+)?$/)]],
      PB:['',[Validators.required,
        Validators.minLength(2),
        Validators.maxLength(6),
        Validators.pattern(/^[0-9]+(.[0-9]+)?$/)]],
      PDP:['',[Validators.required,
        Validators.minLength(2),
        Validators.maxLength(6),
        Validators.pattern(/^[0-9]+(.[0-9]+)?$/)]],
    });
  }

  ionViewDidLoad(){

  }
   

  calcular() {

    var talla = Number(this.datos.value.talla);
    var peso = Number(this.datos.value.peso);
    var ptricipital = Number(this.datos.value.PT);
    var psubescapular = Number(this.datos.value.PSUB);
    var psupraepinal = Number(this.datos.value.PSPR);
    var dhumero = Number(this.datos.value.DH);
    var dfemur = Number(this.datos.value.DF);
    var ppantorrilla = Number(this.datos.value.PP);
    var pbrazo = Number(this.datos.value.PB);
    var pdpantorrilla = Number(this.datos.value.PDP);
    var iendomorfismo, imesomorfismo, iectomorfismo;

    //Cálculo de Endomorfismo
    //Suma de pliegues en mm y división de constante entre la talla
    var suma_endo = ((ptricipital/0.1) + (psubescapular/0.1) + (psupraepinal/0.1)) * (170.18/talla);
    var endomorfismo = - 0.7182 + (0.1451 * suma_endo) - (0.00068 * (Math.pow(suma_endo,2))) +(0.0000014 * (Math.pow(suma_endo,3)));

    //Clasificación del Endomorfismo y características (adiposidad relativa)
    if ( endomorfismo >= 1 && endomorfismo < 3){
      iendomorfismo = "Baja adiposidad relativa para grasa subcutánea: contornos musculares y ojos visibles.";
    }
    else if ( endomorfismo >= 3 && endomorfismo < 5){
      iendomorfismo = "Moderada adiposidad relativa: la grasa subcutánea cubre los contornos musculares y oseos: aparienecia más blanda.";
    }
    else if ( endomorfismo >= 5 && endomorfismo < 7){
      iendomorfismo = "Alta adiposidad relativa; grasa subcutánea abundante; redondez en tronco y extremidades; mayor acumulación de grasa en abdomen.";
    }
    else if ( endomorfismo >= 7 && endomorfismo <= 8.5){
      iendomorfismo = "Extremadamente alta adiposidad relativa: muy abundante grasa subcutánea; grandes cantidades de grasa abdominal en el tronco; concentración próximal de grasa en extremidades.";
    }
    else if ( endomorfismo <=0.9 || endomorfismo > 8.5) {
      iendomorfismo ="Sin interpretación, posible error en ingreso de datos."
    }

    //Cálculo del Mesomorfismo

    var PBC = pbrazo - ptricipital;
    var PPC = pdpantorrilla - (ppantorrilla/10);

    var mesomorfismo = (0.858 * dhumero + 0.601 * dfemur + 0.188 * PBC + 0.161 * PPC) - (talla * 0.131) + 4.5;

    //Clasificación del Mesomorfismo y características (robustez o prevalencia musculo esquelética, relativa a la altura)

    if ( mesomorfismo >= 1 && mesomorfismo < 3){
      imesomorfismo = "Bajo desarrollo musculoesquelético relativo: diamétros óseos estrechos; diámetros musculares estrechos; pequeñas articulaciones en extremidades.";
    }
    else if ( mesomorfismo >= 3 && mesomorfismo < 5){
      imesomorfismo = "Moderado desarrollo musculoesquelético relativo; mayor volumen muscular y huesos y articulaciones de mayores dimensiones.";
    }
    else if ( mesomorfismo >= 5 && mesomorfismo < 7){
      imesomorfismo = "Alto desarrollo musculoesquelético relativo; diámetros óseos grandes; músculos de gran volumen; articulaciones grandes.";
    }
    else if ( mesomorfismo >= 7 && mesomorfismo <= 8.5){
      imesomorfismo = "Desarrollo musculoesquelético relativo extremadamente alto; músculos muy voluminosos; esqueleto y articulaciones muy grandes.";
    }
    else if( mesomorfismo <=0.9 || mesomorfismo > 8.5){
      imesomorfismo = "Sin interpretación, posible error en ingreso de datos."
    }

    //Cálculo del Ectomorfismo
    var cubico = (1/3);
    var IP = ( talla / Math.pow(peso,cubico));
    var ectomorfismo;

    if ( IP >= 40.75 ){ 
      ectomorfismo = (0.732 * IP) - 28.58;
    }
    else if ( IP > 38.25 && IP < 40.75 ){ 
      ectomorfismo = (0.463 * IP) - 17.63;
    }
    else if ( IP <= 38.25 ){
      ectomorfismo = 0.1;
    }

    if ( ectomorfismo >= 1 && ectomorfismo < 3){
      iectomorfismo = "Linearidad relativa, gran volumen por unidad de altura; “redondo” como una pelota; extremidades relativamente voluminosas.";
    }
    else if ( ectomorfismo >= 3 && ectomorfismo < 5){
      iectomorfismo = "Linearidad moderada: menos volumen por unidad de altura; mas estirado.";
    }
    else if ( ectomorfismo >= 5 && ectomorfismo < 7){
      iectomorfismo = "Linearidad relativa moderada; poco volumen por unidad de altura.";
    }
    else if ( ectomorfismo >= 7 && ectomorfismo <= 9){
      iectomorfismo = "Lineraidad relativa extremedamente alta; muy estirado; delgado como lápiz; volumen mínimo por unidad de altura.";
    }
    else if( ectomorfismo <=0.9 || ectomorfismo > 8.5){
      iectomorfismo = "Sin interpretación, posible error en ingreso de datos."
    }

    //Somatocarta
    var X =  ectomorfismo - endomorfismo;
    var Y = (2 * mesomorfismo) - (endomorfismo + ectomorfismo);


    var somatocarta = {
      resul1: endomorfismo.toFixed(2),
      interpretacion1: iendomorfismo,
      resul2: mesomorfismo.toFixed(2),
      interpretacion2: imesomorfismo,
      resul3: ectomorfismo.toFixed(2),
      interpretacion3: iectomorfismo,
      coordenadax: X,
      coordenaday: Y,
    };

    var modalPage = this.modalCtrl.create('SomatocartaPage',{ data: somatocarta }); 
    
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

  psubescapular(){

    var slider = [
      {
        titulo: "Pliegue Subescapular",
        texto: "<strong>Definición:</strong><br>Doble capa de piel y tejido adiposo subyacente, en la zona subescapular de la espalda.",
        imagen: "assets/imgs/somatotipo/subescapular.png",
      },
      {
        titulo: "",
        texto: "<strong>Instrumento:</strong><br>Compás de pliegues cutáneos <br><br> <strong>Unidad de medida:</strong><br>Milímetros (mm)",
        imagen: "assets/imgs/sprotocolo/book.png",
      },
      {
        titulo: "",
        texto: "<strong>Determinación:</strong><br>Persona en posición erecta, mirando hacia el frente, en bipedestación, con el peso distribuido equitativamente en ambos pies.",
        imagen: "assets/imgs/sprotocolo/determinacion.png",
      },
      {
        titulo: "",
        texto: "<strong>Marca subescapular:</strong><br>En el ángulo inferior de la escápula, en dirección oblicua hacia abajo y hacia fuera, formando un ángulo de 45º con la horizontal. Para realizar esta medida, se palpa el ángulo inferior de la escápula con el pulgar izquierdo, en este punto se hace coincidir el dedo índice y se desplaza hacia abajo el dedo pulgar, rotándolo ligeramente en sentido horario, para así tomar el pliegue en la dirección descrita.",
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

  psupraespinal(){

    var slider = [
      {
        titulo: "Pliegue Supraespinal",
        texto: "<strong>Definición:</strong><br>Doble capa de piel y tejido adiposo subyacente, en la zona subescapular de la espalda.",
        imagen: "assets/imgs/somatotipo/subescapular.png",
      },
      {
        titulo: "",
        texto: "<strong>Instrumento:</strong><br>Compás de pliegues cutáneos <br><br> <strong>Unidad de medida:</strong><br>Milímetros (mm)",
        imagen: "assets/imgs/sprotocolo/book.png",
      },
      {
        titulo: "",
        texto: "<strong>Determinación:</strong><br>Persona en posición erecta, mirando hacia el frente, en bipedestación, con el peso distribuido equitativamente en ambos pies.",
        imagen: "assets/imgs/sprotocolo/determinacion.png",
      },
      {
        titulo: "",
        texto: "<strong>Marca subescapular:</strong><br>En el ángulo inferior de la escápula, en dirección oblicua hacia abajo y hacia fuera, formando un ángulo de 45º con la horizontal. Para realizar esta medida, se palpa el ángulo inferior de la escápula con el pulgar izquierdo, en este punto se hace coincidir el dedo índice y se desplaza hacia abajo el dedo pulgar, rotándolo ligeramente en sentido horario, para así tomar el pliegue en la dirección descrita.",
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

  pbrazo(){

    var slider = [
      {
        titulo: "Perímetro del brazo",
        texto: "<strong>Definición:</strong><br>La circunferencia braquial(CB), también llamada perímetro o circunferencia de brazo relajado, es una medida antropométrica que,...",
        imagen: "assets/imgs/somatotipo/pbrazo.png",
      },
      {
        titulo: "",
        texto: "... en combinación con la determinación de pliegues cutáneos como el pliegue tricipital son indicadores de masa magra o muscular que permiten estimar la composición corporal del individuo.",
        imagen: "assets/imgs/somatotipo/pbrazo.png",
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


}
