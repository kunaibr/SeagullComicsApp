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
import { IntroPage } from '../pages/intro/intro';


@Component({
  templateUrl: 'app.html'
})

@Injectable()
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = IntroPage;

  pages: Array<{ title: string, component: any, icon: string }>;

  selectTheme: String;
  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private settings: SettingsProvider,
    private storage: Storage,
  ) {
    this.initializeApp();


    this.pages = [
      { title: 'Novidades', component: NovidadesPage, icon: "home" },
      { title: 'Personagens', component: PersonagensPage, icon: "people" },
      { title: 'HQs', component: HqsPage, icon: "paper" },
      { title: 'Minha biblioteca', component: BibliotecaPage, icon: "book" },
      { title: 'Contato', component: ContatoPage, icon: "contacts" },
      { title: 'Ajustes', component: AjustesPage, icon: "bulb" },
      { title: 'Sair', component: LoginPage, icon: "log-out" },
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
      if (res == null) {
        this.rootPage = LoginPage;
      } else {
        this.rootPage = NovidadesPage;
      }
    });

  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }


}