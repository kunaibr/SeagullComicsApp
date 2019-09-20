import { Component, ViewChild, Injectable } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AjustesPage } from '../pages/ajustes/ajustes';
import { BibliotecaPage } from '../pages/biblioteca/biblioteca';
import { HqsPage } from '../pages/hqs/hqs';
//import { NovidadesPage } from '../pages/novidades/novidades';
import { PersonagensPage } from '../pages/personagens/personagens';
import { ContatoPage } from '../pages/contato/contato';
import { LoginPage } from '../pages/login/login';
import { SettingsProvider } from '../providers/settings/settings';
import { Storage } from '@ionic/Storage';
import { IntroPage } from '../pages/intro/intro';
import { GlobalvarsProvider } from '../providers/globalvars/globalvars';
import { LanguageProvider } from '../providers/language/language';
import { FCM } from '@ionic-native/fcm/ngx';
import { ArtistsPage } from '../pages/artists/artists';


@Component({
  templateUrl: 'app.html'
})

@Injectable()
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;

  public pages: Array<{ title: string, component: any, icon: string }>;

  selectTheme: String;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private settings: SettingsProvider,
    public storage: Storage,
    private globalvars: GlobalvarsProvider,
    public languageProvider: LanguageProvider,
    public fcm: FCM,


  ) {
    this.initializeApp();

    this.pages = [
      { title: 'Comics', component: HqsPage, icon: "paper" },
      { title: 'Minha biblioteca', component: BibliotecaPage, icon: "book" },
      { title: 'Personagens', component: PersonagensPage, icon: "people" },
      //{ title: 'Novidades', component: NovidadesPage, icon: "home" },
      { title: 'Artistas', component: ArtistsPage, icon: "ios-create" },
      { title: 'Contato', component: ContatoPage, icon: "md-chatbubbles" },
      { title: 'Ajustes', component: AjustesPage, icon: "bulb" },
      { title: 'Sair', component: LoginPage, icon: "log-out" },
    ];

  }

  initializeApp() {
    
    this.settings.GetActiveTheme().subscribe(val => this.selectTheme = val);
    // this.settings.SetActiveTheme('light-theme');
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.storage.get('user').then((res) => {
        if (res == null) {
          this.rootPage = LoginPage;
        } else {
          this.globalvars.setUser(res);

          this.rootPage = AjustesPage;
        }
      });
      this.storage.get('intro_storage').then((int) => {
        if (int == null) {
          this.rootPage = IntroPage;
        }
      });


      this.languageProvider.setInitialAppLanguage();


      //Notifications

      this.fcm.getToken().then(
        (token: string) => {
          console.log('Token dispositivo: ' + token);
        }
      ).catch(error => {
        console.log(error);
      });


      this.fcm.onTokenRefresh().subscribe((token: string) => {
        console.log('atualização do token: ' + token);
      });

      this.fcm.onNotification().subscribe(data => {
        if (data.wasTapped) {
          console.log('em segundo plano' + JSON.stringify(data))
        } else {
          //ocorre em primeiro plano
          console.log('estamos em primeiro plano' + JSON.stringify(data))
        }
      }, error => {
        console.log('erro: ' + error);
      });

    });



  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }


}