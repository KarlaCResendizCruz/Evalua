import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { WeightProvider } from '../../providers/weight/weight';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@IonicPage()
@Component({
  selector: 'page-peso',
  templateUrl: 'peso.html',
})
export class PesoPage {


    nivel:any;      //Objeto recibido por parametros, guarda el nivel escolar
    edades:any = [];    //array de edades dependiendo el nivel

    //Objeto del API Rest
     medida_peso;

     //Varibles para las operaciones
     genero:string; //variable de genero
     suma_edad:number; //Variable de años y meses
     pesos:any;    //Vector de peso
     desviaciones:any;  //Vector, desviaciones del peso
     restas:any = [7];     //Vector, contiene las restas de medida del peso menos peso ingresado
     absolutos:any = [7];  //Vector, valores absolutos
     minimo:number = 0;
     interpretacion:string = '';
     descripcion:string = '';

     datos:FormGroup; //Creación de un objeto del tipo FormGroup

     item:any = {
       gender:''
     }

    constructor(

        public navCtrl: NavController, 
        public navParams: NavParams, 
        public weightprovider: WeightProvider,
        public alertCtrl: AlertController,
        private fbuilder:FormBuilder
      ) {
       this.crearform(); //Se llama a la función desde el inicio de mi vista
       this.nivel = this.navParams.get('data');

       if(this.nivel == "Preescolar"){
         this.edades = [ 3, 4, 5, 6 ]
       }

       else if(this.nivel == "Primaria"){
         this.edades = [ 6, 7, 8, 9, 10 ]
       }

    }

    crearform() {
      //Validación del formulario
      this.datos = this.fbuilder.group({
        genero:['',[Validators.required]],
        peso:['',[Validators.required,
          Validators.minLength(2),
          Validators.maxLength(6),
          Validators.pattern(/^[0-9]+(.[0-9]+)?$/)]],
        years:[2,[Validators.required]],
        meses:[0,[Validators.required]],
      });
    }

    cambiogenero(){
      this.item.gender = this.datos.value.genero;
      this.weightprovider.getWeight(this.item.gender)
      .subscribe(
        (data) => {
          this.medida_peso = data;
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
      
      //Ciclo para obtener valores correspondientes al peso
      for (let desviacion of this.medida_peso) {
        if( desviacion.id == this.suma_edad){ //Busqueda de meses en tabla

          //Arreglo donde se guardan los valores de las medidas, desviación -3,-2,-1,0,1,2,3
          this.pesos = [
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
      for (var i = 0; i < (this.pesos).length; i++) {
        //Vector, se guarda en un nuevo vector el residuo de los pesos de la desviación y peso ingresado
        this.restas[i] =  Number(this.datos.value.peso) - this.pesos[i];
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
        this.interpretacion = "Peso bajo severo";
      }
      if ( final == -2){
        this.interpretacion = "Peso bajo";
      }
      if ( final == -1 || final == 0){
        this.interpretacion = "Peso normal";
      }
      if ( final == 1){
        this.interpretacion = "Riesgo de sobrepeso";
      }
      if ( final == 2){
        this.interpretacion = "Sobrepeso";
      }
      if ( final == 3){
        this.interpretacion = "Problema de crecimiento";;
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
