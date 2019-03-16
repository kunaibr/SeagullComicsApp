import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HqsPage } from './hqs';

@NgModule({
  declarations: [
    HqsPage,
  ],
  imports: [
    IonicPageModule.forChild(HqsPage),
  ],
})
export class HqsPageModule {}
