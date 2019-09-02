import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, LoadingController } from 'ionic-angular';
import { ServidorProvider } from '../../providers/servidor/servidor';
import { Http } from '@angular/http';
import { GlobalvarsProvider } from '../../providers/globalvars/globalvars';
import { DatabaseProvider } from '../../providers/database/database';
import { Observable } from 'rxjs/Observable';
import { PagamentoPage } from '../pagamento/pagamento';
import { SeasonPage } from '../season/season';



@IonicPage()
@Component({
  selector: 'page-hqs',
  templateUrl: 'hqs.html',
})
export class HqsPage {

  @ViewChild(Slides) slides: Slides;

  usuario: any;
  hqsUser: string;
  hqsArrayUser: string[];

  hqlista: any;

  searchHqs: any[];
  auxHq: Observable<any[]>;

  slideChose: any;

  public isSearchOpen = false;

  public loader;

  public refresher;
  public isRefreshing: boolean = false;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public servidor: ServidorProvider,
    public http: Http,
    public loadingCtrl: LoadingController,
    public globalvars: GlobalvarsProvider,
    private dataProvider: DatabaseProvider,
  ) {

  }

  ionViewDidLoad() {
    this.usuario = this.globalvars.getUser();
    
    this.GetRetornarComics();
  }

  slideChanged() {
    this.goToSlide();
  }

  //aqui é a passagem automatico dos slides 
  goToSlide() {
    //Demora de 5 seg para passar de slide e 0,5 de transição
    setTimeout(() => {

      if (this.slides.isEnd() == true) {
        this.slides.slideTo(0, 200, true);

      } else {
        this.slides.slideNext(200, true);
      }

    }, 10000);

    // this.slideChose = this.searchHqs[this.slides._activeIndex].imagem;
    
  }
  //Carrega a pagina
  AbreCarregador() {
    let gifs = ['<img src="../../assets/gifs/EstrelaFria.gif">',
      '<img src="../../assets/gifs/SamuraiLunar.gif">',
    ];
    let rnd = this.getRandomInt(0, 1);

    this.loader = this.loadingCtrl.create({
      spinner: 'hide',
      content: gifs[rnd],
    });
    this.loader.present();
  }

  FechaCarregador() {
    this.loader.dismiss();
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  //Recarrega a pagina
  doRefresh(refresher) {
    this.refresher = refresher;
    this.isRefreshing = true;

    this.GetRetornarComics();
  }

  // Buscando as hqs do bd na tabela hq e retornando os dados na lista para exibilas
  GetRetornarComics() {

    this.AbreCarregador();
    
    this.hqlista = this.dataProvider.GetUser(this.usuario);
    this.hqlista.subscribe(res => {

      this.hqsUser = res[2];
      //res[1] = biblioteca de hqs
      //res[2] = assinatura atual

    });

    let aux: any[];

    this.auxHq = this.dataProvider.GetAllComics().valueChanges();
    this.auxHq.subscribe(res => {
      aux = res;
      this.searchHqs = aux;
      

      this.slideChanged();

      this.FechaCarregador();


      if (this.isRefreshing) {
        this.refresher.complete();
        this.isRefreshing = false;
      }
    });

  }



  OpenPagamento() {
    this.navCtrl.push(PagamentoPage);
  }

  OnSearch(ev: any) {


    let searchWord = ev.target.value;

    if (searchWord && searchWord.trim() != "") {
      this.searchHqs = this.searchHqs.filter((item) => {
        return (item.titulo.toLowerCase().indexOf(searchWord.toLowerCase()) > -1)
      })

    } else {
      this.searchHqs = this.hqlista;
      return this.searchHqs;
    }

  }

  OpenSeason(key) {

    this.navCtrl.push(SeasonPage,
      {
        key: key,
        page: 'hqs',
      });


  }

 

}
