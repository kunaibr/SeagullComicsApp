
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AjustesPageModule } from '../pages/ajustes/ajustes.module';
import { BibliotecaPageModule } from '../pages/biblioteca/biblioteca.module';
import { HqsPageModule } from '../pages/hqs/hqs.module';
import { HqviewPageModule } from '../pages/hqview/hqview.module';
import { IntroPageModule } from '../pages/intro/intro.module';
import { LoginPageModule } from '../pages/login/login.module';
import { NovidadesPageModule } from '../pages/novidades/novidades.module';
import { PersonagensPageModule } from '../pages/personagens/personagens.module';
import { ContatoPageModule } from '../pages/contato/contato.module';
import { AjustesPage } from '../pages/ajustes/ajustes';
import { BibliotecaPage } from '../pages/biblioteca/biblioteca';
import { ContatoPage } from '../pages/contato/contato';
import { HqsPage } from '../pages/hqs/hqs';
import { HqviewPage } from '../pages/hqview/hqview';
import { IntroPage } from '../pages/intro/intro';
import { LoginPage } from '../pages/login/login';
import { NovidadesPage } from '../pages/novidades/novidades';
import { PersonagensPage } from '../pages/personagens/personagens';
import { PersonagensviewPageModule } from '../pages/personagensview/personagensview.module';
import { PersonagensviewPage } from '../pages/personagensview/personagensview';
import { CadastroPage } from '../pages/cadastro/cadastro';
import { CadastroPageModule } from '../pages/cadastro/cadastro.module';
import { DatePipe } from '@angular/common';
import { HttpModule } from '@angular/http';
import { ServidorProvider } from '../providers/servidor/servidor';
import { GlobalvarsProvider } from '../providers/globalvars/globalvars';
import { DetalheNoticiaPageModule } from '../pages/detalhe-noticia/detalhe-noticia.module';
import { SettingsProvider } from '../providers/settings/settings';
import { IonicStorageModule} from '@ionic/Storage';
import { EmailComposer } from '@ionic-native/email-composer';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader} from '@ngx-translate/core';
import { TranslateHttpLoader} from '@ngx-translate/http-loader';
import { LanguageProvider } from '../providers/language/language';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';



export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, '../assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpModule,
    AjustesPageModule,
    BibliotecaPageModule,
    ContatoPageModule,
    HqsPageModule,
    HqviewPageModule,
    IntroPageModule,
    LoginPageModule,
    NovidadesPageModule,
    PersonagensPageModule,
    PersonagensviewPageModule,
    CadastroPageModule,
    DetalheNoticiaPageModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AjustesPage,
    BibliotecaPage,
    ContatoPage,
    HqsPage,
    HqviewPage,
    IntroPage,
    LoginPage,
    NovidadesPage,
    PersonagensPage,
    PersonagensviewPage,
    CadastroPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    DatePipe,
    EmailComposer,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ServidorProvider,
    GlobalvarsProvider,
    SettingsProvider,
    LanguageProvider,
   
  ]
})
export class AppModule {}
