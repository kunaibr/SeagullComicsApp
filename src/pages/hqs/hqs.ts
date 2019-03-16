import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { HqviewPage } from '../hqview/hqview';
import { ServidorProvider } from '../../providers/servidor/servidor';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';

/**
 * Generated class for the HqsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-hqs',
  templateUrl: 'hqs.html',
})
export class HqsPage {

  hqlista:any;

  public loader;

  public refresher;
  public isRefreshing: boolean = false;

  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public servidor: ServidorProvider, 
    public http: Http,
    public loadingCtrl: LoadingController
    ) {
  }

  ionViewDidLoad() {
    this.getRetornarHq();
  }

  //Carrega a pagina
  AbreCarregador() {
    this.loader = this.loadingCtrl.create({
      content: "Carregando",
    });
    this.loader.present();
  }

  FechaCarregador(){
    this.loader.dismiss();
  }

   //Recarrega a pagina
   doRefresh(refresher) {
    this.refresher = refresher;
    this.isRefreshing = true;

    this.getRetornarHq();
  }

  


  
// Buscando as hqs do bd na tabela hq e retornando os dados na lista para exibilas
  getRetornarHq(){
    this.AbreCarregador();

    this.http.get(this.servidor.UrlGet()+'hqs.php').pipe(map(res => res.json()))
    .subscribe( 
      data =>{ 
        this.hqlista = data;
        this.FechaCarregador();
        if(this.isRefreshing){
          this.refresher.complete();
          this.isRefreshing = false;
        }
      },
      err => {
        console.log(err);
        this.FechaCarregador();
        if(this.isRefreshing){
          this.refresher.complete();
          this.isRefreshing = false;
        }
      }
      );
  }

  

}
