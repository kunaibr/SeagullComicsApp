import { Component, Injectable } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ServidorProvider } from '../../providers/servidor/servidor';
import { Http } from '@angular/http';
import { GlobalvarsProvider } from '../../providers/globalvars/globalvars';
import { DatabaseProvider } from '../../providers/database/database';
import { Observable } from 'rxjs/Observable';
import { SeasonPage } from '../season/season';
import { PagamentoPage } from '../pagamento/pagamento';


@IonicPage()
@Component({
  selector: 'page-biblioteca',
  templateUrl: 'biblioteca.html',
})

@Injectable()
export class BibliotecaPage {
  hqlista:any;
  hqsUser:string; 
  hqsArrayUser:string[]; 
  usuario:any;
  hqsBiblioteca:any[];
  searchHqs:any[];

  auxHq: Observable<any[]>;
  
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
    this.usuario =  this.globalvars.getUser();


    this.GetRetornarComics();
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

  this.GetRetornarComics();
  }

  
  //Essa função é acionada ao recarregar a page
  GetRetornarComics() {

    this.AbreCarregador();
   
    let aux: any[];

    this.auxHq = this.dataProvider.GetAllComics().valueChanges();
    this.auxHq.subscribe(res => {
      aux = res;
      this.searchHqs = aux;
      
      this.FechaCarregador();
       
      if (this.isRefreshing) {
        this.refresher.complete();
        this.isRefreshing = false;
      }

      this.hqlista = this.dataProvider.GetComicsUser(this.usuario).valueChanges();
      this.hqlista.subscribe(res => {
  
      this.hqsUser = res[1];
    
      });
     
    });

  }

  OnSearch(ev: any){
    let searchWord = ev.target.value;
   
    if(searchWord && searchWord.trim() != ""){
        this.searchHqs = this.searchHqs.filter((item) =>{
        return (item.titulo.toLowerCase().indexOf(searchWord.toLowerCase()) > -1)
        }) 
       
    }else{
      this.searchHqs = this.hqsBiblioteca;
      return this.searchHqs;
    }

  }

  OpenSeason(key):any{
    if(key != undefined){
      this.navCtrl.push(SeasonPage, 
        {
          key: key, 
          page: 'biblioteca',
      });
    }
  }

  OpenPagamento(){
    this.navCtrl.push(PagamentoPage);
  }



}
