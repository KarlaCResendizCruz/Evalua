import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProtocoloPage } from './protocolo';

@NgModule({
  declarations: [
    ProtocoloPage,
  ],
  imports: [
    IonicPageModule.forChild(ProtocoloPage),
  ],
})
export class ProtocoloPageModule {}
