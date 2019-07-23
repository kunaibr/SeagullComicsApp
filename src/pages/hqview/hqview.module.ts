import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HqviewPage } from './hqview';
import { PinchZoomModule } from 'ngx-pinch-zoom';

@NgModule({
  declarations: [
    HqviewPage,
  ],
  imports: [
    IonicPageModule.forChild(HqviewPage),
    PinchZoomModule,
  ],
})
export class HqviewPageModule {}
