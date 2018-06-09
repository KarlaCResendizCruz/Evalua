import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IniciosePage } from './iniciose';

@NgModule({
  declarations: [
    IniciosePage,
  ],
  imports: [
    IonicPageModule.forChild(IniciosePage),
  ],
})
export class IniciosePageModule {}
