import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { SettingsProvider } from '../../providers/settings/settings';


@IonicPage()
@Component({
  selector: 'page-ajustes',
  templateUrl: 'ajustes.html',
})
export class AjustesPage {

  selectTheme: String;

  constructor(public navCtrl: NavController, public navParams: NavParams,private settings: SettingsProvider) {
    this.settings.GetActiveTheme().subscribe(val => this.selectTheme = val);
  }

  ionViewDidLoad() {}

  ToggleAppTheme(){
    if(this.selectTheme == 'dark-theme'){
      this.settings.SetActiveTheme('light-theme');
    }else{
      this.settings.SetActiveTheme('dark-theme'); 
    }
    console.log(this.selectTheme);
  }

}
