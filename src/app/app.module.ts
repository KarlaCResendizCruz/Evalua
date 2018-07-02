import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { NivelesPage } from '../pages/niveles/niveles';
import { EvaluacionesPage } from '../pages/evaluaciones/evaluaciones';
import { ImcPage } from '../pages/imc/imc';
import { TallaPage } from '../pages/talla/talla';
import { PesoPage } from '../pages/peso/peso';
import { CrecimientoPage } from '../pages/crecimiento/crecimiento';
import { AntropometriaPage } from '../pages/antropometria/antropometria';
import { PerimetroPage } from '../pages/perimetro/perimetro';
import { CinturaPage } from '../pages/cintura/cintura';
import { AmbPage } from '../pages/amb/amb';
import { CcaderaPage } from '../pages/ccadera/ccadera';
import { MasaPage } from '../pages/masa/masa';
import { SomatotipoPage } from '../pages/somatotipo/somatotipo';

import { HttpClientModule } from '@angular/common/http';
import { SizeProvider } from '../providers/size/size';
import { WeightProvider } from '../providers/weight/weight';
import { ImcProvider } from '../providers/imc/imc';
import { PerimeterProvider } from '../providers/perimeter/perimeter';
import { AmbProvider } from '../providers/amb/amb';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    NivelesPage,
    EvaluacionesPage,
    CrecimientoPage,
    AntropometriaPage,
    ImcPage,
    TallaPage,
    PesoPage,
    PerimetroPage,
    CinturaPage,
    AmbPage,
    CcaderaPage,
    MasaPage,
    SomatotipoPage,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    NivelesPage,
    EvaluacionesPage,
    CrecimientoPage,
    AntropometriaPage,
    ImcPage,
    TallaPage,
    PesoPage,
    PerimetroPage,
    CinturaPage,
    AmbPage,
    CcaderaPage,
    MasaPage,
    SomatotipoPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SizeProvider,
    WeightProvider,
    ImcProvider,
    PerimeterProvider,
    AmbProvider,
  ]
})
export class AppModule {}
