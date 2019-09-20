import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { Observable } from 'rxjs';

@IonicPage()
@Component({
  selector: 'page-artists',
  templateUrl: 'artists.html',
})
export class ArtistsPage {

  aux: Observable<any[]>;
  
  artists:any[];

  public loader;

  searchArtists: any[];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public data: DatabaseProvider,
    public loadingCtrl: LoadingController,
    ) {
  }

  ionViewDidLoad() {
    this.GetArtists();
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

  GetArtists(){
    this.AbreCarregador();
    this.aux = this.data.GetAllArtists();

    this.aux.subscribe(res =>{
      this.artists = res;
      this.searchArtists = res;
      this.FechaCarregador();
    });
  }

  OnSearch(ev: any) {


    let searchWord = ev.target.value;

    if (searchWord && searchWord.trim() != "") {
      this.searchArtists = this.searchArtists.filter((item) => {
        return (item.nome.toLowerCase().indexOf(searchWord.toLowerCase()) > -1)
      })

    } else {
      this.searchArtists = this.artists;
      return this.searchArtists;
    }

  }

}
