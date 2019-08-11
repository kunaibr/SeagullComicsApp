import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PersonagensviewPage } from '../personagensview/personagensview';


@IonicPage()
@Component({
  selector: 'page-personagens',
  templateUrl: 'personagens.html',
})


export class PersonagensPage {


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams) {
      
  }

  OpenPage(per:number) {
    this.navCtrl.push(PersonagensviewPage,{cod: per});
  }

}
