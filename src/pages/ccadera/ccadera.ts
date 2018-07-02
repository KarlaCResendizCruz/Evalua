import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@IonicPage()
@Component({
  selector: 'page-ccadera',
  templateUrl: 'ccadera.html',
})
export class CcaderaPage {

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
        genero:['',[Validators.required]],
        CCINT:['',[Validators.required,
          Validators.minLength(2),
          Validators.maxLength(6),
          Validators.pattern(/^[0-9]+(.[0-9]+)?$/)]],
        CCAD:['',[Validators.required,
          Validators.minLength(2),
          Validators.maxLength(6),
          Validators.pattern(/^[0-9]+(.[0-9]+)?$/)]],
      });
    }

    ionViewDidLoad(){

    }
     

    calcular() {

      if (this.datos.value.genero == 'femenino'){
        var indicador = 0.8;
      }
      if (this.datos.value.genero == 'masculino'){
         indicador = 1;
      }
      var ICC =  Number(this.datos.value.CCINT) /  Number(this.datos.value.CCAD);
      
      //Comparaciones , obtiene el resultado a mostrar dependiendo la desviación
      if ( ICC >= indicador){
        this.interpretacion = "Riesgo creciente de enfermedad cardiaca coronaria";
      }
      else{
        this.interpretacion = "Sin Riesgo creciente de enfermedad cardiaca coronaria";
      }
  
      
      //Alert con el resultado a mostrar
      const alert = this.alertCtrl.create({
        title: '¡ ' + this.interpretacion + " !",
        subTitle: 'El perimetro es: ' + ICC.toFixed(2),
        buttons: ['Aceptar']
      });
      alert.present();
      this.crearform(); //Se vuelve a llamar a la función del formulario.

    }

}
