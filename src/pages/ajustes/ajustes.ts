import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SettingsProvider } from '../../providers/settings/settings';
import { LanguageProvider } from '../../providers/language/language';
import { DatabaseProvider } from '../../providers/database/database';
import { AdministradorPage } from '../administrador/administrador';

@IonicPage()
@Component({
  selector: 'page-ajustes',
  templateUrl: 'ajustes.html',
})

export class AjustesPage {

  selectTheme: String;

  toggleValue: boolean = false;

  imgSrc: String = "../../assets/images/logodev2.jpg";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams, private settings: SettingsProvider,
    public languageProvider: LanguageProvider,
    private dataProvider: DatabaseProvider,
  ) {
    this.settings.GetActiveTheme().subscribe(val => this.selectTheme = val);
  }

  ToggleAppTheme() {
    if (this.selectTheme == 'dark-theme') {
      this.settings.SetActiveTheme('light-theme');
      this.imgSrc = "../../assets/images/logodev2.jpg";
    } else {
      this.settings.SetActiveTheme('dark-theme');
      this.imgSrc = "../../assets/images/logodev.jpg";
    }
  }

  SelectLanguage(ev) {
    this.languageProvider.setLanguage(ev);
  }

  OpenAdm() {
    
   this.dataProvider.GetToAdm().then((res) => {
    if (res != undefined) {
      this.dataProvider.GetUser(res).subscribe((u) => {
         let user: any[] = u;
     
         if(user[0].status == "Adm"){
           this.navCtrl.push(AdministradorPage);
         }
        
       });

     }

   });

  

  }
}
