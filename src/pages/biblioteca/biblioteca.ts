import { Component, Injectable } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { HqviewPage } from '../hqview/hqview';
import { ServidorProvider } from '../../providers/servidor/servidor';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
import { GlobalvarsProvider } from '../../providers/globalvars/globalvars';

/**
 * Generated class for the BibliotecaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-biblioteca',
  templateUrl: 'biblioteca.html',
})

@Injectable()
export class BibliotecaPage {
  hqlista:any[];
  hqsUser:string; 
  hqsArrayUser:string[]; 
  usuario:any;
  hqsBiblioteca:any[10];
    

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
    this.usuario = this.globalvars.getUser();
    this.hqsUser = this.usuario.dados.hqs;
    console.log(this.hqsUser);
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

  OpenHq():any{
    this.navCtrl.push(HqviewPage);
  }

  //Essa função é acionada ao recarregar a page
  getRetornarHq(){
    this.AbreCarregador();

    //aqui esta buscando as hqs no banco na tabela hqs pelo hqs.php 
    //colocando os dados das hqs no hqlistas e hqsBiblioteca para a verificação
    this.http.get(this.servidor.UrlGet()+'hqs.php').pipe(map(res => res.json()))
    .subscribe(
      data =>{
        this.hqlista = data;
        this.hqsBiblioteca = data;
        //Aqui separa as id das hqs do usuario em uma array para poder verificar
        this.hqsArrayUser = this.hqsUser.split(",");

        let index:number = 0;

        //aqui a uma busca das hqs existentes e  se encontrar ele deixa com os dados
        //se nao é iguala-do a indefinido, entao não é colocado na lista
        for(let i:number=0;i < this.hqlista.length ;i++){

          let encontrou:boolean = false;

          for(let j:number=0;j < this.hqsArrayUser.length;j++){
           
            if(this.hqlista[i].codigo == parseInt(this.hqsArrayUser[j])){
            index++;
            encontrou = true;
            j = this.hqsArrayUser.length;
            }   
          }

          if(encontrou == false){
            this.hqsBiblioteca[index] = undefined;
            index++;
          }
        
        }
        
        //Apos isso para de recarregar e no html recebe todas as hqs não indefinidas
        console.log(this.hqsBiblioteca);

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
