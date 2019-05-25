import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ServidorProvider } from '../../providers/servidor/servidor';
import { Http } from '@angular/http';
import { GlobalvarsProvider } from '../../providers/globalvars/globalvars';
import { DatabaseProvider } from '../../providers/database/database';
import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-hqs',
  templateUrl: 'hqs.html',
})
export class HqsPage {

  usuario: any;
  hqsUser: string;
  hqsArrayUser: string[];

  hqlista: any;

  searchHqs: Observable<any[]>;

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
    console.log("user: " + this.usuario);

    this.GetRetornarComics();
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

  //Recarrega a pagina
  doRefresh(refresher) {
    this.refresher = refresher;
    this.isRefreshing = true;

    this.GetRetornarComics();
  }

  // Buscando as hqs do bd na tabela hq e retornando os dados na lista para exibilas
  GetRetornarComics() {

    this.AbreCarregador();

    this.hqlista = this.dataProvider.GetComicsUser(this.usuario).valueChanges();
    this.hqlista.subscribe(res => this.hqsUser = res[0].hqs);

    this.isBuy();

    this.FechaCarregador();

    if (this.isRefreshing) {
      this.refresher.complete();
      this.isRefreshing = false;
    }


    this.searchHqs = this.dataProvider.GetAllComics().valueChanges();
    this.searchHqs.subscribe(res => console.log(res));

  }

  isBuy() {

    if(this.hqsUser != undefined){
      this.hqsArrayUser = this.hqsUser.split(",");

      //aqui a uma busca das hqs existentes e  se encontrar ele deixa com os dados
      //se nao é iguala-do a indefinido, entao não é colocado na lista
      for (let i: number = 0; i < this.hqlista.length; i++) {
  
        this.searchHqs[i].comprado = 'false';
  
        for (let j: number = 0; j < this.hqsArrayUser.length; j++) {
  
          if (this.hqlista[i].titulo == this.hqsArrayUser[j]) {
            this.searchHqs[i].comprado = 'true';
            j = this.hqsArrayUser.length;
          }
  
        }
      }
    }else{
        //se nao é iguala-do a indefinido, entao não é colocado na lista
        for (let i: number = 0; this.hqlista.length; i++) {
  
          this.searchHqs[i].comprado = 'false';
        }
    }
   
  }

  OpenHq(codigo): any {
    if (codigo != undefined) {

    }
  }

  OnSearch(ev: any) {

    // this.searchHqs = this.hqlista;

    // let searchWord = ev.target.value;

    // if (searchWord && searchWord.trim() != "") {
    //   this.searchHqs = this.searchHqs.filter((item) => {
    //     return (item.titulo.toLowerCase().indexOf(searchWord.toLowerCase()) > -1)
    //   })

    // } else {
    //   this.searchHqs = this.hqlista;
    //   return this.searchHqs;
    // }

  }


}
