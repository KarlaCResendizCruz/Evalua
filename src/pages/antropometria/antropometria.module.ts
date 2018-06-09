import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AntropometriaPage } from './antropometria';

@NgModule({
  declarations: [
    AntropometriaPage,
  ],
  imports: [
    IonicPageModule.forChild(AntropometriaPage),
  ],
})
export class AntropometriaPageModule {}
