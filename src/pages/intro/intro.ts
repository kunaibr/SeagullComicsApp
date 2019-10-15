import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { Storage } from '@ionic/Storage';


@IonicPage()
@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html',
})
export class IntroPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private storage: Storage,
    ) {
  }

  goToPage(){
    this.storage.set('intro_storage',false);
    this.navCtrl.push(LoginPage);
  }

}
