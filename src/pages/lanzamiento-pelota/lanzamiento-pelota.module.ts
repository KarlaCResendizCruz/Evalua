import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LanzamientoPelotaPage } from './lanzamiento-pelota';

@NgModule({
  declarations: [
    LanzamientoPelotaPage,
  ],
  imports: [
    IonicPageModule.forChild(LanzamientoPelotaPage),
  ],
})
export class LanzamientoPelotaPageModule {}
