import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { PerimeterProvider } from '../../providers/perimeter/perimeter';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@IonicPage()
@Component({
  selector: 'page-perimetro',
  templateUrl: 'perimetro.html',
})
export class PerimetroPage {


  //Objeto del API Rest
  medida_perimetros;

  //Varibles para las operaciones
 // genero:string; //variable de genero
  suma_edad:number; //Variable de años y meses
  perimetros:any;    //Variable vector de las medidas
  desviaciones:any;  //Vector, desviaones de la talla
  restas:any = [7];     //Vector, contiene las restas de medida talla menos talla ingresada
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
        public perimetroprovider: PerimeterProvider,
        public alertCtrl: AlertController,
        private fbuilder:FormBuilder
      ) {
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
        years:[2,[Validators.required]],
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
      
      //Ciclo para obtener valores correspondientes a la talla
      for (let desviacion of this.medida_perimetros) {
        if( desviacion.id == this.suma_edad){ //Busqueda de meses en tabla

          //Arreglo donde se guardan los valores de las medidas, desviación -3,-2,-1,0,1,2,3
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
     
      //Ciclo, recorrer todas la medidas de una sola edad en meses
      for (var i = 0; i < (this.perimetros).length; i++) {
        //Vector, se guarda en un nuevo vector e residuo de la tallas de la desviación y talla ingresada
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
      }
      if ( final >= -1){
        this.interpretacion = "Sin Desnutrición";
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
