import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@IonicPage()
@Component({
  selector: 'page-cintura',
  templateUrl: 'cintura.html',
})

export class CinturaPage {


  //Varibles para las operaciones
  // genero:string; //variable de genero
  interpretacion:string = '';
  descripcion:string = '';
  datos:FormGroup; //Creación de un objeto del tipo FormGroup

  item:any = {
    gender:''
  }

    constructor(

        public navCtrl: NavController, 
        public navParams: NavParams,
        public alertCtrl: AlertController,
        private fbuilder:FormBuilder
      ) {
        this.crearform(); //Se llama a la función desde el inicio de mi vista
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
      });
    }

    ionViewDidLoad(){
    }
     

    calcular() {

      var PCT =  Number(this.datos.value.cintura) /  Number(this.datos.value.talla);
      
      //Comparaciones , obtiene el resultado a mostrar dependiendo la desviación
      if ( PCT >= 0.50){
        this.interpretacion = "Riesgo cardiometabólico";
      }
      else{
        this.interpretacion = "Sin Riesgo Cardiometabólico";
      }
  
      
      //Alert con el resultado a mostrar
      const alert = this.alertCtrl.create({
        title: '¡ ' + this.interpretacion + " !",
        subTitle: 'El perimetro es: ' + PCT.toFixed(2),
        buttons: ['Aceptar']
      });
      alert.present();
      this.crearform(); //Se vuelve a llamar a la función del formulario.

    }

}
