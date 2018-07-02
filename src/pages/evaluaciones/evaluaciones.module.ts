import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EvaluacionesPage } from './evaluaciones';

@NgModule({
  declarations: [
    EvaluacionesPage,
  ],
  imports: [
    IonicPageModule.forChild(EvaluacionesPage),
  ],
})
export class EvaluacionesPageModule {}
