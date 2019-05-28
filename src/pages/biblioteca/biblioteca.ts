import { Component, Injectable } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { HqviewPage } from '../hqview/hqview';
import { ServidorProvider } from '../../providers/servidor/servidor';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
import { GlobalvarsProvider } from '../../providers/globalvars/globalvars';
import { DatabaseProvider } from '../../providers/database/database';
import { Observable } from 'rxjs/Observable';


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

    this.hqlista = this.dataProvider.GetComicsUser(this.usuario).valueChanges();
    this.hqlista.subscribe(res => {
   
    this.hqsUser = res[1];
    console.log(this.hqsUser);
    });
   
    let aux: any[];

    this.auxHq = this.dataProvider.GetAllComics().valueChanges();
    this.auxHq.subscribe(res => {
      aux = res;
      this.isBuy(aux);
      
      this.FechaCarregador();

      if (this.isRefreshing) {
        this.refresher.complete();
        this.isRefreshing = false;
      }
    });

  }

  isBuy(aux: any[]) {

    if(this.hqsUser != undefined){
      
      this.hqsArrayUser = this.hqsUser.split(',');

   

      //aqui a uma busca das hqs existentes e  se encontrar ele deixa com os dados
      //se nao é iguala-do a indefinido, entao não é colocado na lista

      for (let i = 0; i < this.hqsArrayUser.length; i++) {
       
  
        aux[i].comprado = 'false';
        
        for (let j: number = 0; j < this.hqsArrayUser.length; j++) {
    
          if (aux[i].titulo == this.hqsArrayUser[j]) {
            aux[i].comprado = 'true';
            j = this.hqsArrayUser.length;
 
          }

        
        }
      }
    }else{
        //se nao é iguala-do a indefinido, entao não é colocado na lista
        for (let i: number = 0; this.hqlista.length; i++) {
  
          aux[i].comprado = '';

        }
    }

    this.searchHqs = aux;
   
  }

  OnSearch(ev: any){
   
    this.searchHqs = this.hqsBiblioteca;

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

  OpenHq(key):any{
    if(key != undefined){
      this.navCtrl.push(HqviewPage, {key: key});
    }
  }




}
