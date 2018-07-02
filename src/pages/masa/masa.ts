import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-masa',
  templateUrl: 'masa.html',
})
export class MasaPage {

  //Varibles para las operaciones
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
      ptriceps:['',[Validators.required,
        Validators.minLength(2),
        Validators.maxLength(6),
        Validators.pattern(/^[0-9]+(.[0-9]+)?$/)]],
      pmuslo:['',[Validators.required,
        Validators.minLength(2),
        Validators.maxLength(6),
        Validators.pattern(/^[0-9]+(.[0-9]+)?$/)]],
      psuprailiaco:['',[Validators.required,
        Validators.minLength(2),
        Validators.maxLength(6),
        Validators.pattern(/^[0-9]+(.[0-9]+)?$/)]],
      ptorax:['',[Validators.required,
        Validators.minLength(2),
        Validators.maxLength(6),
        Validators.pattern(/^[0-9]+(.[0-9]+)?$/)]], 
      pabdomen:['',[Validators.required,
        Validators.minLength(2),
        Validators.maxLength(6),
        Validators.pattern(/^[0-9]+(.[0-9]+)?$/)]],
      years:[0,[Validators.required]],
    });
  }

  ionViewDidLoad(){

  }

  calcular() {

    // Suma de años(meses) y meses del formuario
    var X2 = Number(this.datos.value.years);
    var comparador = this.datos.value.genero;
    var P1 = Number(this.datos.value.ptriceps); 
    var P2 = Number(this.datos.value.pmuslo);
    var P3 = Number(this.datos.value.psuprailiaco);
    var P4 = Number(this.datos.value.ptorax);
    var P5 = Number(this.datos.value.pabdomen);
    var DC, NR, B, L, S, X1;

    if( comparador = 'femenino' ){
      X1 = (P1 + P2) + P3;
      DC = 1.0994921 - 0.0009929*(X1) + 0.000023 * (Math.pow(X2,2)) - (0.0001392*X2);
      NR = 12;
      B = 15;
      L = 30;
      S = 36;
      console.log('condicional femenino');
    }

    else if( comparador = 'masculino' ){
      X1 = P4 + P5 + P2;
      DC = 1.10938 - 0.0008267*X1 + 0.0000016 * (Math.pow(X1,2)) - (0.0002574*X2);
      NR = 5;
      B = 10;
      L = 25;
      S = 31;
      console.log('condicional masculino');
    }

    var MG = ((4.95/ DC) - 4.5) * 100;

    
    //Comparaciones , obtiene el resultado a mostrar dependiendo la desviación
    if ( MG < NR ){
      this.interpretacion = "Muy bajo";
    }
    if ( MG >= NR && MG <= B){
      this.interpretacion = "Bajo";
    }
    if ( MG > B && MG <= L){
      this.interpretacion = "Leve";
    } 
    if ( MG > L && MG <= S){
      this.interpretacion = "Superior";
    }
    if ( MG > S){
      this.interpretacion = 'Obesidad';
    }
    // console.log(this.datos.value.genero);
    // console.log(this.datos.value.genero);
    // console.log(this.datos.value.genero);
    console.log(P1);
    console.log(P2);
    console.log(P3);
    console.log(this.datos.value.genero);
    console.log(X1);
    console.log(DC);
    console.log(MG);
    
    //Alert con el resultado a mostrar
    const alert = this.alertCtrl.create({
      title: '¡ ' + this.interpretacion + " !",
      subTitle: 'El IMC es: ' + MG.toFixed(2),
      buttons: ['Aceptar']
    });
    alert.present();
    this.crearform(); //Se vuelve a llamar a la función del formulario.

  }



}
