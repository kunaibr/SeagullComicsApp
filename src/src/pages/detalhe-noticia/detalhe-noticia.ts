import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DetalheNoticiaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detalhe-noticia',
  templateUrl: 'detalhe-noticia.html',
})
export class DetalheNoticiaPage {

  public noticia:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidEnter() {
    this.noticia = this.navParams.get("cod");
  }

}
