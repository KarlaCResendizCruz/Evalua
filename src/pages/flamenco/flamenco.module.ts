import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FlamencoPage } from './flamenco';

@NgModule({
  declarations: [
    FlamencoPage,
  ],
  imports: [
    IonicPageModule.forChild(FlamencoPage),
  ],
})
export class FlamencoPageModule {}
