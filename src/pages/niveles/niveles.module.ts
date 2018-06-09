import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NivelesPage } from './niveles';

@NgModule({
  declarations: [
    NivelesPage,
  ],
  imports: [
    IonicPageModule.forChild(NivelesPage),
  ],
})
export class NivelesPageModule {}
