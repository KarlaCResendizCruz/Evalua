import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { HttpClientModule } from '@angular/common/http';
import { SizeProvider } from '../providers/size/size';
import { WeightProvider } from '../providers/weight/weight';
import { ImcProvider } from '../providers/imc/imc';
import { PerimeterProvider } from '../providers/perimeter/perimeter';
import { AmbProvider } from '../providers/amb/amb';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { OlvidastecontPage } from '../pages/olvidastecont/olvidastecont';
import { RegistroPage } from '../pages/registro/registro';
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
import { BasicasPage } from '../pages/basicas/basicas';
import { CaminarPage } from '../pages/caminar/caminar';
import { FlexionFrentePage } from '../pages/flexion-frente/flexion-frente';
import { RecepcionBalonPage } from '../pages/recepcion-balon/recepcion-balon';
import { SaltoObstaculoPage } from '../pages/salto-obstaculo/salto-obstaculo';
import { LanzamientoPelotaPage } from '../pages/lanzamiento-pelota/lanzamiento-pelota';
import { LanzamientoPrecisionPage } from '../pages/lanzamiento-precision/lanzamiento-precision';
import { CoordinativasPage } from '../pages/coordinativas/coordinativas';
import { VigaEquilibrioPage } from '../pages/viga-equilibrio/viga-equilibrio';
import { AvioncitoPage } from '../pages/avioncito/avioncito';
import { ZigzagPage } from '../pages/zigzag/zigzag';
import { PlatteTappingPage } from '../pages/platte-tapping/platte-tapping';
import { FlamencoPage } from '../pages/flamenco/flamenco';
import { CondicionantesPage } from '../pages/condicionantes/condicionantes';
import { SaltoHorizontalPage } from '../pages/salto-horizontal/salto-horizontal';
import { VelocidadAgilidadPage } from '../pages/velocidad-agilidad/velocidad-agilidad';
import { FlexionTroncoPage } from '../pages/flexion-tronco/flexion-tronco';



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
    BasicasPage,
    CaminarPage,
    FlexionFrentePage,
    RecepcionBalonPage,
    SaltoObstaculoPage,
    LanzamientoPelotaPage,
    LanzamientoPrecisionPage,
    CoordinativasPage,
    VigaEquilibrioPage,
    AvioncitoPage,
    ZigzagPage,
    PlatteTappingPage,
    FlamencoPage,
    CondicionantesPage,
    SaltoHorizontalPage,
    VelocidadAgilidadPage,
    FlexionTroncoPage,
    OlvidastecontPage,
    RegistroPage
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
    BasicasPage,
    CaminarPage,
    FlexionFrentePage,
    RecepcionBalonPage,
    SaltoObstaculoPage,
    LanzamientoPelotaPage,
    LanzamientoPrecisionPage,
    CoordinativasPage,
    VigaEquilibrioPage,
    AvioncitoPage,
    ZigzagPage,
    PlatteTappingPage,
    FlamencoPage,
    CondicionantesPage,
    SaltoHorizontalPage,
    VelocidadAgilidadPage,
    FlexionTroncoPage,
    OlvidastecontPage,
    RegistroPage
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
