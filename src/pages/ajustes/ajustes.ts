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

  toggleValue: boolean = false;

  imgSrc: String = "../../assets/images/logodev2.jpg";

  constructor(public navCtrl: NavController, public navParams: NavParams,private settings: SettingsProvider) {
    this.settings.GetActiveTheme().subscribe(val => this.selectTheme = val);
  }

  ToggleAppTheme(){
    if(this.selectTheme == 'dark-theme'){
      this.settings.SetActiveTheme('light-theme');
      this.imgSrc = "../../assets/images/logodev2.jpg";
    }else{
      this.settings.SetActiveTheme('dark-theme'); 
      this.imgSrc = "../../assets/images/logodev.jpg";
    }
  }

}
