import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServidorProvider } from '../../providers/servidor/servidor';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { DatabaseProvider } from '../../providers/database/database';

@IonicPage()
@Component({
  selector: 'page-hqview',
  templateUrl: 'hqview.html',
})
export class HqviewPage {
  public codigo;
  key: any;
  hqslist: Observable<any[]>;

  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
     public servidor: ServidorProvider,
     public http: Http,
     private dataProvider: DatabaseProvider,
     ) {
  }

  ionViewDidEnter() {
    this.key = this.navParams.get("key");
      console.log(this.key.key);
      this.GetPages();
    
  }

  GetPages() {
    this.hqslist = this.dataProvider.GetAllComisPages(this.key.key);
  }
}
