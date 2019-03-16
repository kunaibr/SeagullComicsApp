import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PersonagensviewPage } from '../personagensview/personagensview';

/**
 * Generated class for the PersonagensPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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

  ionViewDidLoad() {
    console.log('ionViewDidLoad PersonagensPage');
  }

  OpenPage(): any{
    this.navCtrl.push(PersonagensviewPage);
  }

}
