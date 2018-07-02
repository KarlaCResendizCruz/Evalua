import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MasaPage } from './masa';

@NgModule({
  declarations: [
    MasaPage,
  ],
  imports: [
    IonicPageModule.forChild(MasaPage),
  ],
})
export class MasaPageModule {}
