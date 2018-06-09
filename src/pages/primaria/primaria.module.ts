import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PrimariaPage } from './primaria';

@NgModule({
  declarations: [
    PrimariaPage,
  ],
  imports: [
    IonicPageModule.forChild(PrimariaPage),
  ],
})
export class PrimariaPageModule {}
