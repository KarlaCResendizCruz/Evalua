import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { PerimeterProvider } from '../../providers/perimeter/perimeter';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@IonicPage()
@Component({
  selector: 'page-perimetro',
  templateUrl: 'perimetro.html',
})
export class PerimetroPage {

  eneable_preescolar:boolean = false; //Deshabilita secciones si el nivel de preeescolar esta activo
  eneable_alllevel:boolean = true; //Se Habilita el contenido para los demás niveles

  nivel:any;      //Objeto recibido por parametros, guarda el nivel escolar
  edades:any = [];    //array de edades dependiendo el nivel escolar

  //Objeto del API Rest
  medida_perimetros;

  //Varibles para las operaciones
  suma_edad:number; //Variable de años y meses
  perimetros:any;    //Variable vector de las medidas
  desviaciones:any;  //Vector, desviaciones de perímetros
  restas:any = [7];     //Vector, contiene las restas de perímetros menos perímetro ingresado
  absolutos:any = [7];  //Vector, valores absolutos
  minimo:number = 0;
  interpretacion:string = '';
  descripcion:string = '';
  datos:FormGroup; //Creación de un objeto del tipo FormGroup

  item:any = {
    gender:''
  }

  imagen:string = '';
  level:string = '';
  estado:string = '';

    constructor(

        public navCtrl: NavController, 
        public navParams: NavParams, 
        public perimetroprovider: PerimeterProvider,
        private fbuilder:FormBuilder,
        public modalCtrl: ModalController,

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
    

        this.crearform(); //Se llama a la función desde el inicio de mi vista
    }

    crearform() {
      //Validación del formulario
      this.datos = this.fbuilder.group({
        genero:['',[Validators.required]],
        perimetro:['',[Validators.required,
          Validators.minLength(2),
          Validators.maxLength(6),
          Validators.pattern(/^[0-9]+(.[0-9]+)?$/)]],
        years:[this.edades[0],[Validators.required]],
        meses:[0,[Validators.required]],
      });
    }

    cambiogenero(){
      this.item.gender = this.datos.value.genero;
      this.perimetroprovider.getPerimetro(this.item.gender)
      .subscribe(
        (data) => {
          this.medida_perimetros = data;
        }, (error) => {
          console.log(error);
        }
      )
    }

    ionViewDidLoad(){

    }
     

    calcular() {
      // Suma de años(meses) y meses del formuario
      this.suma_edad = (Number(this.datos.value.years) * 12) + Number(this.datos.value.meses);
      
      //Ciclo para obtener valores correspondientes al perímetro del brazo
      for (let desviacion of this.medida_perimetros) {
        if( desviacion.id == this.suma_edad){ //Busqueda de meses en tabla

          //Arreglo donde se guardan los valores de los perímetros, desviación -3,-2,-1,0,1,2,3
          this.perimetros = [
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
     
      //Ciclo, recorrer todas los perímetros de una sola edad
      for (var i = 0; i < (this.perimetros).length; i++) {
        //Vector, se guarda en un nuevo vector de residuos de los perímetros obtenidos y el ingresado
        this.restas[i] =  Number(this.datos.value.perimetro) - this.perimetros[i];
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
      if ( final == -3 || final == -2){
        this.interpretacion = "Desnutrición";
        this.imagen = "desnutricion";
      }
      if ( final >= -1){
        this.interpretacion = "Sin Desnutrición";
        this.imagen = "sindesnutricion";
      } 
      
      var resultados = {
        nivel:  this.level.charAt(0).toUpperCase() + this.level.slice(1),
        titulo: 'Evaluación: Perímetro del brazo',
        evaluacion: this.interpretacion,
        img: 'perimetro_brazo\\preescolar_' + this.imagen + '.png',
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

        
}
