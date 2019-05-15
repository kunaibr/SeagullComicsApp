import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PersonagensPage } from './personagens';
import { IonicModule } from 'ionic-angular';
import { PersonagensviewPageModule } from '../personagensview/personagensview.module';


@NgModule({
  declarations: [
    PersonagensPage,
  ],
  imports: [
    IonicPageModule.forChild(PersonagensPage),
    IonicModule,
    PersonagensviewPageModule,
  ],
})
export class PersonagensPageModule {}
