import { Component, ViewChild, Injectable } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AjustesPage } from '../pages/ajustes/ajustes';
import { BibliotecaPage } from '../pages/biblioteca/biblioteca';
import { HqsPage } from '../pages/hqs/hqs';
import { NovidadesPage } from '../pages/novidades/novidades';
import { PersonagensPage } from '../pages/personagens/personagens';
import { ContatoPage } from '../pages/contato/contato';
import { LoginPage } from '../pages/login/login';
import { SettingsProvider } from '../providers/settings/settings';
import { Storage } from '@ionic/Storage';


@Component({
  templateUrl: 'app.html'
})

@Injectable()
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;

  pages: Array<{title: string, component: any}>;

  selectTheme:String;
  constructor(
    public platform: Platform, 
    public statusBar: StatusBar,
    public splashScreen: SplashScreen, 
    private settings:SettingsProvider,
    private storage: Storage,
    ) {
    this.initializeApp();

    
    this.pages = [
      { title: 'Novidades', component: NovidadesPage },
      { title: 'Personagens', component: PersonagensPage },
      { title: 'HQs', component: HqsPage }, 
      { title: 'Minha biblioteca', component: BibliotecaPage },
      { title: 'Contato', component: ContatoPage },   
      { title: 'Ajustes', component: AjustesPage },
    ];  
  }
     
  

  initializeApp() {
    this.settings.GetActiveTheme().subscribe(val => this.selectTheme = val);
    this.settings.SetActiveTheme('light-theme');
    this.platform.ready().then(() => {
      
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    this.storage.get('session_storage').then((res) => {
      if(res == null){
        this.rootPage = LoginPage;
     }else{
       this.rootPage = NovidadesPage;
     }
    });
    
  }



  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

 
}