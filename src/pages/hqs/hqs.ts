import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ServidorProvider } from '../../providers/servidor/servidor';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
import { GlobalvarsProvider } from '../../providers/globalvars/globalvars';

@IonicPage()
@Component({
  selector: 'page-hqs',
  templateUrl: 'hqs.html',
})
export class HqsPage {

  usuario: any;
  hqsUser: string;
  hqsArrayUser: string[];

  hqlista: any[];
  searchHqs: any[];

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
  ) {
  }

  ionViewDidLoad() {
    this.usuario =  this.globalvars.getUser();
    this.hqsUser = this.usuario.dados.hqs;

    this.getRetornarHq();
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

    this.getRetornarHq();
  }

  // Buscando as hqs do bd na tabela hq e retornando os dados na lista para exibilas
  getRetornarHq() {
    this.AbreCarregador();

    this.http.get(this.servidor.UrlGet() + 'hqs.php').pipe(map(res => res.json()))
      .subscribe(
        data => {
          this.hqlista = data;

          this.searchHqs = this.hqlista;

          this.isBuy();


          this.FechaCarregador();
          if (this.isRefreshing) {
            this.refresher.complete();
            this.isRefreshing = false;
          }
        },
        err => {
          console.log(err);
          this.FechaCarregador();
          if (this.isRefreshing) {
            this.refresher.complete();
            this.isRefreshing = false;
          }
        }
      );
  }

  isBuy() {
    this.hqsArrayUser = this.hqsUser.split(",");

    //aqui a uma busca das hqs existentes e  se encontrar ele deixa com os dados
    //se nao é iguala-do a indefinido, entao não é colocado na lista
    for (let i: number = 0; i < this.hqlista.length; i++) {

      this.hqlista[i].comprado = false;

      for (let j: number = 0; j < this.hqsArrayUser.length; j++) {

        if (this.hqlista[i].codigo == parseInt(this.hqsArrayUser[j])) {
          this.hqlista[i].comprado = true;
          j = this.hqsArrayUser.length;
        }

      }
    }
  }

  OpenHq(codigo): any {
    if (codigo != undefined) {
      //this.navCtrl.push(, {cod: codigo});
    }
  }

  OnSearch(ev: any) {

    this.searchHqs = this.hqlista;

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


}
