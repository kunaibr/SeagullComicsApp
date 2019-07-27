import { Component, Injectable } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { HqviewPage } from '../hqview/hqview';
import { ServidorProvider } from '../../providers/servidor/servidor';
import { Http } from '@angular/http';
import { GlobalvarsProvider } from '../../providers/globalvars/globalvars';
import { DatabaseProvider } from '../../providers/database/database';
import { Observable } from 'rxjs/Observable';
import { PagamentoPage } from '../pagamento/pagamento';


@IonicPage()
@Component({
  selector: 'page-season',
  templateUrl: 'season.html',
})

@Injectable()
export class SeasonPage {

  hqlista:any;
  hqsUser:string; 
  hqsArrayUser:string[]; 
  usuario:any;
  hqsBiblioteca:any[];
  searchHqs:any[];

  auxHq: Observable<any[]>;
  
  keyComic: any = {
    key: "",
    titulo: "",
    edicao: "",
    imagem: "",
    data: "",
  };

  keySeason: any;

  titulo: string;

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
    
    this.GetRetornarSeason();
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

  this.GetRetornarSeason();
  }

  
  //Essa função é acionada ao recarregar a page
  GetRetornarSeason() {

    this.keyComic = this.navParams.get("key");
    this.titulo = this.keyComic.titulo;

    this.AbreCarregador();


    let aux: any[];

    this.auxHq = this.dataProvider.GetAllSeason(this.keyComic).valueChanges();
    this.auxHq.subscribe(res => {
      aux = res;
      this.isBuy(aux);
      
      this.FechaCarregador();

      this.hqlista = this.dataProvider.GetComicsUser(this.usuario).valueChanges();
      this.hqlista.subscribe(res => {
     
      this.hqsUser = res[1];
     
      });
      
      if (this.isRefreshing) {
        this.refresher.complete();
        this.isRefreshing = false;
      }
      
    });

  }

  isBuy(aux: any[]) {

    this.searchHqs = aux;
    
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
  

     if(key != undefined && this.hqsUser == 'True'){
    
      this.keySeason = key;
      
        this.navCtrl.push(HqviewPage, {
          keyComic: this.keyComic,
          keySeason:  this.keySeason.key,
          preview: 'False',
        });
     }else{
      this.keySeason = key;
      
      this.navCtrl.push(HqviewPage, {
        keyComic: this.keyComic,
        keySeason:  this.keySeason.key,
        preview: 'True',
      });
     }
  }

  OpenPagamento(){
    this.navCtrl.push(PagamentoPage);
  }



}

