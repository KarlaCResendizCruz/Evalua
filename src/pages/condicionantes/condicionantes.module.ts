import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CondicionantesPage } from './condicionantes';

@NgModule({
  declarations: [
    CondicionantesPage,
  ],
  imports: [
    IonicPageModule.forChild(CondicionantesPage),
  ],
})
export class CondicionantesPageModule {}
