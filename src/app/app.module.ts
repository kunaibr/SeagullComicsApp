
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
//import { environment } from '../environments/environment';
import { AngularFireAuthModule, AngularFireAuth } from '@angular/fire/auth';
import { AdministradorPageModule } from '../pages/administrador/administrador.module';
import { AdministradorPage } from '../pages/administrador/administrador';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { DatabaseProvider } from '../providers/database/database';
import { Camera} from '@ionic-native/camera';
import { PinchZoomModule } from 'ngx-pinch-zoom';
import { PagamentoPage } from '../pages/pagamento/pagamento';
import { PagamentoPageModule } from '../pages/pagamento/pagamento.module';
import { PdfPage } from '../pages/pdf/pdf';
import { PdfPageModule } from '../pages/pdf/pdf.module';
import { SeasonPage } from '../pages/season/season';
import { SeasonPageModule } from '../pages/season/season.module';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { FCM } from '@ionic-native/fcm/ngx';
import { ArtistsPageModule } from '../pages/artists/artists.module';
import { ArtistsPage } from '../pages/artists/artists';


var firebaseConfig = {
  apiKey: "AIzaSyDMhKZpmtKglXfvOtS3EbUSjwXn_PfZ52w",
  authDomain: "seagull-comics.firebaseapp.com",
  databaseURL: "https://seagull-comics.firebaseio.com",
  projectId: "seagull-comics",
  storageBucket: "seagull-comics.appspot.com",
  messagingSenderId: "181474525512",
  appId: "1:181474525512:web:ba0e0ba18b949964"
};


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
    AdministradorPageModule,
    AjustesPageModule,
    BibliotecaPageModule,
    ContatoPageModule,
    HqsPageModule,
    HqviewPageModule,
    IntroPageModule,
    LoginPageModule,
    NovidadesPageModule,
    PagamentoPageModule,
    PersonagensPageModule,
    PersonagensviewPageModule,
    CadastroPageModule,
    ArtistsPageModule,
    DetalheNoticiaPageModule,
    PdfPageModule,
    SeasonPageModule,
    PinchZoomModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireStorageModule,
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AdministradorPage,
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
    PagamentoPage,
    PdfPage,
    SeasonPage,
    ArtistsPage,
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
    AngularFireDatabase,
    AngularFireAuth,
    DatabaseProvider,
    Camera,
    LocalNotifications,
    FCM,
  ]
})
export class AppModule {}
