import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { SizeProvider } from '../../providers/size/size';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@IonicPage()
@Component({
  selector: 'page-talla',
  templateUrl: 'talla.html',
})

export class TallaPage {

  
  nivel:any;      //Objeto recibido por parametros, guarda el nivel escolar
  edades:any = [];    //array de edades dependiendo el nivel

  //Objeto del API Rest
  medida_talla;

  //Varibles para las operaciones

  suma_edad:number; //Variable de años y meses
  medidas:any;    //Variable vector de las medidas
  desviaciones:any;  //Vector, desviaciones de la talla
  restas:any = [7];     //Vector, contiene las restas de la medida de talla menos talla ingresada
  absolutos:any = [7];  //Vector, valores absolutos del residuo anterior
  minimo:number = 0;    //Acumulador, valor minimo

  datos:FormGroup; //Creación de un objeto del tipo FormGroup

  interpretacion:string = ''; //interpretación a mostrar
  descripcion:string = ''; //descripción a mostrar


  item:any = {
    gender:''
  }

  letra:string = '';
  level:string = '';
  estado:string = '';
    constructor(

        public navCtrl: NavController, 
        public navParams: NavParams, 
        public tallaprovider: SizeProvider,
        public modalCtrl: ModalController,
        private fbuilder:FormBuilder
      ) {

        this.nivel = this.navParams.get('data');

        if(this.nivel == "Preescolar"){
          this.edades = [ 3, 4, 5, 6 ]
          this.level = 'pre';
        }

        else if(this.nivel == "Primaria"){
          this.edades = [ 6, 7, 8, 9, 10, 11, 12 ]
          this.level = 'pri';
        }

        else if(this.nivel == "Secundaria"){
          this.edades = [ 12, 13, 14, 15 ]
          this.level = 's';
        }

        else if(this.nivel == "Preparatoria"){
          this.edades = [ 16, 17]
          this.level = 'p';
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
        years:[this.edades[0],[Validators.required]],
        meses:[0,[Validators.required]],
      });
    }

    cambiogenero(){

      //Consulta API dependiendo el genero
      this.item.gender = this.datos.value.genero;
      this.tallaprovider.getSize(this.item.gender)
      .subscribe(
        (data) => {
          this.medida_talla = data;
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
      // Suma de años(meses) y meses del formuario
      this.suma_edad = (Number(this.datos.value.years) * 12) + Number(this.datos.value.meses);
      
      //Ciclo para obtener valores correspondientes a la talla
      for (let desviacion of this.medida_talla) {
        if( desviacion.id == this.suma_edad){ //Busqueda de meses en tabla

          //Arreglo, se guardan los valores de las medidas en desviación -3,-2,-1,0,1,2,3
          this.medidas = [
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
     
      //Ciclo, recorrer todas la medidas de una sola edad en meses
      for (var i = 0; i < (this.medidas).length; i++) {
        //Vector, se guarda en un nuevo vector e residuo de la tallas de la desviación y talla ingresada
        this.restas[i] =  Number(this.datos.value.talla) - this.medidas[i];
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
        this.interpretacion = "Talla baja severa";
        this.estado = 'bajo';
      }
      if ( final == -2){
        this.interpretacion = "Talla baja";
        this.estado = 'bajo';
      }
      if ( final == -1 || final == 0 || final == 1 || final == 2){
        this.interpretacion = "Talla normal";
        this.estado = 'medio';
      } 
      if ( final == 3){
        this.interpretacion = "Talla muy alta";
        this.estado = 'alto';
      }
         
      var resultados = {
        nivel: this.nivel,
        titulo: 'Evaluación: Talla',
        evaluacion: this.interpretacion,
        img: 'talla\\' + this.level + this.letra + '_' + this.estado + '.png',
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

}
