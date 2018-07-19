import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CaminarPage } from './caminar';

@NgModule({
  declarations: [
    CaminarPage,
  ],
  imports: [
    IonicPageModule.forChild(CaminarPage),
  ],
})
export class CaminarPageModule {}
