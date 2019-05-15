import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PersonagensviewPage } from './personagensview';

@NgModule({
  declarations: [
    PersonagensviewPage,
  ],
  imports: [
    IonicPageModule.forChild(PersonagensviewPage),
  ],
})
export class PersonagensviewPageModule {}
