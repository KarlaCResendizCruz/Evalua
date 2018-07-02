import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AmbProvider } from '../../providers/amb/amb';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-amb',
  templateUrl: 'amb.html',
})
export class AmbPage {

  //Objeto del API Rest
  medidas_amb;

  //Varibles para las operaciones
  areas:any;    //Variable vector de áreas
  perceptiles:any;  //Vector, perceptiles del área
  restas:any = [7];     //Vector, contiene las restas del área de la tabla menos área ingresada
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
    public ambprovider: AmbProvider,
    public alertCtrl: AlertController,
    private fbuilder:FormBuilder
  ) {
    this.crearform(); //Se llama a la función desde el inicio de mi vista
  }

  crearform() {
    //Validación del formulario
    this.datos = this.fbuilder.group({
      genero:['',[Validators.required]],
      PB:['',[Validators.required,
        Validators.minLength(2),
        Validators.maxLength(6),
        Validators.pattern(/^[0-9]+(.[0-9]+)?$/)]],
      PT:['',[Validators.required,
        Validators.minLength(2),
        Validators.maxLength(6),
        Validators.pattern(/^[0-9]+(.[0-9]+)?$/)]],
      years:[2,[Validators.required]],
      meses:[0,[Validators.required]],
    });
  }

  cambiogenero(){
    this.item.gender = this.datos.value.genero;
    this.ambprovider.getAMB(this.item.gender)
    .subscribe(
      (data) => {
        this.medidas_amb = data;
      }, (error) => {
        console.log(error);
      }
    )
  }

  ionViewDidLoad(){

  }
   

  calcular() {

    //Edad del formulario
    var edad = Number(this.datos.value.years);
 
    //Ciclo para obtener valores correspondientes al área
    for (let area of this.medidas_amb) {
      if( area.years == edad){ //Busqueda de años en tabla

        //Arreglo donde se guardan los valores de las medidas, desviación -3,-2,-1,0,1,2,3
        this.areas = [
          Number(area.p5),
          Number(area.p10),
          Number(area.p15),
          Number(area.p25), 
          Number(area.p50),
          Number(area.p75),
          Number(area.p85),
          Number(area.p90),
          Number(area.p95)
        ];
        //Arreglo donde se guardan las desviaciónes 5,10,15,25,50,75,85,90,95
        this.perceptiles = [Number(area.years),5,10,15,25,50,75,85,90,95];
      }
    }
   
    var subt = ((Number(this.datos.value.PB) - Math.PI) * Number(this.datos.value.PT) );
    var AMB = (Math.pow(subt,2)) / ( 4 * Math.PI);

    //Ciclo, recorrer todas las áreas de una edad
    for (var i = 0; i < (this.areas).length; i++) {
      //Vector, se guarda en un nuevo vector el residuo del area calculada y áre da la tabla
      this.restas[i] =  AMB - this.areas[i];
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
    console.log(this.medidas_amb);
    console.log(this.areas);
    console.log(this.restas);
    console.log(this.minimo);
    console.log(AMB);
    var indice = this.absolutos.indexOf(this.minimo); //Indice del valor más cercano
    var final = this.perceptiles[indice + 1]; //Busqueda del tipo del perceptil
    
    //Comparaciones , obtiene el resultado a mostrar dependiendo del perceptil
    if ( final <= 5){
      this.interpretacion = "Reserva proteica muy baja desnutrición proteica";
    }
    if ( final > 6 || final <= 10 ){
      this.interpretacion = "Reserva proteica baja";
    }
    if ( final > 11 || final <= 90 ){
      this.interpretacion = "Reserva proteica normal";
    }
    if ( final >= 91 ){
      this.interpretacion = "Reserva proteica alta";
    }

    //Alert con el resultado a mostrar
    const alert = this.alertCtrl.create({
      title: '¡ ' + this.interpretacion + " !",
      subTitle: 'El AMB es: ' + AMB.toFixed(2) +'cm^2',
      buttons: ['Aceptar']
    });
    alert.present();
    this.crearform(); //Se vuelve a llamar a la función del formulario.

  }

}
