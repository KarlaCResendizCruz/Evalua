import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';


@IonicPage()
@Component({
  selector: 'page-somatotipo',
  templateUrl: 'somatotipo.html',
})
export class SomatotipoPage {

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

}
