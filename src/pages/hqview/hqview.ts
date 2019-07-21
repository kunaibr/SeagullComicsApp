import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { DatabaseProvider } from '../../providers/database/database';

@IonicPage()
@Component({
  selector: 'page-hqview',
  templateUrl: 'hqview.html',
})
export class HqviewPage {
  public codigo;
  keyComic: any = {
    key: "",
    titulo: "",
    edicao: "",
    imagem: "",
    data: "",
  };

  keySeason: any;
  hqslist: Observable<any[]>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private dataProvider: DatabaseProvider,
  ) {
    this.GetPages();
  }

  ionViewDidEnter() {
    this.keyComic = this.navParams.get("keyComic");
    this.keySeason = this.navParams.get("keySeason");
    this.GetPages();
  }

  GetPages() {
    console.log(this.keyComic.key);
    console.log(this.keySeason);

    this.hqslist = this.dataProvider.GetAllComicsPages(this.keyComic.key + '/season/' + this.keySeason);
   
  }
}
