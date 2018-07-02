import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
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

    constructor(

        public navCtrl: NavController, 
        public navParams: NavParams, 
        public tallaprovider: SizeProvider,
        public alertCtrl: AlertController,
        private fbuilder:FormBuilder
      ) {
        this.crearform(); //Se llama a la función desde el inicio de mi vista
        this.nivel = this.navParams.get('data');

        if(this.nivel == "Preescolar"){
          this.edades = [ 3, 4, 5, 6 ]
        }

        else if(this.nivel == "Primaria"){
          this.edades = [ 6, 7, 8, 9, 10, 11, 12 ]
        }

        else if(this.nivel == "Secundaria"){
          this.edades = [ 12, 13, 14, 15 ]
        }

        else if(this.nivel == "Preparatoria"){
          this.edades = [ 16, 17]
        }

    }
    

    crearform() {
      //Validación del formulario
      this.datos = this.fbuilder.group({
        genero:['',[Validators.required]],
        talla:['',[Validators.required,
          Validators.minLength(2),
          Validators.maxLength(6),
          Validators.pattern(/^[0-9]+(.[0-9]+)?$/)]],
        years:[0,[Validators.required]],
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
      }
      if ( final == -2){
        this.interpretacion = "Talla baja";
      }
      if ( final == -1 || final == 0 || final == 1 || final == 2){
        this.interpretacion = "Talla normal";
      } 
      if ( final == 3){
        this.interpretacion = "Talla muy alta";;
      }
      
      //Alert con el resultado a mostrar
      const alert = this.alertCtrl.create({
        title: '¡ ' + this.interpretacion + " !",
        subTitle: 'Este es el resultado',
        buttons: ['Aceptar']
      });

      alert.present();
      this.crearform(); //Se vuelve a llamar a la función del formulario.

    }

}
