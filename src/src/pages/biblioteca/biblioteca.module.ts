import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BibliotecaPage } from './biblioteca';

@NgModule({
  declarations: [
    BibliotecaPage,
  ],
  imports: [
    IonicPageModule.forChild(BibliotecaPage),
  ],
})
export class BibliotecaPageModule {}
