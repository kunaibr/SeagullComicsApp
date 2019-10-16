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
  hqsPages: any[];

  preview: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private dataProvider: DatabaseProvider,
  ) {
   
  }

  ngOnDestroy(){
    this.dataProvider.setVerifyViewComic(true);
  }
  
  ionViewDidEnter() {
    this.keyComic = this.navParams.get("keyComic");
    this.keySeason = this.navParams.get("keySeason");
    this.preview = this.navParams.get("preview");
   

    if (this.keySeason == "Complete") {
      this.GetCompleteSeason();
    } else {
      this.GetPages();
    }

  }

  GetCompleteSeason() {
    this.hqslist = this.dataProvider.GetAllSeasonPages(this.keyComic.key);
    this.hqslist.subscribe(res => {
      
      this.hqsPages = res;
    });

  }

  GetPages() {
    this.hqslist = this.dataProvider.GetAllComicsPages(this.keyComic.key + '/season/' + this.keySeason);
    this.hqslist.subscribe(res => {

      if (this.preview == 'False') {
        this.hqsPages = res;
      } else {
        let aux: any = [
          {
            imagem: res[0].imagem,
            numero: res[0].numero,
            key: res[0].key,
          },
          {
            imagem: res[1].imagem,
            numero: res[1].numero,
            key: res[1].key,
          },
          {
            imagem: res[2].imagem,
            numero: res[2].numero,
            key: res[2].key,
          },
        ];


        this.hqsPages = aux;
      }

    });

  }
  
}
