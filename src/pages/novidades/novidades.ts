import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, LoadingController } from 'ionic-angular';
import { ServidorProvider } from '../../providers/servidor/servidor';
import { Http } from '@angular/http';
import { DetalheNoticiaPage } from '../detalhe-noticia/detalhe-noticia';
import { GlobalvarsProvider } from '../../providers/globalvars/globalvars';
import { Storage } from '@ionic/Storage';
import { DatabaseProvider } from '../../providers/database/database';
import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-novidades',
  templateUrl: 'novidades.html',
})

export class NovidadesPage {

  @ViewChild(Slides) slides: Slides;

  public noticias: Observable<any[]>;
  public slidesnew: Observable<any[]>;

  public internet: boolean;

  uid: string;

  public loader;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public servidor: ServidorProvider,
    public http: Http,
    public globalvars: GlobalvarsProvider,
    public storage: Storage,
    private dataProvider: DatabaseProvider,
    public loadingCtrl: LoadingController,
  ) {
    
   }


  ionViewDidLoad() {
    this.storage.get('user')
    .then((res) => {
      this.globalvars.setUser(res);
      this.uid = res;
    });

    this.AbreCarregador();

    this.noticias = this.dataProvider.GetAllNoticia();

    this.FechaCarregador();

    //this.goToSlide();
  }

  slideChanged() {
    //this.goToSlide();
  }


  //aqui é a passagem automatico dos slides 
  goToSlide() {
    //Demora de 5 seg para passar de slide e 0,5 de transição
    setTimeout(() => {

      if (this.slides.isEnd()) {
        this.slides.slideTo(0, 500, true);
      } else {
        this.slides.slideNext(500, true);
      }

    }, 5000);
  }


  openDetails(noticia: any) {
    this.navCtrl.push(DetalheNoticiaPage, { cod: noticia });
  }

   //Carrega a pagina
   AbreCarregador() {
    this.loader = this.loadingCtrl.create({
      content: "Carregando",
    });
    this.loader.present();
  }

  FechaCarregador() {
    this.loader.dismiss();
  }
}