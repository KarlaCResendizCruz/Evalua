import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component'; 

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { RegistroPage } from '../pages/registro/registro';
import { IniciosePage } from '../pages/iniciose/iniciose';
import { OlvidastecontPage } from '../pages/olvidastecont/olvidastecont';
import { NivelesPage } from '../pages/niveles/niveles';
import { PreescolarPage } from '../pages/preescolar/preescolar';
import { PrimariaPage } from '../pages/primaria/primaria';
import { SecundariaPage } from '../pages/secundaria/secundaria';
import { PreparatoriaPage } from '../pages/preparatoria/preparatoria';
import { CrecimientoPage } from '../pages/crecimiento/crecimiento';
import { AntropometriaPage } from '../pages/antropometria/antropometria';
import { HabilidadesbasicasPage } from '../pages/habilidadesbasicas/habilidadesbasicas';
import { HabilidadescoordinativasPage } from '../pages/habilidadescoordinativas/habilidadescoordinativas';
import { HabilidadescoondicionantesPage } from '../pages/habilidadescoondicionantes/habilidadescoondicionantes';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    RegistroPage,
    IniciosePage,
    OlvidastecontPage,
    NivelesPage,
    PreescolarPage,
    PrimariaPage,
    SecundariaPage,
    PreparatoriaPage,
    CrecimientoPage,
    AntropometriaPage,
    HabilidadesbasicasPage,
    HabilidadescoordinativasPage,
    HabilidadescoondicionantesPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    RegistroPage,
    IniciosePage,
    OlvidastecontPage,
    NivelesPage,
    PreescolarPage,
    PrimariaPage,
    SecundariaPage,
    PreparatoriaPage,
    CrecimientoPage,
    AntropometriaPage,
    HabilidadesbasicasPage,
    HabilidadescoordinativasPage,
    HabilidadescoondicionantesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
